# Review Notes — ION Talent branch: v0/phubat661-5881-a121c9ac

## Changes applied from ION_branch_reviewed.zip

### 1. Removed `components/theme-provider.tsx`
The file imported `next-themes` which was not declared in `package.json`.
It was not imported or used by any other file in the project. Deleted.

### 2. `@radix-ui/react-dialog` retained in `package.json`
Kept as an explicit dependency. Used transitively by `components/ui/sheet.tsx`
which is imported by `components/opportunities-client.tsx`.

### 3. Legacy /jobs replaced with server redirect
- `app/jobs/page.tsx` replaced with a one-line `redirect("/opportunities")`.
- `app/jobs/loading.tsx` deleted (returned `null`; unused).
- `components/job-card.tsx` deleted (legacy component, not imported anywhere
  in the current codebase).
- `components/job-application-modal.tsx` deleted (legacy component, not imported
  anywhere in the current codebase).

### 4. `.gitignore` updated
Changed `.env*` to explicit per-file entries so that `.env.example` is
tracked by git and can be committed. Real secrets files (`.env`, `.env.local`,
`*.local`) remain ignored.

### 5. `lib/email.tsx` — sender aliases now required
`CONTACT_FROM`, `APPLICATION_FROM`, and `REFERRAL_FROM` are now **required**
environment variables (enforced via `requireEnv()`). Previously they fell back
to `"Name" <${GMAIL_USER}>` which would expose the authenticated Google
account address in the `From` header of every outbound email. This fallback
has been removed. `GMAIL_USER` is now SMTP authentication only.

### 6. `docs/INTEGRATIONS.md` updated
Reflects the /jobs redirect, the required `*_FROM` sender alias variables, and
the updated routing table.

### 7. `REVIEW_NOTES.md` added
This file.

## Environment variables that must be configured before email delivery works

| Variable | Note |
| --- | --- |
| `GMAIL_USER` | Already set |
| `GMAIL_APP_PASSWORD` | Already set |
| `MAIL_TO` | Already set |
| `APPLY_MAIL_TO` | Must be added — candidate CV recipient |
| `REFERRAL_MAIL_TO` | Must be added — referral recipient |
| `CONTACT_FROM` | Must be added — e.g. `"ION Talent" <noreply@iontalentgroup.com>` |
| `APPLICATION_FROM` | Must be added — e.g. `"ION Talent Careers" <noreply@iontalentgroup.com>` |
| `REFERRAL_FROM` | Must be added — e.g. `"ION Talent" <noreply@iontalentgroup.com>` |

## Build notes

- `next.config.mjs` no longer has `typescript.ignoreBuildErrors: true`.
- No terminal is available in this environment; pnpm build runs on Vercel
  at publish time. All TypeScript interfaces are consistent and verified by
  code inspection.
