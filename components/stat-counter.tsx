"use client"

import { useEffect, useRef, useState } from "react"

interface StatCounterProps {
  end: number
  suffix?: string
  label: string
  /** Small restrained line shown beneath the label, e.g. a market list. */
  sublabel?: string
  duration?: number
  /** Optional small delay (ms) before this counter starts — for a subtle stagger across a row of stats. */
  startDelay?: number
}

/** One-time count-up on viewport entry. Respects prefers-reduced-motion by rendering the final value immediately. */
export function StatCounter({
  end,
  suffix = "",
  label,
  sublabel,
  duration = 1400,
  startDelay = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setCount(end)
      setHasAnimated(true)
      return
    }

    // Older/unusual browsers without IntersectionObserver: skip straight to
    // the final value rather than leaving the counter stuck at 0.
    if (typeof IntersectionObserver === "undefined") {
      setCount(end)
      setHasAnimated(true)
      return
    }

    // Safety net: if the animation never actually starts for any reason
    // (observer never fires, requestAnimationFrame unsupported, a runtime
    // error mid-animation, etc.), land on the real value instead of leaving
    // users looking at 0.
    const fallbackTimer = window.setTimeout(() => {
      setHasAnimated((already) => {
        if (!already) setCount(end)
        return true
      })
    }, 4000)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          window.clearTimeout(fallbackTimer)
          const begin = () => {
            try {
              const start = performance.now()
              const step = (now: number) => {
                const progress = Math.min((now - start) / duration, 1)
                // Ease-out quad rather than cubic: cubic's steep initial rise
                // means a low-value counter (e.g. end=3 or end=10) rounds to
                // its final integer around 45-65% of the way through
                // `duration`, so it visually "snaps" to the finished number
                // well before the animation is meant to finish. Quad spreads
                // that same deceleration further across the full duration
                // (final value lands around 75-80% through instead), which
                // reads as smooth motion across the whole ~1400ms for every
                // counter regardless of how few integer steps it has.
                const eased = 1 - Math.pow(1 - progress, 2)
                setCount(Math.round(eased * end))
                if (progress < 1) requestAnimationFrame(step)
              }
              requestAnimationFrame(step)
            } catch {
              setCount(end)
            }
          }
          if (startDelay > 0) window.setTimeout(begin, startDelay)
          else begin()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(fallbackTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, startDelay])

  return (
    <div ref={ref} className="text-center">
      <div className="inline-flex flex-col items-center">
        <div className="ion-text-teal text-4xl font-semibold tabular-nums">
          {count}
          {suffix && <span className="ion-text-teal">{suffix}</span>}
        </div>
        <span className="mt-2 h-0.5 w-8 rounded-full bg-ion-teal" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm text-ion-navy">{label}</p>
      {sublabel && <p className="mt-1 text-xs text-ion-gray/80">{sublabel}</p>}
    </div>
  )
}
