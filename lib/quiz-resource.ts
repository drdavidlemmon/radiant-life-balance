import { areasData } from '@/lib/areas-data'
import { quizQuestions } from '@/lib/quiz-data'
import { isQuizResults } from '@/lib/premium-report'
import type { AreaKey, Product, QuizResults } from '@/types'

// Match the statement, not just its broad category. Only educational books are
// eligible here: a short self-assessment cannot establish a treatment need.
const QUESTION_RESOURCES: Record<string, { productId: string; why: string }> = {
  body_1: { productId: 'enp2', why: 'This book explores everyday routines related to energy and physical wellbeing.' },
  body_2: { productId: 'exp1', why: 'This illustrated guide can help you understand movement and plan a physical activity routine.' },
  body_3: { productId: 'ntp1', why: 'This book offers food-focused education as a starting point for learning about nutrition.' },
  body_4: { productId: 'slp1', why: 'This book explores sleep and its role in everyday wellbeing.' },
  body_5: { productId: 'exp1', why: 'This guide offers a movement-focused starting point for building physical confidence, without assuming you need to lose weight.' },
  mind_1: { productId: 'lp3', why: 'This book explains strategies for learning and retaining what you read or study.' },
  mind_2: { productId: 'mp1', why: 'This book introduces memory techniques you can explore and practice.' },
  mind_3: { productId: 'stressp1', why: 'This book focuses directly on stress, mindset, and resilience, offering reflection exercises for everyday challenges. It is educational, rather than treatment for stress-related symptoms.' },
  mind_4: { productId: 'fp3', why: 'This book offers a framework for noticing internal triggers and making intentional choices; it is not a treatment for mood concerns.' },
  mind_5: { productId: 'ctp2', why: 'This book introduces different ways of thinking that can give you new perspectives for generating ideas.' },
  spirit_1: { productId: 'grp2', why: 'This book explores making gratitude a regular part of everyday life.' },
  spirit_2: { productId: 'medp2', why: 'This book offers a starting point for a regular reflection practice. It is a mindfulness resource, not faith-specific literature.' },
  spirit_3: { productId: 'medp2', why: 'This book introduces mindfulness practices that you can explore alongside your own spiritual approach.' },
  spirit_4: { productId: 'forgivep1', why: 'This book offers a framework for exploring forgiveness at your own pace. Forgiving does not mean excusing harm or returning to an unsafe relationship.' },
  spirit_5: { productId: 'kindp1', why: 'This book explores generosity and kindness in everyday life, a practical starting point for small acts of service. It does not identify charities for you.' },
  relationships_1: { productId: 'famp2', why: 'This book explores creating meaningful shared experiences, one way to give attention and care to relationships.' },
  relationships_2: { productId: 'famp2', why: 'This book explores meaningful shared moments without assuming you are a parent or married.' },
  relationships_3: { productId: 'comp1', why: 'This book offers tools for listening and communicating when conversations matter.' },
  relationships_4: { productId: 'intimacyp1', why: 'This adult educational book explores expectations and communication around sexual satisfaction. Consider it only if you want to explore intimacy; being single or choosing not to have sex does not need fixing.' },
  relationships_5: { productId: 'comp1', why: 'This book offers communication tools for important conversations in everyday relationships.' },
  money_1: { productId: 'budp1', why: 'This book offers a budgeting framework for making spending decisions around the money available to you.' },
  money_2: { productId: 'budp1', why: 'This book offers a budgeting framework you can explore while organizing spending and a debt-reduction plan.' },
  money_3: { productId: 'invp1', why: 'This book introduces long-term investing concepts. It does not promise passive income or identify suitable investments for you.' },
  money_4: { productId: 'wmp1', why: 'This book explores beliefs and behavior around money, rather than assuming a low answer means a lack of wealth.' },
  money_5: { productId: 'budp1', why: 'This book offers a framework for planning how available money can support spending and savings priorities.' },
  direction_1: { productId: 'lvp1', why: 'This book offers exercises for exploring possible directions and a meaningful next step.' },
  direction_2: { productId: 'lvp1', why: 'This book offers reflection exercises for connecting life choices with what matters to you.' },
  direction_3: { productId: 'tmp1', why: 'This book offers a system for organizing commitments and deciding what to do next.' },
  direction_4: { productId: 'gsp1', why: 'This book offers a framework for turning goals into a focused plan and regular actions.' },
  direction_5: { productId: 'pdp1', why: 'This book explores small repeatable habits that can help you put priorities into daily practice.' },
}

export type QuizResource = {
  area: AreaKey; product: Product; why: string
  focus?: { statement: string; answer: number }
  tiedQuestions: boolean; allQuestionsEqual: boolean; tiedAreas: boolean
  basis: 'answers' | 'scores'
}

export function recommendedQuizResource(results: QuizResults, answers: Record<string, unknown> = {}): QuizResource | null {
  if (!isQuizResults(results)) return null
  const area = results.priorities[0]
  const data = areasData[area]
  const products = data.subcategories.flatMap(sub => sub.products)
    .filter(product => product.type === 'book' && product.affiliateUrl.startsWith('https://'))
  const validAnswers = quizQuestions.every(q => Number.isInteger(answers[q.id]) && Number(answers[q.id]) >= 1 && Number(answers[q.id]) <= 5)
  const questions = quizQuestions.filter(q => q.area === area)
  const lowest = validAnswers ? Math.min(...questions.map(q => Number(answers[q.id]))) : undefined
  const weakest = validAnswers ? questions.filter(q => answers[q.id] === lowest) : []
  const allQuestionsEqual = validAnswers && questions.every(q => answers[q.id] === lowest)
  const tiedAreas = Object.values(results.scores).filter(score => score === results.scores[area]).length > 1
  for (const q of weakest) {
    const match = QUESTION_RESOURCES[q.id]
    const product = products.find(p => p.id === match?.productId)
    if (product) return { area, product, why: match.why, focus: allQuestionsEqual ? undefined : { statement: q.question, answer: Number(answers[q.id]) },
      tiedQuestions: weakest.length > 1, allQuestionsEqual, tiedAreas, basis: 'answers' }
  }
  // Older saved results and the clearly labeled sample have scores, not answers.
  const ranked = [...data.subcategories].filter(sub => typeof results.subcategoryScores[area][sub.id] === 'number')
    .sort((a, b) => results.subcategoryScores[area][a.id] - results.subcategoryScores[area][b.id])
  const product = ranked.flatMap(sub => sub.products).find(p => products.some(candidate => candidate.id === p.id)) || products[0]
  return product ? { area, product, why: 'This educational resource is a starting point for exploring the area highlighted by your saved scores.',
    tiedQuestions: false, allQuestionsEqual: false, tiedAreas, basis: 'scores' } : null
}
