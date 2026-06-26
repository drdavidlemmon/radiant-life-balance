'use client'

import { useState } from 'react'
import { ImageDown, Loader2 } from 'lucide-react'
import { QuizResults, AreaKey } from '@/types'

const AREA_META: Record<AreaKey, { name: string; hex: string }> = {
  mind:          { name: 'Mind',          hex: '#f97316' },
  body:          { name: 'Body',          hex: '#ef4444' },
  spirit:        { name: 'Spirit',        hex: '#eab308' },
  relationships: { name: 'Relationships', hex: '#3b82f6' },
  money:         { name: 'Money',         hex: '#22c55e' },
  direction:     { name: 'Direction',     hex: '#a855f7' },
}

const ORDER: AreaKey[] = ['mind', 'body', 'spirit', 'relationships', 'money', 'direction']

function scoreLabel(s: number) {
  if (s >= 80) return 'Thriving'
  if (s >= 60) return 'Good'
  if (s >= 40) return 'Developing'
  if (s >= 20) return 'Needs Work'
  return 'Critical'
}

// Draw a rounded rectangle path
function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const safe = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + safe, y)
  ctx.lineTo(x + w - safe, y)
  ctx.arcTo(x + w, y, x + w, y + safe, safe)
  ctx.lineTo(x + w, y + h - safe)
  ctx.arcTo(x + w, y + h, x + w - safe, y + h, safe)
  ctx.lineTo(x + safe, y + h)
  ctx.arcTo(x, y + h, x, y + h - safe, safe)
  ctx.lineTo(x, y + safe)
  ctx.arcTo(x, y, x + safe, y, safe)
  ctx.closePath()
}

