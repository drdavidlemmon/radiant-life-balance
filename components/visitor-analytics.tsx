'use client'
import {useEffect} from 'react'
import {usePathname} from 'next/navigation'
import {referralCode, trackEvent} from '@/lib/analytics'
export function VisitorAnalytics() {
  const pathname = usePathname()
  useEffect(() => {
    referralCode()
    if (pathname === '/metrics') return
    try {
      const day = new Date().toISOString().slice(0,10)
      if (localStorage.getItem('radiant_visitor_day') !== day) {
        localStorage.setItem('radiant_visitor_day', day)
        trackEvent('visitor')
      }
    } catch { /* Storage can be disabled. */ }
    const analytics = window as Window & {gtag?: (...args: unknown[]) => void; radiantAnalyticsPath?: string}
    if (analytics.gtag && analytics.radiantAnalyticsPath !== pathname) {
      analytics.radiantAnalyticsPath = pathname
      analytics.gtag('config', 'G-SNRPFRYZHF', {send_page_view: false, page_location: location.origin + pathname, page_referrer: ''})
      analytics.gtag('event', 'page_view', {page_location: location.origin + pathname, page_referrer: ''})
    }
  }, [pathname])
  return null
}
