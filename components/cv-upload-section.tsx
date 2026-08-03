"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, AlertCircle, User } from "lucide-react"

export function CVUploadSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    yearsExperience: "",
    linkedin: "",
    location: "",
    currentRole: "",
    desiredRole: "",
    salary: "",
    availability: "immediate",
    message: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, cv: "File size must be less than 5MB" })
        return
      }
      if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      ) {
        setErrors({ ...errors, cv: "Please upload a PDF or Word document" })
        return
      }
      setCvFile(file)
      setErrors({ ...errors, cv: "" })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!cvFile) newErrors.cv = "Please upload your CV"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Create FormData to handle file upload
      const submitData = new FormData()

      // Add all form fields
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key as keyof typeof formData])
      })

      // Add CV file
      if (cvFile) {
        submitData.append("cv", cvFile)
      }

      // Add metadata
      submitData.append("type", "cv_submission")
      submitData.append("timestamp", new Date().toISOString())

      const response = await fetch("/api/submit-cv", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error("Failed to submit CV")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          yearsExperience: "",
          linkedin: "",
          location: "",
          currentRole: "",
          desiredRole: "",
          salary: "",
          availability: "immediate",
          message: "",
        })
        setCvFile(null)
        setErrors({})
      }, 5000)
    } catch (error) {
      console.error("Error submitting CV:", error)
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">CV Submitted Successfully!</h3>
        <p className="text-[#6a6a6a] mb-2">
          Thank you <strong>{formData.firstName}</strong> for registering with ION Talent.
        </p>
        <p className="text-sm text-[#6a6a6a]">
          Our recruitment team will review your profile and contact you within 48 hours if we have suitable
          opportunities.
        </p>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <User className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-[#1a1a1a] mb-2">Submit Your CV</CardTitle>
        <p className="text-[#6a6a6a]">Join our talent network and get matched with exciting opportunities</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">First Name *</label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`border-2 ${errors.firstName ? "border-red-300" : "border-gray-200"} focus:border-[#2DD4BF]`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.firstName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Last Name *</label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`border-2 ${errors.lastName ? "border-red-300" : "border-gray-200"} focus:border-[#2DD4BF]`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email Address *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`border-2 ${errors.email ? "border-red-300" : "border-gray-200"} focus:border-[#2DD4BF]`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Years of Experience</label>
              <Input
                type="text"
                value={formData.yearsExperience}
                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                className="border-2 border-gray-200 focus:border-[#2DD4BF]"
                placeholder="e.g., 5 years"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">LinkedIn Profile</label>
              <Input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="border-2 border-gray-200 focus:border-[#2DD4BF]"
                placeholder="linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Current Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="border-2 border-gray-200 focus:border-[#2DD4BF]"
                placeholder="Dubai, UAE"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Current Role</label>
              <Input
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                className="border-2 border-gray-200 focus:border-[#2DD4BF]"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Desired Role</label>
              <Input
                value={formData.desiredRole}
                onChange={(e) => setFormData({ ...formData, desiredRole: e.target.value })}
                className="border-2 border-gray-200 focus:border-[#2DD4BF]"
                placeholder="e.g., Engineering Manager"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Expected Salary</label>
              <Input
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="border-2 border-gray-200 focus:border-[#2DD4BF]"
                placeholder="e.g., $80,000 - $100,000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2DD4BF] focus:outline-none"
              >
                <option value="immediate">Available Immediately</option>
                <option value="2weeks">2 weeks notice</option>
                <option value="1month">1 month notice</option>
                <option value="2months">2 months notice</option>
                <option value="3months">3+ months</option>
              </select>
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Upload CV/Resume *</label>
            <div
              className={`border-2 border-dashed ${errors.cv ? "border-red-300" : "border-gray-300"} rounded-lg p-6 text-center hover:border-[#2DD4BF] transition-colors`}
            >
              <input type="file" id="cv" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
              <label htmlFor="cv" className="cursor-pointer">
                {cvFile ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FileText className="h-8 w-8 text-[#2DD4BF]" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">{cvFile.name}</p>
                      <p className="text-sm text-[#6a6a6a]">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-8 w-8 text-[#6a6a6a] mx-auto mb-2" />
                    <p className="text-[#1a1a1a] font-medium">Click to upload your CV</p>
                    <p className="text-sm text-[#6a6a6a]">PDF, DOC, or DOCX (max 5MB)</p>
                  </div>
                )}
              </label>
            </div>
            {errors.cv && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.cv}
              </div>
            )}
          </div>

          {/* Additional Message */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Additional Information</label>
            <Textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-2 border-gray-200 focus:border-[#2DD4BF]"
              placeholder="Tell us about your career goals, preferred industries, or any specific requirements..."
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-[#6a6a6a] leading-relaxed">
              <strong>Privacy Notice:</strong> Your CV and personal information will be stored securely and only used
              for recruitment purposes. We will not share your details with third parties without your consent.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0d9488] text-white font-semibold py-4 rounded-full text-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting CV...
              </div>
            ) : (
              <>
                Submit CV
                <Upload className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
