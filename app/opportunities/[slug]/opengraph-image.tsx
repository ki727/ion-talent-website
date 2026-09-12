import { ImageResponse } from "next/og"
import { opportunities, type Opportunity } from "@/lib/opportunities"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "ION Talent opportunity"

const NAVY = "#0F172A"
const TEAL = "#0FA3A1"

interface Props {
  params: { slug: string }
}

function getSocialTitle(title: string) {
  return title.split(" / ").at(-1) ?? title
}

function getEmploymentType(opportunity: Opportunity) {
  return opportunity.employmentTypes
    .filter((type) => type !== "Executive Search")
    .join(" · ")
}

/** Minimal role thumbnail shared by every opportunity detail route. */
export default async function Image({ params }: Props) {
  const opportunity = opportunities.find((item) => item.slug === params.slug)
  const title = opportunity ? getSocialTitle(opportunity.title) : "Opportunity"
  const location = opportunity?.locationLabel ?? "International"
  const employmentType = opportunity ? getEmploymentType(opportunity) : ""
  const logoSvg = await fetch(
    new URL("../../../public/brand/logo-primary-web.svg", import.meta.url),
  ).then((response) => response.text())
  const logoBytes = new TextEncoder().encode(logoSvg)
  const logoBase64 = btoa(Array.from(logoBytes, (byte) => String.fromCharCode(byte)).join(""))
  const logoSrc = `data:image/svg+xml;base64,${logoBase64}`
  const fontData = await fetch(
    new URL(
      "../../../node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf",
      import.meta.url,
    ),
  ).then((response) => response.arrayBuffer())

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
          backgroundColor: "#FFFFFF",
          color: NAVY,
          padding: "70px 80px",
          textAlign: "center",
          fontFamily: "ION Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="ION Talent" width="500" height="103" style={{ objectFit: "contain" }} />

        <div
          style={{
            display: "flex",
            maxWidth: 1040,
            marginTop: 52,
            fontSize: title.length > 38 ? 56 : 64,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#475569",
            fontSize: 30,
            fontWeight: 400,
          }}
        >
          <span style={{ color: TEAL }}>{location}</span>
          {employmentType && <span style={{ margin: "0 14px", color: "#94A3B8" }}>|</span>}
          {employmentType && <span>{employmentType}</span>}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "ION Sans", data: fontData, weight: 400 },
        { name: "ION Sans", data: fontData, weight: 600 },
      ],
    },
  )
}
