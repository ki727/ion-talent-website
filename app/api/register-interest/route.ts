import { type NextRequest, NextResponse } from "next/server"
import { sendCandidateRegistrationEmail } from "@/lib/email"

const MAX_CV_BYTES = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "mobile",
  "linkedin",
  "currentLocation",
  "desiredRole",
  "noticePeriod",
  "expectedSalary",
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
        { success: false, message: "CV must be 10 MB or smaller." },
        { status: 400 },
      )
    }

    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
    const coverNote =
      typeof formData.get("coverNote") === "string"
        ? (formData.get("coverNote") as string).trim()
        : undefined

    await sendCandidateRegistrationEmail({
      fullName: fields.fullName,
      email: fields.email,
      mobile: fields.mobile,
      linkedin: fields.linkedin,
      currentLocation: fields.currentLocation,
      desiredRole: fields.desiredRole,
      noticePeriod: fields.noticePeriod,
      expectedSalary: fields.expectedSalary,
      coverNote,
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
