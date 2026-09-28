import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { redisCommand, redisReady } from '@/lib/redis'
import { isQuizResults } from '@/lib/premium-report'
import { quizQuestions } from '@/lib/quiz-data'
import { isDeepDiveInput, isReportIntake, type ReportOrderInput } from '@/lib/report-intake'
import { reportStripeKey } from '@/lib/stripe-key'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const stripeKey = reportStripeKey()
  const allowedPromoId = process.env.STRIPE_REPORT_TEST_PROMO_ID
  const site = process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://radiantlifebalance.com'
  if (process.env.NEXT_PUBLIC_REPORTS_ENABLED !== 'true' || !stripeKey || !redisReady() || !process.env.OPENAI_API_KEY ||
    (process.env.VERCEL_ENV === 'preview' && !process.env.VERCEL_URL)) {
    return NextResponse.json({ error: 'Personalized reports are not available yet.' }, { status: 503 })
  }
  let stage = 'reading request'
  try {
    const body: unknown = await req.json()
    const input = body as Partial<ReportOrderInput> & { coupon?: unknown }
    if (!isQuizResults(input?.results) || !input.answers ||
      Object.keys(input.answers).length !== quizQuestions.length ||
      !quizQuestions.every(q => Number.isInteger(input.answers?.[q.id]) && Number(input.answers?.[q.id]) >= 1 && Number(input.answers?.[q.id]) <= 5) ||
      !isReportIntake(input.intake) || !input.deepDives ||
      !input.results.priorities.slice(0, 2).every(area => isDeepDiveInput(input.deepDives?.[area], area)) ||
      JSON.stringify(body).length > 30000) {
      return NextResponse.json({ error: 'Complete the quiz, both priority deep dives, and the report questions before checkout.' }, { status: 400 })
    }
    const coupon = typeof input.coupon === 'string' ? input.coupon.trim() : ''
    if ((input.coupon !== undefined && typeof input.coupon !== 'string') || coupon.length > 64) {
      return NextResponse.json({ error: 'Invalid report code.' }, { status: 400 })
    }
    if (coupon) {
      if (!allowedPromoId || !/^promo_[a-zA-Z0-9]+$/.test(allowedPromoId)) {
        return NextResponse.json({ error: 'This report code is unavailable.' }, { status: 400 })
      }
      const response = await fetch(`https://api.stripe.com/v1/promotion_codes/${allowedPromoId}`, {
        headers: { Authorization: `Bearer ${stripeKey}` }, cache: 'no-store',
      })
      if (!response.ok) return NextResponse.json({ error: 'Could not check the report code.' }, { status: 502 })
      const promo = await response.json() as { id?: string; code?: string; active?: boolean; coupon?: { percent_off?: number; valid?: boolean }; promotion?: { type?: string; coupon?: string } }
      if (!promo.active || promo.id !== allowedPromoId || promo.code?.toLowerCase() !== coupon.toLowerCase() ||
        (!promo.coupon && (promo.promotion?.type !== 'coupon' || !promo.promotion.coupon))) {
        return NextResponse.json({ error: 'That report code is not valid.' }, { status: 400 })
      }
      let discount = promo.coupon
      if (!discount && promo.promotion?.coupon) {
        const couponResponse = await fetch(`https://api.stripe.com/v1/coupons/${encodeURIComponent(promo.promotion.coupon)}`, {
          headers: { Authorization: `Bearer ${stripeKey}` }, cache: 'no-store',
        })
        if (!couponResponse.ok) return NextResponse.json({ error: 'Could not check the report code.' }, { status: 502 })
        discount = await couponResponse.json() as { percent_off?: number; valid?: boolean }
      }
      if (discount?.percent_off !== 100 || !discount.valid) {
        return NextResponse.json({ error: 'That report code is not valid.' }, { status: 400 })
      }
    }
    const token = randomUUID()
    stage = 'report storage (Upstash)'
    await redisCommand('SET', `report:input:${token}`, JSON.stringify(body), 'EX', 60 * 60 * 24 * 30)
    const params = new URLSearchParams({
      mode: 'payment',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': '699',
      'line_items[0][price_data][product_data][name]': 'Personalized Life Balance Report',
      'line_items[0][quantity]': '1',
      success_url: `${site}/results?report_session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/results`,
      'metadata[report_token]': token,
    })
    if (coupon && allowedPromoId) {
      params.set('discounts[0][promotion_code]', allowedPromoId)
      params.set('metadata[report_test_promo_id]', allowedPromoId)
    }
    stage = 'Stripe Checkout request'
    const stripe = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST', headers: { Authorization: `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params, cache: 'no-store',
    })
    if (!stripe.ok) {
      const details = await stripe.json().catch(() => null) as {
        error?: { type?: string; code?: string; param?: string; message?: string }
      } | null
      const issue = details?.error
      // Log only Stripe's error fields; never log keys, quiz answers, or intake text.
      console.error('Report checkout: Stripe rejected session', {
        status: stripe.status, type: issue?.type, code: issue?.code, param: issue?.param,
        requestId: stripe.headers.get('request-id'),
      })
      const reason = [issue?.code || issue?.type, issue?.param ? `parameter ${issue.param}` : null]
        .filter(Boolean).join(', ')
      return NextResponse.json({
        error: process.env.VERCEL_ENV === 'preview'
          ? `Stripe could not create checkout (HTTP ${stripe.status}${reason ? `, ${reason}` : ''}). Check the matching request in Stripe test logs.`
          : 'Could not start checkout. Please try again.',
      }, { status: 502 })
    }
    stage = 'Stripe Checkout response'
    const session = await stripe.json() as { url?: string }
    if (!session.url || !session.url.startsWith('https://checkout.stripe.com/')) throw new Error('Missing checkout URL')
    return NextResponse.json({ url: session.url })
  } catch (error) {
    // Never log the request body or credentials.
    console.error('Report checkout failed', { stage, errorType: error instanceof Error ? error.name : 'Unknown' })
    return NextResponse.json({
      error: process.env.VERCEL_ENV === 'preview'
        ? `Checkout failed during ${stage}. Check Vercel Runtime Logs for /api/report/checkout.`
        : 'Could not start checkout. Please try again.',
    }, { status: 502 })
  }
}
