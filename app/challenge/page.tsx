'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const prompts = [
  'Choose one priority and name why it matters.', 'Take one action that takes less than five minutes.', 'Notice a strength you can use today.',
  'Invite someone you trust to support your goal.', 'Make your next step easier to start.', 'Record one small win.', 'Review your first week.',
  'Pick a repeatable morning cue.', 'Protect 10 minutes for a priority.', 'Try one article related to your lowest area.',
  'Ask what has helped in a stronger area.', 'Make one environment change.', 'Reach out to a friend or family member.', 'Notice what gave you energy.',
  'Review your second week.', 'Pick one distraction to reduce.', 'Try a brief walk or pause.', 'Name something you are grateful for.',
  'Take one practical money or planning step.', 'Practice a clear, kind conversation.', 'Celebrate a consistent habit.', 'Review your third week.',
  'Think about how two life areas connect.', 'Ask for help with one obstacle.', 'Repeat your most useful practice.', 'Try a new resource.',
  'Plan a realistic next week.', 'Share what has changed with someone.', 'Revisit your starting priority.', 'Choose the one practice you want to continue.',
]

export default function ChallengePage() {
  const [done, setDone] = useState<number[]>([])
  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem('radiant_challenge_days') || '[]')) } catch { /* reset corrupt data */ }
  }, [])
  function toggle(day: number) {
    const updated = done.includes(day) ? done.filter(n => n !== day) : [...done, day]
    setDone(updated); localStorage.setItem('radiant_challenge_days', JSON.stringify(updated))
  }
  return <main className="max-w-3xl mx-auto px-5 pt-28 pb-20">
    <h1 className="text-4xl font-bold text-slate-900 mb-4">Your free 30-day balance challenge</h1>
    <p className="text-slate-600 mb-7">One small step per day. Check off each action as you go. Your progress stays in this browser.</p>
    <p className="mb-7 text-purple-700 font-semibold">{done.length} of 30 days complete</p>
    <div className="grid gap-3">{prompts.map((prompt, i) => <label key={i} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 cursor-pointer hover:border-purple-300">
      <input type="checkbox" checked={done.includes(i + 1)} onChange={() => toggle(i + 1)} className="h-5 w-5 accent-purple-600" />
      <span><strong className="text-purple-700">Day {i + 1}:</strong> {prompt}</span>
    </label>)}</div>
    <Link href="/results" className="inline-block mt-8 text-purple-700 font-semibold">Return to your results</Link>
  </main>
}
