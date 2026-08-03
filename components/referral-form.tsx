"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { track } from "@vercel/analytics"
import { CheckCircle2, Loader2 } from "lucide-react"

const inputClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5"

export function ReferralForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const startedTracked = useRef(false)

  useEffect(() => {
    track("referral_page_opened")
  }, [])

  function handleFormStarted() {
    if (!startedTracked.current) {
      startedTracked.current = true
      track("referral_form_started")
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setStatus("submitting")
    setErrorMessage("")

    const payload = {
      referrerName: formData.get("referrerName"),
      referrerEmail: formData.get("referrerEmail"),
      referrerPhone: formData.get("referrerPhone"),
      companyName: formData.get("companyName"),
      companyLocation: formData.get("companyLocation"),
      contactName: formData.get("contactName"),
      contactJobTitle: formData.get("contactJobTitle"),
      contactDetails: formData.get("contactDetails"),
      rolesHiring: formData.get("rolesHiring"),
      relationship: formData.get("relationship"),
      additionalContext: formData.get("additionalContext"),
      genuineIntroduction: formData.get("genuineIntroduction") === "true",
      termsAcknowledged: formData.get("termsAcknowledged") === "true",
    }

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Submission failed. Please try again.")
      }
      track("referral_form_submitted")
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#14A8A8]" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Introduction received</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
          Thank you. The ION Talent team will review the information and contact you if any further
          details are required.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleFormStarted}
      className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="ref-name" className={labelClass}>
            Your full name <span aria-hidden="true">*</span>
          </label>
          <input id="ref-name" name="referrerName" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ref-email" className={labelClass}>
            Your email address <span aria-hidden="true">*</span>
          </label>
          <input id="ref-email" name="referrerEmail" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ref-phone" className={labelClass}>
            Your phone number <span aria-hidden="true">*</span>
          </label>
          <input id="ref-phone" name="referrerPhone" type="tel" required autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="ref-company" className={labelClass}>
            Company name <span aria-hidden="true">*</span>
          </label>
          <input id="ref-company" name="companyName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="ref-company-location" className={labelClass}>
            Company location <span aria-hidden="true">*</span>
          </label>
          <input
            id="ref-company-location"
            name="companyLocation"
            required
            placeholder="e.g. Riyadh, Saudi Arabia"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ref-contact-name" className={labelClass}>
            Hiring contact&apos;s name <span aria-hidden="true">*</span>
          </label>
          <input id="ref-contact-name" name="contactName" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="ref-contact-title" className={labelClass}>
            Hiring contact&apos;s job title <span aria-hidden="true">*</span>
          </label>
          <input id="ref-contact-title" name="contactJobTitle" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="ref-contact-details" className={labelClass}>
            Hiring contact&apos;s email or LinkedIn <span aria-hidden="true">*</span>
          </label>
          <input
            id="ref-contact-details"
            name="contactDetails"
            required
            placeholder="Email address or LinkedIn profile URL"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="ref-roles" className={labelClass}>
          What roles are they hiring for? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="ref-roles"
          name="rolesHiring"
          required
          rows={3}
          placeholder="e.g. Financial Controller, Head of Cybersecurity, SAP Programme Lead"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="ref-relationship" className={labelClass}>
          How do you know the company or contact? <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="ref-relationship"
          name="relationship"
          required
          rows={3}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="ref-context" className={labelClass}>
          Additional context <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          id="ref-context"
          name="additionalContext"
          rows={3}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="genuineIntroduction"
            value="true"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#14A8A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8]"
          />
          <span>
            I confirm that this is a genuine introduction and that I have a lawful basis or permission
            to share these contact details with ION Talent. <span aria-hidden="true">*</span>
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="termsAcknowledged"
            value="true"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#14A8A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8]"
          />
          <span>
            I understand that referral rewards are subject to eligibility requirements and ION
            Talent&apos;s referral terms. <span aria-hidden="true">*</span>
          </span>
        </label>
      </div>

      {status === "error" && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#14A8A8] px-8 text-sm font-medium text-white transition-colors hover:bg-[#0F8F8F] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2 md:w-auto"
      >
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Submitting..." : "Submit Introduction"}
      </button>
    </form>
  )
}
