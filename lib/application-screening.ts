// Shared role application validation. Salary history is restricted to known GCC role locations.
// Unknown locations fail closed; extend only after jurisdiction-specific legal review.
export const NOTICE_PERIODS = ["Immediately available", "Less than 30 days", "30 days", "60 days", "90 days", "More than 90 days"] as const

export function asksCurrentSalary(roleLocation: string): boolean {
  return ["dubai", "abu dhabi", "riyadh", "dammam", "jeddah", "doha", "muscat", "manama", "kuwait city", "sharjah"].includes(roleLocation.trim().toLowerCase())
}

export function validInternationalPhone(value: string): boolean {
  return /^\+[1-9]\d{6,14}$/.test(value.trim().replace(/[\s().-]/g, ""))
}

export function normalizedLinkedin(value: string): string | null {
  try {
    const raw = value.trim()
    if (!raw) return null
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : "https://" + raw)
    if (url.protocol !== "https:" && url.protocol !== "http:") return null
    if (!/^(?:[a-z]{2,3}\.)?linkedin\.com$/i.test(url.hostname) || url.username || url.password || url.port) return null
    if (!/^\/in\/[^/]+\/?$/i.test(url.pathname)) return null
    return "https://www.linkedin.com" + url.pathname.replace(/\/$/, "")
  } catch { return null }
}
