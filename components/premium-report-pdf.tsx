'use client'
import React from 'react'
import { Document, Font, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { AreaKey, QuizResults } from '@/types'
import { AREA_KEYS, type PremiumReport } from '@/lib/premium-report'

Font.register({ family: 'DejaVu', fonts: [
  { src: typeof window === 'undefined' ? `${process.cwd()}/public/fonts/DejaVuSans.ttf` : '/fonts/DejaVuSans.ttf', fontWeight: 400 },
  { src: typeof window === 'undefined' ? `${process.cwd()}/public/fonts/DejaVuSans-Bold.ttf` : '/fonts/DejaVuSans-Bold.ttf', fontWeight: 700 },
] })

const s = StyleSheet.create({
  page: { paddingTop: 48, paddingHorizontal: 48, paddingBottom: 54, fontFamily: 'DejaVu', color: '#1e293b', backgroundColor: '#fff' },
  brand: { fontSize: 10, color: '#7c3aed', fontWeight: 700, marginBottom: 18 },
  title: { fontSize: 21, fontWeight: 700, lineHeight: 1.35, marginBottom: 15 },
  subtitle: { fontSize: 13, color: '#475569', marginBottom: 13, fontWeight: 700 },
  body: { fontSize: 9, lineHeight: 1.62, marginBottom: 12 },
  small: { fontSize: 8, lineHeight: 1.5, color: '#64748b', marginBottom: 7 },
  score: { fontSize: 12, color: '#7c3aed', fontWeight: 700, marginBottom: 14 },
  band: { borderTopWidth: 1, borderTopColor: '#e2e8f0', marginTop: 12, paddingTop: 10 },
  resource: { fontSize: 8, marginBottom: 9, color: '#4338ca', lineHeight: 1.5 },
  footer: { position: 'absolute', bottom: 25, left: 48, right: 48, fontSize: 7, color: '#94a3b8', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 7 },
})

const display: Record<AreaKey, string> = {
  mind: 'Mind', body: 'Body', spirit: 'Spirit', relationships: 'Relationships', money: 'Money', direction: 'Direction',
}

type Resource = { title: string; type: string; url: string }
type Props = { report: PremiumReport; results: QuizResults; resources: Record<AreaKey, Resource[]> }

function Frame({ title, number, children }: { title: string; number: number; children: React.ReactNode }) {
  return <Page size="LETTER" style={s.page}>
    <Text style={s.brand}>RADIANT LIFE BALANCE  /  PERSONAL REPORT</Text>
    <Text style={s.title}>{title}</Text>
    {children}
    <Text style={s.footer}>Educational self-reflection only. Not medical, mental health, or financial advice.  •  {number} / 10</Text>
  </Page>
}

function Paragraphs({ value }: { value: string }) {
  return <>{value.split(/\n+/).filter(Boolean).map((part, i) => <Text key={i} style={s.body}>{part.trim()}</Text>)}</>
}

export function PremiumReportPDF({ report, results, resources }: Props) {
  return <Document title="Personalized Life Balance Report" author="Radiant Life Balance">
    <Frame title="Your Personal Life Balance" number={1}>
      <Text style={s.subtitle}>A personalized interpretation of your six life areas</Text>
      <Text style={s.score}>Your priorities: {results.priorities.slice(0, 3).map(a => display[a]).join('  ·  ')}</Text>
      <Paragraphs value={report.overview} />
      <Text style={s.subtitle}>Your six scores</Text>
      {results.priorities.map(a => <Text key={a} style={s.body}>{display[a]}: {results.scores[a]}%</Text>)}
      <Text style={s.small}>A score describes your answers today. It does not define your potential or your worth.</Text>
    </Frame>
    <Frame title="Strengths and priorities" number={2}>
      <Text style={s.subtitle}>What is already working</Text><Paragraphs value={report.strengths} />
      <Text style={s.subtitle}>Where to begin</Text><Paragraphs value={report.priorityStrategy} />
      <Text style={s.subtitle}>How your strengths can help</Text><Paragraphs value={report.connections} />
    </Frame>
    {AREA_KEYS.map((area, i) => {
      const plan = report.areaPlans.find(a => a.area === area)!
      return <Frame key={area} title={`${display[area]}: your next steps`} number={i + 3}>
        <Text style={s.score}>{results.scores[area]}%  ·  Priority #{results.priorities.indexOf(area) + 1}</Text>
        <Text style={s.subtitle}>What your answers suggest</Text><Paragraphs value={plan.insight} />
        <Text style={s.subtitle}>Use a strength to make progress</Text><Paragraphs value={plan.strengthBridge} />
        <Text style={s.subtitle}>Your first step</Text><Paragraphs value={plan.firstStep} />
        <Text style={s.subtitle}>A month of practice</Text><Paragraphs value={plan.monthPlan} />
      </Frame>
    })}
    <Frame title="Reading and tools picked for you" number={9}>
      <Text style={s.small}>These are existing site resources matched to your lowest subcategory scores. Some product links may earn an affiliate commission; prices can change. A resource is an option, not a requirement.</Text>
      {results.priorities.slice(0, 4).map(area => <View key={area} style={s.band}>
        <Text style={s.subtitle}>{display[area]}</Text>
        {(resources[area] || []).slice(0, 3).map(item => <Link key={`${item.url}:${item.title}`} src={item.url.startsWith('/') ? `https://radiantlifebalance.com${item.url}` : item.url} style={s.resource}>{item.type}: {item.title}</Link>)}
      </View>)}
    </Frame>
    <Frame title="Your next 30 days" number={10}>
      <Paragraphs value={report.nextThirtyDays} />
      <Text style={s.subtitle}>A simple sequence</Text>
      {['Week 1: Select your smallest first step.', 'Week 2: Practice it consistently and record what happens.', 'Week 3: Ask how a strong area can support your top priority.', 'Week 4: Review, adjust, and consider taking a deeper assessment.'].map(t => <Text key={t} style={s.body}>{t}</Text>)}
      <Text style={s.small}>Your report was generated with AI from the scores you chose to share for this purchase. Keep the PDF for your own records. Your report access expires after 30 days.</Text>
    </Frame>
  </Document>
}
