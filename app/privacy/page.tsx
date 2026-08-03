import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Candidate Privacy Notice | ION Talent",
  description:
    "How ION Talent collects, uses and protects personal data submitted by candidates through our website and talent network.",
  alternates: {
    canonical: "https://www.iontalentgroup.com/privacy",
  },
}

const Section = ({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="mb-10">
    <h2
      id={`${id}-heading`}
      className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100"
    >
      {title}
    </h2>
    <div className="prose-sm prose-gray max-w-none text-gray-600 leading-relaxed space-y-3">
      {children}
    </div>
  </section>
)

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        {/* Hero */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-14 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14A8A8]">
              ION Talent
            </p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl text-balance">
              Candidate Privacy Notice
            </h1>
            <p className="mt-3 text-sm text-gray-500">Last updated: August 2026</p>
          </div>
        </section>

        {/* Body */}
        <article className="px-6 py-14 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <Section id="who" title="Who we are">
              <p>
                ION Talent (&ldquo;ION Talent&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
                &ldquo;us&rdquo;) is a specialist executive and technology recruitment firm operating
                across the GCC and international markets. Our website is{" "}
                <a
                  href="https://www.iontalentgroup.com"
                  className="text-[#14A8A8] underline underline-offset-2 hover:text-[#0F8F8F]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.iontalentgroup.com
                </a>
                .
              </p>
              <p>
                This notice explains how we collect, use, store and protect personal data you provide
                to us when you register your interest in opportunities through our website.
              </p>
            </Section>

            <Section id="data" title="What data we collect">
              <p>When you register your interest or submit an application, we collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your full name, email address and mobile number</li>
                <li>Your LinkedIn profile URL</li>
                <li>Your current location and desired role</li>
                <li>Your notice period and expected salary range</li>
                <li>Your CV or resume file</li>
                <li>Any cover note or additional information you provide voluntarily</li>
                <li>Your consent preferences and submission timestamp</li>
              </ul>
              <p>
                We do not collect sensitive personal data (such as health information, ethnicity or
                religious beliefs) unless you choose to include it in your CV or cover note.
              </p>
            </Section>

            <Section id="use" title="How we use your data">
              <p>We use your personal data to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Add you to the ION Talent specialist talent network and match your profile to
                  relevant current and upcoming client requirements
                </li>
                <li>Contact you regarding suitable opportunities</li>
                <li>Respond to your enquiries</li>
                <li>
                  Send you relevant job and market updates, where you have opted in to receive them
                </li>
              </ul>
              <p>
                We will not submit your profile to a client or share your identity with a third party
                without first obtaining your specific consent for that individual introduction.
              </p>
            </Section>

            <Section id="lawful" title="Lawful basis for processing">
              <p>We process your personal data on the following legal bases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Consent</strong> — you have provided explicit consent when submitting your
                  registration, which you may withdraw at any time
                </li>
                <li>
                  <strong>Legitimate interests</strong> — to operate our talent network and provide
                  recruitment services
                </li>
              </ul>
            </Section>

            <Section id="retention" title="How long we keep your data">
              <p>
                We retain your registration data for up to 24 months from the date of submission, or
                until you request deletion. If we successfully place you in a role or close your file,
                we will retain records in accordance with applicable legal requirements.
              </p>
              <p>
                You may request deletion of your data at any time by emailing{" "}
                <a
                  href="mailto:privacy@iontalentgroup.com"
                  className="text-[#14A8A8] underline underline-offset-2 hover:text-[#0F8F8F]"
                >
                  privacy@iontalentgroup.com
                </a>
                .
              </p>
            </Section>

            <Section id="sharing" title="Who we share your data with">
              <p>
                We do not sell your personal data. We may share your data with trusted service
                providers who process it on our behalf (such as email infrastructure providers) under
                strict data processing agreements. We will only share your data with potential
                employers with your prior consent.
              </p>
            </Section>

            <Section id="security" title="How we protect your data">
              <p>
                Data submitted through our website forms is transmitted over encrypted HTTPS
                connections and delivered by email to authorised ION Talent personnel only. We use
                industry-standard security measures to protect your data against unauthorised access,
                disclosure or loss.
              </p>
            </Section>

            <Section id="rights" title="Your rights">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Object to processing based on legitimate interests</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@iontalentgroup.com"
                  className="text-[#14A8A8] underline underline-offset-2 hover:text-[#0F8F8F]"
                >
                  privacy@iontalentgroup.com
                </a>
                .
              </p>
            </Section>

            <Section id="contact" title="Contact us">
              <p>
                If you have questions about this privacy notice or how we handle your personal data,
                please email us at{" "}
                <a
                  href="mailto:privacy@iontalentgroup.com"
                  className="text-[#14A8A8] underline underline-offset-2 hover:text-[#0F8F8F]"
                >
                  privacy@iontalentgroup.com
                </a>
                .
              </p>
            </Section>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/opportunities"
                className="text-sm text-[#14A8A8] hover:text-[#0F8F8F] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] rounded-sm"
              >
                &larr; Back to Opportunities
              </Link>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
