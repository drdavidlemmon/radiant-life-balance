import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

const AREAS = [
  { name: 'Mind',          hex: '#f97316', score: 72 },
  { name: 'Body',          hex: '#ef4444', score: 44 },
  { name: 'Spirit',        hex: '#eab308', score: 58 },
  { name: 'Relationships', hex: '#3b82f6', score: 78 },
  { name: 'Money',         hex: '#22c55e', score: 36 },
  { name: 'Direction',     hex: '#a855f7', score: 52 },
]

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>

        {/* Top stripe */}
        <div style={{ display: 'flex', width: '100%', height: 16, flexShrink: 0, background: 'linear-gradient(90deg, #a855f7, #3b82f6, #22c55e)' }} />

        {/* Main two-col body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>

          {/* Left: headline */}
          <div style={{ width: 390, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 56, paddingRight: 36, paddingTop: 24, paddingBottom: 24, borderRight: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#a855f7', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Radiant Life Balance</span>
            <span style={{ fontSize: 42, fontWeight: 800, color: '#1e293b', lineHeight: 1.15, marginBottom: 2 }}>Discover</span>
            <span style={{ fontSize: 42, fontWeight: 800, color: '#1e293b', lineHeight: 1.15, marginBottom: 2 }}>Your Life</span>
            <span style={{ fontSize: 42, fontWeight: 800, color: '#1e293b', lineHeight: 1.15, marginBottom: 18 }}>Balance Score</span>
            <span style={{ fontSize: 15, color: '#64748b', lineHeight: 1.55, marginBottom: 28 }}>A 5-min assessment reveals which of the 6 life areas needs attention most.</span>

            {/* Score circle badge — every div explicitly has display:flex */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 12, paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #a855f7, #3b82f6, #22c55e)', marginRight: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: '50%', backgroundColor: '#f8fafc' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: '#1e293b' }}>57%</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>Sample result</span>
                <span style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>Take quiz for yours</span>
              </div>
            </div>
          </div>

          {/* Right: score bars */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 44, paddingRight: 56, paddingTop: 24, paddingBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>Sample Score Breakdown</span>

            {AREAS.map((a) => (
              <div key={a.name} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ width: 120, fontSize: 17, fontWeight: 700, color: '#334155', flexShrink: 0 }}>{a.name}</span>
                {/* Track: display:flex required even for single child */}
                <div style={{ display: 'flex', flex: 1, height: 20, backgroundColor: '#f1f5f9', borderRadius: 10, marginRight: 12, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', width: `${a.score}%`, height: '100%', background: `linear-gradient(90deg, ${a.hex}88, ${a.hex})`, borderRadius: 10 }} />
                </div>
                <span style={{ width: 42, fontSize: 15, fontWeight: 700, color: a.hex, flexShrink: 0 }}>{String(a.score) + '%'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 56, paddingRight: 56, paddingBottom: 8, paddingTop: 4 }}>
          <span style={{ fontSize: 13, color: '#cbd5e1' }}>radiantlifebalance.com</span>
          <span style={{ fontSize: 13, color: '#cbd5e1' }}>Dr. David Lemmon, ND</span>
        </div>

        {/* Bottom stripe */}
        <div style={{ display: 'flex', width: '100%', height: 12, flexShrink: 0, background: 'linear-gradient(90deg, #a855f7, #3b82f6, #22c55e)' }} />
      </div>
    ),
    { ...size }
  )
}
