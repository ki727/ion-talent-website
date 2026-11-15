# Global preview imagery and motion

This iteration uses AI-generated illustrative assets. Stock downloads from images.unsplash.com returned network-policy 403 errors, including an escalated request. No stock assets were downloaded or represented as licensed photography.

- `public/photography/global/cities.webp`: AI-generated London, Paris, New York and Singapore city studies in a four-panel sheet. The public preview visibly labels them AI-generated illustrations. These do not document ION premises or offices. Original generation: `/workspace/generated_images/exec-399e704e-7667-4a17-a501-73c3f0973d88.png`.
- `public/photography/global/portrait-study.webp`: three fictional AI-generated professionals. Explicitly labelled as illustrative placeholders, without names, job titles, biographies or placement claims. Replace with actual team photography before public launch. Original generation: `/workspace/generated_images/exec-8ca28023-c166-4b6d-a038-e218150beb2c.png`.
- Existing Dubai footage/poster and Saudi photography remain in Middle East.

Motion: Global hero now uses bespoke SVG silk ribbons, animated with CSS transforms. This replaces the previous source shader's visually weak wash. It does not depend on WebGL or processor/memory detection. Reduced-motion uses a static composition. Only the Global hero uses this effect; market pages use editorial image layouts.

The preview remains noindex. No offices, credentials, testimonials or case studies were invented. Market copy describes the search conversation and requirements to discuss. The unfinished resource stays in Middle East; its popup is suppressed until a real download exists.

## Validation (15 November 2026)

- Production build passes, including lint/type validation; existing image-element optimisation warnings remain.
- Browser checks pass at 1440px and 390px for `/global`, `/global/uk`, `/global/europe`, `/global/us`, `/global/asia-pacific` and `/global/middle-east` (12 route/viewport combinations).
- No horizontal page overflow, broken loaded image elements or JavaScript page errors observed. Mobile menus open and close; all preview routes remain noindex.
- Regional image crops and portrait study visually inspected. Saudi National Talent promotion appears only on Middle East within the preview. The unfinished preview resource popup is suppressed.
- Ribbon transforms change over time; reduced-motion disables animation. Accessible pause/play button stops and restarts movement. The accessibility check caught an inherited aria-hidden attribute around the original background wrapper; this was corrected and the affected check passed on the final production build.
- No claim of Vercel deployment completion or production release is made by these local checks.
