import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Search, Globe, Compass } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FadeIn } from "@/components/fade-in"
import { StatCounter } from "@/components/stat-counter"
import { SITE_URL } from "@/lib/site-config"

const TITLE = "About ION Talent | Specialist Search. International Reach."
const DESCRIPTION =
  "ION Talent is a specialist recruitment and executive search firm supporting organisations across the GCC and UK with hard-to-fill specialist, leadership and business-critical appointments."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/about`,
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
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
}

const CLIENT_LOGOS = [
  { src: "/logos/neom-logo.png", alt: "NEOM" },
  { src: "/logos/pwc-logo.png", alt: "PwC" },
  { src: "/logos/bechtel-logo.png", alt: "Bechtel" },
  { src: "/logos/siemens-logo.png", alt: "Siemens" },
  { src: "/logos/atos-logo.png", alt: "Atos" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main className="ion-page-enter pt-20">
        {/* Hero */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-14 md:py-20 lg:px-12">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal">ION Talent</p>
            <h1 className="mt-3 text-4xl font-bold text-ion-navy md:text-5xl text-balance">
              Specialist Search. International Reach.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              ION Talent is a specialist recruitment and executive search firm supporting organisations
              across the GCC and UK with hard-to-fill specialist, leadership and business-critical
              appointments.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/opportunities"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-ion-teal bg-white px-8 text-sm font-medium text-ion-teal-dark transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 sm:w-auto"
              >
                Explore Opportunities
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/#contact"
                className="ion-primary-button inline-flex h-12 w-full items-center justify-center rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
              >
                Hire Talent
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Who We Are / What We Recruit / Where We Work / Our Approach */}
        <section className="px-6 py-14 md:py-20 lg:px-12">
          <div className="container mx-auto max-w-4xl space-y-12">
            <FadeIn>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ion-navy">Who We Are</h2>
              <span className="ion-heading-underline mt-2 mb-4" aria-hidden="true" />
              <p className="text-base leading-relaxed text-gray-600">
                ION Talent partners with organisations on specialist, leadership and business-critical
                appointments that are difficult to fill through generalist recruitment. Every search is
                led by experienced recruitment professionals who stay directly involved from initial
                briefing through to placement.
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ion-navy">What We Recruit</h2>
              <span className="ion-heading-underline mt-2 mb-4" aria-hidden="true" />
              <p className="text-base leading-relaxed text-gray-600">
                Our specialisms span technology, cybersecurity, cloud, data and digital, alongside
                engineering and corporate functions such as finance, legal, HR and risk. We work across
                permanent, contract and executive search mandates, from senior specialist hires through
                to C-suite appointments.
              </p>
            </FadeIn>

            <FadeIn delay={160}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ion-navy">Where We Work</h2>
              <span className="ion-heading-underline mt-2 mb-4" aria-hidden="true" />
              <p className="text-base leading-relaxed text-gray-600">
                The GCC and UK are our core markets, with established candidate and client networks in
                each. Where a search calls for it, we extend that reach through international search
                capability to source hard-to-find talent beyond our core markets.
              </p>
            </FadeIn>

            <FadeIn delay={240}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ion-navy">Our Approach</h2>
              <span className="ion-heading-underline mt-2 mb-4" aria-hidden="true" />
              <p className="text-base leading-relaxed text-gray-600">
                We combine targeted market mapping and live market intelligence with direct outreach to
                the people most likely to deliver — rather than relying on inbound applications alone.
                The result is a shortlist built around fit and capability, not just availability.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Reused proof elements — logos and headline stats, not a duplicate of the homepage section */}
        <section className="border-t border-gray-100 bg-ion-surface px-6 py-14 md:py-16 lg:px-12">
          <div className="container mx-auto max-w-5xl">
            <p className="text-xs font-medium tracking-wider text-ion-gray uppercase text-center mb-8">
              Experience Across Leading Organisations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 md:gap-x-16 mb-10">
              {CLIENT_LOGOS.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 border-t border-ion-border pt-8 max-w-3xl mx-auto md:grid-cols-3 md:gap-8">
              <StatCounter end={10} suffix="+" label="Years of Recruitment Experience" startDelay={0} />
              <StatCounter end={500} suffix="+" label="Placements Delivered" startDelay={120} />
              <StatCounter end={3} label="Core Markets" sublabel="UAE · Saudi Arabia · UK" startDelay={240} />
            </div>
          </div>
        </section>

        {/* Positioning summary */}
        <section className="px-6 py-14 md:py-16 lg:px-12">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="ion-card-top-3 rounded-[14px] p-6 shadow-sm">
                <div className="ion-icon-circle-teal flex h-10 w-10 items-center justify-center rounded-full">
                  <Search className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">Specialist Focus</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  Technology, cybersecurity, cloud, data, digital, engineering and corporate functions.
                </p>
              </div>
              <div className="ion-card-top-3 rounded-[14px] p-6 shadow-sm">
                <div className="ion-icon-circle-teal flex h-10 w-10 items-center justify-center rounded-full">
                  <Compass className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">Core Markets</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  Established networks across the GCC and UK.
                </p>
              </div>
              <div className="ion-card-top-3 rounded-[14px] p-6 shadow-sm">
                <div className="ion-icon-circle-teal flex h-10 w-10 items-center justify-center rounded-full">
                  <Globe className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">International Reach</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                  International search capability for hard-to-find talent where required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
