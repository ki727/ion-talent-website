/**
 * Referral data model.
 *
 * These statuses are for internal pipeline tracking only. They are never
 * rendered on any public page and are never returned to the browser - they
 * exist so that a permanent storage layer can be connected later without
 * changing the submission contract.
 */

export type ReferralStatus =
  | "New"
  | "Reviewing"
  | "Contacted"
  | "Qualified"
  | "Not Qualified"
  | "Placement Made"
  | "Reward Due"
  | "Paid"

export const REFERRAL_STATUSES: ReferralStatus[] = [
  "New",
  "Reviewing",
  "Contacted",
  "Qualified",
  "Not Qualified",
  "Placement Made",
  "Reward Due",
  "Paid",
]

/** Every new introduction enters the pipeline here. */
export const DEFAULT_REFERRAL_STATUS: ReferralStatus = "New"

export interface ReferralRecord {
  /** ISO timestamp of submission. */
  timestamp: string
  referrerName: string
  referrerEmail: string
  referrerPhone: string
  companyName: string
  companyLocation: string
  contactName: string
  contactJobTitle: string
  contactDetails: string
  rolesHiring: string
  /** How the referrer knows the company or contact. */
  relationship: string
  additionalContext?: string
  genuineIntroduction: boolean
  termsAcknowledged: boolean
  status: ReferralStatus
}
