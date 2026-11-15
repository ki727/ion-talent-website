"use client"

import { ArrowRight, ChevronDown } from "lucide-react"

const SERVICES = [
  { key: "contingent", name: "Contingent recruitment", summary: "Pay when the right person joins your business.", detail: "A flexible approach for individual appointments and multiple hires, with commercial and replacement terms agreed at the outset." },
  { key: "retained", name: "Retained search", summary: "A dedicated search for an important appointment.", detail: "Senior-led market mapping and direct outreach for leadership, specialist and hard-to-fill roles, with a clear search brief and agreed delivery terms." },
  { key: "rpo", name: "RPO / Embedded", summary: "Recruitment support that works alongside your team.", detail: "An embedded approach for a wider hiring programme, with the scope, team and delivery model shaped around your business." },
]

export function MobileServices({ onSelect }: { onSelect: (service: string) => void }) {
  return <div className="space-y-3 lg:hidden" aria-label="Recruitment services">
    {SERVICES.map(service => <details key={service.key} className="group overflow-hidden rounded-xl border border-white/20 bg-white text-ion-navy">
      <summary className="flex min-h-[92px] cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ion-teal">
        <span><span className="block text-lg font-semibold">{service.name}</span><span className="mt-1 block text-sm font-normal leading-relaxed text-ion-gray">{service.summary}</span></span>
        <ChevronDown className="h-5 w-5 shrink-0 text-ion-teal transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-ion-border px-5 pb-5 pt-4"><p className="text-sm leading-relaxed text-ion-gray">{service.detail}</p><button type="button" onClick={() => onSelect(service.key)} className="ion-primary-button mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold">Discuss this approach <ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>
    </details>)}
  </div>
}
