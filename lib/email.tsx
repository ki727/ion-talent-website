import nodemailer from "nodemailer"

/**
 * Central email transport for all ION Talent form submissions.
 *
 * Credentials are read from server-only environment variables and are never
 * exposed to the client. The transporter is created lazily so that a missing
 * credential can never break the production build - it only surfaces as a
 * runtime error on the affected API route.
 */

const NAVY = "#0F172A"
const TEAL = "#14A8A8"
const BORDER = "#E2E8F0"

/** Where internal notifications are delivered. */
export function getRecipient(): string {
  return process.env.MAIL_TO || "ki@iontalentgroup.com"
}

function getTransporter() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in your environment variables.",
    )
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })
}

/** Escapes user-supplied values before they are placed into an HTML email. */
function esc(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-"
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

type Row = [label: string, value: unknown]

function buildEmail(title: string, subtitle: string, rows: Row[]): string {
  const body = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid ${BORDER};font-size:13px;color:#64748B;width:38%;vertical-align:top;">${esc(
            label,
          )}</td>
          <td style="padding:12px 16px;border-bottom:1px solid ${BORDER};font-size:14px;color:${NAVY};font-weight:500;white-space:pre-wrap;">${esc(
            value,
          )}</td>
        </tr>`,
    )
    .join("")

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
      <tr>
        <td style="background:${NAVY};padding:24px;">
          <p style="margin:0;color:${TEAL};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;">ION Talent</p>
          <h1 style="margin:8px 0 0;color:#FFFFFF;font-size:20px;font-weight:700;">${esc(title)}</h1>
          <p style="margin:6px 0 0;color:#CBD5E1;font-size:13px;">${esc(subtitle)}</p>
        </td>
      </tr>
      <tr><td><table role="presentation" cellpadding="0" cellspacing="0" width="100%">${body}</table></td></tr>
      <tr>
        <td style="padding:16px 24px;background:#F8FAFC;">
          <p style="margin:0;color:#94A3B8;font-size:12px;">Sent automatically from iontalentgroup.com</p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

async function send(options: {
  subject: string
  html: string
  replyTo?: string
  attachments?: { filename: string; content: Buffer }[]
}) {
  const transporter = getTransporter()

  return transporter.sendMail({
    from: `"ION Talent Website" <${process.env.GMAIL_USER}>`,
    to: getRecipient(),
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments,
  })
}

/* -------------------------------------------------------------------------- */
/*  Existing forms                                                             */
/* -------------------------------------------------------------------------- */

export interface ContactEmailData {
  name: string
  email: string
  company: string
  phone?: string
  service?: string
  message: string
  timeline?: string
  timestamp?: string
}

export async function sendContactEmail(data: ContactEmailData) {
  return send({
    subject: `New enquiry from ${data.name} - ${data.company}`,
    replyTo: data.email,
    html: buildEmail("New Client Enquiry", "Submitted via the website contact form", [
      ["Name", data.name],
      ["Email", data.email],
      ["Company", data.company],
      ["Phone", data.phone],
      ["Service", data.service],
      ["Timeline", data.timeline],
      ["Message", data.message],
      ["Submitted", data.timestamp || new Date().toISOString()],
    ]),
  })
}

export interface CVEmailData {
  firstName: string
  lastName: string
  email: string
  yearsExperience?: string
  linkedin?: string
  location?: string
  currentRole?: string
  desiredRole?: string
  salary?: string
  availability?: string
  message?: string
  timestamp?: string
  cvFile: { filename: string; content: Buffer }
}

export async function sendCVEmail(data: CVEmailData) {
  return send({
    subject: `CV submission - ${data.firstName} ${data.lastName}`,
    replyTo: data.email,
    attachments: [data.cvFile],
    html: buildEmail("New CV Submission", `${data.firstName} ${data.lastName}`, [
      ["Name", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Years of experience", data.yearsExperience],
      ["LinkedIn", data.linkedin],
      ["Current location", data.location],
      ["Current role", data.currentRole],
      ["Desired role", data.desiredRole],
      ["Expected salary", data.salary],
      ["Availability", data.availability],
      ["Additional information", data.message],
      ["CV attached", data.cvFile.filename],
      ["Submitted", data.timestamp || new Date().toISOString()],
    ]),
  })
}

/* -------------------------------------------------------------------------- */
/*  Opportunities: candidate registration                                      */
/* -------------------------------------------------------------------------- */

/** Internal recipient for candidate applications. */
export function getApplicationRecipient(): string {
  return process.env.APPLY_MAIL_TO || "apply@iontalentgroup.com"
}

export interface CandidateRegistrationData {
  fullName: string
  email: string
  mobile: string
  linkedin: string
  currentLocation: string
  desiredRole: string
  noticePeriod: string
  expectedSalary: string
  coverNote?: string
  marketingOptIn: boolean
  consent: boolean
  timestamp: string
  cvFile: { filename: string; content: Buffer }
}

export async function sendCandidateRegistrationEmail(data: CandidateRegistrationData) {
  const transporter = getTransporter()
  const html = buildEmail(
    "Candidate Registration",
    `${data.fullName} — ${data.desiredRole}`,
    [
      ["Full name", data.fullName],
      ["Email", data.email],
      ["Mobile", data.mobile],
      ["LinkedIn", data.linkedin],
      ["Current location", data.currentLocation],
      ["Desired role", data.desiredRole],
      ["Notice period", data.noticePeriod],
      ["Expected salary", data.expectedSalary],
      ["Cover note", data.coverNote],
      ["Consent given", data.consent ? "Yes" : "No"],
      ["Marketing opt-in", data.marketingOptIn ? "Yes" : "No"],
      ["CV attached", data.cvFile.filename],
      ["Submitted", data.timestamp],
    ],
  )

  // Send internal notification to apply@iontalentgroup.com
  await transporter.sendMail({
    from: `"ION Talent Website" <${process.env.GMAIL_USER}>`,
    to: getApplicationRecipient(),
    replyTo: data.email,
    subject: `Candidate registration — ${data.fullName} (${data.desiredRole})`,
    html,
    attachments: [data.cvFile],
  })

  // Send candidate acknowledgement
  const ackHtml = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;overflow:hidden;">
      <tr><td style="background:#0F172A;padding:24px;">
        <p style="margin:0;color:#14A8A8;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;">ION Talent</p>
        <h1 style="margin:8px 0 0;color:#FFFFFF;font-size:20px;font-weight:700;">Thank you, ${esc(data.fullName)}</h1>
      </td></tr>
      <tr><td style="padding:24px;">
        <p style="font-size:14px;color:#334155;line-height:1.6;">Thank you for registering your interest with ION Talent. Your details have been added to our specialist network for <strong>${esc(data.desiredRole)}</strong> opportunities.</p>
        <p style="font-size:14px;color:#334155;line-height:1.6;">We review registrations carefully and will be in touch when your experience matches a relevant live requirement. In the meantime, please do not hesitate to contact us directly at <a href="mailto:hello@iontalentgroup.com" style="color:#14A8A8;">hello@iontalentgroup.com</a>.</p>
        <p style="font-size:13px;color:#64748B;margin-top:24px;">ION Talent<br>iontalentgroup.com</p>
      </td></tr>
    </table>
  </body>
</html>`

  await transporter.sendMail({
    from: `"ION Talent" <${process.env.GMAIL_USER}>`,
    to: data.email,
    subject: `Your ION Talent registration — ${data.desiredRole}`,
    html: ackHtml,
  })
}

