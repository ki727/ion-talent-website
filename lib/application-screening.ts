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

// Common currencies first, followed by other supported international currency codes.
export const SALARY_CURRENCIES = ["AED","SAR","QAR","KWD","BHD","OMR","GBP","USD","EUR","CAD","SGD","AUD","INR","PKR","EGP","AFN","ALL","AMD","ANG","AOA","ARS","AWG","AZN","BAM","BBD","BDT","BGN","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CDF","CHF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","ERN","ETB","FJD","FKP","GEL","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IQD","IRR","ISK","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","PAB","PEN","PGK","PHP","PLN","PYG","RON","RSD","RUB","RWF","SBD","SCR","SDG","SEK","SHP","SLL","SOS","SRD","SSP","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","UYU","UZS","VES","VND","VUV","WST","YER","ZAR","ZMW","ZWL"] as const

export function validFixedSalary(amount: string, currency: string, allowZero = false): boolean {
  if (!/^\d{1,12}(?:\.\d{1,2})?$/.test(amount)) return false
  const value = Number(amount)
  if (value === 0) return allowZero && (currency === "" || SALARY_CURRENCIES.some((code) => code === currency))
  return value > 0 && SALARY_CURRENCIES.some((code) => code === currency)
}

export function formatFixedSalary(amount: string, currency: string): string {
  return Number(amount) === 0 ? "0 (not currently employed)" : currency + " " + amount + " / month"
}
