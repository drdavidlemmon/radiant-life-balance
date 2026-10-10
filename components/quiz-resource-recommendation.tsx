'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { areasData } from '@/lib/areas-data'
import { recommendedQuizResource } from '@/lib/quiz-resource'
import { trackEvent } from '@/lib/analytics'
import type { QuizResults } from '@/types'

export function QuizResourceRecommendation({ results, isDemo }: { results: QuizResults; isDemo: boolean }) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  useEffect(() => {
    setAnswers({})
    if (isDemo) return
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('lifebalance_answers') || '{}')
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) setAnswers(saved as Record<string, unknown>)
    } catch { /* Fall back to saved area scores. */ }
  }, [results, isDemo])
  const recommendation = recommendedQuizResource(results, answers)
  if (!recommendation) return null
  const { area, product, focus, why, tiedQuestions, allQuestionsEqual, tiedAreas, basis } = recommendation
  const data = areasData[area]
  return <section aria-labelledby="quiz-resource-heading" className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm" style={{ borderTop: `4px solid ${data.color}` }}>
    <div className="mb-5 flex items-center gap-3">
      <Image src={`/icon-${area}.png`} alt={data.name} width={56} height={56} className="shrink-0 object-contain" />
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{isDemo ? 'Sample recommendation' : 'One resource to help you begin'} · {data.name}</p>
        <h2 id="quiz-resource-heading" className="text-xl sm:text-2xl font-bold text-slate-900">{isDemo ? 'An example of your recommended resource' : 'Your #1 recommended resource'}</h2>
      </div>
    </div>
    <h3 className="mb-3 max-w-3xl text-lg font-semibold leading-snug text-slate-900">{product.name}</h3>
    <p className="mb-3 max-w-3xl text-sm leading-relaxed text-slate-600">{why}</p>
    {focus && <p className="mb-3 max-w-3xl text-sm leading-relaxed text-slate-600">
      <strong className="text-slate-800">Why this was selected: </strong>
      {tiedQuestions ? 'One of your lowest answers' : 'Your lowest answer'} in {data.name} was {focus.answer}/5 for &ldquo;{focus.statement}&rdquo;.
    </p>}
    {allQuestionsEqual && <p className="mb-3 text-sm text-slate-600">All five of your {data.name} answers tied. This is one starting resource for that area; no individual question stood out as weaker.</p>}
    {tiedAreas && <p className="mb-3 text-sm text-slate-600">{data.name} is tied with another area at your lowest area score. We have chosen it as one place to begin.</p>}
    {basis === 'scores' && !isDemo && <p className="mb-3 text-xs text-slate-500">Based on your saved area scores; your original question answers are unavailable in this browser.</p>}
    {isDemo && <p className="mb-4 text-sm text-purple-700">This uses sample scores. Take the free quiz to get your own recommendation.</p>}
    <div className="flex flex-wrap items-center gap-4">
      <a href={product.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" onClick={() => trackEvent('affiliate_click')}
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
        View book & current price <ArrowUpRight className="h-4 w-4" />
      </a>
      <Link href={`/${area}`} className="text-sm font-medium text-slate-600 underline underline-offset-4">Explore free {data.name.toLowerCase()} articles</Link>
    </div>
    <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-500">Optional affiliate resource: we may earn a commission if you buy through this link, at no additional cost to you. You can also check your library. This is a starting suggestion based on {isDemo ? 'sample quiz scores' : 'your main quiz'}, not a guarantee of fit or results.</p>
  </section>
}
