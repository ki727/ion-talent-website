import Link from "next/link"
import { MapPin, Briefcase, ArrowRight } from "lucide-react"
import { getRoleTypeLabel, type Opportunity, type OpportunityStatus } from "@/lib/opportunities"
import { IonInteractiveSurface } from "@/components/ion-interactive-surface"

interface OpportunityCardProps {
  opportunity: Opportunity
}

const STATUS_STYLES: Record<OpportunityStatus, string> = {
  "Talent Network": "border border-[#b9abef] bg-[#f2efff] text-[#5645c4]",
  "Live Opportunity": "border border-[#67cfc4] bg-[#e5f8f5] text-[#006c85]",
  Paused: "border border-[#c7b7ee] bg-[#f5f1ff] text-[#6b4fc2]",
}

/** Compact, LinkedIn-style role preview. Links straight to the dedicated role page. */
export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <IonInteractiveSurface
      as="article"
      className="ion-opportunity-card ion-card-hairline relative flex flex-col overflow-hidden rounded-2xl p-4 shadow-sm xl:p-3"
    >
      <span
        className={`mb-2 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium xl:mb-1.5 ${STATUS_STYLES[opportunity.status]}`}
      >
        {getRoleTypeLabel(opportunity)}
      </span>

      <h3 className="mb-1 text-base font-bold leading-snug text-pretty text-gray-900 xl:text-[0.95rem]">{opportunity.title}</h3>
      <p className="ion-card-eyebrow mb-2">{opportunity.sector}</p>

      <dl className="mb-2 flex flex-col gap-1 text-sm text-gray-600 xl:mb-1.5">
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

      <p className="line-clamp-3 text-xs leading-relaxed text-gray-500 xl:line-clamp-2">{opportunity.description}</p>

      <Link
        href={`/opportunities/${opportunity.slug}`}
        aria-label={`View details for ${opportunity.title}`}
        className="ion-candidate-outline-button mt-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2 xl:mt-2.5"
      >
        View Role
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </IonInteractiveSurface>
  )
}
