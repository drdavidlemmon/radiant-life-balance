export type AreaKey = 'mind' | 'body' | 'spirit' | 'relationships' | 'money' | 'direction'

export interface QuizQuestion {
  id: string
  area: AreaKey
  subcategory: string
  question: string
  options: { value: number; label: string }[]
}

export interface QuizResults {
  scores: Record<AreaKey, number>
  subcategoryScores: Record<AreaKey, Record<string, number>>
  priorities: AreaKey[]
  completedAt: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  readTime: string
  tags: string[]
  content?: string
}

export interface Quote {
  text: string
  author: string
}

export interface Product {
  id: string
  name: string
  type: 'book' | 'course' | 'supplement' | 'physical'
  description: string
  price: string
  affiliateUrl: string
  rating: number
}

export interface Subcategory {
  id: string
  name: string
  description: string
  icon: string
  articles: Article[]
  quotes: Quote[]
  products: Product[]
}

export interface AreaData {
  key: AreaKey
  name: string
  tagline: string
  description: string
  color: string
  gradient: string
  emoji: string
  subcategories: Subcategory[]
  featuredQuotes: Quote[]
}
