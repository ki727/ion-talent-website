import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Briefcase, MapPin, TrendingUp } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RoleApplicationForm } from "@/components/role-application-form"
import { StickyApplyCta } from "@/components/sticky-apply-cta"
import { RoleShareControls } from "@/components/role-share-controls"
import { opportunities, isLiveVacancy, isShareable, getRoleTypeLabel, getApplyCtaLabel } from "@/lib/opportunities"
import { SITE_URL } from "@/lib/site-config"

const NETWORK_OG_TITLE = "Join the ION Talent Network | ION Talent"
const NETWORK_OG_DESCRIPTION =
  "Specialist and leadership opportunities across the GCC and UK, with international reach."

interface RolePageProps {
  params: { slug: string }
}

function getOpportunity(slug: string) {
  return opportunities.find((o) => o.slug === slug)
}

export function generateMetadata({ params }: RolePageProps): Metadata {
  const opportunity = getOpportunity(params.slug)
  if (!opportunity) {
    return { title: "Role Not Found | ION Talent" }
  }

  const pageTitle = `${opportunity.title} | ION Talent`
  const canonical = `${SITE_URL}/opportunities/${opportunity.slug}`

  // Network/pipeline roles must never look like a confirmed vacancy when
  // shared or previewed on social platforms — only a genuine, explicitly
  // shareable live vacancy gets a role-specific social preview.
  if (!isShareable(opportunity)) {
    return {
      title: pageTitle,
      description: NETWORK_OG_DESCRIPTION,
      alternates: { canonical },
      openGraph: {
        title: NETWORK_OG_TITLE,
        description: NETWORK_OG_DESCRIPTION,
        type: "website",
        url: canonical,
        siteName: "ION Talent",
      },
      twitter: {
        card: "summary_large_image",
        title: NETWORK_OG_TITLE,
        description: NETWORK_OG_DESCRIPTION,
      },
    }
  }

  const ogTitle = `${opportunity.title} | ${opportunity.locationLabel} | ION Talent`
  return {
    title: pageTitle,
    description: opportunity.description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: opportunity.description,
      type: "website",
      url: canonical,
      siteName: "ION Talent",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opportunity.description,
    },
  }
}

export default function RolePage({ params }: RolePageProps) {
  const opportunity = getOpportunity(params.slug)
  if (!opportunity) notFound()

  const ctaLabel = isLiveVacancy(opportunity) ? "Apply" : "Register Interest"
  const roleType = getRoleTypeLabel(opportunity)
  const roleUrl = `/opportunities/${opportunity.slug}`
  // Matches the exact label used by the application form's own submit button.
  const stickyCtaLabel = getApplyCtaLabel(opportunity)

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="ion-page-enter pt-20">
        {/* Header: identity, quick facts, primary CTA — all near the top */}
        <section className="border-b border-gray-100 bg-gray-50/60 px-6 py-8 md:py-10 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 rounded-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All opportunities
            </Link>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal-dark">
              {opportunity.sector}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl text-balance">{opportunity.title}</h1>

            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gray-400" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd>{opportunity.locationLabel}</dd>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-gray-400" aria-hidden="true" />
                <dt className="sr-only">Employment type</dt>
                <dd>{opportunity.employmentLabel}</dd>
              </div>
              {opportunity.seniority && (
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <dt className="sr-only">Seniority</dt>
                  <dd>{opportunity.seniority}</dd>
                </div>
              )}
            </dl>

            <a
              id="top-apply-cta"
              href="#apply"
              className="ion-primary-button mt-8 inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Only a genuine, explicitly shareable live vacancy gets public share controls. */}
            {isShareable(opportunity) && <RoleShareControls roleUrl={roleUrl} />}
          </div>
        </section>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Opportunities", item: `${SITE_URL}/opportunities` },
                { "@type": "ListItem", position: 3, name: opportunity.title, item: `${SITE_URL}${roleUrl}` },
              ],
            }),
          }}
        />

        {isShareable(opportunity) && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "JobPosting",
                title: opportunity.title,
                description: opportunity.overview,
                hiringOrganization: {
                  "@type": "Organization",
                  name: "ION Talent",
                },
                jobLocation: {
                  "@type": "Place",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: opportunity.locationLabel,
                  },
                },
                employmentType: opportunity.employmentTypes,
              }),
            }}
          />
        )}

        {/* Body: overview, responsibilities, requirements — no repeated metadata */}
        <section className="px-6 pt-8 pb-6 md:pt-10 md:pb-8 lg:px-12">
          <div className="container mx-auto max-w-3xl space-y-8">
            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">Overview</h2>
              <p className="text-base leading-relaxed text-gray-600">{opportunity.overview}</p>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">Responsibilities</h2>
              <ul className="space-y-2">
                {opportunity.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ion-teal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-900">Requirements</h2>
              <ul className="space-y-2">
                {opportunity.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ion-teal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        {/* Application form — the one working candidate flow for this role */}
        <section id="apply" className="scroll-mt-28 border-t border-gray-100 bg-gray-50/60 px-6 pt-6 pb-12 md:pt-8 md:pb-14 lg:px-12">
          <div className="container mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 text-balance md:text-3xl">
                {ctaLabel} for {opportunity.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-600 leading-relaxed">
                Share your details and CV — ION Talent will review your application and be in touch.
              </p>
            </div>
            <RoleApplicationForm
              roleTitle={opportunity.title}
              roleUrl={roleUrl}
              roleCategory={opportunity.sector}
              roleLocation={opportunity.locationLabel}
              roleType={roleType}
            />
          </div>
        </section>
      </main>

      <StickyApplyCta label={stickyCtaLabel} targetId="apply" topCtaId="top-apply-cta" />

      <SiteFooter />
    </div>
  )
}
