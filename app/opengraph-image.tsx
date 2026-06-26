import { ImageResponse } from 'next/og'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

const AREAS = [
  { name: 'Mind',          hex: '#f97316' },
  { name: 'Body',          hex: '#ef4444' },
  { name: 'Spirit',        hex: '#eab308' },
  { name: 'Relationships', hex: '#3b82f6' },
  { name: 'Money',         hex: '#22c55e' },
  { name: 'Direction',     hex: '#a855f7' },
]

export default function Image() {
  const logoBuffer = fs.readFileSync(path.join(process.cwd(), 'public/logo-og.png'))
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top gradient stripe */}
        <div style={{
          width: '100%', height: 18,
          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)',
          flexShrink: 0,
        }} />

        {/* Main row */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'row',
          alignItems: 'stretch',
          paddingTop: 40, paddingBottom: 20,
          paddingLeft: 68, paddingRight: 68,
        }}>
          {/* Left column */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            width: 460, flexShrink: 0, paddingRight: 48,
          }}>
            {/* Logo + brand */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} width={72} height={72} alt="" style={{ objectFit: 'contain', marginRight: 16 }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#a855f7', letterSpacing: 2, textTransform: 'uppercase' }}>
                  Radiant Life Balance
                </span>
                <span style={{ fontSize: 13, color: '#94a3b8', marginTop: 3 }}>
                  by Dr. David Lemmon, ND
                </span>
              </div>
            </div>

            {/* Headline — use flexDirection column + spans instead of <br/> */}
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
              <span style={{ fontSize: 56, fontWeight: 800, color: '#1e293b', lineHeight: 1.1 }}>30 Questions</span>
              <span style={{ fontSize: 56, fontWeight: 800, color: '#1e293b', lineHeight: 1.1 }}>to Change</span>
              <span style={{ fontSize: 56, fontWeight: 800, color: '#1e293b', lineHeight: 1.1 }}>Your Life</span>
            </div>

            {/* Subtext */}
            <div style={{ display: 'flex' }}>
              <span style={{ fontSize: 18, color: '#64748b', lineHeight: 1.5, maxWidth: 380 }}>
                Discover your life balance score across 6 areas and get your personal roadmap — free, in 5 minutes.
              </span>
            </div>
          </div>

          {/* Vertical divider */}
          <div style={{
            width: 1, backgroundColor: '#e2e8f0',
            marginLeft: 0, marginRight: 52, flexShrink: 0, alignSelf: 'stretch',
          }} />

          {/* Right column — area list */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
              The 6 Life Areas
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {AREAS.map((a) => (
                <div key={a.name} style={{
                  display: 'flex', alignItems: 'center',
                  backgroundColor: a.hex + '12',
                  borderRadius: 10,
                  paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
                  marginBottom: 10,
                  borderLeft: `4px solid ${a.hex}`,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    backgroundColor: a.hex, marginRight: 14, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 22, fontWeight: 700, color: '#1e293b' }}>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer row */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          paddingLeft: 68, paddingRight: 68, paddingBottom: 8,
        }}>
          <span style={{ fontSize: 14, color: '#94a3b8' }}>radiantlifebalance.com</span>
          <span style={{ fontSize: 14, color: '#94a3b8' }}>Free · 5 minutes · Private results</span>
        </div>

        {/* Bottom gradient stripe */}
        <div style={{
          width: '100%', height: 14, flexShrink: 0,
          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)',
        }} />
      </div>
    ),
    { ...size }
  )
}
