'use client'
import {useState} from 'react'
import Image from 'next/image'
import type {QuizResults} from '@/types'
import {ShareImageButton} from '@/components/share-image-button'
import {publicQuizUrl, trackEvent} from '@/lib/analytics'
import {AREA_NAMES, shareSummary} from '@/lib/share-summary'

export function ShareResultsPanel({results}: {results: QuizResults}) {
  const [includeGrowth, setIncludeGrowth] = useState(false)
  const [message, setMessage] = useState('')
  const summary = shareSummary(results, includeGrowth)
  const url = publicQuizUrl()
  const text = `${summary.text}\n${url}`
  async function copy(value: string) {
    try {await navigator.clipboard.writeText(value); setMessage('Copied!'); trackEvent('share', {method: 'copy'})}
    catch {setMessage('Copy is unavailable in this browser. Use the text message or email link below.')}
  }
  async function share() {
    if (!navigator.share) return copy(text)
    try {await navigator.share({title: 'My Radiant Life Balance summary', text: summary.text, url}); trackEvent('share', {method: 'native'})}
    catch (error) {if (!(error instanceof DOMException && error.name === 'AbortError')) setMessage('Sharing is unavailable. Try copying your message.')}
  }
  const links = [
    ['Text message', `sms:?&body=${encodeURIComponent(text)}`],
    ['WhatsApp', `https://wa.me/?text=${encodeURIComponent(text)}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`],
    ['X', `https://twitter.com/intent/tweet?text=${encodeURIComponent(summary.text)}&url=${encodeURIComponent(url)}`],
    ['Email', `mailto:?subject=Discover%20your%20strongest%20life%20area&body=${encodeURIComponent(text)}`],
  ]
  return <section aria-labelledby="share-heading" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm" style={{fontFamily: 'var(--font-inter), Arial, sans-serif'}}>
    <div className="flex items-center gap-3 mb-5">
      <Image src="/logo.png" alt="Rainbow flower logo" width={48} height={48} />
      <div><h2 id="share-heading" className="font-semibold text-slate-900">Your shareable summary</h2><p className="text-sm text-slate-500">Celebrate a strength. Invite someone you care about.</p></div>
    </div>
    <div className="rounded-xl bg-purple-50/50 border border-purple-100 p-5 flex items-center gap-4">
      <Image src={`/icon-${summary.strongest}.png`} alt={AREA_NAMES[summary.strongest]} width={72} height={72} className="object-contain shrink-0" />
      <div><p className="text-sm text-slate-600">{summary.strengthLabel}</p><p className="text-2xl font-semibold text-slate-900">{AREA_NAMES[summary.strongest]} · {summary.high}%</p></div>
    </div>
    <label className="flex items-center gap-2 text-sm text-slate-600 mt-4"><input type="checkbox" checked={includeGrowth} onChange={e => setIncludeGrowth(e.target.checked)} className="h-4 w-4 accent-purple-600" />Include my growth area in the message and image</label>
    {includeGrowth && <div className="flex items-center gap-3 mt-4"><Image src={`/icon-${summary.growth}.png`} alt={AREA_NAMES[summary.growth]} width={44} height={44} /><p className="text-sm text-slate-600">{summary.growthLine}</p></div>}
    <p className="text-sm text-slate-500 mt-3">Your other scores and paid report link stay private.</p>
    <div className="flex flex-wrap gap-3 mt-5">
      <button onClick={share} className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-sm">Invite a friend</button>
      <button onClick={() => copy(text)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium">Copy message</button>
      <ShareImageButton results={results} includeGrowth={includeGrowth} variant="compact" />
    </div>
    <p role="status" className="text-sm text-purple-700 mt-2">{message}</p>
    <details className="mt-3"><summary className="cursor-pointer text-sm text-slate-500">More ways to share</summary>
      <div className="flex flex-wrap gap-4 mt-3">{links.map(([name, href]) => <a key={name} href={href} onClick={() => trackEvent('share', {method: name.toLowerCase().replace(/ /g, '_')})} target={href.startsWith('https:') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-purple-700 underline underline-offset-4">{name}</a>)}<button onClick={() => copy(url)} className="text-sm text-purple-700 underline">Copy quiz link</button></div>
    </details>
  </section>
}
