"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EnhancedContactForm } from "@/components/enhanced-contact-form"
import { ScrollProgress } from "@/components/scroll-progress"
import { FadeIn } from "@/components/fade-in"
import { FeaturedJobs } from "@/components/featured-jobs"
import { StatCounter } from "@/components/stat-counter"
import { HomepageReferralSection } from "@/components/homepage-referral-section"
import { Target, Award, Users, ArrowRight, UserCheck, Radar, Globe } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // The source clip has a brief bright/mismatched frame right at its start
    // and end, which flashes on every native loop restart (loop jumps to
    // exactly time 0). Rather than relying on the browser's native loop
    // point, we preemptively seek a fraction of a second before the true
    // end back to a fraction of a second after the true start — so playback
    // never actually reaches either edge frame. `loop` stays on as a no-op
    // safety net: this seek always fires first, so native looping never
    // triggers in practice.
    const LOOP_START = 0.3
    const LOOP_END_BUFFER = 0.3

    video.playbackRate = 0.15
    video.play().catch((error) => {
      console.error("Video autoplay failed:", error)
    })

    function handleTimeUpdate() {
      if (!video || !video.duration) return
      if (video.currentTime >= video.duration - LOOP_END_BUFFER) {
        video.currentTime = LOOP_START
      }
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    return () => video.removeEventListener("timeupdate", handleTimeUpdate)
  }, [])

  // Extremely restrained desktop-only hero depth: content drifts a handful
  // of px on initial scroll. Disabled on mobile and for reduced-motion —
  // both checked once on mount, matching the effect's "very subtle, desktop
  // polish only" scope rather than a effect that needs to track live resizes.
  useEffect(() => {
    const el = heroContentRef.current
    if (!el) return
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!isDesktop || prefersReduced) return

    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.04, 8)
        el?.style.setProperty("--hero-depth-offset", `${offset}px`)
        ticking = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToContact = (service?: string) => {
    if (service) setSelectedService(service)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />

      <SiteHeader />

      <main className="ion-page-enter">
      <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-ion-navy">
          <video
            ref={videoRef}
            className="hero-zoom w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              filter: "grayscale(0.45) saturate(0.6) brightness(0.85) contrast(1.05)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18637270-hd_1920_1080_30fps%20%281%29-Q1nwQiLnflKYyfti4CC4me1eLtnMwk.mp4" type="video/mp4" />
          </video>
          {/* Flat scrim for a consistent baseline of contrast, regardless of how bright the underlying footage is */}
          <div className="absolute inset-0 bg-ion-navy/45" />
          {/* Directional gradient, strongest behind the copy, easing off toward the skyline on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-ion-navy/85 via-ion-navy/55 to-ion-navy/10" />
        </div>

        <div ref={heroContentRef} className="ion-hero-depth container mx-auto relative z-10 max-w-5xl">
          <div className="space-y-6 sm:space-y-8">
            <h1 className="hero-text-shadow text-5xl lg:text-6xl font-bold text-white leading-[1.08] text-balance">
              Elite talent solutions that
              <br />
              <span className="ion-hero-teal-accent">transform businesses</span>
            </h1>

            <p className="hero-text-shadow text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
              Specialist recruitment and executive search across the GCC and UK, with international reach.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="ion-primary-button w-full sm:w-auto gap-2 px-8 h-14 text-base rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                onClick={() => scrollToContact()}
              >
                Hire Talent
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>

              <Button
                asChild
                size="lg"
                className="ion-secondary-button w-full sm:w-auto gap-2 px-8 h-14 text-base rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <Link href="/opportunities">
                  Explore Opportunities
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Proof & Credibility */}
      <section id="proof" className="scroll-mt-24 py-16 md:py-24 px-6 bg-ion-surface border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="sr-only">Our Track Record</h2>
          <FadeIn className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-lg text-ion-gray leading-relaxed mb-4">
              Specialist recruitment and executive search across the GCC and UK, with international reach.
            </p>
            <p className="text-lg text-ion-gray leading-relaxed">
              We specialize in permanent placements across all levels, from graduate roles to C-suite positions,
              serving clients in technology, finance, engineering, construction, cybersecurity, and consulting
              sectors.
            </p>
          </FadeIn>

          <p className="text-xs font-medium text-ion-gray tracking-wider uppercase text-center mb-8">
            Experience Across Leading Organisations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 md:gap-x-16 md:gap-y-10 mb-10">
            {[
              { src: "/logos/neom-logo.png", alt: "NEOM" },
              { src: "/logos/pwc-logo.png", alt: "PwC" },
              { src: "/logos/bechtel-logo.png", alt: "Bechtel" },
              { src: "/logos/siemens-logo.png", alt: "Siemens" },
              { src: "/logos/atos-logo.png", alt: "Atos" },
            ].map((logo) => (
              <img
                key={logo.alt}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className="h-9 sm:h-8 w-auto object-contain grayscale opacity-60 sm:opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8 border-t border-ion-border max-w-4xl mx-auto">
            <StatCounter end={10} suffix="+" label="Years of Recruitment Experience" startDelay={0} />
            <StatCounter end={500} suffix="+" label="Placements Delivered" startDelay={120} />
            <StatCounter
              end={3}
              label="Core Markets"
              sublabel="UAE · Saudi Arabia · UK"
              startDelay={240}
            />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm text-ion-gray">
            International search capability beyond our core markets.
          </p>
        </div>
      </section>

      <FeaturedJobs />

      <section id="services" className="ion-section-navy scroll-mt-24 py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight text-balance">
              How We Work
            </h2>
            <span className="ion-heading-underline ion-heading-underline--bright mx-auto mb-6" aria-hidden="true" />
            <p className="ion-text-on-navy text-xl max-w-2xl mx-auto text-pretty">
              Three comprehensive recruitment solutions tailored to your hiring needs
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            <FadeIn>
              <Card className="ion-card-top-4 group h-full relative overflow-hidden rounded-[14px] p-8 lg:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="relative space-y-6 lg:space-y-4">
                  <div className="ion-icon-circle-teal w-14 h-14 lg:w-11 lg:h-11 rounded-full flex items-center justify-center">
                    <Target className="h-7 w-7 lg:h-5 lg:w-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl lg:text-xl font-bold text-ion-navy mb-3 lg:mb-2">Contingent</h3>
                    <p className="text-gray-600 mb-6 lg:mb-4 lg:text-sm">Pay only when we successfully place the right candidate</p>
                  </div>

                  <ul className="space-y-3 lg:space-y-2 text-gray-700 lg:text-sm">
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Commercial terms aligned to successful delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Replacement protection available under agreed terms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Flexible support for specialist and multi-hire requirements</span>
                    </li>
                  </ul>

                  <Button
                    className="ion-primary-button w-full gap-2 h-12 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                    onClick={() => scrollToContact("contingent")}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={100}>
              <Card className="ion-card-top-4 group h-full relative overflow-hidden rounded-[14px] p-8 lg:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="relative space-y-6 lg:space-y-4">
                  <div className="ion-icon-circle-teal w-14 h-14 lg:w-11 lg:h-11 rounded-full flex items-center justify-center">
                    <Award className="h-7 w-7 lg:h-5 lg:w-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl lg:text-xl font-bold text-ion-navy mb-3 lg:mb-2">Retained Search</h3>
                    <p className="text-gray-600 mb-6 lg:mb-4 lg:text-sm">Premium executive search for senior and hard-to-fill roles</p>
                  </div>

                  <ul className="space-y-3 lg:space-y-2 text-gray-700 lg:text-sm">
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Dedicated senior consultant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Comprehensive market mapping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Exclusive candidate access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>6-month guarantee period</span>
                    </li>
                  </ul>

                  <Button
                    className="ion-primary-button w-full gap-2 h-12 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                    onClick={() => scrollToContact("retained")}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="ion-card-top-4 group h-full relative overflow-hidden rounded-[14px] p-8 lg:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="relative space-y-6 lg:space-y-4">
                  <div className="ion-icon-circle-teal w-14 h-14 lg:w-11 lg:h-11 rounded-full flex items-center justify-center">
                    <Users className="h-7 w-7 lg:h-5 lg:w-5 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl lg:text-xl font-bold text-ion-navy mb-3 lg:mb-2">RPO / Embedded</h3>
                    <p className="text-gray-600 mb-6 lg:mb-4 lg:text-sm">Complete recruitment outsourcing and dedicated team solutions</p>
                  </div>

                  <ul className="space-y-3 lg:space-y-2 text-gray-700 lg:text-sm">
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Dedicated recruitment team</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Scalable hiring solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>End-to-end process ownership</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="ion-text-deep-teal mt-1 font-bold">✓</span>
                      <span>Cost-effective for volume</span>
                    </li>
                  </ul>

                  <Button
                    className="ion-primary-button w-full gap-2 h-12 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                    onClick={() => scrollToContact("rpo")}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="industries" className="scroll-mt-24 py-16 md:py-24 px-6 bg-ion-surface border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mb-16 md:mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Industry Expertise
            </h2>
            <span className="ion-heading-underline mb-4" aria-hidden="true" />
            <p className="text-lg text-ion-gray">We recruit across all sectors and levels</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Technology", desc: "Developers, Engineers, Product Managers, CTOs" },
              { title: "Finance", desc: "Analysts, Managers, Directors, CFOs" },
              { title: "Engineering", desc: "Engineers, Managers, Directors, VPs" },
              { title: "Construction", desc: "Site Managers, Project Managers, Directors" },
              { title: "Cybersecurity", desc: "Analysts, Managers, Directors, CISOs" },
              { title: "Consulting", desc: "Consultants, Managers, Directors, Partners" },
            ].map((industry, i) => (
              <FadeIn key={industry.title} delay={(i % 3) * 100}>
                <div className="ion-card-left-4 h-full rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <h3 className="mb-2 flex items-center gap-2 text-xl font-semibold text-ion-navy">
                    <span className="ion-dot-teal h-2.5 w-2.5 shrink-0 rounded-full" aria-hidden="true" />
                    {industry.title}
                  </h3>
                  <p className="text-sm text-ion-gray leading-relaxed">{industry.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why ION Talent */}
      <section id="approach" className="py-16 md:py-24 px-6 bg-ion-surface border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Why ION Talent
            </h2>
            <span className="ion-heading-underline mx-auto mb-6" aria-hidden="true" />
            <p className="text-lg text-ion-gray leading-relaxed">
              Our approach combines deep industry expertise with a commitment to understanding both client needs and
              candidate aspirations, ensuring lasting placements that drive business success.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn>
              <div className="ion-card-top-3 h-full flex items-start gap-4 rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="ion-icon-circle-teal w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <UserCheck className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-gray-900">Senior-Led Search</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Every assignment is led by experienced recruitment professionals with direct involvement from
                    briefing through to placement.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="ion-card-top-3 h-full flex items-start gap-4 rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="ion-icon-circle-teal w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Radar className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-gray-900">Market-Mapped Delivery</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Targeted search, live market intelligence and direct outreach focused on the people most likely
                    to deliver.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="ion-card-top-3 h-full flex items-start gap-4 rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="ion-icon-circle-teal w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-gray-900">International Reach</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Established networks across the GCC and UK, supported by international search capability for
                    hard-to-find talent.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <HomepageReferralSection />

      {/* Employer Enquiry Form */}
      <section id="contact" className="scroll-mt-24 py-16 md:py-24 px-6 border-t border-ion-border bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-semibold text-ion-black mb-4 tracking-tight">
              Tell Us What You Are Hiring For
            </h2>
            <p className="text-lg text-ion-gray">Ready to transform your hiring? Let&apos;s talk.</p>
          </div>

          <EnhancedContactForm initialService={selectedService} />
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
