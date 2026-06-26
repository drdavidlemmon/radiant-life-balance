'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { areasData } from '@/lib/areas-data'
import type { AreaKey } from '@/types'
import Link from 'next/link'

const AREA_META: Record<AreaKey, { hex: string; light: string; icon: string; name: string }> = {
  body:          { hex: '#ef4444', light: '#fef2f2', icon: '❤️',  name: 'Body' },
  mind:          { hex: '#8b5cf6', light: '#f5f3ff', icon: '🧠',  name: 'Mind' },
  spirit:        { hex: '#f59e0b', light: '#fffbeb', icon: '✨',  name: 'Spirit' },
  relationships: { hex: '#ec4899', light: '#fdf2f8', icon: '💞',  name: 'Relationships' },
  money:         { hex: '#10b981', light: '#ecfdf5', icon: '💰',  name: 'Money' },
  direction:     { hex: '#3b82f6', light: '#eff6ff', icon: '🧭',  name: 'Direction' },
}

interface SubcatResult {
  id: string
  name: string
  description: string
  score: number
  articles: { id: string; title: string }[]
}

export default function DeepDiveResultsPage() {
  const params = useParams()
  const router = useRouter()
  const areaKey = params?.area as AreaKey

  const [results, setResults] = useState<SubcatResult[] | null>(null)
  const [loaded, setLoaded] = useState(false)

  const areaRecord = areasData[areaKey]
  const meta = AREA_META[areaKey]

  useEffect(() => {
    const raw = localStorage.getItem(`deepDiveResults_${areaKey}`)
    if (!raw || !areaRecord) {
      router.replace(`/${areaKey}/deep-dive`)
      return
    }
    const { subcategoryScores } = JSON.parse(raw) as { area: string; subcategoryScores: Record<string, number> }

    const subcats = areaRecord.subcategories as Array<{
      id: string
      name: string
      description: string
      articles: Array<{ id: string; title: string }>
    }>

    const ranked: SubcatResult[] = subcats.map(sc => ({
      id: sc.id,
      name: sc.name,
      description: sc.description,
      score: subcategoryScores[sc.id] ?? 50,
      articles: sc.articles.map(a => ({ id: a.id, title: a.title })),
    })).sort((a, b) => a.score - b.score)  // lowest first = highest priority

    setResults(ranked)
    setLoaded(true)
  }, [areaKey, areaRecord, router])

  if (!loaded || !results || !meta || !areaRecord) return null

  const top = results[0]
  const second = results[1]

  function scoreColor(score: number) {
    if (score < 40) return '#ef4444'
    if (score < 60) return '#f59e0b'
    if (score < 80) return '#10b981'
    return '#3b82f6'
  }

  function scoreLabel(score: number) {
    if (score < 40) return 'Needs focus'
    if (score < 60) return 'Growing'
    if (score < 80) return 'On track'
    return 'Thriving'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Retake
          </button>
          <div className="flex items-center gap-2">
            <span className="text-base">{meta.icon}</span>
            <span className="font-semibold text-gray-800">{meta.name} Deep Dive Results</span>
          </div>
          <Link href="/results" className="text-sm font-medium" style={{ color: meta.hex }}>
            Main Results →
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Hero summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-5xl mb-4">{meta.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Your {meta.name} Priorities
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Here are your five {meta.name.toLowerCase()} subcategories ranked from highest to lowest priority — start with #1.
          </p>
        </motion.div>

        {/* Top priority spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 mb-8 border-2"
          style={{ background: meta.light, borderColor: meta.hex + '33' }}
        >
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: meta.hex }}>
            Your Top Priority This Week
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{top.name}</h2>
          <p className="text-gray-600 text-sm mb-4">{top.description}</p>
          <div className="flex flex-wrap gap-2">
            {top.articles.map(art => (
              <Link
                key={art.id}
                href={`/${areaKey}/${top.id}/${art.id}`}
                className="text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-80"
                style={{ background: meta.hex }}
              >
                Read: {art.title}
              </Link>
            ))}
          </div>
        </motion.div>

        {second && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-5 mb-10 border border-gray-200 bg-white"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Second Priority
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{second.name}</h3>
            <p className="text-gray-500 text-sm mb-3">{second.description}</p>
            <div className="flex flex-wrap gap-2">
              {second.articles.map(art => (
                <Link
                  key={art.id}
                  href={`/${areaKey}/${second.id}/${art.id}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors hover:bg-gray-50"
                  style={{ borderColor: meta.hex, color: meta.hex }}
                >
                  {art.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Full ranked list */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-5">All {meta.name} Subcategories Ranked</h2>
          <div className="flex flex-col gap-4">
            {results.map((sc, i) => (
              <motion.div
                key={sc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: i < 2 ? meta.hex : '#9ca3af' }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{sc.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{sc.description}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className="text-2xl font-bold" style={{ color: scoreColor(sc.score) }}>
                      {sc.score}%
                    </div>
                    <div className="text-xs font-medium" style={{ color: scoreColor(sc.score) }}>
                      {scoreLabel(sc.score)}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${sc.score}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease: 'easeOut' }}
                    style={{ background: scoreColor(sc.score) }}
                  />
                </div>

                {/* Article links */}
                <div className="flex flex-wrap gap-2">
                  {sc.articles.map(art => (
                    <Link
                      key={art.id}
                      href={`/${areaKey}/${sc.id}/${art.id}`}
                      className="text-xs px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {art.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA back to main results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center border-t border-gray-100 pt-10"
        >
          <Link
            href="/results"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
            style={{ background: meta.hex }}
          >
            ← Back to Full Results
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            Your progress is automatically saved
          </p>
        </motion.div>
      </div>
    </div>
  )
}
