/** Analytics consent, stored per browser: "granted" or "denied"; absent means not yet asked. */
export const CONSENT_STORAGE_KEY = "ion-analytics-consent"
/** Fired when the stored choice changes, so the GA4 loader can react. */
export const CONSENT_CHANGE_EVENT = "ion-consent-change"
/** Fired to re-open the cookie notice. */
export const CONSENT_RESET_EVENT = "ion-consent-reset"

/**
 * The visitor's jurisdiction is determined by our server before analytics run.
 * Unknown and unreviewed countries require an explicit analytics choice.
 * "notice-only" is a narrowly allowlisted, non-persistent default, never a
 * saved claim that the visitor clicked Accept.
 */
export type AnalyticsPolicy = "unresolved" | "consent-required" | "notice-only"
let analyticsPolicy: AnalyticsPolicy = "unresolved"

export function setAnalyticsPolicy(next: AnalyticsPolicy) {
  if (analyticsPolicy === next) return
  analyticsPolicy = next
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

export function needsConsentPrompt(): boolean {
  return analyticsPolicy !== "notice-only" && readConsent() === null
}

type Gtag = (...args: unknown[]) => void
type Clarity = (...args: unknown[]) => void

export function readConsent(): "granted" | "denied" | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (value === "granted" || value === "denied") return value
  } catch {
    // Storage may be unavailable. Still honour the active regional policy.
  }
  return analyticsPolicy === "notice-only" ? "granted" : null
}

/** Removes first-party GA4 and Clarity cookies after analytics consent is withdrawn. */
function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`]
  document.cookie
    .split(";")
    .map(cookie => cookie.split("=")[0].trim())
    .filter(name => name === "_ga" || name.startsWith("_ga_") || name === "_clck" || name === "_clsk")
    .forEach(name => {
      domains.forEach(domain => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`
      })
    })
}

export function saveConsent(choice: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  const gtag = (window as Window & { gtag?: Gtag }).gtag
  gtag?.("consent", "update", { analytics_storage: choice })
  const clarity = (window as Window & { clarity?: Clarity }).clarity
  clarity?.("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: choice,
  })
  if (choice === "denied") {
    // Microsoft documents this call as ending the session, clearing Clarity
    // cookies and preventing more tracking until consent is granted again.
    clarity?.("consent", false)
    clearAnalyticsCookies()
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/** Re-open the cookie notice so the visitor can change their choice. */
export function resetConsent() {
  window.dispatchEvent(new Event(CONSENT_RESET_EVENT))
}
