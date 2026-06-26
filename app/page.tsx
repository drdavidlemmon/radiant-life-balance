import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, FlaskConical } from 'lucide-react'
import { areasList } from '@/lib/areas-data'
import { ShareQuizButton } from '@/components/share-quiz-button'

const AREA_COLORS: Record<string, string> = {
  mind: '#f97316', body: '#ef4444', spirit: '#eab308',
  relationships: '#3b82f6', money: '#22c55e', direction: '#a855f7',
}

const AREA_ICONS: Record<string, string> = {
  mind: '/icon-mind.png', body: '/icon-body.png', spirit: '/icon-spirit.png',
  relationships: '/icon-relationships.png', money: '/icon-money.png', direction: '/icon-direction.png',
}

const HOW_IT_WORKS = [
  { n: '01', title: '30 Questions to Change Your Life', body: 'Rate each statement honestly on a 1-5 scale. It takes about 5 minutes.' },
  { n: '02', title: 'Get your Life Balance score', body: 'See exactly how you score across all 6 life areas, visualized on a radar and mind map.' },
  { n: '03', title: 'Follow your priority roadmap', body: 'Your lowest-scoring area becomes your #1 focus. Articles, courses, and tools await.' },
]

const STUDIES = [
  {
    area: 'The Framework',
    color: '#a855f7',
    iconSrc: null as string | null,
    title: 'Multi-Domain Wellness Assessment',
    finding: 'Dr. Bill Hettler\'s Wellness Wheel (1976, National Wellness Institute) established the foundational science of multi-domain well-being. His peer-reviewed six-dimension framework demonstrated that no single area operates in isolation. Independently, Harvard\'s Human Flourishing Program validated a six-domain Well-Being Assessment covering emotional health, physical health, meaning & purpose, character, social connectedness, and financial security — mapping closely to the six areas assessed here.',
    sources: [
      { label: 'Hettler, B. (1976). National Wellness Institute', href: 'https://www.nationalwellness.org' },
      { label: 'Harvard Human Flourishing Program, WBA (2021)', href: 'https://news.harvard.edu/gazette/story/newsplus/new-paper-develops-a-comprehensive-measure-of-holistic-well-being/' },
      { label: 'Stoewen, D.L. (2017). Dimensions of wellness — PMC', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5508938/' },
    ],
  },
  {
    area: 'Mind', color: '#f97316', iconSrc: '/icon-mind.png' as string | null,
    title: 'Cognitive & Creative Wellness',
    finding: 'Intellectual wellness — creative engagement, learning, and cognitive challenge — is one of the original pillars of Hettler\'s framework and is consistently associated with reduced cognitive decline, improved emotional resilience, and greater life satisfaction.',
    sources: [
      { label: 'Stoewen, D.L. (2017). Dimensions of wellness — PMC', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5508938/' },
      { label: 'UC Davis: Eight Dimensions of Wellness', href: 'https://shcs.ucdavis.edu/health-and-wellness/eight-dimensions-wellness' },
    ],
  },
  {
    area: 'Body', color: '#ef4444', iconSrc: '/icon-body.png' as string | null,
    title: 'Physical Health as Foundation',
    finding: 'Physical wellness is universally validated across every major wellness framework. Sleep quality, nutrition, movement, and preventive care each have thousands of peer-reviewed studies linking them to longevity, mental health, and quality of life. Its decline directly worsens every other life area.',
    sources: [
      { label: 'WHO: Physical Activity and Health (2020)', href: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' },
      { label: 'Stoewen, D.L. (2017). Dimensions of wellness — PMC', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5508938/' },
    ],
  },
  {
    area: 'Spirit', color: '#eab308', iconSrc: '/icon-spirit.png' as string | null,
    title: 'Meaning, Purpose & Spiritual Wellbeing',
    finding: 'Harvard\'s WBA identifies meaning and purpose as a distinct, measurable domain of well-being. Research consistently finds that a strong sense of purpose correlates with lower rates of depression, faster recovery from illness, and greater resilience to stress.',
    sources: [
      { label: 'Harvard Human Flourishing Program, WBA (2021)', href: 'https://news.harvard.edu/gazette/story/newsplus/new-paper-develops-a-comprehensive-measure-of-holistic-well-being/' },
      { label: 'Koenig, H.G. (2012). Religion, Spirituality & Health — ISRN Psychiatry', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3426191/' },
    ],
  },
  {
    area: 'Relationships', color: '#3b82f6', iconSrc: '/icon-relationships.png' as string | null,
    title: 'Social Connection & Longevity',
    finding: 'A landmark 2024 PMC review found social connection is one of the most powerful predictors of mortality — strong social ties are associated with a 50% increased likelihood of survival. Social isolation carries a mortality risk comparable to smoking 15 cigarettes per day.',
    sources: [
      { label: 'Holt-Lunstad, J. et al. (2024). Social connection as a critical factor — PMC', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11403199/' },
      { label: 'Harvard Study of Adult Development', href: 'https://www.adultdevelopmentstudy.org/' },
    ],
  },
  {
    area: 'Money', color: '#22c55e', iconSrc: '/icon-money.png' as string | null,
    title: 'Financial Wellness & Health Outcomes',
    finding: 'Financial stress permeates physical and mental health. The Financial Health Network found 40% of Americans experience moderate-to-high financial stress. Columbia University research shows even a modest increase in financial security correlates with improved longevity and healthier lifestyle choices.',
    sources: [
      { label: 'Financial Health Network: Mental-Financial Health Connection', href: 'https://finhealthnetwork.org/research/understanding-the-mental-financial-health-connection/' },
      { label: 'Columbia University: Health & Financial Well-Being', href: 'https://www.cuimc.columbia.edu/news/link-between-health-and-financial-well-being' },
    ],
  },
  {
    area: 'Direction', color: '#a855f7', iconSrc: '/icon-direction.png' as string | null,
    title: 'Purpose, Habits & Self-Direction',
    finding: 'A systematic review of 181 research papers validated life quality domains including autonomy and self-actualization, each with strong correlations to flourishing. Self-Determination Theory (Deci & Ryan) demonstrates that purposeful direction is a fundamental psychological need.',
    sources: [
      { label: 'Domokos, K. (2025). The Flourishing Life Model — JPPC (181-paper review)', href: 'https://www.journal.theippc.com/article/138595-the-flourishing-life-model-a-systematic-literature-review-of-the-core-life-domains-and-indicators-constituting-quality-of-life' },
      { label: 'Deci, E.L. & Ryan, R.M. Self-Determination Theory', href: 'https://selfdeterminationtheory.org/' },
    ],
  },
]

export default function Home() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-white pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-100/40 via-orange-50/30 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-40 h-40 mb-8">
            <Image src="/logo.png" alt="Radiant Life Balance" width={160} height={160} className="w-full h-full object-contain" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 leading-[1.08] tracking-tight mb-6">
            <span className="block">Discover Your</span>
            <span className="block" style={{
              background: 'linear-gradient(90deg, #ff0000 0%, #ff6600 17%, #ffdd00 34%, #00cc44 51%, #0044ff 68%, #7700cc 84%, #6600cc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Radiant Life Balance
            </span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            A doctor-created, evidence-based assessment across 6 life areas — Mind, Body, Spirit, Relationships, Money & Direction.
            Find your balance, find your best self.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quiz"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
              30 Questions to Change Your Life
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/results"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-white transition-all">
              View Sample Results
            </Link>
          </div>

          {/* Share nudge */}
          <div className="flex items-center justify-center mt-5 gap-3">
            <span className="text-xs text-slate-400">Know someone who needs this?</span>
            <ShareQuizButton />
          </div>

          <p className="text-xs text-slate-400 mt-4">By Dr. David Lemmon, ND</p>
        </div>
      </section>

      {/* 6 Life Areas */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">The 6 Areas of a Radiant Life</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Each area has dedicated resources, articles, and products to help you grow</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areasList.map((area) => {
              const hex = AREA_COLORS[area.key]
              return (
                <Link key={area.key} href={`/${area.key}`}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col items-center text-center">
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: hex }} />
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: hex }}>
                    {area.subcategories.length} sub-areas
                  </span>
                  <div className="mb-4 mt-2">
                    <Image src={AREA_ICONS[area.key]} alt={area.name} width={104} height={104} className="object-contain" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{area.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{area.tagline}</p>
                  <div className="flex items-center justify-center gap-1.5 text-sm font-medium" style={{ color: hex }}>
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-500">Three steps to a clearer, more balanced life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-900 font-bold text-sm mb-5 font-mono">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">A full picture of your life</h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Most assessments focus on one dimension. Radiant Life Balance maps your entire life —
                so you can see where you are thriving and where you most need to grow.
              </p>
              <ul className="space-y-3">
                {[
                  'Visual radar chart of all 6 areas',
                  'Priority-ranked improvement roadmap',
                  'Curated articles, books & courses per area',
                  'Re-take every 6 months to track growth',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="relative w-56 h-56">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image src="/logo.png" alt="Life Balance" width={224} height={224} className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center bg-slate-900 rounded-3xl px-8 py-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to find your balance?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            The 30-question quiz takes about 5 minutes. Your results are private and instant.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link href="/quiz"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #22c55e 100%)' }}>
              30 Questions to Change Your Life
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs">or</span>
              <ShareQuizButton variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTRODUCTION ─── */}
      <section id="introduction" className="px-4 pt-20 pb-10">
        <div className="max-w-3xl mx-auto">

          {/* Section label */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Introduction</h2>
          </div>

          {/* Dr. Lemmon's text */}
          <div className="space-y-6 mb-12">
            <p className="text-slate-700 leading-relaxed text-lg">
              Welcome to Radiant Life Balance! I&rsquo;m excited that you&rsquo;re here. This site was created as a
              public service with a free quiz to help you quickly and easily see which specific areas of your life are
              most out of balance and then to arm you with the tools, knowledge, and motivation to improve those weaker
              areas of life. You can come back and retake the quiz as many times as you want throughout the year to see
              how your scores improve.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              As a naturopathic physician, I&rsquo;m trained to think holistically. Because every area of life affects
              every other area of life in both direct and subtle ways, each one of these areas has an effect on health
              and happiness, which is my professional expertise. But as a lifelong student, I have tried to study and
              understand all the other areas of life as well. So this is my effort to create something beyond
              traditional healthcare and expand into a full &ldquo;life care&rdquo; model.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              A quick word about balance. There are many teachers and gurus out there that say balance is a myth, or
              work-life balance isn&rsquo;t attainable, or there&rsquo;s no such thing as balance in life. It all comes
              down to how you define things. So when I talk about balance, I&rsquo;m not talking about equality; the
              goal isn&rsquo;t to make the time or energy you dedicate to your body, mind, spirit, relationships, money,
              and direction all the same. The way I define balance is a dynamic, ever-changing effort to put enough
              attention, time, or money into each of these areas of your life so that none of them suffer at the expense
              of the others. We all know people who put all their time and attention into their health, but they&rsquo;re
              broke or spiritually destitute, and we know the clich&eacute; of the workaholic who puts all their time
              and attention into earning money only to lose their relationships and their health along the way. So
              balance is keeping all 6 of these plates spinning in your life &mdash; not all at the exact same time, and
              not at the same speed. But the goal is not too many wobbles, and no broken plates.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              So I created this site and these assessments to help give you a quick snapshot of six important areas of
              your life and ways to take a deep dive into some of those hidden blind spots or weak areas that, if
              strengthened, have the potential to completely transform every area of your life &mdash; because a chain is
              only as strong as its weakest link. So we want to systematically strengthen the weak links in your life so
              you can turn your life into a masterpiece.
            </p>
            <p className="text-slate-700 leading-relaxed text-lg">
              May God bless you in your pursuit of Radiant Life Balance!
            </p>
          </div>

          {/* Signature */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-slate-100" />
            <p className="text-slate-500 font-medium italic text-base whitespace-nowrap">&mdash; Dr. David Lemmon</p>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

        </div>
      </section>

      {/* ─── SCIENCE SECTION ─── */}
      <section className="px-4 pb-24">
        <div className="max-w-3xl mx-auto">

          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-xs uppercase tracking-widest font-bold text-purple-500">Research Foundation</p>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The Science of Whole-Life Balance</h2>
          <p className="text-slate-500 leading-relaxed mb-12 max-w-2xl">
            The six life areas assessed here are not arbitrary — each maps onto decades of peer-reviewed wellness
            research. Below is a summary of the key studies and frameworks that inform this assessment.
          </p>

          <div className="space-y-6">
            {STUDIES.map((study) => (
              <div key={study.area} className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-1 w-full" style={{ background: study.color }} />
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {study.iconSrc ? (
                      <Image src={study.iconSrc} alt={study.area} width={52} height={52} className="object-contain flex-shrink-0" />
                    ) : (
                      <div className="w-13 h-13 rounded-full flex items-center justify-center flex-shrink-0 p-3"
                        style={{ backgroundColor: study.color + '18', color: study.color }}>
                        <FlaskConical className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: study.color + '18', color: study.color }}>
                          {study.area}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">{study.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{study.finding}</p>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1.5">Sources</p>
                        {study.sources.map((s, i) => (
                          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-slate-500 hover:text-purple-600 transition-colors group">
                            <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-purple-400 flex-shrink-0 transition-colors" />
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 px-4 text-center">
        <p className="text-slate-400 text-xs">© {new Date().getFullYear()} Radiant Life Balance · Dr. David Lemmon, ND</p>
      </footer>
    </div>
  )
}
