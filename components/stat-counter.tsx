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
                const eased = 1 - Math.pow(1 - progress, 3)
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
        <div className="text-4xl font-semibold text-ion-navy">
          {count}
          {suffix && <span className="text-ion-teal">{suffix}</span>}
        </div>
        <span className="mt-2 h-0.5 w-8 rounded-full bg-ion-teal" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm text-ion-gray">{label}</p>
      {sublabel && <p className="mt-1 text-xs text-ion-gray/80">{sublabel}</p>}
    </div>
  )
}
