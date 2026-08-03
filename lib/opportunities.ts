/**
 * Opportunity data model for the ION Talent Opportunities page.
 *
 * Every seeded opportunity uses the "Talent Network" status. The structure is
 * designed so ION Talent can later change an individual role's `status` to
 * "Live Opportunity" (or "Paused") without any page redesign.
 */

export type OpportunityStatus = "Talent Network" | "Live Opportunity" | "Paused"

export type OpportunityFunction =
  | "Finance"
  | "Cybersecurity"
  | "Cloud and Infrastructure"
  | "Data and AI"
  | "Enterprise Technology"
  | "Technology Sales"
  | "Project and Programme Management"

export type OpportunityLocation = "UAE" | "Saudi Arabia" | "Qatar" | "Wider GCC" | "International"

export type EmploymentType = "Permanent" | "Contract" | "Executive Search"

export interface Opportunity {
  id: string
  title: string
  status: OpportunityStatus
  function: OpportunityFunction
  /** Human-readable location label shown on the card. */
  locationLabel: string
  /** Normalised locations used for filtering. */
  locations: OpportunityLocation[]
  employmentLabel: string
  employmentTypes: EmploymentType[]
  seniority: string
  description: string
}

export const FUNCTIONS: OpportunityFunction[] = [
  "Finance",
  "Cybersecurity",
  "Cloud and Infrastructure",
  "Data and AI",
  "Enterprise Technology",
  "Technology Sales",
  "Project and Programme Management",
]

export const LOCATIONS: OpportunityLocation[] = ["UAE", "Saudi Arabia", "Qatar", "Wider GCC", "International"]

export const EMPLOYMENT_TYPES: EmploymentType[] = ["Permanent", "Contract", "Executive Search"]

export const SENIORITIES: string[] = [
  "Specialist to Leadership",
  "Senior",
  "Senior and Leadership",
  "Management and Leadership",
  "Senior Management",
  "Leadership",
  "Executive Leadership",
]

export const opportunities: Opportunity[] = [
  {
    id: "cfo-finance-director",
    title: "CFO / Finance Director",
    status: "Talent Network",
    function: "Finance",
    locationLabel: "UAE, Saudi Arabia and Qatar",
    locations: ["UAE", "Saudi Arabia", "Qatar"],
    employmentLabel: "Permanent and Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "Executive Leadership",
    description:
      "Join ION Talent's network of senior finance leaders for current and upcoming CFO, finance director and transformation leadership requirements across the GCC.",
  },
  {
    id: "financial-controller",
    title: "Financial Controller",
    status: "Talent Network",
    function: "Finance",
    locationLabel: "UAE, Saudi Arabia and Qatar",
    locations: ["UAE", "Saudi Arabia", "Qatar"],
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Senior Management",
    description:
      "Register your interest in financial control, reporting, governance, consolidation and finance transformation opportunities.",
  },
  {
    id: "fpa-manager-director",
    title: "FP&A Manager / Director",
    status: "Talent Network",
    function: "Finance",
    locationLabel: "GCC",
    locations: ["Wider GCC"],
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Management and Leadership",
    description:
      "Join our network for commercial finance, planning, budgeting, forecasting and senior business-partnering requirements.",
  },
  {
    id: "treasury-corporate-finance",
    title: "Treasury and Corporate Finance",
    status: "Talent Network",
    function: "Finance",
    locationLabel: "GCC",
    locations: ["Wider GCC"],
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Management and Leadership",
    description:
      "Register for treasury, funding, capital planning, corporate finance and investor-relations opportunities.",
  },
  {
    id: "tax-audit-compliance",
    title: "Tax, Audit and Financial Compliance",
    status: "Talent Network",
    function: "Finance",
    locationLabel: "UAE and Saudi Arabia",
    locations: ["UAE", "Saudi Arabia"],
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Specialist to Leadership",
    description:
      "Join our network for tax, internal audit, controls, risk and financial-compliance requirements.",
  },
  {
    id: "head-cybersecurity-ciso",
    title: "Head of Cybersecurity / CISO",
    status: "Talent Network",
    function: "Cybersecurity",
    locationLabel: "UAE and Saudi Arabia",
    locations: ["UAE", "Saudi Arabia"],
    employmentLabel: "Permanent and Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "Leadership",
    description:
      "ION Talent connects senior cybersecurity leaders with organisations investing in security, resilience, governance and transformation.",
  },
  {
    id: "cybersecurity-architecture-grc",
    title: "Cybersecurity Architecture and GRC",
    status: "Talent Network",
    function: "Cybersecurity",
    locationLabel: "GCC",
    locations: ["Wider GCC"],
    employmentLabel: "Permanent and Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior and Leadership",
    description:
      "Register for cybersecurity architecture, GRC, SecOps, SOC, IAM, cloud security and information-security opportunities.",
  },
  {
    id: "cloud-solutions-architect",
    title: "Cloud and Solutions Architect",
    status: "Talent Network",
    function: "Cloud and Infrastructure",
    locationLabel: "UAE and Saudi Arabia",
    locations: ["UAE", "Saudi Arabia"],
    employmentLabel: "Permanent and Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior",
    description:
      "Join our specialist network for cloud architecture, infrastructure transformation and enterprise-solutions requirements.",
  },
  {
    id: "data-engineering-analytics-ai",
    title: "Data Engineering, Analytics and AI",
    status: "Talent Network",
    function: "Data and AI",
    locationLabel: "GCC",
    locations: ["Wider GCC"],
    employmentLabel: "Permanent and Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior and Leadership",
    description:
      "Register for data engineering, analytics, lakehouse, AI infrastructure, machine learning and platform-leadership opportunities.",
  },
  {
    id: "sap-oracle-programme-lead",
    title: "SAP / Oracle Programme Lead",
    status: "Talent Network",
    function: "Enterprise Technology",
    locationLabel: "GCC",
    locations: ["Wider GCC"],
    employmentLabel: "Permanent and Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior and Leadership",
    description:
      "Join our network for ERP transformation, programme leadership, enterprise applications and SAP or Oracle requirements.",
  },
  {
    id: "enterprise-saas-sales-director",
    title: "Enterprise SaaS Sales Director",
    status: "Talent Network",
    function: "Technology Sales",
    locationLabel: "UAE and Saudi Arabia",
    locations: ["UAE", "Saudi Arabia"],
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Leadership",
    description:
      "Register for enterprise software, cloud, cybersecurity and technology-sales leadership opportunities.",
  },
  {
    id: "technology-programme-director",
    title: "Technology Programme Director",
    status: "Talent Network",
    function: "Project and Programme Management",
    locationLabel: "GCC",
    locations: ["Wider GCC"],
    employmentLabel: "Permanent and Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Leadership",
    description:
      "Join our network for major digital transformation, technology delivery and programme-leadership requirements.",
  },
]
