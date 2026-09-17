import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Radiant Life Balance',
  description: 'The terms and conditions governing your use of Radiant Life Balance.',
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

export default function TermsPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-400 text-sm">Last updated: January {year}</p>
        </div>

        <Section title="Agreement to Terms">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of radiantlifebalance.com
            (the &ldquo;Website&rdquo;), operated by Dr. David Lemmon, ND (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;). By accessing or using the Website, you agree to be bound by these Terms. If you do
            not agree to these Terms, please do not use the Website.
          </p>
        </Section>

        <Section title="Use of the Website">
          <p>
            The Website provides a self-assessment quiz and related educational content across six life
            areas: Mind, Body, Spirit, Relationships, Money, and Direction. You may use the Website for
            personal, non-commercial purposes only.
          </p>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the Website in any way that violates any applicable law or regulation.</li>
            <li>Attempt to gain unauthorized access to any portion of the Website or its related systems.</li>
            <li>Use any automated system, including &ldquo;bots&rdquo; or &ldquo;scrapers,&rdquo; to access the Website for any purpose without our prior written consent.</li>
            <li>Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Website for commercial purposes without our express written permission.</li>
            <li>Interfere with or disrupt the operation of the Website or the servers or networks used to make it available.</li>
          </ul>
        </Section>

        <Section title="No Medical Advice">
          <p>
            The Website and its content, including the assessment quiz, are provided for informational and
            educational purposes only and do not constitute medical, psychological, financial, or professional
            advice of any kind. Use of the Website does not create a physician-patient relationship. Please
            see our{' '}
            <Link href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
            {' '}for full details.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            The Website and its entire contents, features, and functionality — including but not limited to
            all text, graphics, logos, quiz questions, assessment methodology, and the compilation thereof —
            are owned by Dr. David Lemmon, ND, and are protected by United States and international copyright,
            trademark, and other intellectual property laws.
          </p>
          <p>
            You may share links to the Website or individual pages for personal, non-commercial purposes. You
            may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise
            exploit any content from the Website without our prior written consent.
          </p>
        </Section>

        <Section title="Affiliate Links and Third-Party Content">
          <p>
            The Website contains links to third-party websites and services, including affiliate links to
            products we recommend. We do not control and are not responsible for the content, accuracy, or
            practices of any third-party websites. Your use of any third-party website is governed by that
            site&apos;s own terms and privacy policy. See our{' '}
            <Link href="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
            {' '}for our full affiliate disclosure.
          </p>
        </Section>

        <Section title="User-Provided Information">
          <p>
            If you provide your email address to subscribe to our newsletter or receive updates, you represent
            that the information you provide is accurate and that you have the right to provide it. See our{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            {' '}for details on how we handle your information.
          </p>
        </Section>

        <Section title="Disclaimer of Warranties">
          <p>
            The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without any
            warranties of any kind, either express or implied, including but not limited to implied warranties
            of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
          </p>
          <p>
            We do not warrant that the Website will be uninterrupted, timely, secure, or error-free, or that
            any results obtained from using the Website (including quiz results) will be accurate or reliable.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            To the fullest extent permitted by applicable law, in no event will Dr. David Lemmon, ND, or
            Radiant Life Balance be liable for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss
            of data, use, goodwill, or other intangible losses, resulting from your access to or use of, or
            inability to access or use, the Website.
          </p>
        </Section>

        <Section title="Indemnification">
          <p>
            You agree to defend, indemnify, and hold harmless Dr. David Lemmon, ND, and Radiant Life Balance
            from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or
            fees arising out of or relating to your violation of these Terms or your use of the Website.
          </p>
        </Section>

        <Section title="Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States
            and the state in which Radiant Life Balance is operated, without regard to its conflict of law
            provisions.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            We reserve the right to modify these Terms at any time. We will indicate changes by updating the
            &ldquo;Last updated&rdquo; date at the top of this page. Your continued use of the Website following
            any changes constitutes your acceptance of the revised Terms.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            If you have any questions about these Terms, please contact us at:{' '}
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
