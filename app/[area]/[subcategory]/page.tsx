import { notFound } from 'next/navigation'
import { areasData } from '@/lib/areas-data'
import { SubcategoryPageClient } from '@/components/subcategory-page-client'

interface Props {
  params: Promise<{ area: string; subcategory: string }>
}

export async function generateMetadata({params}: Props) {
  const {area: key, subcategory} = await params
  const area = areasData[key]
  const sub = area?.subcategories.find(s => s.id === subcategory)
  if (!sub) return {}
  return {title: `${sub.name} | ${area.name}`, description: sub.description,
    alternates: {canonical: `/${key}/${subcategory}`},
    openGraph: {title: sub.name, description: sub.description, url: `/${key}/${subcategory}`}}
}

export default async function SubcategoryPage({ params }: Props) {
  const { area: areaKey, subcategory: subcategoryId } = await params

  const area = areasData[areaKey]
  if (!area) notFound()

  const sub = area.subcategories.find((s) => s.id === subcategoryId)
  if (!sub) notFound()

  return <SubcategoryPageClient area={area} subcategory={sub} />
}
