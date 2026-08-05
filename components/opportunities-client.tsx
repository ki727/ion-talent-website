"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, SearchX, X } from "lucide-react"
import {
  opportunities,
  FUNCTIONS,
  LOCATIONS,
  EMPLOYMENT_TYPES,
  SENIORITIES,
  type OpportunityFunction,
  type EmploymentType,
} from "@/lib/opportunities"
import { OpportunityCard } from "@/components/opportunity-card"
import { CandidateRegistrationForm } from "@/components/candidate-registration-form"

const ALL = "All"

/** Short, meaningful query param keys — only ever present when a filter is actually active. */
const PARAM = {
  search: "q",
  function: "fn",
  location: "loc",
  employment: "emp",
  seniority: "sen",
} as const

const selectClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"

export function OpportunitiesClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // The URL is the single source of truth for the dropdown filters, so a
  // refreshed or shared link — and browser back/forward — always show the
  // right state.
  const functionFilter = searchParams.get(PARAM.function) ?? ALL
  const locationFilter = searchParams.get(PARAM.location) ?? ALL
  const employmentFilter = searchParams.get(PARAM.employment) ?? ALL
  const seniorityFilter = searchParams.get(PARAM.seniority) ?? ALL
  const searchParam = searchParams.get(PARAM.search) ?? ""

  // Search text is also kept as local state so typing feels instant. It's
  // synced to the URL on a short debounce rather than every keystroke, so
  // the URL stays shareable/refresh-safe without flooding browser history.
  const [searchInput, setSearchInput] = useState(searchParam)

  useEffect(() => {
    setSearchInput((current) => (current === searchParam ? current : searchParam))
  }, [searchParam])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (searchInput.trim() !== searchParam) {
        updateParams({ [PARAM.search]: searchInput.trim() || null }, "replace")
      }
    }, 400)
    return () => window.clearTimeout(handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  const [selectedRole, setSelectedRole] = useState("")
  const registerRef = useRef<HTMLDivElement>(null)

  // Arriving from a role page's Register Interest / Apply button pre-fills and
  // jumps straight to the registration form, so the role detail page doesn't
  // need its own duplicate form.
  useEffect(() => {
    const roleSlug = new URLSearchParams(window.location.search).get("role")
    if (!roleSlug) return
    const match = opportunities.find((o) => o.slug === roleSlug)
    if (!match) return
    setSelectedRole(match.title)
    requestAnimationFrame(() => {
      registerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  function updateParams(updates: Record<string, string | null>, mode: "push" | "replace") {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === ALL) params.delete(key)
      else params.set(key, value)
    }
    const query = params.toString()
    router[mode](query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const filtered = useMemo(() => {
    const query = searchInput.trim().toLowerCase()
    return opportunities.filter((o) => {
      const matchesFilters =
        (functionFilter === ALL || o.function === (functionFilter as OpportunityFunction)) &&
        (locationFilter === ALL || o.locationLabel === locationFilter) &&
        (employmentFilter === ALL || o.employmentTypes.includes(employmentFilter as EmploymentType)) &&
        (seniorityFilter === ALL || o.seniority === seniorityFilter)
      if (!matchesFilters) return false
      if (!query) return true
      const haystack = `${o.title} ${o.sector} ${o.locationLabel} ${o.description}`.toLowerCase()
      return haystack.includes(query)
    })
  }, [functionFilter, locationFilter, employmentFilter, seniorityFilter, searchInput])

  const chips: { key: string; label: string; value: string }[] = [
    functionFilter !== ALL ? { key: PARAM.function as string, label: "Function", value: functionFilter } : null,
    locationFilter !== ALL ? { key: PARAM.location as string, label: "Location", value: locationFilter } : null,
    employmentFilter !== ALL
      ? { key: PARAM.employment as string, label: "Employment type", value: employmentFilter }
      : null,
    seniorityFilter !== ALL ? { key: PARAM.seniority as string, label: "Seniority", value: seniorityFilter } : null,
    searchInput.trim() ? { key: PARAM.search as string, label: "Search", value: searchInput.trim() } : null,
  ].filter((chip): chip is { key: string; label: string; value: string } => chip !== null)

  function removeChip(key: string) {
    if (key === PARAM.search) setSearchInput("")
    updateParams({ [key]: null }, "push")
  }

  function clearFilters() {
    setSearchInput("")
    router.push(pathname, { scroll: false })
  }

  return (
    <>
      {/* ── Filters ── */}
      <section aria-label="Opportunity filters" className="mb-6">
        <div className="mb-4">
          <label htmlFor="filter-search" className="mb-1.5 block text-sm font-medium text-gray-900">
            Search
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="filter-search"
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by role, specialism or location"
              className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 flex-1">
            <div>
              <label htmlFor="filter-function" className="mb-1.5 block text-sm font-medium text-gray-900">
                Function
              </label>
              <select
                id="filter-function"
                value={functionFilter}
                onChange={(e) => updateParams({ [PARAM.function]: e.target.value }, "push")}
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
                onChange={(e) => updateParams({ [PARAM.location]: e.target.value }, "push")}
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
                onChange={(e) => updateParams({ [PARAM.employment]: e.target.value }, "push")}
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
                onChange={(e) => updateParams({ [PARAM.seniority]: e.target.value }, "push")}
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
          {chips.length > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 h-11 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] shrink-0"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear all
              <span className="ml-0.5 rounded-full bg-[#14A8A8] text-white text-xs w-5 h-5 flex items-center justify-center font-semibold">
                {chips.length}
              </span>
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={() => removeChip(chip.key)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ion-teal/40 bg-ion-teal/10 py-1 pl-3 pr-2 text-xs font-medium text-ion-teal-dark transition-colors hover:bg-ion-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
                  aria-label={`Remove ${chip.label} filter: ${chip.value}`}
                >
                  <span className="text-ion-teal-dark/70">{chip.label}:</span>
                  {chip.value}
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-3 text-sm text-gray-500" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "opportunity" : "opportunities"} shown
        </p>
      </section>

      {/* ── Card grid ── */}
      <section aria-label="Opportunities" className="mb-14">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
            <SearchX className="mx-auto h-10 w-10 text-gray-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No opportunities match your filters</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Try broadening your search or filters, or register your interest below and we will contact
              you when a relevant requirement opens.
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
