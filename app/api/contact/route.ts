import { type NextRequest, NextResponse } from "next/server"
import { sendHiringEnquiryEmail } from "@/lib/mailer"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.company || !data.message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    await sendHiringEnquiryEmail({
      fullName: data.name,
      businessEmail: data.email,
      company: data.company,
      phone: data.phone,
      serviceInterest: data.service || "General Enquiry",
      projectDetails: data.message,
      timeline: data.timeline,
      pageUrl: data.pageUrl || "",
      submittedAt: data.timestamp || new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
    })
  } catch (error) {
    console.error("[ION] contact form error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit contact form" }, { status: 500 })
  }
}
