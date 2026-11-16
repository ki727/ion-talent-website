import HomePage from "@/app/page"
import { getEnquiryHref } from "@/lib/enquiry-context"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { GLOBAL_REGIONS, getGlobalRegion } from "@/lib/global-regions"
import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"
import { EDITORIAL_MARKETS } from "@/lib/global-editorial"
import { REGIONAL_PHOTOGRAPHY } from "@/lib/regional-photography"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type PageProps = { params: { region: string } }
export function generateStaticParams() { return [...GLOBAL_MARKETS, ...GLOBAL_REGIONS].map(({ slug }) => ({ region: slug })) }
export function generateMetadata({ params }: PageProps): Metadata {
  const region = getGlobalRegion(params.region)
  return { title: `${region?.label || "Our markets"} Recruitment & Executive Search | ION Talent`, description: region?.introduction, robots: { index: false, follow: false }, alternates: { canonical: null } }
}
export default function GlobalMarketPage({ params }: PageProps) {
  const region = getGlobalRegion(params.region)
  if (!region) notFound()
  if (params.region === "middle-east") return <HomePage />
  const editorial = EDITORIAL_MARKETS[params.region]
  // Supporting Gulf pages retain a concise brief-led introduction without invented local evidence.
  if (!editorial) return <div><SiteHeader /><main className="bg-[#f5f6f7] px-6 pb-20 pt-36"><div className="mx-auto max-w-6xl"><Link href="/global/middle-east" className="text-sm text-ion-teal-dark">Middle East / {region.label}</Link><h1 className="my-6 font-display text-5xl font-bold text-ion-navy">Recruitment in {region.label}</h1><p className="max-w-2xl text-lg text-ion-gray">Discuss your hiring requirements, from an individual appointment to a growing team. We’ll start with your brief, the location and the capabilities you need.</p><Link href={getEnquiryHref(`/global/${params.region}`)} className="ion-primary-button mt-8 inline-flex rounded-xl px-6 py-4">Discuss a Search</Link></div></main><SiteFooter /></div>
  const photograph = REGIONAL_PHOTOGRAPHY[params.region]
  return <div className="min-h-screen bg-white text-ion-navy"><SiteHeader /><main>
    <section className={`ion-market-editorial ion-market-editorial--${params.region}`}>
      <div className="ion-market-intro">
        <div className="ion-market-copy"><Link href="/global#markets" className="mb-9 text-xs font-medium uppercase tracking-widest opacity-70">Our markets / {region.label}</Link><p className="ion-editorial-number mb-5">ION TALENT · {region.label.toUpperCase()}</p><h1 className="whitespace-pre-line font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">{editorial.title}</h1><p className="ion-market-lede mt-7 max-w-xl text-base leading-relaxed lg:text-lg">{editorial.intro}</p><div className="mt-8 flex flex-wrap gap-5"><Link href={getEnquiryHref(`/global/${params.region}`)} className="ion-primary-button inline-flex min-h-12 items-center gap-3 rounded-xl px-6 text-sm font-semibold">Discuss a Search <ArrowRight className="h-4 w-4" /></Link><Link href="/global/opportunities" className="inline-flex min-h-12 items-center gap-2 text-sm font-semibold underline underline-offset-4">Explore Opportunities <ArrowUpRight className="h-4 w-4" /></Link></div></div>
        <figure className="ion-market-photo">
          <Image src={photograph.src} alt={photograph.alt} fill priority sizes={params.region === "us" ? "100vw" : "(min-width: 768px) 50vw, 100vw"} style={{ objectPosition: photograph.position }} />
          <figcaption>{photograph.caption}</figcaption>
        </figure>
      </div>
      <div className="ion-gradient-rule" />
    </section>
    <section className="px-6 py-16 md:py-24"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20"><div><p className="ion-editorial-number mb-5">01 / THE HIRING CONVERSATION</p><h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">{editorial.question}</h2></div><div><p className="max-w-2xl text-lg leading-relaxed text-ion-gray">{editorial.perspective}</p><div className="mt-8 border-t border-ion-border">{editorial.considerations.map((item,i)=><div key={item} className="flex gap-5 border-b border-ion-border py-5"><span className="ion-editorial-number pt-1">0{i+1}</span><p className="font-medium leading-relaxed">{item}</p></div>)}</div></div></div></section>
    <section className="bg-[#f3f5f7] px-6 py-16 md:py-20"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-20"><div><p className="ion-editorial-number mb-5">02 / SECTORS & APPOINTMENTS</p><h2 className="font-display text-3xl font-bold leading-tight md:text-4xl">Broad sector knowledge.<br />A focused search.</h2><p className="mt-5 max-w-md leading-relaxed text-ion-gray">We recruit across sectors and levels. The assignment shapes the approach—not a fixed list of job titles.</p><p className="mt-7 max-w-md text-sm leading-relaxed text-ion-gray">Contingent recruitment · Retained search · RPO / Embedded</p></div><div className="ion-sector-list">{["Technology & Cybersecurity", "Finance", "Engineering & Construction", "Consulting & Leadership"].map(x=><Link key={x} href={getEnquiryHref(`/global/${params.region}`, x)} className="text-lg font-semibold" aria-label={`Discuss a ${x} hire in ${region.label}`}>Discuss {x.toLowerCase()} hiring<ArrowUpRight className="h-5 w-5 text-ion-teal" aria-hidden="true" /></Link>)}</div></div></section>
    <section className="px-6 py-16 md:py-24"><div className="mx-auto max-w-6xl"><p className="ion-editorial-number mb-5">03 / YOUR NEXT APPOINTMENT</p><div className="grid gap-8 md:grid-cols-2 md:gap-20"><h2 className="font-display text-3xl font-bold md:text-4xl">{editorial.focus}</h2><div><p className="text-lg leading-relaxed text-ion-gray">{editorial.detail}</p><Link href={getEnquiryHref(`/global/${params.region}`)} className="ion-primary-button mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl px-7 text-sm font-semibold">Tell us about the role <ArrowRight className="h-4 w-4" /></Link><p className="mt-4 text-xs text-ion-gray">A conversation to understand the brief. No obligation.</p></div></div></div></section>
    <section className="border-t border-ion-border bg-[#f7f8fa] px-6 py-9"><nav aria-label="Explore other markets" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-4"><span className="text-xs uppercase tracking-widest text-ion-gray">Explore our markets</span>{GLOBAL_MARKETS.map(m=><Link key={m.slug} aria-current={m.slug===params.region ? "page" : undefined} href={`/global/${m.slug}`} className={`text-sm font-semibold hover:text-ion-teal ${m.slug===params.region ? "text-ion-teal-dark underline underline-offset-4" : ""}`}>{m.label}</Link>)}</nav></section>
  </main><SiteFooter /></div>
}
