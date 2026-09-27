"use client"

import { createElement, useEffect, useRef, type ReactNode } from "react"

interface IonInteractiveSurfaceProps {
  as?: "article" | "div"
  children: ReactNode
  className?: string
}

export function IonInteractiveSurface({
  as = "div",
  children,
  className = "",
}: IonInteractiveSurfaceProps) {
  const surfaceRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const surface = surfaceRef.current
    if (!surface) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          surface.dataset.visible = "true"
          revealObserver.disconnect()
        }
      },
      { threshold: 0.08 }
    )

    revealObserver.observe(surface)

    const handleMove = (event: PointerEvent) => {
      if (reducedMotion.matches || !finePointer.matches) return
      const rect = surface.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const offsetX = (x / rect.width - 0.5) * 6
      const offsetY = (y / rect.height - 0.5) * 6

      surface.style.setProperty("--ion-card-x", `${x}px`)
      surface.style.setProperty("--ion-card-y", `${y}px`)
      surface.style.setProperty("--ion-card-tx", `${offsetX}px`)
      surface.style.setProperty("--ion-card-ty", `${offsetY}px`)
    }

    const handleLeave = () => {
      surface.style.setProperty("--ion-card-tx", "0px")
      surface.style.setProperty("--ion-card-ty", "0px")
    }

    surface.addEventListener("pointermove", handleMove, { passive: true })
    surface.addEventListener("pointerleave", handleLeave)

    return () => {
      revealObserver.disconnect()
      surface.removeEventListener("pointermove", handleMove)
      surface.removeEventListener("pointerleave", handleLeave)
    }
  }, [])

  return createElement(
    as,
    {
      ref: surfaceRef,
      className: `ion-interactive-surface ${className}`.trim(),
    },
    children
  )
}
