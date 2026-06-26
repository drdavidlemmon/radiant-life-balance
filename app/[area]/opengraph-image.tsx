import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

const AREA_META: Record<string, {
  name: string; hex: string; light: string;
  tagline: string; icon: string; emoji: string
}> = {
  mind: {
    name: 'Mind', hex: '#f97316', light: '#fff7ed',
    tagline: 'Unlock your full cognitive potential',
    icon: 'icon-mind.png', emoji: '🧠',
  },
  body: {
    name: 'Body', hex: '#ef4444', light: '#fef2f2',
    tagline: 'Build your physical foundation',
    icon: 'icon-body.png', emoji: '💪',
  },
  spirit: {
    name: 'Spirit', hex: '#eab308', light: '#fefce8',
    tagline: 'Connect with your deepest self',
    icon: 'icon-spirit.png', emoji: '✨',
  },
  relationships: {
    name: 'Relationships', hex: '#3b82f6', light: '#eff6ff',
    tagline: 'Build deep, meaningful connections',
    icon: 'icon-relationships.png', emoji: '❤️',
  },
  money: {
    name: 'Money', hex: '#22c55e', light: '#f0fdf4',
    tagline: 'Create financial freedom and abundance',
    icon: 'icon-money.png', emoji: '💰',
  },
  direction: {
    name: 'Direction', hex: '#a855f7', light: '#faf5ff',
    tagline: 'Live with clarity, purpose, and momentum',
    icon: 'icon-direction.png', emoji: '🧭',
  },
}

export default async function Image({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params
  const m = AREA_META[area] ?? AREA_META.mind

  // Load area icon
  let iconSrc = ''
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public', m.icon))
    iconSrc = `data:image/png;base64,${buf.toString('base64')}`
  } catch { /* skip icon if missing */ }

  // Load logo
  let logoSrc = ''
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'public/logo-og.png'))
    logoSrc = `data:image/png;base64,${buf.toString('base64')}`
  } catch { /* skip */ }

  const SUBCATEGORY_LABELS: Record<string, string[]> = {
    mind:          ['Learning', 'Memory', 'Focus', 'Speed Reading', 'Creativity'],
    body:          ['Sleep', 'Nutrition', 'Exercise', 'Energy', 'Conditions'],
    spirit:        ['Meditation', 'Happiness', 'Gratitude', 'Forgiveness', 'Service'],
    relationships: ['Romantic', 'Family', 'Friendship', 'Communication', 'Networking'],
    money:         ['Wealth Mindset', 'Budgeting', 'Investing', 'Income', 'Entrepreneurship'],
    direction:     ['Goal Setting', 'Life Vision', 'Time Mgmt', 'Career', 'Habits'],
  }
  const subs = SUBCATEGORY_LABELS[area] ?? []

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Top accent band using area color */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 20,
          backgroundColor: m.hex,
        }} />

        {/* Background color wash */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 600, height: '100%',
          background: `linear-gradient(135deg, ${m.hex}08 0%, ${m.hex}18 100%)`,
        }} />

        {/* Large decorative circle */}
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 400, height: 400,
          borderRadius: '50%', backgroundColor: m.hex + '14',
        }} />
        <div style={{
          position: 'absolute', bottom: -100, right: 100, width: 300, height: 300,
          borderRadius: '50%', backgroundColor: m.hex + '0d',
        }} />

        {/* Content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'row',
          paddingTop: 60, paddingLeft: 72, paddingRight: 72, paddingBottom: 40,
        }}>
          {/* Left */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 48 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              {logoSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoSrc} width={32} height={32} alt="" style={{ objectFit: 'contain' }} />
              )}
              <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>Radiant Life Balance</span>
              <span style={{ fontSize: 14, color: '#cbd5e1' }}>›</span>
              <span style={{ fontSize: 14, color: m.hex, fontWeight: 700 }}>{m.name}</span>
            </div>

            {/* Headline */}
            <div style={{ fontSize: 62, fontWeight: 800, color: '#1e293b', lineHeight: 1.1, marginBottom: 20 }}>
              {m.name}
            </div>

            {/* Tagline */}
            <div style={{ fontSize: 24, color: '#64748b', lineHeight: 1.5, marginBottom: 36 }}>
              {m.tagline}
            </div>

            {/* Sub-area pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {subs.map((s) => (
                <div key={s} style={{
                  paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16,
                  borderRadius: 100, backgroundColor: m.hex + '18',
                  border: `1px solid ${m.hex}33`,
                  fontSize: 15, fontWeight: 600, color: m.hex,
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Right — icon showcase */}
          <div style={{
            width: 280, flexShrink: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 220, height: 220, borderRadius: 40,
              backgroundColor: m.light,
              border: `2px solid ${m.hex}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}>
              {iconSrc
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={iconSrc} width={160} height={160} alt="" style={{ objectFit: 'contain' }} />
                : <span style={{ fontSize: 100 }}>{m.emoji}</span>}
            </div>

            {/* Score ring hint */}
            <div style={{
              backgroundColor: '#f8fafc', borderRadius: 16,
              paddingTop: 16, paddingBottom: 16, paddingLeft: 24, paddingRight: 24,
              border: '1px solid #e2e8f0',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                Rate Your {m.name}
              </span>
              <span style={{ fontSize: 13, color: '#cbd5e1' }}>Take the free quiz →</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: 72, paddingRight: 72, paddingBottom: 20,
        }}>
          <span style={{ fontSize: 15, color: '#94a3b8' }}>radiantlifebalance.com/{area}</span>
          <span style={{ fontSize: 15, color: '#94a3b8' }}>Dr. David Lemmon, ND</span>
        </div>

        {/* Bottom area color stripe */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 12,
          backgroundColor: m.hex,
        }} />
      </div>
    ),
    { ...size }
  )
}
