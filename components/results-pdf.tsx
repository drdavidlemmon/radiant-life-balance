'use client'

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'
import { QuizResults, AreaKey } from '@/types'

// ─── Colour map ───────────────────────────────────────────────────────────────
const AREA_META: Record<AreaKey, { name: string; hex: string; light: string }> = {
  mind:          { name: 'Mind',          hex: '#f97316', light: '#fff7ed' },
  body:          { name: 'Body',          hex: '#ef4444', light: '#fef2f2' },
  spirit:        { name: 'Spirit',        hex: '#eab308', light: '#fefce8' },
  relationships: { name: 'Relationships', hex: '#3b82f6', light: '#eff6ff' },
  money:         { name: 'Money',         hex: '#22c55e', light: '#f0fdf4' },
  direction:     { name: 'Direction',     hex: '#a855f7', light: '#faf5ff' },
}

const ORDER: AreaKey[] = ['mind', 'body', 'spirit', 'relationships', 'money', 'direction']

function scoreLabel(s: number): string {
  if (s >= 80) return 'Thriving'
  if (s >= 60) return 'Good'
  if (s >= 40) return 'Developing'
  if (s >= 20) return 'Needs Work'
  return 'Critical'
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingBottom: 40,
    paddingHorizontal: 0,
  },

  // Header band
  header: {
    backgroundColor: '#a855f7',
    paddingVertical: 28,
    paddingHorizontal: 40,
    marginBottom: 0,
  },
  headerAccent: {
    height: 4,
    backgroundColor: '#22c55e',
    marginTop: 6,
    borderRadius: 2,
    width: 64,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 11,
    color: '#e9d5ff',
    marginTop: 3,
  },
  headerDate: {
    fontSize: 9,
    color: '#c4b5fd',
    marginTop: 2,
  },

  // Body padding
  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },

  // Overall score band
  overallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  overallLeft: {
    flex: 1,
  },
  overallScore: {
    fontSize: 48,
    fontFamily: 'Helvetica-Bold',
    color: '#a855f7',
    lineHeight: 1,
  },
  overallLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  overallStatus: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginTop: 6,
  },
  overallRight: {
    flex: 2,
    paddingLeft: 20,
  },
  overallDesc: {
    fontSize: 10,
    color: '#475569',
    lineHeight: 1.6,
  },

  // Section heading
  sectionHeading: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  // Area row
  areaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  areaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  areaName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#334155',
    width: 90,
  },
  barBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
    marginRight: 10,
  },
  barFill: {
    height: 10,
    borderRadius: 5,
  },
  areaScore: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#334155',
    width: 28,
    textAlign: 'right',
  },
  areaStatusBadge: {
    fontSize: 8,
    color: '#64748b',
    width: 58,
    textAlign: 'right',
  },

  // Priority box
  prioritySection: {
    marginTop: 22,
  },
  priorityCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  priorityRank: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 3,
  },
  priorityName: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  priorityScore: {
    fontSize: 10,
    color: '#475569',
  },
  priorityAdvice: {
    fontSize: 10,
    color: '#475569',
    marginTop: 6,
    lineHeight: 1.5,
  },

  // Deep dive subcategory box
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  subName: {
    fontSize: 9,
    color: '#475569',
    width: 120,
  },
  subBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 3,
    marginRight: 8,
  },
  subBarFill: {
    height: 6,
    borderRadius: 3,
  },
  subScore: {
    fontSize: 9,
    color: '#64748b',
    width: 30,
    textAlign: 'right',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8',
  },
  footerDisclaimer: {
    fontSize: 7,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 2,
  },
})

// ─── Area advice blurbs (short, one-line) ─────────────────────────────────────
const ADVICE: Record<AreaKey, string> = {
  mind:          'Commit to 20 min of daily reading, a brain-training app, or learning something entirely new.',
  body:          'Start with one small change — better sleep, a daily walk, or upgrading one meal per day.',
  spirit:        'A 5-minute gratitude journal and 10 minutes of quiet reflection can shift your perspective fast.',
  relationships: 'Schedule one meaningful conversation this week. Depth matters more than frequency.',
  money:         'Track every dollar for 30 days. Awareness is the foundation of financial transformation.',
  direction:     'Write down your top 3 goals for the next 90 days and review them every morning.',
}

// ─── Component ───────────────────────────────────────────────────────────────
interface Props {
  results: QuizResults
  deepDiveResults?: Record<string, Record<string, number>>
}

