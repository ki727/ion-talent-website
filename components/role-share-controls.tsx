"use client"

import { useState } from "react"
import { Copy, Check, Linkedin } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

interface RoleShareControlsProps {
  /** Relative path, e.g. "/opportunities/cybersecurity-architect" — resolved to an absolute URL client-side. */
  roleUrl: string
}

/**
 * Public sharing controls — only ever rendered by the parent page when
 * isShareable(opportunity) is true (a genuine, confirmed live vacancy).
 * ION Talent Network / pipeline roles never get this component at all, so
 * there is no separate gate to forget here.
 */
export function RoleShareControls({ roleUrl }: RoleShareControlsProps) {
  const [copied, setCopied] = useState(false)

  function getAbsoluteUrl() {
    return typeof window !== "undefined" ? `${window.location.origin}${roleUrl}` : roleUrl
  }

  async function handleCopyLink() {
    trackEvent("role_copy_link")
    const url = getAbsoluteUrl()
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Clipboard API can be unavailable (older browsers, permissions) —
      // fail quietly rather than showing a broken "copied" confirmation.
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  const linkedInShareHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getAbsoluteUrl())}`

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <a
        href={linkedInShareHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("role_share_linkedin")}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-300 px-3 text-xs font-medium text-gray-700 transition-colors hover:border-ion-teal hover:text-ion-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
      >
        <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        Share on LinkedIn
      </a>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-300 px-3 text-xs font-medium text-gray-700 transition-colors hover:border-ion-teal hover:text-ion-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-ion-teal" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
        Copy Link
      </button>

      <span role="status" aria-live="polite" className="text-xs font-medium text-ion-teal-dark">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  )
}
