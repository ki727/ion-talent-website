import { type NextRequest, NextResponse } from "next/server"
import { sendReferralEmail } from "@/lib/mailer"

const REQUIRED_FIELDS = [
  "referrerName",
  "referrerEmail",
  "referrerPhone",
  "companyName",
  "companyLocation",
  "contactName",
  "contactJobTitle",
  "contactEmail",
  "rolesHiring",
  "relationship",
] as const

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    for (const key of REQUIRED_FIELDS) {
      if (typeof data[key] !== "string" || !data[key].trim()) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${key}` },
          { status: 400 },
        )
      }
    }

    if (data.genuineIntroduction !== true) {
      return NextResponse.json(
        { success: false, message: "You must confirm this is a genuine introduction." },
        { status: 400 },
      )
    }

    if (data.termsAcknowledged !== true) {
      return NextResponse.json(
        { success: false, message: "You must acknowledge the referral terms." },
        { status: 400 },
      )
    }

    await sendReferralEmail({
      referrerName: data.referrerName.trim(),
      referrerEmail: data.referrerEmail.trim(),
      companyName: data.companyName.trim(),
      contactName: data.contactName.trim(),
      contactEmail: data.contactEmail.trim(),
      contactLinkedin:
        typeof data.contactLinkedin === "string" && data.contactLinkedin.trim()
          ? data.contactLinkedin.trim()
          : undefined,
      hiringNote: [
        `Referrer phone: ${data.referrerPhone.trim()}`,
        `Company location: ${data.companyLocation.trim()}`,
        `Contact job title: ${data.contactJobTitle.trim()}`,
        `Roles hiring: ${data.rolesHiring.trim()}`,
        `Relationship: ${data.relationship.trim()}`,
        typeof data.additionalContext === "string" && data.additionalContext.trim()
          ? `Additional context: ${data.additionalContext.trim()}`
          : "",
      ].filter(Boolean).join("\n"),
      pageUrl: "/refer",
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Introduction submitted successfully",
    })
  } catch (error) {
    console.error("Error processing referral:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit introduction. Please try again." },
      { status: 500 },
    )
  }
}
