"use client"

import type React from "react"
import { useState } from "react"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { CalendlyButton } from "@/components/calendly-button"
import { LinkedinFollowLink } from "@/components/linkedin-follow-link"
import { trackEvent } from "@/lib/analytics"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i

const inputClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ion-teal focus:border-transparent"
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5"

const EMPTY_FORM = {
  referrerName: "",
  referrerEmail: "",
  companyName: "",
  contactName: "",
  contactEmail: "",
  contactLinkedin: "",
  hiringNote: "",
}

interface ReferralDrawerProps {
  /** The element that opens the drawer — rendered via Radix's asChild trigger pattern. */
  trigger: React.ReactNode
  /** Safe, non-identifying label for analytics only. */
  source: string
}

export function ReferralDrawer({ trigger, source }: ReferralDrawerProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [companyWebsite, setCompanyWebsite] = useState("") // honeypot
  const [permissionConfirmed, setPermissionConfirmed] = useState(false)
  const [contactEmailError, setContactEmailError] = useState("")
  const [contactLinkedinError, setContactLinkedinError] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function handleOpenChange(open: boolean) {
    if (open) {
      trackEvent("referral_form_open", { page: source })
    } else if (status === "success") {
      // Only reset after a confirmed send — an error or an in-progress draft
      // must never lose what the person typed.
      setForm(EMPTY_FORM)
      setCompanyWebsite("")
      setPermissionConfirmed(false)
      setContactEmailError("")
      setContactLinkedinError("")
      setStatus("idle")
      setErrorMessage("")
    }
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === "contactEmail" && contactEmailError) setContactEmailError("")
    if (field === "contactLinkedin" && contactLinkedinError) setContactLinkedinError("")
  }

  function handleLinkedinBlur() {
    if (form.contactLinkedin.trim() && !URL_RE.test(form.contactLinkedin.trim())) {
      setContactLinkedinError("Enter a valid LinkedIn URL.")
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "submitting") return

    const contactEmail = form.contactEmail.trim()
    const contactLinkedin = form.contactLinkedin.trim()
    if (!EMAIL_RE.test(contactEmail)) {
      setContactEmailError("Enter a valid hiring contact email address.")
      return
    }
    if (contactLinkedin && !URL_RE.test(contactLinkedin)) {
      setContactLinkedinError("Enter a valid LinkedIn URL.")
      return
    }
    if (!permissionConfirmed) {
      setStatus("error")
      setErrorMessage("Please confirm you have permission to share these details.")
      return
    }

    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrerName: form.referrerName.trim(),
          referrerEmail: form.referrerEmail.trim(),
          companyName: form.companyName.trim(),
          contactName: form.contactName.trim(),
          contactEmail,
          contactLinkedin: contactLinkedin || undefined,
          hiringNote: form.hiringNote.trim() || undefined,
          permissionConfirmed: true,
          companyWebsite,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      })
      const result = await res.json().catch(() => null)

      if (!res.ok || !result?.success) {
        throw new Error("We couldn't send your introduction. Please try again or email referral@iontalentgroup.com.")
      }

      trackEvent("referral_submit_success", { page: source })
      setStatus("success")
    } catch (err) {
      trackEvent("referral_submit_error", { page: source })
      setStatus("error")
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "We couldn't send your introduction. Please try again or email referral@iontalentgroup.com.",
      )
    }
  }

  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md bg-white p-6 md:p-8">
        {status === "success" ? (
          <div role="status" aria-live="polite" className="pt-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-ion-teal" aria-hidden="true" />
            <SheetHeader>
              <SheetTitle className="mt-4 text-xl font-semibold text-gray-900 text-center">
                Introduction received
              </SheetTitle>
              <SheetDescription className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-600 text-center">
                Thanks. We&apos;ll review the introduction and contact you shortly about the next step.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-3">
              <CalendlyButton
                source={`${source}_success`}
                className="ion-primary-button inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
              >
                Schedule a 10-Minute Call
              </CalendlyButton>
              <LinkedinFollowLink
                source={`${source}_success`}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 text-sm font-medium text-gray-700 transition-colors hover:border-ion-teal hover:text-ion-teal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal focus-visible:ring-offset-2"
              />
            </div>
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle className="text-xl font-semibold text-gray-900">Submit an Introduction</SheetTitle>
              <SheetDescription className="text-sm text-gray-600">
                Share a few details and ION Talent will take it from there.
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              {/* Honeypot field — hidden from real visitors and assistive tech, left blank by them */}
              <input
                type="text"
                name="companyWebsite"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="ref-drawer-name" className={labelClass}>
                  Your name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="ref-drawer-name"
                  required
                  autoComplete="name"
                  value={form.referrerName}
                  onChange={(e) => updateField("referrerName", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ref-drawer-email" className={labelClass}>
                  Your email address <span aria-hidden="true">*</span>
                </label>
                <input
                  id="ref-drawer-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={form.referrerEmail}
                  onChange={(e) => updateField("referrerEmail", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ref-drawer-company" className={labelClass}>
                  Company being referred <span aria-hidden="true">*</span>
                </label>
                <input
                  id="ref-drawer-company"
                  required
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ref-drawer-contact-name" className={labelClass}>
                  Hiring contact&apos;s name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="ref-drawer-contact-name"
                  required
                  value={form.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="ref-drawer-contact-email" className={labelClass}>
                  Hiring contact&apos;s email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="ref-drawer-contact-email"
                  type="email"
                  required
                  inputMode="email"
                  value={form.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  aria-invalid={contactEmailError ? true : undefined}
                  aria-describedby={contactEmailError ? "ref-drawer-contact-email-error" : undefined}
                  className={inputClass}
                />
                {contactEmailError && (
                  <p id="ref-drawer-contact-email-error" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                    {contactEmailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ref-drawer-contact-linkedin" className={labelClass}>
                  Hiring contact&apos;s LinkedIn <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  id="ref-drawer-contact-linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/profile"
                  value={form.contactLinkedin}
                  onChange={(e) => updateField("contactLinkedin", e.target.value)}
                  onBlur={handleLinkedinBlur}
                  aria-invalid={contactLinkedinError ? true : undefined}
                  aria-describedby={contactLinkedinError ? "ref-drawer-contact-linkedin-error" : undefined}
                  className={inputClass}
                />
                {contactLinkedinError && (
                  <p id="ref-drawer-contact-linkedin-error" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
                    {contactLinkedinError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ref-drawer-note" className={labelClass}>
                  What are they hiring for, or anything useful we should know?{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <textarea
                  id="ref-drawer-note"
                  rows={3}
                  value={form.hiringNote}
                  onChange={(e) => updateField("hiringNote", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ion-teal focus:border-transparent"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={permissionConfirmed}
                  onChange={(e) => setPermissionConfirmed(e.target.checked)}
                  required
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-ion-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal"
                />
                <span>
                  I confirm I have permission to share these details and agree to the{" "}
                  <a
                    href="/referral-terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-ion-teal-dark"
                  >
                    referral terms
                  </a>
                  . <span aria-hidden="true">*</span>
                </span>
              </label>

              {status === "error" && (
                <div
                  className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                aria-disabled={status === "submitting"}
                className="ion-primary-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
              >
                {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {status === "submitting" ? "Submitting..." : "Submit Introduction"}
              </button>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
