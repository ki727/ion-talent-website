"use client"

import { Button } from "@/components/ui/button"
import { EnhancedContactForm } from "@/components/enhanced-contact-form"
import { ScrollProgress } from "@/components/scroll-progress"
import { FadeIn } from "@/components/fade-in"
import { FeaturedJobs } from "@/components/featured-jobs"
import { StatCounter } from "@/components/stat-counter"
import { HomepageReferralSection } from "@/components/homepage-referral-section"
import { Target, Award, Users, ArrowRight, UserCheck, Radar, Globe, Check } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

/* Three parallel service tiers — presented with total visual parity
   (same card, same icon treatment, same CTA) since they're options to
   compare, not a ranked "flagship vs. the rest" comparison. */
const SERVICES = [
  {
    icon: Target,
    title: "Contingent",
    tagline: "Pay only when we successfully place the right candidate",
    formValue: "contingent",
    points: [
      "Commercial terms aligned to successful delivery",
      "Replacement protection available under agreed terms",
      "Flexible support for specialist and multi-hire requirements",
    ],
  },
  {
    icon: Award,
    title: "Retained Search",
    tagline: "Premium executive search for senior and hard-to-fill roles",
    formValue: "retained",
    points: [
      "Dedicated senior consultant",
      "Comprehensive market mapping",
      "Exclusive candidate access",
      "Agreed delivery and replacement terms",
    ],
  },
  {
    icon: Users,
    title: "RPO / Embedded",
    tagline: "Complete recruitment outsourcing and dedicated team solutions",
    formValue: "rpo",
    points: [
      "Dedicated recruitment team",
      "Scalable hiring solutions",
      "End-to-end process ownership",
      "Cost-effective for volume",
    ],
  },
]

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
            <h1 className="font-display hero-text-shadow text-5xl lg:text-6xl font-bold text-white leading-[1.08] text-balance">
              Specialist talent solutions that
              <br />
              <span className="ion-hero-underline-accent">transform businesses</span>
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

        {/* Restrained signature transition into the section below — the same
            teal → lilac accent used as the salary guide's page spine. */}
        <div
          className="ion-gradient-rule ion-gradient-rule--fade absolute bottom-0 left-0 right-0 z-10 w-full opacity-90"
          aria-hidden="true"
        />
      </section>

      {/* Proof & Credibility */}
      <section
        id="proof"
        className="ion-surface-tonal scroll-mt-[100px] py-16 md:py-24 px-6 border-t border-transparent"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="sr-only">Our Track Record</h2>
          <FadeIn className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-lg text-ion-gray leading-relaxed mb-4">
              Specialist recruitment and executive search across the GCC and UK, with international reach.
            </p>
            <p className="mx-auto max-w-2xl text-lg text-ion-gray leading-relaxed">
              We specialise in permanent placements across all levels, from graduate roles to C-suite positions,
              serving clients in technology, finance, engineering, construction, cybersecurity and consulting
              sectors.
            </p>
          </FadeIn>

          <p className="text-xs font-medium text-ion-gray tracking-wider uppercase text-center mb-8">
            Experience Across Leading Organisations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-12 md:gap-x-16 md:gap-y-10 mb-10 md:mb-16">
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
                className="h-9 sm:h-8 w-auto object-contain grayscale opacity-70 sm:opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            ))}
          </div>

          {/* Restrained teal → lilac micro-detail connecting this section to
              the wider system — the divider above the stats, not the numbers
              themselves. */}
          <div className="ion-gradient-rule mx-auto mb-8 w-16 opacity-80" aria-hidden="true" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
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

      <section id="services" className="ion-section-navy scroll-mt-[100px] py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight text-balance">
              How We Work
            </h2>
            <span className="ion-heading-underline ion-heading-underline--bright mx-auto mb-6" aria-hidden="true" />
            <p className="ion-text-on-navy text-xl max-w-2xl mx-auto text-pretty">
              Three comprehensive recruitment solutions tailored to your hiring needs
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.title} delay={i * 100}>
                <div className="ion-glass-card-navy group h-full rounded-[16px] p-8 lg:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <service.icon className="h-5 w-5 text-white/80" aria-hidden="true" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#C7D2DC]">{service.tagline}</p>

                  <ul className="mt-6 space-y-2.5">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[#C7D2DC]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ion-teal-bright" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="ion-secondary-button mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ion-navy"
                    onClick={() => scrollToContact(service.formValue)}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise — an editorial list rather than a sixth card
          grid on the page. A plain divided list reads as a specialism
          manifest (closer to a consultancy capability statement) instead
          of a repeat of the card-grid template used elsewhere. */}
      <section id="industries" className="scroll-mt-[100px] bg-white py-16 md:py-24 px-6 border-t border-gray-100">
        <div className="container mx-auto max-w-3xl">
          <FadeIn className="mb-10 md:mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-ion-navy mb-3 tracking-tight text-balance">
              Industry Expertise
            </h2>
            <span className="ion-heading-underline mb-4" aria-hidden="true" />
            <p className="text-lg text-ion-gray">We recruit across all sectors and levels</p>
          </FadeIn>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {[
              { title: "Technology", desc: "Developers, Engineers, Product Managers, CTOs" },
              { title: "Finance", desc: "Analysts, Managers, Directors, CFOs" },
              { title: "Engineering", desc: "Engineers, Managers, Directors, VPs" },
              { title: "Construction", desc: "Site Managers, Project Managers, Directors" },
              { title: "Cybersecurity", desc: "Analysts, Managers, Directors, CISOs" },
              { title: "Consulting", desc: "Consultants, Managers, Directors, Partners" },
            ].map((industry, i) => (
              <FadeIn key={industry.title} delay={(i % 3) * 80}>
                <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="shrink-0 text-lg font-semibold text-ion-navy sm:w-56">{industry.title}</h3>
                  <p className="text-sm text-ion-gray sm:text-right">{industry.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Saudi National Talent — editorial image/copy pairing, the
          homepage's single dedicated entry point into the new page. A pale
          neutral section (not a bordered white card) with the photograph
          bleeding to the section edge, so it reads as a chapter of its own
          rather than another card floating on white. */}
      <section className="ion-surface-pale py-16 md:py-24 px-6 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-0">
              <div className="group relative h-64 overflow-hidden rounded-[20px] shadow-lg sm:h-80 md:h-[380px] md:rounded-r-none">
                <img
                  src="/photography/saudi-kafd-geometry.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  style={{ filter: "saturate(0.85) contrast(1.08) brightness(0.92)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ion-navy/55 via-ion-navy/5 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ion-navy/15" />
              </div>
              <div className="ion-section-navy relative flex flex-col justify-center overflow-hidden rounded-[20px] p-8 shadow-lg sm:p-10 md:h-[380px] md:rounded-l-none md:p-12">
                <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-80" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal-bright mb-2">
                  Saudi Arabia
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 text-balance">
                  Saudi National Talent
                </h2>
                <p className="text-base leading-relaxed mb-6 max-w-md ion-text-on-navy">
                  Strategic, long-term hiring of Saudi nationals into key roles, planned early rather
                  than left to chance. See how we support employers with workforce planning, and how
                  candidates can explore current opportunities.
                </p>
                <div>
                  <Link
                    href="/saudi-national-talent"
                    className="ion-primary-button inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 w-fit"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Salary Guide — single homepage entry point to the gated resource,
          given an editorial-report feel (tilted cover with real depth, pale
          lilac/teal chapter surface) rather than reading as another
          horizontal white card. Mobile keeps the cover beside the
          title/copy (a "display:contents" wrapper below md dissolves at
          md+ so the image, text and button fall back to exactly the
          original 3-column grid on tablet/desktop, unchanged). */}
      <section className="ion-surface-tonal py-16 md:py-24 px-6 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[20px] bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6 md:p-10">
              <div className="ion-gradient-rule absolute top-0 left-0 right-0 opacity-80" aria-hidden="true" />
              <div className="grid grid-cols-1 items-center gap-5 sm:gap-6 md:grid-cols-[auto_1fr_auto] md:gap-10">
                <div className="flex items-center gap-4 sm:gap-5 md:contents">
                  <img
                    src="/resources/salary-guide-cover.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width={800}
                    height={1130}
                    className="w-20 shrink-0 rounded-lg shadow-xl ring-1 ring-black/5 -rotate-2 sm:w-24 md:w-36"
                  />
                  <div className="min-w-0">
                    <p className="ion-card-eyebrow mb-1.5 md:mb-2">2026 Salary &amp; Hiring Guide</p>
                    <h2 className="font-display text-lg font-bold text-ion-navy mb-1 text-balance sm:text-2xl md:mb-2 md:text-3xl">
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

      {/* Why ION Talent — a confident, photo-free editorial moment on navy.
          No stock photography here: after review, the abstract human image
          didn't say anything specific about ION, and a forced inset-thumbnail
          collage read as decoration rather than substance. A large statement
          plus a plain numbered list carries the section on typography and
          space alone — a deliberate contrast to the image-led sections either
          side of it. */}
      <section id="approach" className="bg-ion-navy px-6 py-20 md:py-28 border-t border-gray-100">
        <div className="container mx-auto max-w-5xl">
          <FadeIn className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight text-balance">
              Why ION Talent
            </h2>
            <span className="ion-heading-underline ion-heading-underline--gradient mb-6" aria-hidden="true" />
            <p className="ion-text-on-navy text-lg leading-relaxed max-w-xl">
              Our approach combines deep industry expertise with a commitment to understanding both
              client needs and candidate aspirations, ensuring lasting placements that drive business
              success.
            </p>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:grid-cols-3 md:gap-12">
            <FadeIn delay={0}>
              <div className="flex items-center gap-2 text-white/35">
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-[0.2em]">01</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Senior-Led Search</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#C7D2DC]">
                Every assignment is led by experienced recruitment professionals with direct
                involvement from briefing through to placement.
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="flex items-center gap-2 text-white/35">
                <Radar className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-[0.2em]">02</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Market-Mapped Delivery</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#C7D2DC]">
                Targeted search, live market intelligence and direct outreach focused on the people
                most likely to deliver.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex items-center gap-2 text-white/35">
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-[0.2em]">03</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">International Reach</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#C7D2DC]">
                Established networks across the GCC and UK, supported by international search
                capability for hard-to-find talent.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <HomepageReferralSection />

      {/* Employer Enquiry Form */}
      <section
        id="contact"
        className="ion-surface-tonal scroll-mt-[100px] py-16 md:py-24 px-6 border-t border-ion-border"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-ion-black mb-4 tracking-tight">
              Tell Us What You Are Hiring For
            </h2>
            <p className="text-lg text-ion-gray">Ready to transform your hiring? Let&apos;s talk.</p>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-gray-200 bg-white p-6 shadow-md sm:p-8 md:p-10">
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
