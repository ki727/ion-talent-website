import Link from "next/link"
import { LinkedinFollowLink } from "@/components/linkedin-follow-link"

const FOOTER_LINKS = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "Salary Guide", href: "/salary-guide" },
  { label: "Saudi National Talent", href: "/saudi-national-talent" },
  { label: "Hire Talent", href: "/#contact" },
  { label: "Refer a Hiring Company", href: "/refer" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/referral-terms" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-ion-border bg-gray-900 px-6 py-12 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
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

        <div className="mb-6">
          <LinkedinFollowLink
            source="footer"
            iconClassName="h-5 w-5 text-[#0A66C2]"
            className="inline-flex h-11 items-center gap-2.5 rounded-lg border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          />
        </div>

        <div className="border-t border-gray-800 pt-6 text-sm text-gray-500">
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
