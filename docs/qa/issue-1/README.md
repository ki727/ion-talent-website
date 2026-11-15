# Issue #1 visual repair QA

Repair branch: `repair/global-expansion-visual-qa`, based on `global-expansion` at `4889625a83028fce3f7b19f62c9b351c414d48a7`.

## Root causes and repairs

- **Pale regional heroes:** the lockfile installed Tailwind **3.0.0**, while the brand config uses `rgb(var(--ion-*) / <alpha-value>)`. That release emitted the placeholder literally, which browsers rejected. The baseline UK hero computed to transparent against the white page. Upgrade within Tailwind v3 to **3.4.19** so brand backgrounds, foregrounds, borders and opacity utilities compile correctly. Add a scoped, explicit navy hero surface and Dubai video scrim independent of generated utilities.
- **Global layout:** keep four equal core markets in the global proof band (UK, Europe, USA, Middle East); retain the live homepage's original proof band. Fit the global headline within its column on 320px phones.
- **Fonts:** baseline browser inspection loaded Inter and Raleway from Next's self-hosted font assets. The reported serif fallback was **not reproduced**. Keep `next/font` and the brand font variables; verify the actual loaded families after repair at both widths.
- **Blank sections:** 25 FadeIn blocks remained hidden in the initial full-page capture. Most reveal during normal scrolling, so this was partly a screenshot artifact, but server markup/no-JS really did leave the content invisible. Render real proof metrics in server markup instead of placeholder zeros. Make content visible by default; intersection only adds a modest entrance animation. Use a zero threshold so tall blocks can trigger, and tolerate a missing observer.
- **Hydration:** a double-escaped dynamic RegExp in featured-role scoring compiled differently for server and browser, selecting different featured cards and triggering React text mismatch/recovery. Use a word-boundary regex literal so both bundles select the same existing network roles. No job data changes.
- **Dark Veil:** retain its approved color, slow speed, quality, headline and scrims. Extend static fallback to low-memory/low-core devices and missing observer APIs; use a low-power WebGL preference. Recreate immutable WebGL texture storage when resizing; the old code allocated it repeatedly on one object. Mobile, reduced motion, data saving and failed WebGL retain the permanent navy/teal/lilac background. No global video element or MP4 request.
- **Favicon 500:** `public/icon.svg` was an unused v0 starter logo colliding with the app-router `/icon.svg`. Remove it; retain the branded `app/icon.svg` and official wordmarks.
- **Preview SEO:** keep noindex metadata; add `/global/*` noindex headers independent of hosting environment and retain all-route headers on Vercel previews. Clear inherited production-home canonical on preview hubs. No global URLs added to the sitemap.
- **Guide scope:** retain legacy `/salary-guide` and PDF URLs and explicitly label the global feature as Middle East insight. No new guides, jobs, offices or legal coverage claims.
- **Checks:** make the existing lint command scan TS/TSX, add Next's lint configuration and a typecheck command, and escape four existing JSX apostrophes without changing rendered copy. Explicitly decline the optional resolver build script in pnpm settings so frozen installs finish unattended.

## Screenshots

`before-*` captures are from the original branch before source edits, at 1440×1000. They deliberately include a direct full-page capture before scrolling to demonstrate the reveal issue. `after-*` hero and full-page captures cover global plus UK, Europe, USA, Middle East and Asia-Pacific at **1440×1000** and **390×844**. After captures use ordinary incremental scrolling before returning to the top. An additional full-page capture disables JavaScript.

| Page | Desktop hero | Desktop full | Mobile hero | Mobile full |
|---|---|---|---|---|
| Global | [hero](screenshots/after-global-desktop-hero.png) | [full](screenshots/after-global-desktop-full.png) | [hero](screenshots/after-global-mobile-hero.png) | [full](screenshots/after-global-mobile-full.png) |
| UK | [hero](screenshots/after-uk-desktop-hero.png) | [full](screenshots/after-uk-desktop-full.png) | [hero](screenshots/after-uk-mobile-hero.png) | [full](screenshots/after-uk-mobile-full.png) |
| Europe | [hero](screenshots/after-europe-desktop-hero.png) | [full](screenshots/after-europe-desktop-full.png) | [hero](screenshots/after-europe-mobile-hero.png) | [full](screenshots/after-europe-mobile-full.png) |
| USA | [hero](screenshots/after-us-desktop-hero.png) | [full](screenshots/after-us-desktop-full.png) | [hero](screenshots/after-us-mobile-hero.png) | [full](screenshots/after-us-mobile-full.png) |
| Middle East | [hero](screenshots/after-middle-east-desktop-hero.png) | [full](screenshots/after-middle-east-desktop-full.png) | [hero](screenshots/after-middle-east-mobile-hero.png) | [full](screenshots/after-middle-east-mobile-full.png) |
| Asia-Pacific | [hero](screenshots/after-asia-pacific-desktop-hero.png) | [full](screenshots/after-asia-pacific-desktop-full.png) | [hero](screenshots/after-asia-pacific-mobile-hero.png) | [full](screenshots/after-asia-pacific-mobile-full.png) |

