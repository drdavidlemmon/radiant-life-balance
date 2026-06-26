import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { areasData } from '@/lib/areas-data'
import { AreaPageClient } from '@/components/area-page-client'

interface Props {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const data = areasData[area]
  if (!data) return {}
  return {
    title: `${data.name} — ${data.tagline}`,
    description: data.description.slice(0, 160),
    openGraph: {
      title: `${data.name} — Radiant Life Balance`,
      description: data.tagline,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} — ${data.tagline}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(areasData).map((area) => ({ area }))
}

export default async function AreaPage({ params }: Props) {
  const { area } = await params
  const data = areasData[area]
  if (!data) notFound()
  return <AreaPageClient area={data} />
}
