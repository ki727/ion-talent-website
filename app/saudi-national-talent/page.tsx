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
  "Strategic guidance for employers building Saudi national talent pipelines and a home for Saudi national candidates exploring specialist and leadership opportunities across the Kingdom."

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
    <div className="ion-saudi-page min-h-screen bg-white">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main className="ion-page-enter">
        {/* Hero: full-bleed editorial architecture image, same overlay
            treatment as the homepage hero video (flat scrim + directional
            gradient) so the two hero moments read as one system. */}
        <section className="ion-saudi-hero relative flex min-h-[56vh] items-center overflow-hidden px-6 pb-12 pt-24 sm:pt-[6.5rem] lg:pt-28 xl:min-h-[44vh] xl:pb-8 xl:pt-20">
          <div className="pointer-events-none absolute inset-0 z-0 bg-ion-navy" aria-hidden="true">
            <img
              src="/photography/saudi-kingdom-centre.jpg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[center_42%]"
              style={{ filter: "saturate(0.85) contrast(1.08) brightness(0.8)" }}
            />
            <div className="absolute inset-0 bg-ion-navy/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-ion-navy/90 via-ion-navy/60 to-ion-navy/20" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl">
            <p className="hero-text-shadow text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal-bright">
              Saudi Arabia
            </p>
            <h1 className="ion-density-feature-title font-display hero-text-shadow mt-4 text-4xl font-bold text-white leading-[1.1] md:text-5xl lg:text-6xl xl:text-[2.8rem] text-balance">
              Saudi National Talent
            </h1>
            <p className="hero-text-shadow mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl xl:text-lg">
              Strategic hiring, built for the long term. We help employers plan ahead and Saudi
              national candidates find roles that match their ambition.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row xl:mt-6">
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
            className="ion-gradient-rule ion-gradient-rule--fade pointer-events-none absolute bottom-0 left-0 right-0 z-10 w-full opacity-90"
            aria-hidden="true"
          />
        </section>

        {/* Positioning statement */}
        <section className="ion-density-section-tight ion-surface-tonal px-6 py-10 md:py-12 lg:px-12 xl:py-8">
          <div className="container mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-ion-gray sm:text-xl">
              Saudi national hiring is a long-term investment in capability, leadership and growth.
              Strong talent pipelines help organisations build institutional knowledge while creating
              meaningful opportunities for Saudi professionals across the Kingdom.
            </p>
          </div>
        </section>

        {/* For Employers */}
        <section className="ion-density-section-roomy px-6 py-14 md:py-[4.5rem] lg:px-12 xl:py-11">
          <div className="container mx-auto max-w-5xl">
            <FadeIn className="mx-auto mb-12 max-w-2xl text-center md:mb-16 xl:mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal">For Employers</p>
              <h2 className="ion-density-section-heading font-display mt-3 text-3xl font-bold text-ion-navy md:text-4xl xl:text-[1.8rem] text-balance">
                Saudi National Talent, Built for Long-Term Success.
              </h2>
              <span className="ion-heading-underline mx-auto mt-5" aria-hidden="true" />
              <p className="mt-5 text-lg leading-relaxed text-ion-gray xl:mt-4">
                Durable Saudi talent pipelines begin with early planning, informed market mapping and
                opportunities that support long-term professional growth. We help organisations connect
                workforce priorities with the Saudi professionals who can shape their future.
              </p>
            </FadeIn>

            <div className="ion-density-grid grid grid-cols-1 gap-6 sm:grid-cols-2 xl:gap-4">
              {EMPLOYER_POINTS.map((point, i) => (
                <FadeIn key={point.title} delay={(i % 2) * 100}>
                  <div className="ion-density-card ion-card-top-3 h-full rounded-[14px] p-6 shadow-sm xl:p-[1.125rem]">
                    <div className="ion-icon-circle-teal flex h-10 w-10 items-center justify-center rounded-full">
                      <point.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{point.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="mt-10 text-center xl:mt-8">
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
        <section className="ion-density-section-roomy ion-surface-tonal border-t border-gray-100 px-6 py-16 md:py-20 lg:px-12 xl:py-12">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="grid overflow-hidden rounded-[20px] border border-ion-navy/10 bg-white shadow-sm md:grid-cols-[0.85fr_1.15fr]">
              <div className="ion-saudi-candidate-image relative h-72 md:h-full md:min-h-[360px] xl:min-h-[320px]">
                <img
                  src="/photography/saudi-kafd-aerial.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ filter: "saturate(0.82) contrast(1.06) brightness(0.92)" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ion-navy/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-ion-navy/10" />
              </div>
              <div className="flex flex-col justify-center p-7 text-center sm:p-9 md:p-10 md:text-left xl:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-violet">
                  For Saudi National Candidates
                </p>
                <h2 className="ion-density-section-heading font-display mt-3 text-3xl font-bold text-ion-navy md:text-4xl xl:text-[1.8rem] text-balance">
                  Your Experience Belongs at the Centre of Saudi Arabia&apos;s Growth
                </h2>
                <span className="ion-heading-underline ion-heading-underline--violet mx-auto mt-5 md:mx-0 xl:mt-4" aria-hidden="true" />
                <p className="mt-5 text-lg leading-relaxed text-ion-gray xl:mt-4">
                  Saudi national talent is central to the organisations shaping the Kingdom&apos;s
                  fastest-moving sectors: technology, cybersecurity, cloud, data, engineering and
                  beyond. Whether you&apos;re building specialist expertise or stepping into leadership,
                  we want to help you find a role that matches your ambition.
                </p>

                <div className="mt-8 xl:mt-6">
                  <Link
                    href="/opportunities"
                    className="ion-candidate-button inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2"
                  >
                    Explore Current Opportunities
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Closing CTA band: same navy panel treatment as the homepage
            referral section, restating both journeys together. */}
        <section className="ion-density-section-roomy px-6 py-16 md:py-20 lg:px-12 xl:py-12">
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="ion-density-panel ion-section-navy relative overflow-hidden rounded-[24px] px-6 py-10 text-center shadow-lg md:px-14 md:py-14 xl:px-12 xl:py-10">
                <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-90" aria-hidden="true" />
                <h2 className="ion-density-section-heading font-display text-3xl font-bold text-white text-balance md:text-4xl xl:text-[1.8rem]">
                  Let&apos;s Talk About Saudi National Hiring
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed ion-text-on-navy md:text-lg">
                  For employers building a workforce plan, or Saudi national candidates ready for
                  their next role.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row xl:mt-6">
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
