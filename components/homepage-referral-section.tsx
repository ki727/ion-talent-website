"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { FadeIn } from "@/components/fade-in"
import { ReferralDrawer } from "@/components/referral-drawer"
import { CalendlyButton } from "@/components/calendly-button"
import { trackEvent } from "@/lib/analytics"

const SOURCE = "homepage"

/** Premium homepage referral section — sits immediately before the employer hiring-enquiry section. */
export function HomepageReferralSection() {
  const viewRef = useRef<HTMLDivElement>(null)
  const trackedRef = useRef(false)

  useEffect(() => {
    const node = viewRef.current
    if (!node || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !trackedRef.current) {
          trackedRef.current = true
          trackEvent("referral_section_view", { page: SOURCE })
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="scroll-mt-24 py-16 md:py-20 px-6 bg-ion-surface border-t border-gray-100">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <div ref={viewRef} className="ion-section-navy rounded-[24px] px-6 py-10 text-center shadow-lg md:px-14 md:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ion-teal-bright">
              ION Talent Referrals
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white text-balance md:text-4xl">
              Know a business planning to hire?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed ion-text-on-navy md:text-lg">
              Make an introduction or book a short call. Eligible introductions that become a new ION
              Talent client and lead to a successful placement may receive a referral reward of up to{" "}
              <span className="font-semibold text-ion-teal-bright">US$5,000</span>.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ReferralDrawer
                source={SOURCE}
                trigger={
                  <button
                    type="button"
                    className="ion-primary-button inline-flex h-12 w-full items-center justify-center rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
                  >
                    Make an Introduction
                  </button>
                }
              />
              <CalendlyButton
                source={SOURCE}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border-2 border-white/70 px-8 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ion-navy sm:w-auto"
              >
                Book a 10-Minute Call
              </CalendlyButton>
            </div>

            <Link
              href="/referral-terms"
              className="mt-4 inline-block text-xs text-white/60 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ion-navy rounded-sm"
            >
              Terms apply
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
