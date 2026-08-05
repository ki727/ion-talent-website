import nodemailer from "nodemailer"

/**
 * SMTP transport for the two live submission flows: employer hiring enquiries
 * and candidate applications. Google Workspace SMTP, authenticated with an
 * app password — never the account password.
 *
 * Required environment variables (server-only, never exposed to the browser):
 *
 *   SMTP_HOST            e.g. smtp.gmail.com
 *   SMTP_PORT            e.g. 465
 *   SMTP_USER            authenticated mailbox
 *   SMTP_PASS            app password for that mailbox
 *   EMAIL_FROM           visible From address, e.g. "ION Talent" <noreply@iontalentgroup.com>
 *   HIRING_ENQUIRY_TO     recipient for employer enquiries
 *   APPLICATION_TO        recipient for candidate applications
 *   REFERRAL_TO           recipient for client referrals
 *
 * Optional (local development only):
 *
 *   SMTP_ALLOW_SELF_SIGNED=true   relaxes TLS certificate verification for
 *                                  this connection only — e.g. behind a
 *                                  corporate proxy or antivirus that
 *                                  MITM-inspects TLS with a self-signed cert.
 *                                  Only takes effect when NODE_ENV is not
 *                                  "production" AND this is exactly "true".
 *                                  Production always verifies certificates
 *                                  normally; this never sets
 *                                  NODE_TLS_REJECT_UNAUTHORIZED and never
 *                                  disables TLS verification globally.
 *
 * If any required variable is missing, sending throws immediately with a
 * clear configuration error rather than silently dropping the submission.
 */

const NAVY = "#0F172A"
const TEAL = "#0FA3A1"
const BORDER = "#E2E8F0"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `[ION Talent mailer] Configuration error: environment variable "${name}" is not set.`,
    )
  }
  return value
}

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null

/**
 * Dev-only, opt-in relaxation of TLS certificate verification for this SMTP
 * connection. Never applies in production, never touches
 * NODE_TLS_REJECT_UNAUTHORIZED (which would weaken TLS for the whole
 * process), and only fires when explicitly requested via
 * SMTP_ALLOW_SELF_SIGNED="true".
 */
function allowSelfSignedInDev(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.SMTP_ALLOW_SELF_SIGNED === "true"
}

function getTransporter() {
  if (cachedTransporter) return cachedTransporter

  const host = requireEnv("SMTP_HOST")
  const port = Number(requireEnv("SMTP_PORT"))
  const user = requireEnv("SMTP_USER")
  const pass = requireEnv("SMTP_PASS")

  const relaxTls = allowSelfSignedInDev()
  if (relaxTls) {
    console.warn(
      "[ION Talent mailer] SMTP_ALLOW_SELF_SIGNED=true — TLS certificate verification is relaxed for this " +
        "connection. Local development only; this has no effect when NODE_ENV=production.",
    )
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    ...(relaxTls ? { tls: { rejectUnauthorized: false } } : {}),
  })

  return cachedTransporter
}

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
          <td style="padding:12px 16px;border-bottom:1px solid ${BORDER};font-size:13px;color:#64748B;width:36%;vertical-align:top;">${esc(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid ${BORDER};font-size:14px;color:${NAVY};font-weight:500;white-space:pre-wrap;">${esc(value)}</td>
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

/* -------------------------------------------------------------------------- */
/*  Employer / hiring enquiry  →  HIRING_ENQUIRY_TO                           */
/* -------------------------------------------------------------------------- */

export interface HiringEnquiryData {
  fullName: string
  businessEmail: string
  company: string
  phone?: string
  serviceInterest: string
  timeline?: string
  projectDetails: string
  pageUrl: string
  submittedAt: string
}

export async function sendHiringEnquiryEmail(data: HiringEnquiryData) {
  const transporter = getTransporter()
  await transporter.sendMail({
    from: requireEnv("EMAIL_FROM"),
    to: requireEnv("HIRING_ENQUIRY_TO"),
    replyTo: data.businessEmail,
    subject: `Website Hiring Enquiry | ${data.company} | ${data.serviceInterest}`,
    html: buildEmail("Website Hiring Enquiry", `${data.fullName} — ${data.company}`, [
      ["Full Name", data.fullName],
      ["Business Email", data.businessEmail],
      ["Company", data.company],
      ["Phone", data.phone],
      ["Service Interest", data.serviceInterest],
      ["Timeline", data.timeline],
      ["Project Details", data.projectDetails],
      ["Page URL", data.pageUrl],
      ["Submitted", data.submittedAt],
    ]),
  })
}

/* -------------------------------------------------------------------------- */
/*  Candidate application (role pages)  →  APPLICATION_TO                     */
/* -------------------------------------------------------------------------- */

export interface ApplicationEmailData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  linkedin?: string
  message?: string
  roleTitle: string
  roleUrl: string
  roleCategory: string
  /** Single primary city — already normalized before this ever reaches the mailer. */
  roleLocation: string
  roleType: string
  submittedAt: string
  cvFile: { filename: string; content: Buffer }
}

export async function sendApplicationEmail(data: ApplicationEmailData) {
  const transporter = getTransporter()
  const fullName = `${data.firstName} ${data.lastName}`
  await transporter.sendMail({
    from: requireEnv("EMAIL_FROM"),
    to: requireEnv("APPLICATION_TO"),
    replyTo: data.email,
    subject: `Website Application | ${data.roleTitle} | ${fullName}`,
    html: buildEmail("Website Application", `${fullName} — ${data.roleTitle}`, [
      ["First Name", data.firstName],
      ["Last Name", data.lastName],
      ["Email", data.email],
      ["Phone", data.phone],
      ["LinkedIn", data.linkedin],
      ["Message", data.message],
      ["Role Title", data.roleTitle],
      ["Role URL", data.roleUrl],
      ["Role Category", data.roleCategory],
      ["Role Location", data.roleLocation],
      ["Role Type", data.roleType],
      ["CV Attached", data.cvFile.filename],
      ["Submitted", data.submittedAt],
    ]),
    attachments: [data.cvFile],
  })
}

/* -------------------------------------------------------------------------- */
/*  Client referral (refer-a-company)  →  REFERRAL_TO                        */
/* -------------------------------------------------------------------------- */

export interface ReferralEmailData {
  referrerName: string
  referrerEmail: string
  companyName: string
  contactName: string
  /** Hiring contact's email address or LinkedIn/web profile URL — free-form by design. */
  contactDetails: string
  /** Optional: what they're hiring for, or any other useful note. */
  hiringNote?: string
  pageUrl: string
  submittedAt: string
}

export async function sendReferralEmail(data: ReferralEmailData) {
  const transporter = getTransporter()
  await transporter.sendMail({
    from: requireEnv("EMAIL_FROM"),
    to: requireEnv("REFERRAL_TO"),
    replyTo: data.referrerEmail,
    subject: `New Client Referral: ${data.companyName}`,
    html: buildEmail("New Client Referral", `${data.companyName} — via ${data.referrerName}`, [
      ["Referrer Name", data.referrerName],
      ["Referrer Email", data.referrerEmail],
      ["Referred Company", data.companyName],
      ["Hiring Contact", data.contactName],
      ["Contact Email / LinkedIn", data.contactDetails],
      ["Hiring Note", data.hiringNote],
      ["Submission Page", data.pageUrl],
      ["Submitted", data.submittedAt],
    ]),
  })
}
