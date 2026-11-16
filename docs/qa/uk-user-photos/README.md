# UK page — supplied London photography

16 November 2026. The user's preferred London Bridge photograph is now the UK hero. The elevated Bank/City photograph accompanies the closing hiring enquiry. Other market imagery remains unchanged.

- Production build passes, including type validation; the 12 existing image-element lint warnings remain.
- Desktop (1440px) and mobile (390px) browser checks pass: both supplied images load at their native dimensions, no horizontal overflow or JavaScript page errors, and one closing heading and UK-context enquiry link render correctly.
- Preview noindex headers/metadata and the absence of a production canonical are preserved. Europe, US and Asia-Pacific retain their prior images and enquiry sections.
- SHA-256 checks confirm that both website JPEGs are byte-for-byte copies of the supplied ZIP members. No AI editing or upscaling was applied. Native dimensions are 612 × 408 for the hero and 399 × 501 for the supporting photo.

See [results.json](results.json), the desktop/mobile screenshots in this folder and [the source record](../../design/third-party/uk-user-photography.md). These local checks do not verify completion of the hosted Vercel rebuild. No production merge or release was performed.
