import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size    = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 40%, #0a1628 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow blobs */}
        <div style={{
          position: 'absolute', top: -100, left: -100, width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, right: -80, width: 450, height: 450,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: 100, width: 300, height: 300,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
        }} />

        {/* Top stripe */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)',
        }} />

        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          backgroundColor: 'rgba(168,85,247,0.2)', borderRadius: 100,
          paddingTop: 10, paddingBottom: 10, paddingLeft: 22, paddingRight: 22,
          border: '1px solid rgba(168,85,247,0.4)', marginBottom: 32,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#a855f7' }} />
          <span style={{ fontSize: 15, color: '#c084fc', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
            Free Assessment
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 80, fontWeight: 800, textAlign: 'center', lineHeight: 1.05,
          color: '#ffffff', marginBottom: 24, maxWidth: 900,
        }}>
          30 Questions to Change Your Life
        </div>

        {/* Description */}
        <div style={{
          fontSize: 24, color: 'rgba(255,255,255,0.6)', textAlign: 'center',
          maxWidth: 700, lineHeight: 1.5, marginBottom: 48,
        }}>
          Discover exactly which of the 6 life areas is holding you back — and get your personal growth roadmap.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { label: 'Questions',   value: '30'  },
            { label: 'Minutes',     value: '5'   },
            { label: 'Life Areas',  value: '6'   },
          ].map((s) => (
            <div key={s.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 16,
              paddingTop: 20, paddingBottom: 20, paddingLeft: 36, paddingRight: 36,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ fontSize: 42, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{s.value}</span>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: 28,
          fontSize: 16, color: 'rgba(255,255,255,0.35)',
        }}>
          radiantlifebalance.com
        </div>

        {/* Bottom stripe */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 4,
          background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)',
        }} />
      </div>
    ),
    { ...size }
  )
}
