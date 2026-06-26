'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, ExternalLink, Clock, ChevronRight, BookOpen, ShoppingBag } from 'lucide-react'
import { AreaData, Subcategory, Product } from '@/types'

interface Props { area: AreaData; subcategory: Subcategory }

const TYPE_META: Record<Product['type'], { label: string; bg: string; text: string; border: string }> = {
  book:       { label: 'Book',       bg: '#faf5ff', text: '#7e22ce', border: '#e9d5ff' },
  course:     { label: 'Course',     bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
  supplement: { label: 'Supplement', bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
  physical:   { label: 'Product',    bg: '#fff7ed', text: '#c2410c', border: '#fed7aa' },
}

type Tab = 'articles' | 'resources'

export function SubcategoryPageClient({ area, subcategory }: Props) {
  const [tab, setTab] = useState<Tab>('articles')

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-20 pb-12 border-b border-slate-100" style={{ background: area.color + '08' }}>
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: area.color }} />
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/results" className="hover:text-slate-700 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Results
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/${area.key}`} className="hover:text-slate-700 transition-colors" style={{ color: area.color }}>{area.name}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-600">{subcategory.name}</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: area.color }}>{area.name}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{subcategory.name}</h1>
              <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{subcategory.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-b border-slate-200 px-4">
        <div className="max-w-5xl mx-auto flex gap-1">
          {(['articles', 'resources'] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 ${
                tab === t ? 'border-b-2 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
              style={tab === t ? { borderColor: area.color, color: area.color } : {}}>
              {t === 'articles' ? <><BookOpen className="w-4 h-4" /> Articles ({subcategory.articles.length})</> : <><ShoppingBag className="w-4 h-4" /> Resources ({subcategory.products.length})</>}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {tab === 'articles' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategory.articles.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link href={`/${area.key}/${subcategory.id}/${article.id}`}
                  className="group block bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 transition-all h-full">
                  <h3 className="text-slate-900 font-bold text-sm leading-snug mb-2 group-hover:text-slate-700">{article.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </div>
                </Link>
              </motion.div>
            ))}
            {subcategory.articles.length === 0 && (
              <p className="text-slate-400 text-sm col-span-3 py-8 text-center">No articles yet — check back soon!</p>
            )}
          </div>
        )}

        {tab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategory.products.map((product, i) => {
              const tm = TYPE_META[product.type]
              return (
                <motion.a key={product.id} href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="group block bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-xl p-5 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
                      style={{ background: tm.bg, color: tm.text, borderColor: tm.border }}>
                      {tm.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-slate-700 text-sm font-semibold">{product.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-slate-900 font-semibold text-sm leading-snug mb-2 line-clamp-2">{product.name}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 font-bold text-sm">{product.price}</span>
                    <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-700 transition-colors">
                      View <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              )
            })}
            {subcategory.products.length === 0 && (
              <p className="text-slate-400 text-sm col-span-3 py-8 text-center">Resources coming soon!</p>
            )}
          </div>
        )}
      </div>


    </div>
  )
}