export function ResultsPDF({ results, deepDiveResults }: Props) {
  const { scores, priorities } = results
  const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
  const dateStr = new Date(results.completedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const top2 = (priorities ?? ORDER.slice().sort((a, b) => scores[a] - scores[b])).slice(0, 2) as AreaKey[]

  return (
    <Document title="Radiant Life Balance Results" author="Dr. Lemmon">
      {/* ── PAGE 1: Scores overview ── */}
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerTitle}>Radiant Life Balance Assessment</Text>
          <Text style={s.headerSub}>Your Personal Life Balance Report — Dr. Lemmon</Text>
          <Text style={s.headerDate}>Generated {dateStr} · radiantlifebalance.com</Text>
          <View style={s.headerAccent} />
        </View>

        <View style={s.body}>
          {/* Overall score */}
          <View style={s.overallRow}>
            <View style={s.overallLeft}>
              <Text style={s.overallScore}>{overall}%</Text>
              <Text style={s.overallLabel}>Overall Balance</Text>
              <Text style={s.overallStatus}>{scoreLabel(overall)}</Text>
            </View>
            <View style={s.overallRight}>
              <Text style={s.overallDesc}>
                This score reflects the average across all six life areas. Your goal is not
                perfection — it is awareness. The areas with the lowest scores are your greatest
                opportunities for growth and transformation.
              </Text>
            </View>
          </View>

          {/* Area scores */}
          <Text style={s.sectionHeading}>Your Six Life Area Scores</Text>
          {ORDER.map((key) => {
            const m = AREA_META[key]
            const score = scores[key] ?? 0
            const barWidth = `${score}%` as `${number}%`
            return (
              <View key={key} style={s.areaRow}>
                <View style={[s.areaDot, { backgroundColor: m.hex }]} />
                <Text style={s.areaName}>{m.name}</Text>
                <View style={s.barBg}>
                  <View style={[s.barFill, { backgroundColor: m.hex, width: barWidth }]} />
                </View>
                <Text style={s.areaScore}>{score}%</Text>
                <Text style={s.areaStatusBadge}>{scoreLabel(score)}</Text>
              </View>
            )
          })}

          {/* Top 2 priorities */}
          <View style={s.prioritySection}>
            <Text style={s.sectionHeading}>Your Top Priority Areas</Text>
            {top2.map((key, i) => {
              const m = AREA_META[key]
              const score = scores[key] ?? 0
              const ddData = deepDiveResults?.[key]
              return (
                <View key={key} style={[s.priorityCard, { backgroundColor: m.light, borderLeftColor: m.hex }]}>
                  <Text style={[s.priorityRank, { color: m.hex }]}>
                    {i === 0 ? '#1 Highest Priority' : '#2 Priority Area'}
                  </Text>
                  <Text style={s.priorityName}>{m.name}  —  {score}% ({scoreLabel(score)})</Text>
                  <Text style={s.priorityAdvice}>{ADVICE[key]}</Text>

                  {/* Subcategory breakdown if deep dive done */}
                  {ddData && Object.keys(ddData).length > 0 && (
                    <View style={{ marginTop: 10 }}>
                      <Text style={[s.overallLabel, { color: m.hex, marginBottom: 6 }]}>Deep Dive Breakdown</Text>
                      {Object.entries(ddData)
                        .sort(([, a], [, b]) => a - b)
                        .map(([sub, val]) => (
                          <View key={sub} style={s.subRow}>
                            <Text style={s.subName}>
                              {sub.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                            </Text>
                            <View style={s.subBarBg}>
                              <View style={[s.subBarFill, { backgroundColor: m.hex, width: `${val}%` as `${number}%` }]} />
                            </View>
                            <Text style={s.subScore}>{val}%</Text>
                          </View>
                        ))}
                    </View>
                  )}
                </View>
              )
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>Radiant Life Balance  ·  radiantlifebalance.com</Text>
          <Text style={s.footerText}>Dr. Lemmon  ·  Page 1</Text>
        </View>
        <Text style={[s.footerDisclaimer, { position: 'absolute', bottom: 6, left: 40, right: 40 }]}>
          This assessment is for educational and self-improvement purposes only. It is not medical, financial, or legal advice.
        </Text>
      </Page>

      {/* ── PAGE 2: Full scores + next steps ── */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.headerTitle}>Your Complete Balance Profile</Text>
          <Text style={s.headerSub}>Personalised next steps from Dr. Lemmon</Text>
          <View style={s.headerAccent} />
        </View>

        <View style={s.body}>
          <Text style={s.sectionHeading}>Action Steps for Every Life Area</Text>

          {ORDER.map((key) => {
            const m = AREA_META[key]
            const score = scores[key] ?? 0
            return (
              <View key={key} style={[s.priorityCard, { backgroundColor: m.light, borderLeftColor: m.hex, marginBottom: 8 }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={[s.priorityName, { fontSize: 11 }]}>{m.name}</Text>
                  <Text style={[s.priorityScore, { fontFamily: 'Helvetica-Bold', color: m.hex }]}>{score}% — {scoreLabel(score)}</Text>
                </View>
                <Text style={s.priorityAdvice}>{ADVICE[key]}</Text>
              </View>
            )
          })}

          {/* Closing note */}
          <View style={{ marginTop: 20, padding: 16, backgroundColor: '#faf5ff', borderRadius: 10, borderWidth: 1, borderColor: '#e9d5ff' }}>
            <Text style={[s.sectionHeading, { borderBottomWidth: 0, marginBottom: 6 }]}>A Note from Dr. Lemmon</Text>
            <Text style={[s.overallDesc, { lineHeight: 1.7 }]}>
              True balance is not about scoring 100% in every area — it is about knowing yourself deeply enough to
              choose where to grow next. Use this report as a compass, not a grade. Return to the quiz every
              60 days to measure your progress and celebrate how far you have come.{'\n\n'}
              Visit radiantlifebalance.com to explore personalised articles, tools, and resources for each of your
              life areas. Your journey to a radiant life starts with awareness — and you have already taken that step.
            </Text>
          </View>
        </View>

        <View style={s.footer} fixed>
          <Text style={s.footerText}>Radiant Life Balance  ·  radiantlifebalance.com</Text>
          <Text style={s.footerText}>Dr. Lemmon  ·  Page 2</Text>
        </View>
        <Text style={[s.footerDisclaimer, { position: 'absolute', bottom: 6, left: 40, right: 40 }]}>
          This assessment is for educational and self-improvement purposes only. It is not medical, financial, or legal advice.
        </Text>
      </Page>
    </Document>
  )
}
