"use client"

import { useEffect, useRef } from "react"

interface IonLiquidAtmosphereProps {
  compact?: boolean
}

export function IonLiquidAtmosphere({ compact = false }: IonLiquidAtmosphereProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  useEffect(() => {
    const root = rootRef.current
    const videos = videoRefs.current.filter((video): video is HTMLVideoElement => video !== null)
    if (!root || videos.length !== 2) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const crossfadeDuration = 1.25
    let activeIndex = 0
    let crossfading = false
    let frame = 0
    let transitionTimer = 0

    const setActiveVideo = (index: number) => {
      videos.forEach((video, videoIndex) => {
        video.dataset.active = String(videoIndex === index)
      })
    }

    const resetVideos = () => {
      window.clearTimeout(transitionTimer)
      crossfading = false
      activeIndex = 0
      videos.forEach((video) => {
        video.pause()
        video.currentTime = 0
      })
      setActiveVideo(0)
    }

    const syncMotionPreference = () => {
      resetVideos()
      if (reducedMotion.matches) {
        root.style.setProperty("--ion-liquid-shift", "0px")
      } else {
        void videos[0].play().catch(() => undefined)
      }
    }

    const beginCrossfade = () => {
      if (crossfading || reducedMotion.matches) return
      crossfading = true

      const outgoingIndex = activeIndex
      const incomingIndex = activeIndex === 0 ? 1 : 0
      const outgoing = videos[outgoingIndex]
      const incoming = videos[incomingIndex]
      incoming.currentTime = 0

      void incoming.play().then(() => {
        setActiveVideo(incomingIndex)
        transitionTimer = window.setTimeout(() => {
          outgoing.pause()
          outgoing.currentTime = 0
          activeIndex = incomingIndex
          crossfading = false
        }, crossfadeDuration * 1000)
      }).catch(() => {
        crossfading = false
      })
    }

    const monitorPlayback = () => {
      if (!reducedMotion.matches && !crossfading) {
        const activeVideo = videos[activeIndex]
        if (
          Number.isFinite(activeVideo.duration) &&
          activeVideo.duration > crossfadeDuration * 2 &&
          activeVideo.currentTime >= activeVideo.duration - crossfadeDuration
        ) {
          beginCrossfade()
        }
      }
      frame = requestAnimationFrame(monitorPlayback)
    }

    const updatePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || event.pointerType === "touch") return
      const rect = root.getBoundingClientRect()
      root.style.setProperty("--ion-liquid-x", `${event.clientX - rect.left}px`)
      root.style.setProperty("--ion-liquid-y", `${event.clientY - rect.top}px`)
    }

    const updateScroll = () => {
      if (reducedMotion.matches) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect()
        const shift = Math.max(-18, Math.min(18, rect.top * -0.045))
        root.style.setProperty("--ion-liquid-shift", `${shift}px`)
      })
    }

    syncMotionPreference()
    updateScroll()
    frame = requestAnimationFrame(monitorPlayback)
    reducedMotion.addEventListener("change", syncMotionPreference)
    window.addEventListener("pointermove", updatePointer, { passive: true })
    window.addEventListener("scroll", updateScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(transitionTimer)
      videos.forEach((video) => video.pause())
      reducedMotion.removeEventListener("change", syncMotionPreference)
      window.removeEventListener("pointermove", updatePointer)
      window.removeEventListener("scroll", updateScroll)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`ion-liquid-atmosphere${compact ? " ion-liquid-atmosphere--compact" : ""}`}
      aria-hidden="true"
    >
      <div className="ion-liquid-atmosphere__portal">
        {[0, 1].map((index) => (
          <video
            key={index}
            ref={(video) => {
              videoRefs.current[index] = video
            }}
            autoPlay={index === 0}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            data-active={String(index === 0)}
          >
            <source src="/liquid-high-fidelity/video.mp4" type="video/mp4" />
          </video>
        ))}
      </div>
      <div className="ion-liquid-atmosphere__wash" />
      <div className="ion-liquid-atmosphere__highlight" />
    </div>
  )
}
