"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export function MobileHireCta({ onSelect }: { onSelect: () => void }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".ion-home-hero")
    const contact = document.getElementById("contact")
    const footer = document.querySelector("footer")
    const update = () => {
      const belowHero = !!hero && hero.getBoundingClientRect().bottom < 0
      const contactNear = !!contact && contact.getBoundingClientRect().top < window.innerHeight + 80
      const footerNear = !!footer && footer.getBoundingClientRect().top < window.innerHeight + 80
      const menuOpen = document.body.style.overflow === "hidden"
      setVisible(belowHero && !contactNear && !footerNear && !menuOpen)
    }
    const bodyObserver = new MutationObserver(update)
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["style"] })
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    update()
    return () => { bodyObserver.disconnect(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update) }
  }, [])
  if (!visible) return null
  return <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 lg:hidden"><button type="button" onClick={onSelect} className="ion-primary-button pointer-events-auto inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/40 px-7 text-sm font-semibold shadow-[0_8px_30px_rgba(15,23,42,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-navy focus-visible:ring-offset-2">Tell us about your hire <ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>
}
