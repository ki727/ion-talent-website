# Real photography and moving company logos

16 November 2026. Preview-only work; no production deployment or merge.

The UK, Europe, US and Asia-Pacific panels now render real photographs instead of the generated city sheet. The US image is New York; the other scenes are visibly captioned as illustrative photography, with no local office or landmark claim. Unused fictional portrait/team assets were removed from `public`. Source and licence evidence is recorded in [photography-sources.md](../../design/third-party/photography-sources.md).

The homepage and Middle East page have 13 organisation marks in a continuous 36-second loop. The heading identifies these as companies shaping the target markets, without inventing client relationships. Six vector marks are sourced from Simple Icons; package licence, disclaimer and individual source metadata are retained in [third-party](../../design/third-party/). Images are loaded eagerly so offscreen marks are ready as they enter the strip.

Validation on the local production build:

- Build and type validation pass; lint reports only the 12 pre-existing image-element warnings.
- Four regional pages checked at 1440px and 390px: all photos load at their expected native dimensions, captions match their sources, no page overflow, no JavaScript page errors and no requests for removed generated assets.
- Both animated strips checked at both widths: all 13 distinct marks load, cloned marks are hidden from assistive technology, equal-width groups wrap with under 0.12px seam drift, and movement, pause/play, hover pause and keyboard-focus pause work.
- Reduced-motion checks at 1440px, 390px and 320px: static wrapping layout, hidden clone, no irrelevant playback control and no horizontal overflow.
- All six tested preview routes retain noindex headers/metadata and omit production canonical links.

Screenshots and [results.json](results.json) record the browser checks. The existing Dubai footage, founder identity, enquiry flows and 40 Talent Network profiles are unchanged. No emails or application submissions were sent. Local verification does not confirm completion of the hosted Vercel build.
