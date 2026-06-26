'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { AreaKey } from '@/types'

interface Props { scores: Record<AreaKey, number> }

const AREA_COLORS: Record<AreaKey, string> = {
  mind: '#f97316', body: '#ef4444', spirit: '#eab308',
  relationships: '#3b82f6', money: '#22c55e', direction: '#a855f7',
}
const AREA_DISPLAY: Record<AreaKey, string> = {
  mind: 'Mind', body: 'Body', spirit: 'Spirit',
  relationships: 'Relationships', money: 'Money', direction: 'Direction',
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: { area: string; score: number; color: string } }[] }) {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm shadow-lg">
        <p className="font-semibold text-slate-900">{d.area}</p>
        <p className="font-bold" style={{ color: d.color }}>{d.score}%</p>
      </div>
    )
  }
  return null
}

export function LifeBalanceChart({ scores }: Props) {
  const order: AreaKey[] = ['mind', 'body', 'spirit', 'relationships', 'money', 'direction']
  const data = order.map((key) => ({ area: AREA_DISPLAY[key], score: scores[key], color: AREA_COLORS[key], fullMark: 100 }))

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity={0.15} />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.12} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.15} />
          </linearGradient>
        </defs>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="area" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} tickCount={4} stroke="#e2e8f0" />
        <Radar name="Score" dataKey="score" stroke="#a855f7" fill="url(#radarFill)" fillOpacity={1} strokeWidth={2}
          dot={(props) => {
            const { cx, cy, payload } = props as { cx: number; cy: number; payload: { color: string } }
            return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={5} fill={payload.color} stroke="white" strokeWidth={2} />
          }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
