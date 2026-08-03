"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  company: string
}

export function JobApplicationModal({ isOpen, onClose, jobTitle, company }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedIn: "",
    coverLetter: "",
    experience: "",
    salary: "",
    availability: "immediate",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
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
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!cvFile) newErrors.cv = "Please upload your CV/Resume"
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "Cover letter is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        linkedIn: "",
        coverLetter: "",
        experience: "",
        salary: "",
        availability: "immediate",
      })
      setCvFile(null)
      setErrors({})
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">Application Submitted!</h3>
          <p className="text-[#6a6a6a] mb-4">
            Thank you for applying to <strong>{jobTitle}</strong> at <strong>{company}</strong>.
          </p>
          <p className="text-sm text-[#6a6a6a]">
            Our recruitment team will review your application and contact you within 48 hours if your profile matches
            our requirements.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1a1a1a]">Apply for Position</h2>
              <p className="text-[#6a6a6a]">
                {jobTitle} at {company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
                First Name *
              </Label>
              <Input
                id="firstName"
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
              <Label htmlFor="lastName" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
                Last Name *
              </Label>
              <Input
                id="lastName"
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
              <Label htmlFor="email" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`border-2 ${errors.email ? "border-red-300" : "border-gray-200"} focus:border-[#2DD4BF]`}
                placeholder="your.email@company.com"
              />
              {errors.email && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`border-2 ${errors.phone ? "border-red-300" : "border-gray-200"} focus:border-[#2DD4BF]`}
                placeholder="+971 50 123 4567"
              />
              {errors.phone && (
                <div className="flex items-center mt-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="linkedIn" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedIn"
              value={formData.linkedIn}
              onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
              className="border-2 border-gray-200 focus:border-[#2DD4BF]"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div>
            <Label htmlFor="cv" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
              CV/Resume *
            </Label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
                Years of Experience
              </Label>
              <select
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2DD4BF] focus:outline-none"
              >
                <option value="">Select experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>

            <div>
              <Label htmlFor="availability" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
                Availability
              </Label>
              <select
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2DD4BF] focus:outline-none"
              >
                <option value="immediate">Immediate</option>
                <option value="2weeks">2 weeks notice</option>
                <option value="1month">1 month notice</option>
                <option value="2months">2 months notice</option>
                <option value="3months">3+ months</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="salary" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
              Expected Salary (Optional)
            </Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="border-2 border-gray-200 focus:border-[#2DD4BF]"
              placeholder="e.g., $120,000 - $150,000"
            />
          </div>

          <div>
            <Label htmlFor="coverLetter" className="text-sm font-semibold text-[#1a1a1a] mb-2 block">
              Cover Letter *
            </Label>
            <Textarea
              id="coverLetter"
              rows={5}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              className={`border-2 ${errors.coverLetter ? "border-red-300" : "border-gray-200"} focus:border-[#2DD4BF]`}
              placeholder="Tell us why you're the perfect fit for this role and what excites you about this opportunity..."
            />
            {errors.coverLetter && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.coverLetter}
              </div>
            )}
            <div className="text-right text-sm text-gray-500 mt-1">{formData.coverLetter.length}/1000</div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-[#6a6a6a] leading-relaxed">
              <strong>Privacy Notice:</strong> Your personal information will be processed in accordance with our
              privacy policy. We will only use your data for recruitment purposes and will not share it with third
              parties without your consent.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0d9488] text-white font-semibold"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
