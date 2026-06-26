'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Star, ExternalLink, Clock, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { AreaData, QuizResults, AreaKey, Product } from '@/types'
import { cn } from '@/lib/utils'

interface Props { area: AreaData }

const TYPE_META: Record<Product['type'], { label: string; bg: string; text: string; border: string }> = {
  book:       { label: 'Book',       bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
  course:     { label: 'Course',     bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  supplement: { label: 'Supplement', bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  physical:   { label: 'Product',    bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
}

const AREA_ICONS: Record<string, string> = {
  mind: '/icon-mind.png', body: '/icon-body.png', spirit: '/icon-spirit.png',
  relationships: '/icon-relationships.png', money: '/icon-money.png', direction: '/icon-direction.png',
}

function ScoreBadge({ score, hex }: { score: number; hex: string }) {
  const label = score >= 70 ? 'Thriving' : score >= 50 ? 'Good' : score >= 30 ? 'Developing' : 'Needs Work'
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold"
      style={{ borderColor: hex + '50', color: hex, background: hex + '12' }}>
      <span className="text-base font-bold">{score}%</span>
      <span className="font-medium text-sm opacity-80">{label}</span>
    </div>
  )
}

export function AreaPageClient({ area }: Props) {
  const [score, setScore] = useState<number | null>(null)
  const [subScores, setSubScores] = useState<Record<string, number> | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('lifebalance_results')
    if (stored) {
      const r: QuizResults = JSON.parse(stored)
      setScore(r.scores[area.key] ?? null)
      setSubScores(r.subcategoryScores?.[area.key] ?? null)
    }
  }, [area.key])

  const allProducts = area.subcategories.flatMap((s) => s.products).slice(0, 6)

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-20 pb-12 border-b border-slate-100" style={{ background: area.color + '08' }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: area.color }} />
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <Link href="/results" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Results
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <div className="mb-4"><Image src={AREA_ICONS[area.key]} alt={area.name} width={144} height={144} className="object-contain" /></div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900">{area.name}</h1>
                {score !== null && <ScoreBadge score={score} hex={area.color} />}
              </div>
              <p className="text-slate-600 text-lg font-medium mb-2">{area.tagline}</p>
              <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">{area.description}</p>
            </div>
            {score === null && (
              <Link href="/quiz" className="inline-flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-5 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors shadow-sm">
                Take Quiz to Get Your Score <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-10 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {area.featuredQuotes.map((q, i) => (
              <motion.blockquote key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="w-4 h-0.5 rounded mb-3" style={{ background: area.color }} />
                <p className="text-slate-600 italic text-sm leading-relaxed mb-3">"{q.text}"</p>
                <footer className="text-slate-400 text-xs font-medium">— {q.author}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Explore {area.name} Sub-Areas</h2>
            <p className="text-slate-500 text-sm">Targeted resources for each dimension of {area.name.toLowerCase()}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {area.subcategories.map((sub, i) => (
              <motion.div key={sub.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} viewport={{ once: true }}>
                <Link href={`/${area.key}/${sub.id}`}
                  className="group block bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-2xl p-6 transition-all duration-200 h-full">
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{sub.name}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{sub.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {sub.articles.length} articles</span>
                      <span>{sub.products.length} resources</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Top Resources for {area.name}</h2>
            <p className="text-slate-500 text-sm">Handpicked books, courses & tools to accelerate your progress</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProducts.map((product, i) => {
              const tm = TYPE_META[product.type]
              return (
                <motion.a key={product.id} href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}
                  className="group block bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
                      style={{ background: tm.bg, color: tm.text, borderColor: tm.border }}>
                      {tm.label}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-slate-900 font-semibold text-sm leading-snug mb-2 line-clamp-2">{product.name}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 font-bold text-sm">{product.price}</span>
                    <div className="flex items-center gap-1 text-slate-400 text-xs group-hover:text-slate-700 transition-colors">
                      View <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Subcategory Priority Breakdown */}
      {score !== null && subScores && Object.keys(subScores).length > 0 && (() => {
        const subList = area.subcategories
          .filter(s => subScores[s.id] !== undefined)
          .map(s => ({ ...s, score: subScores[s.id] }))
          .sort((a, b) => a.score - b.score)
        if (subList.length === 0) return null
        return (
          <section className="py-12 px-4 border-b border-slate-100 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Your {area.name} Priority Breakdown</h2>
              <p className="text-slate-400 text-xs mb-6">Based on your quiz answers — ranked from highest priority to lowest</p>
              <div className="space-y-3">
                {subList.map((sub, i) => {
                  const pct = sub.score
                  const label = pct >= 80 ? 'Thriving' : pct >= 60 ? 'Good' : pct >= 40 ? 'Developing' : 'Needs Work'
                  const labelColor = pct >= 80 ? '#22c55e' : pct >= 60 ? '#3b82f6' : pct >= 40 ? '#f97316' : '#ef4444'
                  return (
                    <Link href={`/${area.key}/${sub.id}`} key={sub.id}>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group">
                        <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: area.color }} />
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                          style={i === 0 ? { background: area.color, color: 'white' } : { background: '#f1f5f9', color: '#64748b' }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-slate-900 text-sm">{sub.name}</span>
                            <div className="flex items-center gap-2.5 flex-shrink-0">
                              <span className="text-xs font-medium" style={{ color: labelColor }}>{label}</span>
                              <span className="text-slate-900 font-bold text-sm tabular-nums">{pct}%</span>
                            </div>
                          </div>
                          <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: area.color }} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              {subList[0] && (
                <div className="mt-4 p-4 rounded-xl border text-sm" style={{ background: area.color + '0d', borderColor: area.color + '30' }}>
                  <span className="font-semibold" style={{ color: area.color }}>Your #1 focus: {subList[0].name}</span>
                  <span className="text-slate-500"> — explore resources to improve this area first.</span>
                </div>
              )}
            </div>
          </section>
        )
      })()}

      {score === null && (
        <section className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="flex justify-center mb-6"><Image src={AREA_ICONS[area.key]} alt={area.name} width={192} height={192} className="object-contain" /></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">How does your {area.name} score?</h3>
            <p className="text-slate-500 text-sm mb-7 leading-relaxed">Take the free quiz to get your personalized score and improvement roadmap.</p>
            <Link href="/quiz" className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-all shadow-lg text-sm"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
              30 Questions to Change Your Life <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
