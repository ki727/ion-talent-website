import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Globe2, Search, ShieldCheck, Network } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Global Talent Solutions | ION Talent - Preview",
  description: "A working preview of ION Talent's international recruitment and executive search direction.",
  // This page is an unlaunched working draft. Review SEO settings before launch.
  robots: { index: false, follow: false },
}

const focusAreas = [
  {
    title: "Technology & Architecture",
    detail: "Enterprise architecture, cloud platforms, infrastructure and specialist technology leadership.",
  },
  {
    title: "Cybersecurity",
    detail: "Security leadership, risk, governance and high-impact specialist appointments.",
  },
  {
    title: "Data & AI",
    detail: "Data engineering, analytics, AI infrastructure and transformation talent.",
  },
  {
    title: "Executive Search",
    detail: "Senior appointments, market mapping and discreet, research-led search.",
  },
]

const regions = [
  { title: "GCC", detail: "UAE, Saudi Arabia and wider Gulf markets" },
  { title: "United Kingdom", detail: "Specialist and leadership search" },
  { title: "United States", detail: "Proposed growth-market positioning" },
  { title: "International", detail: "Cross-border specialist assignments" },
]

export default function GlobalPreviewPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-ion-navy">
        <section className="relative overflow-hidden bg-ion-navy px-6 pb-24 pt-36 text-white md:pb-32 md:pt-44">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute right-12 top-14 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <Globe2 className="h-4 w-4" aria-hidden="true" />
              Global concept · Private preview
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Specialist talent. International perspective.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              Executive search and specialist recruitment for companies building critical technology,
              security and transformation capabilities across borders.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/#contact" className="inline-flex items-center gap-3 rounded-md bg-white px-6 py-3 font-semibold text-ion-navy transition hover:bg-gray-100">
                Discuss a search <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#expertise" className="inline-flex items-center gap-3 rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Explore our expertise
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24" aria-labelledby="approach-title">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">The approach</p>
              <h2 id="approach-title" className="text-3xl font-bold leading-tight md:text-4xl">
                Research-led recruitment for complex hiring challenges.
              </h2>
            </div>
            <div className="grid gap-7 text-slate-600">
              <div className="flex gap-4"><Search className="mt-1 h-6 w-6 shrink-0 text-ion-navy" aria-hidden="true" /><p>Targeted market mapping and direct engagement with specialist talent, wherever the search requires.</p></div>
              <div className="flex gap-4"><ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-ion-navy" aria-hidden="true" /><p>Senior-led delivery with clear search priorities, practical market intelligence and consistent communication.</p></div>
              <div className="flex gap-4"><Network className="mt-1 h-6 w-6 shrink-0 text-ion-navy" aria-hidden="true" /><p>One international brand, with market-specific positioning and dedicated regional pages as the rollout develops.</p></div>
            </div>
          </div>
        </section>

        <section id="expertise" className="bg-slate-50 px-6 py-20 md:py-24" aria-labelledby="expertise-title">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Search specialisms</p>
            <h2 id="expertise-title" className="mb-10 text-3xl font-bold md:text-4xl">Where we focus</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <article key={area.title} className="rounded-xl border border-slate-200 bg-white p-7">
                  <h3 className="mb-3 text-xl font-semibold">{area.title}</h3>
                  <p className="leading-relaxed text-slate-600">{area.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24" aria-labelledby="regions-title">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Global architecture · Concept</p>
            <h2 id="regions-title" className="mb-4 text-3xl font-bold md:text-4xl">A global brand with regional relevance</h2>
            <p className="mb-10 max-w-2xl text-slate-600">The first draft of a scalable regional structure. Market copy and claims will be validated before any public release.</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {regions.map((region) => (
                <div key={region.title} className="rounded-xl border border-slate-200 p-6">
                  <Globe2 className="mb-5 h-6 w-6 text-ion-navy" aria-hidden="true" />
                  <h3 className="mb-2 text-lg font-semibold">{region.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{region.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-100 px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold md:text-4xl">Building teams that move businesses forward.</h2>
            <p className="mx-auto mt-5 max-w-xl text-slate-600">A preview of the proposed global direction. Navigation, region pages and conversion flows can be refined before launch.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
