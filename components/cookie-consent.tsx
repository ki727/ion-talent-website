"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CONSENT_RESET_EVENT, needsConsentPrompt, saveConsent, setAnalyticsPolicy } from "@/lib/consent"

/**
 * Small analytics consent notice. Shown until the visitor accepts or declines;
 * the choice is stored per browser and can be changed from the privacy notice.
 * While open on small screens it holds back the salary-guide prompt so the two
 * never overlap (see the data-consent-open rule in globals.css).
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let active = true
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_RESET_EVENT, reopen)

    // No optional trackers start while the visitor's jurisdiction is unknown.
    // Country classification is performed on the server; never infer from the
    // browser timezone, language, or a user-provided request parameter.
    fetch("/api/analytics-policy", { cache: "no-store" })
      .then(async response => {
        if (!response.ok) throw new Error("Analytics policy unavailable")
        const data: { policy?: string } = await response.json()
        return data.policy === "notice-only" ? "notice-only" : "consent-required"
      })
      .catch(() => "consent-required" as const)
      .then(policy => {
        if (!active) return
        setAnalyticsPolicy(policy)
        setOpen(needsConsentPrompt())
      })

    return () => {
      active = false
      window.removeEventListener(CONSENT_RESET_EVENT, reopen)
    }
  }, [])

  useEffect(() => {
    if (open) document.documentElement.setAttribute("data-consent-open", "")
    else document.documentElement.removeAttribute("data-consent-open")
  }, [open])

  if (!open) return null

  const choose = (choice: "granted" | "denied") => {
    saveConsent(choice)
    setOpen(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[700px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white/95 px-3 py-3 text-sm text-slate-800 shadow-[0_8px_28px_rgba(15,23,42,0.18)] backdrop-blur-md sm:bottom-5 sm:px-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <p className="min-w-0 flex-1 text-[13px] leading-5 sm:text-sm">
          Optional analytics cookies help us improve this site.{" "}
          <Link href="/privacy#cookies" className="font-medium text-slate-900 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal">
            Privacy &amp; cookies
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex h-10 min-w-[92px] flex-1 items-center justify-center rounded-lg border border-slate-400 px-4 font-semibold transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 sm:flex-none"
            style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex h-10 min-w-[92px] flex-1 items-center justify-center rounded-lg border border-slate-900 px-4 font-semibold transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 sm:flex-none"
            style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

/** Lets visitors change their analytics choice from the privacy notice. */
export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => import("@/lib/consent").then(m => m.resetConsent())}
      className="mt-2 inline-flex h-10 items-center rounded-xl border border-gray-300 px-4 text-sm font-medium text-gray-700 transition-colors hover:border-ion-navy hover:text-ion-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal"
    >
      Change cookie preferences
    </button>
  )
}
