import type { Metadata } from "next"
import HomePage from "../page"

// Global preview deliberately reuses ION's existing homepage design.
// The Dubai hero video remains unchanged until replacement footage is approved.
export const metadata: Metadata = {
  title: "ION Talent | Homepage Preview",
  description:
    "Specialist recruitment and executive search for critical technology and leadership roles across international markets.",
  robots: { index: false, follow: false },
}

export default function GlobalHomePreview() {
  return <HomePage />
}
