import type { Metadata } from "next"
import HomePage from "../page"

// Global preview deliberately reuses ION's existing homepage design.
// The approved Dark Veil hero is selected by the /global pathname.
export const metadata: Metadata = {
  title: "ION Talent | Recruitment & Executive Search Preview",
  description: "Recruitment and executive search across sectors and levels, with international reach.",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: { title: "ION Talent | Recruitment & Executive Search", description: "Recruitment and executive search across sectors and levels, with international reach.", type: "website", siteName: "ION Talent" },
  twitter: { card: "summary_large_image", title: "ION Talent | Recruitment & Executive Search", description: "Recruitment and executive search across sectors and levels, with international reach." },
}

export default function GlobalHomePreview() {
  return <HomePage />
}
