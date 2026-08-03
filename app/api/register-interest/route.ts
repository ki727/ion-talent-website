import { type NextRequest, NextResponse } from "next/server"
import { sendCandidateRegistrationEmail } from "@/lib/email"

const MAX_CV_BYTES = 5 * 1024 * 1024 // 5MB
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "currentLocation",
  "currentJobTitle",
  "desiredRole",
  "primaryFunction",
  "yearsExperience",
  "linkedin",
  "availability",
  "additionalInfo",
] as const

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fields: Record<string, string> = {}
    for (const key of REQUIRED_FIELDS) {
      const value = formData.get(key)
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${key}` },
          { status: 400 },
        )
      }
      fields[key] = value.trim()
    }

    if (formData.get("consent") !== "true") {
      return NextResponse.json(
        { success: false, message: "Consent to data processing is required." },
        { status: 400 },
      )
    }

    const cvFile = formData.get("cv")
    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ success: false, message: "A CV file is required." }, { status: 400 })
    }

    const lowerName = cvFile.name.toLowerCase()
    if (!ACCEPTED_EXTENSIONS.some((ext) => lowerName.endsWith(ext))) {
      return NextResponse.json(
        { success: false, message: "CV must be a PDF, DOC or DOCX file." },
        { status: 400 },
      )
    }

    if (cvFile.size > MAX_CV_BYTES) {
      return NextResponse.json(
        { success: false, message: "CV must be 5MB or smaller." },
        { status: 400 },
      )
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())

    await sendCandidateRegistrationEmail({
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      phone: fields.phone,
      currentLocation: fields.currentLocation,
      currentJobTitle: fields.currentJobTitle,
      desiredRole: fields.desiredRole,
      primaryFunction: fields.primaryFunction,
      yearsExperience: fields.yearsExperience,
      linkedin: fields.linkedin,
      availability: fields.availability,
      additionalInfo: fields.additionalInfo,
      consent: true,
      marketingOptIn: formData.get("marketingOptIn") === "true",
      timestamp: new Date().toISOString(),
      cvFile: {
        filename: cvFile.name,
        content: cvBuffer,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
    })
  } catch (error) {
    console.error("Error processing candidate registration:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit registration. Please try again." },
      { status: 500 },
    )
  }
}
