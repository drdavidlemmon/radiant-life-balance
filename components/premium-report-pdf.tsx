'use client'
import React from 'react'
import { Document, Font, Image, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import type { AreaKey, QuizResults } from '@/types'
import type { AreaEvidence, AnswerEvidence, PremiumReport, ReportResource } from '@/lib/premium-report'

const asset = (path: string) => typeof window === 'undefined' ? `${process.cwd()}/public${path}` : `${window.location.origin}${path}`
Font.register({ family: 'DejaVu', fonts: [
  { src: asset('/fonts/DejaVuSans.ttf'), fontWeight: 400 },
  { src: asset('/fonts/DejaVuSans-Bold.ttf'), fontWeight: 700 },
] })
const colors: Record<AreaKey, string> = { mind: '#f97316', body: '#ef4444', spirit: '#eab308', relationships: '#3b82f6', money: '#22c55e', direction: '#a855f7' }
const inks: Record<AreaKey, string> = { mind: '#c2410c', body: '#b91c1c', spirit: '#854d0e', relationships: '#1d4ed8', money: '#15803d', direction: '#7e22ce' }
const display: Record<AreaKey, string> = { mind: 'Mind', body: 'Body', spirit: 'Spirit', relationships: 'Relationships', money: 'Money', direction: 'Direction' }
const s = StyleSheet.create({
  page: { paddingTop: 30, paddingHorizontal: 42, paddingBottom: 50, fontFamily: 'DejaVu', color: '#1e293b', backgroundColor: '#fff' },
  brand: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  flower: { width: 38, height: 38, objectFit: 'contain', marginRight: 10 },
  brandName: { fontSize: 11, color: '#7c3aed', fontWeight: 700 },
  brandSub: { fontSize: 7, color: '#64748b', marginTop: 4 },
  rainbow: { flexDirection: 'row', height: 4, marginBottom: 16 },
  stripe: { flexGrow: 1 },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  icon: { width: 45, height: 45, marginRight: 12, borderRadius: 24 },
  title: { fontSize: 19, fontWeight: 700, lineHeight: 1.3, marginBottom: 9 },
  subtitle: { fontSize: 10, color: '#475569', marginBottom: 5, fontWeight: 700 },
  body: { fontSize: 8.5, lineHeight: 1.5, marginBottom: 9 },
  small: { fontSize: 7.3, lineHeight: 1.45, color: '#64748b', marginBottom: 6 },
  score: { fontSize: 10, fontWeight: 700, marginBottom: 10 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', padding: 8, marginBottom: 5, backgroundColor: '#f8fafc', borderRadius: 6 },
  smallIcon: { width: 24, height: 24, marginRight: 10, borderRadius: 12 },
  scoreText: { width: 130, fontSize: 9, fontWeight: 700 },
  track: { height: 7, width: 220, backgroundColor: '#e2e8f0', borderRadius: 4 },
  bar: { height: 7, borderRadius: 4 },
  evidence: { backgroundColor: '#f8fafc', padding: 10, borderRadius: 6, borderLeftWidth: 3, marginBottom: 12 },
  recommendation: { backgroundColor: '#f5f3ff', borderRadius: 7, padding: 10, marginTop: 2, marginBottom: 10, borderLeftWidth: 3 },
  band: { borderTopWidth: 1, borderTopColor: '#e2e8f0', marginTop: 8, paddingTop: 8 },
  resource: { fontSize: 8, marginBottom: 6, color: '#4338ca', lineHeight: 1.45 },
  footer: { position: 'absolute', bottom: 22, left: 42, right: 42, fontSize: 6.5, color: '#94a3b8', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 7 },
})
type Props = { report: PremiumReport; results: QuizResults; resources: Record<AreaKey, ReportResource[]>; evidence?: Record<AreaKey, AreaEvidence> }

function Frame({ title, area, children }: { title: string; area?: AreaKey; children: React.ReactNode }) {
  return <Page size="LETTER" style={s.page}>
    <View style={s.brand} fixed><Image src={asset('/logo.png')} style={s.flower} /><View><Text style={s.brandName}>RADIANT LIFE BALANCE</Text><Text style={s.brandSub}>YOUR PERSONAL REPORT</Text></View></View>
    <View style={s.rainbow}>{['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'].map(color => <View key={color} style={[s.stripe, { backgroundColor: color }]} />)}</View>
    <View style={s.sectionHeading} wrap={false}>{area && <Image src={asset(`/icon-${area}.png`)} style={s.icon} />}<Text style={[s.title, { color: area ? inks[area] : '#5b21b6' }]}>{title}</Text></View>
    {children}
    <Text style={s.footer} fixed render={({ pageNumber, totalPages }) => `Educational self-reflection only. Not medical, mental health, or financial advice.  |  ${pageNumber} / ${totalPages}`} />
  </Page>
}
function Paragraphs({ value }: { value: string }) {
  return <>{value.split(/\n+/).filter(Boolean).map((part, i) => <Text key={i} style={s.body} orphans={2} widows={2}>{part.trim()}</Text>)}</>
}
function EvidenceLine({ label, answers }: { label: string; answers: AnswerEvidence[] }) {
  return <Text style={s.small}><Text style={{ fontWeight: 700 }}>{label}: </Text>{answers.slice(0, 2).map(q => `${q.answer}/5 - ${q.statement}`).join(' ')}{answers.length > 2 ? ` (+${answers.length - 2} tied answers)` : ''}</Text>
}
function ResourceLink({ item }: { item: ReportResource }) {
  return <Link src={item.url.startsWith('/') ? `https://radiantlifebalance.com${item.url}` : item.url} style={s.resource}>{item.type}: {item.title}</Link>
}
export function PremiumReportPDF({ report, results, resources, evidence }: Props) {
  return <Document title="Personalized Life Balance Report" author="Radiant Life Balance">
    <Frame title="Your Personal Life Balance">
      <Text style={s.subtitle}>A personalized interpretation of your six life areas</Text>
      <Text style={[s.score, { color: '#7c3aed' }]}>Your priorities: {results.priorities.slice(0, 3).map(a => display[a]).join('  /  ')}</Text>
      <Paragraphs value={report.overview} />
      <Text style={s.subtitle}>Your six areas, in priority order</Text>
      {results.priorities.map((area, i) => <View key={area} style={s.scoreRow} wrap={false}>
        <Image src={asset(`/icon-${area}.png`)} style={s.smallIcon} /><Text style={[s.scoreText, { color: inks[area] }]}>{i + 1}. {display[area]}: {results.scores[area]}%</Text>
        <View style={s.track}><View style={[s.bar, { width: `${results.scores[area]}%`, backgroundColor: colors[area] }]} /></View>
      </View>)}
      <Text style={s.small}>A score describes your answers today. It does not define your potential or your worth.</Text>
    </Frame>
    <Frame title="Strengths and priorities">
      <Text style={s.subtitle}>What is already working</Text><Paragraphs value={report.strengths} />
      <Text style={s.subtitle}>Where to begin</Text><Paragraphs value={report.priorityStrategy} />
      <Text style={s.subtitle}>How your strengths can help</Text><Paragraphs value={report.connections} />
    </Frame>
    {results.priorities.map((area, i) => {
      const plan = report.areaPlans.find(a => a.area === area)!
      const profile = evidence?.[area]
      const product = i === 0 ? resources[area]?.find(item => item.id === plan.recommendation?.resourceId) : undefined
      return <Frame key={area} title={`${display[area]}: your next steps`} area={area}>
        <Text style={[s.score, { color: inks[area] }]}>Priority #{i + 1}  /  Area score: {results.scores[area]}%</Text>
        {profile && <View style={[s.evidence, { borderLeftColor: colors[area] }]} wrap={false}>
          <Text style={s.subtitle}>Your individual answers</Text>
          {profile.main.allEqual ? <Text style={s.small}>All five main answers are {profile.main.responses[0].answer}/5; no single question stands out as weaker or stronger.</Text> : <><EvidenceLine label={profile.main.lowest.length > 1 ? 'Lowest answers (tied)' : 'Lowest answer - first focus'} answers={profile.main.lowest} /><EvidenceLine label={profile.main.highest.length > 1 ? 'Highest answers (tied)' : 'Highest answer - strength'} answers={profile.main.highest} /></>}
          {profile.deepDive && (profile.deepDive.allEqual ? <Text style={s.small}>All deep-dive answers are {profile.deepDive.responses[0].answer}/5.</Text> : <><EvidenceLine label="Deep-dive lowest" answers={profile.deepDive.lowest} /><EvidenceLine label="Deep-dive highest" answers={profile.deepDive.highest} /></>)}
        </View>}
        <Text style={s.subtitle} minPresenceAhead={35}>What your answers suggest</Text><Paragraphs value={plan.insight} />
        <Text style={s.subtitle} minPresenceAhead={35}>Use a strength to make progress</Text><Paragraphs value={plan.strengthBridge} />
        <Text style={s.subtitle} minPresenceAhead={35}>Your first step</Text><Paragraphs value={plan.firstStep} />
        <Text style={s.subtitle} minPresenceAhead={35}>A month of practice</Text><Paragraphs value={plan.monthPlan} />
        {product && plan.recommendation && <View style={[s.recommendation, { borderLeftColor: colors[area] }]}>
          <Text style={s.subtitle}>Your best-fit resource</Text><ResourceLink item={product} />
          <Paragraphs value={plan.recommendation.why} /><Text style={s.small}>Start here: {plan.recommendation.howToUse}</Text>
          <Text style={s.small}>Optional affiliate resource. We may earn a commission. Check current price and fit before purchasing.</Text>
        </View>}
      </Frame>
    })}
    <Frame title="Reading and tools picked for you">
      <Text style={s.small}>Your one best-fit affiliate resource appears beside your number-one priority area's first steps. The free articles below offer another way to begin. Purchases are optional; links may earn us a commission.</Text>
      {results.priorities.map(area => <View key={area} style={s.band} wrap={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}><Image src={asset(`/icon-${area}.png`)} style={s.smallIcon} /><Text style={[s.subtitle, { color: inks[area] }]}>{display[area]}</Text></View>
        {(resources[area] || []).filter(item => item.type === 'Article').slice(0, 2).map(item => <ResourceLink key={item.id} item={item} />)}
      </View>)}
    </Frame>
    <Frame title="Your next 30 days">
      <Paragraphs value={report.nextThirtyDays} />
      <Text style={s.subtitle}>A simple sequence</Text>
      {['Week 1: Start with the weakest individual answer in your first priority area.', 'Week 2: Repeat the first step, then add your second priority when ready.', 'Week 3: Use a strongest answer to support progress; try the selected resource if it fits.', 'Week 4: Review what changed, adjust, and reassess your priorities.'].map(t => <Text key={t} style={s.body}>{t}</Text>)}
      <Text style={s.small}>Generated with AI from your 30 quiz answers, two priority deep dives and report intake. Keep this PDF for your records. Report access expires after 30 days.</Text>
    </Frame>
  </Document>
}
