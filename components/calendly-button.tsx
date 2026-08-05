"use client"

import type React from "react"
import { CALENDLY_URL } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

let calendlyLoadPromise: Promise<void> | null = null

/** Loads the official Calendly widget assets at most once per page, however many buttons are on the page. */
function loadCalendlyAssets(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()
  if (window.Calendly) return Promise.resolve()
  if (calendlyLoadPromise) return calendlyLoadPromise

  calendlyLoadPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-calendly-widget-css]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://assets.calendly.com/assets/external/widget.css"
      link.setAttribute("data-calendly-widget-css", "true")
      document.head.appendChild(link)
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-calendly-widget-js]')
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve())
      existingScript.addEventListener("error", () => reject(new Error("Calendly script failed to load")))
      return
    }

    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.setAttribute("data-calendly-widget-js", "true")
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Calendly script failed to load"))
    document.body.appendChild(script)
  })

  return calendlyLoadPromise
}

interface CalendlyButtonProps {
  className?: string
  children: React.ReactNode
  /** Safe, non-identifying label for analytics only — e.g. "homepage_referral", "referral_drawer". */
  source: string
}

/**
 * Official Calendly single-event click-triggered popup. Renders as a real
 * link to the verified event URL, so it always works as a normal new-tab
 * link — with or without JavaScript, and even if the Calendly assets fail to
 * load. The popup only ever opens in response to a real click.
 */
export function CalendlyButton({ className, children, source }: CalendlyButtonProps) {
  async function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    trackEvent("calendly_click", { page: source })

    // Let the popup try first; if anything goes wrong, don't prevent the
    // default navigation — the href already points at the real event, so a
    // failed popup just becomes a normal new-tab link instead.
    try {
      await loadCalendlyAssets()
      if (window.Calendly?.initPopupWidget) {
        e.preventDefault()
        window.Calendly.initPopupWidget({ url: CALENDLY_URL })
      }
    } catch {
      // Fall through — default link navigation (target="_blank") still fires.
    }
  }

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
