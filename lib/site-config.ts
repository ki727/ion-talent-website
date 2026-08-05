/**
 * Verified, site-wide constants. Centralised here so every component and
 * metadata block references the same value instead of each hard-coding its
 * own copy that could drift out of sync.
 */

/** Canonical production origin, no trailing slash. */
export const SITE_URL = "https://www.iontalentgroup.com"

/** Public referral page — the only URL ever included in referral sharing actions. */
export const REFERRAL_PAGE_PATH = "/refer"
export const REFERRAL_PAGE_URL = `${SITE_URL}${REFERRAL_PAGE_PATH}`

/** Verified ION Talent LinkedIn company page. */
export const LINKEDIN_COMPANY_URL = "https://www.linkedin.com/company/iontalent"

/** Verified single-event Calendly booking link — the only Calendly URL used anywhere on the site. */
export const CALENDLY_URL = "https://calendly.com/ki-iontalentgroup/hiring-introduction"

/** Fixed referral-reward messaging, reused verbatim across the homepage section, the referral page and sharing actions. */
export const REFERRAL_REWARD_MESSAGE =
  "Know a company that's hiring? ION Talent offers referral rewards of up to US$5,000 when a genuine introduction becomes a new client and leads to a successful placement."
