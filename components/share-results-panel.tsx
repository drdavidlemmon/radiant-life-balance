'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Share2, Copy, Check, Mail, Facebook, Users } from 'lucide-react'
import { QuizResults, AreaKey } from '@/types'
import { ShareImageButton } from '@/components/share-image-button'
import { trackEvent } from '@/lib/analytics'

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const AREA_NAMES: Record<AreaKey, string> = {
  mind: 'Mind', body: 'Body', spirit: 'Spirit',
  relationships: 'Relationships', money: 'Money', direction: 'Direction',
}

interface Props {
  results: QuizResults
}

export function ShareResultsPanel({ results }: Props) {
  const [copied, setCopied] = useState(false)
  const [copiedMsg, setCopiedMsg] = useState(false)

  const highestScore = Math.max(...Object.values(results.scores))
  const lowestScore = Math.min(...Object.values(results.scores))
  const strongest = [...results.priorities].reverse().find(area => results.scores[area] === highestScore)!
  const improvement = results.priorities.find(area => results.scores[area] === lowestScore)!
  const strongestTied = Object.values(results.scores).filter(score => score === highestScore).length > 1
  const lowestTied = Object.values(results.scores).filter(score => score === lowestScore).length > 1
  const allEqual = highestScore === lowestScore
  const quizUrl = typeof window !== 'undefined' ? `${window.location.origin}/quiz` : 'https://radiantlifebalance.com/quiz'
  const strengthLabel = strongestTied ? 'One of my strongest areas' : 'My strongest area'
  const growthLabel = allEqual ? 'An area I can keep building on' : lowestTied ? 'One of my greatest opportunities for improvement' : 'My greatest opportunity for improvement'
  const strengthLine = `${strengthLabel} was ${AREA_NAMES[strongest]} at ${highestScore}%.`
  const growthLine = allEqual ? `All six areas tied at ${highestScore}%; I can keep growing in each one.` : `${growthLabel} was ${AREA_NAMES[improvement]} at ${lowestScore}%.`
  const tweetText = `I took the Radiant Life Balance quiz!\n\n${strengthLine}\n${growthLine}\n\nWhat is your strongest area? Take the free quiz:`
  const longText = `${tweetText}\n${quizUrl}`

  const emailSubject = `My Radiant Life Balance results — and a quiz for you`
  const emailBody = longText

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(quizUrl)}`
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(quizUrl)}&quote=${encodeURIComponent(`${strengthLine} ${growthLine} Find out your strongest area:`)}`
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(longText)}`
  const emailHref = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  async function copyLink() {
    await navigator.clipboard.writeText(quizUrl)
    trackEvent('share')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(longText)
    trackEvent('share')
    setCopiedMsg(true)
    setTimeout(() => setCopiedMsg(false), 2200)
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Life Balance Results', text: tweetText, url: quizUrl })
        trackEvent('share')
      } catch { /* dismissed */ }
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-100">
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">Challenge a Friend</h3>
          <p className="text-slate-400 text-xs">Share your results and invite them to take the quiz</p>
        </div>
        {/* Mobile native share */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button onClick={handleNativeShare}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-700 border border-purple-200 hover:bg-purple-50 transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        )}
      </div>

      {/* Branded summary: celebrate a strength before introducing a growth opportunity. */}
      <div className="rounded-2xl p-5 sm:p-6 mb-5 border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 font-sans">
        <div className="flex items-center gap-3 mb-5">
          <Image src="/logo.png" alt="Radiant Life Balance flower logo" width={46} height={46} className="object-contain flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-purple-800">Radiant Life Balance</p>
            <p className="text-xs text-slate-500">Your shareable summary</p>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-100 p-4 sm:p-5">
          <p className="text-sm sm:text-base font-medium text-slate-600 mb-3">{strengthLabel}</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Image src={`/icon-${strongest}.png`} alt={AREA_NAMES[strongest]} width={64} height={64} className="object-contain flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 break-words">{AREA_NAMES[strongest]}</p>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-purple-800">{highestScore}%</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 px-1">
          <Image src={`/icon-${improvement}.png`} alt={AREA_NAMES[improvement]} width={42} height={42} className="object-contain flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm text-slate-600 leading-relaxed">{growthLabel}</p>
            <p className="text-base font-semibold text-slate-800">{AREA_NAMES[improvement]} · {lowestScore}%</p>
            {allEqual && <p className="text-xs text-slate-500 mt-1">All six areas have the same score.</p>}
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-5 leading-relaxed">What is your strongest area? Take the free Life Balance quiz and find out.</p>
        <button onClick={copyMessage}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-purple-700 hover:text-purple-900 transition-colors font-medium">
          {copiedMsg ? <><Check className="w-4 h-4 text-green-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy message</>}
        </button>
      </div>

      {/* Social buttons */}
      <p className="text-xs text-slate-500 mb-3">Try it together: ask a friend or partner which area they want to strengthen first.</p>
      <a href={`sms:?&body=${encodeURIComponent(longText)}`} onClick={() => trackEvent('share')}
        className="block text-center rounded-xl bg-purple-600 text-white font-semibold text-sm py-2.5 mb-3">Invite by text message</a>
      <div className="grid grid-cols-4 gap-2 mb-4">
        <a href={twitterHref} onClick={() => trackEvent('share')} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
            <XIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">X / Twitter</span>
        </a>
        <a href={whatsappHref} onClick={() => trackEvent('share')} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">WhatsApp</span>
        </a>
        <a href={facebookHref} onClick={() => trackEvent('share')} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center">
            <Facebook className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Facebook</span>
        </a>
        <a href={emailHref} onClick={() => trackEvent('share')}
          className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Email</span>
        </a>
      </div>

      {/* Create image button */}
      <div className="flex items-center justify-between border border-slate-100 rounded-xl px-3 py-2.5 mb-1 bg-slate-50/50">
        <span className="text-xs text-slate-500 font-medium">Create a shareable image card</span>
        <ShareImageButton results={results} variant="compact" />
      </div>

      {/* Copy link strip */}
      <button onClick={copyLink}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
        <div className="flex items-center gap-2 min-w-0">
          <Share2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate text-xs text-slate-400 font-mono">{quizUrl}</span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {copied
            ? <><Check className="w-4 h-4 text-green-500" /><span className="text-xs text-green-600 font-medium">Copied!</span></>
            : <><Copy className="w-4 h-4 text-slate-400" /><span className="text-xs text-slate-400">Copy link</span></>}
        </div>
      </button>
    </div>
  )
}
