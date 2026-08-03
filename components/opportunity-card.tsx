"use client"

import { MapPin, Briefcase, DollarSign, Building2 } from "lucide-react"
import type { Opportunity } from "@/lib/opportunities"

interface OpportunityCardProps {
  opportunity: Opportunity
  isSelected: boolean
  onSelect: (opportunity: Opportunity) => void
}

const STATUS_STYLES: Record<Opportunity["status"], string> = {
  "Talent Network": "bg-slate-100 text-slate-600 border border-slate-200",
  "Live Opportunity": "bg-teal-50 text-teal-700 border border-teal-200",
  Paused: "bg-amber-50 text-amber-700 border border-amber-200",
}

export function OpportunityCard({ opportunity, isSelected, onSelect }: OpportunityCardProps) {
  return (
    <article
      className={`flex flex-col rounded-2xl border bg-white p-5 transition-all duration-200 cursor-pointer hover:shadow-md focus-within:ring-2 focus-within:ring-[#14A8A8] focus-within:ring-offset-2 ${
        isSelected
          ? "border-[#14A8A8] shadow-md ring-1 ring-[#14A8A8]"
          : "border-gray-200 hover:border-gray-300"
      }`}
      aria-current={isSelected ? "true" : undefined}
    >
      {/* Status + title */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[opportunity.status]}`}
        >
          {opportunity.status}
        </span>
      </div>
      <h3 className="text-base font-semibold text-gray-900 leading-snug text-pretty mb-1">
        {opportunity.title}
      </h3>
      <p className="text-xs text-[#14A8A8] font-medium mb-3">{opportunity.sector}</p>

      {/* Key facts */}
      <dl className="flex flex-col gap-1.5 text-sm text-gray-600 flex-1">
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 shrink-0 text-[#14A8A8]" aria-hidden="true" />
          <dt className="sr-only">Indicative market range</dt>
          <dd className="text-xs font-medium text-gray-700">{opportunity.salaryRange}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          <dt className="sr-only">Location</dt>
          <dd className="text-xs text-gray-500">{opportunity.locationLabel}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          <dt className="sr-only">Workplace type</dt>
          <dd className="text-xs text-gray-500">{opportunity.workplaceType}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          <dt className="sr-only">Employment type</dt>
          <dd className="text-xs text-gray-500">{opportunity.employmentLabel}</dd>
        </div>
      </dl>

      {/* Summary */}
      <p className="mt-3 text-xs leading-relaxed text-gray-500 line-clamp-2">
        {opportunity.description}
      </p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onSelect(opportunity)}
          className={`flex-1 h-9 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2 ${
            isSelected
              ? "bg-[#14A8A8] text-white"
              : "border border-[#14A8A8] text-[#14A8A8] hover:bg-teal-50"
          }`}
          aria-label={`View details for ${opportunity.title}`}
        >
          {isSelected ? "Viewing" : "View Details"}
        </button>
      </div>
    </article>
  )
}
