import { type NextRequest, NextResponse } from "next/server"
import { sendReferralEmail } from "@/lib/mailer"
import { isDuplicateSubmission } from "@/lib/dedupe"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Deliberately lenient: accepts a full URL ("https://linkedin.com/in/x") or a
// bare domain-style string ("linkedin.com/in/x") so a pasted LinkedIn profile
// works either way, without accepting arbitrary unstructured text.
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i

function isValidContactDetails(value: string): boolean {
  return EMAIL_RE.test(value) || URL_RE.test(value)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Honeypot — real visitors never see or fill this field, bots often do.
    if (typeof data.companyWebsite === "string" && data.companyWebsite.trim()) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 })
    }

    const referrerName = typeof data.referrerName === "string" ? data.referrerName.trim() : ""
    const referrerEmail = typeof data.referrerEmail === "string" ? data.referrerEmail.trim() : ""
    const companyName = typeof data.companyName === "string" ? data.companyName.trim() : ""
    const contactName = typeof data.contactName === "string" ? data.contactName.trim() : ""
    const contactDetails = typeof data.contactDetails === "string" ? data.contactDetails.trim() : ""
    const hiringNote =
      typeof data.hiringNote === "string" && data.hiringNote.trim() ? data.hiringNote.trim() : undefined
    const pageUrl = typeof data.pageUrl === "string" ? data.pageUrl.trim() : ""

    if (!referrerName) {
      return NextResponse.json({ success: false, message: "Your name is required." }, { status: 400 })
    }
    if (!referrerEmail || !EMAIL_RE.test(referrerEmail)) {
      return NextResponse.json({ success: false, message: "A valid email address is required." }, { status: 400 })
    }
    if (!companyName) {
      return NextResponse.json({ success: false, message: "Company being referred is required." }, { status: 400 })
    }
    if (!contactName) {
      return NextResponse.json({ success: false, message: "Hiring contact's name is required." }, { status: 400 })
    }
    if (!contactDetails || !isValidContactDetails(contactDetails)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address or LinkedIn/web URL for the hiring contact." },
        { status: 400 },
      )
    }
    if (data.permissionConfirmed !== true) {
      return NextResponse.json(
        { success: false, message: "Please confirm you have permission to share these details." },
        { status: 400 },
      )
    }

    // Best-effort de-dupe: a double-click on submit shouldn't send two emails.
    if (isDuplicateSubmission(`referral:${referrerEmail.toLowerCase()}:${companyName.toLowerCase()}`)) {
      return NextResponse.json({ success: true, message: "Introduction already received." })
    }

    await sendReferralEmail({
      referrerName,
      referrerEmail,
      companyName,
      contactName,
      contactDetails,
      hiringNote,
      pageUrl,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Introduction sent." })
  } catch (error) {
    // Never log submitted names, emails or company details — only the failure itself.
    console.error("[ION] referrals error:", error instanceof Error ? error.message : "unknown error")
    return NextResponse.json(
      { success: false, message: "We couldn't send your introduction. Please try again in a moment." },
      { status: 500 },
    )
  }
}
