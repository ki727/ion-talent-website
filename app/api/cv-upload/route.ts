import { type NextRequest, NextResponse } from "next/server"
import { sendCVEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      linkedin: formData.get("linkedin") as string,
      location: formData.get("location") as string,
      currentRole: formData.get("currentRole") as string,
      desiredRole: formData.get("desiredRole") as string,
      salary: formData.get("salary") as string,
      availability: formData.get("availability") as string,
      message: formData.get("message") as string,
      timestamp: formData.get("timestamp") as string,
    }

    // Extract CV file
    const cvFile = formData.get("cv") as File

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !cvFile) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Convert file to buffer
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())

    // Send email with CV attachment
    await sendCVEmail({
      ...data,
      cvFile: {
        filename: cvFile.name,
        content: cvBuffer,
      },
    })

    return NextResponse.json({
      success: true,
      message: "CV submitted successfully",
    })
  } catch (error) {
    console.error("[ION] cv-upload error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit CV" }, { status: 500 })
  }
}
