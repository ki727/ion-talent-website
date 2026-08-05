"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, AlertCircle } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"
import { SuccessMessage } from "./success-message"
import { trackEvent } from "@/lib/analytics"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
  budget: string
  timeline: string
}

interface FormErrors {
  [key: string]: string
}

interface EnhancedContactFormProps {
  /** Preselects the Service Interest dropdown, e.g. when arriving from a specific service CTA. */
  initialService?: string
}

const SERVICE_LABELS: Record<string, string> = {
  contingent: "Contingent Recruitment",
  retained: "Executive Search",
  rpo: "RPO / Embedded Solutions",
  consulting: "Talent Consulting",
  general: "General Enquiry",
}

export function EnhancedContactForm({ initialService }: EnhancedContactFormProps = {}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: initialService ?? "contingent",
    message: "",
    budget: "",
    timeline: "asap",
  })
  // Honeypot — left blank by real visitors, often filled in by bots.
  const [companyWebsite, setCompanyWebsite] = useState("")

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }))
    }
  }, [initialService])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.company.trim()) newErrors.company = "Company is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    if (formData.message.length < 10) newErrors.message = "Please provide more details (minimum 10 characters)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/hiring-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          businessEmail: formData.email,
          company: formData.company,
          phone: formData.phone,
          serviceInterest: SERVICE_LABELS[formData.service] ?? formData.service,
          timeline: formData.timeline,
          projectDetails: formData.message,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          companyWebsite,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        throw new Error("We couldn't send your submission. Please try again.")
      }

      trackEvent("hiring_enquiry_success")
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Clear the form now that a genuine success has been confirmed.
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: initialService ?? "contingent",
        message: "",
        budget: "",
        timeline: "asap",
      })
    } catch (error) {
      console.error("Error submitting hiring enquiry:", error)
      setIsSubmitting(false)
      setSubmitError(
        error instanceof Error ? error.message : "We couldn't send your submission. Please try again.",
      )
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <SuccessMessage
        title="Hiring enquiry sent successfully"
        message="Thanks. Your enquiry has been sent to ION Talent. We'll review the details and get back to you shortly."
      />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`border-2 transition-all duration-200 ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-ion-teal focus:ring-ion-teal"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Business Email *
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`border-2 transition-all duration-200 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-ion-teal focus:ring-ion-teal"
            }`}
            placeholder="your.email@company.com"
          />
          {errors.email && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Company *
          </label>
          <Input
            id="company"
            type="text"
            autoComplete="organization"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={`border-2 transition-all duration-200 ${
              errors.company
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-ion-teal focus:ring-ion-teal"
            }`}
            placeholder="Your company name"
          />
          {errors.company && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.company}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="border-2 border-gray-200 focus:border-ion-teal focus:ring-ion-teal transition-all duration-200"
            placeholder="+971 50 123 4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="service" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Service Interest
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ion-teal focus:border-ion-teal transition-all duration-200"
          >
            <option value="contingent">Contingent Recruitment</option>
            <option value="retained">Executive Search</option>
            <option value="rpo">RPO / Embedded Solutions</option>
            <option value="consulting">Talent Consulting</option>
            <option value="general">General Enquiry</option>
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Timeline
          </label>
          <select
            id="timeline"
            value={formData.timeline}
            onChange={(e) => handleChange("timeline", e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ion-teal focus:border-ion-teal transition-all duration-200"
          >
            <option value="asap">ASAP</option>
            <option value="1month">Within 1 month</option>
            <option value="3months">Within 3 months</option>
            <option value="6months">Within 6 months</option>
            <option value="planning">Just planning</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
          Project Details *
        </label>
        <Textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`border-2 transition-all duration-200 ${
            errors.message
              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:border-ion-teal focus:ring-ion-teal"
          }`}
          placeholder="Tell us about your hiring needs, specific roles, team size, industry requirements, or any other details that would help us understand your project better..."
        />
        {errors.message && (
          <div className="flex items-center mt-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {errors.message}
          </div>
        )}
        <div className="text-right text-sm text-gray-500 mt-1">{formData.message.length}/500</div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-[#6a6a6a] leading-relaxed">
          <strong>What happens next?</strong> We&apos;ll review your requirements and contact you within 24 hours to
          discuss your hiring needs. All information is kept strictly confidential.
        </p>
      </div>

      {submitError && (
        <div
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        size="lg"
        className="ion-primary-button w-full whitespace-normal text-center font-semibold py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ion-teal-hover focus-visible:ring-offset-2"
      >
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <>
            Send Hiring Enquiry
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      <p className="text-xs text-[#6a6a6a] text-center leading-relaxed">
        By submitting this form, you agree to our privacy policy. We respect your privacy and will never share your
        information with third parties.
      </p>
    </form>
  )
}
