'use client'
import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function VisitorAnalytics() {
  useEffect(() => {
    const day = new Date().toISOString().slice(0, 10)
    if (localStorage.getItem('radiant_visitor_day') !== day) {
      localStorage.setItem('radiant_visitor_day', day)
      trackEvent('visitor')
    }
  }, [])
  return null
}
