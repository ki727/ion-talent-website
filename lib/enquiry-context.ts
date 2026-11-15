/** Shared, non-identifying routing context for employer enquiries. */
export const ENQUIRY_MARKETS = [
  { slug: "uk", label: "United Kingdom" },
  { slug: "europe", label: "Europe" },
  { slug: "us", label: "United States" },
  { slug: "asia-pacific", label: "Asia-Pacific" },
  { slug: "middle-east", label: "Middle East" },
  { slug: "ae", label: "United Arab Emirates" },
  { slug: "sa", label: "Saudi Arabia" },
  { slug: "gcc", label: "Wider GCC" },
] as const

export function normaliseEnquiryMarket(value: unknown): string {
  return typeof value === "string" && ENQUIRY_MARKETS.some(market => market.slug === value) ? value : ""
}

export function normaliseEnquirySource(value: unknown): string {
  if (value === "/global") return value
  if (typeof value !== "string" || !value.startsWith("/global/")) return ""
  return normaliseEnquiryMarket(value.slice("/global/".length)) ? value : ""
}

export function normaliseEnquirySector(value: unknown): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 120) : ""
}

export function getEnquiryHref(pathname: string, sector?: string): string {
  if (!pathname.startsWith("/global")) return "/#contact"
  const market = normaliseEnquiryMarket(pathname.slice("/global/".length))
  const cleanSector = normaliseEnquirySector(sector)
  if (!market && !cleanSector) return "/global#contact"
  const query = new URLSearchParams()
  if (market) query.set("market", market)
  query.set("source", market ? `/global/${market}` : "/global")
  if (cleanSector) query.set("sector", cleanSector)
  return `/global?${query.toString()}#contact`
}

export function readEnquiryContext(search: string, pathname: string) {
  const query = new URLSearchParams(search)
  return {
    market: normaliseEnquiryMarket(query.get("market")) || normaliseEnquiryMarket(pathname.slice("/global/".length)),
    sourcePage: normaliseEnquirySource(query.get("source")) || normaliseEnquirySource(pathname) || "/global",
    sector: normaliseEnquirySector(query.get("sector")),
  }
}