async function generateShareCard(results: QuizResults): Promise<Blob> {
  const W = 1080, H = 1080
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  const PAD = 70
  const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'

  // ── Background: white + very subtle purple tint in corner
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  const bgGrad = ctx.createRadialGradient(W * 0.9, 0, 0, W * 0.9, 0, W * 0.7)
  bgGrad.addColorStop(0, 'rgba(168,85,247,0.06)')
  bgGrad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, W, H)

  const bgGrad2 = ctx.createRadialGradient(0, H, 0, 0, H, W * 0.6)
  bgGrad2.addColorStop(0, 'rgba(34,197,94,0.05)')
  bgGrad2.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = bgGrad2
  ctx.fillRect(0, 0, W, H)

  // ── Top gradient stripe
  const stripe = ctx.createLinearGradient(0, 0, W, 0)
  stripe.addColorStop(0,   '#a855f7')
  stripe.addColorStop(0.5, '#3b82f6')
  stripe.addColorStop(1,   '#22c55e')
  ctx.fillStyle = stripe
  ctx.fillRect(0, 0, W, 16)

  // ── Brand header
  ctx.textAlign = 'center'
  ctx.fillStyle = '#1e293b'
  ctx.font = `bold 58px ${FONT}`
  ctx.fillText('RADIANT LIFE BALANCE', W / 2, 95)

  ctx.fillStyle = '#64748b'
  ctx.font = `26px ${FONT}`
  ctx.fillText('Life Balance Assessment  ·  Dr. David Lemmon, ND', W / 2, 138)

  // Thin divider
  ctx.strokeStyle = '#e2e8f0'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(PAD, 162)
  ctx.lineTo(W - PAD, 162)
  ctx.stroke()

  // ── Overall score — large centered display
  const overall = Math.round(
    Object.values(results.scores).reduce((a, b) => a + b, 0) / Object.values(results.scores).length
  )
  const SCY = 268  // score circle center Y
  const SR  = 88   // radius

  // Track arc background
  ctx.beginPath()
  ctx.arc(W / 2, SCY, SR, 0, 2 * Math.PI)
  ctx.strokeStyle = '#f1f5f9'
  ctx.lineWidth = 14
  ctx.stroke()

  // Score arc (gradient)
  const arcLen = (overall / 100) * 2 * Math.PI
  const arcGrad = ctx.createLinearGradient(W / 2 - SR, SCY, W / 2 + SR, SCY)
  arcGrad.addColorStop(0,   '#a855f7')
  arcGrad.addColorStop(0.5, '#3b82f6')
  arcGrad.addColorStop(1,   '#22c55e')
  ctx.beginPath()
  ctx.arc(W / 2, SCY, SR, -Math.PI / 2, -Math.PI / 2 + arcLen, false)
  ctx.strokeStyle = arcGrad
  ctx.lineWidth = 14
  ctx.lineCap = 'round'
  ctx.stroke()

  // Score number
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#1e293b'
  ctx.font = `bold 68px ${FONT}`
  ctx.fillText(`${overall}%`, W / 2, SCY - 8)
  ctx.fillStyle = '#94a3b8'
  ctx.font = `bold 20px ${FONT}`
  ctx.letterSpacing = '2px'
  ctx.fillText(scoreLabel(overall).toUpperCase(), W / 2, SCY + 42)
  ctx.letterSpacing = '0px'
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = '#94a3b8'
  ctx.font = `22px ${FONT}`
  ctx.fillText('Overall Life Balance Score', W / 2, SCY + SR + 34)

  // ── Section label
  ctx.fillStyle = '#cbd5e1'
  ctx.font = `bold 18px ${FONT}`
  ctx.letterSpacing = '3px'
  ctx.fillText('YOUR 6 LIFE AREAS', W / 2, 430)
  ctx.letterSpacing = '0px'

  // ── Area bars
  const LABEL_W = 210
  const BAR_X   = PAD + LABEL_W        // bar start X
  const BAR_END  = W - PAD             // bar end X
  const BAR_W    = BAR_END - BAR_X     // total bar width
  const BAR_H    = 62
  const BAR_GAP  = 14
  const BAR_START_Y = 452

  ORDER.forEach((key, i) => {
    const m    = AREA_META[key]
    const score = results.scores[key] ?? 0
    const y    = BAR_START_Y + i * (BAR_H + BAR_GAP)
    const fillW = Math.max(BAR_H, (score / 100) * BAR_W)   // min fill = pill radius × 2
    const textInside = fillW > BAR_W * 0.82

    // Area name label
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#334155'
    ctx.font = `bold 28px ${FONT}`
    ctx.fillText(m.name, PAD + LABEL_W - 18, y + BAR_H / 2)

    // Background track
    rrect(ctx, BAR_X, y, BAR_W, BAR_H, BAR_H / 2)
    ctx.fillStyle = '#f1f5f9'
    ctx.fill()

    // Filled bar
    rrect(ctx, BAR_X, y, fillW, BAR_H, BAR_H / 2)
    const bGrad = ctx.createLinearGradient(BAR_X, 0, BAR_X + fillW, 0)
    bGrad.addColorStop(0, m.hex + 'bb')
    bGrad.addColorStop(1, m.hex)
    ctx.fillStyle = bGrad
    ctx.fill()

    // Score text
    ctx.textBaseline = 'middle'
    if (textInside) {
      ctx.fillStyle = '#ffffff'
      ctx.font = `bold 26px ${FONT}`
      ctx.textAlign = 'right'
      ctx.fillText(`${score}%`, BAR_X + fillW - 18, y + BAR_H / 2)
    } else {
      ctx.fillStyle = m.hex
      ctx.font = `bold 26px ${FONT}`
      ctx.textAlign = 'left'
      ctx.fillText(`${score}%`, BAR_X + fillW + 14, y + BAR_H / 2)
    }
  })

  ctx.textBaseline = 'alphabetic'

  // ── Priority badge strip at the bottom
  const top2 = (results.priorities.slice(0, 2) as AreaKey[])
  const BADGE_Y = BAR_START_Y + ORDER.length * (BAR_H + BAR_GAP) + 24

  ctx.textAlign = 'center'
  ctx.fillStyle = '#94a3b8'
  ctx.font = `bold 18px ${FONT}`
  ctx.letterSpacing = '2px'
  ctx.fillText('TOP FOCUS AREAS', W / 2, BADGE_Y)
  ctx.letterSpacing = '0px'

  // Draw two colored badge pills
  const BDGE_W = 280, BDGE_H = 52, BDGE_GAP = 20
  const totalBadgeW = 2 * BDGE_W + BDGE_GAP
  const bx0 = (W - totalBadgeW) / 2

  top2.forEach((key, i) => {
    const m = AREA_META[key]
    const bx = bx0 + i * (BDGE_W + BDGE_GAP)
    const by = BADGE_Y + 14

    rrect(ctx, bx, by, BDGE_W, BDGE_H, BDGE_H / 2)
    ctx.fillStyle = m.hex + '22'
    ctx.fill()
    rrect(ctx, bx, by, BDGE_W, BDGE_H, BDGE_H / 2)
    ctx.strokeStyle = m.hex + '66'
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Dot
    ctx.beginPath()
    ctx.arc(bx + 28, by + BDGE_H / 2, 8, 0, 2 * Math.PI)
    ctx.fillStyle = m.hex
    ctx.fill()

    // Label
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = m.hex
    ctx.font = `bold 24px ${FONT}`
    ctx.fillText(m.name, bx + BDGE_W / 2 + 8, by + BDGE_H / 2)
  })

  ctx.textBaseline = 'alphabetic'

  // ── Footer
  ctx.textAlign = 'center'
  ctx.fillStyle = '#94a3b8'
  ctx.font = `24px ${FONT}`
  ctx.fillText('Take the free quiz at  radiantlifebalance.com', W / 2, H - 48)

  // Bottom gradient stripe
  const botStripe = ctx.createLinearGradient(0, 0, W, 0)
  botStripe.addColorStop(0,   '#a855f7')
  botStripe.addColorStop(0.5, '#3b82f6')
  botStripe.addColorStop(1,   '#22c55e')
  ctx.fillStyle = botStripe
  ctx.fillRect(0, H - 16, W, 16)

  // Export
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => (blob ? resolve(blob) : reject(new Error('Canvas export failed'))),
      'image/png'
    )
  })
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  results: QuizResults
  variant?: 'default' | 'compact'
}

