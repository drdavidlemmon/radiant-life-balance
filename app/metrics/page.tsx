import type { Metadata } from 'next'
import { redisCommand, redisReady } from '@/lib/redis'
import {CLIENT_EVENTS} from '@/lib/analytics'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { robots: { index: false, follow: false }, referrer: 'no-referrer' }
const EVENTS = [...CLIENT_EVENTS, 'report_purchase', 'report_ready', 'report_revenue_cents'] as const

export default async function MetricsPage({ searchParams }: { searchParams: Promise<{ token?: string; ref?: string }> }) {
  const { token, ref } = await searchParams
  const secret = process.env.METRICS_ADMIN_TOKEN
  // Do not include the token in a link to another origin or expose it in page markup.
  if (!secret || secret.length < 20 || token !== secret) return <main className="mx-auto max-w-xl p-12"><h1>Metrics unavailable</h1></main>
  const slug = ref && /^[a-zA-Z0-9_-]{1,40}$/.test(ref) ? ref : ''
  const dates = Array.from({ length: 30 }, (_, n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10))
  const totals = await Promise.all(EVENTS.map(async event => {
    if (!redisReady()) return 0
    const values = await Promise.all(dates.map(day => redisCommand<number>('GET', `metrics:${day}:${event}${slug ? `:ref:${slug}` : ''}`).catch(() => 0)))
    return values.reduce((sum, value) => sum + Number(value || 0), 0)
  }))
  return <main className="max-w-3xl mx-auto px-6 py-28"><h1 className="text-3xl font-bold mb-2">Site activity</h1>
    <p className="text-slate-500 mb-7">Last 30 days{slug ? ` · campaign: ${slug}` : ''}. Visitors are counted once per browser per day; counts are estimates.</p>
    <div className="grid sm:grid-cols-2 gap-4">{EVENTS.map((event, index) => <div key={event} className="border rounded-xl p-5"><div className="text-slate-500 capitalize">{event === 'report_revenue_cents' ? 'Verified report gross revenue' : event.replaceAll('_', ' ')}</div><div className="text-3xl font-bold">{event === 'report_revenue_cents' ? new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totals[index] / 100) : totals[index]}</div></div>)}</div>
    <p className="text-sm text-slate-500 mt-6">Shares count sharing actions, not confirmed recipients. Add ?ref=friend to the campaign filter to see referred quiz starts and completions. Report purchases count live payments verified when customers return; test purchases are excluded. Revenue is gross before fees and refunds. Stripe remains the source for all orders and net revenue. Affiliate clicks do not establish sales: use each affiliate dashboard for actual commissions.</p>
  </main>
}
