import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.company || !data.message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    await sendContactEmail({
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      service: data.service,
      message: data.message,
      timeline: data.timeline,
      timestamp: data.timestamp,
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
