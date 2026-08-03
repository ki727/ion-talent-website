"use client"

import { useMemo, useState } from "react"
import { track } from "@vercel/analytics"
import { SearchX } from "lucide-react"
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

const ALL = "All"

const selectClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"

export function OpportunitiesClient() {
  const [functionFilter, setFunctionFilter] = useState<string>(ALL)
  const [locationFilter, setLocationFilter] = useState<string>(ALL)
  const [employmentFilter, setEmploymentFilter] = useState<string>(ALL)
  const [seniorityFilter, setSeniorityFilter] = useState<string>(ALL)
  const [selectedRole, setSelectedRole] = useState("")

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

  function clearFilters() {
    setFunctionFilter(ALL)
    setLocationFilter(ALL)
    setEmploymentFilter(ALL)
    setSeniorityFilter(ALL)
  }

  function handleRegister(opportunity: Opportunity) {
    track("opportunity_card_clicked", { role: opportunity.title })
    track("register_interest_started", { role: opportunity.title })
    setSelectedRole(opportunity.title)
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Filters */}
      <section aria-label="Opportunity filters" className="mb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      {/* Opportunity cards */}
      <section aria-label="Opportunities" className="mb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} onRegister={handleRegister} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
            <SearchX className="mx-auto h-10 w-10 text-gray-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No opportunities match your filters</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Try broadening your filters, or register your interest below and we will contact you when a
              relevant requirement opens.
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

      {/* Candidate registration */}
      <section id="register" aria-labelledby="register-heading" className="scroll-mt-28">
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
