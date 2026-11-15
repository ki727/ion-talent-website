import type { Metadata } from "next"
/** Preview-only pages remain outside public search results and published canonicals. */
export function previewMetadata(title: string, description: string): Metadata {
  return { title, description, robots: { index: false, follow: false }, alternates: { canonical: null }, openGraph: { title, description, type: "website", siteName: "ION Talent" }, twitter: { card: "summary_large_image", title, description } }
}
