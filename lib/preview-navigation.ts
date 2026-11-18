/** Keep shared page journeys within the Global preview. */
export function previewHref(href: string, preview: boolean): string {
  if (!preview) return href
  if (href === "/") return "/global"
  if (href.startsWith("/#")) return `/global${href.slice(1)}`
  if (href === "/about" || href === "/privacy" || href === "/referral-terms" || href === "/refer" || href === "/opportunities" || href.startsWith("/opportunities/")) return `/global${href}`
  return href
}
