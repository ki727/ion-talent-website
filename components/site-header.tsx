"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"
import { getEnquiryHref } from "@/lib/enquiry-context"
import { previewHref } from "@/lib/preview-navigation"

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Salary Guide", href: "/salary-guide" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const desktopMarketsRef = useRef<HTMLDetailsElement>(null)
  const mobileMarketsRef = useRef<HTMLDetailsElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isGlobalPreview = pathname === "/global" || pathname.startsWith("/global/")
  const overHomeHero = (pathname === "/" || pathname === "/global") && !scrolled && !mobileMenuOpen
  const enquiryHref = getEnquiryHref(pathname)
  const opportunitiesHref = previewHref("/opportunities", isGlobalPreview)
  const mobileNavLinks = isGlobalPreview
    ? NAV_LINKS.filter(link => ["Services", "Industries", "About"].includes(link.label))
    : NAV_LINKS
  const desktopNavLinks = isGlobalPreview
    ? mobileNavLinks.filter(link => link.label !== "Industries")
    : NAV_LINKS

  const closeMenus = () => {
    setMobileMenuOpen(false)
    if (desktopMarketsRef.current) desktopMarketsRef.current.open = false
    if (mobileMarketsRef.current) mobileMarketsRef.current.open = false
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    if (desktopMarketsRef.current) desktopMarketsRef.current.open = false
  }, [pathname])

  // A resize must release the mobile scroll lock when the full navigation becomes visible.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const update = () => { if (desktop.matches) setMobileMenuOpen(false) }
    desktop.addEventListener("change", update)
    return () => desktop.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const markets = desktopMarketsRef.current
      if (markets?.open && !markets.contains(event.target as Node)) markets.open = false
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && desktopMarketsRef.current?.open) {
        desktopMarketsRef.current.open = false
        desktopMarketsRef.current.querySelector("summary")?.focus()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onEscape)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onEscape)
    }
  }, [])

  // Keep keyboard focus in the expanded header; Escape restores the trigger and page scrolling.
  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const focusFrame = window.requestAnimationFrame(() => mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== "Tab") return
      const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), summary, [tabindex="0"]') ?? [])
        .filter(element => element.getClientRects().length > 0 && element.tabIndex >= 0)
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || !headerRef.current?.contains(document.activeElement))) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !headerRef.current?.contains(document.activeElement))) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [mobileMenuOpen])

  const navLinkClass = `ion-nav-link whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 ${overHomeHero ? "text-white/85 hover:text-white focus-visible:ring-offset-ion-navy" : "text-gray-700 hover:text-gray-900"}`

  return (
    <header ref={headerRef} className={`ion-site-header fixed top-0 z-50 w-full px-6 transition-all duration-300 ${overHomeHero ? "border-b border-white/10 bg-ion-navy/10 text-white backdrop-blur-sm" : "border-b border-gray-200/80 bg-white/90 text-ion-navy shadow-sm backdrop-blur-md"}`}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="ion-site-header-row flex h-[4.5rem] items-center gap-4">
          <Link href={previewHref("/", isGlobalPreview)} onClick={closeMenus} className="flex shrink-0 items-center" aria-label="ION Talent home">
            <img src={overHomeHero ? "/brand/logo-white-web.svg" : "/brand/logo-primary-web.svg"} alt="ION Talent" className="ion-site-header-logo h-8 w-auto sm:h-9 md:h-[2.3rem]" />
          </Link>
          <div className="flex-1" />
          <nav className={`ion-site-header-nav hidden items-center lg:flex ${isGlobalPreview ? "gap-5" : "gap-8"}`} aria-label="Primary">
            {desktopNavLinks.map(link => {
              const href = previewHref(link.href, isGlobalPreview)
              const active = !href.includes("#") && pathname === href
              return <Link key={link.href} href={href} onClick={closeMenus} aria-current={active ? "page" : undefined} data-active={active ? "true" : undefined} className={navLinkClass}>{link.label}</Link>
            })}
            {isGlobalPreview && <details ref={desktopMarketsRef} className="group relative">
              <summary className={`${navLinkClass} cursor-pointer select-none list-none`}>Markets <span aria-hidden="true">⌄</span></summary>
              <nav aria-label="Global market hubs" className="absolute right-0 top-8 z-50 min-w-52 overflow-hidden rounded-xl border border-ion-border bg-white p-2 text-ion-navy shadow-xl">
                {GLOBAL_MARKETS.map(market => <Link key={market.slug} href={`/global/${market.slug}`} onClick={closeMenus} aria-current={pathname === `/global/${market.slug}` ? "page" : undefined} className="block rounded-lg px-3 py-3 text-sm font-medium text-ion-navy hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal">{market.label}</Link>)}
              </nav>
            </details>}
          </nav>
          <div className="ion-site-header-actions hidden shrink-0 items-center gap-3 lg:flex">
            <Button asChild variant="outline" className={`${overHomeHero ? "ion-header-secondary-dark" : "ion-candidate-outline-button"} ion-site-header-cta gap-2 rounded-xl px-5 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2`}>
              <Link href={opportunitiesHref}>{isGlobalPreview ? "Opportunities" : "Explore Opportunities"}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </Button>
            <Button asChild className={`${overHomeHero ? "ion-header-primary-dark" : "ion-primary-button-navy"} ion-site-header-cta gap-2 rounded-xl px-5 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2`}>
              <Link href={enquiryHref}>Hire Talent<ArrowRight className={`h-4 w-4 ${overHomeHero ? "text-white" : "text-ion-teal"}`} aria-hidden="true" /></Link>
            </Button>
          </div>
          <button ref={menuButtonRef} type="button" onClick={() => setMobileMenuOpen(open => !open)} className={`flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal lg:hidden ${overHomeHero ? "text-white" : "text-ion-navy"}`} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-controls="ion-mobile-navigation" aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen && <div ref={mobileMenuRef} id="ion-mobile-navigation" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-gray-100 py-5 lg:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            <div className="mb-3 grid gap-3">
              <Link href={enquiryHref} onClick={closeMenus} className="ion-primary-button-navy flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2">Hire Talent<ArrowRight className="h-4 w-4 text-ion-teal" aria-hidden="true" /></Link>
              <Link href={opportunitiesHref} onClick={closeMenus} className="ion-candidate-outline-button flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2">Explore Opportunities<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
            {mobileNavLinks.map(link => <Link key={link.href} href={previewHref(link.href, isGlobalPreview)} onClick={closeMenus} className="flex min-h-11 items-center rounded-sm text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2">{link.label}</Link>)}
            {isGlobalPreview && <details ref={mobileMarketsRef} className="mt-1 border-t border-gray-200 pt-2">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-sm text-sm font-semibold text-ion-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal">Our markets<span aria-hidden="true">⌄</span></summary>
              <div className="grid gap-1 pb-2 pl-4">{GLOBAL_MARKETS.map(market => <Link key={market.slug} href={`/global/${market.slug}`} onClick={closeMenus} aria-current={pathname === `/global/${market.slug}` ? "page" : undefined} className="flex min-h-11 items-center rounded-sm text-sm font-medium text-ion-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal">{market.label}</Link>)}</div>
            </details>}
          </nav>
        </div>}
      </div>
    </header>
  )
}
