import type { Metadata } from "next"
import Link from "next/link"
import { Info } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OpportunitiesClient } from "@/components/opportunities-client"

export const metadata: Metadata = {
  title: "Current and Upcoming GCC Opportunities | ION Talent",
  description:
    "Register your interest in finance, cybersecurity, cloud, data, ERP, technology sales and leadership opportunities across the UAE, Saudi Arabia, Qatar and wider GCC.",
  openGraph: {
    title: "Current and Upcoming GCC Opportunities | ION Talent",
    description:
      "Register your interest in finance, cybersecurity, cloud, data, ERP, technology sales and leadership opportunities across the UAE, Saudi Arabia, Qatar and wider GCC.",
    type: "website",
    url: "https://www.iontalentgroup.com/opportunities",
    siteName: "ION Talent",
  },
}

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        {/* Hero */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-16 md:py-20 lg:px-12">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#14A8A8]">
              ION Talent Opportunities
            </p>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl text-balance">
              Current and Upcoming Opportunities
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Explore specialist opportunities across the GCC and international markets. Register your
              interest and we will contact you when your experience matches a relevant live requirement.
            </p>

            <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 text-left">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#14A8A8]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-gray-600">
                ION Talent recruits for specialist roles across the GCC and international markets. Some
                opportunities displayed on this page represent active talent pipelines for current and
                upcoming client requirements rather than individually advertised live vacancies.
              </p>
            </div>
          </div>
        </section>

        {/* Filters, cards and registration form */}
        <section className="px-6 py-16 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <OpportunitiesClient />
          </div>
        </section>

        {/* Secondary referral section - intentionally smaller than registration */}
        <section aria-labelledby="referral-cta-heading" className="px-6 pb-20 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-8 text-center md:px-10">
              <h2 id="referral-cta-heading" className="text-xl font-semibold text-gray-900">
                Know a company that&apos;s hiring?
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-600">
                Make a genuine introduction to ION Talent. Referral rewards may apply when an
                introduction leads to a successful placement.
              </p>
              <Link
                href="/refer"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-[#14A8A8] bg-white px-6 text-sm font-medium text-[#14A8A8] transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2"
              >
                Make an Introduction
              </Link>
              <p className="mt-3 text-xs text-gray-500">Optional. Terms apply.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