/* -------------------------------------------------------------------------- */
/*  Referrals                                                                  */
/* -------------------------------------------------------------------------- */

export interface ReferralEmailData {
  referrerName: string
  referrerEmail: string
  referrerPhone: string
  companyName: string
  companyLocation: string
  contactName: string
  contactJobTitle: string
  contactDetails: string
  rolesHiring: string
  relationship: string
  additionalContext?: string
  genuineIntroduction: boolean
  termsAcknowledged: boolean
  status: string
  timestamp: string
}

export async function sendReferralEmail(data: ReferralEmailData) {
  return send({
    subject: `Company introduction - ${data.companyName} (via ${data.referrerName})`,
    replyTo: data.referrerEmail,
    html: buildEmail("New Company Introduction", `${data.companyName} - ${data.companyLocation}`, [
      ["Internal status", data.status],
      ["Referrer name", data.referrerName],
      ["Referrer email", data.referrerEmail],
      ["Referrer phone", data.referrerPhone],
      ["Company name", data.companyName],
      ["Company location", data.companyLocation],
      ["Hiring contact", data.contactName],
      ["Contact job title", data.contactJobTitle],
      ["Contact email or LinkedIn", data.contactDetails],
      ["Roles hiring for", data.rolesHiring],
      ["Referral source", data.relationship],
      ["Additional context", data.additionalContext],
      ["Genuine introduction confirmed", data.genuineIntroduction ? "Yes" : "No"],
      ["Referral terms acknowledged", data.termsAcknowledged ? "Yes" : "No"],
      ["Submitted", data.timestamp],
    ]),
  })
}
