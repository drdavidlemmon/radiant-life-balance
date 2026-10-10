'use client'

import { useState } from 'react'
import { ImageDown, Loader2 } from 'lucide-react'
import { QuizResults } from '@/types'
import { AREA_NAMES, shareSummary } from '@/lib/share-summary'
import { trackEvent } from '@/lib/analytics'

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not load the share image artwork. Please retry.'))
    image.src = src
  })
}

export async function generateShareCard(results: QuizResults, includeGrowth = false): Promise<Blob> {
  await document.fonts.ready
  const font = typeof getComputedStyle === 'function' ? getComputedStyle(document.documentElement).getPropertyValue('--font-inter').trim() || 'Arial' : 'Arial'
  const fontFamily = `${font}, sans-serif`
  const summary = shareSummary(results, includeGrowth)
  const [logo, strength, growth] = await Promise.all([
    loadImage('/logo.png'), loadImage(`/icon-${summary.strongest}.png`),
    includeGrowth ? loadImage(`/icon-${summary.growth}.png`) : Promise.resolve(null),
  ])
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1080
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('This browser cannot create an image. Try another browser.')
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 1080, 1080)
  const gradient = ctx.createLinearGradient(0, 0, 1080, 0)
  for (const [stop, color] of [[0, '#ef4444'], [0.2, '#f97316'], [0.4, '#eab308'], [0.6, '#22c55e'], [0.8, '#3b82f6'], [1, '#a855f7']] as [number,string][]) gradient.addColorStop(stop, color)
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 1080, 12); ctx.fillRect(0, 1068, 1080, 12)
  ctx.drawImage(logo, 470, 55, 140, 146)
  ctx.textAlign = 'center'; ctx.fillStyle = '#334155'
  ctx.font = `600 35px ${fontFamily}`; ctx.fillText('Radiant Life Balance', 540, 248)
  ctx.font = `400 32px ${fontFamily}`; ctx.fillStyle = '#64748b'; ctx.fillText(summary.strengthLabel, 540, 325)
  ctx.drawImage(strength, 430, 360, 220, 220)
  ctx.fillStyle = '#0f172a'; ctx.font = `600 60px ${fontFamily}`; ctx.fillText(AREA_NAMES[summary.strongest], 540, 650)
  ctx.fillStyle = '#7e22ce'; ctx.font = `700 76px ${fontFamily}`; ctx.fillText(`${summary.high}%`, 540, 742)
  if (includeGrowth && growth) {
    ctx.drawImage(growth, 245, 791, 74, 74)
    ctx.textAlign = 'left'; ctx.fillStyle = '#64748b'; ctx.font = `400 23px ${fontFamily}`; ctx.fillText(summary.growthLabel, 340, 812)
    ctx.fillStyle = '#334155'; ctx.font = `600 30px ${fontFamily}`; ctx.fillText(`${AREA_NAMES[summary.growth]} · ${summary.low}%`, 340, 854)
  }
  ctx.textAlign = 'center'; ctx.fillStyle = '#475569'; ctx.font = `400 30px ${fontFamily}`; ctx.fillText('What is your strongest area?', 540, 945)
  ctx.font = `600 25px ${fontFamily}`; ctx.fillText('Take the free quiz · radiantlifebalance.com/quiz', 540, 996)
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image export failed. Please retry.')), 'image/png'))
}

// ── Component ─────────────────────────────────────────────────────────────────
interface Props {
  results: QuizResults
  variant?: 'default' | 'compact'
  includeGrowth?: boolean
}

export function ShareImageButton({ results, variant = 'default', includeGrowth = false }: Props) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  async function handleGenerate() {
    setError('')
    setLoading(true)
    try {
      const blob = await generateShareCard(results, includeGrowth)
      setImageBlob(blob)
      const url  = URL.createObjectURL(blob)
      setPreview(url)
      setShowPreview(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the image. Please retry.')
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
    trackEvent('share', {method: 'image_download'})
  }

  async function handleShareImage() {
    if (!imageBlob) return
    const file = new File([imageBlob], 'my-life-balance-summary.png', {type: 'image/png'})
    if (!navigator.canShare?.({files: [file]})) { handleDownload(); return }
    try {await navigator.share({files: [file], title: 'My Radiant Life Balance summary'}); trackEvent('share', {method: 'image_native'})}
    catch (error) {if (!(error instanceof DOMException && error.name === 'AbortError')) setError('Image sharing is unavailable. Download the PNG instead.')}
  }

  function handleClose() {
    setShowPreview(false)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setImageBlob(null)
  }

  const trigger = variant === 'compact' ? (
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
  ) : (
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
  )

  return (
    <>
      {trigger}
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

      {/* Preview modal */}
      {showPreview && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog" aria-modal="true" aria-label="Your share image" onClick={handleClose}>
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
            <img src={preview} alt="Your strength-first Life Balance summary" className="w-full rounded-2xl border border-slate-100 shadow-sm" />

            <div className="flex gap-3">
              <button onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm shadow-md hover:opacity-90 transition-all"
                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
                <ImageDown className="w-4 h-4" />
                Download PNG
              </button>
              <button onClick={handleShareImage} className="px-4 py-3 rounded-xl border border-purple-200 text-purple-700 text-sm font-medium">Share image</button>
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
