'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const AREAS = [
  { key: 'body',          name: 'Body',          color: '#ef4444' },
  { key: 'mind',          name: 'Mind',          color: '#f97316' },
  { key: 'spirit',        name: 'Spirit',        color: '#eab308' },
  { key: 'money',         name: 'Money',         color: '#22c55e' },
  { key: 'relationships', name: 'Relationships', color: '#3b82f6' },
  { key: 'direction',     name: 'Direction',     color: '#a855f7' },
]

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-200',
      scrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
        : 'bg-white/95 backdrop-blur-sm border-b border-slate-100'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 flex-shrink-0">
            <Image src="/logo.png" alt="Radiant Life Balance" width={36} height={36} className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-slate-900 leading-tight">Radiant Life Balance</div>
            <div className="text-[10px] text-slate-400 leading-tight tracking-wide uppercase">Whole-Life Assessment</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {AREAS.map((a) => (
            <Link key={a.key} href={`/${a.key}`}
              className={cn(
                'group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                pathname === `/${a.key}` ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-white'
              )}>
              <span className="w-2 h-2 rounded-full flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: a.color }} />
              {a.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/quiz"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
            Take the Quiz
          </Link>
          <button onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2">
          <div className="grid grid-cols-2 gap-1 mb-3">
            {AREAS.map((a) => (
              <Link key={a.key} href={`/${a.key}`}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                {a.name}
              </Link>
            ))}
          </div>
          <Link href="/quiz"
            className="flex items-center justify-center w-full py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
            Take the Quiz
          </Link>
        </div>
      )}
    </header>
  )
}
