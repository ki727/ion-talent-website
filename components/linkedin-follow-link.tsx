"use client"

import { Linkedin } from "lucide-react"
import { LINKEDIN_COMPANY_URL } from "@/lib/site-config"
import { trackEvent } from "@/lib/analytics"

interface LinkedinFollowLinkProps {
  className?: string
  children?: React.ReactNode
  /** Safe, non-identifying label for analytics only — e.g. "footer", "candidate_success". */
  source: string
  /** Overrides the icon's size/colour classes. Defaults to a small icon that inherits the surrounding text colour. */
  iconClassName?: string
}

/** Reusable "Follow ION Talent on LinkedIn" link — safe new-tab external link with tracking. */
export function LinkedinFollowLink({ className, children, source, iconClassName = "h-4 w-4" }: LinkedinFollowLinkProps) {
  return (
    <a
      href={LINKEDIN_COMPANY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("linkedin_follow_click", { page: source })}
      className={className}
    >
      <Linkedin className={`shrink-0 ${iconClassName}`} aria-hidden="true" />
      {children ?? "Follow ION Talent on LinkedIn"}
    </a>
  )
}
