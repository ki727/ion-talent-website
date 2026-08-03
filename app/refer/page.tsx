import type { Metadata } from "next"
import { Info } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReferralForm } from "@/components/referral-form"

export const metadata: Metadata = {
  title: "Refer a Hiring Company | ION Talent",
  description:
    "Know a company that is currently hiring? Make a genuine introduction to ION Talent. Referral rewards may apply when an introduction leads to a successful placement.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ReferPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        {/* Hero */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-16 md:py-20 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14A8A8]">
              ION Talent Referrals
            </p>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl text-balance">
              Refer a Hiring Company
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Know a company that is currently hiring? Make a genuine introduction to ION Talent. You
              may be eligible for a referral reward if your introduction results in a successful
              placement.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 text-left">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#14A8A8]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-gray-600">
                Submitting an introduction does not automatically guarantee eligibility for a reward.
                Referrals are subject to verification, eligibility requirements and ION Talent&apos;s
                referral terms.
              </p>
            </div>
          </div>
        </section>

        {/* Referral form */}
        <section className="px-6 py-16 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <ReferralForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
