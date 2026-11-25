"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, ArrowRight, CheckCircle2, Linkedin, Loader2, Lock, Upload, X } from "lucide-react"
import { LinkedinFollowLink } from "@/components/linkedin-follow-link"
import { trackEvent } from "@/lib/analytics"
import { LINKEDIN_COMPANY_URL } from "@/lib/site-config"
import { asksCurrentSalary, NOTICE_PERIODS, normalizedLinkedin, validContactPhone, SALARY_CURRENCIES, validFixedSalary } from "@/lib/application-screening"

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
const labelClass = "flex items-center gap-1.5 text-sm font-semibold text-[#087F8C] mb-1.5"

function fieldClass(valid: boolean) {
  return valid ? inputClass.replace("border-gray-300 bg-white", "border-[#71C5BA] bg-[#F0FDFA]") + " ion-application-field-complete" : inputClass
}

function RequiredMark() {
  return <span className="text-[#7660DF]" aria-hidden="true">*</span>
}

function CompletionTick({ valid }: { valid: boolean }) {
  return valid ? <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-[#0D9488]" aria-label="Completed" /> : null
}

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
  const [currentCurrency, setCurrentCurrency] = useState("")
  const [expectedCurrency, setExpectedCurrency] = useState("")
  const showCurrentSalary = asksCurrentSalary(roleLocation)
  const [marketingOptIn, setMarketingOptIn] = useState(false)
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

    if (!validFixedSalary(expectedSalary, expectedCurrency) || (showCurrentSalary && !validFixedSalary(currentSalary, Number(currentSalary) === 0 ? "" : currentCurrency, true))) {
      setStatus("error")
      setErrorMessage("Please enter valid fixed monthly salary amounts and select their currencies. Enter 0 for current salary if not employed.")
      return
    }
    if (!validContactPhone(phone)) {
      setStatus("error")
      setErrorMessage("Please enter a phone number containing at least one digit.")
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
      if (showCurrentSalary) {
        formData.set("currentSalary", currentSalary.trim())
        formData.set("currentCurrency", Number(currentSalary) === 0 ? "" : currentCurrency)
      }
      formData.set("expectedSalary", expectedSalary.trim())
      formData.set("expectedCurrency", expectedCurrency)
      formData.set("marketingOptIn", marketingOptIn ? "true" : "false")
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
      setMarketingOptIn(false)
      setPhone("")
      setLinkedin("")
      setCurrentLocation("")
      setNoticePeriod("")
      setCurrentSalary("")
      setExpectedSalary("")
      setCurrentCurrency("")
      setExpectedCurrency("")
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
        className="relative isolate overflow-hidden rounded-2xl bg-[#0F172A] px-5 py-8 text-center shadow-lg sm:px-8 sm:py-10"
        role="status"
        aria-live="polite"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(15,163,161,0.24),transparent_58%),radial-gradient(ellipse_at_bottom_right,rgba(118,96,223,0.24),transparent_60%)]" aria-hidden="true" />
        <a href={LINKEDIN_COMPANY_URL} target="_blank" rel="noopener noreferrer"
          onClick={() => trackEvent("linkedin_follow_click", { page: "candidate_success_logo" })}
          className="mx-auto inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="ION Talent on LinkedIn">
          <img src="/brand/logo-white-web.svg" alt="ION Talent" className="h-8 w-auto sm:h-10" />
        </a>
        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center" aria-hidden="true">
          <div className="ion-application-icon-flip relative h-16 w-16">
            <span className="ion-application-icon-clock absolute inset-0 flex items-center justify-center rounded-full bg-white text-[#0D9488] shadow-sm">
              <CheckCircle2 className="h-10 w-10" />
            </span>
            <span className="ion-application-icon-logo absolute inset-0 flex items-center justify-center rounded-full bg-white">
              <svg viewBox="0 0 2048 2048" className="h-16 w-16" focusable="false">
                <circle cx="1024" cy="1024" r="892" fill="#0F172A"/>
                <path d="M913 535 L1139 461 L1139 1591 L913 1591 Z" fill="#0FA3A1"/>
              </svg>
            </span>
          </div>
                    <style>{`
            @keyframes ion-application-icon-turn {
              0%, 38% { transform: rotateY(0deg); }
              50%, 88% { transform: rotateY(180deg); }
              100% { transform: rotateY(360deg); }
            }
            .ion-application-icon-flip {
              transform-style: preserve-3d;
              animation: ion-application-icon-turn 4s ease-in-out infinite;
            }
            .ion-application-icon-clock,
            .ion-application-icon-logo {
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .ion-application-icon-logo { transform: rotateY(180deg); }
            @media (prefers-reduced-motion: reduce) {
              .ion-application-icon-flip { animation: none; }
              .ion-application-icon-logo { visibility: hidden; }
            }
          `}</style>
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">Application submitted successfully</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-200 sm:text-base">
          Thank you for applying. We&apos;ll be in touch if your experience matches the opportunity.
        </p>
        <LinkedinFollowLink
          source="candidate_success"
          iconClassName="h-6 w-6"
          className="mx-auto mt-6 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-xl bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#084F96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-auto sm:px-6 sm:text-base"
        >
          <span>Follow us on LinkedIn for the latest opportunities</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </LinkedinFollowLink>
      </div>
    )
  }

  const isSubmitting = status === "submitting"
  const idleLabel = "Submit application"
  const nameValid = fullName.trim().length > 0
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const phoneValid = validContactPhone(phone)
  const locationValid = currentLocation.trim().length > 0
  const noticeValid = NOTICE_PERIODS.some((period) => period === noticePeriod)
  const currentAmountValid = validFixedSalary(currentSalary, "USD", true)
  const expectedAmountValid = validFixedSalary(expectedSalary, "USD")
  const currentSalaryValid = validFixedSalary(currentSalary, Number(currentSalary) === 0 ? "" : currentCurrency, true)
  const expectedSalaryValid = validFixedSalary(expectedSalary, expectedCurrency)
  const linkedinValid = Boolean(normalizedLinkedin(linkedin))
  const cvValid = Boolean(cvFile && !validateFile(cvFile))
  const profileValid = cvValid || linkedinValid

  return (
    <form onSubmit={handleSubmit} className="w-full">
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

      <div className="mb-5 flex items-center gap-3 rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 via-white to-violet-50 px-4 py-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center" aria-hidden="true">
          <div className="ion-application-icon-flip relative h-10 w-10">
            <span className="ion-application-icon-clock absolute inset-0 flex items-center justify-center rounded-full bg-white text-[#0D9488] shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" focusable="false">
                <path d="M10 2h4M12 2v3M18 5l2 2" />
                <circle cx="12" cy="14" r="8" />
                <path d="M12 14V9" />
                <circle cx="12" cy="14" r="0.75" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span className="ion-application-icon-logo absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 2048 2048" className="h-10 w-10" focusable="false">
                <circle cx="1024" cy="1024" r="892" fill="#0F172A"/>
                <path d="M913 535 L1139 461 L1139 1591 L913 1591 Z" fill="#0FA3A1"/>
              </svg>
            </span>
          </div>
          <style>{`
            @keyframes ion-application-icon-turn {
              0%, 38% { transform: rotateY(0deg); }
              50%, 88% { transform: rotateY(180deg); }
              100% { transform: rotateY(360deg); }
            }
            .ion-application-icon-flip {
              transform-style: preserve-3d;
              animation: ion-application-icon-turn 4s ease-in-out infinite;
            }
            .ion-application-icon-clock,
            .ion-application-icon-logo {
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .ion-application-icon-logo { transform: rotateY(180deg); }
            @media (prefers-reduced-motion: reduce) {
              .ion-application-icon-flip { animation: none; }
              .ion-application-icon-logo { visibility: hidden; }
            }
          `}</style>
        </div>
        <div><h3 className="text-[1.4rem] leading-tight font-bold tracking-tight text-gray-900 md:text-[1.7rem]">Apply in under 60 seconds</h3><p className="mt-0.5 text-xs text-gray-600 sm:text-sm">No account required.</p></div>
      </div>
      <style>{`
        .ion-application-field-complete:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #F0FDFA inset;
          -webkit-text-fill-color: #0F172A;
        }
        .ion-application-field-complete:autofill {
          box-shadow: 0 0 0 1000px #F0FDFA inset;
        }
      `}</style>
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-6">
        <div className="md:col-span-2 lg:col-span-2">
          <label htmlFor="app-full-name" className={labelClass}>Full name <RequiredMark /> <CompletionTick valid={nameValid} /></label>
          <input id="app-full-name" required autoComplete="name" value={fullName}
            onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className={fieldClass(nameValid)} maxLength={160} />
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="app-email" className={labelClass}>
            Email address <RequiredMark /><CompletionTick valid={emailValid} />
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
            className={fieldClass(emailValid)}
          />
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="app-phone" className={labelClass}>
            Phone number <RequiredMark /> <CompletionTick valid={phoneValid} />
          </label>
          <input
            id="app-phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Include country code"
            className={fieldClass(phoneValid)}
          />
        </div>

        <div className="lg:col-span-3">
          <label htmlFor="app-location" className={labelClass}>Current location <RequiredMark /> <CompletionTick valid={locationValid} /></label>
          <input id="app-location" required autoComplete="off" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="City & Country" className={fieldClass(locationValid)} maxLength={160} />
        </div>
        <div className="lg:col-span-3">
          <label htmlFor="app-notice" className={labelClass}>Notice period <RequiredMark /> <CompletionTick valid={noticeValid} /></label>
          <select id="app-notice" required value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} className={fieldClass(noticeValid)}>
            <option value="" disabled>Select notice period</option>
            {NOTICE_PERIODS.map((period) => <option key={period} value={period}>{period}</option>)}
          </select>
        </div>
        {showCurrentSalary && (
          <div className="min-w-0 md:col-span-2 lg:col-span-6">
            <label htmlFor="app-current-salary" className={labelClass}>Current fixed monthly salary <RequiredMark /> <CompletionTick valid={currentSalaryValid} /></label>
            <div className="grid max-w-md grid-cols-[minmax(0,1fr)_7.75rem] gap-2">
              <input id="app-current-salary" type="text" inputMode="decimal" maxLength={15} required value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)}
                placeholder="Amount" className={fieldClass(currentAmountValid)} />
              <select aria-label="Current salary currency" required={currentSalary === "" || Number(currentSalary) !== 0} disabled={currentSalary !== "" && Number(currentSalary) === 0} value={currentCurrency} onChange={(e) => setCurrentCurrency(e.target.value)} className={fieldClass(Boolean(currentCurrency) && !(currentSalary !== "" && Number(currentSalary) === 0)) + " disabled:bg-gray-100 disabled:text-gray-400"}>
                <option value="">Currency</option>
                {SALARY_CURRENCIES.map((code) => <option key={code} value={code}>{code}</option>)}
              </select>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">Enter 0 if not currently employed.</p>
          </div>
        )}
        <div className="min-w-0 md:col-span-2 lg:col-span-6">
          <label htmlFor="app-expected-salary" className={labelClass}>Expected fixed monthly salary <RequiredMark /> <CompletionTick valid={expectedSalaryValid} /></label>
          <div className="grid max-w-md grid-cols-[minmax(0,1fr)_7.75rem] gap-2">
            <input id="app-expected-salary" type="text" inputMode="decimal" maxLength={15} required value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder="Amount" className={fieldClass(expectedAmountValid)} />
            <select aria-label="Expected salary currency" required value={expectedCurrency} onChange={(e) => setExpectedCurrency(e.target.value)} className={fieldClass(Boolean(expectedCurrency))}>
              <option value="">Currency</option>
              {SALARY_CURRENCIES.map((code) => <option key={code} value={code}>{code}</option>)}
            </select>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-600">This helps us identify opportunities aligned with your salary expectations. We will always endeavour to secure the best possible package for you.</p>
        </div>
        <p className="md:col-span-2 lg:col-span-6 -mt-1 text-xs leading-relaxed text-slate-600">Including fixed allowances, excluding bonuses and commission.</p>
        <div className="md:col-span-2 lg:col-span-6 border-t border-gray-200 pt-3">
          <h3 className="flex items-center gap-2 text-base font-bold text-[#087F8C]"><span>Upload your CV and/or share your LinkedIn profile <RequiredMark /></span><CompletionTick valid={profileValid} /></h3>
        </div>

        <div className="min-w-0 lg:col-span-3">
          {!cvFile ? (
            <label
              htmlFor="app-cv"
              className="flex min-h-[90px] flex-col items-center justify-center rounded-xl border border-dashed border-teal-300 bg-teal-50/40 px-3 py-3 cursor-pointer hover:border-ion-teal hover:bg-teal-50 transition-colors group"
            >
              <Upload className="h-5 w-5 text-ion-teal mb-1 transition-colors" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-ion-teal">
                Upload CV
              </span>
              <span className="mt-1 text-xs text-gray-500">PDF, DOC or DOCX · Max {MAX_CV_LABEL}</span>
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
            <div className={"flex min-h-[90px] flex-col justify-center rounded-xl border px-4 py-3 " + (cvValid ? "border-[#71C5BA] bg-[#F0FDFA]" : "border-red-300 bg-red-50")}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  {cvValid ? <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D9488]" aria-hidden="true" /> : <AlertCircle className="h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />}
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

        <div className="min-w-0 lg:col-span-3">
          <div className={"flex min-h-[90px] flex-col justify-center rounded-xl border px-3 py-2 " + (linkedinValid ? "border-[#71C5BA] bg-[#F0FDFA]" : "border-[#D2E3F2] bg-[#F5F9FD]")}>
            <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0A66C2] text-white"><Linkedin className="h-5 w-5" aria-hidden="true" /></span>
            <input id="app-linkedin" type="text" inputMode="url" autoComplete="url" value={linkedin}
              onChange={(e) => { setLinkedin(e.target.value); setFileError("") }} aria-label="LinkedIn profile URL" placeholder="LinkedIn profile URL" className={fieldClass(linkedinValid) + " min-w-0"} maxLength={500} />
            {linkedinValid && <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D9488]" aria-label="LinkedIn profile completed" />}
            </div>
          </div>
        </div>
        <p className="md:col-span-2 lg:col-span-6 -mt-1 text-xs text-slate-600">Either option is sufficient.</p>

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

      <div className="mt-5 text-sm text-slate-700">
        <label className="flex cursor-pointer items-start gap-3 leading-relaxed">
          <input type="checkbox" name="marketingOptIn" value="true" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#0FA3A1]" />
          <span>I'd like to receive job opportunities, salary guides and market insights from ION Talent by email.<span className="mt-1 block text-xs text-slate-500">Optional. You can unsubscribe at any time.</span></span>
        </label>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-600"><Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>Your details are treated confidentially and will not be shared with prospective employers without your permission. <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Privacy Policy</a>.</span></p>
      <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className="ion-candidate-button inline-flex h-12 w-full sm:w-auto sm:min-w-[240px] items-center justify-center gap-2 rounded-xl px-10 text-sm font-semibold transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion-violet focus-visible:ring-offset-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {isSubmitting ? "Submitting..." : idleLabel}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </button>
        <p className="text-xs text-gray-400 text-center sm:text-left">
          Fields marked <RequiredMark /> are required.
        </p>
      </div>
    </form>
  )
}
