import { areasData } from '@/lib/areas-data'
import type { AreaKey, QuizResults } from '@/types'

export const AREA_KEYS: AreaKey[] = ['mind', 'body', 'spirit', 'relationships', 'money', 'direction']

export type ReportArea = {
  area: AreaKey
  insight: string
  strengthBridge: string
  firstStep: string
  monthPlan: string
}

export type PremiumReport = {
  overview: string
  strengths: string
  priorityStrategy: string
  connections: string
  areaPlans: ReportArea[]
  nextThirtyDays: string
}

export function isQuizResults(value: unknown): value is QuizResults {
  if (!value || typeof value !== 'object') return false
  const r = value as Partial<QuizResults>
  return Boolean(r.scores && r.subcategoryScores && Array.isArray(r.priorities) &&
    AREA_KEYS.every(key => typeof r.scores?.[key] === 'number' && Number.isFinite(r.scores[key]) &&
      r.scores[key] >= 0 && r.scores[key] <= 100 &&
      r.subcategoryScores?.[key] && typeof r.subcategoryScores[key] === 'object' &&
      Object.values(r.subcategoryScores[key]).every(v => typeof v === 'number' && v >= 0 && v <= 100)) &&
    r.priorities.length === AREA_KEYS.length && new Set(r.priorities).size === AREA_KEYS.length &&
    r.priorities.every(key => AREA_KEYS.includes(key)))
}

export function resourcesForArea(area: AreaKey, results: QuizResults) {
  const subs = areasData[area].subcategories
  const ranked = [...subs].sort((a, b) => (results.subcategoryScores[area]?.[a.id] ?? 100) - (results.subcategoryScores[area]?.[b.id] ?? 100))
  return ranked.slice(0, 2).flatMap(sub => [
    ...sub.articles.slice(0, 1).map(article => ({ title: article.title, type: 'Article', url: `/${area}/${sub.id}/${article.id}` })),
    ...sub.products.slice(0, 1).filter(product => product.affiliateUrl.startsWith('https://')).map(product => ({ title: product.name, type: product.type, url: product.affiliateUrl })),
  ])
}

export function isPremiumReport(value: unknown): value is PremiumReport {
  if (!value || typeof value !== 'object') return false
  const r = value as Partial<PremiumReport>
  const narrative = ['overview', 'strengths', 'priorityStrategy', 'connections', 'nextThirtyDays'] as const
  if (!narrative.every(key => typeof r[key] === 'string' && r[key].length > 30 && r[key].length < 5000)) return false
  return Boolean(Array.isArray(r.areaPlans) && r.areaPlans.length === 6 &&
    new Set(r.areaPlans.map(a => a.area)).size === 6 && r.areaPlans.every(a => AREA_KEYS.includes(a.area) &&
      (['insight', 'strengthBridge', 'firstStep', 'monthPlan'] as const).every(key => typeof a[key] === 'string' && a[key].length > 20 && a[key].length < 4000)))
}
