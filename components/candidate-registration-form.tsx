"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { CheckCircle2, Loader2, Upload, X } from "lucide-react"

const MAX_CV_BYTES = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]
const ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const inputClass =
  "w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5"

interface CandidateRegistrationFormProps {
  selectedRole?: string
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
      {message}
    </p>
  )
}

export function CandidateRegistrationForm({ selectedRole = "" }: CandidateRegistrationFormProps) {
  const [desiredRole, setDesiredRole] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedRole) setDesiredRole(selectedRole)
  }, [selectedRole])

  function validateFile(file: File | null): string {
    if (!file || file.size === 0) return "Please attach your CV."
    const name = file.name.toLowerCase()
    const validExt = ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
    const validMime = ACCEPTED_MIME.includes(file.type) || file.type === ""
    if (!validExt || (!validMime && file.type !== "")) {
      return "Your CV must be a PDF, DOC or DOCX file."
    }
    if (file.size > MAX_CV_BYTES) return "Your CV must be 10 MB or smaller."
    return ""
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setCvFile(file)
    setFileError(file ? validateFile(file) : "")
    setUploadProgress(0)
    if (file && !validateFile(file)) {
      // Simulate progress for UX feedback
      let p = 0
      const iv = setInterval(() => {
        p += 20
        setUploadProgress(p)
        if (p >= 100) clearInterval(iv)
      }, 80)
    }
  }

  function removeCv() {
    setCvFile(null)
    setFileError("")
    setUploadProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    const cvErr = validateFile(cvFile)
    if (cvErr) {
      setFileError(cvErr)
      return
    }
    setFileError("")
    setStatus("submitting")
    setErrorMessage("")

    const formData = new FormData(form)
    // Ensure the file is included correctly
    if (cvFile) formData.set("cv", cvFile, cvFile.name)

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
          Your details have been received and added to the ION Talent specialist network. A confirmation
          has been sent to your email address. We will contact you when your experience matches a
          relevant live requirement.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8"
      noValidate
    >
      {selectedRole && (
        <div className="mb-6 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          Registering interest in:{" "}
          <span className="font-semibold">{selectedRole}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Full name */}
        <div className="md:col-span-2">
          <label htmlFor="reg-full-name" className={labelClass}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-full-name"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reg-email" className={labelClass}>
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="reg-mobile" className={labelClass}>
            Mobile number <span aria-hidden="true">*</span>
          </label>
          <input
            id="reg-mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+971 50 000 0000"
            className={inputClass}
          />
        </div>

        {/* LinkedIn */}
        <div className="md:col-span-2">
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

        {/* Current location */}
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

        {/* Desired role — pre-filled from card selection */}
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
            placeholder="e.g. CFO, Data Engineering Lead"
            className={inputClass}
          />
        </div>

        {/* Notice period */}
        <div>
          <label htmlFor="reg-notice" className={labelClass}>
            Notice period / availability <span aria-hidden="true">*</span>
          </label>
          <select id="reg-notice" name="noticePeriod" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select notice period
            </option>
            <option value="Immediately available">Immediately available</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
            <option value="2 months">2 months</option>
            <option value="3 months">3 months</option>
            <option value="3+ months">More than 3 months</option>
            <option value="Exploring options">Exploring options</option>
          </select>
        </div>

        {/* Expected salary range */}
        <div>
          <label htmlFor="reg-salary" className={labelClass}>
            Expected salary range <span aria-hidden="true">*</span>
          </label>
          <select id="reg-salary" name="expectedSalary" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a range
            </option>
            <option value="AED 100,000–200,000">AED 100,000 – 200,000</option>
            <option value="AED 200,000–350,000">AED 200,000 – 350,000</option>
            <option value="AED 350,000–500,000">AED 350,000 – 500,000</option>
            <option value="AED 500,000–700,000">AED 500,000 – 700,000</option>
            <option value="AED 700,000–1,000,000">AED 700,000 – 1,000,000</option>
            <option value="AED 1,000,000+">AED 1,000,000+</option>
            <option value="USD equivalent — open to discuss">USD equivalent — open to discuss</option>
          </select>
        </div>

        {/* CV upload */}
        <div className="md:col-span-2">
          <label className={labelClass} htmlFor="reg-cv">
            CV upload <span aria-hidden="true">*</span>
          </label>

          {!cvFile ? (
            <label
              htmlFor="reg-cv"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 cursor-pointer hover:border-[#14A8A8] hover:bg-teal-50 transition-colors group"
            >
              <Upload
                className="h-8 w-8 text-gray-400 group-hover:text-[#14A8A8] mb-2 transition-colors"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#14A8A8]">
                Click to upload your CV
              </span>
              <span className="mt-1 text-xs text-gray-500">PDF, DOC or DOCX — maximum 10 MB</span>
              <input
                ref={fileInputRef}
                id="reg-cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="sr-only"
                aria-describedby="reg-cv-error"
              />
            </label>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#14A8A8]" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-900 truncate">{cvFile.name}</span>
                  <span className="text-xs text-gray-500 shrink-0">
                    ({(cvFile.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
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
              {uploadProgress < 100 && uploadProgress > 0 && (
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-[#14A8A8] rounded-full transition-all duration-100"
                    style={{ width: `${uploadProgress}%` }}
                    role="progressbar"
                    aria-valuenow={uploadProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="CV upload progress"
                  />
                </div>
              )}
            </div>
          )}

          {fileError && <FieldError id="reg-cv-error" message={fileError} />}
        </div>
      </div>

      {/* Cover note (optional) */}
      <div className="mt-5">
        <label htmlFor="reg-cover" className={labelClass}>
          Cover note{" "}
          <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          id="reg-cover"
          name="coverNote"
          rows={4}
          placeholder="Briefly describe your key skills, sector experience and what you are looking for next."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14A8A8] focus:border-transparent"
        />
      </div>

      {/* Consents */}
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
            I consent to ION Talent storing and processing my information for recruitment purposes in
            accordance with the{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              candidate privacy notice
            </Link>
            . <span aria-hidden="true">*</span>
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
        <div
          className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#14A8A8] px-8 text-sm font-medium text-white transition-colors hover:bg-[#0F8F8F] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14A8A8] focus-visible:ring-offset-2"
        >
          {status === "submitting" && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          {status === "submitting" ? "Submitting..." : "Register Your Interest"}
        </button>
        <p className="text-xs text-gray-400 text-center sm:text-left">
          Fields marked <span aria-hidden="true">*</span> are required.
        </p>
      </div>
    </form>
  )
}
