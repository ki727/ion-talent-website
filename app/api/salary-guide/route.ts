import { type NextRequest, NextResponse } from "next/server"
import { sendSalaryGuideLeadEmail } from "@/lib/mailer"
import { isDuplicateSubmission } from "@/lib/dedupe"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot — real visitors never see or fill this field, bots often do.
    if (typeof data.companyWebsite === "string" && data.companyWebsite.trim()) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 })
    }

    const firstName = typeof data.firstName === "string" ? data.firstName.trim() : ""
    const lastName = typeof data.lastName === "string" ? data.lastName.trim() : ""
    const workEmail = typeof data.workEmail === "string" ? data.workEmail.trim() : ""
    const company = typeof data.company === "string" ? data.company.trim() : ""
    const jobTitle = typeof data.jobTitle === "string" ? data.jobTitle.trim() : ""
    const marketingOptIn = data.marketingOptIn === true
    const pageUrl = typeof data.pageUrl === "string" ? data.pageUrl.trim() : ""

    if (!firstName) {
      return NextResponse.json({ success: false, message: "First name is required." }, { status: 400 })
    }
    if (!lastName) {
      return NextResponse.json({ success: false, message: "Last name is required." }, { status: 400 })
    }
    if (!workEmail || !EMAIL_RE.test(workEmail)) {
      return NextResponse.json({ success: false, message: "A valid work email is required." }, { status: 400 })
    }
    if (!company) {
      return NextResponse.json({ success: false, message: "Company is required." }, { status: 400 })
    }
    if (!jobTitle) {
      return NextResponse.json({ success: false, message: "Job title is required." }, { status: 400 })
    }

    // Best-effort de-dupe: a double-click on submit shouldn't send two emails.
    if (isDuplicateSubmission(`salary-guide:${workEmail.toLowerCase()}`)) {
      return NextResponse.json({ success: true, message: "Guide already sent." })
    }

    await sendSalaryGuideLeadEmail({
      firstName,
      lastName,
      workEmail,
      company,
      jobTitle,
      marketingOptIn,
      pageUrl,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Guide sent." })
  } catch (error) {
    console.error("[ION] salary-guide error:", error)
    return NextResponse.json(
      { success: false, message: "We couldn't process your request. Please try again in a moment." },
      { status: 500 },
    )
  }
}
