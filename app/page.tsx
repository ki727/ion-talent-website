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
      <section className="ion-home-hero relative flex items-center overflow-hidden px-6 pb-16 pt-24 sm:pb-20 sm:pt-28 lg:pb-14 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 z-0 bg-ion-navy" aria-hidden="true">
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
              filter: "grayscale(0.18) saturate(0.84) brightness(0.88) contrast(1.03)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18637270-hd_1920_1080_30fps%20%281%29-Q1nwQiLnflKYyfti4CC4me1eLtnMwk.mp4" type="video/mp4" />
          </video>
          <div className="ion-home-hero-atmosphere" aria-hidden="true" />
          <div className="ion-home-hero-atmosphere ion-home-hero-atmosphere--secondary" aria-hidden="true" />
        </div>

        <div ref={heroContentRef} className="ion-hero-depth pointer-events-auto container relative z-10 mx-auto max-w-6xl">
          <div className="ion-home-hero-copy space-y-5 sm:space-y-6">
            <h1 className="ion-display ion-home-hero-title ion-hero-reveal ion-hero-reveal--1 hero-text-shadow font-bold text-white text-balance">
              Specialist talent solutions that
              <br />
              <span className="ion-hero-teal-accent">transform businesses</span>
            </h1>

            <p className="ion-home-hero-lede ion-hero-reveal ion-hero-reveal--2 hero-text-shadow max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Specialist recruitment and executive search across the GCC and UK, with international reach.
            </p>

            <div className="ion-home-hero-actions ion-hero-reveal ion-hero-reveal--3 flex flex-col gap-4 pt-1 sm:flex-row sm:pt-2">
              <Button
                size="lg"
                className="ion-primary-button ion-hero-button ion-hero-button--primary h-14 w-full gap-2 rounded-xl px-8 text-base focus-visible:ring-2 focus-visible:ring-ion-teal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-ion-navy sm:w-auto"
                onClick={() => scrollToContact()}
              >
                Hire Talent
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>

              <Button
                asChild
                size="lg"
                className="ion-secondary-button ion-hero-button ion-hero-button--secondary h-14 w-full gap-2 rounded-xl px-8 text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:w-auto"
              >
                <Link href="/opportunities">
                  Explore Opportunities
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Restrained signature transition into the section below — the same
            teal → lilac accent used as the salary guide's page spine. */}
        <div
          className="ion-gradient-rule ion-gradient-rule--fade pointer-events-none absolute bottom-0 left-0 right-0 z-10 w-full opacity-90"
          aria-hidden="true"
        />
      </section>

      {/* Proof & Credibility */}
      <section
        id="proof"
        className="ion-home-proof ion-surface-tonal scroll-mt-[100px] border-t border-transparent px-6 py-8 md:py-7 xl:py-[1.375rem]"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="sr-only">Our Track Record</h2>
          <p className="mb-2.5 text-center text-xs font-medium uppercase tracking-wider text-ion-gray">
            Experience Across Leading Organisations
          </p>

          <div className="mb-3 flex min-h-10 flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-11 md:gap-x-14 xl:mb-2.5">
            {[
              { src: "/logos/neom-logo.png", alt: "NEOM", size: "h-10" },
              { src: "/logos/pwc-logo.png", alt: "PwC", size: "h-9" },
              { src: "/logos/bechtel-logo.png", alt: "Bechtel", size: "h-10" },
              { src: "/logos/siemens-logo.png", alt: "Siemens", size: "h-6" },
              { src: "/logos/atos-logo.png", alt: "Atos", size: "h-7" },
            ].map((logo) => (
              <img
                key={logo.alt}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className={`${logo.size} w-auto object-contain grayscale opacity-60 transition-opacity duration-300 hover:opacity-80`}
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 border-t border-ion-navy/10 pt-4 md:grid-cols-3 md:gap-0 xl:pt-3.5">
            <div className="md:px-6">
              <StatCounter end={10} suffix="+" label="Years of Recruitment Experience" startDelay={0} showAccent={false} />
            </div>
            <div className="md:border-l md:border-ion-navy/10 md:px-6">
              <StatCounter end={500} suffix="+" label="Placements Delivered" startDelay={120} showAccent={false} />
            </div>
            <div className="[&_p]:leading-tight md:border-l md:border-ion-navy/10 md:px-6">
              <StatCounter
                end={3}
                label="Core Markets"
                sublabel="UAE · Saudi Arabia · UK"
                startDelay={240}
                showAccent={false}
              />
            </div>
          </div>
          <p className="mx-auto mt-1.5 max-w-md text-center text-sm text-ion-gray xl:mt-1">
            International search capability beyond our core markets.
          </p>
        </div>
      </section>

      <FeaturedJobs />

      <section id="services" className="ion-density-section ion-section-navy scroll-mt-[100px] px-6 py-14 md:py-[4.5rem] xl:py-14">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mb-8 text-center md:mb-10">
            <h2 className="ion-density-section-heading font-display text-4xl lg:text-5xl xl:text-[2.65rem] font-bold text-white mb-3 tracking-tight text-balance">
              How We Work
            </h2>
            <span className="ion-heading-underline ion-heading-underline--bright mx-auto mb-4" aria-hidden="true" />
            <p className="ion-text-on-navy mx-auto max-w-2xl text-lg text-pretty">
              Three comprehensive recruitment solutions tailored to your hiring needs
            </p>
          </FadeIn>

          <div className="ion-density-grid grid grid-cols-1 gap-6 lg:grid-cols-3">
            <FadeIn className="h-full">
              <Card className="ion-density-card ion-card-top-4 group relative h-full overflow-hidden rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md xl:p-5">
                <div className="relative flex h-full flex-col gap-4">
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
                    className="ion-primary-button mt-auto h-12 w-full gap-2 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                    onClick={() => scrollToContact("contingent")}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={100} className="h-full">
              <Card className="ion-density-card ion-card-top-4 group relative h-full overflow-hidden rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md xl:p-5">
                <div className="relative flex h-full flex-col gap-4">
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
                      <span>Agreed delivery and replacement terms</span>
                    </li>
                  </ul>

                  <Button
                    className="ion-primary-button mt-auto h-12 w-full gap-2 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                    onClick={() => scrollToContact("retained")}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={200} className="h-full">
              <Card className="ion-density-card ion-card-top-4 group relative h-full overflow-hidden rounded-[14px] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md xl:p-5">
                <div className="relative flex h-full flex-col gap-4">
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
                    className="ion-primary-button mt-auto h-12 w-full gap-2 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
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

      {/* Salary Guide — single homepage entry point to the gated resource.
          Mobile keeps a small cover thumbnail beside the title/copy (a
          "display:contents" wrapper below md dissolves at md+ so the image,
          text and button fall back to exactly the original 3-column grid on
          tablet/desktop) instead of hiding the cover and
          stretching into a tall text-only card. */}
      <section id="salary-guide-feature" className="ion-density-section border-t border-ion-violet/10 bg-[#F8F7FF] px-6 py-12 md:py-14 xl:py-11">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="ion-density-card ion-card-hairline relative overflow-hidden rounded-[20px] p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 md:p-7 xl:p-6">
              <div className="grid grid-cols-1 items-center gap-5 sm:gap-6 md:grid-cols-[auto_1fr_auto] md:gap-8">
                <div className="flex items-center gap-4 sm:gap-5 md:contents">
                  <img
                    src="/resources/salary-guide-cover.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={800}
                    height={1130}
                    className="ion-home-salary-cover w-20 shrink-0 rounded-lg shadow-md ring-1 ring-black/5 sm:w-24 md:w-[140px] xl:w-32"
                  />
                  <div className="min-w-0">
                    <p className="ion-card-eyebrow mb-1.5 md:mb-2">2026 Salary &amp; Hiring Guide</p>
                    <h2 className="ion-density-section-heading-small font-display text-lg font-bold text-ion-navy mb-1 text-balance sm:text-2xl md:mb-2 md:text-3xl">
                      UAE &amp; Saudi Arabia Salary &amp; Hiring Guide 2026
                    </h2>
                    <p className="text-sm text-ion-gray leading-relaxed sm:text-base md:max-w-xl">
                      Explore salary benchmarks and hiring insight across key specialist and leadership functions.
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  className="ion-primary-button gap-2 h-12 px-8 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 shrink-0 w-full md:w-auto"
                >
                  <Link href="/salary-guide">
                    Get the Guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section
        id="industries"
        className="ion-density-section ion-section-divider scroll-mt-[100px] border-t border-transparent bg-ion-surface px-6 py-16 md:py-12 xl:py-10"
      >
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mb-7 md:mb-6">
            <h2 className="ion-density-section-heading font-display text-4xl lg:text-5xl xl:text-[2.65rem] font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Industry Expertise
            </h2>
            <span className="ion-heading-underline mb-3" aria-hidden="true" />
            <p className="text-lg text-ion-gray">We recruit across all sectors and levels</p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-x-8 border-t border-ion-navy/15 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Technology", desc: "Developers, Engineers, Product Managers, CTOs" },
              { title: "Finance", desc: "Analysts, Managers, Directors, CFOs" },
              { title: "Engineering", desc: "Engineers, Managers, Directors, VPs" },
              { title: "Construction", desc: "Site Managers, Project Managers, Directors" },
              { title: "Cybersecurity", desc: "Analysts, Managers, Directors, CISOs" },
              { title: "Consulting", desc: "Consultants, Managers, Directors, Partners" },
            ].map((industry, i) => (
              <FadeIn key={industry.title} delay={(i % 3) * 100} className="h-full">
                <div className="group h-full border-b border-ion-navy/15 py-4 transition-transform duration-200 hover:translate-x-0.5 xl:py-3.5">
                  <h3 className="mb-1.5 flex items-center gap-2 text-lg font-semibold text-ion-navy transition-colors duration-200 group-hover:text-ion-teal-dark">
                    <span className="ion-dot-teal h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-125" aria-hidden="true" />
                    {industry.title}
                  </h3>
                  <p className="text-sm text-ion-gray leading-relaxed">{industry.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Saudi National Talent — one editorial image/copy pairing, the
          homepage's single dedicated entry point into the new page. Kept to
          one restrained image, paired with copy rather than a full-bleed
          slab, per the site's photography system. */}
      <section className="ion-density-section border-t border-gray-100 bg-white px-6 py-14 md:py-12 xl:py-10">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="ion-card-hairline relative overflow-hidden rounded-[20px] shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="ion-home-saudi-image relative h-56 sm:h-72 md:h-full md:min-h-[250px] xl:min-h-[235px]">
                  <img
                    src="/photography/saudi-kingdom-centre-lilac.jpg"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
                    style={{ filter: "saturate(0.85) contrast(1.08) brightness(0.92)" }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ion-navy/55 via-ion-navy/5 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ion-navy/10" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8 md:p-8 xl:p-7">
                  <p className="ion-card-eyebrow mb-2">Saudi Arabia</p>
                  <h2 className="ion-density-section-heading-small font-display text-2xl sm:text-3xl font-bold text-ion-navy mb-3 text-balance">
                    Saudi National Talent
                  </h2>
                  <p className="text-base text-ion-gray leading-relaxed mb-6 max-w-md">
                    Strategic, long-term hiring of Saudi nationals into key roles, planned early rather
                    than left to chance. See how we support employers with workforce planning and how
                    candidates can explore current opportunities.
                  </p>
                  <div>
                    <Link
                      href="/saudi-national-talent"
                      className="ion-primary-button inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why ION Talent */}
      <section id="approach" className="ion-density-section border-t border-gray-100 bg-ion-surface px-6 py-14 md:py-14 xl:py-12">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mx-auto mb-10 max-w-3xl text-center md:mb-10 xl:mb-8">
            <h2 className="ion-density-section-heading font-display text-4xl lg:text-5xl xl:text-[2.65rem] font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Why ION Talent
            </h2>
            <span className="ion-heading-underline ion-heading-underline--gradient mx-auto mb-6" aria-hidden="true" />
            <p className="text-lg text-ion-gray leading-relaxed">
              Our approach combines deep industry expertise with a commitment to understanding both client needs and
              candidate aspirations, ensuring lasting placements that drive business success.
            </p>
          </FadeIn>

          <div className="ion-density-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn>
              <div className="ion-density-card ion-viewcard ion-viewcard-edge-teal flex h-full items-start gap-4 rounded-[14px] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="ion-icon-circle-teal w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <UserCheck className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-white">Senior-Led Search</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#C7D2DC]">
                    Every assignment is led by experienced recruitment professionals with direct involvement from
                    briefing through to placement.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="ion-density-card ion-viewcard ion-viewcard-edge-violet flex h-full items-start gap-4 rounded-[14px] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="ion-icon-circle-violet w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Radar className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-white">Market-Mapped Delivery</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#C7D2DC]">
                    Targeted search, live market intelligence and direct outreach focused on the people most likely
                    to deliver.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="ion-density-card ion-viewcard ion-viewcard-edge-teal flex h-full items-start gap-4 rounded-[14px] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="ion-icon-circle-teal w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                  <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-white">International Reach</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#C7D2DC]">
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
      <section
        id="contact"
        className="ion-density-section-roomy ion-surface-tonal scroll-mt-[100px] border-t border-ion-border px-6 py-14 md:py-16 xl:py-12"
      >
        <div className="container mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-12 xl:gap-10">
          <div className="mb-8 lg:sticky lg:top-28 lg:mb-0 lg:pt-5">
            <h2 className="ion-density-section-heading font-display text-4xl lg:text-5xl xl:text-[2.65rem] font-semibold text-ion-black mb-4 tracking-tight">
              Tell Us What You Are Hiring For
            </h2>
            <p className="text-lg text-ion-gray">Ready to transform your hiring? Let&apos;s talk.</p>
          </div>

          <div className="ion-density-card relative overflow-hidden rounded-[20px] border border-gray-200 bg-white p-6 shadow-md sm:p-8 md:p-8 xl:p-7">
            <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-70" aria-hidden="true" />
            <EnhancedContactForm initialService={selectedService} />
          </div>
        </div>
      </section>
      </main>

      <SiteFooter />
    </div>
  )
}
