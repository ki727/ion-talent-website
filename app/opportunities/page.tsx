import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { OpportunitiesClient } from "@/components/opportunities-client"
import { SITE_URL } from "@/lib/site-config"

const TITLE = "Current and Upcoming GCC Opportunities | ION Talent"
const DESCRIPTION =
  "Register your interest in finance, cybersecurity, cloud, data, ERP, technology sales and leadership opportunities across the UAE, Saudi Arabia and wider GCC."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/opportunities`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/opportunities`,
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Opportunities", item: `${SITE_URL}/opportunities` },
  ],
}

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-ion-surface">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main className="ion-page-enter pt-20">
        {/* Hero — an editorial header surface (micro-label / title / lede)
            rather than a flat band, tied to the rest of the site with the
            same signature gradient rule. */}
        <section className="relative overflow-hidden border-b border-gray-100 bg-white px-6 py-10 md:py-14 lg:px-12">
          <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-60" aria-hidden="true" />
          <div className="container mx-auto max-w-4xl text-center">
            <p className="ion-card-eyebrow">ION Talent Opportunities</p>
            <h1 className="font-display mt-3 text-4xl font-bold text-gray-900 md:text-5xl text-balance">
              Current and Upcoming Opportunities
            </h1>
            <span className="ion-heading-underline ion-heading-underline--gradient mx-auto mt-4" aria-hidden="true" />
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
              Explore specialist opportunities across the GCC and international markets. Register your
              interest and we will contact you when your experience matches a relevant live requirement.
            </p>
          </div>
        </section>

        {/* Filters, cards and registration form */}
        <section className="px-6 pt-6 pb-10 md:pt-8 md:pb-14 lg:px-12">
          <div className="container mx-auto max-w-6xl">
            <Suspense fallback={null}>
              <OpportunitiesClient />
            </Suspense>
          </div>
        </section>

        {/* Secondary referral section - intentionally smaller than registration */}
        <section aria-labelledby="referral-cta-heading" className="px-6 pb-14 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm md:px-10">
              <h2 id="referral-cta-heading" className="text-xl font-semibold text-gray-900">
                Know a company that&apos;s hiring?
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-600">
                Make a genuine introduction to ION Talent. Referral rewards may apply when an
                introduction leads to a successful placement.
              </p>
              <Link
                href="/refer"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-ion-teal bg-white px-6 text-sm font-medium text-ion-teal-dark transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
              >
                Make an Introduction
              </Link>
              <p className="mt-3 text-xs text-gray-500">
                Optional.{" "}
                <Link href="/referral-terms" className="underline underline-offset-2 hover:text-gray-700">
                  Terms apply.
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
