# ION Talent - Integrations and Data Flow

## Form submission system (current)

All four public forms deliver by email through a single shared transport in
`lib/email.tsx` (Gmail SMTP via nodemailer). No credentials are hard-coded;
everything is read from server-only environment variables.

| Form | Page | API route | Email sender |
| --- | --- | --- | --- |
| Contact / Get in Touch | `/` | `POST /api/contact` | `sendContactEmail` |
| Submit CV | `/` | `POST /api/submit-cv` | `sendCVEmail` |
| Candidate registration | `/opportunities#register` | `POST /api/register-interest` | `sendCandidateRegistrationEmail` |
| Company referral | `/refer` | `POST /api/referral` | `sendReferralEmail` |

### Required environment variables

See `.env.example`. Configure these in Vercel Project Settings > Environment
Variables (or the v0 Vars panel):

- `GMAIL_USER` - Gmail address used to send notifications
- `GMAIL_APP_PASSWORD` - Gmail App Password for that account
- `MAIL_TO` - destination inbox (defaults to `ki@iontalentgroup.com`)

## Referral pipeline statuses (internal only)

`lib/referrals.ts` defines the internal pipeline:
`New -> Reviewing -> Contacted -> Qualified / Not Qualified -> Placement Made -> Reward Due -> Paid`.

Every submission is sent with status `New`. Statuses are never rendered on any
public page and are never returned to the browser.

## Connecting permanent storage (future)

There is currently NO database - submissions exist only as emails. To track
referral statuses properly, connect a database (e.g. Neon or Supabase via the
v0 integrations panel) and:

1. Create a `referrals` table mirroring `ReferralRecord` in `lib/referrals.ts`
   (plus an `id` and a `status` column defaulting to `New`).
2. Create a `candidates` table mirroring `CandidateRegistrationData` in
   `lib/email.tsx`; store the CV in object storage (e.g. Vercel Blob) and save
   the file URL rather than the binary.
3. Insert a row inside `app/api/referral/route.ts` and
   `app/api/register-interest/route.ts` before sending the notification email,
   so email delivery failures never lose a submission.

## Analytics

Vercel Analytics is already installed (`@vercel/analytics` in `app/layout.tsx`).
Custom events tracked - no second analytics platform was added:

- `opportunity_card_clicked`
- `register_interest_started`
- `candidate_form_submitted`
- `referral_page_opened`
- `referral_form_started`
- `referral_form_submitted`

## Opportunity statuses

`lib/opportunities.ts` seeds every role with the neutral `Talent Network`
status. To mark a role as live later, change its `status` field to
`"Live Opportunity"` - the card badge updates automatically with no redesign.
