import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiantlifebalance.com'
const TITLE    = 'Radiant Life Balance — 30 Questions to Change Your Life'
const DESC     = 'A doctor-created life balance assessment across 6 life areas — Mind, Body, Spirit, Relationships, Money & Direction. Discover your score and your personal roadmap in 5 minutes.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — Radiant Life Balance',
  },
  description: DESC,
  keywords: [
    'life balance quiz', 'life assessment', 'Dr Lemmon', 'personal growth',
    'wellness quiz', 'self improvement', 'life balance score', 'radiant life',
    'mind body spirit', 'personal development quiz',
  ],
  authors: [{ name: 'Dr. David Lemmon, ND' }],
  creator: 'Dr. David Lemmon, ND',
  publisher: 'Radiant Life Balance',
  openGraph: {
    type: 'website',
    siteName: 'Radiant Life Balance',
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    creator: '@DrLemmon',
    site: '@RadiantLifeBalance',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    other: {
      'impact-site-verification': 'f3609b86-400a-40bf-b227-ce97a212ea49',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
