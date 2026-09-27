"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

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
  const pathname = usePathname()
  const overHomeHero = pathname === "/" && !scrolled && !mobileMenuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Prevent awkward background scrolling behind the fixed header while the
  // mobile menu is open.
  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`ion-site-header fixed top-0 z-50 w-full px-6 transition-all duration-300 ${
        overHomeHero
          ? "border-b border-white/10 bg-ion-navy/10 text-white backdrop-blur-sm"
          : "border-b border-gray-200/80 bg-white/90 text-ion-navy shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="ion-site-header-row flex h-[4.5rem] items-center gap-4">
          {/* Official ION Talent wordmark — web-optimised derivative of public/brand/logo-primary-2026-08-04.svg */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="ION Talent home">
            <img
              src={overHomeHero ? "/brand/logo-white-web.svg" : "/brand/logo-primary-web.svg"}
              alt="ION Talent"
              className="ion-site-header-logo h-8 w-auto sm:h-9 md:h-[2.3rem]"
            />
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          <nav className="ion-site-header-nav hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith("/") && !link.href.includes("#") && pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive ? "true" : undefined}
                  className={`ion-nav-link whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 ${
                    overHomeHero ? "text-white/85 hover:text-white focus-visible:ring-offset-ion-navy" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="ion-site-header-actions hidden lg:flex items-center gap-3 shrink-0">
            <Button
              asChild
              variant="outline"
              className={`${overHomeHero ? "ion-header-secondary-dark" : "ion-candidate-outline-button"} ion-site-header-cta gap-2 rounded-xl px-5 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2`}
            >
              <Link href="/opportunities">
                Explore Opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            {/* Employer-journey CTA — navy fill (distinct from the hero's
                teal "Hire Talent") with a small teal accent on the arrow. */}
            <Button
              asChild
              className={`${overHomeHero ? "ion-header-primary-dark" : "ion-primary-button-navy"} ion-site-header-cta gap-2 rounded-xl px-5 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2`}
            >
              <Link href="/#contact">
                Hire Talent
                <ArrowRight className={`h-4 w-4 ${overHomeHero ? "text-white" : "text-ion-teal"}`} />
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal lg:hidden ${
              overHomeHero ? "text-white" : "text-ion-navy"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-6">
            <nav className="flex flex-col gap-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] w-full items-center text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 rounded-sm"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex flex-col gap-3">
                <Link
                  href="/opportunities"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ion-candidate-outline-button flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2"
                >
                  Explore Opportunities
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ion-primary-button-navy flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                >
                  Hire Talent
                  <ArrowRight className="h-4 w-4 text-ion-teal" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
