import { NextRequest, NextResponse } from "next/server"

// Keep this list deliberately small until each jurisdiction has had a proper
// privacy/legal review. For all other locations, and where country detection
// is unavailable, retain the consent-first behaviour. No IP or country is
// saved to browser storage or transmitted to the analytics providers here.
const NOTICE_ONLY_COUNTRIES = new Set(["US", "ID"])

export const dynamic = "force-dynamic"

export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase()
  const policy = country && NOTICE_ONLY_COUNTRIES.has(country)
    ? "notice-only"
    : "consent-required"

  return NextResponse.json(
    { policy },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "Vary": "x-vercel-ip-country",
      },
    },
  )
}
