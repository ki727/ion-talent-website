"use client"

import { useState } from "react"
import { Copy, Check, Linkedin, Mail, MessageCircle } from "lucide-react"
import { REFERRAL_PAGE_PATH, REFERRAL_PAGE_URL, REFERRAL_REWARD_MESSAGE } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

const EMAIL_SUBJECT = "Earn up to US$5,000 for a successful hiring introduction"

// LinkedIn's messaging inbox — opens the compose/contact picker without
// preselecting a recipient or posting anything publicly. Deliberately not
// the public share-offsite composer or the company page.
const LINKEDIN_MESSAGING_URL = "https://www.linkedin.com/messaging/"

function getReferralUrl(): string {
  return typeof window !== "undefined" ? `${window.location.origin}${REFERRAL_PAGE_PATH}` : REFERRAL_PAGE_PATH
}

function buildEmailBody(url: string): string {
  return `Know a company that's hiring?\n\nION Talent offers referral rewards of up to US$5,000 when a genuine introduction becomes a new client and leads to a successful placement.\n\nMake an introduction or book a quick call here:\n\n${url}`
}

// Always the canonical production /refer URL — never window.location.origin —
// so a message prepared for LinkedIn can never contain a localhost link.
function buildLinkedInMessage(): string {
  return `${REFERRAL_REWARD_MESSAGE}\n\n${REFERRAL_PAGE_URL}`
}

interface ReferralShareProps {
  className?: string
  /** Safe, non-identifying label for analytics only. */
  source: string
  /** "light" (default) for white/light card backgrounds, "dark" for the navy homepage section. */
  variant?: "light" | "dark"
}

const BASE_LIGHT =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
const BASE_DARK =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ion-navy"

/**
 * Restrained referral-sharing grid. Every action shares only the public
 * referral page URL and the fixed reward message — never any submitted
 * personal or company information. Button backgrounds stay white/neutral;
 * only the icon and hover tint carry each platform's accent colour.
 */
export function ReferralShare({ className = "", source, variant = "light" }: ReferralShareProps) {
  const [copied, setCopied] = useState(false)
  const [manualUrl, setManualUrl] = useState<string | null>(null)
  const [linkedinMessageCopied, setLinkedinMessageCopied] = useState(false)

  const base = variant === "dark" ? BASE_DARK : BASE_LIGHT

  function handleWhatsApp() {
    trackEvent("referral_whatsapp_share", { page: source })
    const url = getReferralUrl()
    const text = `${REFERRAL_REWARD_MESSAGE} ${url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
  }

  async function handleLinkedIn() {
    trackEvent("referral_linkedin_share", { page: source })
    const message = buildLinkedInMessage()
    try {
      await navigator.clipboard.writeText(message)
      setLinkedinMessageCopied(true)
      setManualUrl(null)
      window.setTimeout(() => setLinkedinMessageCopied(false), 5000)
    } catch {
      // Clipboard API unavailable — fall back to a manually copyable field
      // with the same prepared message, same as the Copy Link fallback.
      setManualUrl(message)
    }
    window.open(LINKEDIN_MESSAGING_URL, "_blank", "noopener,noreferrer")
  }

  function handleEmail() {
    trackEvent("referral_email_share", { page: source })
    const url = getReferralUrl()
    const body = buildEmailBody(url)
    window.location.href = `mailto:?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(body)}`
  }

  async function handleCopyLink() {
    trackEvent("referral_copy_link", { page: source })
    const url = getReferralUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setManualUrl(null)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard API unavailable — fall back to showing the URL for manual copy.
      setManualUrl(url)
    }
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-3 min-[375px]:grid-cols-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          aria-label="Share via WhatsApp"
          className={`${base} hover:bg-[#25D366]/10 hover:border-[#25D366]/50 focus-visible:ring-[#25D366]`}
        >
          <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={handleLinkedIn}
          aria-label="Send referral via LinkedIn message"
          className={`${base} hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50 focus-visible:ring-[#0A66C2]`}
        >
          <Linkedin className="h-5 w-5 shrink-0 text-[#0A66C2]" aria-hidden="true" />
          Send via LinkedIn
        </button>

        <button
          type="button"
          onClick={handleEmail}
          aria-label="Share via email"
          className={`${base} hover:bg-ion-teal/10 hover:border-ion-teal/50 focus-visible:ring-ion-teal`}
        >
          <Mail className="h-5 w-5 shrink-0 text-ion-teal" aria-hidden="true" />
          Email
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy referral link"
          className={`${base} hover:bg-ion-teal/10 hover:border-ion-teal/50 focus-visible:ring-ion-teal`}
        >
          {copied ? (
            <Check className="h-5 w-5 shrink-0 text-ion-teal" aria-hidden="true" />
          ) : (
            <Copy className={`h-5 w-5 shrink-0 ${variant === "dark" ? "text-white" : "text-ion-navy"}`} aria-hidden="true" />
          )}
          {copied ? "Copied" : "Copy Link"}
        </button>
      </div>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>

      {linkedinMessageCopied && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm font-medium ${variant === "dark" ? "text-ion-teal-bright" : "text-ion-teal-dark"}`}
        >
          Message copied. Choose a LinkedIn contact and paste it into the conversation.
        </p>
      )}

      {manualUrl && (
        <div className="mt-3">
          <label
            htmlFor="referral-manual-copy"
            className={`block text-xs mb-1 ${variant === "dark" ? "text-white/70" : "text-gray-500"}`}
          >
            Clipboard unavailable — copy this manually:
          </label>
          <textarea
            id="referral-manual-copy"
            readOnly
            rows={manualUrl.includes("\n") ? 4 : 1}
            value={manualUrl}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700"
          />
        </div>
      )}
    </div>
  )
}
