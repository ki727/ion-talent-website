import { GLOBAL_MARKETS } from "@/lib/global-market-hubs"

/**
 * Content for the private global-market concept.
 * These are positioning drafts, not claims of legal entities or offices.
 */
export const GLOBAL_REGIONS = [
  {
    slug: "gcc",
    label: "GCC",
    kicker: "Gulf Cooperation Council",
    headline: "Specialist talent for ambitious transformation across the Gulf.",
    introduction:
      "Research-led executive search and specialist recruitment for technology-driven businesses and transformation programmes across GCC markets.",
    emphasis: "Regional understanding, international search capability.",
    priorities: ["Technology and enterprise architecture", "Cybersecurity and OT security", "Data, AI and infrastructure", "Executive and functional leadership"],
    approach:
      "Build a search strategy around the role, operating environment and talent market, rather than relying on a standard database shortlist.",
    marketNote: "Regional umbrella page. Individual UAE and Saudi Arabia pages provide more specific positioning.",
  },
  {
    slug: "ae",
    label: "United Arab Emirates",
    kicker: "UAE",
    headline: "Technology and leadership recruitment for the UAE.",
    introduction:
      "Targeted search support for employers hiring critical technology, cyber, data and leadership talent in the UAE.",
    emphasis: "Senior-led recruitment for a fast-moving, international hiring market.",
    priorities: ["Enterprise and solutions architecture", "Cloud and infrastructure", "Cybersecurity leadership", "Technology sales and transformation"],
    approach:
      "Define the brief clearly, map the candidate market, and deliver targeted outreach aligned with the realities of UAE hiring.",
    marketNote: "UAE-specific candidate and employer messaging will be refined before launch.",
  },
  {
    slug: "sa",
    label: "Saudi Arabia",
    kicker: "Kingdom of Saudi Arabia",
    headline: "Specialist search for Saudi Arabia's evolving talent needs.",
    introduction:
      "Focused recruitment for complex technical and leadership requirements, supporting employers in Saudi Arabia with market-aware search.",
    emphasis: "Thoughtful search across specialist and leadership functions.",
    priorities: ["Cybersecurity and critical infrastructure", "Cloud and enterprise systems", "Data and AI capability", "Saudi national talent and leadership"],
    approach:
      "Combine precise job scoping with relevant market mapping, direct sourcing and clear stakeholder communication.",
    marketNote: "Saudi national talent, market requirements and localized content will have dedicated sections at launch.",
  },
  {
    slug: "uk",
    label: "United Kingdom",
    kicker: "UK",
    headline: "Specialist technology and executive search across the UK.",
    introduction:
      "Focused recruitment support for UK employers seeking high-impact technical specialists and senior leaders.",
    emphasis: "A focused partner for hard-to-fill, business-critical roles.",
    priorities: ["Enterprise architecture", "Cybersecurity and resilience", "Cloud and platform leadership", "Executive and transformation hiring"],
    approach:
      "Use detailed role calibration, candidate research and thoughtful outreach to support selective, complex hiring.",
    marketNote: "UK market copy and search specialisms are draft positioning pending final review.",
  },
  {
    slug: "us",
    label: "United States",
    kicker: "USA · Proposed growth market",
    headline: "A specialist approach to technology search in the United States.",
    introduction:
      "A proposed US-market offering for organisations seeking expertise in enterprise technology, cyber, data and leadership.",
    emphasis: "International perspective, with an intentionally focused specialism.",
    priorities: ["Enterprise and solutions architecture", "Cybersecurity and security sales", "Cloud and AI infrastructure", "Technical leadership and transformation"],
    approach:
      "The intended US approach is focused: understand the business problem, identify the relevant talent market and build a targeted search.",
    marketNote: "US positioning is a proposed expansion, not a representation of an existing US office or entity.",
  },
] as const

export type GlobalRegionSlug = (typeof GLOBAL_REGIONS)[number]["slug"]

export function getGlobalRegion(slug: string) {
  return GLOBAL_MARKETS.find((region) => region.slug === slug) ??
    GLOBAL_REGIONS.find((region) => region.slug === slug)
}
