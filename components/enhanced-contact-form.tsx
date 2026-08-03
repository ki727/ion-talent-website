"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, AlertCircle } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"
import { SuccessMessage } from "./success-message"

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

export function EnhancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "contingent",
    message: "",
    budget: "",
    timeline: "asap",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Send form data to your backend endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          type: "contact_inquiry",
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          service: "contingent",
          message: "",
          budget: "",
          timeline: "asap",
        })
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
      // You could add error handling here
    }
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return <SuccessMessage />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`border-2 transition-all duration-200 ${
              errors.name
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]"
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
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`border-2 transition-all duration-200 ${
              errors.email
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]"
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
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={`border-2 transition-all duration-200 ${
              errors.company
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]"
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
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="border-2 border-gray-200 focus:border-[#2DD4BF] focus:ring-[#2DD4BF] transition-all duration-200"
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
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] transition-all duration-200"
          >
            <option value="contingent">Contingent Recruitment</option>
            <option value="retained">Executive Search</option>
            <option value="consulting">Talent Consulting</option>
            <option value="general">General Inquiry</option>
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
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] focus:border-[#2DD4BF] transition-all duration-200"
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
              : "border-gray-200 focus:border-[#2DD4BF] focus:ring-[#2DD4BF]"
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
          <strong>What happens next?</strong> I'll personally review your requirements and contact you within 24 hours
          to discuss your project in detail. All information is kept strictly confidential.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-semibold py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <>
            Send Message
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
