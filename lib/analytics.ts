export const CLIENT_EVENTS = ['visitor', 'quiz_start', 'quiz_complete', 'share', 'affiliate_click', 'resource_view', 'checkout_start'] as const
export type SiteEvent = typeof CLIENT_EVENTS[number]
export type EventDetails = { area?: string; product_id?: string; method?: string }

export function referralCode(): string {
  if (typeof window === 'undefined') return ''
  try {
    const query = new URLSearchParams(location.search).get('ref')
    const stored = sessionStorage.getItem('radiant_ref')
    const ref = query && /^[a-zA-Z0-9_-]{1,40}$/.test(query) ? query : stored || ''
    if (/^[a-zA-Z0-9_-]{1,40}$/.test(ref)) {
      sessionStorage.setItem('radiant_ref', ref)
      return ref
    }
  } catch { /* Storage can be disabled. */ }
  return ''
}

export function publicQuizUrl(): string {
  const origin = typeof window === 'undefined' ? 'https://radiantlifebalance.com' : location.origin
  // Campaign identifier only: never include scores, payment links, or personal data.
  return `${origin}/quiz?ref=friend`
}

export function trackEvent(event: SiteEvent, details: EventDetails = {}) {
  if (typeof window === 'undefined') return
  try {
    const ref = referralCode()
    const safeDetails = Object.fromEntries(Object.entries(details).filter(([key, value]) =>
      ['area', 'product_id', 'method'].includes(key) && typeof value === 'string' && /^[a-zA-Z0-9_-]{1,60}$/.test(value)))
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
    gtag?.('event', event, { ...safeDetails, ...(ref ? { campaign_ref: ref } : {}) })
    const body = JSON.stringify({ event, ref })
    const sent = navigator.sendBeacon?.('/api/events', new Blob([body], { type: 'application/json' }))
    if (!sent) void fetch('/api/events', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {})
  } catch { /* Tracking must not interrupt the quiz. */ }
}
