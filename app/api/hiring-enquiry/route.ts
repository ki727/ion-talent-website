import { type NextRequest, NextResponse } from "next/server"
import { sendHiringEnquiryEmail } from "@/lib/mailer"
import { ENQUIRY_MARKETS, normaliseEnquiryMarket, normaliseEnquirySource, normaliseEnquirySector } from "@/lib/enquiry-context"
import { isDuplicateSubmission, releaseSubmission } from "@/lib/dedupe"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let submissionKey: string | undefined
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
    const pageUrl = typeof data.pageUrl === "string" ? data.pageUrl.trim().slice(0, 2000) : ""
    const market = normaliseEnquiryMarket(data.market)
    const sourcePage = normaliseEnquirySource(data.sourcePage)
    const sector = normaliseEnquirySector(data.sector)
    if (typeof data.market === "string" && data.market && !market) {
      return NextResponse.json({ success: false, message: "Please select a valid hiring market." }, { status: 400 })
    }

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

    if (fullName.length > 150 || company.length > 200 || businessEmail.length > 254 || projectDetails.length > 500) {
      return NextResponse.json({ success: false, message: "Please keep your enquiry within the field limits." }, { status: 400 })
    }

    // Best-effort de-dupe: a double-click on submit shouldn't send two emails.
    submissionKey = `hiring:${businessEmail.toLowerCase()}`
    if (isDuplicateSubmission(submissionKey)) {
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
      market: ENQUIRY_MARKETS.find(item => item.slug === market)?.label,
      sourcePage: sourcePage || undefined,
      sector: sector || undefined,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Hiring enquiry sent." })
  } catch (error) {
    if (submissionKey) releaseSubmission(submissionKey)
    console.error("[ION] hiring-enquiry error:", error)
    return NextResponse.json(
      { success: false, message: "We couldn't send your enquiry. Please try again in a moment." },
      { status: 500 },
    )
  }
}
