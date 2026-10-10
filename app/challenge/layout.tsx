import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Free 30-day challenge', alternates: { canonical: '/challenge' } }
export default function Layout({children}: {children: React.ReactNode}) { return <>{children}</> }
