# High-resolution UK hero replacement

16 November 2026. The user's Johan Mouchet / Unsplash Millennium Bridge photo replaces the soft 612px London Bridge hero. The supplied original is 6000 × 4000; the site uses a full-frame 2400 × 1600 WebP export (about 389 KiB). No AI editing or upscaling was applied. The larger split hero is restored, with the focal point at 40% horizontally and a photographer credit in its caption. The Bank supporting image stays in place.

Validation:

- Production build passes with type validation and only the 12 existing image-element lint warnings.
- Browser checks at 1440px, 390px and 320px pass: the new image loads at 2400 × 1600, the old soft hero is absent, the credit fits within the viewport, and there is no horizontal overflow or JavaScript page error.
- Desktop and mobile crops visually reviewed; The Shard, pedestrians and bridge structure remain visible. The Bank supporting photo loads, and the enquiry link retains its UK context.
- Preview noindex headers/metadata and absence of a production canonical are preserved. The USA photo and its size restriction remain unchanged.

See [results.json](results.json), the screenshots and [the UK source record](../../design/third-party/uk-user-photography.md). Local checks do not verify completion of the hosted Vercel rebuild. No production merge or release was performed.
