import { ImageResponse } from "next/og"
import { opportunities, isShareable } from "@/lib/opportunities"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const NAVY = "#0F172A"
const TEAL = "#0FA3A1"
const TEAL_BRIGHT = "#22C6B3"

interface Props {
  params: { slug: string }
}

export async function generateImageMetadata({ params }: Props) {
  const opportunity = opportunities.find((o) => o.slug === params.slug)
  const alt = opportunity && isShareable(opportunity)
    ? `${opportunity.title} — ${opportunity.locationLabel} — ION Talent`
    : "Join the ION Talent Network — Specialist and leadership opportunities across the GCC and UK"
  return [{ id: "role", size, contentType, alt }]
}

/**
 * Role-detail social preview. Network/pipeline roles (every current role)
 * always render the generic network image — never the role title — so a
 * shared link can never look like a confirmed vacancy. Only a genuine
 * live + shareable role gets a role-specific image.
 */
export default function Image({ params }: Props) {
  const opportunity = opportunities.find((o) => o.slug === params.slug)
  const shareable = opportunity ? isShareable(opportunity) : false

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: NAVY,
          padding: "0 80px",
          textAlign: "center",
        }}
      >
        {shareable && opportunity ? (
          <>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: TEAL_BRIGHT, letterSpacing: 2, textTransform: "uppercase" }}>
              Live Vacancy
            </div>
            <div style={{ display: "flex", marginTop: 24, fontSize: 56, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2 }}>
              {opportunity.title}
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: TEAL }}>{opportunity.locationLabel}</div>
            <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#E5E7EB" }}>ION Talent</div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "baseline", fontSize: 72, fontWeight: 700 }}>
              <span style={{ color: "#FFFFFF" }}>ION</span>
              <span style={{ color: TEAL, marginLeft: 16 }}>Talent</span>
            </div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 44, fontWeight: 700, color: "#FFFFFF" }}>
              Join the ION Talent Network
            </div>
            <div style={{ display: "flex", marginTop: 20, fontSize: 28, color: "#E5E7EB", maxWidth: 800 }}>
              Specialist and leadership opportunities across the GCC and UK, with international reach
            </div>
          </>
        )}
      </div>
    ),
    { ...size },
  )
}
