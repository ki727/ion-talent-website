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
import { IonLiquidAtmosphere } from "@/components/ion-liquid-atmosphere"
import { IonInteractiveSurface } from "@/components/ion-interactive-surface"

const NETWORK_OG_DESCRIPTION =
  "Specialist and leadership opportunities across the GCC and UK, with international reach."

interface RolePageProps {
  params: { slug: string }
}

function getOpportunity(slug: string) {
  return opportunities.find((o) => o.slug === slug)
}

function getSocialRoleTitle(title: string) {
  return title.split(" / ").at(-1) ?? title
}

export function generateMetadata({ params }: RolePageProps): Metadata {
  const opportunity = getOpportunity(params.slug)
  if (!opportunity) {
    return { title: "Role Not Found | ION Talent" }
  }

  const pageTitle = `${opportunity.title} | ION Talent`
  const canonical = `${SITE_URL}/opportunities/${opportunity.slug}`
  const socialTitle = `${getSocialRoleTitle(opportunity.title)} – ${opportunity.locationLabel} | ION Talent`

  // Network/pipeline roles must never look like a confirmed vacancy when
  // shared or previewed on social platforms — only a genuine, explicitly
  // shareable live vacancy gets a role-specific social preview.
  if (!isShareable(opportunity)) {
    return {
      title: pageTitle,
      description: NETWORK_OG_DESCRIPTION,
      alternates: { canonical },
      openGraph: {
        title: socialTitle,
        description: NETWORK_OG_DESCRIPTION,
        type: "website",
        url: canonical,
        siteName: "ION Talent",
      },
      twitter: {
        card: "summary_large_image",
        title: socialTitle,
        description: NETWORK_OG_DESCRIPTION,
      },
    }
  }

  return {
    title: pageTitle,
    description: opportunity.description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description: opportunity.description,
      type: "website",
      url: canonical,
      siteName: "ION Talent",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
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

      <main className="ion-header-offset ion-page-enter pt-20">
        {/* Header: identity, quick facts, primary CTA — grouped into one
            coherent editorial surface near the top */}
        <section className="ion-job-hero ion-liquid-hero ion-liquid-hero--detail relative overflow-hidden border-b border-gray-100 px-6 pb-12 pt-7 md:pb-14 md:pt-9 lg:px-12 xl:pb-8 xl:pt-5">
          <IonLiquidAtmosphere compact />
          <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-60" aria-hidden="true" />
          <div className="relative z-10 container mx-auto max-w-3xl xl:max-w-4xl">
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2 rounded-sm"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All opportunities
            </Link>

            <p className="ion-card-eyebrow mt-5 xl:mt-3">{opportunity.sector}</p>
            <h1 className="ion-density-job-title font-display mt-2 text-3xl font-bold text-gray-900 md:text-4xl xl:mt-1.5 xl:text-[1.75rem] text-balance">
              {opportunity.title}
            </h1>
            <span className="ion-heading-underline ion-heading-underline--gradient mt-3 xl:mt-2" aria-hidden="true" />

          </div>
        </section>

        <section className="ion-job-meta-region ion-page-canvas relative z-20 px-6 lg:px-12">
          <div className="container mx-auto max-w-3xl -translate-y-5 xl:max-w-4xl">
            <IonInteractiveSurface className="ion-job-meta-card rounded-2xl bg-white p-5 shadow-sm md:p-6 xl:p-4">
              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 xl:gap-x-5 xl:gap-y-1.5">
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
                className="ion-candidate-button mt-5 inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2 xl:mt-4"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              {/* Only a genuine, explicitly shareable live vacancy gets public share controls. */}
              {isShareable(opportunity) && <RoleShareControls roleUrl={roleUrl} />}
            </IonInteractiveSurface>
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

        {/* Body: overview, responsibilities, requirements — no repeated
            metadata. Each section gets its own label colour and a hairline
            divider above it (from the second section on) so the copy reads
            as distinct blocks rather than one continuous stretch of text. */}
        <section className="ion-job-body px-6 pb-6 pt-8 md:pb-8 md:pt-10 lg:px-12 xl:pt-3">
          <div className="container mx-auto max-w-3xl space-y-10 xl:max-w-4xl xl:space-y-6">
            <section>
              <h2 className="ion-card-eyebrow mb-3">Overview</h2>
              <p className="text-base leading-relaxed text-gray-600">{opportunity.overview}</p>
            </section>

            <section className="border-t border-gray-100 pt-10 xl:pt-6">
              <h2 className="ion-card-eyebrow mb-3">Responsibilities</h2>
              <ul className="space-y-2">
                {opportunity.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ion-teal" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-gray-100 pt-10 xl:pt-6">
              <h2 className="ion-card-eyebrow mb-3">Requirements</h2>
              <ul className="space-y-2">
                {opportunity.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-base text-gray-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ion-violet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        {/* Application form — the one working candidate flow for this role.
            A distinct tinted section + elevated white card mark this out as
            the conversion zone, clearly separated from the job description
            above. */}
        <section
          id="apply"
          className="ion-density-section ion-surface-tonal scroll-mt-28 border-t border-gray-100 px-6 pt-10 pb-12 md:pt-12 md:pb-14 lg:px-12 xl:pb-10 xl:pt-9"
        >
          <div className="container mx-auto max-w-3xl xl:max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="ion-density-section-heading-small font-display text-2xl font-bold text-gray-900 text-balance md:text-3xl">
                {ctaLabel} for {opportunity.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-600 leading-relaxed">
                Share your details and CV — ION Talent will review your application and be in touch.
              </p>
            </div>
            <div className="ion-density-card relative overflow-hidden rounded-[20px] border border-gray-200 bg-white p-6 shadow-md sm:p-8 xl:p-7">
              <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-70" aria-hidden="true" />
              <RoleApplicationForm
                roleTitle={opportunity.title}
                roleUrl={roleUrl}
                roleCategory={opportunity.sector}
                roleLocation={opportunity.locationLabel}
                roleType={roleType}
              />
            </div>
          </div>
        </section>
      </main>

      <StickyApplyCta label={stickyCtaLabel} targetId="apply" topCtaId="top-apply-cta" />

      <SiteFooter />
    </div>
  )
}
