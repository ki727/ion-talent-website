"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { CalendlyButton } from "@/components/calendly-button"
import { trackEvent } from "@/lib/analytics"
import { SALARY_GUIDE_PDF_PATH } from "@/lib/site-config"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  firstName: string
  lastName: string
  workEmail: string
  company: string
  jobTitle: string
}

interface FormErrors {
  [key: string]: string
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  workEmail: "",
  company: "",
  jobTitle: "",
}

const inputClass = (hasError: boolean) =>
  `border-2 transition-all duration-200 ${
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
      : "border-gray-200 focus:border-ion-teal focus:ring-ion-teal"
  }`

const labelClass = "block text-sm font-semibold text-[#1a1a1a] mb-2"

export function SalaryGuideForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [companyWebsite, setCompanyWebsite] = useState("") // honeypot
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = "First name is required"
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!form.workEmail.trim()) {
      newErrors.workEmail = "Work email is required"
    } else if (!EMAIL_RE.test(form.workEmail.trim())) {
      newErrors.workEmail = "Please enter a valid email address"
    }
    if (!form.company.trim()) newErrors.company = "Company is required"
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === "submitting") return
    if (!validate()) return

    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/salary-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          workEmail: form.workEmail.trim(),
          company: form.company.trim(),
          jobTitle: form.jobTitle.trim(),
          marketingOptIn,
          companyWebsite,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error("We couldn't send your request. Please try again.")
      }

      trackEvent("salary_guide_submit_success")
      setStatus("success")
    } catch (error) {
      trackEvent("salary_guide_submit_error")
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "We couldn't send your request. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-ion-teal" aria-hidden="true" />
        <h3 className="font-display mt-4 text-2xl font-bold text-ion-navy sm:text-3xl">Your guide is ready.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ion-gray sm:text-base">
          Thanks, {form.firstName || "there"}. We&apos;ve also emailed your download link to {form.workEmail}.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SALARY_GUIDE_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("salary_guide_download_click")}
            className="ion-primary-button inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
          >
            Download the Guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <CalendlyButton
            source="salary_guide_success"
            className="ion-primary-button-navy inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2 sm:w-auto"
          >
            Discuss a Hiring Requirement
          </CalendlyButton>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="sg-firstName" className={labelClass}>
            First Name *
          </label>
          <Input
            id="sg-firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            aria-invalid={errors.firstName ? true : undefined}
            aria-describedby={errors.firstName ? "sg-firstName-error" : undefined}
            className={inputClass(!!errors.firstName)}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <div id="sg-firstName-error" className="flex items-center mt-1 text-red-600 text-sm" role="alert">
              <AlertCircle className="h-4 w-4 mr-1 shrink-0" aria-hidden="true" />
              {errors.firstName}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="sg-lastName" className={labelClass}>
            Last Name *
          </label>
          <Input
            id="sg-lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            aria-invalid={errors.lastName ? true : undefined}
            aria-describedby={errors.lastName ? "sg-lastName-error" : undefined}
            className={inputClass(!!errors.lastName)}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <div id="sg-lastName-error" className="flex items-center mt-1 text-red-600 text-sm" role="alert">
              <AlertCircle className="h-4 w-4 mr-1 shrink-0" aria-hidden="true" />
              {errors.lastName}
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="sg-workEmail" className={labelClass}>
          Work Email *
        </label>
        <Input
          id="sg-workEmail"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={form.workEmail}
          onChange={(e) => updateField("workEmail", e.target.value)}
          aria-invalid={errors.workEmail ? true : undefined}
          aria-describedby={errors.workEmail ? "sg-workEmail-error" : undefined}
          className={inputClass(!!errors.workEmail)}
          placeholder="your.email@company.com"
        />
        {errors.workEmail && (
          <div id="sg-workEmail-error" className="flex items-center mt-1 text-red-600 text-sm" role="alert">
            <AlertCircle className="h-4 w-4 mr-1 shrink-0" aria-hidden="true" />
            {errors.workEmail}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="sg-company" className={labelClass}>
            Company *
          </label>
          <Input
            id="sg-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? "sg-company-error" : undefined}
            className={inputClass(!!errors.company)}
            placeholder="Your company name"
          />
          {errors.company && (
            <div id="sg-company-error" className="flex items-center mt-1 text-red-600 text-sm" role="alert">
              <AlertCircle className="h-4 w-4 mr-1 shrink-0" aria-hidden="true" />
              {errors.company}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="sg-jobTitle" className={labelClass}>
            Job Title *
          </label>
          <Input
            id="sg-jobTitle"
            type="text"
            autoComplete="organization-title"
            value={form.jobTitle}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            aria-invalid={errors.jobTitle ? true : undefined}
            aria-describedby={errors.jobTitle ? "sg-jobTitle-error" : undefined}
            className={inputClass(!!errors.jobTitle)}
            placeholder="Your job title"
          />
          {errors.jobTitle && (
            <div id="sg-jobTitle-error" className="flex items-center mt-1 text-red-600 text-sm" role="alert">
              <AlertCircle className="h-4 w-4 mr-1 shrink-0" aria-hidden="true" />
              {errors.jobTitle}
            </div>
          )}
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-gray-300 accent-ion-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal"
        />
        <span>I&apos;d like to receive occasional ION Talent hiring insights and market updates.</span>
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
        className="ion-primary-button inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            Get the Guide
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-xs text-[#6a6a6a] text-center leading-relaxed">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-ion-teal-dark">
          privacy policy
        </a>
        . We respect your privacy and will never share your information with third parties.
      </p>
    </form>
  )
}
