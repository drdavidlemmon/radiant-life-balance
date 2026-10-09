// Run with: npx tsx scripts/check-report.tsx. Uses fixtures; no real API requests or charges.
import assert from 'node:assert/strict'
import React from 'react'
import { renderToFile } from '@react-pdf/renderer'
import { NextRequest } from 'next/server'
import { AREA_KEYS, evidenceForOrder, productsForArea, resourcesForReport, hasValidRecommendations, type PremiumReport } from '../lib/premium-report'
import { quizQuestions } from '../lib/quiz-data'
import { deepDiveQuestions } from '../lib/deep-dive-data'
import { intakeFields, type ReportOrderInput } from '../lib/report-intake'
import { PremiumReportPDF } from '../components/premium-report-pdf'

async function main() {
  const answers = Object.fromEntries(quizQuestions.map(q => [q.id, q.area === 'direction' ? 5 : q.id.endsWith('_1') ? 1 : q.id.endsWith('_2') ? 2 : 5]))
  const input: ReportOrderInput = { answers, results: {
    scores: { money: 60, mind: 80, relationships: 88, body: 96, spirit: 96, direction: 100 },
    subcategoryScores: Object.fromEntries(AREA_KEYS.map(area => [area, Object.fromEntries(quizQuestions.filter(q => q.area === area).map(q => [q.subcategory, answers[q.id] * 20]))])) as ReportOrderInput['results']['subcategoryScores'],
    priorities: ['money', 'mind', 'relationships', 'body', 'spirit', 'direction'], completedAt: new Date().toISOString(),
  }, intake: Object.fromEntries(intakeFields.map(field => [field.key, field.key === 'budget' ? '0' : 'Use practical steps to complete my goals.'])) as ReportOrderInput['intake'],
  deepDives: Object.fromEntries(['money', 'mind'].map(area => [area, { answers: Object.fromEntries(deepDiveQuestions[area as 'money'|'mind'].map((q, i) => [q.id, i % 5 + 1])), completedAt: new Date().toISOString() }])) }
  const evidence = evidenceForOrder(input)
  assert.equal(evidence.money.main.lowest[0].id, 'money_1')
  assert.equal(evidence.money.main.highest.length, 3)
  assert.equal(evidence.direction.main.allEqual, true)
  assert.equal(evidence.money.deepDive?.responses.length, 15)
  assert.equal(evidence.body.deepDive, undefined)
  assert.ok(AREA_KEYS.every(area => productsForArea(area).length > 0))
  const sentence = 'Your answers point to one practical focus and a useful strength that can support steady progress over the coming month.'
  const paragraph = (count: number) => Array(count).fill(sentence).join(' ')
  const report: PremiumReport = {
    overview: paragraph(5), strengths: paragraph(5), priorityStrategy: paragraph(5), connections: paragraph(4), nextThirtyDays: paragraph(4),
    // Deliberately scrambled to ensure the renderer and API enforce priority order.
    areaPlans: AREA_KEYS.map(area => ({ area, insight: paragraph(4), strengthBridge: paragraph(3), firstStep: paragraph(2), monthPlan: paragraph(3),
      recommendation: { resourceId: productsForArea(area)[0].id, why: 'This existing resource matches the habits and skills reflected in your answers and provides a structured way to practice them.', howToUse: 'Borrow it if available, read the opening chapter, and apply one relevant exercise this week before deciding whether to purchase.' },
    })),
  }
  assert.equal(hasValidRecommendations(report, 'money'), true)
  assert.equal(hasValidRecommendations({ ...report, areaPlans: report.areaPlans.map(plan => ({ ...plan, recommendation: { ...plan.recommendation!, resourceId: 'made-up-product' } })) }, 'money'), false)
  process.env.VERCEL_ENV = 'preview'
  process.env.STRIPE_SECRET_KEYz = 'sk_test_fixture'
  process.env.OPENAI_API_KEY = 'fixture'
  process.env.UPSTASH_REDIS_REST_URL = 'https://fixture.upstash.io'
  process.env.UPSTASH_REDIS_REST_TOKEN = 'fixture'
  const { POST } = await import('../app/api/report/generate/route')
  let finishReason = 'stop'; let cached: string | null = null; let aiCalls = 0; let paid = true
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    if (String(url).includes('stripe.com')) return Response.json({ status: 'complete', payment_status: paid ? 'paid' : 'unpaid', amount_total: 699, currency: 'usd', metadata: { report_token: '12345678-1234-1234-1234-123456789abc' } })
    if (String(url).includes('upstash.io')) {
      const command = JSON.parse(String(init?.body)) as string[]
      if (command[0] === 'GET') return Response.json({ result: command[1].includes('report:input:') ? JSON.stringify(input) : cached })
      if (command[0] === 'SET' && command[1].includes('report:output:')) cached = command[2]
      return Response.json({ result: 'OK' })
    }
    aiCalls++
    const body = JSON.parse(String(init?.body))
    assert.ok(body.messages[1].content.includes('money_1'))
    assert.ok(body.messages[1].content.includes(productsForArea('money')[0].id))
    return Response.json({ choices: [{ finish_reason: finishReason, message: { content: JSON.stringify(report) } }] })
  }) as typeof fetch
  const request = () => new NextRequest('https://fixture.example/api/report/generate', { method: 'POST', body: JSON.stringify({ sessionId: 'cs_test_12345678901234' }) })
  const response = await POST(request()); assert.equal(response.status, 200)
  const payload = await response.json()
  assert.equal(payload.report.strengths, report.strengths, 'Preserve narratives beyond the old 100-word limit')
  assert.deepEqual(payload.report.areaPlans.map((plan: {area:string}) => plan.area), input.results.priorities)
  assert.ok(payload.report.areaPlans.slice(1).every((plan: { recommendation?: unknown }) => !plan.recommendation), 'Only the number-one priority gets a recommendation')
  assert.ok(input.results.priorities.slice(1).every(area => payload.resources[area].every((item: { type: string }) => item.type === 'Article')))
  assert.equal(payload.resources.money[0].id, productsForArea('money')[0].id, 'Zero budget still receives an optional best-fit resource')
  assert.equal((await POST(request())).status, 200); assert.equal(aiCalls, 1, 'Versioned cache is reused')
  cached = null; finishReason = 'length'; assert.equal((await POST(request())).status, 502); assert.equal(cached, null, 'Incomplete responses never cached')
  paid = false; assert.equal((await POST(request())).status, 403)
  await renderToFile(<PremiumReportPDF {...payload} />, '/tmp/report-layout-check.pdf')
  const stress = { ...report, areaPlans: report.areaPlans.map(plan => ({ ...plan, insight: paragraph(20), monthPlan: paragraph(15) })) }
  await renderToFile(<PremiumReportPDF report={stress} results={input.results} resources={resourcesForReport(stress, input.results)} evidence={evidence} />, '/tmp/report-long-check.pdf')
  console.log('PASS: evidence, ties, deep dives, catalog IDs, complete text, priority order, zero-budget resources, caching, incomplete-response rejection, payment guard, PDF render and long-text pagination.')
}
main().catch(error => { console.error(error); process.exit(1) })
