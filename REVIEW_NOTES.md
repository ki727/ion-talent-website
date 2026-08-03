# Review Notes — ION Talent branch: v0/phubat661-5881-a121c9ac

## Applied from ION_branch_reviewed.zip / ION_Talent_Branch_Fixed.zip

### 1. `components/ui/badge.tsx` — confirmed present
Correct shadcn implementation with `cva`, `VariantProps`, `cn`, and all four
standard variants (`default`, `secondary`, `destructive`, `outline`).

### 2. `components/theme-provider.tsx` — deleted
Imported `next-themes` which is not declared in `package.json`. Not referenced
by any other file in the project.

### 3. `tailwind.config.ts` — deleted
Replaced by `tailwind.config.cjs` (CJS module format required by Tailwind 3.0
in a project with `"type":"module"` in `package.json`). All content paths,
colour tokens, fonts, border radii, keyframes, animations and the
`tailwindcss-animate` plugin are preserved verbatim.

### 4. `app/jobs/page.tsx` — server redirect to `/opportunities`
Legacy /jobs route permanently redirects to /opportunities via Next.js
`redirect()`. `app/jobs/loading.tsx` and the legacy `job-card` and
`job-application-modal` components were deleted earlier.

### 5. `.env.example` — blank placeholders only
Real placeholder strings removed. All eight variable keys are present with
empty values so the file can be safely committed to version control.

### 6. `app/privacy/page.tsx` — corrected security wording
"CV files are transmitted securely and stored in encrypted cloud storage"
replaced with accurate wording reflecting email-only delivery:
"Data submitted through our website forms is transmitted over encrypted HTTPS
connections and delivered by email to authorised ION Talent personnel only."

### 7. `.gitignore` — tracks `.env.example`
Changed `.env*` glob to explicit per-file entries. `.env.example` is
intentionally committed; `.env`, `.env.local` and `*.local` remain ignored.

### 8. `lib/email.tsx` — sender aliases required
`CONTACT_FROM`, `APPLICATION_FROM`, `REFERRAL_FROM` enforced via `requireEnv()`.
`GMAIL_USER` is SMTP auth only and never placed in a `From` header.

## Environment variables

| Variable | Status |
| --- | --- |
| `GMAIL_USER` | Already set in Vercel project |
| `GMAIL_APP_PASSWORD` | Already set in Vercel project |
| `MAIL_TO` | Already set in Vercel project |
| `APPLY_MAIL_TO` | Must be added |
| `REFERRAL_MAIL_TO` | Must be added |
| `CONTACT_FROM` | Must be added |
| `APPLICATION_FROM` | Must be added |
| `REFERRAL_FROM` | Must be added |

## Build notes

- `next.config.mjs` has no `typescript.ignoreBuildErrors`.
- `@radix-ui/react-dialog` is in `package.json`; used by `components/ui/sheet.tsx`.
- No terminal available in v0; `pnpm build` runs on Vercel at publish time.
