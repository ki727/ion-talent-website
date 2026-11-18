"use client"

import { useState } from "react"

/** Visible silk-like colour movement without a WebGL/device capability dependency. */
export function GlobalHeroVeil() {
  const [paused, setPaused] = useState(false)
  return <><div className="ion-silk-field" data-paused={paused} aria-hidden="true">
    <div className="ion-silk-glow" />
    <svg className="ion-silk-ribbons" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ion-silk-teal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#006b72" /><stop offset=".45" stopColor="#39dfcc" /><stop offset=".67" stopColor="#137e96" /><stop offset="1" stopColor="#162f68" /></linearGradient>
        <linearGradient id="ion-silk-lilac" x1="0" y1="0" x2="1" y2=".5"><stop stopColor="#3c2679" /><stop offset=".48" stopColor="#c1a0ff" /><stop offset=".7" stopColor="#7463cc" /><stop offset="1" stopColor="#142e52" /></linearGradient>
        <linearGradient id="ion-silk-highlight"><stop stopColor="#b3fff0" stopOpacity="0" /><stop offset=".5" stopColor="#b3fff0" stopOpacity=".7" /><stop offset="1" stopColor="#b3fff0" stopOpacity="0" /></linearGradient>
      </defs>
      <g className="ion-silk-ribbon ion-silk-ribbon--teal"><path d="M340 -250 C1400 -40 530 400 1020 650 S1780 790 1880 1250 L2120 1250 C1830 650 1350 840 1270 490 S1620 -80 690 -300 Z" fill="url(#ion-silk-teal)" /><path d="M340 -250 C1400 -40 530 400 1020 650 S1780 790 1880 1250" fill="none" stroke="url(#ion-silk-highlight)" strokeWidth="3" /></g>
      <g className="ion-silk-ribbon ion-silk-ribbon--lilac"><path d="M1100 -250 C450 100 1760 290 1000 780 S640 1200 1480 1300 L1840 1240 C1070 1060 1610 740 1470 470 S780 100 1430 -200 Z" fill="url(#ion-silk-lilac)" /></g>
      <g className="ion-silk-ribbon ion-silk-ribbon--fine"><path d="M980 -100 C210 380 1740 410 770 1120" fill="none" stroke="url(#ion-silk-highlight)" strokeWidth="65" /></g>
    </svg>
    <div className="ion-silk-copy-shade" />
  </div><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} className="ion-motion-toggle pointer-events-auto absolute bottom-6 right-6 z-20 rounded-full border border-white/30 bg-ion-navy/70 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm hover:bg-ion-navy focus-visible:ring-2 focus-visible:ring-white">{paused ? "Play motion" : "Pause motion"}</button></>
}
