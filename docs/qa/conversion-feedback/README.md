# Global preview: approved conversion recommendations

Implemented 15 November 2026. This is a nonproduction Global preview update; no merge or production deployment is authorised.

## Changes

- Regional hiring CTAs retain a validated market, originating market page and optional sector. The editable form carries those values into the hiring-enquiry handler and escaped email body.
- Preview employer form starts with essential details and an editable hiring market. Phone, service and timing are optional disclosures. Defaults are “Help me choose” and “To discuss”. No new response-time promise is made.
- Booking alternative links directly to the existing Calendly event and tracks a non-identifying click.
- Preview navigation remains within /global, including About, opportunities/detail pages, referrals, privacy/terms and the Saudi National Talent page. Regional sector links explicitly offer to discuss a hire rather than suggesting an unbuilt sector detail page.
- Mobile services are expandable, the mobile menu puts hiring first, supports Escape/focus return, and releases scrolling when closed or resized. A mobile employer CTA appears below the hero and hides around the contact section, footer and open menu.
- Market links are compact and earlier. The referral campaign is compact and follows the employer form.
- Technology-specific ranking was removed from featured roles. With no confirmed live vacancies in current data, the preview homepage shows an honest talent-network entry. The listings page separates live roles from network profiles; no vacancies were invented.
- Metrics show their final values immediately. They are labelled as recruitment experience, without asserting company-only milestones.
- Founder identity and LinkedIn URL were supplied by the user: Khaled Israfil, https://www.linkedin.com/in/khaled-israfil/. The trust section now uses that actual contact and initials, not fictional AI employees. No headshot, biography, quotation or placement outcome was invented.

## Validation

- Production build passed, including lint/type validation. Existing image-element optimisation warnings remain.
- Integrated production browser checks passed for 12 preview routes at 1440px and 390px (24 combinations): home; UK; Europe; US; Asia-Pacific; Middle East; About; opportunities; referrals; privacy; referral terms; Saudi National Talent.
- All checked preview pages return 200, remain noindex/nofollow, have no production canonical, preserve the preview footer destination, and have no horizontal overflow. Preview routes are absent from the public sitemap.
- Candidate detail navigation and return stay in /global. Network detail pages explicitly state they are not confirmed vacancies.
- Integrated US/Finance journey: region prefill, editable market, sector/origin retention, optional-field defaults, invalid form causing no request, failed request showing an error, retry and success only after a successful response all passed. API was intercepted; no mail sent.
- Targeted handler/mail tests passed for context validation, sanitisation, invalid input, honeypot, duplicate protection, failed-delivery retry and escaped market/source/sector email content. Transport mocked.
- Mobile menu and sticky CTA interactions passed. Navigation additionally checked at 1024 and 1280px. Reduced-motion behaviour and zero JavaScript page errors verified.
- Homepage height at the same 390px viewport reduced from approximately 9,332px in the preceding review to 7,054px; employer CTAs also provide direct access to the enquiry.

## Outstanding external evidence

Actual SMTP delivery was not tested: the cloud process has no SMTP_HOST/PORT/USER/PASS, EMAIL_FROM or recipient bindings. This does not establish the Vercel deployment's credential state. Existing bindings on Vercel must be used for an authorised end-to-end email check before a production readiness claim.

An approved placement example/client quotation and real founder headshot remain optional content additions pending user material. The user explicitly had no placement example available in this iteration. No placeholders for testimonials are shown.

Local browser validation does not prove Vercel build completion or a production release. The /global preview must remain noindex until a separately approved launch migration sets published canonicals and sitemap entries.
