'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, RefreshCw, TrendingUp, ChevronRight, Zap, FileDown } from 'lucide-react'
import Image from 'next/image'
import { LifeBalanceChart } from '@/components/life-balance-chart'
import { MindMapHex } from '@/components/mind-map-hex'
import { DownloadPDFButton } from '@/components/download-pdf-button'
import { ShareResultsPanel } from '@/components/share-results-panel'
import { ShareImageButton } from '@/components/share-image-button'
import { AreaKey, QuizResults } from '@/types'

const AREA_META: Record<AreaKey, { name: string; icon: string; hex: string; light: string; textColor: string }> = {
  mind:          { name: 'Mind',          icon: '/icon-mind.png',          hex: '#f97316', light: '#fff7ed', textColor: '#c2410c' },
  body:          { name: 'Body',          icon: '/icon-body.png',          hex: '#ef4444', light: '#fef2f2', textColor: '#b91c1c' },
  spirit:        { name: 'Spirit',        icon: '/icon-spirit.png',        hex: '#eab308', light: '#fefce8', textColor: '#854d0e' },
  relationships: { name: 'Relationships', icon: '/icon-relationships.png', hex: '#3b82f6', light: '#eff6ff', textColor: '#1d4ed8' },
  money:         { name: 'Money',         icon: '/icon-money.png',         hex: '#22c55e', light: '#f0fdf4', textColor: '#15803d' },
  direction:     { name: 'Direction',     icon: '/icon-direction.png',     hex: '#a855f7', light: '#faf5ff', textColor: '#7e22ce' },
}

const DEMO: QuizResults = {
  scores: { mind: 72, body: 44, spirit: 58, relationships: 78, money: 36, direction: 52 },
  subcategoryScores: {
    body:          { energy: 60, exercise: 40, nutrition: 50, sleep: 20, 'specific-conditions': 60 },
    mind:          { learning: 80, memory: 70, focus: 65, creativity: 75 },
    spirit:        { gratitude: 60, happiness: 55, meditation: 50, forgiveness: 65, service: 60 },
    relationships: { communication: 80, family: 85, romantic: 70, networking: 75 },
    money:         { budgeting: 25, investing: 40, 'wealth-mindset': 45 },
    direction:     { 'life-vision': 50, 'time-management': 55, 'goal-setting': 45, habits: 60 },
  },
  priorities: ['money', 'body', 'direction', 'spirit', 'mind', 'relationships'],
  completedAt: new Date().toISOString(),
}

function scoreLabel(s: number) {
  if (s >= 80) return { label: 'Thriving',   color: '#22c55e' }
  if (s >= 60) return { label: 'Good',       color: '#3b82f6' }
  if (s >= 40) return { label: 'Developing', color: '#f97316' }
  if (s >= 20) return { label: 'Needs Work', color: '#ef4444' }
  return            { label: 'Critical',    color: '#dc2626' }
}

function OverallRing({ score }: { score: number }) {
  const r = 54, circ = 2 * Math.PI * r, dash = (score / 100) * circ
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="144" height="144">
        <circle cx="72" cy="72" r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
        <motion.circle cx="72" cy="72" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 72 72)"
          initial={{ strokeDasharray: `0 ${circ}` }} animate={{ strokeDasharray: `${dash} ${circ}` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }} />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#ef4444" />
            <stop offset="25%"  stopColor="#f97316" />
            <stop offset="50%"  stopColor="#22c55e" />
            <stop offset="75%"  stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-slate-900 tabular-nums">{score}%</div>
        <div className="text-xs text-slate-400 font-medium">{scoreLabel(score).label}</div>
      </div>
    </div>
  )
}

