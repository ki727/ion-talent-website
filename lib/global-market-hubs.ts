/**
 * Global preview market navigation: four core commercial markets and one
 * deliberately selective growth market. These are delivery priorities, not
 * claims of local offices or legal entities in each location.
 */
export const GLOBAL_MARKETS = [
  {
    slug: "uk",
    label: "United Kingdom",
    tier: "core",
    kicker: "United Kingdom",
    headline: "Talent solutions across the UK.",
    introduction:
      "Recruitment and executive search across sectors and levels, supporting employers hiring across the UK.",
    emphasis: "Understanding your business. Finding the right people.",
    priorities: [
      "Cybersecurity and resilience",
      "Enterprise and solutions architecture",
      "Cloud, infrastructure and data platforms",
      "Technology leadership and enterprise sales",
    ],
    approach:
      "We build targeted shortlists through role calibration, market mapping and direct engagement rather than broad, untargeted advertising.",
    marketNote:
      "Every search starts with your brief. We tailor our approach to the role, location and candidate market.",
    countryLinks: [],
  },
  {
    slug: "europe",
    label: "Europe",
    tier: "core",
    kicker: "Continental Europe",
    headline: "Talent solutions across Europe.",
    introduction:
      "Recruitment and executive search across sectors and levels, supporting employers hiring across Europe.",
    emphasis: "Understanding your business. Finding the right people.",
    priorities: [
      "Cybersecurity and critical technology",
      "Enterprise applications and architecture",
      "Cloud, infrastructure and AI",
      "Technology and commercial leadership",
    ],
    approach:
      "We assess each country and mandate individually, matching search strategy to language, hiring requirements, talent availability and delivery capacity.",
    marketNote:
      "Every search starts with your brief. We tailor our approach to the role, location and candidate market.",
    countryLinks: [],
  },
  {
    slug: "us",
    label: "United States",
    tier: "core",
    kicker: "United States",
    headline: "Talent solutions across the United States.",
    introduction:
      "Recruitment and executive search across sectors and levels, supporting employers hiring across the United States.",
    emphasis: "Understanding your business. Finding the right people.",
    priorities: [
      "Enterprise and solutions architecture",
      "Cybersecurity and security sales",
      "Cloud and AI infrastructure",
      "Senior technology and commercial leadership",
    ],
    approach:
      "Research-led candidate mapping and direct search for mandates where ION Talent can add meaningful value.",
    marketNote:
      "Every search starts with your brief. We tailor our approach to the role, location and candidate market.",
    countryLinks: [],
  },
  {
    slug: "middle-east",
    label: "Middle East",
    tier: "core",
    kicker: "Middle East",
    headline: "Talent solutions across the Middle East.",
    introduction:
      "Recruitment and executive search across sectors and levels, supporting employers hiring across the Middle East.",
    emphasis: "Understanding your business. Finding the right people.",
    priorities: [
      "Cybersecurity and critical infrastructure",
      "Cloud and enterprise architecture",
      "Data, AI and technology transformation",
      "Executive and functional leadership",
    ],
    approach:
      "We combine targeted research, market mapping and direct talent engagement for demanding searches across the Gulf.",
    marketNote:
      "Every search starts with your brief. We tailor our approach to the role, location and candidate market.",
    countryLinks: [
      { label: "United Arab Emirates", slug: "ae" },
      { label: "Saudi Arabia", slug: "sa" },
      { label: "Wider GCC", slug: "gcc" },
    ],
  },
  {
    slug: "asia-pacific",
    label: "Asia-Pacific",
    tier: "growth",
    kicker: "Asia-Pacific",
    headline: "Talent solutions across Asia-Pacific.",
    introduction:
      "Recruitment and executive search across sectors and levels, supporting employers hiring across Asia-Pacific.",
    emphasis: "Understanding your business. Finding the right people.",
    priorities: [
      "Cybersecurity and digital infrastructure",
      "Cloud, AI and data platforms",
      "Enterprise technology sales",
      "Senior technology appointments",
    ],
    approach:
      "We assess each opportunity individually, confirming local market context, search capability and hiring requirements before accepting a mandate.",
    marketNote:
      "Every search starts with your brief. We tailor our approach to the role, location and candidate market.",
    countryLinks: [],
  },
] as const
