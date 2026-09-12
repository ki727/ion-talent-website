import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "ION Talent opportunity"

/** Brand-first thumbnail shared by every opportunity detail route. */
export default async function Image() {
  const logoSvg = await fetch(
    new URL("../../../public/brand/logo-primary-web.svg", import.meta.url),
  ).then((response) => response.text())
  const logoBytes = new TextEncoder().encode(logoSvg)
  const logoBase64 = btoa(Array.from(logoBytes, (byte) => String.fromCharCode(byte)).join(""))
  const logoSrc = `data:image/svg+xml;base64,${logoBase64}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="ION Talent" width="960" height="197" style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size },
  )
}
