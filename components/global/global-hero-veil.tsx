"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Load the source shader when motion and connection preferences permit it.
const DarkVeil = dynamic(() => import("@/components/global/dark-veil"), {
  ssr: false,
  loading: () => null,
})

type NetworkConnection = { saveData?: boolean; effectiveType?: string }

/** Shared source-style flowing hero; CSS colour flow remains available without WebGL. */
export function GlobalHeroVeil() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const device = navigator as Navigator & { connection?: NetworkConnection; deviceMemory?: number }
    const connection = device.connection

    const update = () => {
      const isSlowConnection = connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g"
      setAnimate(!reducedMotion.matches && !connection?.saveData && !isSlowConnection && "IntersectionObserver" in window && "ResizeObserver" in window)
    }

    update()
    reducedMotion.addEventListener("change", update)
    return () => {
      reducedMotion.removeEventListener("change", update)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Brand colour flow also remains available before the shader loads. */}
      <div
        className="ion-global-colour-field absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 76% 40%, rgba(20,97,105,.55), transparent 42%), radial-gradient(ellipse at 90% 82%, rgba(85,66,134,.25), transparent 44%), linear-gradient(116deg, #081326 4%, #101d32 55%, #122b38 100%)",
        }}
      />
      {animate && (
        <DarkVeil
          className="ion-global-flow h-full w-full"
          color="#38C8C1"
          speed={0.5}
          flow={1}
          glow={0.4}
          sheen={0.25}
          grain={0.01}
          brightness={1.05}
          quality={0.5}
          dpr={1}
          opacity={1}
          mouseInteraction={false}
          intro={false}
        />
      )}
      {/* Keep copy and calls to action readable even on bright parts of the shader. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,14,27,.5) 0%, rgba(8,18,34,.22) 39%, rgba(8,20,35,.04) 100%), radial-gradient(ellipse at 86% 88%, rgba(99,80,164,.19), transparent 44%)",
        }}
      />
    </div>
  )
}
