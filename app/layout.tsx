import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LINKEDIN_COMPANY_URL, SITE_URL } from "@/lib/site-config"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const SITE_NAME = "ION Talent"
const SITE_DESCRIPTION =
  "ION Talent provides executive search and specialist recruitment across the GCC and UK, with international reach."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ION Talent - Premium Recruitment Solutions",
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
    title: "ION Talent - Premium Recruitment Solutions",
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: "ION Talent - Premium Recruitment Solutions",
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
    <html lang="en" className={inter.variable}>
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
