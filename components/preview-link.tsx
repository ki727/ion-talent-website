"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { previewHref } from "@/lib/preview-navigation"

/** Shared pages keep their navigation within whichever experience opened them. */
export function PreviewLink({ href, ...props }: ComponentProps<typeof Link>) {
  const preview = usePathname().startsWith("/global")
  return <Link href={typeof href === "string" ? previewHref(href, preview) : href} {...props} />
}
