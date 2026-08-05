"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

interface StickyApplyCtaProps {
  /** Button label — pass the exact application-form label so the two stay in sync. */
  label: string
  /** id of the application form section to scroll to (e.g. "apply"). */
  targetId: string
  /** id placed on the existing top CTA — used to know when it's scrolled out of view. */
  topCtaId: string
}

/**
 * Compact CTA that appears once the candidate scrolls past the existing top
 * CTA, and disappears for good once the application form itself has been
 * seen — so it can never end up overlapping the form or the footer. Uses a
 * single IntersectionObserver watching both anchor elements (no observer
 * per scroll tick, no page-wide state). Desktop: small floating pill,
 * bottom-right, never covers page content. Mobile: compact full-width
 * bottom bar with safe-area padding for notched phones.
 */
export function StickyApplyCta({ label, targetId, topCtaId }: StickyApplyCtaProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const topCta = document.getElementById(topCtaId)
    const formTarget = document.getElementById(targetId)
    if (!topCta || !formTarget) return

    let topCtaPassed = false
    let formReached = false

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === topCta) {
            topCtaPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0
          }
          if (entry.target === formTarget && entry.isIntersecting) {
            // Sticky on purpose: once the form has been seen, don't bring
            // the floating CTA back even if the candidate scrolls back up.
            formReached = true
          }
        }
        setVisible(topCtaPassed && !formReached)
      },
      { threshold: 0 },
    )

    observer.observe(topCta)
    observer.observe(formTarget)
    return () => observer.disconnect()
  }, [targetId, topCtaId])

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" })
  }

  if (!visible) return null

  return (
    <div
      className="ion-sticky-cta-enter fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:pb-0"
      role="complementary"
      aria-label="Apply for this role"
    >
      <div className="border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:rounded-xl sm:border sm:p-2 sm:shadow-lg">
        <a
          href={`#${targetId}`}
          onClick={handleClick}
          className="ion-primary-button flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium sm:w-auto"
        >
          {label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
