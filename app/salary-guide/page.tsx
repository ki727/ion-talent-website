import type { Metadata } from "next"
import { SalaryGuideClient } from "@/components/salary-guide-client"
import { SALARY_GUIDE_PAGE_URL, SITE_URL } from "@/lib/site-config"

const TITLE = "UAE & Saudi Arabia Salary Guide 2026 | ION Talent"
const DESCRIPTION =
  "Salary benchmarks and hiring insight across the UAE and Saudi Arabia for technology, engineering, finance, commercial, HR, transformation and executive talent."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SALARY_GUIDE_PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SALARY_GUIDE_PAGE_URL,
    siteName: "ION Talent",
    images: [`${SITE_URL}/salary-guide/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/salary-guide/opengraph-image`],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Salary Guide", item: SALARY_GUIDE_PAGE_URL },
  ],
}

export default function SalaryGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SalaryGuideClient />
    </>
  )
}
