"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CONSENT_RESET_EVENT, readConsent, saveConsent } from "@/lib/consent"

/**
 * Small analytics consent notice. Shown until the visitor accepts or declines;
 * the choice is stored per browser and can be changed from the privacy notice.
 * While open on small screens it holds back the salary-guide prompt so the two
 * never overlap (see the data-consent-open rule in globals.css).
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(readConsent() === null)
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_RESET_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_RESET_EVENT, reopen)
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
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-gray-200 bg-white/95 p-4 text-sm text-gray-700 shadow-[0_18px_48px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[360px]"
    >
      <p className="leading-relaxed">
        We use analytics cookies to understand how our website is used. They are only set if you accept.{" "}
        <Link href="/privacy#cookies" className="font-medium text-ion-navy underline underline-offset-2">
          Privacy notice
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-gray-300 px-4 font-medium text-gray-700 transition-colors hover:border-ion-navy hover:text-ion-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-ion-navy px-4 font-medium text-white transition-colors hover:bg-ion-navy/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
        >
          Accept
        </button>
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
