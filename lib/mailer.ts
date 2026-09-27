import fs from "node:fs"
import path from "node:path"
import nodemailer from "nodemailer"
import { LINKEDIN_COMPANY_URL, SALARY_GUIDE_PDF_URL, SITE_URL } from "@/lib/site-config"

/**
 * SMTP transport for the live submission flows: employer hiring enquiries,
 * candidate applications, client referrals and salary-guide lead capture.
 * Google Workspace SMTP, authenticated with an app password — never the
 * account password.
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
 *   SALARY_GUIDE_TO       recipient for salary guide download leads
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

const APPLICATION_MAILBOX = "apply@iontalentgroup.com"

function buildApplicationAcknowledgementEmail(data: ApplicationEmailData): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Your application has been received</title>
  </head>
  <body style="margin:0;padding:0;background:#F1F5F9;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      We have received your application and CV for ${esc(data.roleTitle)}.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;background:#F1F5F9;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <!--[if mso]>
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td>
          <![endif]-->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
            <tr>
              <td align="center" bgcolor="#0F172A" style="padding:30px 24px 26px;background:#0F172A;">
                <img src="cid:${LOGO_CID}" width="176" height="40" alt="ION Talent" style="display:block;width:176px;height:40px;border:0;outline:none;text-decoration:none;" />
              </td>
            </tr>
            <tr>
              <td bgcolor="#0FA3A1" height="4" style="height:4px;line-height:4px;font-size:0;background:#0FA3A1;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:34px 28px 12px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td width="54" valign="middle" style="width:54px;padding:0 12px 0 0;">
                      <img src="cid:${ION_ICON_CID}" width="44" height="44" alt="" style="display:block;width:44px;height:44px;border:0;outline:none;" />
                    </td>
                    <td valign="middle" style="padding:0;">
                      <h1 style="margin:0;color:#0F172A;font-size:24px;line-height:31px;font-weight:700;letter-spacing:-0.2px;">Your application has been received</h1>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 28px 8px;color:#334155;font-size:15px;line-height:24px;">
                <p style="margin:0 0 18px;">Hi ${esc(data.firstName)},</p>
                <p style="margin:0 0 18px;">Thank you for applying for <strong style="color:#0F172A;">${esc(data.roleTitle)}</strong> with ION Talent.</p>
                <p style="margin:0 0 18px;">We&apos;ve received your application and CV successfully.</p>
                <p style="margin:0 0 18px;">Our team will review your experience against the requirements for this opportunity.</p>
                <p style="margin:0 0 18px;">If your profile closely matches the role, a member of our team will contact you directly. Due to the volume of applications we receive, we may not be able to respond individually to every applicant.</p>
                <p style="margin:0 0 24px;">We wish you every success with your search and hope to have the opportunity to work with you.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <p style="margin:0 0 12px;color:#0F172A;font-size:15px;line-height:22px;font-weight:700;">Stay connected with ION Talent</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:separate;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;">
                  <tr>
                    <td width="52" valign="middle" style="width:52px;padding:16px 0 16px 18px;">
                      <img src="cid:${LINKEDIN_ICON_CID}" width="24" height="24" alt="" style="display:block;width:24px;height:24px;border:0;outline:none;" />
                    </td>
                    <td valign="middle" style="padding:14px 18px 14px 0;">
                      <a href="${LINKEDIN_COMPANY_URL}" style="color:#0F172A;font-size:14px;line-height:21px;font-weight:700;text-decoration:none;">Follow ION Talent on LinkedIn&nbsp;&rarr;</a>
                      <p style="margin:3px 0 0;color:#64748B;font-size:12px;line-height:18px;">Opportunities, market insight and hiring updates.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 30px;color:#334155;font-size:15px;line-height:24px;">
                <p style="margin:0;">Best regards,<br /><strong style="color:#0F172A;">ION Talent Team</strong></p>
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#0F172A" style="padding:22px 20px;background:#0F172A;color:#CBD5E1;font-size:12px;line-height:19px;">
                <a href="${SITE_URL}" style="color:#FFFFFF;text-decoration:none;">iontalentgroup.com</a>
                <span style="color:#0FA3A1;padding:0 8px;">|</span>
                <a href="${LINKEDIN_COMPANY_URL}" style="color:#FFFFFF;text-decoration:none;">LinkedIn</a>
              </td>
            </tr>
          </table>
          <!--[if mso]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function sendApplicationEmail(data: ApplicationEmailData) {
  const transporter = getTransporter()
  const fullName = `${data.firstName} ${data.lastName}`
  await transporter.sendMail({
    from: { name: "ION Talent Website", address: APPLICATION_MAILBOX },
    to: APPLICATION_MAILBOX,
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

  await transporter.sendMail({
    from: { name: "ION Talent", address: APPLICATION_MAILBOX },
    to: data.email,
    replyTo: APPLICATION_MAILBOX,
    subject: `Your ION Talent application - ${data.roleTitle}`,
    html: buildApplicationAcknowledgementEmail(data),
    attachments: [
      { filename: "ion-talent-logo.png", content: getLogoBuffer(), cid: LOGO_CID },
      { filename: "ion-icon.png", content: getIonIconBuffer(), cid: ION_ICON_CID },
      { filename: "linkedin-icon.png", content: getLinkedInIconBuffer(), cid: LINKEDIN_ICON_CID },
    ],
  })
}

/* -------------------------------------------------------------------------- */
/*  Candidate registration (/opportunities)  ->  APPLICATION_TO               */
/* -------------------------------------------------------------------------- */

