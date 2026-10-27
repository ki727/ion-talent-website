import type { Metadata } from "next"
import type { ReactNode } from "react"
import { GlobalPreviewHeader, GlobalPreviewFooter } from "@/components/global-preview-shell"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function GlobalPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalPreviewHeader />
      {children}
      <GlobalPreviewFooter />
    </>
  )
}
