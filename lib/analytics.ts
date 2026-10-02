export type SiteEvent = 'visitor' | 'quiz_start' | 'quiz_complete' | 'share' | 'affiliate_click'

export function trackEvent(event: SiteEvent) {
  if (typeof window === 'undefined') return
  const query = new URLSearchParams(location.search).get('ref')
  const stored = sessionStorage.getItem('radiant_ref')
  const ref = query && /^[a-zA-Z0-9_-]{1,40}$/.test(query) ? query : stored || ''
  if (ref && /^[a-zA-Z0-9_-]{1,40}$/.test(ref)) sessionStorage.setItem('radiant_ref', ref)
  const body = JSON.stringify({ event, ref: /^[a-zA-Z0-9_-]{1,40}$/.test(ref) ? ref : '' })
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/events', new Blob([body], { type: 'application/json' }))
    else void fetch('/api/events', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true })
  } catch { /* Tracking must not interrupt the quiz. */ }
}
