'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { deepDiveQuestions } from '@/lib/deep-dive-data'
import { areasData } from '@/lib/areas-data'
import type { AreaKey } from '@/types'

const OPTS = [
  { value: 1, label: 'False' },
  { value: 2, label: 'Mostly false' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Mostly true' },
  { value: 5, label: 'True' },
]

const AREA_META: Record<AreaKey, { hex: string; light: string; icon: string }> = {
  body:          { hex: '#ef4444', light: '#fef2f2', icon: '❤️' },
  mind:          { hex: '#8b5cf6', light: '#f5f3ff', icon: '🧠' },
  spirit:        { hex: '#f59e0b', light: '#fffbeb', icon: '✨' },
  relationships: { hex: '#ec4899', light: '#fdf2f8', icon: '💞' },
  money:         { hex: '#10b981', light: '#ecfdf5', icon: '💰' },
  direction:     { hex: '#3b82f6', light: '#eff6ff', icon: '🧭' },
}

export default function DeepDivePage() {
  const params = useParams()
  const router = useRouter()
  const areaKey = params?.area as AreaKey

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [chosen, setChosen] = useState<number | null>(null)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')

  const areaRecord = areasData[areaKey]
  const meta = AREA_META[areaKey]
  const questions = deepDiveQuestions[areaKey] || []
  const total = questions.length

  useEffect(() => {
    if (!areaRecord || !questions.length) router.replace('/')
  }, [areaRecord, questions, router])

  if (!areaRecord || !meta || !questions.length) return null

  const q = questions[current]
  const subcatLabel = (areaRecord.subcategories as Array<{ id: string; name: string }>).find(
    (s) => s.id === q.subcategory
  )?.name ?? q.subcategory

  function handleSelect(val: number) {
    if (chosen !== null) return
    setChosen(val)
    setTimeout(() => {
      const updated = { ...answers, [q.id]: val }
      setAnswers(updated)

      if (current + 1 < total) {
        setDirection('forward')
        setCurrent(c => c + 1)
        setChosen(null)
      } else {
        // compute subcategory scores
        const subScores: Record<string, { total: number; count: number }> = {}
        for (const dq of questions) {
          const sc = dq.subcategory
          if (!subScores[sc]) subScores[sc] = { total: 0, count: 0 }
          subScores[sc].total += updated[dq.id] || 3
          subScores[sc].count += 1
        }
        const result: Record<string, number> = {}
        for (const [sc, { total: t, count: c }] of Object.entries(subScores)) {
          result[sc] = Math.round((t / (c * 5)) * 100)
        }
        localStorage.setItem(`deepDiveResults_${areaKey}`, JSON.stringify({
          area: areaKey,
          subcategoryScores: result,
          answers: updated,
          completedAt: new Date().toISOString(),
        }))
        router.push(`/${areaKey}/deep-dive/results`)
      }
    }, 280)
  }

  const progress = (current / total) * 100
  const areaName = areaRecord.name as string

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
          <div className="flex items-center gap-2">
            <span className="text-base">{meta.icon}</span>
            <span className="font-semibold text-gray-800 capitalize">{areaName} Deep Dive</span>
          </div>
          <span className="text-sm text-gray-500 font-mono">{current + 1} / {total}</span>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-100">
          <motion.div
            className="h-full rounded-full"
            style={{ background: meta.hex }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Subcategory badge */}
          <motion.div
            key={q.id + '-badge'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2"
          >
            <span
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: meta.light, color: meta.hex }}
            >
              {subcatLabel}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: direction === 'forward' ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'forward' ? -40 : 40 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              <h2 id="deep-dive-question" className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-8">
                {q.question}
              </h2>

              <div role="group" aria-labelledby="deep-dive-question" className="grid grid-cols-5 gap-1.5 sm:gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-5">
                {OPTS.map(opt => {
                  const isSelected = chosen === opt.value
                  return (
                    <motion.button key={opt.value} type="button" onClick={() => handleSelect(opt.value)}
                      disabled={chosen !== null} aria-label={`${opt.value}: ${opt.label}`} aria-pressed={isSelected}
                      className="flex min-w-0 flex-col items-center gap-2 rounded-xl px-0.5 py-2 text-center transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-default"
                      style={{ outlineColor: meta.hex }}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 text-base font-bold tabular-nums transition-all sm:h-14 sm:w-14 sm:text-lg"
                        style={{
                          background: isSelected ? meta.hex : 'white',
                          borderColor: isSelected ? meta.hex : '#cbd5e1',
                          color: isSelected ? 'white' : '#334155',
                          boxShadow: isSelected ? `0 0 0 3px ${meta.hex}30` : undefined,
                        }}>
                        {opt.value}
                      </span>
                      <span className="text-[11px] font-semibold leading-tight text-slate-700 sm:text-sm">{opt.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer hint */}
      <div className="text-center pb-8 text-sm text-gray-400">
        Select an answer to advance automatically
      </div>
    </div>
  )
}
