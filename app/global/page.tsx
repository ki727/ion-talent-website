import type { Metadata } from "next"
import HomePage from "../page"

// Global preview deliberately reuses ION's existing homepage design.
// The approved Dark Veil hero is selected by the /global pathname.
export const metadata: Metadata = {
  title: "ION Talent | Homepage Preview",
  description:
    "Specialist recruitment and executive search for critical technology and leadership roles across international markets.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function GlobalHomePreview() {
  return <HomePage />
}
