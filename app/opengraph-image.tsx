import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "ION Talent — Search Expertise. International Reach."

const NAVY = "#0F172A"
const TEAL = "#0FA3A1"
const TEAL_BRIGHT = "#22C6B3"

/** Global ION Talent preview — homepage and any normal page without its own image. */
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
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 96, fontWeight: 700 }}>
          <span style={{ color: "#FFFFFF" }}>ION</span>
          <span style={{ color: TEAL, marginLeft: 20 }}>Talent</span>
        </div>
        <div style={{ display: "flex", width: 96, height: 6, borderRadius: 9999, backgroundColor: TEAL_BRIGHT, marginTop: 32 }} />
        <div style={{ display: "flex", marginTop: 32, fontSize: 34, color: "#E5E7EB", letterSpacing: 1 }}>
          Search Expertise. International Reach.
        </div>
      </div>
    ),
    { ...size },
  )
}
