import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { redisCommand, redisReady } from '@/lib/redis'
import { isQuizResults } from '@/lib/premium-report'
import { quizQuestions } from '@/lib/quiz-data'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiantlifebalance.com'
  if (process.env.NEXT_PUBLIC_REPORTS_ENABLED !== 'true' || !stripeKey || !redisReady() || !process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Personalized reports are not available yet.' }, { status: 503 })
  }
  try {
    const body: unknown = await req.json()
    const input = body as { results?: unknown; answers?: Record<string, unknown> }
    if (!isQuizResults(input?.results) || !input.answers ||
      Object.keys(input.answers).length !== quizQuestions.length ||
      !quizQuestions.every(q => Number.isInteger(input.answers?.[q.id]) && Number(input.answers?.[q.id]) >= 1 && Number(input.answers?.[q.id]) <= 5) ||
      JSON.stringify(body).length > 18000) {
      return NextResponse.json({ error: 'Complete the quiz before ordering a report.' }, { status: 400 })
    }
    const token = randomUUID()
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
    const stripe = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST', headers: { Authorization: `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params, cache: 'no-store',
    })
    if (!stripe.ok) return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
    const session = await stripe.json() as { url?: string }
    if (!session.url || !session.url.startsWith('https://checkout.stripe.com/')) throw new Error('Missing checkout URL')
    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}
