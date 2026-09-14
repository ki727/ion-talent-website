"use client"

import type React from "react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FadeIn } from "@/components/fade-in"
import { SalaryGuideForm } from "@/components/salary-guide-form"
import { ArrowRight } from "lucide-react"

const FUNCTION_SECTIONS = [
  {
    title: "Construction & Engineering",
    description: "Project delivery, commercial, controls and engineering leadership.",
  },
  {
    title: "Finance & Accounting",
    description: "Core finance, control, audit and leadership.",
  },
  {
    title: "Sales & Commercial",
    description: "Business development, key accounts and commercial leadership.",
  },
  {
    title: "HR & People",
    description: "HR, talent, reward and people leadership.",
  },
  {
    title: "Project, Programme & Transformation",
    description: "PMO, change, transformation and programme leadership.",
  },
  {
    title: "Technology, Digital & Cybersecurity",
    description: "Engineering, digital delivery and cybersecurity.",
  },
  {
    title: "Cloud, Data, AI, Architecture & ERP",
    description: "Cloud, AI, enterprise architecture and enterprise platforms.",
  },
  {
    title: "Executive & C-Suite",
    description: "Cross-functional executive leadership benchmarks.",
  },
  {
    title: "Hard-to-Hire Talent & Mobility",
    description: "Where search friction is highest and why candidates move.",
  },
  {
    title: "Compensation & Localisation",
    description: "2026 package design and workforce planning considerations.",
  },
]

const CROSS_CUTTING_SECTIONS = [
  {
    title: "UAE vs Saudi Arabia",
    description: "Market mechanics, localisation and candidate mobility across both markets.",
  },
  {
    title: "2026 Hiring Outlook",
    description: "UAE and Saudi hiring climate, compensation direction and talent pressure.",
  },
  {
    title: "Employer & Candidate Takeaways",
    description: "Practical action points for hiring decisions and career moves.",
  },
]

function scrollToForm(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById("lead-form")?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" })
}

export function SalaryGuideClient() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="ion-page-enter">
        {/* Hero */}
        <section className="ion-section-navy relative overflow-hidden px-6 pb-16 pt-28 sm:pt-32 md:pb-20 lg:pt-40">
          <div className="container relative z-10 mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <FadeIn>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal-bright">
                  2026 Salary &amp; Hiring Guide
                </p>
                <h1 className="font-display mt-4 text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
                  UAE &amp; Saudi Arabia
                  <br />
                  Salary &amp; Hiring Guide 2026
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed ion-text-on-navy">
                  Practical salary benchmarks and hiring insight across the UAE and Saudi Arabia, covering
                  specialist, leadership and executive talent.
                </p>

                <div className="mt-8">
                  <a
                    href="#lead-form"
                    onClick={scrollToForm}
                    className="ion-primary-button inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl px-8 text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
                  >
                    Get the Guide
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <p className="mt-3 text-sm text-white/60">Free download &middot; 2026 market data &middot; UAE &amp; Saudi Arabia</p>
                </div>
              </FadeIn>

              <FadeIn delay={120}>
                <div className="relative mx-auto w-full max-w-sm">
                  <div className="ion-gradient-rule absolute -top-3 left-6 right-6 opacity-90" aria-hidden="true" />
                  <img
                    src="/resources/salary-guide-cover.webp"
                    alt="ION Talent UAE & Saudi Arabia Salary & Hiring Guide 2026 cover"
                    width={800}
                    height={1130}
                    className="w-full rounded-xl shadow-2xl ring-1 ring-white/10"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          <div
            className="ion-gradient-rule ion-gradient-rule--fade absolute bottom-0 left-0 right-0 z-10 w-full opacity-90"
            aria-hidden="true"
          />
        </section>

        {/* What's Inside */}
        <section id="whats-inside" className="ion-surface-tonal scroll-mt-[100px] px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <p className="ion-card-eyebrow">What&apos;s Inside</p>
              <h2 className="font-display mt-3 text-4xl font-semibold text-ion-navy tracking-tight text-balance lg:text-5xl">
                A function-by-function view of the market
              </h2>
              <span className="ion-heading-underline ion-heading-underline--gradient mx-auto mt-6" aria-hidden="true" />
              <p className="mt-6 text-lg leading-relaxed text-ion-gray">
                A generalist GCC market view first, followed by salary benchmarks across ten specialist and
                leadership functions — plus a direct UAE vs Saudi Arabia comparison, the 2026 hiring outlook, and
                practical action points for employers and candidates.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FUNCTION_SECTIONS.map((section, i) => (
                <FadeIn key={section.title} delay={(i % 3) * 80}>
                  <div className="ion-card-hairline relative h-full overflow-hidden rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h3 className="mb-2 flex items-start gap-2 text-lg font-semibold text-ion-navy">
                      <span className="ion-dot-teal mt-2 h-2 w-2 shrink-0 rounded-full" aria-hidden="true" />
                      {section.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ion-gray">{section.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {CROSS_CUTTING_SECTIONS.map((section, i) => (
                <FadeIn key={section.title} delay={i * 80}>
                  <div className="ion-viewcard ion-viewcard-edge-teal h-full rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <h3 className="text-base font-semibold text-white">{section.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#C7D2DC]">{section.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Lead form */}
        <section id="lead-form" className="scroll-mt-[100px] border-t border-ion-border px-6 py-16 md:py-24">
          <div className="container mx-auto max-w-3xl">
            <FadeIn className="mb-10 text-center">
              <h2 className="font-display text-4xl font-semibold text-ion-navy tracking-tight lg:text-5xl">
                Get the Guide
              </h2>
              <p className="mt-4 text-lg text-ion-gray">
                Enter your details below and we&apos;ll send your download link straight away.
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="relative overflow-hidden rounded-[20px] border border-gray-200 bg-white p-6 shadow-md sm:p-8 md:p-10">
                <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-70" aria-hidden="true" />
                <SalaryGuideForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
