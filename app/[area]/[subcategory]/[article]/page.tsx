import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { areasData as AREAS_DATA } from '@/lib/areas-data'
import { ALL_ARTICLE_CONTENT as ARTICLE_CONTENT } from '@/lib/article-content-combined'
import type { AreaKey } from '@/types'
import ReactMarkdown from 'react-markdown'

interface Params {
  area: string
  subcategory: string
  article: string
}

export async function generateStaticParams() {
  const params: Params[] = []
  for (const [areaKey, area] of Object.entries(AREAS_DATA)) {
    for (const sub of area.subcategories) {
      for (const art of sub.articles) {
        params.push({ area: areaKey, subcategory: sub.id, article: art.id })
      }
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { area, subcategory, article: articleId } = await params
  const areaData = AREAS_DATA[area as AreaKey]
  if (!areaData) return {}
  const sub = areaData.subcategories.find(s => s.id === subcategory)
  if (!sub) return {}
  const art = sub.articles.find(a => a.id === articleId)
  if (!art) return {}
  return {
    title: `${art.title} | ${areaData.name} | Radiant Life Balance`,
    description: art.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { area, subcategory, article: articleId } = await params
  const areaData = AREAS_DATA[area as AreaKey]
  if (!areaData) notFound()

  const sub = areaData.subcategories.find(s => s.id === subcategory)
  if (!sub) notFound()

  const art = sub.articles.find(a => a.id === articleId)
  if (!art) notFound()

  const content = ARTICLE_CONTENT[articleId]
  const areaColor = areaData.color

  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <div className="h-1 w-full" style={{ backgroundColor: areaColor }} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 flex-wrap">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href={`/${area}`} className="hover:text-slate-600 transition-colors capitalize">{areaData.name}</Link>
          <span>›</span>
          <Link href={`/${area}/${subcategory}`} className="hover:text-slate-600 transition-colors capitalize">{sub.name}</Link>
          <span>›</span>
          <span className="text-slate-600 line-clamp-1">{art.title}</span>
        </nav>

        {/* Area badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: areaColor }}
          >
            <Image src={`/icon-${area}.png`} alt={areaData.name} width={28} height={28} className="opacity-90" />
            {areaData.name} · {sub.name}
          </span>
          <span className="text-xs text-slate-400">{art.readTime}</span>
        </div>

        {/* Article title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
          {art.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-slate-500 leading-relaxed mb-8 border-l-4 pl-4" style={{ borderColor: areaColor }}>
          {art.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {art.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Article content */}
        {content ? (
          <article className="prose prose-slate prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-h1:text-3xl prose-h2:text-xl prose-h3:text-lg
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-strong:text-slate-900
            prose-li:text-slate-700
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:text-slate-500 prose-blockquote:italic
            prose-hr:border-slate-200">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-8 text-center">
            <p className="text-slate-500">Full article content coming soon.</p>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Link
            href={`/${area}/${subcategory}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Back to {sub.name}
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: areaColor }}
          >
            Take the Assessment →
          </Link>
        </div>
      </div>
    </div>
  )
}
