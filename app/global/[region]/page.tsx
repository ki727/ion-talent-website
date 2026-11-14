import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Globe2, CheckCircle2 } from "lucide-react"
import { GLOBAL_REGIONS, getGlobalRegion } from "@/lib/global-regions"
import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type PageProps = { params: { region: string } }

export function generateStaticParams() {
  return [...GLOBAL_MARKETS, ...GLOBAL_REGIONS].map(({ slug }) => ({ region: slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const region = getGlobalRegion(params.region)
  if (!region) return { title: "Market not found", robots: { index: false } }
  return {
    title: `${region.label} | Specialist Search | ION Talent`,
    description: region.introduction,
    robots: { index: false, follow: false },
  }
}

/**
 * The global market pages intentionally reuse the live ION design language,
 * navigation and conversion paths. They are preview-only and are not
 * representations of physical offices in every market.
 */
export default function GlobalMarketPage({ params }: PageProps) {
  const region = getGlobalRegion(params.region)
  if (!region) notFound()

  return (
    <div className="min-h-screen bg-white text-ion-navy">
      <SiteHeader />
      <main className="ion-page-enter">
        <section className="relative overflow-hidden bg-ion-navy px-6 pb-20 pt-36 text-white md:pb-24 md:pt-44">
          <div className="ion-home-hero-atmosphere pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="ion-home-hero-atmosphere ion-home-hero-atmosphere--secondary pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl">
            <Link href="/global#markets" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition-colors hover:text-white">
              <Globe2 className="h-4 w-4" aria-hidden="true" /> ION Talent / Our Markets
            </Link>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-ion-teal-bright">{region.kicker}</p>
            <h1 className="ion-display max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {region.headline}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/85 md:text-xl">{region.introduction}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/global#contact" className="ion-primary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90">
                Discuss a Search <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/opportunities" className="ion-secondary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-7 py-3 font-semibold text-white">
                Explore Opportunities <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="ion-gradient-rule pointer-events-none absolute bottom-0 left-0 right-0 opacity-80" aria-hidden="true" />
        </section>

        <section className="ion-surface-tonal border-b border-ion-border px-6 py-16 md:py-20" aria-labelledby="market-approach">
          <div className="container mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ion-gray">Our perspective</p>
              <h2 id="market-approach" className="font-display text-3xl font-bold leading-tight text-ion-navy md:text-4xl">{region.emphasis}</h2>
            </div>
            <p className="self-center text-lg leading-relaxed text-ion-gray">{region.approach}</p>
          </div>
        </section>

        <section id="market-focus" className="px-6 py-16 md:py-20" aria-labelledby="specialisms-title">
          <div className="container mx-auto max-w-6xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ion-gray">Specialist recruitment & executive search</p>
            <h2 id="specialisms-title" className="mb-9 font-display text-3xl font-bold text-ion-navy md:text-4xl">Where we focus</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {region.priorities.map((priority) => (
                <article key={priority} className="ion-density-card ion-card-top-4 flex items-start gap-4 rounded-[14px] border border-ion-border bg-white p-6 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ion-teal" aria-hidden="true" />
                  <h3 className="text-lg font-semibold leading-snug text-ion-navy">{priority}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ion-surface-tonal border-t border-ion-border px-6 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold text-ion-navy">Local understanding. International reach.</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-ion-gray">{region.marketNote}</p>

            {"countryLinks" in region && region.countryLinks.length > 0 && (
              <div className="mt-10">
                <h3 className="mb-4 text-lg font-semibold">Explore this region</h3>
                <div className="flex flex-wrap gap-3">
                  {region.countryLinks.map((country) => (
                    <Link key={country.slug} href={`/global/${country.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-ion-border bg-white px-5 py-3 text-sm font-semibold text-ion-navy transition-colors hover:border-ion-teal">
                      {country.label} <ArrowRight className="h-4 w-4 text-ion-teal" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <h3 className="mb-4 mt-12 text-lg font-semibold">Our core markets</h3>
            <nav aria-label="Core markets" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {GLOBAL_MARKETS.filter((market) => market.tier === "core").map((market) => (
                <Link key={market.slug} href={`/global/${market.slug}`} aria-current={params.region === market.slug ? "page" : undefined} className="group flex min-h-16 items-center justify-between gap-3 rounded-xl border border-ion-border bg-white px-5 py-4 text-sm font-semibold text-ion-navy transition-colors hover:border-ion-teal">
                  {market.label} <ArrowRight className="h-4 w-4 shrink-0 text-ion-teal transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl border border-ion-border bg-white px-5 py-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-ion-teal">Strategic growth market</p>
                <p className="mt-1 font-semibold text-ion-navy">Asia-Pacific</p>
                <p className="mt-1 text-sm text-ion-gray">Selective specialist searches across Singapore, Australia and Southeast Asia.</p>
              </div>
              <Link href="/global/asia-pacific" aria-current={params.region === "asia-pacific" ? "page" : undefined} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-ion-navy hover:text-ion-teal">
                Explore Asia-Pacific <ArrowRight className="h-4 w-4 text-ion-teal" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="ion-section-navy px-6 py-16 text-white md:py-20">
          <div className="container mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold">Hiring specialist talent?</h2>
              <p className="mt-3 max-w-2xl text-lg text-white/75">Tell us what you need. Every enquiry starts with understanding the role, market and search requirements.</p>
            </div>
            <Link href="/global#contact" className="ion-primary-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl px-7 py-3 font-semibold text-white">
              Hire Talent <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
