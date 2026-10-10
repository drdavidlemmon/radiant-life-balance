import { NextRequest, NextResponse } from 'next/server'
import { redisCommand, redisReady } from '@/lib/redis'
import { CLIENT_EVENTS, type SiteEvent } from '@/lib/analytics'

const EVENTS: readonly SiteEvent[] = CLIENT_EVENTS
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  if (!redisReady()) return new NextResponse(null, { status: 204 })
  try {
    const { event, ref } = await req.json() as { event?: SiteEvent; ref?: string }
    if (!event || !EVENTS.includes(event)) return NextResponse.json({ error: 'Unknown event' }, { status: 400 })
    const slug = typeof ref === 'string' && /^[a-zA-Z0-9_-]{1,40}$/.test(ref) ? ref : ''
    const day = new Date().toISOString().slice(0, 10)
    await redisCommand('INCR', `metrics:${day}:${event}`)
    if (slug) await redisCommand('INCR', `metrics:${day}:${event}:ref:${slug}`)
    return new NextResponse(null, { status: 204 })
  } catch {
    return new NextResponse(null, { status: 204 })
  }
}
