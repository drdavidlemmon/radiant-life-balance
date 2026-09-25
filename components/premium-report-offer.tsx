'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { QuizResults, AreaKey } from '@/types'
import type { PremiumReport } from '@/lib/premium-report'
import { intakeFields, isDeepDiveInput, type ReportIntake } from '@/lib/report-intake'

type Payload = { report: PremiumReport; results: QuizResults; resources: Record<AreaKey, { title: string; type: string; url: string }[]> }

export function PremiumReportOffer({ results, isDemo }: { results: QuizResults; isDemo: boolean }) {
  const query = useSearchParams()
  const [status, setStatus] = useState('')
  const [report, setReport] = useState<Payload | null>(null)
  const [busy, setBusy] = useState(false)
  const [intake, setIntake] = useState<ReportIntake>(() => Object.fromEntries(intakeFields.map(field => [field.key, ''])) as ReportIntake)
  const [completedDives, setCompletedDives] = useState<AreaKey[]>([])
  const sessionId = query.get('report_session')
  const enabled = process.env.NEXT_PUBLIC_REPORTS_ENABLED === 'true'

  useEffect(() => {
    const saved = localStorage.getItem('lifebalance_report_intake')
    if (saved) {
      try {
        const values = JSON.parse(saved) as Partial<ReportIntake>
        setIntake(Object.fromEntries(intakeFields.map(field => [field.key, typeof values[field.key] === 'string' ? values[field.key] : ''])) as ReportIntake)
      } catch { /* keep blank form */ }
    }
    const done = results.priorities.slice(0, 2).filter(area => {
      try {
        const raw = localStorage.getItem(`deepDiveResults_${area}`)
        return raw && isDeepDiveInput(JSON.parse(raw), area)
      } catch { return false }
    })
    setCompletedDives(done)
  }, [results])

  function changeIntake(key: keyof ReportIntake, value: string) {
    const next = { ...intake, [key]: value }
    setIntake(next)
    localStorage.setItem('lifebalance_report_intake', JSON.stringify(next))
  }

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
      const deepDives = Object.fromEntries(results.priorities.slice(0, 2).map(area => {
        const raw = localStorage.getItem(`deepDiveResults_${area}`)
        return [area, raw ? JSON.parse(raw) : null]
      }))
      const res = await fetch('/api/report/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ results, answers, deepDives, intake }) })
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
  const priorityAreas = results.priorities.slice(0, 2)
  const missing = priorityAreas.filter(area => !completedDives.includes(area))
  const intakeReady = intakeFields.every(field => !field.required || intake[field.key].trim().length > 0)
  return <section className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-white to-green-50 p-6 sm:p-8 mb-8">
    <h2 className="text-2xl font-bold text-slate-900 mb-3">Your personalized 10-page report</h2>
    <p className="text-slate-600 text-sm max-w-2xl mb-5">Complete two deep dives and a short intake to receive guidance for all six life areas, a 30-day plan, and relevant reading and tools. Download as a PDF after purchase. $6.99 one-time.</p>
    {!sessionId && !isDemo && <div className="mb-6 space-y-5">
      <div>
        <h3 className="font-semibold text-slate-900 mb-2">Step 1: Your two priority deep dives</h3>
        <div className="flex flex-wrap gap-3">{priorityAreas.map(area => <Link key={area} href={`/${area}/deep-dive`} className="text-sm font-semibold rounded-lg border border-purple-300 px-3 py-2 text-purple-800 hover:bg-purple-100">
          {completedDives.includes(area) ? '✓ Retake' : 'Complete'} {area.charAt(0).toUpperCase() + area.slice(1)} · 15 questions
        </Link>)}</div>
        {missing.length > 0 && <p className="text-sm text-slate-600 mt-2">Complete both deep dives before checkout. Each one provides details for your report.</p>}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">Step 2: Tell us what matters to you</h3>
        <p className="text-xs text-slate-500 mb-4">Questions without a required label can be left blank. Please avoid names or sensitive details you do not want shared with the AI report provider.</p>
        <div className="grid gap-4 max-w-2xl">{intakeFields.map(field => <label key={field.key} className="block text-sm font-medium text-slate-800">
          {field.label} {field.required ? <span className="text-purple-700">(required)</span> : <span className="text-slate-500">(optional)</span>}
          <textarea value={intake[field.key]} onChange={event => changeIntake(field.key, event.target.value)} maxLength={600} rows={field.key === 'goal' || field.key === 'obstacle' ? 2 : 1} className="block w-full mt-1 rounded-lg border border-slate-300 bg-white p-3 text-slate-900 font-normal focus:outline-none focus:ring-2 focus:ring-purple-500" />
        </label>)}</div>
      </div>
    </div>}
    {report ? <button onClick={download} disabled={busy} className="bg-purple-700 text-white font-bold rounded-xl px-5 py-3 disabled:opacity-50">{busy ? 'Preparing PDF…' : 'Download your report'}</button>
      : sessionId ? <button onClick={() => location.reload()} disabled={busy} className="bg-purple-700 text-white font-bold rounded-xl px-5 py-3 disabled:opacity-50">{busy ? 'Preparing your report…' : 'Retry report'}</button>
      : <button onClick={purchase} disabled={busy || isDemo || missing.length > 0 || !intakeReady} className="bg-purple-700 text-white font-bold rounded-xl px-5 py-3 disabled:opacity-50">{busy ? 'Opening secure checkout…' : 'Get my report for $6.99'}</button>}
    {isDemo && !sessionId && <p className="text-sm text-slate-500 mt-3">Take the quiz to order your own report.</p>}
    {status && <p role="status" className="text-sm text-slate-700 mt-4">{status}</p>}
    <p className="text-xs text-slate-500 mt-4">AI-generated education for self-reflection; not professional advice. Results are stored temporarily for 30 days. Your free results remain available.</p>
  </section>
}
