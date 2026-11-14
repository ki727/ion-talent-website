"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Only fetch the WebGL shader after desktop / motion / data-saver checks.
const DarkVeil = dynamic(() => import("@/components/global/dark-veil"), {
  ssr: false,
  loading: () => null,
})

type NetworkConnection = { saveData?: boolean; effectiveType?: string }

/**
 * Global V1 preview hero: ION navy static fallback with a restrained
 * Dark Veil animation on capable desktop devices only.
 *
 * This is deliberately not used by the live homepage or regional pages.
 * It adds no background video download to the global preview.
 */
export function GlobalHeroVeil() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (navigator as Navigator & { connection?: NetworkConnection }).connection

    const update = () => {
      const isSlowConnection = connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g"
      setAnimate(desktop.matches && !reducedMotion.matches && !connection?.saveData && !isSlowConnection)
    }

    update()
    desktop.addEventListener("change", update)
    reducedMotion.addEventListener("change", update)
    return () => {
      desktop.removeEventListener("change", update)
      reducedMotion.removeEventListener("change", update)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Permanent static background: visible before JS, on mobile, and on low-power devices. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 76% 40%, rgba(20,97,105,.55), transparent 42%), radial-gradient(ellipse at 90% 82%, rgba(85,66,134,.25), transparent 44%), linear-gradient(116deg, #081326 4%, #101d32 55%, #122b38 100%)",
        }}
      />
      {animate && (
        <DarkVeil
          className="h-full w-full"
          color="#22B5B0"
          speed={0.12}
          flow={0.35}
          glow={0.2}
          sheen={0.12}
          grain={0.01}
          brightness={0.85}
          quality={0.35}
          dpr={1}
          opacity={0.7}
          mouseInteraction={false}
          intro={false}
        />
      )}
      {/* Keep copy and calls to action readable even on bright parts of the shader. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,14,27,.91) 0%, rgba(8,18,34,.80) 39%, rgba(8,20,35,.27) 100%), radial-gradient(ellipse at 86% 88%, rgba(99,80,164,.19), transparent 44%)",
        }}
      />
    </div>
  )
}
