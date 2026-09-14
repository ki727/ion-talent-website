import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "ION Talent — UAE & Saudi Arabia Salary & Hiring Guide 2026"

const NAVY = "#0F172A"
const TEAL = "#0FA3A1"
const TEAL_BRIGHT = "#22C6B3"
const VIOLET = "#6657E8"

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
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: TEAL_BRIGHT,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          2026 Salary &amp; Hiring Guide
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 58, fontWeight: 700, color: "#FFFFFF", lineHeight: 1.15 }}>
          UAE &amp; Saudi Arabia
        </div>
        <div style={{ display: "flex", marginTop: 8, fontSize: 58, fontWeight: 700, color: TEAL, lineHeight: 1.15 }}>
          Salary &amp; Hiring Guide
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 26, color: "#E5E7EB" }}>
          Practical benchmarks for specialist, leadership and executive talent
        </div>
        <div style={{ display: "flex", marginTop: 36, width: 160, height: 6, borderRadius: 999, background: `linear-gradient(90deg, ${TEAL} 0%, ${TEAL} 46%, ${VIOLET} 54%, ${VIOLET} 100%)` }} />
      </div>
    ),
    { ...size },
  )
}
