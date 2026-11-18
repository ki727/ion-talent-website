# City-profile expansion — 15 November 2026

The preview now has 40 total candidate-interest profiles across 10 cities. The 29 existing IDs/slugs are retained, and 11 new profiles are added. New profiles are explicitly Talent Network entries, not confirmed live vacancies or client hiring commitments. No client names, salary offers, deadlines or opening dates were invented.

| City | Profiles |
| --- | ---: |
| Dubai | 9 |
| Riyadh | 8 |
| London | 7 |
| Abu Dhabi | 4 |
| New York | 4 |
| Dammam | 2 |
| Paris | 2 |
| Singapore | 2 |
| Amsterdam | 1 |
| Sydney | 1 |

The 11 additions cover finance, construction, compliance, talent acquisition, transformation consulting, engineering, procurement, operations and commercial leadership. Existing non-UAE profiles with mismatched AED salary data and generic benefit promises now use brief-dependent compensation wording; the supplied Dubai CIO brief remains intact. London-specific controller requirements no longer assume GCC/MENA experience. Riyadh programme requirements no longer use unexplained AED project-budget thresholds.

Preview browsing shows 12 results initially, spreading the first view across cities while keeping genuine live roles first if present in future. Show-more steps expose 24, 36 and all 40; filters reset that display limit. Filters use cities derived from the complete dataset. Registration in /global accepts the candidate's own salary currency/period and neutral international phone/location information, while legacy form defaults remain unchanged.

Validation:

- Production build/type/lint validation passed (existing image optimisation warnings only).
- Data checks pass: exactly 40 complete unique IDs/slugs, all original 29 links retained, valid functions/seniority, populated responsibilities and requirements. No profiles marked Live Opportunity; no network profile is shareable as a vacancy.
- Browser checks passed at 1440px and 390px: 12/24/36/40 load-more behaviour, city counts for New York/London/Riyadh/Dubai/Singapore/Paris/Sydney, filter reset, initial cross-city mix, no horizontal overflow and international salary/phone fields.
- Representative new detail pages passed for New York finance, Paris transformation, Singapore procurement, Sydney engineering and London quantity surveying: correct title/location, network disclaimer, noindex and no JobPosting structured data.
- No JavaScript page errors observed. No applications or emails submitted during this validation.

Publishing genuine live vacancies requires confirmed hiring briefs. This update is to the preview branch only; no main merge or production release.
