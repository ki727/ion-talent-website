"use client"
import { usePathname } from "next/navigation"
export function OpportunitiesHeading() {
  return <>{usePathname().startsWith("/global") ? "Opportunities & Talent Network" : "Current and Upcoming Opportunities"}</>
}

export function OpportunitiesIntro() {
  return <>{usePathname().startsWith("/global") ? "Browse talent-network profiles across London, Riyadh, Dubai, New York and our other target cities. Filter by location and function, or register your interest for relevant future searches." : "Explore specialist opportunities across the GCC and international markets. Register your interest and we will contact you when your experience matches a relevant live requirement."}</>
}
