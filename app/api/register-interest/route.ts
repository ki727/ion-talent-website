import { type NextRequest, NextResponse } from "next/server"
import { sendCandidateRegistrationEmail } from "@/lib/mailer"
import { isDuplicateSubmission, releaseSubmission } from "@/lib/dedupe"

import { NOTICE_PERIODS, normalizedLinkedin, validContactPhone, validFixedSalary, formatFixedSalary } from "@/lib/application-screening"

const MAX_CV_BYTES = 4 * 1024 * 1024 // Vercel multipart body limit
const ACCEPTED_MIME = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "mobile",
  "currentLocation",
  "desiredRole",
  "noticePeriod",
  "expectedSalary",
] as const

export async function POST(request: NextRequest) {
  let submissionKey: string | undefined
  try {
    const formData = await request.formData()

    const fields: Record<string, string> = {}
    for (const key of REQUIRED_FIELDS) {
      const value = formData.get(key)
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${key}` },
          { status: 400 },
        )
      }
      fields[key] = value.trim()
    }
    if (String(formData.get("companyWebsite") || "").trim()) return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || !validContactPhone(fields.mobile) || fields.currentLocation.length > 160 || fields.desiredRole.length > 160 || fields.fullName.length > 160 || !NOTICE_PERIODS.some(p => p === fields.noticePeriod)) {
      return NextResponse.json({ success: false, message: "Please complete all required screening fields." }, { status: 400 })
    }
    const expectedCurrency = String(formData.get("expectedCurrency") || "").trim().toUpperCase()
    if (!validFixedSalary(fields.expectedSalary, expectedCurrency)) return NextResponse.json({ success: false, message: "Please enter a valid fixed monthly salary and currency." }, { status: 400 })
    const linkedinInput = String(formData.get("linkedin") || "").trim()
    const linkedin = normalizedLinkedin(linkedinInput)
    if (linkedinInput && !linkedin) return NextResponse.json({ success: false, message: "Please enter a valid LinkedIn personal profile URL." }, { status: 400 })

    const cvEntry = formData.get("cv")
    const cvFile = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : undefined
    if (!cvFile && !linkedin) return NextResponse.json({ success: false, message: "Please upload your CV or provide a LinkedIn profile." }, { status: 400 })
    if (cvFile) {
      if (!ACCEPTED_EXTENSIONS.some(ext => cvFile.name.toLowerCase().endsWith(ext)) || (cvFile.type && !ACCEPTED_MIME.includes(cvFile.type))) return NextResponse.json({ success: false, message: "CV must be a PDF, DOC or DOCX file." }, { status: 400 })
      if (cvFile.size > MAX_CV_BYTES) return NextResponse.json({ success: false, message: "CV must be 4 MB or smaller." }, { status: 400 })
    }
    const attachment = cvFile ? { filename: cvFile.name, content: Buffer.from(await cvFile.arrayBuffer()) } : undefined
    const coverNote =
      typeof formData.get("coverNote") === "string"
        ? (formData.get("coverNote") as string).trim()
        : undefined

    submissionKey = `registration:${fields.email.toLowerCase()}:${fields.desiredRole.toLowerCase()}`
    if (isDuplicateSubmission(submissionKey)) {
      return NextResponse.json({ success: true, message: "Registration already received." })
    }

    await sendCandidateRegistrationEmail({
      fullName: fields.fullName,
      email: fields.email,
      mobile: fields.mobile,
      linkedin: linkedin || "Not provided",
      currentLocation: fields.currentLocation,
      desiredRole: fields.desiredRole,
      noticePeriod: fields.noticePeriod,
      expectedSalary: formatFixedSalary(fields.expectedSalary, expectedCurrency),
      coverNote,
      marketingOptIn: formData.get("marketingOptIn") === "true",
      timestamp: new Date().toISOString(),
      cvFile: attachment,
    })

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
    })
  } catch (error) {
    if (submissionKey) releaseSubmission(submissionKey)
    console.error("[ION] candidate registration error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit registration. Please try again." },
      { status: 500 },
    )
  }
}
