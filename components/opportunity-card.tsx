import Link from "next/link"
import { MapPin, Briefcase, ArrowRight } from "lucide-react"
import { getRoleTypeLabel, type Opportunity, type OpportunityStatus } from "@/lib/opportunities"

interface OpportunityCardProps {
  opportunity: Opportunity
}

const STATUS_STYLES: Record<OpportunityStatus, string> = {
  "Talent Network": "bg-slate-100 text-slate-600 border border-slate-200",
  "Live Opportunity": "bg-teal-50 text-ion-teal-dark border border-ion-teal/30",
  Paused: "bg-amber-50 text-amber-700 border border-amber-200",
}

/** Compact, LinkedIn-style role preview. Links straight to the dedicated role page. */
export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <article className="ion-card-top-2 ion-card-enter flex flex-col rounded-2xl p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0">
      <span
        className={`mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[opportunity.status]}`}
      >
        {getRoleTypeLabel(opportunity)}
      </span>

      <h3 className="mb-1 text-base font-semibold leading-snug text-pretty text-gray-900">{opportunity.title}</h3>
      <p className="mb-2 text-xs font-medium text-ion-teal-dark">{opportunity.sector}</p>

      <dl className="mb-2 flex flex-col gap-1 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
          <dt className="sr-only">Location</dt>
          <dd className="text-xs text-gray-500">{opportunity.locationLabel}</dd>
        </div>
        {opportunity.employmentLabel && (
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
            <dt className="sr-only">Employment type</dt>
            <dd className="text-xs text-gray-500">{opportunity.employmentLabel}</dd>
          </div>
        )}
      </dl>

      <p className="line-clamp-3 text-xs leading-relaxed text-gray-500">{opportunity.description}</p>

      <Link
        href={`/opportunities/${opportunity.slug}`}
        aria-label={`View details for ${opportunity.title}`}
        className="mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-ion-teal text-sm font-medium text-ion-teal-dark transition-colors hover:bg-ion-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
      >
        View Role
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  )
}