export interface CandidateRegistrationEmailData {
  fullName: string
  email: string
  mobile: string
  linkedin: string
  currentLocation: string
  desiredRole: string
  noticePeriod: string
  expectedSalary: string
  coverNote?: string
  timestamp: string
  cvFile: { filename: string; content: Buffer }
}

export async function sendCandidateRegistrationEmail(data: CandidateRegistrationEmailData) {
  const transporter = getTransporter()
  const from = requireEnv("EMAIL_FROM")

  await transporter.sendMail({
    from,
    to: requireEnv("APPLICATION_TO"),
    replyTo: data.email,
    subject: `Candidate Registration | ${data.desiredRole} | ${data.fullName}`,
    html: buildEmail("Candidate Registration", `${data.fullName} - ${data.desiredRole}`, [
      ["Full Name", data.fullName],
      ["Email", data.email],
      ["Mobile", data.mobile],
      ["LinkedIn", data.linkedin],
      ["Current Location", data.currentLocation],
      ["Desired Role", data.desiredRole],
      ["Notice Period", data.noticePeriod],
      ["Expected Salary", data.expectedSalary],
      ["Cover Note", data.coverNote],
      ["CV Attached", data.cvFile.filename],
      ["Submitted", data.timestamp],
    ]),
    attachments: [data.cvFile],
  })

  const acknowledgementHtml = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
      <tr><td style="background:${NAVY};padding:24px;">
        <p style="margin:0;color:${TEAL};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;">ION Talent</p>
        <h1 style="margin:8px 0 0;color:#FFFFFF;font-size:20px;font-weight:700;">Thank you, ${esc(data.fullName)}</h1>
      </td></tr>
      <tr><td style="padding:24px;">
        <p style="font-size:14px;color:#334155;line-height:1.6;">Thank you for registering your interest with ION Talent. Your details have been added to our specialist network for <strong>${esc(data.desiredRole)}</strong> opportunities.</p>
        <p style="font-size:14px;color:#334155;line-height:1.6;">We review registrations carefully and will be in touch when your experience matches a relevant live requirement.</p>
        <p style="font-size:13px;color:#64748B;margin-top:24px;">ION Talent</p>
      </td></tr>
    </table>
  </body>
</html>`

  await transporter.sendMail({
    from,
    to: data.email,
    subject: `Your ION Talent registration - ${data.desiredRole}`,
    html: acknowledgementHtml,
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
  contactEmail: string
  contactLinkedin?: string
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
      ["Hiring Contact Email", data.contactEmail],
      ["Hiring Contact LinkedIn", data.contactLinkedin],
      ["Hiring Note", data.hiringNote],
      ["Submission Page", data.pageUrl],
      ["Submitted", data.submittedAt],
    ]),
  })
}

/* -------------------------------------------------------------------------- */
/*  Salary guide lead capture (/salary-guide)  →  SALARY_GUIDE_TO             */
/* -------------------------------------------------------------------------- */

export interface SalaryGuideLeadData {
  firstName: string
  lastName: string
  workEmail: string
  company: string
  jobTitle: string
  marketingOptIn: boolean
  pageUrl: string
  submittedAt: string
}

/**
 * The downloader email's logo and LinkedIn icon are embedded as CID
 * attachments (read from public/brand at send time) rather than linked as
 * remote images. This is deliberate: a remote image URL pointed at a Vercel
 * Preview deployment is behind Vercel's deployment-protection login, so
 * Outlook/Gmail simply show a broken-image placeholder when a lead opens the
 * email from a preview send. Embedding the bytes directly means the images
 * render correctly regardless of which environment sent the email.
 */
const LOGO_CID = "ion-talent-logo"
const ION_ICON_CID = "ion-icon"
const LINKEDIN_ICON_CID = "ion-linkedin-icon"

let cachedLogoBuffer: Buffer | null = null
let cachedIonIconBuffer: Buffer | null = null
let cachedLinkedInIconBuffer: Buffer | null = null

function readBrandAsset(filename: string): Buffer {
  return fs.readFileSync(path.join(process.cwd(), "public", "brand", filename))
}

function getLogoBuffer(): Buffer {
  if (!cachedLogoBuffer) cachedLogoBuffer = readBrandAsset("logo-primary-email.png")
  return cachedLogoBuffer
}

function getIonIconBuffer(): Buffer {
  if (!cachedIonIconBuffer) cachedIonIconBuffer = readBrandAsset("ion-icon-email.png")
  return cachedIonIconBuffer
}

function getLinkedInIconBuffer(): Buffer {
  if (!cachedLinkedInIconBuffer) cachedLinkedInIconBuffer = readBrandAsset("linkedin-icon-email.png")
  return cachedLinkedInIconBuffer
}

/** Branded downloader email — links to the PDF, never attaches it. Logo/icon are CID-embedded, not remote. */
function buildSalaryGuideDownloadEmail(firstName: string, downloadUrl: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:24px;background:#F8FAFC;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
      <tr>
        <td style="background:${NAVY};padding:32px 24px;">
          <img src="cid:${LOGO_CID}" width="136" height="31" alt="ION Talent" style="display:block;width:136px;height:31px;border:0;outline:none;" />
          <h1 style="margin:18px 0 0;color:#FFFFFF;font-size:22px;font-weight:700;">Your 2026 Salary &amp; Hiring Guide</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 24px;">
          <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.6;">Hi ${esc(firstName)},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#334155;line-height:1.6;">Thanks for downloading the ION Talent UAE &amp; Saudi Arabia Salary &amp; Hiring Guide 2026.</p>
          <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.6;">Your guide is ready below.</p>
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="border-radius:10px;background:${TEAL};">
                <a href="${downloadUrl}" style="display:inline-block;padding:14px 28px;color:#FFFFFF;font-size:15px;font-weight:700;text-decoration:none;">Download the Guide &rarr;</a>
              </td>
            </tr>
          </table>
          <p style="margin:28px 0 0;font-size:14px;color:#334155;line-height:1.6;">If you&rsquo;re hiring across the UAE or Saudi Arabia and would like to discuss the market, feel free to get in touch.</p>
          <p style="margin:16px 0 0;font-size:14px;color:#334155;">ION Talent</p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;border-top:1px solid ${BORDER};width:100%;">
            <tr>
              <td style="padding:20px 0 0;vertical-align:middle;">
                <a href="${LINKEDIN_COMPANY_URL}" style="text-decoration:none;">
                  <img src="cid:${LINKEDIN_ICON_CID}" width="16" height="16" alt="" style="display:inline-block;width:16px;height:16px;vertical-align:middle;border:0;outline:none;margin-right:6px;" />
                  <span style="font-size:12px;color:#64748B;font-weight:600;vertical-align:middle;">Follow ION Talent on LinkedIn &rarr;</span>
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 24px;background:#F8FAFC;">
          <p style="margin:0;color:#94A3B8;font-size:12px;">Sent automatically from iontalentgroup.com</p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function sendSalaryGuideLeadEmail(data: SalaryGuideLeadData) {
  const transporter = getTransporter()
  const from = requireEnv("EMAIL_FROM")
  const fullName = `${data.firstName} ${data.lastName}`

  // Internal notification → SALARY_GUIDE_TO
  await transporter.sendMail({
    from,
    to: requireEnv("SALARY_GUIDE_TO"),
    replyTo: data.workEmail,
    subject: `ION Salary Guide Lead — ${data.company}`,
    html: buildEmail("New Salary Guide Download", `${fullName} — ${data.company}`, [
      ["First Name", data.firstName],
      ["Last Name", data.lastName],
      ["Work Email", data.workEmail],
      ["Company", data.company],
      ["Job Title", data.jobTitle],
      ["Marketing Opt-in", data.marketingOptIn ? "Yes" : "No"],
      ["Page URL", data.pageUrl],
      ["Submitted", data.submittedAt],
    ]),
  })

  // Downloader email — link only, no PDF attachment. Sent as the verified
  // Google Workspace Send As identity info@iontalentgroup.com (confirmed
  // configured on the SMTP_USER mailbox), not the raw authenticated
  // mailbox address, with replies routed to the same info@ inbox. The PDF
  // link always points at the permanent production URL — never a Vercel
  // Preview origin, which is protected behind Vercel's own login and would
  // send external recipients to a Vercel auth page instead of the guide.
  await transporter.sendMail({
    from: { name: "ION Talent", address: "info@iontalentgroup.com" },
    to: data.workEmail,
    replyTo: "info@iontalentgroup.com",
    subject: "Your ION Talent 2026 Salary & Hiring Guide",
    html: buildSalaryGuideDownloadEmail(data.firstName, SALARY_GUIDE_PDF_URL),
    attachments: [
      { filename: "ion-talent-logo.png", content: getLogoBuffer(), cid: LOGO_CID },
      { filename: "linkedin-icon.png", content: getLinkedInIconBuffer(), cid: LINKEDIN_ICON_CID },
    ],
  })
}
