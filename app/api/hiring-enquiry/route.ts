import { type NextRequest, NextResponse } from "next/server"
import { sendHiringEnquiryEmail } from "@/lib/mailer"
import { isDuplicateSubmission } from "@/lib/dedupe"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot — real visitors never see or fill this field, bots often do.
    if (typeof data.companyWebsite === "string" && data.companyWebsite.trim()) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 })
    }

    const fullName = typeof data.fullName === "string" ? data.fullName.trim() : ""
    const businessEmail = typeof data.businessEmail === "string" ? data.businessEmail.trim() : ""
    const company = typeof data.company === "string" ? data.company.trim() : ""
    const projectDetails = typeof data.projectDetails === "string" ? data.projectDetails.trim() : ""
    const serviceInterest =
      typeof data.serviceInterest === "string" && data.serviceInterest.trim()
        ? data.serviceInterest.trim()
        : "General Enquiry"
    const timeline = typeof data.timeline === "string" ? data.timeline.trim() : undefined
    const phone = typeof data.phone === "string" ? data.phone.trim() : undefined
    const pageUrl = typeof data.pageUrl === "string" ? data.pageUrl.trim() : ""

    if (!fullName) {
      return NextResponse.json({ success: false, message: "Full name is required." }, { status: 400 })
    }
    if (!businessEmail || !EMAIL_RE.test(businessEmail)) {
      return NextResponse.json({ success: false, message: "A valid business email is required." }, { status: 400 })
    }
    if (!company) {
      return NextResponse.json({ success: false, message: "Company is required." }, { status: 400 })
    }
    if (!projectDetails || projectDetails.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a few more details about your hiring needs." },
        { status: 400 },
      )
    }

    // Best-effort de-dupe: a double-click on submit shouldn't send two emails.
    if (isDuplicateSubmission(`hiring:${businessEmail.toLowerCase()}`)) {
      return NextResponse.json({ success: true, message: "Enquiry already received." })
    }

    await sendHiringEnquiryEmail({
      fullName,
      businessEmail,
      company,
      phone,
      serviceInterest,
      timeline,
      projectDetails,
      pageUrl,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Hiring enquiry sent." })
  } catch (error) {
    console.error("[ION] hiring-enquiry error:", error)
    return NextResponse.json(
      { success: false, message: "We couldn't send your enquiry. Please try again in a moment." },
      { status: 500 },
    )
  }
}
