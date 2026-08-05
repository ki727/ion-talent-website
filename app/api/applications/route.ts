import { type NextRequest, NextResponse } from "next/server"
import { sendApplicationEmail } from "@/lib/mailer"
import { isDuplicateSubmission } from "@/lib/dedupe"

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
    const linkedin = String(formData.get("linkedin") || "").trim() || undefined
    const message = String(formData.get("message") || "").trim() || undefined
    const roleTitle = String(formData.get("roleTitle") || "").trim()
    const roleUrl = String(formData.get("roleUrl") || "").trim()
    const roleCategory = String(formData.get("roleCategory") || "").trim()
    const roleLocation = String(formData.get("roleLocation") || "").trim()
    const roleType = String(formData.get("roleType") || "").trim()

    if (!firstName) {
      return NextResponse.json({ success: false, message: "First name is required." }, { status: 400 })
    }
    if (!lastName) {
      return NextResponse.json({ success: false, message: "Last name is required." }, { status: 400 })
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ success: false, message: "A valid email is required." }, { status: 400 })
    }
    if (!roleTitle) {
      return NextResponse.json({ success: false, message: "Missing role information." }, { status: 400 })
    }

    const cvFile = formData.get("cv")
    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ success: false, message: "Please attach your CV." }, { status: 400 })
    }

    const lowerName = cvFile.name.toLowerCase()
    const validExtension = ACCEPTED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
    const validMime = !cvFile.type || ACCEPTED_MIME.includes(cvFile.type)
    if (!validExtension || !validMime) {
      return NextResponse.json({ success: false, message: "CV must be a PDF, DOC or DOCX file." }, { status: 400 })
    }

    if (cvFile.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { success: false, message: "CV must be 4 MB or smaller." },
        { status: 400 },
      )
    }

    // Best-effort de-dupe: a double-click on submit shouldn't send two emails.
    if (isDuplicateSubmission(`application:${email.toLowerCase()}:${roleTitle}`)) {
      return NextResponse.json({ success: true, message: "Application already received." })
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())

    await sendApplicationEmail({
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      message,
      roleTitle,
      roleUrl,
      roleCategory,
      roleLocation,
      roleType,
      submittedAt: new Date().toISOString(),
      cvFile: { filename: cvFile.name, content: cvBuffer },
    })

    return NextResponse.json({ success: true, message: "Application sent." })
  } catch (error) {
    console.error("[ION] applications error:", error)
    return NextResponse.json(
      { success: false, message: "We couldn't submit your application. Please try again in a moment." },
      { status: 500 },
    )
  }
}
