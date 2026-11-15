"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { MapPin, Briefcase, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { opportunities, getRoleTypeLabel, type Opportunity } from "@/lib/opportunities"
import { FadeIn } from "@/components/fade-in"

const FEATURED_COUNT = 6

/** Balance genuine listed roles across functions; never weight technology above other sectors. */
function selectFeaturedRoles(roles: Opportunity[]): Opportunity[] {
  const groups = new Map<string, Opportunity[]>()
  for (const role of roles) {
    const group = groups.get(role.function) ?? []
    group.push(role)
    groups.set(role.function, group)
  }
  const result: Opportunity[] = []
  while (result.length < FEATURED_COUNT && [...groups.values()].some(group => group.length)) {
    for (const group of groups.values()) {
      const role = group.shift()
      if (role) result.push(role)
      if (result.length === FEATURED_COUNT) break
    }
  }
  return result
}

const LIVE_ROLES = opportunities.filter(role => role.status === "Live Opportunity")
const NETWORK_ROLES = opportunities.filter(role => role.status === "Talent Network")
const FEATURED_LIVE_ROLES = selectFeaturedRoles(LIVE_ROLES)
const FEATURED_NETWORK_ROLES = selectFeaturedRoles(NETWORK_ROLES)

export function FeaturedJobs({ preview = false }: { preview?: boolean }) {
  const basePath = preview ? "/global/opportunities" : "/opportunities"
  const hasLiveRoles = FEATURED_LIVE_ROLES.length > 0
  const featuredRoles = hasLiveRoles ? FEATURED_LIVE_ROLES : FEATURED_NETWORK_ROLES
  const railRef = useRef<HTMLDivElement>(null)
  const pauseUntilRef = useRef(0)
  const isHoveredRef = useRef(false)
  const hasFocusRef = useRef(false)
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

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const interval = window.setInterval(() => {
      if (reducedMotion.matches || isHoveredRef.current || hasFocusRef.current || Date.now() < pauseUntilRef.current) return

      const firstCard = rail.firstElementChild as HTMLElement | null
      if (!firstCard) return
      const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0
      const step = firstCard.offsetWidth + gap
      const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 4

      rail.scrollTo({
        left: atEnd ? 0 : Math.min(rail.scrollLeft + step, rail.scrollWidth - rail.clientWidth),
        behavior: "smooth",
      })
    }, 5500)

    return () => window.clearInterval(interval)
  }, [])

  const pauseAutoAdvance = (duration = 12000) => {
    pauseUntilRef.current = Date.now() + duration
  }

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current
    const firstCard = rail?.firstElementChild as HTMLElement | null
    if (!rail || !firstCard) return

    pauseAutoAdvance()

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    rail.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  if (preview && !hasLiveRoles) return <section className="ion-featured-jobs border-t border-ion-border bg-white px-6 py-9 md:py-10"><div className="container mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><p className="ion-card-eyebrow mb-2">FOR CANDIDATES</p><h2 className="font-display text-2xl font-bold text-ion-navy">Join our talent network</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ion-gray">Register your interest for future searches across our recruitment disciplines. Talent-network profiles are expressions of interest, not advertised client vacancies.</p></div><div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col"><Link href={`${basePath}#register`} className="ion-candidate-outline-button inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold">Register your interest <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href={basePath} className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-ion-teal-dark underline underline-offset-4">Explore the talent network</Link></div></div></section>

  return (
    <section className="ion-featured-jobs ion-density-section border-t border-ion-border bg-white px-6 pb-12 pt-12 md:pb-14 md:pt-14 xl:pb-11 xl:pt-11">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
          <h2 className="ion-density-section-heading font-display text-4xl lg:text-5xl xl:text-[2.65rem] font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              {hasLiveRoles ? "Live Opportunities" : "Talent Network Profiles"}
            </h2>
            <span className="ion-heading-underline mb-4" aria-hidden="true" />
            <p className="text-lg text-ion-gray">
              {hasLiveRoles ? "Explore currently listed recruitment assignments. Talent-network registrations are available separately." : "Register interest in future searches. These profiles are not advertised client vacancies."}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-end">
            <div className="flex items-center gap-2" aria-label="Browse featured opportunities">
              <button
                type="button"
                onClick={() => moveRail(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous featured opportunity"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ion-navy/20 bg-ion-surface-pale text-ion-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-ion-teal hover:bg-white hover:text-ion-teal hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => moveRail(1)}
                disabled={!canScrollRight}
                aria-label="Next featured opportunity"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ion-navy/20 bg-ion-surface-pale text-ion-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-ion-teal hover:bg-white hover:text-ion-teal hover:shadow-md disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <Link
              href={basePath}
              className="inline-flex shrink-0 items-center gap-2 rounded-sm text-sm font-medium text-ion-teal-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
            >
              {hasLiveRoles ? "View All Opportunities" : "Explore the Talent Network"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        <div className="relative">
          <div
            ref={railRef}
            onMouseEnter={() => {
              isHoveredRef.current = true
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false
            }}
            onFocusCapture={() => {
              hasFocusRef.current = true
            }}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                hasFocusRef.current = false
                pauseAutoAdvance(6000)
              }
            }}
            onPointerDown={() => pauseAutoAdvance()}
            onTouchStart={() => pauseAutoAdvance()}
            onWheel={() => pauseAutoAdvance()}
            className="ion-role-rail grid snap-x snap-mandatory grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto pb-3 sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]"
          >
          {featuredRoles.map((role, i) => (
            <FadeIn key={role.id} delay={(i % 3) * 100} className="h-full snap-start">
              <Link
                href={`${basePath}/${role.slug}`}
                aria-label={`${role.title} — view role details`}
                onClick={() => pauseAutoAdvance()}
              className="ion-density-card ion-card-hairline group relative flex h-full min-h-[11.5rem] flex-col overflow-hidden rounded-2xl p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 lg:min-h-[10.75rem]"
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
          {canScrollRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  )
}
