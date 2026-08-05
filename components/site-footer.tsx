import Link from "next/link"
import { LinkedinFollowLink } from "@/components/linkedin-follow-link"

const FOOTER_LINKS = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "Hire Talent", href: "/#contact" },
  { label: "Refer a Hiring Company", href: "/refer" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/referral-terms" },
]

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 border-t border-ion-border">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <Link href="/" className="flex items-center" aria-label="ION Talent home">
            <img src="/brand/logo-white-web.svg" alt="ION Talent" className="h-7 w-auto" />
          </Link>

          <nav className="flex flex-col md:flex-row md:flex-wrap gap-6 md:gap-8 text-sm text-gray-400">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mb-8">
          <LinkedinFollowLink
            source="footer"
            iconClassName="h-5 w-5 text-[#0A66C2]"
            className="inline-flex h-11 items-center gap-2.5 rounded-lg border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          />
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>&copy; 2026 ION Talent. All rights reserved.</p>
          <p className="mt-1">
            Contact:{" "}
            <a href="mailto:info@iontalentgroup.com" className="hover:text-white transition-colors">
              info@iontalentgroup.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
