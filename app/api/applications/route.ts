import { type NextRequest, NextResponse } from "next/server"
import { sendApplicationEmail } from "@/lib/mailer"
import { isDuplicateSubmission, releaseSubmission } from "@/lib/dedupe"
import { asksCurrentSalary, NOTICE_PERIODS, normalizedLinkedin, validInternationalPhone, validFixedSalary, formatFixedSalary } from "@/lib/application-screening"
import { opportunities } from "@/lib/opportunities"

// Kept comfortably under Vercel's serverless function request-body limit
// (4.5 MB total, including all other form fields and multipart overhead).
// Not exported: Next.js route files may only export recognized handlers
// (POST, GET, config, etc.) — an extra named export fails typed-route
// validation. This constant is only used within this file.
const MAX_CV_BYTES = 4 * 1024 * 1024 // 4 MB

const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]
const ACCEPTED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let submissionKey: string | undefined
  try {
    const formData = await request.formData()

    // Honeypot — real visitors never see or fill this field, bots often do.
    const honeypot = formData.get("companyWebsite")
    if (typeof honeypot === "string" && honeypot.trim()) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 })
    }

    const firstName = String(formData.get("firstName") || "").trim()
    const lastName = String(formData.get("lastName") || "").trim()
    const email = String(formData.get("email") || "").trim()
    const phone = String(formData.get("phone") || "").trim() || undefined
    const linkedinInput = String(formData.get("linkedin") || "").trim()
    const linkedin = normalizedLinkedin(linkedinInput) || undefined
    const currentLocation = String(formData.get("currentLocation") || "").trim()
    const noticePeriod = String(formData.get("noticePeriod") || "").trim()
    const currentSalaryInput = String(formData.get("currentSalary") || "").trim()
    const expectedSalaryInput = String(formData.get("expectedSalary") || "").trim()
    const currentCurrency = String(formData.get("currentCurrency") || "").trim().toUpperCase()
    const expectedCurrency = String(formData.get("expectedCurrency") || "").trim().toUpperCase()
    const message = String(formData.get("message") || "").trim() || undefined
    const roleTitle = String(formData.get("roleTitle") || "").trim()
    const roleUrl = String(formData.get("roleUrl") || "").trim()
    const roleCategory = String(formData.get("roleCategory") || "").trim()
    const roleLocation = String(formData.get("roleLocation") || "").trim()
    const roleType = String(formData.get("roleType") || "").trim()

    if (!firstName) {
      return NextResponse.json({ success: false, message: "First name is required." }, { status: 400 })
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, message: "A valid email is required." }, { status: 400 })
    }
    if (!roleTitle) {
      return NextResponse.json({ success: false, message: "Missing role information." }, { status: 400 })
    }

    // Resolve the role from the server-side catalogue, not user-supplied location metadata.
    let rolePath = ""
    try { rolePath = new URL(roleUrl, "https://iontalentgroup.com").pathname.replace(/\/$/, "") } catch { /* invalid URL */ }
    const opportunity = opportunities.find((item) => rolePath === "/opportunities/" + item.slug && item.title === roleTitle)
    if (!opportunity) {
      return NextResponse.json({ success: false, message: "Missing or invalid role information." }, { status: 400 })
    }
    const showCurrentSalary = asksCurrentSalary(opportunity.locationLabel)
    if (!validFixedSalary(expectedSalaryInput, expectedCurrency) || (showCurrentSalary && !validFixedSalary(currentSalaryInput, currentCurrency, true))) {
      return NextResponse.json({ success: false, message: "Please enter valid fixed monthly salary amounts and currencies." }, { status: 400 })
    }
    const currentSalary = showCurrentSalary ? formatFixedSalary(currentSalaryInput, currentCurrency) : undefined
    const expectedSalary = formatFixedSalary(expectedSalaryInput, expectedCurrency)
    if (!phone || !validInternationalPhone(phone)) {
      return NextResponse.json({ success: false, message: "Please include a valid international phone number with country code." }, { status: 400 })
    }
    if (!currentLocation || currentLocation.length > 160 || !NOTICE_PERIODS.some((p) => p === noticePeriod)) {
      return NextResponse.json({ success: false, message: "Please complete all required screening fields." }, { status: 400 })
    }
    if (linkedinInput && !linkedin) {
      return NextResponse.json({ success: false, message: "Please enter a valid LinkedIn personal profile URL." }, { status: 400 })
    }

    const cvEntry = formData.get("cv")
    const cvFile = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : undefined
    if (!cvFile && !linkedin) {
      return NextResponse.json({ success: false, message: "Please upload your CV or provide a LinkedIn profile." }, { status: 400 })
    }
    if (cvFile) {
      const lowerName = cvFile.name.toLowerCase()
      const validExtension = ACCEPTED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
      const validMime = !cvFile.type || ACCEPTED_MIME.includes(cvFile.type)
      if (!validExtension || !validMime) {
        return NextResponse.json({ success: false, message: "CV must be a PDF, DOC or DOCX file." }, { status: 400 })
      }
      if (cvFile.size > MAX_CV_BYTES) {
        return NextResponse.json({ success: false, message: "CV must be 4 MB or smaller." }, { status: 400 })
      }
    }

    // Best-effort de-dupe: a double-click on submit shouldn't send two emails.
    submissionKey = `application:${email.toLowerCase()}:${roleTitle}`
    if (isDuplicateSubmission(submissionKey)) {
      return NextResponse.json({ success: true, message: "Application already received." })
    }

    const attachment = cvFile ? { filename: cvFile.name, content: Buffer.from(await cvFile.arrayBuffer()) } : undefined

    await sendApplicationEmail({
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      currentLocation,
      noticePeriod,
      currentSalary,
      expectedSalary,
      message,
      roleTitle,
      roleUrl,
      roleCategory,
      roleLocation,
      roleType,
      submittedAt: new Date().toISOString(),
      cvFile: attachment,
    })

    return NextResponse.json({ success: true, message: "Application sent." })
  } catch (error) {
    if (submissionKey) releaseSubmission(submissionKey)
    console.error("[ION] applications error:", error)
    return NextResponse.json(
      { success: false, message: "We couldn't submit your application. Please try again in a moment." },
      { status: 500 },
    )
  }
}
