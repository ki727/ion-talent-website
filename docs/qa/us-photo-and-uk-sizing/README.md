# USA photo and UK image sizing

16 November 2026. Both supplied USA ZIPs contain the same Wall Street JPEG. The USA hero uses that photograph. The separate inline Manhattan street scene is not included in the archives and has not been added.

The UK and USA hero photos now display as complete 3:2 compositions, capped at their native 612 × 408 CSS-pixel dimensions. This removes the previous enlargement and cover-cropping softness. The London source itself contains motion blur; no AI sharpening or fabricated detail was applied. USA copy retains a navy background, with a bright teal eyebrow and tighter mobile spacing. The Bank supporting image remains on the UK page.

Validation on the local production build:

- Build passes, including lint and type validation; 12 existing image-element warnings remain.
- UK and USA checked at 1440px and 390px: images load at 612 × 408 natively and render at 612 × 408 desktop / 342 × 228 mobile; original aspect ratio is preserved and neither image is enlarged.
- No horizontal page overflow or JavaScript page errors; headings fit, market-specific enquiry links work, and preview noindex headers/metadata remain with no production canonical.
- UK supporting photography is preserved; Europe and Asia-Pacific remain unchanged.
- SHA-256 confirms the USA website JPEG is identical to both supplied archive members.

See the screenshots and [results.json](results.json). [USA source record](../../design/third-party/us-user-photography.md). No production merge or release was performed; local verification does not confirm the hosted Vercel build.
