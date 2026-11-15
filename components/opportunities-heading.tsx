"use client"
import { usePathname } from "next/navigation"
export function OpportunitiesHeading() {
  return <>{usePathname().startsWith("/global") ? "Opportunities & Talent Network" : "Current and Upcoming Opportunities"}</>
}
