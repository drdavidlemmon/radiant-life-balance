import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '30 Questions to Change Your Life',
  description: 'Take the free Radiant Life Balance quiz — 30 questions, 5 minutes, instant results across Mind, Body, Spirit, Relationships, Money & Direction.',
  openGraph: {
    title: '30 Questions to Change Your Life — Radiant Life Balance',
    description: 'Take the free quiz — 30 questions, 5 minutes, instant personal results.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '30 Questions to Change Your Life',
    description: '5 minutes to discover which life area needs your attention most.',
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
