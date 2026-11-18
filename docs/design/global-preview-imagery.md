# Global preview imagery and motion

## Current direction — 16 November 2026

Latest UK update: the user supplied a sharp 6000 × 4000 Johan Mouchet / Unsplash Millennium Bridge photograph. It replaces the soft 612px Bridge hero, exported as a 2400 × 1600 WebP with photographer credit. The Bank supporting image remains. The smaller-image frame restriction now applies only to the USA upload. See [the current UK source record](third-party/uk-user-photography.md).

The UK page now uses the user's two supplied London photos: London Bridge commuters as the hero and an elevated Bank/City skyline beside the closing enquiry. See [the UK source record](third-party/uk-user-photography.md). This supersedes the earlier illustrative architecture entry for the UK below.

The USA hero now uses the user's Wall Street photograph. Both USA ZIPs contained that same file; the separate inline Manhattan image remains unavailable as an asset. UK and USA hero photos are framed at their native aspect ratio and capped at 612px wide after the user reported London softness. See [the USA source record](third-party/us-user-photography.md).

The preview now uses real photographs in all four regional image panels. The generated city sheet and unused fictional portraits/team images have been removed from `public`; they remain recoverable from Git history. About uses the existing illustrative workspace image and the confirmed founder identity. No invented staff profiles are rendered.

Three newly sourced photographs come from Libre Photography's expressly CC0 collection. The US panel shows New York. The other panels use accurately captioned illustrative architecture/workplace photography, with no London, Paris or Singapore location claim. See [the per-file source record](third-party/photography-sources.md) for provenance and limitations.

The preview's company strip now continuously scrolls 13 organisation marks, with pause/play, hover/focus pause and a static reduced-motion layout. It is labelled “Companies shaping our markets”; it does not present the selected organisations as ION clients. See [the logo source record](third-party/market-logo-sources.json).

The following sections record earlier design iterations, which have been superseded where they describe generated photos or fictional profiles.

## Initial imagery iteration (superseded)

The initial iteration used AI-generated illustrative assets. Stock downloads from images.unsplash.com returned network-policy 403 errors. Those initial assets were not represented as licensed photography.

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

## Subsequent conversion review

The user supplied founder Khaled Israfil’s LinkedIn URL. The rendered trust section now presents that confirmed founder identity with initials and a profile link. The AI portrait study remains a design asset on disk and is no longer presented in the homepage trust section. No real headshot or placement testimonial was supplied. See `docs/qa/conversion-feedback/README.md` for the approved conversion changes and validation.

## Added individual and team concepts to About

On explicit request, `/global/about` now shows the two separate fictional portrait concepts and the revised team concept. The homepage remains company-led. The gallery uses visible AI/fictional captions and descriptive alt text; proposed character roles are not presented as real employment facts. The real founder card remains distinct.

- `public/photography/team/cofounder-concept.webp` — fictional male portrait; original `/workspace/generated_images/exec-a0fb1ab6-099d-4de6-b2b3-154baf9e6490.png`.
- `public/photography/team/anna-wynn-concept.webp` — fictional Anna Wynn portrait; original `/workspace/generated_images/exec-a42a7280-c72d-430f-bb5f-aa3eb4705cc5.png`.
- `public/photography/team/team-concept.webp` — revised AI-generated team concept using the uploaded founder photo as a likeness reference; original `/workspace/generated_images/exec-c95c35b1-28a6-450a-b139-e41f237fe53c.png`. The earlier generated founder solo portrait was rejected by the user and is not used on the website.

Assets are resized/compressed WebP exports. Originals are retained. This is preview imagery, not a company team photograph or evidence of additional employees.

## Classic individual portrait revision

At the user's request, the group/team image is no longer rendered. `/global/about#team-concepts` now presents only compact individual portrait studies: 260px-wide photographs with a classic 4:5 crop and understated captions. The two fictional characters retain one concise, visible AI-concept disclosure. The rejected generated founder portrait remains unused, and the homepage remains company-led. Portrait assets are being revised separately to a more natural style; original generations remain retained.

The classic headshot revision regenerates the two fictional individuals against plain neutral walls with understated light/retouching. New originals are `/workspace/generated_images/exec-d122a875-6f5e-4415-b66c-916cdc67c93f.png` (male concept) and `/workspace/generated_images/exec-9a98dbab-b366-415e-96d4-4cdeb30a42cd.png` (Anna concept). WebP filenames are retained for the individual assets; the old group asset is no longer rendered. The rejected founder solo portrait is still not used.

The subsequent sizing request reduces individual portraits from 260px-wide features to 88px square thumbnails in understated horizontal profile rows. Gallery styling and large headings are removed, with slightly muted saturation and one concise fictional-AI disclosure. The group image and rejected founder image remain unused.

## Final direction: supporting workspace imagery, no fictional staff

Following the user's agreement to remove invented staff profiles, the About page now uses the existing `/photography/about-office.webp` as clearly illustrative workspace imagery. Fictional names, portraits, biographies and team concepts are no longer rendered; the old generated assets remain on disk only as design history. The gallery component was removed. The genuine founder profile stays on About, and the homepage remains company-led. No new stock licence claim or assertion that this image shows ION premises is made.
