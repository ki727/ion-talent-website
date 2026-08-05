import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReferralDrawer } from "@/components/referral-drawer"
import { ReferralShare } from "@/components/referral-share"
import { CalendlyButton } from "@/components/calendly-button"
import { SITE_URL } from "@/lib/site-config"

const SOURCE = "referral_page"

const TITLE = "Refer a Hiring Company | ION Talent"
const DESCRIPTION =
  "Know a company that's hiring? Make a quick introduction or schedule a short call with ION Talent. If the introduction becomes a new client and results in a successful placement, you could earn up to US$5,000."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/refer`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/refer`,
    siteName: "ION Talent",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function ReferPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="pt-20">
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-12 md:py-16 lg:px-12">
          <div className="container mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal">
              ION Talent Referrals
            </p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl text-balance">
              Refer a Hiring Company
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              Know a company that&apos;s hiring? Make a quick introduction or schedule a short call with
              ION Talent. If the introduction becomes a new client and results in a successful placement,
              you could earn up to <span className="font-semibold text-ion-teal-dark">US$5,000</span>.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ReferralDrawer
                source={SOURCE}
                trigger={
                  <button
                    type="button"
                    className="ion-primary-button inline-flex h-12 w-full items-center justify-center rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
                  >
                    Submit an Introduction
                  </button>
                }
              />
              <CalendlyButton
                source={SOURCE}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-gray-300 px-8 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-ion-teal hover:text-ion-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 sm:w-auto"
              >
                Schedule a 10-Minute Call
              </CalendlyButton>
            </div>

            <Link
              href="/referral-terms"
              className="mt-4 inline-block text-xs text-gray-500 underline underline-offset-2 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal rounded-sm"
            >
              Terms apply
            </Link>

            <div className="mx-auto mt-10 max-w-md border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Know someone who may have an introduction?
              </h2>
              <p className="mt-1.5 text-sm text-gray-600">
                Share the referral opportunity with someone in your network.
              </p>
              <ReferralShare source={SOURCE} className="mt-5" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
