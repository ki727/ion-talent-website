import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Globe2, CheckCircle2 } from "lucide-react"
import { GLOBAL_REGIONS, getGlobalRegion } from "@/lib/global-regions"
import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"
import { GlobalPreviewHeader, GlobalPreviewFooter } from "@/components/global-preview-shell"

type PageProps = { params: { region: string } }

export function generateStaticParams() {
  return [...GLOBAL_MARKETS, ...GLOBAL_REGIONS].map(({ slug }) => ({ region: slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const region = getGlobalRegion(params.region)
  if (!region) return { title: "Market not found", robots: { index: false } }
  return {
    title: `${region.label} | ION Talent Global Preview`,
    description: region.introduction,
    robots: { index: false, follow: false },
  }
}

export default function RegionalConceptPage({ params }: PageProps) {
  const region = getGlobalRegion(params.region)
  if (!region) notFound()

  return (
    <>
    <GlobalPreviewHeader />
    <main className="min-h-screen bg-white text-ion-navy">
      <section className="bg-ion-navy px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <Link href="/global" className="mb-10 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Globe2 className="h-4 w-4" aria-hidden="true" /> ION Talent Global / {region.kicker}
          </Link>
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-white/60">{region.kicker} · Regional draft</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">{region.headline}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">{region.introduction}</p>
          <a href="#market-focus" className="mt-9 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-ion-navy hover:bg-slate-100">
            Explore our focus <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24" aria-labelledby="why-market-title">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Our perspective</p>
            <h2 id="why-market-title" className="text-3xl font-bold leading-tight md:text-4xl">{region.emphasis}</h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-600">{region.approach}</p>
        </div>
      </section>

      <section id="market-focus" className="bg-slate-50 px-6 py-20 md:py-24" aria-labelledby="market-focus-title">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">Market specialisms</p>
          <h2 id="market-focus-title" className="mb-10 text-3xl font-bold md:text-4xl">Areas of focus</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {region.priorities.map((priority) => (
              <article key={priority} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-6">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{priority}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-5 text-2xl font-bold">A regional approach. One ION Talent.</h2>
          <p className="max-w-3xl leading-relaxed text-slate-600">{region.marketNote}</p>
          {"countryLinks" in region && region.countryLinks.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 text-lg font-semibold">Explore this region</h3>
              <div className="flex flex-wrap gap-3">
                {region.countryLinks.map((country) => (
                  <Link key={country.slug} href={`/global/${country.slug}`} className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50">
                    {country.label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/global" className="inline-flex items-center gap-2 rounded-md bg-ion-navy px-6 py-3 font-semibold text-white hover:opacity-90">
              View global concept <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/global#markets" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-50">
              All markets
            </Link>
          </div>
        </div>
      </section>
    </main>
    <GlobalPreviewFooter />
    </>
  )
}