function DeepDiveCard({ areaKey, rank, deepDiveDone }: { areaKey: AreaKey; rank: number; deepDiveDone: boolean }) {
  const m = AREA_META[areaKey]
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * rank }}
      className="flex-1 min-w-0 rounded-2xl border-2 p-6 flex flex-col gap-4"
      style={{ borderColor: m.hex + '44', background: m.light }}
    >
      <div className="flex items-center gap-3">
        <Image src={m.icon} alt={m.name} width={80} height={80} className="object-contain flex-shrink-0" />
        <div>
          <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: m.hex }}>
            Priority #{rank} Area
          </div>
          <div className="font-bold text-gray-900 text-lg leading-tight">{m.name} Deep Dive</div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        Pinpoint exactly which of the 5 {m.name.toLowerCase()} subcategories needs the most attention with 15 targeted questions.
      </p>
      {deepDiveDone ? (
        <Link
          href={`/${areaKey}/deep-dive/results`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: m.hex }}
        >
          View {m.name} Results →
        </Link>
      ) : (
        <Link
          href={`/${areaKey}/deep-dive`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 shadow-md"
          style={{ background: m.hex }}
        >
          <Zap className="w-4 h-4" />
          Take {m.name} Deep Dive · 15 Questions
        </Link>
      )}
    </motion.div>
  )
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null)
  const [isDemo, setIsDemo] = useState(false)
  const [deepDiveDone, setDeepDiveDone] = useState<Record<AreaKey, boolean>>({
    body: false, mind: false, spirit: false, relationships: false, money: false, direction: false,
  })
  const [deepDiveScores, setDeepDiveScores] = useState<Record<string, Record<string, number>>>({})

  useEffect(() => {
    const stored = localStorage.getItem('lifebalance_results')
    if (stored) { setResults(JSON.parse(stored)) } else { setResults(DEMO); setIsDemo(true) }

    // Check which deep dives are done + load their subcategory scores for PDF
    const keys: AreaKey[] = ['body', 'mind', 'spirit', 'relationships', 'money', 'direction']
    const done: Record<AreaKey, boolean> = {} as Record<AreaKey, boolean>
    const ddScores: Record<string, Record<string, number>> = {}
    for (const k of keys) {
      const raw = localStorage.getItem(`deepDiveResults_${k}`)
      if (raw) {
        done[k] = true
        try { ddScores[k] = JSON.parse(raw) } catch { /* ignore */ }
      } else {
        done[k] = false
      }
    }
    setDeepDiveDone(done)
    setDeepDiveScores(ddScores)
  }, [])

  if (!results) return <div className="min-h-screen bg-white pt-20 flex items-center justify-center"><div className="text-slate-400">Loading…</div></div>

  const overall = Math.round(Object.values(results.scores).reduce((a, b) => a + b, 0) / 6)
  const top = results.priorities[0]
  const topTwo = results.priorities.slice(0, 2)
  const anyDeepDiveDone = Object.values(deepDiveDone).some(Boolean)

  return (
    <div className="min-h-screen bg-white">
      {isDemo && (
        <div className="bg-violet-50 border-b border-violet-200 px-4 py-2.5 text-center">
          <p className="text-violet-700 text-sm">
            Viewing <strong>sample results</strong>.{' '}
            <Link href="/quiz" className="text-violet-600 underline font-semibold">Take the quiz</Link> to see your real scores.
          </p>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Your Life Balance Report</h1>
          <p className="text-slate-500">A complete picture of how balanced your life is right now</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <OverallRing score={overall} />
          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Overall Life Balance Score</h2>
            <p className="text-slate-500 max-w-lg text-sm leading-relaxed">
              {overall >= 70 ? "You're living a well-rounded life — but there are still specific areas where focused improvement will make a meaningful difference."
                : overall >= 50 ? "You have solid foundations in some areas, but several dimensions need meaningful attention to reach your full potential."
                : "There are significant imbalances affecting your wellbeing. The good news: focused improvement in your lowest areas will have the biggest impact."}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Link href="/quiz" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-xs border border-slate-200 px-3 py-1.5 rounded-lg transition-colors hover:bg-white">
                <RefreshCw className="w-3 h-3" /> Retake: 30 Questions
              </Link>
              <DownloadPDFButton results={results} deepDiveResults={deepDiveScores} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Life Balance Radar</h3>
            <LifeBalanceChart scores={results.scores} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Your Life Mind Map</h3>
            <p className="text-slate-400 text-xs mb-2">Click any node to explore that area</p>
            <MindMapHex scores={results.scores} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Your Priority Areas</h2>
          <p className="text-slate-400 text-xs mb-6">Ranked from highest priority (lowest score) to lowest</p>
          <div className="space-y-3">
            {results.priorities.map((key, i) => {
              const m = AREA_META[key], score = results.scores[key]
              const { label, color } = scoreLabel(score)
              return (
                <Link href={`/${key}`} key={key}>
                  <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-white transition-all cursor-pointer group">
                    <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: m.hex }} />
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={i === 0 ? { background: m.hex, color: 'white' } : { background: '#f1f5f9', color: '#64748b' }}>
                      {i + 1}
                    </div>
                    <Image src={m.icon} alt={m.name} width={64} height={64} className="object-contain flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-slate-900 text-sm">{m.name}</span>
                        <div className="flex items-center gap-2.5 flex-shrink-0">
                          <span className="text-xs font-medium" style={{ color }}>{label}</span>
                          <span className="text-slate-900 font-bold text-sm tabular-nums">{score}%</span>
                        </div>
                      </div>
                      <div className="bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: m.hex }}
                          initial={{ width: 0 }} animate={{ width: `${score}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + i * 0.06, ease: 'easeOut' }} />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 flex-shrink-0 transition-colors" />
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* ── Deep Dive CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> Next Step: Deep Dive
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Pinpoint Your Exact Priorities
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Your two lowest-scoring areas are ready for a 15-question deep dive. Each quiz ranks all 5 subcategories so you know exactly where to focus first.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {topTwo.map((key, i) => (
              <DeepDiveCard
                key={key}
                areaKey={key}
                rank={i + 1}
                deepDiveDone={deepDiveDone[key]}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Save & Share Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8"
        >
          {/* PDF Download card */}
          <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 border border-purple-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
                <FileDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">Save Your Results as PDF</div>
                <div className="text-slate-500 text-xs mt-0.5">
                  {anyDeepDiveDone
                    ? 'Includes all 6 scores + your deep dive subcategory breakdown'
                    : 'A 2-page report with all 6 scores and Dr. Lemmon action steps'}
                </div>
              </div>
            </div>
            <DownloadPDFButton results={results} deepDiveResults={deepDiveScores} />
          </div>

          {/* Share results card */}
          <ShareResultsPanel results={results} />
        </motion.div>

        {/* ── Shareable Image Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden border border-purple-100 flex items-center justify-center bg-gradient-to-br from-purple-50 to-green-50">
              <span className="text-2xl">🎨</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Create a Shareable Results Card</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Generate a branded 1080x1080 image — perfect for Instagram, Pinterest, Stories & X
              </div>
            </div>
          </div>
          <ShareImageButton results={results} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <div className="mb-4"><Image src={AREA_META[top]?.icon ?? ''} alt={AREA_META[top]?.name ?? ''} width={112} height={112} className="object-contain mx-auto" /></div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Start with <span style={{ color: AREA_META[top]?.hex }}>{AREA_META[top]?.name}</span>
          </h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm mb-8 leading-relaxed">
            The fastest path to balance is improving your lowest-scoring area first. We have curated articles, books, courses, and tools to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${top}`}
              className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full hover:opacity-90 transition-all shadow-lg text-sm"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
              <TrendingUp className="w-4 h-4" /> Improve My {AREA_META[top]?.name}
            </Link>
            <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1">
              Explore All 6 Areas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
        <p className="text-center text-slate-400 text-xs mt-6">Score each area 0–100 · Repeat every 6 months · by Dr. David Lemmon, ND</p>
      </div>
    </div>
  )
}
