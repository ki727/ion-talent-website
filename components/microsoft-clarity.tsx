"use client"

import { useEffect } from "react"
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent"
import { CLARITY_PROJECT_ID } from "@/lib/site-config"

const CLARITY_SCRIPT_ID = "microsoft-clarity-loader"

type ClarityCommand = ((...args: unknown[]) => void) & { q?: unknown[][] }
type ClarityWindow = Window & { clarity?: ClarityCommand }

function getClarityCommand(): ClarityCommand {
  const clarityWindow = window as ClarityWindow
  if (clarityWindow.clarity) return clarityWindow.clarity

  const clarity: ClarityCommand = (...args: unknown[]) => {
    const queue = (clarity.q ??= [])
    queue.push(args)
  }
  clarity.q = []
  clarityWindow.clarity = clarity
  return clarity
}

function loadClarity() {
  if (!CLARITY_PROJECT_ID || readConsent() !== "granted") return

  const clarity = getClarityCommand()
  clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  })

  const src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
  const existingScript =
    document.getElementById(CLARITY_SCRIPT_ID) ??
    document.querySelector<HTMLScriptElement>(`script[src="${src}"]`) ??
    document.querySelector<HTMLScriptElement>('script[src^="https://www.clarity.ms/tag/"]')

  if (existingScript) return

  const script = document.createElement("script")
  script.id = CLARITY_SCRIPT_ID
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

/** Loads one Clarity tag only after the shared analytics consent is granted. */
export function MicrosoftClarity() {
  useEffect(() => {
    loadClarity()
    window.addEventListener(CONSENT_CHANGE_EVENT, loadClarity)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, loadClarity)
  }, [])

  return null
}
