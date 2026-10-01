import { areasData } from '@/lib/areas-data'
import type { AreaKey, QuizResults } from '@/types'
import { quizQuestions } from '@/lib/quiz-data'
import { deepDiveQuestions } from '@/lib/deep-dive-data'
import type { ReportOrderInput } from '@/lib/report-intake'

export const AREA_KEYS: AreaKey[] = ['mind', 'body', 'spirit', 'relationships', 'money', 'direction']

export type ReportArea = {
  area: AreaKey
  insight: string
  strengthBridge: string
  firstStep: string
  monthPlan: string
  recommendation?: { resourceId: string; why: string; howToUse: string }
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


export type ReportResource = { id: string; title: string; type: string; url: string; description?: string; price?: string; subcategory?: string }
export type AnswerEvidence = { id: string; statement: string; answer: number; subcategory: string }
export type QuestionProfile = { responses: AnswerEvidence[]; lowest: AnswerEvidence[]; highest: AnswerEvidence[]; allEqual: boolean }
export type AreaEvidence = { main: QuestionProfile; deepDive?: QuestionProfile }

function questionProfile(responses: AnswerEvidence[]): QuestionProfile {
  const low = Math.min(...responses.map(q => q.answer))
  const high = Math.max(...responses.map(q => q.answer))
  return { responses, lowest: responses.filter(q => q.answer === low), highest: responses.filter(q => q.answer === high), allEqual: low === high }
}

export function evidenceForOrder(input: ReportOrderInput): Record<AreaKey, AreaEvidence> {
  return Object.fromEntries(AREA_KEYS.map(area => [area, {
    main: questionProfile(quizQuestions.filter(q => q.area === area).map(q => ({ id: q.id, statement: q.question, subcategory: q.subcategory, answer: input.answers[q.id] }))),
    ...(input.deepDives[area] ? { deepDive: questionProfile(deepDiveQuestions[area].map(q => ({ id: q.id, statement: q.question, subcategory: q.subcategory, answer: input.deepDives[area]!.answers[q.id] }))) } : {}),
  }])) as Record<AreaKey, AreaEvidence>
}

// Full catalog: the model chooses IDs; titles, prices and links always come from site data.
export function productsForArea(area: AreaKey): ReportResource[] {
  return areasData[area].subcategories.flatMap(sub => sub.products
    .filter(product => product.affiliateUrl.startsWith('https://'))
    .map(product => ({ id: `${area}:${sub.id}:${product.id}`, title: product.name, type: product.type,
      url: product.affiliateUrl, description: product.description, price: product.price, subcategory: sub.name })))
}

export function resourcesForReport(report: PremiumReport, results: QuizResults): Record<AreaKey, ReportResource[]> {
  return Object.fromEntries(results.priorities.map(area => {
    const selected = report.areaPlans.find(plan => plan.area === area)?.recommendation?.resourceId
    const product = productsForArea(area).find(item => item.id === selected)
    const articles = resourcesForArea(area, results).filter(item => item.type === 'Article')
      .map((item, index) => ({ ...item, id: `${area}:article:${index}` }))
    return [area, [...(product ? [product] : []), ...articles]]
  })) as Record<AreaKey, ReportResource[]>
}

export function hasValidRecommendations(report: PremiumReport): boolean {
  return report.areaPlans.every(plan => {
    const rec = plan.recommendation
    return rec && productsForArea(plan.area).some(product => product.id === rec.resourceId) &&
      typeof rec.why === 'string' && rec.why.trim().length > 20 && rec.why.length < 2000 &&
      typeof rec.howToUse === 'string' && rec.howToUse.trim().length > 20 && rec.howToUse.length < 2000
  })
}
