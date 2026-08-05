import { track } from "@vercel/analytics"

/**
 * The full, fixed set of custom events tracked on this site. Keeping this as
 * a closed union (rather than allowing arbitrary strings) makes it obvious
 * at every call site which events exist, and prevents silent typos from
 * creating orphaned event names in the Vercel dashboard.
 */
export type AnalyticsEvent =
  | "referral_section_view"
  | "referral_form_open"
  | "referral_submit_success"
  | "referral_submit_error"
  | "calendly_click"
  | "referral_whatsapp_share"
  | "referral_linkedin_share"
  | "referral_email_share"
  | "referral_copy_link"
  | "linkedin_follow_click"
  | "role_share_linkedin"
  | "role_copy_link"
  | "candidate_application_success"
  | "hiring_enquiry_success"

/**
 * Only safe, non-identifying primitives — page, action, roleType and similar.
 * Never a name, email, phone number, company name or any free-text form
 * field. Callers should not pass anything that could identify a person or a
 * referred company.
 */
type SafeAnalyticsPayload = Record<string, string | number | boolean>

/**
 * Fire-and-forget analytics call. Wrapped in try/catch so an analytics
 * failure (blocked script, ad blocker, network error) can never block
 * navigation or a form submission — the call is always allowed to fail
 * silently.
 */
export function trackEvent(event: AnalyticsEvent, payload?: SafeAnalyticsPayload): void {
  try {
    track(event, payload)
  } catch {
    // Intentionally swallowed — analytics is best-effort only.
  }
}
