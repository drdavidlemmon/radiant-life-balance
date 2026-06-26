'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, CheckCircle } from 'lucide-react'
import { quizQuestions } from '@/lib/quiz-data'
import Image from 'next/image'
import { AreaKey, QuizResults } from '@/types'

const AREA_META: Record<AreaKey, { name: string; icon: string; hex: string; light: string; text: string }> = {
  mind:          { name: 'Mind',          icon: '/icon-mind.png',          hex: '#f97316', light: '#fff7ed', text: '#c2410c' },
  body:          { name: 'Body',          icon: '/icon-body.png',          hex: '#ef4444', light: '#fef2f2', text: '#b91c1c' },
  spirit:        { name: 'Spirit',        icon: '/icon-spirit.png',        hex: '#eab308', light: '#fefce8', text: '#854d0e' },
  relationships: { name: 'Relationships', icon: '/icon-relationships.png', hex: '#3b82f6', light: '#eff6ff', text: '#1d4ed8' },
  money:         { name: 'Money',         icon: '/icon-money.png',         hex: '#22c55e', light: '#f0fdf4', text: '#15803d' },
  direction:     { name: 'Direction',     icon: '/icon-direction.png',     hex: '#a855f7', light: '#faf5ff', text: '#7e22ce' },
}
const AREA_ORDER: AreaKey[] = ['body', 'mind', 'spirit', 'direction', 'relationships', 'money']

const OPTS = [
  { value: 1, label: 'False',        sub: 'This is not like me at all' },
  { value: 2, label: 'Mostly False', sub: 'Rarely true for me' },
  { value: 3, label: 'Neutral',      sub: 'Sometimes true' },
  { value: 4, label: 'Mostly True',  sub: 'Often true for me' },
  { value: 5, label: 'True',         sub: 'This is definitely me' },
]

function calculateResults(answers: Record<string, number>): QuizResults {
  const totals: Record<AreaKey, number[]> = { mind: [], body: [], spirit: [], relationships: [], money: [], direction: [] }
  const subTotals: Record<AreaKey, Record<string, number[]>> = { mind: {}, body: {}, spirit: {}, relationships: {}, money: {}, direction: {} }

  quizQuestions.forEach((q) => {
    if (answers[q.id] === undefined) return
    totals[q.area].push(answers[q.id])
    if (!subTotals[q.area][q.subcategory]) subTotals[q.area][q.subcategory] = []
    subTotals[q.area][q.subcategory].push(answers[q.id])
  })

  const scores = {} as Record<AreaKey, number>
  for (const key of Object.keys(totals) as AreaKey[]) {
    const arr = totals[key]
    scores[key] = arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / (arr.length * 5)) * 100) : 0
  }

  const subcategoryScores = {} as Record<AreaKey, Record<string, number>>
  for (const areaKey of Object.keys(subTotals) as AreaKey[]) {
    subcategoryScores[areaKey] = {}
    for (const [sub, arr] of Object.entries(subTotals[areaKey])) {
      subcategoryScores[areaKey][sub] = arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / (arr.length * 5)) * 100) : 0
    }
  }

  const priorities = (Object.keys(scores) as AreaKey[]).sort((a, b) => scores[a] - scores[b])
  return { scores, subcategoryScores, priorities, completedAt: new Date().toISOString() }
}

export default function QuizPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [current, setCurrent] = useState(0)
  const [completing, setCompleting] = useState(false)

  const q = quizQuestions[current]
  const answered = answers[q?.id]
  const area = q ? AREA_META[q.area] : null
  const total = quizQuestions.length
  const answeredCount = Object.keys(answers).length

  const areaProgress = AREA_ORDER.map((key) => {
    const aqs = quizQuestions.filter((x) => x.area === key)
    const done = aqs.filter((x) => answers[x.id] !== undefined).length
    return { key, done, total: aqs.length, hex: AREA_META[key].hex }
  })

  const handleAnswer = useCallback((val: number) => {
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (current < total - 1) {
      setTimeout(() => setCurrent((c) => c + 1), 280)
    } else {
      setCompleting(true)
      const results = calculateResults(newAnswers)
      localStorage.setItem('lifebalance_results', JSON.stringify(results))
      setTimeout(() => router.push('/results'), 1800)
    }
  }, [answers, current, q, total, router])

  if (completing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-6 animate-spin" style={{ animationDuration: '3s' }}>🌸</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">30 Questions to Change Your Life</h2>
          <p className="text-slate-500 text-sm mb-8">Preparing your personal life balance report…</p>
          <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-slate-100">
            {AREA_ORDER.map((key) => (
              <motion.div key={key} className="h-full rounded-full" style={{ background: AREA_META[key].hex }}
                initial={{ flex: 0 }} animate={{ flex: 1 }}
                transition={{ duration: 0.6, delay: AREA_ORDER.indexOf(key) * 0.15 }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky header */}
      <div className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          {current > 0 && (
            <button onClick={() => setCurrent((c) => c - 1)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <div className="flex gap-1 h-1.5 rounded-full overflow-hidden">
              {areaProgress.map((ap) => (
                <div key={ap.key} className="flex-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: ap.hex }}
                    animate={{ width: `${(ap.done / ap.total) * 100}%` }} transition={{ duration: 0.3 }} />
                </div>
              ))}
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium flex-shrink-0 tabular-nums">{answeredCount}/{total}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-28 pb-16">
        {/* Quiz title */}
        <div className="mb-6">
          <h1 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            30 Questions to Change Your Life
          </h1>
        </div>

        {/* Area chip */}
        {area && (
          <motion.div key={q.area} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-6 border"
            style={{ background: area.light, color: area.text, borderColor: area.hex + '40' }}>
            <Image src={area.icon} alt={area.name} width={40} height={40} className="object-contain flex-shrink-0" />
            {area.name}
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
              How true is the following for you right now?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-10">
              &ldquo;{q.question}&rdquo;
            </h2>

            <div className="space-y-2.5">
              {OPTS.map((opt) => {
                const isSelected = answered === opt.value
                return (
                  <button key={opt.value} onClick={() => handleAnswer(opt.value)}
                    className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-150 hover:-translate-y-0.5"
                    style={{
                      background: isSelected ? area?.light : 'white',
                      borderColor: isSelected ? area?.hex : '#e2e8f0',
                      boxShadow: isSelected ? `0 0 0 3px ${area?.hex}20` : '0 1px 2px rgba(0,0,0,0.04)',
                    }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all"
                      style={{ background: isSelected ? area?.hex : '#f1f5f9', color: isSelected ? 'white' : '#64748b' }}>
                      {isSelected ? <CheckCircle className="w-4 h-4" /> : opt.value}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{opt.sub}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="text-center text-slate-400 text-xs mt-8">Question {current + 1} of {total}</p>
      </div>
    </div>
  )
}
