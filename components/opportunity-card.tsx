"use client"

import { Briefcase, MapPin, Layers, TrendingUp } from "lucide-react"
import type { Opportunity } from "@/lib/opportunities"

interface OpportunityCardProps {
  opportunity: Opportunity
  onRegister: (opportunity: Opportunity) => void
}

const STATUS_STYLES: Record<Opportunity["status"], string> = {
  "Talent Network": "bg-slate-100 text-slate-700 border border-slate-200",
  "Live Opportunity": "bg-teal-50 text-teal-800 border border-teal-200",
  Paused: "bg-amber-50 text-amber-800 border border-amber-200",
}

export function OpportunityCard({ opportunity, onRegister }: OpportunityCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900 text-pretty">{opportunity.title}</h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[opportunity.status]}`}
        >
          {opportunity.status}
        </span>
      </div>

      <dl className="mt-4 flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 shrink-0 text-[#14A8A8]" aria-hidden="true" />
          <dt className="sr-only">Function</dt>
          <dd>{opportunity.function}</dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-[#14A8A8]" aria-hidden="true" />
          <dt className="sr-only">Location</dt>
          <dd>{opportunity.locationLabel}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 shrink-0 text-[#14A8A8]" aria-hidden="true" />
          <dt className="sr-only">Employment type</dt>
          <dd>{opportunity.employmentLabel}</dd>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 shrink-0 text-[#14A8A8]" aria-hidden="true" />
          <dt className="sr-only">Seniority</dt>
          <dd>{opportunity.seniority}</dd>
        </div>
      </dl>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{opportunity.description}</p>

      <button
        type="button"
        onClick={() => onRegister(opportunity)}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#14A8A8] px-6 text-sm font-medium text-white transition-colors hover:bg-[#0F8F8F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2"
      >
        Register Interest
      </button>
    </article>
  )
}
