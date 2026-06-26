'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { deepDiveQuestions } from '@/lib/deep-dive-data'
import { areasData } from '@/lib/areas-data'
import type { AreaKey } from '@/types'

const OPTS = [
  { value: 1, label: 'False',        sub: 'This does not describe me at all' },
  { value: 2, label: 'Mostly False', sub: 'This rarely describes me' },
  { value: 3, label: 'Neutral',      sub: 'This sometimes describes me' },
  { value: 4, label: 'Mostly True',  sub: 'This often describes me' },
  { value: 5, label: 'True',         sub: 'This consistently describes me' },
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
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-10">
                {q.question}
              </h2>

              <div className="flex flex-col gap-3">
                {OPTS.map(opt => {
                  const isSelected = chosen === opt.value
                  return (
                    <motion.button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      disabled={chosen !== null}
                      whileHover={{ scale: chosen === null ? 1.015 : 1 }}
                      whileTap={{ scale: 0.985 }}
                      className={[
                        'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150',
                        isSelected
                          ? 'text-white shadow-lg scale-[1.015]'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-gray-800',
                        chosen !== null && !isSelected ? 'opacity-40' : '',
                        'disabled:cursor-default',
                      ].join(' ')}
                      style={isSelected ? { background: meta.hex, borderColor: meta.hex } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-base">{opt.label}</div>
                          <div className={`text-sm mt-0.5 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                            {opt.sub}
                          </div>
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-xl ml-4 flex-shrink-0"
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
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
