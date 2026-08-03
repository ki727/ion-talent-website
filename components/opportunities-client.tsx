"use client"

import { useMemo, useRef, useState } from "react"
import { track } from "@vercel/analytics"
import {
  SearchX,
  X,
  MapPin,
  Briefcase,
  Building2,
  TrendingUp,
  DollarSign,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import {
  opportunities,
  FUNCTIONS,
  LOCATIONS,
  EMPLOYMENT_TYPES,
  SENIORITIES,
  type Opportunity,
  type OpportunityFunction,
  type OpportunityLocation,
  type EmploymentType,
} from "@/lib/opportunities"
import { OpportunityCard } from "@/components/opportunity-card"
import { CandidateRegistrationForm } from "@/components/candidate-registration-form"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const ALL = "All"

const selectClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"

const STATUS_STYLES: Record<Opportunity["status"], string> = {
  "Talent Network": "bg-slate-100 text-slate-600 border border-slate-200",
  "Live Opportunity": "bg-teal-50 text-teal-700 border border-teal-200",
  Paused: "bg-amber-50 text-amber-700 border border-amber-200",
}

/** Detail panel shared between desktop (sticky sidebar) and mobile (Sheet) */
function RoleDetail({
  opportunity,
  onRegister,
}: {
  opportunity: Opportunity
  onRegister: (o: Opportunity) => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/60">
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 ${STATUS_STYLES[opportunity.status]}`}
        >
          {opportunity.status}
        </span>
        <h2 className="text-xl font-bold text-gray-900 text-pretty leading-snug">
          {opportunity.title}
        </h2>
        <p className="mt-1 text-sm text-[#14A8A8] font-medium">{opportunity.sector}</p>

        {/* Quick facts */}
        <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex items-start gap-2">
            <DollarSign className="h-4 w-4 mt-0.5 shrink-0 text-[#14A8A8]" aria-hidden="true" />
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">
                Indicative market range
              </dt>
              <dd className="text-sm font-semibold text-gray-900">{opportunity.salaryRange}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">Location</dt>
              <dd className="text-sm text-gray-700">{opportunity.locationLabel}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Building2 className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">Workplace</dt>
              <dd className="text-sm text-gray-700">{opportunity.workplaceType}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">Type</dt>
              <dd className="text-sm text-gray-700">{opportunity.employmentLabel}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <TrendingUp className="h-4 w-4 mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
            <div>
              <dt className="text-xs text-gray-400 uppercase tracking-wide leading-none mb-0.5">Seniority</dt>
              <dd className="text-sm text-gray-700">{opportunity.seniority}</dd>
            </div>
          </div>
        </dl>

        <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-start gap-2">
          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" aria-hidden="true" />
          Salary range is indicative market guidance only and does not represent a confirmed client budget or guaranteed offer.
        </p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Overview */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Overview</h3>
          <p className="text-sm leading-relaxed text-gray-600">{opportunity.overview}</p>
        </section>

        {/* Responsibilities */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Key Responsibilities
          </h3>
          <ul className="space-y-1.5">
            {opportunity.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-[#14A8A8]" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
            Candidate Requirements
          </h3>
          <ul className="space-y-1.5">
            {opportunity.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[#14A8A8]" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Package */}
        {opportunity.packageNotes && (
          <section>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Package and Benefits
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">{opportunity.packageNotes}</p>
          </section>
        )}
      </div>

      {/* CTA */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <button
          type="button"
          onClick={() => onRegister(opportunity)}
          className="w-full h-12 rounded-xl bg-[#14A8A8] text-white text-sm font-medium transition-colors hover:bg-[#0F8F8F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2"
        >
          Register Interest
        </button>
        <p className="mt-2 text-center text-xs text-gray-400">
          Your details are added to the ION Talent specialist network.
        </p>
      </div>
    </div>
  )
}

export function OpportunitiesClient() {
  const [functionFilter, setFunctionFilter] = useState<string>(ALL)
  const [locationFilter, setLocationFilter] = useState<string>(ALL)
  const [employmentFilter, setEmploymentFilter] = useState<string>(ALL)
  const [seniorityFilter, setSeniorityFilter] = useState<string>(ALL)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")
  const registerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(
    () =>
      opportunities.filter(
        (o) =>
          (functionFilter === ALL || o.function === (functionFilter as OpportunityFunction)) &&
          (locationFilter === ALL || o.locations.includes(locationFilter as OpportunityLocation)) &&
          (employmentFilter === ALL || o.employmentTypes.includes(employmentFilter as EmploymentType)) &&
          (seniorityFilter === ALL || o.seniority === seniorityFilter),
      ),
    [functionFilter, locationFilter, employmentFilter, seniorityFilter],
  )

  const activeFilterCount = [functionFilter, locationFilter, employmentFilter, seniorityFilter].filter(
    (v) => v !== ALL,
  ).length

  function clearFilters() {
    setFunctionFilter(ALL)
    setLocationFilter(ALL)
    setEmploymentFilter(ALL)
    setSeniorityFilter(ALL)
  }

  function handleSelect(opportunity: Opportunity) {
    track("opportunity_card_clicked", { role: opportunity.title })
    setSelectedOpportunity(opportunity)
    // On mobile open the sheet; on desktop the panel updates inline
    if (window.innerWidth < 1024) {
      setMobileSheetOpen(true)
    }
  }

  function handleRegister(opportunity: Opportunity) {
    track("register_interest_started", { role: opportunity.title })
    setSelectedRole(opportunity.title)
    setMobileSheetOpen(false)
    // Small delay to let sheet close before scrolling
    setTimeout(() => {
      registerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 150)
  }

  return (
    <>
      {/* ── Salary range disclaimer ── */}
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm text-amber-800 leading-relaxed">
          <span className="font-semibold">Indicative market range:</span> All salary figures shown are
          current market guidance for active and upcoming searches and do not represent confirmed client
          budgets or guaranteed offers.
        </p>
      </div>

      {/* ── Filters ── */}
      <section aria-label="Opportunity filters" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 flex-1">
            <div>
              <label htmlFor="filter-function" className="mb-1.5 block text-sm font-medium text-gray-900">
                Function
              </label>
              <select
                id="filter-function"
                value={functionFilter}
                onChange={(e) => setFunctionFilter(e.target.value)}
                className={selectClass}
              >
                <option value={ALL}>All functions</option>
                {FUNCTIONS.map((fn) => (
                  <option key={fn} value={fn}>
                    {fn}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-location" className="mb-1.5 block text-sm font-medium text-gray-900">
                Location
              </label>
              <select
                id="filter-location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={selectClass}
              >
                <option value={ALL}>All locations</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-employment" className="mb-1.5 block text-sm font-medium text-gray-900">
                Employment type
              </label>
              <select
                id="filter-employment"
                value={employmentFilter}
                onChange={(e) => setEmploymentFilter(e.target.value)}
                className={selectClass}
              >
                <option value={ALL}>All employment types</option>
                {EMPLOYMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="filter-seniority" className="mb-1.5 block text-sm font-medium text-gray-900">
                Seniority
              </label>
              <select
                id="filter-seniority"
                value={seniorityFilter}
                onChange={(e) => setSeniorityFilter(e.target.value)}
                className={selectClass}
              >
                <option value={ALL}>All seniority levels</option>
                {SENIORITIES.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 h-11 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] shrink-0"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear
              <span className="ml-0.5 rounded-full bg-[#14A8A8] text-white text-xs w-5 h-5 flex items-center justify-center font-semibold">
                {activeFilterCount}
              </span>
            </button>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} shown
          {activeFilterCount > 0 ? " · " : ""}
          {activeFilterCount > 0 && (
            <span className="text-[#14A8A8] font-medium">{activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active</span>
          )}
        </p>
      </section>

      {/* ── Desktop: split panel layout ── */}
      {/* ── Mobile: card grid + Sheet drawer ── */}
      <section aria-label="Opportunities" className="mb-20">
        {filtered.length > 0 ? (
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8 lg:items-start">
            {/* Card grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {filtered.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isSelected={selectedOpportunity?.id === opportunity.id}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {/* Desktop detail panel — sticky */}
            <div className="hidden lg:block">
              {selectedOpportunity ? (
                <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-md max-h-[calc(100vh-8rem)]">
                  <RoleDetail opportunity={selectedOpportunity} onRegister={handleRegister} />
                </div>
              ) : (
                <div className="sticky top-24 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                  <div className="mx-auto h-12 w-12 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                    <ChevronRight className="h-6 w-6 text-[#14A8A8]" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Select a role to view details</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Click any card to see the full role brief, requirements and salary guidance.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
            <SearchX className="mx-auto h-10 w-10 text-gray-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No opportunities match your filters</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Try broadening your filters, or register your interest below and we will contact you when
              a relevant requirement opens.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* ── Mobile Sheet drawer ── */}
      <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent
          side="bottom"
          className="lg:hidden h-[90vh] p-0 rounded-t-2xl overflow-hidden flex flex-col"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{selectedOpportunity?.title ?? "Role details"}</SheetTitle>
          </SheetHeader>
          {selectedOpportunity && (
            <RoleDetail opportunity={selectedOpportunity} onRegister={handleRegister} />
          )}
        </SheetContent>
      </Sheet>

      {/* ── Candidate registration ── */}
      <section
        id="register"
        ref={registerRef}
        aria-labelledby="register-heading"
        className="scroll-mt-28"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 id="register-heading" className="text-3xl font-bold text-gray-900 text-balance">
              Register Your Interest
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600 leading-relaxed">
              Share your details with ION Talent to be considered for relevant current and future
              opportunities.
            </p>
          </div>
          <CandidateRegistrationForm selectedRole={selectedRole} />
        </div>
      </section>
    </>
  )
}
