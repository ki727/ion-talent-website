"use client"

import Link from "next/link"
import { MapPin, Briefcase, ArrowRight } from "lucide-react"
import { opportunities, getRoleTypeLabel, type Opportunity } from "@/lib/opportunities"
import { FadeIn } from "@/components/fade-in"

const FEATURED_COUNT = 6

/**
 * Multi-word priority phrases for ION's technology specialisms. Matched as
 * plain substrings — phrases are specific enough that false positives aren't
 * a practical risk.
 */
const TECH_PHRASES = [
  "enterprise architecture",
  "solutions architecture",
  "solutions architect",
  "artificial intelligence",
  "machine learning",
  "software engineering",
  "data engineering",
  "platform engineering",
  "digital technology",
  "digital transformation",
  "information security",
  "cloud security",
]

/**
 * Single-token priority keywords. Matched with a leading word boundary only
 * (no trailing \b) so inflections like "architecture"/"architects" or
 * "cybersecurity" still count, while avoiding false hits buried mid-word
 * (e.g. "ai" inside "available"). "infrastructure" is deliberately excluded:
 * on its own it also matches physical/civil infrastructure roles (e.g. an
 * "Engineering and Infrastructure" sector for construction project
 * management) — genuine cloud/infra roles already qualify via "cloud",
 * "architect" or "data".
 */
const TECH_WORD_PREFIXES = [
  "cybersecurity",
  "cyber",
  "cloud",
  "architect",
  "data",
  "analytics",
  "ai",
  "sap",
  "oracle",
  "digital",
  "devops",
]

const TECH_WORD_REGEX = new RegExp(`\\b(${TECH_WORD_PREFIXES.join("|")})`, "gi")

/** Counts distinct technology-specialism signals in a role's function, sector, title and description. */
function techScore(role: Opportunity): number {
  const text = [role.function, role.sector, role.title, role.description].join(" ").toLowerCase()
  let score = 0
  for (const phrase of TECH_PHRASES) {
    if (text.includes(phrase)) score += 1
  }
  const wordMatches = text.match(TECH_WORD_REGEX) ?? []
  score += new Set(wordMatches.map((w) => w.toLowerCase())).size
  return score
}

/**
 * Selects roles for the homepage rather than always showing whatever is
 * first in the data file. Technology-relevant roles (score > 0) are grouped
 * by function and drawn round-robin, one per specialism per pass, so the six
 * cards span cybersecurity, cloud, data/AI, enterprise technology and similar
 * areas instead of clustering in a single category. Falls back to filling
 * remaining slots from the rest of the list if fewer than six roles carry a
 * technology signal.
 */
function selectFeaturedRoles(): Opportunity[] {
  const scored = opportunities.map((role, index) => ({ role, index, score: techScore(role) }))
  const qualifying = scored.filter((entry) => entry.score > 0)

  const groups = new Map<string, typeof qualifying>()
  for (const entry of qualifying) {
    const list = groups.get(entry.role.function) ?? []
    list.push(entry)
    groups.set(entry.role.function, list)
  }
  for (const list of groups.values()) {
    list.sort((a, b) => b.score - a.score || a.index - b.index)
  }

  const functionOrder = [...groups.keys()]
  const featured: Opportunity[] = []
  let progressed = true
  while (featured.length < FEATURED_COUNT && progressed) {
    progressed = false
    for (const fn of functionOrder) {
      const list = groups.get(fn)!
      if (list.length) {
        featured.push(list.shift()!.role)
        progressed = true
        if (featured.length === FEATURED_COUNT) break
      }
    }
  }

  if (featured.length < FEATURED_COUNT) {
    const featuredIds = new Set(featured.map((role) => role.id))
    for (const role of opportunities) {
      if (featured.length === FEATURED_COUNT) break
      if (!featuredIds.has(role.id)) featured.push(role)
    }
  }

  return featured
}

const FEATURED_ROLES = selectFeaturedRoles()

export function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24 px-6 bg-white border-t border-ion-border">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Featured Roles
            </h2>
            <span className="ion-heading-underline mb-4" aria-hidden="true" />
            <p className="text-lg text-ion-gray">A sample of the opportunities we&apos;re currently recruiting for</p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-sm font-medium text-ion-teal-dark hover:underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 rounded-sm"
          >
            View All Opportunities
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_ROLES.map((role, i) => (
            <FadeIn key={role.id} delay={(i % 3) * 100}>
              <Link
                href={`/opportunities/${role.slug}`}
                aria-label={`${role.title} — view role details`}
                className="ion-card-top-3 group flex h-full flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
              >
                <span className="ion-badge-teal mb-3 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {getRoleTypeLabel(role)}
                </span>
                <h3 className="text-base font-semibold text-ion-navy leading-snug mb-1">{role.title}</h3>
                <p className="ion-text-deep-teal text-xs font-medium mb-4">{role.sector}</p>
                <dl className="flex flex-col gap-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
                    <dt className="sr-only">Location</dt>
                    <dd className="text-xs text-gray-500">{role.locationLabel}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden="true" />
                    <dt className="sr-only">Employment type</dt>
                    <dd className="text-xs text-gray-500">{role.employmentLabel}</dd>
                  </div>
                </dl>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
