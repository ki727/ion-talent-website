# ION Talent — Integrations and Data Flow

## Form submission system (current)

All four public forms deliver by email through a single shared transport in
`lib/email.tsx` (Gmail SMTP via nodemailer). No credentials or recipient
addresses are hard-coded; everything is read from server-only environment
variables.

| Form | Page | API route | Email sender function |
| --- | --- | --- | --- |
| Contact / Get in Touch | `/` | `POST /api/contact` | `sendContactEmail` |
| Submit CV | `/` | `POST /api/submit-cv` | `sendCVEmail` |
| Candidate registration | `/opportunities#register` | `POST /api/register-interest` | `sendCandidateRegistrationEmail` |
| Company referral | `/refer` | `POST /api/referral` | `sendReferralEmail` |

### Required environment variables

See `.env.example` for a full annotated list. Configure these in Vercel Project
Settings > Environment Variables (or the v0 Vars panel):

| Variable | Purpose | Required |
| --- | --- | --- |
| `GMAIL_USER` | Gmail / Google Workspace account used for SMTP auth only — never exposed as a visible From address | Yes |
| `GMAIL_APP_PASSWORD` | 16-character Gmail App Password for `GMAIL_USER` | Yes |
| `MAIL_TO` | Recipient inbox for contact and client enquiries | Yes |
| `APPLY_MAIL_TO` | Recipient inbox for candidate CV applications | Yes |
| `REFERRAL_MAIL_TO` | Recipient inbox for company referrals | Yes |
| `CONTACT_FROM` | Visible `From` address on contact emails, e.g. `"ION Talent" <noreply@iontalentgroup.com>` | Yes |
| `APPLICATION_FROM` | Visible `From` address on application emails | Yes |
| `REFERRAL_FROM` | Visible `From` address on referral emails | Yes |

All three `*_FROM` variables must be set. If any are absent the API route
will return a 500 with a clear log message naming the missing variable.
`GMAIL_USER` is the SMTP authentication credential only and is never placed
in the `From` header — this prevents the authenticated Google account address
from being leaked to candidates or referrers.

## Routing: /jobs → /opportunities

`app/jobs/page.tsx` is a server-side `redirect("/opportunities")`. The legacy
`job-card`, `job-application-modal`, and `jobs/loading` files have been removed.
Any external links to `/jobs` will redirect permanently.

## Referral pipeline statuses (internal only)

`lib/referrals.ts` defines the internal pipeline:
`New → Reviewing → Contacted → Qualified / Not Qualified → Placement Made → Reward Due → Paid`

Every submission is stamped with status `New`. Statuses are never rendered on
any public page and are never returned to the browser.

## Connecting permanent storage (future)

There is currently no database — submissions exist only as emails. To track
referral statuses or candidate records persistently, connect a database (e.g.
Neon or Supabase via the v0 integrations panel) and:

1. Create a `referrals` table mirroring `ReferralRecord` in `lib/referrals.ts`
   (plus `id` and `status` columns defaulting to `New`).
2. Create a `candidates` table mirroring `CandidateRegistrationData` in
   `lib/email.tsx`; store the CV in object storage (e.g. Vercel Blob) and save
   the URL rather than the binary.
3. Insert a row inside `app/api/referral/route.ts` and
   `app/api/register-interest/route.ts` before sending the notification email,
   so an email delivery failure never loses a submission.

## Analytics

Vercel Analytics is installed (`@vercel/analytics` in `app/layout.tsx`).
Custom events tracked — no second analytics platform was added:

- `opportunity_card_clicked`
- `register_interest_started`
- `candidate_form_submitted`
- `referral_page_opened`
- `referral_form_started`
- `referral_form_submitted`

## Opportunity statuses

`lib/opportunities.ts` seeds every role with the neutral `Talent Network`
status. To mark a role as live, change its `status` field to
`"Live Opportunity"` — the card badge updates automatically with no redesign.