Before: [UK white-on-white](screenshots/before-uk-desktop.png), [global unrevealed sections](screenshots/before-global-desktop.png). After: [global without JS](screenshots/after-global-no-js-full.png).

## Reproduce

Use the existing pnpm lockfile: `pnpm install --frozen-lockfile`, `npm run lint`, `npm run typecheck`, `npm run build`, then `npm run start -- --port 3001`. Run the supplied QA scripts from the repository root using an installed Playwright module (`PLAYWRIGHT_MODULE=/absolute/path/to/playwright node docs/qa/issue-1/visual-qa.cjs`, similarly for `form-qa.cjs`). They use installed `/usr/bin/chromium`; no browser dependency is added to the site. Stop any dev server before building: dev and production share `.next`.

Local QA URL: `http://localhost:3001/global`. This is a local process, not a hosted or production deployment.

## Review punch list

- **Fixed:** brand utility generation, readable regional backgrounds/scrim, fail-open section content, font verification, WebGL resize allocation, weak-device fallback, icon collision, preview canonical/noindex, guide context. See `results.json` and `forms.json` for measured checks.
- **Pending owner/network review:** actual live site `https://www.iontalentgroup.com` and Dubai MP4 host are denied by this environment's HTTP allowlist (CONNECT 403). The browser tool also failed to open the live reference. A true matching-width live-main comparison and playback/contrast-over-moving-footage verification remain blocked. Middle East screenshots show the intentional navy fallback; the original Dubai video URL and video attributes remain in source. Recheck when the hosts are allowed. Do not treat the fallback screenshot as proof of video playback.
- **Pending content/data:** the existing opportunities array is unchanged from main. All entries are Talent Network, not verified Live Opportunity ads; location filters are city-based. Do not promote or duplicate them geographically. Owner-supplied authorised vacancies and a reviewed city-to-region mapping are required for a regional live-jobs feature. Employer/guide UI checks intercept responses; real SMTP delivery and production form integration are not exercised.
- **Future SEO:** owner-approved regional positioning/copy, region-specific canonical/OG URLs, structured data, and hreflang only when real language/local variants exist. Continue noindex until a separately approved launch. Existing global OG inheritance is a future metadata task, not a production change.
- **Owner approval:** review all desktop/mobile captures, then resolve the live comparison/video blockers before marking issue complete. No merge, production deployment or publication performed.

## Validation results

- Frozen pnpm install, production build, TypeScript, and ESLint pass. ESLint reports 12 existing `no-img-element` advisory warnings.
- All 12 page/viewport combinations pass loaded-font, hero-surface, image-load, no-hidden-section, no-horizontal-overflow and noindex checks. Maximum observed CLS in the scripted run: **0.00013** (a lab observation, not field performance).
- **32** internal paths/anchors/downloads pass, including UAE, Saudi Arabia, GCC, legacy market redirects, `/salary-guide`, the original PDF and branded icon.
- Header/menu checks pass at **320, 390, 768, 1024, 1280, 1440 and 1920px**, including navigation and body-scroll unlock after selection.
- Capable-desktop simulation renders a 1440×1000 Dark Veil canvas; pixel captures change over time. Resizing 1440→1920→1280→1440 reports WebGL error **0**. The cloud browser uses software WebGL, so this does not establish a hardware frame-rate or battery advantage over video. It does establish zero global MP4 requests. Device-specific performance still needs owner-device review.
- No-JS, reduced motion, Save-Data, weak-device, unavailable WebGL and unavailable IntersectionObserver checks retain headline/content and avoid video. The real default cloud device chooses the weak-device static fallback; desktop shader captures explicitly simulate 8 cores/8 GB to exercise the animation path.
- No React hydration/recovery errors after the featured-role regex repair. Expected local diagnostics remain: Vercel's hosted-only analytics script returns 404 on `next start`, software-WebGL/readback warnings, and denied Dubai video network requests. No other broken page/image resources were found.
- Employer enquiry: empty validation, mocked error/retry and mocked success pass. Salary guide: empty validation and mocked success/PDF link pass. **Three intercepted API requests, zero emails sent.** These are interface checks, not SMTP delivery verification.
- The final global-only pass refreshes desktop/mobile/no-JS screenshots after the server-rendered proof metric repair, checks the 320px text bounds, and asserts actual no-JS metrics `10+`, `500+`, `4`; see `final-global.json`.