export function ShareImageButton({ results, variant = 'default' }: Props) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const blob = await generateShareCard(results)
      const url  = URL.createObjectURL(blob)
      setPreview(url)
      setShowPreview(true)
    } catch (err) {
      console.error('Share card generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleDownload() {
    if (!preview) return
    const a = document.createElement('a')
    a.href = preview
    a.download = 'my-life-balance-score.png'
    a.click()
  }

  function handleClose() {
    setShowPreview(false)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
          text-purple-700 border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50
          disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      >
        {loading
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <ImageDown className="w-4 h-4" />}
        {loading ? 'Generating…' : 'Create Share Image'}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
          bg-white border-2 border-purple-200 text-purple-700
          hover:border-purple-400 hover:bg-purple-50
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm hover:shadow-md"
      >
        {loading
          ? <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          : <ImageDown className="w-4 h-4" />}
        {loading ? 'Generating image…' : 'Create Shareable Image'}
      </button>

      {/* Preview modal */}
      {showPreview && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={handleClose}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 flex flex-col gap-5"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Your Results Card</h3>
                <p className="text-slate-400 text-sm mt-0.5">Download and share on any platform</p>
              </div>
              <button onClick={handleClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors text-sm font-bold">
                ✕
              </button>
            </div>

            {/* Preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Your Life Balance Score card" className="w-full rounded-2xl border border-slate-100 shadow-sm" />

            <div className="flex gap-3">
              <button onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
                <ImageDown className="w-4 h-4" />
                Download PNG
              </button>
              <button onClick={handleClose}
                className="px-5 py-3 rounded-xl text-slate-500 font-medium text-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                Close
              </button>
            </div>

            <p className="text-center text-slate-400 text-xs">
              Share to Instagram, Pinterest, X, WhatsApp — anywhere you like
            </p>
          </div>
        </div>
      )}
    </>
  )
}
