"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2, Mail } from 'lucide-react'
import type { AreaKey } from '@/types'

const AREAS: { key: AreaKey; name: string; hex: string }[] = [
  { key: 'mind',          name: 'Mind',          hex: '#f97316' },
  { key: 'body',          name: 'Body',          hex: '#ef4444' },
  { key: 'spirit',        name: 'Spirit',        hex: '#eab308' },
  { key: 'relationships', name: 'Relationships', hex: '#3b82f6' },
  { key: 'money',         name: 'Money',         hex: '#22c55e' },
  { key: 'direction',     name: 'Direction',     hex: '#a855f7' },
]

interface NewsletterSignupProps {
  defaultChecked?: AreaKey[]
  title?: string
  subtitle?: string
}

export function NewsletterSignup({
  defaultChecked = [],
  title = 'Get personalized content for the areas that matter most to you',
  subtitle = 'Choose which life areas you want tips, articles, and resources for. Unsubscribe anytime.',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState<Set<AreaKey>>(new Set(defaultChecked))
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function toggleArea(key: AreaKey) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), areas: Array.from(selected) }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-8 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">You&apos;re subscribed!</h3>
        <p className="text-slate-500 text-sm">
          Check your inbox — personalized content for your selected areas is on its way.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {AREAS.map((area) => {
            const isChecked = selected.has(area.key)
            return (
              <label
                key={area.key}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm font-medium"
                style={
                  isChecked
                    ? { borderColor: area.hex, background: `${area.hex}0d`, color: '#0f172a' }
                    : { borderColor: '#e2e8f0', color: '#475569' }
                }
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArea(area.key)}
                  className="sr-only"
                />
                <span
                  className="w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center"
                  style={isChecked ? { background: area.hex, borderColor: area.hex } : { borderColor: '#cbd5e1' }}
                >
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </span>
                {area.name}
              </label>
            )
          })}
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-xs">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </button>

        <p className="text-slate-400 text-xs text-center">
          By subscribing you agree to our{' '}
          <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>. Unsubscribe anytime.
        </p>
      </form>
    </div>
  )
}
