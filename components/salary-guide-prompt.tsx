"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

const STORAGE_KEY = "ion-salary-guide-prompt-dismissed-this-session"
const SHOW_DELAY_MS = 10 * 1000
const SCROLL_THRESHOLD = 0.28

export function SalaryGuidePrompt() {
  const [isVisible, setIsVisible] = useState(false)
  const suppressedRef = useRef(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") return

    const checkEligibility = () => {
      if (suppressedRef.current) {
        setIsVisible(false)
        return
      }
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      if (scrollProgress >= SCROLL_THRESHOLD) setIsVisible(true)
    }

    const timer = window.setTimeout(() => {
      if (!suppressedRef.current && window.sessionStorage.getItem(STORAGE_KEY) !== "true") {
        setIsVisible(true)
      }
    }, SHOW_DELAY_MS)

    window.addEventListener("scroll", checkEligibility, { passive: true })
    window.addEventListener("resize", checkEligibility)
    checkEligibility()
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", checkEligibility)
      window.removeEventListener("resize", checkEligibility)
    }
  }, [])

  const suppress = () => {
    suppressedRef.current = true
    window.sessionStorage.setItem(STORAGE_KEY, "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <aside
      className="ion-salary-guide-prompt fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-ion-violet/20 bg-white/95 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[350px]"
      aria-label="Salary Guide"
    >
      <button
        type="button"
        onClick={suppress}
        aria-label="Close Salary Guide prompt"
        className="absolute right-2.5 top-2.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-ion-gray transition-colors hover:bg-ion-violet/10 hover:text-ion-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      <div className="flex items-start gap-3.5 pr-8">
        <img
          src="/resources/salary-guide-cover.webp"
          alt=""
          aria-hidden="true"
          width={800}
          height={1130}
          className="w-16 shrink-0 rounded-md shadow-sm ring-1 ring-ion-navy/10"
        />
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ion-violet-deep">
            2026 Salary &amp; Hiring Guide
          </p>
          <h2 className="font-display text-base font-bold leading-snug text-ion-navy">
            UAE &amp; Saudi Arabia Salary &amp; Hiring Guide
          </h2>
          <p className="mt-1.5 hidden text-xs leading-relaxed text-ion-gray min-[390px]:block">
            Benchmark salaries and hiring trends across key specialist and leadership roles.
          </p>
        </div>
      </div>

      <Link
        href="/salary-guide"
        onClick={suppress}
        className="ion-primary-button mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
      >
        Get the Guide
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </aside>
  )
}
