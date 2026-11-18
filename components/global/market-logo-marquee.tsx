"use client"

import Image from "next/image"
import { useEffect, useId, useState } from "react"
import { Pause, Play } from "lucide-react"
import styles from "./market-logo-marquee.module.css"

export interface MarketLogo {
  name: string
  src: string
  showName?: boolean
}

const DEFAULT_LOGOS: readonly MarketLogo[] = [
  { name: "NEOM", src: "/logos/neom-logo.png" },
  { name: "PwC", src: "/logos/pwc-logo.png" },
  { name: "Bechtel", src: "/logos/bechtel-logo.png" },
  { name: "Siemens", src: "/logos/siemens-logo.png" },
  { name: "Atos", src: "/logos/atos-logo.png" },
]

/** An editorial market-brand strip. It makes no claim of client relationships. */
export function MarketLogoMarquee({ logos = DEFAULT_LOGOS }: { logos?: readonly MarketLogo[] }) {
  const headingId = useId()
  const [paused, setPaused] = useState(false)
  const [pageHidden, setPageHidden] = useState(false)

  useEffect(() => {
    const syncVisibility = () => setPageHidden(document.hidden)
    syncVisibility()
    document.addEventListener("visibilitychange", syncVisibility)
    return () => document.removeEventListener("visibilitychange", syncVisibility)
  }, [])

  if (logos.length === 0) return null

  return <section aria-labelledby={headingId} className={styles.section}>
    <div className={styles.header}>
      <div>
        <h2 id={headingId} className={styles.heading}>Companies shaping our markets</h2>
        <p className={styles.description}>A selection of organisations across our target sectors.</p>
      </div>
      <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Play logo animation" : "Pause logo animation"} className={styles.control}>
        {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
        {paused ? "Play" : "Pause"}
      </button>
    </div>
    <div className={styles.viewport} tabIndex={0} role="group" aria-label="Organisation logos; focus pauses the animation">
      <div className={styles.track} data-paused={paused || pageHidden ? "true" : "false"}>
        {[false, true].map(duplicate => <ul key={String(duplicate)} className={`${styles.group} ${duplicate ? styles.clone : ""}`} aria-hidden={duplicate ? true : undefined}>
          {logos.map(logo => <li key={logo.name} className={`${styles.cell} ${logo.showName ? styles.named : ""}`}>
            <Image src={logo.src} alt={duplicate ? "" : logo.name} width={144} height={48} sizes="144px" loading="eager" className={styles.logo} />
            {logo.showName && <span aria-hidden="true" className={styles.brandName}>{logo.name}</span>}
          </li>)}
        </ul>)}
      </div>
    </div>
  </section>
}
