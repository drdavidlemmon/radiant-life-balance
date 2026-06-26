import { notFound } from 'next/navigation'
import { areasData } from '@/lib/areas-data'
import { SubcategoryPageClient } from '@/components/subcategory-page-client'

interface Props {
  params: { area: string; subcategory: string }
}

export default function SubcategoryPage({ params }: Props) {
  const area = areasData[params.area]
  if (!area) notFound()

  const sub = area.subcategories.find((s) => s.id === params.subcategory)
  if (!sub) notFound()

  return <SubcategoryPageClient area={area} subcategory={sub} />
}
