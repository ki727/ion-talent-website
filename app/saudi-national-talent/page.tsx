import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Target, Clock, Search, Compass } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FadeIn } from "@/components/fade-in"
import { CalendlyButton } from "@/components/calendly-button"
import { SITE_URL } from "@/lib/site-config"

const SOURCE = "saudi_national_talent"

const TITLE = "Saudi National Talent | ION Talent"
const DESCRIPTION =
  "Strategic guidance for employers building Saudi national talent pipelines, and a home for Saudi national candidates exploring specialist and leadership opportunities across the Kingdom."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/saudi-national-talent`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: `${SITE_URL}/saudi-national-talent`,
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
    { "@type": "ListItem", position: 2, name: "Saudi National Talent", item: `${SITE_URL}/saudi-national-talent` },
  ],
}

const EMPLOYER_POINTS = [
  {
    icon: Target,
    title: "Key Roles, Not Just Headcount",
    body: "Saudi national hiring works best when it targets the roles that matter most to long-term capability, not just volume.",
  },
  {
    icon: Clock,
    title: "Plan Early, Not Reactively",
    body: "The strongest Saudi national hires come from pipelines built months ahead, not searches started under pressure.",
  },
  {
    icon: Search,
    title: "Don't Let Strong Talent Get Overlooked",
    body: "Exceptional Saudi national candidates are often missed by generalist processes. Specialist search finds them.",
  },
  {
    icon: Compass,
    title: "Strategy, Structure and Market Insight",
    body: "We combine workforce planning, live market intelligence and structured search to support hiring decisions that hold up over time.",
  },
]

export default function SaudiNationalTalentPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main className="ion-page-enter">
        {/* Hero — full-bleed editorial architecture image, same overlay
            treatment as the homepage hero video (flat scrim + directional
            gradient) so the two hero moments read as one system. */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 pt-28 pb-16 sm:pt-32 lg:pt-36">
          <div className="absolute inset-0 z-0 bg-ion-navy">
            <img
              src="/photography/saudi-kafd-geometry.webp"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              style={{ filter: "saturate(0.85) contrast(1.08) brightness(0.8)" }}
            />
            <div className="absolute inset-0 bg-ion-navy/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-ion-navy/90 via-ion-navy/60 to-ion-navy/20" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl">
            <p className="hero-text-shadow text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal-bright">
              Saudi Arabia
            </p>
            <h1 className="font-display hero-text-shadow mt-4 text-4xl font-bold text-white leading-[1.1] md:text-5xl lg:text-6xl text-balance">
              Saudi National Talent
            </h1>
            <p className="hero-text-shadow mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Strategic hiring, built for the long term — helping employers plan ahead and Saudi
              national candidates find roles that match their ambition.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CalendlyButton
                source={SOURCE}
                className="ion-primary-button inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl px-8 text-base font-medium shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
              >
                Talk to Us About Workforce Planning
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </CalendlyButton>

              <Link
                href="/opportunities"
                className="ion-secondary-button inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl px-8 text-base font-medium shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:w-auto"
              >
                Explore Opportunities
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div
            className="ion-gradient-rule ion-gradient-rule--fade absolute bottom-0 left-0 right-0 z-10 w-full opacity-90"
            aria-hidden="true"
          />
        </section>

        {/* Positioning statement */}
        <section className="ion-surface-tonal px-6 py-14 md:py-16 lg:px-12">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-ion-gray sm:text-xl">
              Saudi national hiring is not a compliance requirement to manage — it is one of the most
              important workforce decisions an organisation in the Kingdom will make. Done well, it
              builds leadership pipelines, strengthens institutional knowledge, and shapes how a
              business performs for the next decade.
            </p>
          </div>
        </section>

        {/* For Employers */}
        <section className="px-6 py-16 md:py-24 lg:px-12">
          <div className="container mx-auto max-w-5xl">
            <FadeIn className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal">For Employers</p>
              <h2 className="font-display mt-3 text-3xl font-bold text-ion-navy md:text-4xl text-balance">
                Plan Saudi National Hiring Like It Matters — Because It Does
              </h2>
              <span className="ion-heading-underline mx-auto mt-5" aria-hidden="true" />
              <p className="mt-5 text-lg leading-relaxed text-ion-gray">
                The organisations that get the most from Saudi national hiring treat it as a strategic
                priority, not a reporting line — planning early, mapping the market properly, and
                building pipelines before the need becomes urgent.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {EMPLOYER_POINTS.map((point, i) => (
                <FadeIn key={point.title} delay={(i % 2) * 100}>
                  <div className="ion-card-top-3 h-full rounded-[14px] p-6 shadow-sm">
                    <div className="ion-icon-circle-teal flex h-10 w-10 items-center justify-center rounded-full">
                      <point.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{point.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="mt-10 text-center">
              <CalendlyButton
                source={SOURCE}
                className="ion-primary-button inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
              >
                Talk to Us About Workforce Planning
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CalendlyButton>
            </FadeIn>
          </div>
        </section>

        {/* For Saudi National Candidates */}
        <section className="ion-surface-tonal px-6 py-16 md:py-24 lg:px-12 border-t border-gray-100">
          <div className="container mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-violet">
                For Saudi National Candidates
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold text-ion-navy md:text-4xl text-balance">
                Your Experience Belongs at the Centre of Saudi Arabia&apos;s Growth
              </h2>
              <span className="ion-heading-underline ion-heading-underline--violet mx-auto mt-5" aria-hidden="true" />
              <p className="mt-5 text-lg leading-relaxed text-ion-gray">
                Saudi national talent is central to the organisations shaping the Kingdom&apos;s
                fastest-moving sectors — technology, cybersecurity, cloud, data, engineering and
                beyond. Whether you&apos;re building specialist expertise or stepping into leadership,
                we want to help you find a role that matches your ambition.
              </p>

              <div className="mt-8">
                <Link
                  href="/opportunities"
                  className="ion-candidate-button inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2"
                >
                  Explore Current Opportunities
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Closing CTA band — same navy panel treatment as the homepage
            referral section, restating both journeys together. */}
        <section className="px-6 py-16 md:py-20 lg:px-12">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="ion-section-navy relative overflow-hidden rounded-[24px] px-6 py-10 text-center shadow-lg md:px-14 md:py-14">
                <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-90" aria-hidden="true" />
                <h2 className="font-display text-3xl font-bold text-white text-balance md:text-4xl">
                  Let&apos;s Talk About Saudi National Hiring
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed ion-text-on-navy md:text-lg">
                  For employers building a workforce plan, or Saudi national candidates ready for
                  their next role.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <CalendlyButton
                    source={SOURCE}
                    className="ion-primary-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
                  >
                    Talk to Us About Workforce Planning
                  </CalendlyButton>
                  <Link
                    href="/opportunities"
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/70 px-8 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ion-navy sm:w-auto"
                  >
                    Explore Opportunities
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
