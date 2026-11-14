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
    headline: "Specialist recruitment and executive search across the UK.",
    introduction:
      "Focused search support for UK employers hiring business-critical technology specialists, commercial leaders and executives.",
    emphasis: "A strong UK foundation. A focused specialist remit.",
    priorities: [
      "Cybersecurity and resilience",
      "Enterprise and solutions architecture",
      "Cloud, infrastructure and data platforms",
      "Technology leadership and enterprise sales",
    ],
    approach:
      "We build targeted shortlists through role calibration, market mapping and direct engagement rather than broad, untargeted advertising.",
    marketNote:
      "The UK is a core target market for ION Talent. Search is led by the actual brief and the relevant candidate market, without implying a physical office footprint.",
    countryLinks: [],
  },
  {
    slug: "europe",
    label: "Europe",
    tier: "core",
    kicker: "Continental Europe",
    headline: "Focused specialist search across European technology markets.",
    introduction:
      "Recruitment and executive search for selected technology, cybersecurity and leadership mandates across continental Europe.",
    emphasis: "Selective cross-border search, grounded in the brief.",
    priorities: [
      "Cybersecurity and critical technology",
      "Enterprise applications and architecture",
      "Cloud, infrastructure and AI",
      "Technology and commercial leadership",
    ],
    approach:
      "We assess each country and mandate individually, matching search strategy to language, hiring requirements, talent availability and delivery capacity.",
    marketNote:
      "Europe is positioned separately from the UK for clarity. Coverage is selective and does not imply established operations or offices across the continent.",
    countryLinks: [],
  },
  {
    slug: "us",
    label: "United States",
    tier: "core",
    kicker: "United States",
    headline: "Specialist search for US technology businesses.",
    introduction:
      "A focused recruitment and executive search proposition for US employers hiring critical cybersecurity, cloud, data and technology leadership talent.",
    emphasis: "International reach. A deliberately focused specialism.",
    priorities: [
      "Enterprise and solutions architecture",
      "Cybersecurity and security sales",
      "Cloud and AI infrastructure",
      "Senior technology and commercial leadership",
    ],
    approach:
      "Research-led candidate mapping and direct search for mandates where ION Talent can add meaningful value.",
    marketNote:
      "The United States is a core commercial target market. This page does not imply an existing US office or US operating entity; individual searches must be assessed for delivery and local requirements.",
    countryLinks: [],
  },
  {
    slug: "middle-east",
    label: "Middle East",
    tier: "core",
    kicker: "Middle East",
    headline: "Specialist search across the Middle East.",
    introduction:
      "Executive search and specialist recruitment, with the UAE and Saudi Arabia as ION Talent's immediate regional priorities.",
    emphasis: "Gulf market experience, international search perspective.",
    priorities: [
      "Cybersecurity and critical infrastructure",
      "Cloud and enterprise architecture",
      "Data, AI and technology transformation",
      "Executive and functional leadership",
    ],
    approach:
      "We combine targeted research, market mapping and direct talent engagement for demanding searches across the Gulf.",
    marketNote:
      "The UAE and Saudi Arabia are the immediate commercial focus. Qatar and other GCC markets are approached selectively, depending on the brief.",
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
    kicker: "Asia-Pacific · Growth market",
    headline: "Selective specialist search across Asia-Pacific.",
    introduction:
      "Exploring targeted technology and leadership searches across Singapore, Australia and Southeast Asia where we can offer a credible solution.",
    emphasis: "A growing regional perspective, without overclaiming reach.",
    priorities: [
      "Cybersecurity and digital infrastructure",
      "Cloud, AI and data platforms",
      "Enterprise technology sales",
      "Senior technology appointments",
    ],
    approach:
      "We assess each opportunity individually, confirming local market context, search capability and hiring requirements before accepting a mandate.",
    marketNote:
      "Asia-Pacific is a strategic growth market, not a claim of established offices or full coverage. Bali provides a useful regional base for exploring relationships and opportunities.",
    countryLinks: [],
  },
] as const
