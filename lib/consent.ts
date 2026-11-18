/** Analytics consent, stored per browser: "granted" or "denied"; absent means not yet asked. */
export const CONSENT_STORAGE_KEY = "ion-analytics-consent"
/** Fired when the stored choice changes, so the GA4 loader can react. */
export const CONSENT_CHANGE_EVENT = "ion-consent-change"
/** Fired to re-open the cookie notice. */
export const CONSENT_RESET_EVENT = "ion-consent-reset"

type Gtag = (...args: unknown[]) => void

export function readConsent(): "granted" | "denied" | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === "granted" || value === "denied" ? value : null
  } catch {
    return null
  }
}

/** Removes first-party Google Analytics cookies (_ga, _ga_<ID>) after a visitor withdraws consent. */
function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`]
  document.cookie.split(";").map(c => c.split("=")[0].trim()).filter(name => name === "_ga" || name.startsWith("_ga_")).forEach(name => {
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
  if (choice === "denied") clearAnalyticsCookies()
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

/** Re-open the cookie notice so the visitor can change their choice. */
export function resetConsent() {
  window.dispatchEvent(new Event(CONSENT_RESET_EVENT))
}
