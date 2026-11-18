import { FileText } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

export function MiddleEastResource() {
  return <section id="middle-east-insights" className="bg-[#F8F7FF] px-6 py-12">
    <div className="container mx-auto max-w-6xl"><FadeIn>
      <div className="ion-card-hairline relative flex flex-col gap-6 overflow-hidden rounded-[20px] p-6 sm:flex-row sm:items-center md:p-8">
        <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl bg-ion-navy text-ion-teal"><FileText className="h-8 w-8" aria-hidden="true" /></div>
        <div className="flex-1"><p className="ion-card-eyebrow mb-2">Middle East insights</p><h2 className="font-display text-2xl font-bold text-ion-navy">Your next hiring resource</h2><p className="mt-2 max-w-2xl text-ion-gray">Practical insight for employers across the UAE and Saudi Arabia. A new resource is on its way.</p></div>
        <span className="rounded-full bg-ion-teal/10 px-5 py-3 text-sm font-semibold text-ion-teal-dark">Coming soon</span>
      </div>
    </FadeIn></div>
  </section>
}
