import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "ION Talent — Know a company that's hiring? Earn up to US$5,000."

const NAVY = "#0F172A"
const TEAL = "#0FA3A1"
const TEAL_BRIGHT = "#22C6B3"

/** Referral page preview. Reward wording kept conditional in the page's own metadata description. */
export default function Image() {
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
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: TEAL_BRIGHT, letterSpacing: 2, textTransform: "uppercase" }}>
          ION Talent Referrals
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 60, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15 }}>
          Know a company that&apos;s hiring?
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 44, fontWeight: 700, color: TEAL }}>
          Earn up to US$5,000
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#E5E7EB" }}>
          Make an introduction or schedule a call — ION Talent
        </div>
      </div>
    ),
    { ...size },
  )
}
