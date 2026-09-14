import type React from "react"
import type { Metadata } from "next"
import { Inter, Raleway } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LINKEDIN_COMPANY_URL, SITE_URL } from "@/lib/site-config"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
// Raleway — headings/display font per the 2026 Salary & Hiring Guide design
// system. Only the weights used for display headings are loaded.
const raleway = Raleway({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-raleway" })

const SITE_NAME = "ION Talent"
const SITE_DESCRIPTION =
  "ION Talent provides executive search and specialist recruitment across the GCC and UK, with international reach."
const SITE_TITLE = "ION Talent | Executive Search & Specialist Recruitment"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-primary-web.svg`,
  description: SITE_DESCRIPTION,
  sameAs: [LINKEDIN_COMPANY_URL],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
