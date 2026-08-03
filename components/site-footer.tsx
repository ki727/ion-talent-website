import Link from "next/link"

const FOOTER_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy", href: "/privacy" },
]

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 border-t border-[#E5E7EB]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <Link href="/" className="flex items-center" aria-label="ION Talent home">
            <img src="/ion-talent-logo.png" alt="ION Talent" className="h-8 w-auto brightness-0 invert" />
          </Link>

          <div className="flex flex-col md:flex-row gap-8 text-sm text-gray-400">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>&copy; 2026 ION Talent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
