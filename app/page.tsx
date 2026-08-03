"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EnhancedTestimonials } from "@/components/enhanced-testimonials"
import { EnhancedContactForm } from "@/components/enhanced-contact-form"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingContact } from "@/components/floating-contact"
import { FadeIn } from "@/components/fade-in"
import { Target, Award, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect } from "react"
import { CVUploadSection } from "@/components/cv-upload-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.15
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <FloatingContact />

      <SiteHeader />

      <section className="relative pt-40 pb-32 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="hero-zoom w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18637270-hd_1920_1080_30fps%20%281%29-Q1nwQiLnflKYyfti4CC4me1eLtnMwk.mp4" type="video/mp4" />
          </video>
          {/* Navy left-to-right gradient overlay for stronger text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/75 to-[#0F172A]/40" />
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.08] text-balance">
              Elite talent solutions that
              <br />
              <span className="ion-teal-gradient">transform businesses</span>
            </h1>

            <p className="text-xl text-white/85 max-w-2xl leading-relaxed">
              Full-service recruitment agency placing talent across all levels and industries in Europe, Middle East,
              and North America.
            </p>

            <div className="pt-4">
              <Button
                size="lg"
                className="inline-flex items-center gap-2 bg-[#14A8A8] hover:bg-[#0F8F8F] text-white px-8 h-14 text-base rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Your Search
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6 bg-[#F8FAFC] border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <p className="text-xs font-medium text-[#6B7280] tracking-wider uppercase text-center mb-12">
            Trusted by Industry Leaders
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
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
                className="h-8 w-auto object-contain grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight text-balance">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Three comprehensive recruitment solutions tailored to your hiring needs
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FadeIn>
              <Card className="group h-full relative overflow-hidden rounded-[14px] border border-gray-200 p-8 bg-white shadow-sm hover:shadow-lg hover:border-[#14A8A8]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="relative space-y-6">
                  <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center">
                    <Target className="h-7 w-7 text-[#14A8A8]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Contingent</h3>
                    <p className="text-gray-600 mb-6">Pay only when we successfully place the right candidate</p>
                  </div>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>No upfront fees, zero financial risk</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>48-hour shortlist delivery</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>90-day replacement guarantee</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Perfect for volume hiring</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#14A8A8] hover:bg-[#0F8F8F] text-white h-12 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={100}>
              <Card className="group h-full relative overflow-hidden rounded-[14px] border border-gray-200 p-8 bg-white shadow-sm hover:shadow-lg hover:border-[#14A8A8]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="relative space-y-6">
                  <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center">
                    <Award className="h-7 w-7 text-[#14A8A8]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Retained Search</h3>
                    <p className="text-gray-600 mb-6">Premium executive search for senior and hard-to-fill roles</p>
                  </div>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Dedicated senior consultant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Comprehensive market mapping</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Exclusive candidate access</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>6-month guarantee period</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#14A8A8] hover:bg-[#0F8F8F] text-white h-12 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Start a Search
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="group h-full relative overflow-hidden rounded-[14px] border border-gray-200 p-8 bg-white shadow-sm hover:shadow-lg hover:border-[#14A8A8]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="relative space-y-6">
                  <div className="w-14 h-14 bg-[#0F172A] rounded-xl flex items-center justify-center">
                    <Users className="h-7 w-7 text-[#14A8A8]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">RPO / Embedded</h3>
                    <p className="text-gray-600 mb-6">Complete recruitment outsourcing and dedicated team solutions</p>
                  </div>

                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Dedicated recruitment team</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Scalable hiring solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>End-to-end process ownership</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#14A8A8] mt-1 font-bold">✓</span>
                      <span>Cost-effective for volume</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#14A8A8] hover:bg-[#0F8F8F] text-white h-12 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
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

      <section id="industries" className="py-16 md:py-24 px-6 bg-[#F8FAFC] border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mb-16 md:mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight text-balance">
              Industry Expertise
            </h2>
            <p className="text-lg text-[#6B7280]">We recruit across all sectors and levels</p>
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
                <div className="h-full rounded-[14px] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#14A8A8]/50">
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2">{industry.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{industry.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <FadeIn className="mb-14 md:mb-20">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#0F172A] mb-4 tracking-tight text-balance">
              Client Success
            </h2>
            <p className="text-lg text-[#6B7280]">What our clients say about working with us</p>
          </FadeIn>

          <FadeIn>
            <EnhancedTestimonials />
          </FadeIn>
        </div>
      </section>

      {/* Explore Opportunities */}
      <section className="py-16 md:py-24 px-6 bg-[#0F172A] border-t border-[#E5E7EB]">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-block px-4 py-2 bg-[#14A8A8]/15 text-[#22C6B3] text-xs font-medium tracking-wider uppercase mb-6">
                  For Candidates
                </div>
                <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight text-balance">
                  Explore Opportunities
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Register your interest in specialist finance, technology and leadership opportunities
                  across the GCC and international markets.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/opportunities"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#14A8A8] px-7 text-sm font-medium text-white transition-colors hover:bg-[#0F8F8F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                >
                  Explore Opportunities
                </Link>
                <Link
                  href="/opportunities#register"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-500 bg-transparent px-7 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
                >
                  Submit Your CV
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CV Upload Section */}
      <section className="py-32 px-6 border-t border-[#E5E7EB]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16">
            <div className="inline-block px-4 py-2 bg-[#22C6B3]/10 text-[#0F766E] text-xs font-medium tracking-wider uppercase mb-6">
              For Candidates
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#0E0E0E] mb-4 tracking-tight">
              Looking for Your Next Role?
            </h2>
            <p className="text-lg text-[#6B7280]">Join our talent network and get access to exclusive opportunities</p>
          </div>

          <CVUploadSection />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#FAFAFA] border-t border-[#E5E7EB]">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#0E0E0E] mb-4 tracking-tight">About ION Talent</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#6B7280] leading-relaxed mb-6">
              ION Talent is a full-service recruitment agency with over 10 years of experience placing exceptional
              talent across Europe, the Middle East, and North America.
            </p>

            <p className="text-lg text-[#6B7280] leading-relaxed mb-6">
              We specialize in permanent placements across all levels, from graduate roles to C-suite positions, serving
              clients in technology, finance, engineering, construction, cybersecurity, and consulting sectors.
            </p>

            <p className="text-lg text-[#6B7280] leading-relaxed">
              Our approach combines deep industry expertise with a commitment to understanding both client needs and
              candidate aspirations, ensuring lasting placements that drive business success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pt-16 border-t border-[#E5E7EB]">
            <div>
              <div className="text-4xl font-semibold text-[#0E0E0E] mb-2">10+</div>
              <p className="text-sm text-[#6B7280]">Years of Excellence</p>
            </div>

            <div>
              <div className="text-4xl font-semibold text-[#0E0E0E] mb-2">500+</div>
              <p className="text-sm text-[#6B7280]">Successful Placements</p>
            </div>

            <div>
              <div className="text-4xl font-semibold text-[#0E0E0E] mb-2">3</div>
              <p className="text-sm text-[#6B7280]">Continents Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-[#E5E7EB]">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#0E0E0E] mb-4 tracking-tight">Get in Touch</h2>
            <p className="text-lg text-[#6B7280]">Ready to transform your hiring? Let's talk.</p>
          </div>

          <EnhancedContactForm />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16 px-6 border-t border-[#E5E7EB]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div className="flex items-center">
              <img src="/ion-talent-logo.png" alt="ION Talent" className="h-8 w-auto brightness-0 invert" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 text-sm text-gray-400">
              <Link href="#services" className="hover:text-white transition-colors">
                Services
              </Link>
              <Link href="#industries" className="hover:text-white transition-colors">
                Industries
              </Link>
              <Link href="#about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="#contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-sm text-gray-500">
            <p>&copy; 2026 ION Talent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
