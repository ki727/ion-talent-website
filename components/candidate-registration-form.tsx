"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { track } from "@vercel/analytics"
import { CheckCircle2, Loader2 } from "lucide-react"
import { FUNCTIONS } from "@/lib/opportunities"

const MAX_CV_BYTES = 5 * 1024 * 1024 // 5MB
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]

const inputClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5"

interface CandidateRegistrationFormProps {
  selectedRole: string
}

export function CandidateRegistrationForm({ selectedRole }: CandidateRegistrationFormProps) {
  const [desiredRole, setDesiredRole] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [fileName, setFileName] = useState("")
  const [fileError, setFileError] = useState("")

  useEffect(() => {
    if (selectedRole) setDesiredRole(selectedRole)
  }, [selectedRole])

  function validateFile(file: File | null): string {
    if (!file || file.size === 0) return "Please attach your CV."
    const name = file.name.toLowerCase()
    if (!ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))) {
      return "Your CV must be a PDF, DOC or DOCX file."
    }
    if (file.size > MAX_CV_BYTES) return "Your CV must be 5MB or smaller."
    return ""
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setFileName(file ? file.name : "")
    setFileError(file ? validateFile(file) : "")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const file = formData.get("cv") as File | null
    const cvError = validateFile(file)
    if (cvError) {
      setFileError(cvError)
      return
    }
    setFileError("")
    setStatus("submitting")
    setErrorMessage("")

    try {
      const res = await fetch("/api/register-interest", { method: "POST", body: formData })
      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Submission failed. Please try again.")
      }
      track("candidate_form_submitted", { desiredRole })
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-gray-200 bg-white p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#14A8A8]" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">Thank you</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-600">
          Your details have been received and added to the ION Talent specialist network. We will
          contact you when your experience matches a relevant live requirement.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8" noValidate={false}>
      {selectedRole && (
        <div className="mb-6 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          Registering interest in: <span className="font-semibold">{selectedRole}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="reg-first-name" className={labelClass}>
            First name <span aria-hidden="true">*</span>
          </label>
          <input id="reg-first-name" name="firstName" required autoComplete="given-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="reg-last-name" className={labelClass}>
            Last name <span aria-hidden="true">*</span>
          </label>
          <input id="reg-last-name" name="lastName" required autoComplete="family-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="reg-email" className={labelClass}>
            Email address <span aria-hidden="true">*</span>
          </label>
          <input id="reg-email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="reg-phone" className={labelClass}>
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input id="reg-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="reg-location" className={labelClass}>
            Current location <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-location"
            name="currentLocation"
            required
            placeholder="e.g. Dubai, UAE"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="reg-job-title" className={labelClass}>
            Current job title <span aria-hidden="true">*</span>
          </label>
          <input id="reg-job-title" name="currentJobTitle" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="reg-desired-role" className={labelClass}>
            Desired role <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-desired-role"
            name="desiredRole"
            required
            value={desiredRole}
            onChange={(e) => setDesiredRole(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="reg-function" className={labelClass}>
            Primary function <span aria-hidden="true">*</span>
          </label>
          <select id="reg-function" name="primaryFunction" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a function
            </option>
            {FUNCTIONS.map((fn) => (
              <option key={fn} value={fn}>
                {fn}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reg-experience" className={labelClass}>
            Years of experience <span aria-hidden="true">*</span>
          </label>
          <select id="reg-experience" name="yearsExperience" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            <option value="0-2 years">0-2 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="6-10 years">6-10 years</option>
            <option value="11-15 years">11-15 years</option>
            <option value="16+ years">16+ years</option>
          </select>
        </div>
        <div>
          <label htmlFor="reg-linkedin" className={labelClass}>
            LinkedIn profile <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-linkedin"
            name="linkedin"
            type="url"
            required
            placeholder="https://linkedin.com/in/your-profile"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="reg-availability" className={labelClass}>
            Availability <span aria-hidden="true">*</span>
          </label>
          <select id="reg-availability" name="availability" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select availability
            </option>
            <option value="Immediately available">Immediately available</option>
            <option value="1 month notice">1 month notice</option>
            <option value="2 months notice">2 months notice</option>
            <option value="3+ months notice">3+ months notice</option>
            <option value="Exploring options">Exploring options</option>
          </select>
        </div>
        <div>
          <label htmlFor="reg-cv" className={labelClass}>
            CV upload <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-cv"
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            aria-describedby="reg-cv-help reg-cv-error"
            className="w-full text-sm text-gray-600 file:mr-3 file:h-11 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:text-sm file:font-medium file:text-gray-900 hover:file:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] rounded-lg"
          />
          <p id="reg-cv-help" className="mt-1.5 text-xs text-gray-500">
            PDF, DOC or DOCX. Maximum 5MB.{fileName ? ` Selected: ${fileName}` : ""}
          </p>
          {fileError && (
            <p id="reg-cv-error" className="mt-1.5 text-xs font-medium text-red-600" role="alert">
              {fileError}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="reg-additional" className={labelClass}>
          Additional information <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="reg-additional"
          name="additionalInfo"
          required
          rows={4}
          placeholder="Tell us about your key skills, sector experience and what you are looking for next."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="consent"
            value="true"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#14A8A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8]"
          />
          <span>
            I consent to ION Talent storing and processing my information for relevant current and
            future recruitment opportunities. <span aria-hidden="true">*</span>
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            name="marketingOptIn"
            value="true"
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#14A8A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8]"
          />
          <span>I would like to receive relevant job and market updates from ION Talent.</span>
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
        {status === "submitting" ? "Submitting..." : "Register Your Interest"}
      </button>
    </form>
  )
}
