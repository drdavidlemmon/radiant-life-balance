import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Radiant Life Balance',
  description: 'How Radiant Life Balance collects, uses, and protects your information.',
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

export default function PrivacyPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: January {year}</p>
        </div>

        <Section title="Overview">
          <p>
            Radiant Life Balance (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to
            protecting it through this Privacy Policy. This policy describes the types of information we may
            collect from you, or that you may provide, when you visit radiantlifebalance.com (the
            &ldquo;Website&rdquo;), and our practices for collecting, using, maintaining, protecting, and disclosing
            that information.
          </p>
          <p>
            This policy applies to information we collect on this Website, in email, text, and other
            electronic communications sent through or in connection with this Website.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>We may collect several types of information from and about users of our Website:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Quiz responses:</strong> Your answers to the Radiant Life Balance assessment are processed
              in your browser to calculate your results. We do not transmit or store your individual quiz
              answers on our servers.
            </li>
            <li>
              <strong>Email address:</strong> If you voluntarily subscribe to our newsletter, opt in for updates,
              or request a copy of your results, we collect the email address you provide.
            </li>
            <li>
              <strong>Usage data:</strong> We may automatically collect certain information about your equipment,
              browsing actions, and patterns, including your IP address, browser type, referring/exit pages,
              operating system, date/time stamps, and general clickstream data, using cookies and similar
              technologies.
            </li>
            <li>
              <strong>Communications:</strong> If you contact us directly (for example, by email), we may keep a
              record of that correspondence.
            </li>
          </ul>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use information that we collect about you or that you provide to us:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To operate, maintain, and improve our Website and the assessment experience.</li>
            <li>To send you newsletters, educational content, and updates you have requested, if you have opted in.</li>
            <li>To respond to your inquiries, comments, or requests.</li>
            <li>To analyze usage trends and improve our content and user experience.</li>
            <li>To detect, prevent, and address technical issues, fraud, or abuse.</li>
            <li>To comply with applicable legal obligations.</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
        </Section>

        <Section title="Cookies and Tracking Technologies">
          <p>
            We may use cookies, web beacons, and similar tracking technologies to collect information about
            your browsing activities. Cookies are small data files stored on your device. We use cookies to
            understand how visitors use our Website, remember your preferences, and support analytics and
            affiliate link tracking.
          </p>
          <p>
            You can set your browser to refuse all or some browser cookies, or to alert you when cookies are
            being sent. If you disable or refuse cookies, some parts of the Website may become inaccessible or
            not function properly.
          </p>
        </Section>

        <Section title="Affiliate Links and Third-Party Tracking">
          <p>
            This Website contains affiliate links to third-party retailers and service providers, including
            but not limited to Amazon Associates and other partner programs. When you click on an affiliate
            link, the third party may place a cookie on your device to track the referral for commission
            purposes. Their use of tracking technologies is governed by their own privacy policies, not this
            one. We encourage you to review the privacy policies of any third-party site you visit.
          </p>
        </Section>

        <Section title="Third-Party Service Providers">
          <p>
            We may use third-party services to help us operate our Website and communicate with subscribers,
            including web hosting providers, analytics services, and email delivery platforms. These providers
            have access to personal information only to the extent necessary to perform their functions and
            are contractually obligated to protect it.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We have implemented reasonable measures designed to secure your personal information from
            accidental loss and from unauthorized access, use, alteration, and disclosure. However, no method
            of transmission over the internet or method of electronic storage is completely secure, and we
            cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            Our Website is not intended for children under the age of 13, and we do not knowingly collect
            personal information from children under 13. If we learn we have collected personal information
            from a child under 13, we will take steps to delete that information promptly.
          </p>
        </Section>

        <Section title="Your Choices">
          <p>
            If you have subscribed to our email communications, you may opt out at any time by using the
            unsubscribe link included in every email, or by contacting us directly at the email address
            below. We will process your request as soon as reasonably practicable.
          </p>
        </Section>

        <Section title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an
            updated &ldquo;Last updated&rdquo; date, and the updated version will be effective as soon as it is
            accessible. We encourage you to review this Privacy Policy periodically.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:{' '}
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
