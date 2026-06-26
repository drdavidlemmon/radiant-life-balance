import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your Life Balance Results',
  description: 'See your personalised life balance scores across all 6 areas — Mind, Body, Spirit, Relationships, Money & Direction — and get your priority roadmap.',
  openGraph: {
    title: 'Your Life Balance Results — Radiant Life Balance',
    description: 'Discover how you score across the 6 areas of a radiant life and get your personal growth roadmap.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Life Balance Results',
    description: 'Discover how you score across the 6 areas of a radiant life.',
  },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
