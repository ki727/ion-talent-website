import { type NextRequest, NextResponse } from "next/server"
import { sendReferralEmail } from "@/lib/email"
import { DEFAULT_REFERRAL_STATUS } from "@/lib/referrals"

const REQUIRED_FIELDS = [
  "referrerName",
  "referrerEmail",
  "referrerPhone",
  "companyName",
  "companyLocation",
  "contactName",
  "contactJobTitle",
  "contactDetails",
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
      referrerPhone: data.referrerPhone.trim(),
      companyName: data.companyName.trim(),
      companyLocation: data.companyLocation.trim(),
      contactName: data.contactName.trim(),
      contactJobTitle: data.contactJobTitle.trim(),
      contactDetails: data.contactDetails.trim(),
      rolesHiring: data.rolesHiring.trim(),
      relationship: data.relationship.trim(),
      additionalContext:
        typeof data.additionalContext === "string" && data.additionalContext.trim()
          ? data.additionalContext.trim()
          : undefined,
      genuineIntroduction: true,
      termsAcknowledged: true,
      status: DEFAULT_REFERRAL_STATUS,
      timestamp: new Date().toISOString(),
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
