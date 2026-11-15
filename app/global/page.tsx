import type { Metadata } from "next"
import HomePage from "../page"

// Global preview deliberately reuses ION's existing homepage design.
// The approved Dark Veil hero is selected by the /global pathname.
export const metadata: Metadata = {
  title: "ION Talent | Homepage Preview",
  description:
    "Specialist recruitment and executive search across sectors and levels, with international reach.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
}

export default function GlobalHomePreview() {
  return <HomePage />
}
