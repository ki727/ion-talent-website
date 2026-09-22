"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { MapPin, Briefcase, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
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
  const railRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const updateControls = () => {
      setCanScrollLeft(rail.scrollLeft > 4)
      setCanScrollRight(rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 4)
    }

    updateControls()
    rail.addEventListener("scroll", updateControls, { passive: true })
    const resizeObserver = new ResizeObserver(updateControls)
    resizeObserver.observe(rail)

    return () => {
      rail.removeEventListener("scroll", updateControls)
      resizeObserver.disconnect()
    }
  }, [])

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current
    const firstCard = rail?.firstElementChild as HTMLElement | null
    if (!rail || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    rail.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <section className="border-t border-ion-border bg-white px-6 py-14 md:py-16">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Featured Opportunities
            </h2>
            <span className="ion-heading-underline mb-4" aria-hidden="true" />
            <p className="text-lg text-ion-gray">
              A sample of current and upcoming opportunities across the ION Talent Network.
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <div className="flex items-center gap-2" aria-label="Browse featured opportunities">
              <button
                type="button"
                onClick={() => moveRail(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous featured opportunity"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ion-navy/15 text-ion-navy transition-colors hover:border-ion-teal hover:text-ion-teal disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => moveRail(1)}
                disabled={!canScrollRight}
                aria-label="Next featured opportunity"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ion-navy/15 text-ion-navy transition-colors hover:border-ion-teal hover:text-ion-teal disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <Link
              href="/opportunities"
              className="inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-medium text-ion-teal-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
            >
              View All Opportunities
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        <div
          ref={railRef}
          className="ion-role-rail grid snap-x snap-mandatory grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto pb-3 sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]"
        >
          {FEATURED_ROLES.map((role, i) => (
            <FadeIn key={role.id} delay={(i % 3) * 100} className="h-full snap-start">
              <Link
                href={`/opportunities/${role.slug}`}
                aria-label={`${role.title} — view role details`}
                className="ion-card-hairline group relative flex h-full min-h-[13rem] flex-col overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
              >
                <span className="ion-badge-teal mb-3 inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  {getRoleTypeLabel(role)}
                </span>
                <h3 className="text-base font-bold text-ion-navy leading-snug mb-1.5">{role.title}</h3>
                <p className="ion-card-eyebrow mb-3">{role.sector}</p>
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
