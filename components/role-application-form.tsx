"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle2, Loader2, Upload, X } from "lucide-react"
import { LinkedinFollowLink } from "@/components/linkedin-follow-link"
import { trackEvent } from "@/lib/analytics"

const MAX_CV_BYTES = 4 * 1024 * 1024 // 4 MB — see app/api/applications/route.ts for why
const MAX_CV_LABEL = "4 MB"
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]
const ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const inputClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ion-teal focus:border-transparent"
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5"

interface RoleApplicationFormProps {
  roleTitle: string
  roleUrl: string
  roleCategory: string
  /** Single primary city (e.g. "Dubai") — normalized, never a multi-city combination. */
  roleLocation: string
  roleType: string
}

function validateFile(file: File | null): string {
  if (!file || file.size === 0) return "Please attach your CV."
  const name = file.name.toLowerCase()
  const validExt = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
  const validMime = ACCEPTED_MIME.includes(file.type) || file.type === ""
  if (!validExt || !validMime) return "Your CV must be a PDF, DOC or DOCX file."
  if (file.size > MAX_CV_BYTES) return `Your CV must be ${MAX_CV_LABEL} or smaller.`
  return ""
}

export function RoleApplicationForm({
  roleTitle,
  roleUrl,
  roleCategory,
  roleLocation,
  roleType,
}: RoleApplicationFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [message, setMessage] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("") // honeypot
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status !== "success") return
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    successRef.current?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" })
  }, [status])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setCvFile(file)
    setFileError(file ? validateFile(file) : "")
  }

  function removeCv() {
    setCvFile(null)
    setFileError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "submitting") return

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setStatus("error")
      setErrorMessage("Please complete all required fields.")
      return
    }

    const cvErr = validateFile(cvFile)
    if (cvErr) {
      setFileError(cvErr)
      return
    }
    setFileError("")
    setStatus("submitting")
    setErrorMessage("")

    try {
      const formData = new FormData()
      formData.set("firstName", firstName.trim())
      formData.set("lastName", lastName.trim())
      formData.set("email", email.trim())
      if (phone.trim()) formData.set("phone", phone.trim())
      if (linkedin.trim()) formData.set("linkedin", linkedin.trim())
      if (message.trim()) formData.set("message", message.trim())
      formData.set("companyWebsite", companyWebsite)
      formData.set("roleTitle", roleTitle)
      formData.set("roleUrl", typeof window !== "undefined" ? window.location.href : roleUrl)
      formData.set("roleCategory", roleCategory)
      formData.set("roleLocation", roleLocation)
      formData.set("roleType", roleType)
      if (cvFile) formData.set("cv", cvFile, cvFile.name)

      const res = await fetch("/api/applications", { method: "POST", body: formData })
      const result = await res.json().catch(() => null)

      if (!res.ok || !result?.success) {
        throw new Error("We couldn't send your submission. Please try again.")
      }

      trackEvent("candidate_application_success", { roleType })
      setStatus("success")
      // Clear the form now that a genuine success has been confirmed.
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhone("")
      setLinkedin("")
      setMessage("")
      setCvFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "We couldn't send your submission. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className="rounded-2xl border border-ion-teal/30 bg-white p-8 text-center shadow-md"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-ion-teal" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">CV submitted successfully</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">
          Thanks. Your CV has been sent to ION Talent for this opportunity. We&apos;ll be in touch if your
          experience matches the requirement.
        </p>
        <LinkedinFollowLink
          source="candidate_success"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ion-teal-dark underline underline-offset-2 hover:text-ion-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal rounded-sm"
        >
          Follow ION Talent on LinkedIn for future opportunities and hiring updates.
        </LinkedinFollowLink>
      </div>
    )
  }

  const isSubmitting = status === "submitting"
  const idleLabel = roleType === "Live Vacancy" ? "Apply for this Role" : "Submit CV / Register Interest"

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8" noValidate>
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="app-first-name" className={labelClass}>
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id="app-first-name"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="app-last-name" className={labelClass}>
            Last name <span aria-hidden="true">*</span>
          </label>
          <input
            id="app-last-name"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Your last name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="app-email" className={labelClass}>
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="app-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="app-phone" className={labelClass}>
            Phone <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="app-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+971 50 000 0000"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="app-linkedin" className={labelClass}>
            LinkedIn URL <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="app-linkedin"
            type="url"
            inputMode="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/your-profile"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="app-cv">
            CV upload <span aria-hidden="true">*</span>{" "}
            <span className="font-normal text-gray-500">— PDF, DOC or DOCX, max {MAX_CV_LABEL}</span>
          </label>

          {!cvFile ? (
            <label
              htmlFor="app-cv"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 cursor-pointer hover:border-ion-teal hover:bg-teal-50 transition-colors group"
            >
              <Upload className="h-8 w-8 text-gray-400 group-hover:text-ion-teal mb-2 transition-colors" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-ion-teal">
                Click to upload your CV
              </span>
              <span className="mt-1 text-xs text-gray-500">PDF, DOC or DOCX — maximum {MAX_CV_LABEL}</span>
              <input
                ref={fileInputRef}
                id="app-cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="sr-only"
                aria-describedby="app-cv-error"
              />
            </label>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-ion-teal" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-900 truncate">{cvFile.name}</span>
                  <span className="text-xs text-gray-500 shrink-0">({(cvFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                </div>
                <button
                  type="button"
                  onClick={removeCv}
                  className="shrink-0 rounded-md p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-label="Remove CV"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {fileError && (
            <p id="app-cv-error" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
              {fileError}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="app-message" className={labelClass}>
            Short message <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <textarea
            id="app-message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Anything you'd like ION Talent to know."
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ion-teal focus:border-transparent"
          />
        </div>
      </div>

      {status === "error" && (
        <div
          className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="ion-primary-button inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isSubmitting ? "Submitting..." : idleLabel}
        </button>
        <p className="text-xs text-gray-400 text-center sm:text-left">
          Fields marked <span aria-hidden="true">*</span> are required.
        </p>
      </div>
    </form>
  )
}
