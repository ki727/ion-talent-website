import Link from "next/link"
import { Globe2, ArrowUpRight } from "lucide-react"
import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"

export function GlobalPreviewHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 text-ion-navy backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-4">
        <Link href="/global" className="inline-flex items-center gap-3" aria-label="ION Talent global preview home">
          <img src="/brand/logo-primary-web.svg" alt="ION Talent" className="h-8 w-auto" />
          <span className="hidden border-l border-slate-200 pl-3 text-xs font-semibold uppercase tracking-widest text-slate-500 sm:inline">Global concept</span>
        </Link>
        <nav aria-label="Global preview navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/global" className="hover:text-slate-600">Global home</Link>
          <Link href="/global#expertise" className="hover:text-slate-600">Expertise</Link>
          <details className="group relative">
            <summary className="cursor-pointer select-none hover:text-slate-600">Markets</summary>
            <div className="absolute right-0 top-8 z-50 min-w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
              {GLOBAL_MARKETS.map((region) => (
                <Link key={region.slug} href={`/global/${region.slug}`} className="block rounded px-3 py-2 hover:bg-slate-100">
                  {region.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  )
}

export function GlobalPreviewFooter() {
  return (
    <footer className="bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <Link href="/global" className="inline-flex items-center gap-2 text-lg font-semibold">
              <Globe2 className="h-5 w-5" aria-hidden="true" /> ION Talent Global
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              International recruitment and executive search positioning, in development.
            </p>
          </div>
          <nav aria-label="Market pages" className="flex max-w-xl flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            {GLOBAL_MARKETS.map((region) => (
              <Link className="hover:text-white" href={`/global/${region.slug}`} key={region.slug}>
                {region.label} <ArrowUpRight className="inline h-3 w-3" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-12 border-t border-white/10 pt-5 text-xs text-slate-500">
          Unlaunched working concept · Forms and regional service claims require approval before public release
        </div>
      </div>
    </footer>
  )
}
