"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled ? "border-b border-gray-200/80 shadow-sm" : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="ION Talent home">
            <img src="/ion-logo.svg" alt="" aria-hidden="true" className="h-9 w-9" />
            <img src="/ion-talent-logo.png" alt="ION Talent" className="h-7 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            className="hidden md:inline-flex items-center gap-2 bg-[#14A8A8] hover:bg-[#0F8F8F] text-white text-sm px-6 h-11 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link href="/#contact">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] rounded-lg"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-6">
            <nav className="flex flex-col gap-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 bg-[#14A8A8] hover:bg-[#0F8F8F] text-white text-sm px-6 h-11 rounded-xl w-fit"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
