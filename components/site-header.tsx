"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
      className={`fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "border-b border-gray-200/80 shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center h-20 gap-4">
          {/* Official ION Talent wordmark — web-optimised derivative of public/brand/logo-primary-2026-08-04.svg */}
          <Link href="/" className="flex shrink-0 items-center" aria-label="ION Talent home">
            <img src="/brand/logo-primary-web.svg" alt="ION Talent" className="h-8 sm:h-9 md:h-10 w-auto" />
          </Link>

          {/* Spacer */}
          <div className="flex-1" />

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive = link.href.startsWith("/") && !link.href.includes("#") && pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  data-active={isActive ? "true" : undefined}
                  className="ion-nav-link whitespace-nowrap text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 rounded-sm"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Button
              asChild
              variant="outline"
              className="gap-2 text-sm px-5 rounded-xl border-2 border-ion-teal bg-white text-ion-teal-dark shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-50 hover:text-ion-teal-dark hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
            >
              <Link href="/opportunities">
                Explore Opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              className="ion-primary-button gap-2 text-sm px-5 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
            >
              <Link href="/#contact">
                Hire Talent
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal rounded-lg"
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
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border-2 border-ion-teal bg-white px-6 text-sm font-medium text-ion-teal-dark transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
                >
                  Explore Opportunities
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ion-primary-button flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                >
                  Hire Talent
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
