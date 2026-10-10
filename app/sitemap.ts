import type { MetadataRoute } from 'next'
import { areasData } from '@/lib/areas-data'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://radiantlifebalance.com').replace(/\/$/, '')
  const paths = ['', '/quiz', '/about', '/challenge', '/privacy', '/terms', '/disclaimer']
  for (const [key, area] of Object.entries(areasData)) {
    paths.push(`/${key}`)
    for (const sub of area.subcategories) {
      paths.push(`/${key}/${sub.id}`)
      for (const article of sub.articles) paths.push(`/${key}/${sub.id}/${article.id}`)
    }
  }
  return paths.map(path => ({url: `${base}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : path === '/quiz' ? 0.9 : 0.6}))
}
