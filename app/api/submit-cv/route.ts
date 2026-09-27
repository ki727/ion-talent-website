import { type NextRequest, NextResponse } from "next/server"
import { sendCandidateRegistrationEmail } from "@/lib/mailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const yearsExperience = formData.get("yearsExperience") as string
    const linkedin = formData.get("linkedin") as string
    const location = formData.get("location") as string
    const currentRole = formData.get("currentRole") as string
    const desiredRole = formData.get("desiredRole") as string
    const salary = formData.get("salary") as string
    const availability = formData.get("availability") as string
    const message = formData.get("message") as string
    const cvFile = formData.get("cv") as File

    // Validate required fields
    if (!firstName || !lastName || !email || !cvFile) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Convert file to buffer for email attachment
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())

    await sendCandidateRegistrationEmail({
      fullName: `${firstName} ${lastName}`,
      email,
      mobile: "Not provided",
      linkedin: linkedin || "Not provided",
      currentLocation: location || "Not provided",
      desiredRole: desiredRole || currentRole || "General opportunities",
      noticePeriod: availability || "Not provided",
      expectedSalary: salary || "Not provided",
      coverNote: [yearsExperience && `Experience: ${yearsExperience}`, message].filter(Boolean).join("\n") || undefined,
      cvFile: {
        filename: cvFile.name,
        content: cvBuffer,
      },
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "CV submitted successfully",
    })
  } catch (error) {
    console.error("[ION] submit-cv error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit CV" }, { status: 500 })
  }
}
