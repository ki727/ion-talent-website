"use client"
import { CalendarDays, ArrowUpRight } from "lucide-react"
import { CALENDLY_URL } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

export function EmployerBookingLink() {
  return <div className="mt-7 max-w-md border-t border-ion-border pt-6"><p className="mb-2 text-sm text-ion-gray">Prefer to talk it through?</p><a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("calendly_click", { page: "employer_enquiry" })} className="inline-flex min-h-11 items-center gap-3 font-semibold text-ion-teal-dark underline underline-offset-4"><CalendarDays className="h-4 w-4" aria-hidden="true" />Book a 10-minute hiring call<ArrowUpRight className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><p className="mt-2 text-xs text-ion-gray">Choose a time on Calendly. No enquiry form needed.</p></div>
}
