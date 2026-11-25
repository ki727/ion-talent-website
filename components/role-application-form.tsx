"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle2, Linkedin, Loader2, Lock, Upload, X } from "lucide-react"
import { LinkedinFollowLink } from "@/components/linkedin-follow-link"
import { trackEvent } from "@/lib/analytics"
import { asksCurrentSalary, NOTICE_PERIODS, normalizedLinkedin, validInternationalPhone } from "@/lib/application-screening"

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
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [currentLocation, setCurrentLocation] = useState("")
  const [noticePeriod, setNoticePeriod] = useState("")
  const [currentSalary, setCurrentSalary] = useState("")
  const [expectedSalary, setExpectedSalary] = useState("")
  const showCurrentSalary = asksCurrentSalary(roleLocation)
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

    if (!fullName.trim() || !email.trim() || !phone.trim() || !currentLocation.trim() || !noticePeriod || !expectedSalary.trim() || (showCurrentSalary && !currentSalary.trim())) {
      setStatus("error")
      setErrorMessage("Please complete all required fields.")
      return
    }

    if (!validInternationalPhone(phone)) {
      setStatus("error")
      setErrorMessage("Please enter your phone number including the international country code.")
      return
    }
    const profileUrl = normalizedLinkedin(linkedin)
    if (linkedin.trim() && !profileUrl) {
      setStatus("error")
      setErrorMessage("Please enter a valid LinkedIn personal profile URL.")
      return
    }
    if (!cvFile && !profileUrl) {
      setFileError("Please upload your CV or provide your LinkedIn profile.")
      return
    }
    const cvErr = cvFile ? validateFile(cvFile) : ""
    if (cvErr) {
      setFileError(cvErr)
      return
    }
    setFileError("")
    setStatus("submitting")
    setErrorMessage("")

    try {
      const formData = new FormData()
      const [firstName, ...lastName] = fullName.trim().split(/\s+/)
      formData.set("firstName", firstName)
      formData.set("lastName", lastName.join(" "))
      formData.set("email", email.trim())
      formData.set("phone", phone.trim())
      if (profileUrl) formData.set("linkedin", profileUrl)
      formData.set("currentLocation", currentLocation.trim())
      formData.set("noticePeriod", noticePeriod)
      if (showCurrentSalary) formData.set("currentSalary", currentSalary.trim())
      formData.set("expectedSalary", expectedSalary.trim())
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
        throw new Error(result?.message || "We couldn't send your submission. Please try again.")
      }

      trackEvent("candidate_application_success", { roleType })
      setStatus("success")
      // Clear the form now that a genuine success has been confirmed.
      setFullName("")
      setEmail("")
      setPhone("")
      setLinkedin("")
      setCurrentLocation("")
      setNoticePeriod("")
      setCurrentSalary("")
      setExpectedSalary("")
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
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Application submitted successfully</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-600">
          Thanks. Your application has been sent to ION Talent for this opportunity. We&apos;ll be in touch if your
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
  const idleLabel = "Submit application"

  return (
    <form onSubmit={handleSubmit} className="ion-density-form-card rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
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

      <div className="mb-5"><h3 className="text-lg font-semibold text-gray-900">Quick application</h3><p className="mt-1 text-sm text-gray-500">No account required.</p></div>
      <div className="ion-density-form-grid grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="app-full-name" className={labelClass}>Full name *</label>
          <input id="app-full-name" required autoComplete="name" value={fullName}
            onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className={inputClass} maxLength={160} />
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
            Phone number *
          </label>
          <input
            id="app-phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Including international country code"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="app-location" className={labelClass}>Current location *</label>
          <input id="app-location" required autoComplete="off" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="City, country" className={inputClass} maxLength={160} />
        </div>
        <div>
          <label htmlFor="app-notice" className={labelClass}>Notice period *</label>
          <select id="app-notice" required value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} className={inputClass}>
            <option value="" disabled>Select notice period</option>
            {NOTICE_PERIODS.map((period) => <option key={period} value={period}>{period}</option>)}
          </select>
        </div>
        {showCurrentSalary && (
          <div>
            <label htmlFor="app-current-salary" className={labelClass}>Current salary range *</label>
            <input id="app-current-salary" required value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)}
              placeholder="Amount, currency, monthly/annual" className={inputClass} maxLength={160} />
            <p className="mt-1 text-xs text-gray-500">If not employed, enter "Not currently employed".</p>
          </div>
        )}
        <div className={showCurrentSalary ? "" : "md:col-span-2"}>
          <label htmlFor="app-expected-salary" className={labelClass}>Expected salary range *</label>
          <input id="app-expected-salary" required value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)}
            placeholder="Amount, currency, monthly/annual" className={inputClass} maxLength={160} />
        </div>
        <div className="md:col-span-2 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900">Your professional profile *</h3>
          <p className="mt-1 text-xs text-gray-500">Provide either or both of the following.</p>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="app-cv">
            CV upload{" "}
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
          <div className="mb-3 flex items-center gap-3 text-xs text-gray-500"><span className="h-px flex-1 bg-gray-200" />OR<span className="h-px flex-1 bg-gray-200" /></div>
          <label htmlFor="app-linkedin" className={labelClass}>LinkedIn profile URL</label>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0A66C2] text-white"><Linkedin className="h-5 w-5" aria-hidden="true" /></span>
            <input id="app-linkedin" type="text" inputMode="url" autoComplete="url" value={linkedin}
              onChange={(e) => { setLinkedin(e.target.value); setFileError("") }} placeholder="Paste your LinkedIn profile URL" className={inputClass} maxLength={500} />
          </div>
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

      <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-gray-500"><Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>Your details are treated confidentially and will not be shared with prospective employers without your permission. <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Privacy Policy</a>.</span></p>
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="ion-candidate-button inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 text-sm font-medium transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2"
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
