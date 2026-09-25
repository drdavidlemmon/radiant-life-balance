'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { QuizResults, AreaKey } from '@/types'
import type { PremiumReport } from '@/lib/premium-report'

type Payload = { report: PremiumReport; results: QuizResults; resources: Record<AreaKey, { title: string; type: string; url: string }[]> }

export function PremiumReportOffer({ results, isDemo }: { results: QuizResults; isDemo: boolean }) {
  const query = useSearchParams()
  const [status, setStatus] = useState('')
  const [report, setReport] = useState<Payload | null>(null)
  const [busy, setBusy] = useState(false)
  const sessionId = query.get('report_session')
  const enabled = process.env.NEXT_PUBLIC_REPORTS_ENABLED === 'true'

  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    setBusy(true)
    fetch('/api/report/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId }) })
      .then(async res => { const value = await res.json(); if (!res.ok) throw new Error(value.error || 'Report unavailable'); return value as Payload })
      .then(value => { if (!cancelled) { setReport(value); setStatus('Your report is ready to download.') } })
      .catch(error => { if (!cancelled) setStatus(error instanceof Error ? error.message : 'Report unavailable') })
      .finally(() => { if (!cancelled) setBusy(false) })
    return () => { cancelled = true }
  }, [sessionId])

  async function purchase() {
    setBusy(true); setStatus('')
    try {
      const answers = JSON.parse(localStorage.getItem('lifebalance_answers') || '{}')
      const res = await fetch('/api/report/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ results, answers }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not start checkout')
      window.location.assign(data.url)
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Checkout unavailable'); setBusy(false) }
  }

  async function download() {
    if (!report) return
    setBusy(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { PremiumReportPDF } = await import('./premium-report-pdf')
      const blob = await pdf(<PremiumReportPDF {...report} />).toBlob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'radiant-life-balance-personal-report.pdf'; anchor.click()
      setTimeout(() => URL.revokeObjectURL(url), 60000)
    } catch { setStatus('Could not create the PDF. Please retry this download.') }
    finally { setBusy(false) }
  }

  if (!enabled && !sessionId) return null
  return <section className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-green-50 p-6 sm:p-8 mb-8">
    <h2 className="text-2xl font-bold text-slate-900 mb-3">Your personalized 10-page report</h2>
    <p className="text-slate-600 text-sm max-w-2xl mb-5">See how your strengths can support your priorities, with guidance for all six life areas, a 30-day plan, and links to relevant reading and tools. Download as a PDF after purchase. $6.99 one-time.</p>
    {report ? <button onClick={download} disabled={busy} className="bg-purple-700 text-white font-bold rounded-xl px-5 py-3 disabled:opacity-50">{busy ? 'Preparing PDF…' : 'Download your report'}</button>
      : sessionId ? <button onClick={() => location.reload()} disabled={busy} className="bg-purple-700 text-white font-bold rounded-xl px-5 py-3 disabled:opacity-50">{busy ? 'Preparing your report…' : 'Retry report'}</button>
      : <button onClick={purchase} disabled={busy || isDemo} className="bg-purple-700 text-white font-bold rounded-xl px-5 py-3 disabled:opacity-50">{busy ? 'Opening secure checkout…' : 'Get my report for $6.99'}</button>}
    {isDemo && !sessionId && <p className="text-sm text-slate-500 mt-3">Take the quiz to order your own report.</p>}
    {status && <p role="status" className="text-sm text-slate-700 mt-4">{status}</p>}
    <p className="text-xs text-slate-500 mt-4">AI-generated education for self-reflection; not professional advice. Results are stored temporarily for 30 days. Your free results remain available.</p>
  </section>
}
