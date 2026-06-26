import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Radiant Life Balance',
  description: 'Medical disclaimer, affiliate disclosure, and terms of use for the Radiant Life Balance assessment.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{title}</h2>
      <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export default function DisclaimerPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Disclaimer</h1>
          <p className="text-slate-400 text-sm">Last updated: January {year}</p>
        </div>

        {/* Medical Disclaimer */}
        <Section title="Medical & Health Disclaimer">
          <p>
            The content published on Radiant Life Balance — including all articles, assessments, quiz results,
            product recommendations, and related materials — is intended <strong>for informational and educational
            purposes only</strong>. It is not a substitute for, and should not be relied upon as, professional
            medical advice, diagnosis, or treatment.
          </p>
          <p>
            Dr. David Lemmon, ND, is a licensed naturopathic doctor. The information provided through this
            website reflects general wellness education and personal opinion and does <strong>not</strong> constitute
            a physician-patient relationship. Viewing, completing the assessment, or reading any content on this
            site does not establish a clinical relationship between you and Dr. Lemmon or Radiant Life Balance.
          </p>
          <p>
            <strong>Always consult a qualified healthcare professional</strong> — including your primary care
            physician, a licensed naturopathic doctor, or a specialist — before making any changes to your
            health regimen, diet, exercise program, supplement use, or treatment plan. This is especially
            important if you are pregnant, nursing, taking prescription medications, or managing any chronic
            medical condition.
          </p>
          <p>
            Never disregard professional medical advice or delay seeking it because of something you have read
            on this website. If you believe you may be experiencing a medical emergency, call 911 or your local
            emergency number immediately.
          </p>
          <p>
            Radiant Life Balance makes no representations or warranties that the information on this site is
            complete, accurate, or current. Health and wellness research evolves continuously, and information
            that was accurate at the time of publication may be superseded by later findings.
          </p>
        </Section>

        {/* Assessment Disclaimer */}
        <Section title="Assessment & Quiz Disclaimer">
          <p>
            The Radiant Life Balance assessment — including both the 30-question primary quiz and all area-specific
            deep-dive assessments — is a <strong>self-reflection tool</strong> designed to help you identify areas
            of your life that may benefit from increased attention and intentional development.
          </p>
          <p>
            The quiz is <strong>not a clinical diagnostic instrument</strong>, psychological assessment, or
            medical evaluation. Results do not diagnose any medical or psychological condition, are not validated
            clinical scales, and should not be interpreted as such. If your results raise concerns about your
            physical or mental health, please speak with a licensed healthcare professional.
          </p>
          <p>
            Your quiz results are stored locally on your device and are not transmitted to or stored by
            Radiant Life Balance. Results reflect your responses at a single point in time and may change as
            your circumstances evolve.
          </p>
        </Section>

        {/* Affiliate Disclosure */}
        <Section title="Affiliate & Commercial Disclosure">
          <p>
            Radiant Life Balance participates in affiliate marketing programs. Some links on this website —
            including links to books, courses, supplements, tools, and other products — are <strong>affiliate
            links</strong>. This means that if you click on a link and make a qualifying purchase, Radiant Life
            Balance may receive a commission or other compensation from the retailer or vendor.
          </p>
          <p>
            <strong>This comes at no additional cost to you.</strong> Affiliate commissions do not influence the
            price you pay for any product. They help support the ongoing development of free educational content
            on this website.
          </p>
          <p>
            In accordance with the Federal Trade Commission (FTC) guidelines on endorsements and testimonials
            (16 CFR Part 255), we disclose that some content on this site may include compensation-based
            recommendations. This disclosure applies site-wide, including all article pages, resource lists,
            and product recommendations.
          </p>
          <p>
            Radiant Life Balance only recommends products and resources that we genuinely believe may benefit
            our readers, based on our own research, clinical experience, and professional judgment. However,
            individual results will vary, and a recommendation does not constitute a guarantee of efficacy,
            safety, or suitability for any individual.
          </p>
          <p>
            <em>
              Specific affiliate programs may include, but are not limited to: Amazon Associates and other
              partner programs. Applicable disclosures will be updated as new affiliate relationships are
              established.
            </em>
          </p>
        </Section>

        {/* Product Recommendations */}
        <Section title="Product & Supplement Recommendations">
          <p>
            References to specific products, supplements, books, courses, apps, or services on this website
            do not constitute a medical endorsement or guarantee of results. Supplement products in particular
            are not evaluated or approved by the Food and Drug Administration (FDA) to diagnose, treat, cure,
            or prevent any disease.
          </p>
          <p>
            Individual results from any product or wellness practice vary based on numerous personal factors
            including genetics, overall health, consistency of use, lifestyle, and other variables. Nothing
            on this website should be interpreted as a promise or guarantee of specific outcomes.
          </p>
          <p>
            Always research products independently and consult with your healthcare provider before beginning
            any new supplement, nutrition protocol, or wellness program.
          </p>
        </Section>

        {/* Earnings / Results Disclaimer */}
        <Section title="Financial & Life Results Disclaimer">
          <p>
            Articles and content in the Money and Direction sections of this website contain general financial
            education information. This content is <strong>not financial advice</strong> and does not constitute
            a recommendation to buy or sell any security, investment, or financial product.
          </p>
          <p>
            Radiant Life Balance is not a licensed financial advisor, investment advisor, or registered
            broker-dealer. All financial decisions should be made in consultation with a qualified financial
            professional who can evaluate your specific circumstances.
          </p>
          <p>
            Past performance of any investment or financial strategy does not guarantee future results.
            All investing involves risk, including the possible loss of principal.
          </p>
          <p>
            Similarly, any references to personal development, career outcomes, relationship improvement,
            or other life results are illustrative examples and individual experiences only. Results are
            not guaranteed and will vary based on individual effort, circumstances, and many factors
            outside our control.
          </p>
        </Section>

        {/* Copyright & Intellectual Property */}
        <Section title="Copyright & Intellectual Property">
          <p>
            All content on this website — including text, articles, graphics, logos, quiz questions, and
            the Radiant Life Balance assessment — is the intellectual property of Radiant Life Balance and
            Dr. David Lemmon, ND, unless otherwise stated. Content is protected under applicable copyright
            law.
          </p>
          <p>
            You may share individual articles or quiz links for personal, non-commercial purposes with
            appropriate attribution. You may not reproduce, republish, sell, or distribute any content
            from this website for commercial purposes without prior written permission.
          </p>
        </Section>

        {/* Changes */}
        <Section title="Changes to This Disclaimer">
          <p>
            Radiant Life Balance reserves the right to update or modify this disclaimer at any time without
            prior notice. Changes become effective when posted to this page. Your continued use of this
            website following any changes constitutes acceptance of the updated disclaimer.
          </p>
          <p>
            If you have questions about this disclaimer, please contact us at:{' '}
            <a href="mailto:hello@radiantlifebalance.com" className="text-blue-600 hover:underline">
              hello@radiantlifebalance.com
            </a>
          </p>
        </Section>

        {/* Bottom CTA */}
        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm mb-4">
            © {year} Radiant Life Balance · by Dr. David Lemmon, ND
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Return to Radiant Life Balance
          </Link>
        </div>

      </div>
    </div>
  )
}
