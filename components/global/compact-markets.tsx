import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"

export function CompactMarkets() {
  return <section id="markets" aria-labelledby="global-markets-title" className="scroll-mt-24 border-y border-ion-border bg-white px-6 py-6 md:py-7">
    <div className="container mx-auto max-w-6xl md:flex md:items-center md:gap-8"><h2 id="global-markets-title" className="mb-4 shrink-0 text-xs font-bold uppercase tracking-widest text-ion-gray md:mb-0">Explore our markets</h2><nav aria-label="Recruitment markets" className="grid grid-cols-2 gap-x-5 gap-y-1 sm:flex sm:flex-1 sm:flex-wrap sm:justify-between">{GLOBAL_MARKETS.map(market => <Link key={market.slug} href={`/global/${market.slug}`} className="inline-flex min-h-11 items-center justify-between gap-3 rounded-sm text-sm font-semibold text-ion-navy hover:text-ion-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal">{market.label}<ArrowUpRight className="h-4 w-4 text-ion-teal" aria-hidden="true" /></Link>)}</nav></div>
  </section>
}
