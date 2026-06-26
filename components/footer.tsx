import Link from 'next/link'
import Image from 'next/image'

const AREAS = [
  { key: 'body',          name: 'Body',          color: '#ef4444' },
  { key: 'mind',          name: 'Mind',          color: '#f97316' },
  { key: 'spirit',        name: 'Spirit',        color: '#eab308' },
  { key: 'money',         name: 'Money',         color: '#22c55e' },
  { key: 'relationships', name: 'Relationships', color: '#3b82f6' },
  { key: 'direction',     name: 'Direction',     color: '#a855f7' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-100 mt-auto">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="Radiant Life Balance" width={36} height={36} className="object-contain" />
            <div>
              <div className="text-sm font-semibold text-slate-900 leading-tight">Radiant Life Balance</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">Whole-Life Assessment</div>
            </div>
          </Link>
          <p className="text-sm text-slate-500 leading-relaxed">
            A doctor-created assessment across 6 life areas — helping you discover where to focus for the greatest impact on your wellbeing.
          </p>
          <p className="text-xs text-slate-400 mt-4">by Dr. David Lemmon, ND</p>
        </div>

        {/* Life Areas */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Life Areas</h3>
          <ul className="space-y-2.5">
            {AREAS.map(a => (
              <li key={a.key}>
                <Link
                  href={`/${a.key}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: a.color }} />
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Links</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/quiz',       label: 'Take the Assessment' },
              { href: '/results',    label: 'View My Results' },
              { href: '/#introduction', label: 'Introduction' },
              { href: '/disclaimer', label: 'Disclaimer' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Take the Quiz CTA */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Get Started</h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            30 questions. 5 minutes. A complete picture of your whole-life balance.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}
          >
            30 Questions to Change Your Life
          </Link>
        </div>
      </div>

      {/* Disclaimer bar */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <p className="text-xs text-slate-400 leading-relaxed text-center max-w-4xl mx-auto">
            <strong className="text-slate-500">Medical Disclaimer:</strong> The content on this website is for informational and educational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of your physician or other qualified health professional before making any changes to your health, diet, or wellness routine.{' '}
            <strong className="text-slate-500">Affiliate Disclosure:</strong> Some links on this site are affiliate links. If you click through and make a purchase, Radiant Life Balance may earn a commission at no additional cost to you. We only recommend products and resources we genuinely believe in.{' '}
            <Link href="/disclaimer" className="underline hover:text-slate-600 transition-colors">Full Disclaimer →</Link>
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {year} Radiant Life Balance. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/disclaimer" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Disclaimer</Link>
            <span className="text-slate-200">|</span>
            <Link href="/#introduction" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Introduction</Link>
            <span className="text-slate-200">|</span>
            <Link href="/quiz" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Take the Quiz</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
