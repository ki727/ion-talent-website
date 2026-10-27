import type { Metadata } from "next"
import type { ReactNode } from "react"

// Keep all /global preview routes out of search results until launch approval.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

// The global homepage includes the real site's own header and footer.
// Regional concepts render their preview navigation in their own pages.
export default function GlobalPreviewLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
