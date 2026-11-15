"use client"

interface StatCounterProps {
  end: number
  suffix?: string
  label: string
  /** Small restrained line shown beneath the label, e.g. a market list. */
  sublabel?: string
  /** Legacy call-site compatibility; metrics no longer animate. */
  duration?: number
  startDelay?: number
  /** Keeps the compact homepage credibility band free of repeated decorative rules. */
  showAccent?: boolean
}

/** Credibility metrics are always shown in full, including before hydration. */
export function StatCounter({
  end,
  suffix = "",
  label,
  sublabel,
  showAccent = true,
}: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="inline-flex flex-col items-center">
        <div className="ion-text-teal text-4xl font-semibold tabular-nums">
          {end}
          {suffix && <span className="ion-text-teal">{suffix}</span>}
        </div>
        {showAccent && <span className="mt-2 h-0.5 w-8 rounded-full bg-ion-teal" aria-hidden="true" />}
      </div>
      <p className="mt-3 text-sm text-ion-navy">{label}</p>
      {sublabel && <p className="mt-1 text-xs text-ion-gray/80">{sublabel}</p>}
    </div>
  )
}
