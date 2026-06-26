'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AreaKey } from '@/types'

interface Props { scores: Record<AreaKey, number> }

const NODES: { key: AreaKey; name: string; icon: string; hex: string; x: number; y: number }[] = [
  { key: 'body',          name: 'Body',          icon: '/icon-body.png',          hex: '#ef4444', x: 400, y: 105 },
  { key: 'mind',          name: 'Mind',          icon: '/icon-mind.png',          hex: '#f97316', x: 578, y: 207 },
  { key: 'spirit',        name: 'Spirit',        icon: '/icon-spirit.png',        hex: '#eab308', x: 578, y: 393 },
  { key: 'money',         name: 'Money',         icon: '/icon-money.png',         hex: '#22c55e', x: 400, y: 495 },
  { key: 'relationships', name: 'Relationships', icon: '/icon-relationships.png', hex: '#3b82f6', x: 222, y: 393 },
  { key: 'direction',     name: 'Direction',     icon: '/icon-direction.png',     hex: '#a855f7', x: 222, y: 207 },
]
const CX = 400, CY = 300, R = 44

export function MindMapHex({ scores }: Props) {
  return (
    <div className="w-full aspect-[4/3] max-h-72">
      <svg viewBox="80 60 640 480" className="w-full h-full">
        {NODES.map((n) => (
          <line key={n.key} x1={CX} y1={CY} x2={n.x} y2={n.y} stroke="#e2e8f0" strokeWidth="1.5" />
        ))}
        <circle cx={CX} cy={CY} r={36} fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        {NODES.map((n, i) => {
          const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2
          return <circle key={n.key} cx={CX + Math.cos(angle) * 18} cy={CY + Math.sin(angle) * 18} r={5} fill={n.hex} />
        })}
        <text x={CX} y={CY + 18} textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="600" letterSpacing="0.05em">BALANCE</text>
        {NODES.map((n) => {
          const score = scores[n.key] ?? 0
          const fill = Math.max(0.12, score / 100)
          return (
            <Link key={n.key} href={`/${n.key}`}>
              <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: NODES.indexOf(n) * 0.06 }}
                whileHover={{ scale: 1.06 }} style={{ cursor: 'pointer' }}>
                <circle cx={n.x} cy={n.y} r={R} fill="none" stroke="#f1f5f9" strokeWidth="6" />
                <circle cx={n.x} cy={n.y} r={R} fill="none" stroke={n.hex} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${fill * 2 * Math.PI * R} ${2 * Math.PI * R}`}
                  transform={`rotate(-90 ${n.x} ${n.y})`} opacity="0.9" />
                <circle cx={n.x} cy={n.y} r={R - 6} fill="white" />
                <circle cx={n.x} cy={n.y} r={R - 6} fill={n.hex} opacity="0.06" />
                <image href={n.icon} x={n.x - 16} y={n.y - 30} width="32" height="32" />
                <text x={n.x} y={n.y + 10} textAnchor="middle" fill="#1e293b" fontSize="9" fontWeight="700">{n.name}</text>
                <text x={n.x} y={n.y + 22} textAnchor="middle" fill={n.hex} fontSize="9" fontWeight="700">{score}%</text>
              </motion.g>
            </Link>
          )
        })}
      </svg>
    </div>
  )
}
