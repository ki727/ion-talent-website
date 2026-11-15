import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function PeopleSection() {
  return <section id="people" className="border-t border-ion-border bg-[#f6f4ef] px-6 py-16 md:py-20"><div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16">
    <div><p className="ion-editorial-number mb-5">PEOPLE FIRST. ALWAYS.</p><h2 className="font-display text-3xl font-bold leading-tight text-ion-navy md:text-4xl">Recruitment<br />is personal.</h2><p className="mt-6 text-lg leading-relaxed text-ion-gray">A successful search starts with a proper conversation. Your business, your expectations and the people who will make the difference.</p><Link href="/global#contact" className="mt-7 inline-flex min-h-11 items-center gap-3 font-semibold text-ion-teal-dark">Start that conversation <ArrowRight className="h-4 w-4" /></Link></div>
    <figure><div className="ion-portrait-strip">{[0,1,2].map(i=><div key={i} className="ion-portrait-window"><img src="/photography/global/portrait-study.webp" alt={`AI-generated fictional professional portrait ${i+1}; illustrative placeholder`} loading="lazy" style={{left:`-${i*100}%`}} /></div>)}</div><figcaption className="mt-4 text-xs leading-relaxed text-ion-gray">Design preview: AI-generated illustrative portraits, not ION employees. Real team photography will replace these before launch.</figcaption></figure>
  </div></section>
}
