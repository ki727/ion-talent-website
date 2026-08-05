import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SITE_URL } from "@/lib/site-config"

const TITLE = "Referral Terms | ION Talent"
const DESCRIPTION = "Terms and eligibility requirements for the ION Talent client referral reward."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/referral-terms`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/referral-terms`,
    siteName: "ION Talent",
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
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
    <h2 id={`${id}-heading`} className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
      {title}
    </h2>
    <div className="prose-sm prose-gray max-w-none text-gray-600 leading-relaxed space-y-3">{children}</div>
  </section>
)

export default function ReferralTermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-14 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal">ION Talent</p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl text-balance">Referral Terms</h1>
            <p className="mt-3 text-sm text-gray-500">Last updated: August 2026</p>
          </div>
        </section>

        <article className="px-6 py-14 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <p className="mb-10 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-700">
              Submitting an introduction does not automatically guarantee eligibility for a reward.
              Referrals are subject to verification, eligibility requirements and ION Talent&apos;s
              referral terms.
            </p>

            <Section id="genuine" title="Genuine introductions only">
              <p>
                The referral programme is intended for genuine introductions to real hiring
                opportunities. You must have a lawful basis or permission to share the contact details
                you submit.
              </p>
            </Section>

            <Section id="new-clients" title="New ION Talent clients only">
              <p>
                A reward applies only where the referred company is a genuinely new ION Talent client.
                Companies that are already ION Talent clients, or that are already engaged in a hiring
                conversation with ION Talent at the time of referral, are not eligible.
              </p>
            </Section>

            <Section id="verification" title="Verification and eligibility">
              <p>
                Every introduction is reviewed and verified before it is accepted into the referral
                pipeline. ION Talent determines eligibility at its sole discretion, applying the criteria
                set out in these terms.
              </p>
            </Section>

            <Section id="pre-existing" title="Existing clients and pre-existing conversations">
              <p>
                Introductions to companies with an existing commercial relationship with ION Talent, or
                with whom ION Talent already has an active or recent hiring conversation, are not
                eligible for a reward.
              </p>
            </Section>

            <Section id="duplicates" title="Duplicate referrals">
              <p>
                Where the same company is referred by more than one person, the reward — if any becomes
                payable — is credited to the first eligible introduction received, as determined by ION
                Talent&apos;s records.
              </p>
            </Section>

            <Section id="placement" title="Successful placement requirement">
              <p>
                A reward only becomes payable once the referred company has become a new client and ION
                Talent has completed a successful placement for that client arising from the
                introduction.
              </p>
            </Section>

            <Section id="invoice" title="Client invoice payment requirement">
              <p>
                In addition to a successful placement, the client must have paid ION Talent&apos;s
                invoice for that placement in full before a reward is payable.
              </p>
            </Section>

            <Section id="rebate" title="Replacement or rebate period">
              <p>
                If a placement falls within ION Talent&apos;s applicable replacement or rebate period and
                a rebate is issued to the client, any associated referral reward may be reduced,
                withheld or reclaimed accordingly.
              </p>
            </Section>

            <Section id="timing" title="Reward payment timing">
              <p>
                Eligible rewards are paid within a reasonable period after all eligibility conditions
                above have been satisfied, including cleared receipt of the client&apos;s invoice
                payment.
              </p>
            </Section>

            <Section id="employer-policy" title="Employer-policy restrictions">
              <p>
                If your employer&apos;s policies restrict or prohibit you from receiving referral
                rewards or similar incentives, you are responsible for complying with those policies.
                ION Talent may decline to pay a reward where it becomes aware of such a restriction.
              </p>
            </Section>

            <Section id="law" title="Applicable-law restrictions">
              <p>
                Rewards are only payable where permitted under applicable law in the referrer&apos;s and
                ION Talent&apos;s relevant jurisdictions. ION Talent will not make a payment that would
                breach applicable law or regulation.
              </p>
            </Section>

            <Section id="tax" title="Tax responsibility">
              <p>
                You are solely responsible for any tax liability arising from a referral reward you
                receive. ION Talent does not provide tax advice.
              </p>
            </Section>

            <Section id="one-reward" title="One reward per referred company">
              <p>
                Unless otherwise agreed in writing, only one referral reward is payable per referred
                company, regardless of how many roles are ultimately filled for that client.
              </p>
            </Section>

            <Section id="rejection" title="ION Talent's right to reject an introduction">
              <p>
                ION Talent may reject, disqualify or decline to reward any introduction it reasonably
                considers fraudulent, invalid, ineligible or submitted without proper permission, at its
                sole discretion.
              </p>
            </Section>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <Link
                href="/refer"
                className="text-sm text-ion-teal hover:text-ion-teal-dark underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal rounded-sm"
              >
                &larr; Back to Refer a Hiring Company
              </Link>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
