import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Radiant Life Balance',
  description: 'Meet Dr. David Lemmon, ND, and learn the story behind the Radiant Life Balance assessment.',
}

export default function AboutPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="Radiant Life Balance" width={48} height={48} className="object-contain" />
            <h1 className="text-4xl font-bold text-slate-900">About Radiant Life Balance</h1>
          </div>
        </div>

        <section className="mb-10 space-y-4 text-slate-600 text-base leading-relaxed">
          <p>
            Radiant Life Balance was created to answer a simple question: <em>which area of your life, if
            strengthened, would have the greatest ripple effect on everything else?</em>
          </p>
          <p>
            Most self-improvement advice focuses on a single dimension — fitness, productivity, mindset — in
            isolation. But real life doesn&apos;t work that way. Your health affects your relationships. Your
            finances affect your stress levels. Your sense of purpose affects your discipline. Everything is
            connected.
          </p>
          <p>
            That&apos;s why Radiant Life Balance evaluates six interconnected areas — <strong>Mind, Body,
            Spirit, Relationships, Money, and Direction</strong> — through a single, free, 30-question
            assessment. In about five minutes, you get a clear, visual picture of where you&apos;re thriving and
            where your attention is most needed, along with a curated roadmap of articles, books, and
            resources to help you grow in your priority area.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Meet Dr. David Lemmon, ND
          </h2>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>
              Dr. David Lemmon is a licensed naturopathic doctor with a holistic approach to health and
              wellbeing. Trained to look beyond isolated symptoms to the full picture of a person&apos;s life,
              Dr. Lemmon has long believed that true wellness cannot be separated from the other domains of
              life — relationships, finances, purpose, and mindset all shape physical and mental health in
              direct and subtle ways.
            </p>
            <p>
              Beyond clinical practice, Dr. Lemmon is the author of two books and has spent years studying
              the research behind whole-life wellbeing — from Dr. Bill Hettler&apos;s foundational Wellness Wheel
              to Harvard&apos;s Human Flourishing Program. Radiant Life Balance is the culmination of that
              research: an effort to translate decades of peer-reviewed wellness science into a practical,
              five-minute tool anyone can use.
            </p>
            <p>
              Radiant Life Balance was built as a public service — a free resource to help people quickly
              identify their most impactful area for growth, backed by real research rather than trends or
              guesswork.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Our Approach
          </h2>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>
              We believe balance isn&apos;t about giving equal time and energy to every area of life — it&apos;s
              about making sure no single area is neglected to the point that it undermines everything else.
              A chain is only as strong as its weakest link, so we help you find and strengthen yours.
            </p>
            <p>
              Every recommendation on this site — whether an article, book, or product — is chosen based on
              genuine research and clinical judgment, not passing trends. Where we recommend products through
              affiliate partnerships, we disclose this clearly, and our recommendations are never influenced
              by commission rates. See our full{' '}
              <Link href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
              {' '}for details.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Get in Touch
          </h2>
          <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
            <p>
              Have a question, feedback, or a resource suggestion? We&apos;d love to hear from you at{' '}
              <a href="mailto:hello@radiantlifebalance.com" className="text-blue-600 hover:underline">
                hello@radiantlifebalance.com
              </a>
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}
          >
            Take the 30-Question Assessment
          </Link>
          <p className="text-slate-400 text-sm mt-6">
            © {year} Radiant Life Balance · by Dr. David Lemmon, ND
          </p>
        </div>

      </div>
    </div>
  )
}
