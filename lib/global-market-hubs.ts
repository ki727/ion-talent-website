/**
 * Four top-level global markets for the development preview only.
 * No entry should be interpreted as an office, registration or established
 * operational presence in every country included.
 */
export const GLOBAL_MARKETS = [
  {
    slug: "middle-east",
    label: "Middle East",
    kicker: "Middle East",
    headline: "Specialist search across the Middle East.",
    introduction:
      "Executive search and specialist recruitment with a core focus on the UAE, Saudi Arabia and wider GCC markets.",
    emphasis: "Regional market knowledge, international search perspective.",
    priorities: [
      "Cybersecurity and critical infrastructure",
      "Cloud and enterprise architecture",
      "Data, AI and technology transformation",
      "Executive and functional leadership",
    ],
    approach:
      "We combine role calibration, market mapping and direct talent engagement to support demanding searches across the Gulf.",
    marketNote:
      "The UAE and Saudi Arabia remain ION Talent's priority commercial markets. Broader Middle East enquiries are assessed individually.",
    countryLinks: [
      { label: "United Arab Emirates", slug: "ae" },
      { label: "Saudi Arabia", slug: "sa" },
      { label: "Wider GCC", slug: "gcc" },
    ],
  },
  {
    slug: "europe",
    label: "Europe",
    kicker: "Europe",
    headline: "Specialist technology recruitment across Europe.",
    introduction:
      "Focused executive search and specialist recruitment, starting with the UK and supporting selected international mandates.",
    emphasis: "A UK foundation with a wider European perspective.",
    priorities: [
      "Enterprise and solutions architecture",
      "Cybersecurity and resilience",
      "Cloud and infrastructure leadership",
      "Transformation and executive appointments",
    ],
    approach:
      "Targeted research and direct search tailored to the actual requirements of the employer and the relevant talent market.",
    marketNote:
      "The United Kingdom is the initial priority. Individual continental European markets will be developed where commercial opportunity and delivery capacity justify it.",
    countryLinks: [{ label: "United Kingdom", slug: "uk" }],
  },
  {
    slug: "north-america",
    label: "North America",
    kicker: "North America · Expansion focus",
    headline: "Focused search for North American technology teams.",
    introduction:
      "Proposed specialist search capabilities for businesses hiring technology, cyber, data and leadership talent across the United States and Canada.",
    emphasis: "Cross-border expertise with a deliberately focused remit.",
    priorities: [
      "Enterprise and solutions architecture",
      "Cybersecurity leadership and security sales",
      "Cloud, infrastructure and AI platforms",
      "Technology executive search",
    ],
    approach:
      "Develop a focused market-specific service, beginning with research-led searches in areas where ION Talent can genuinely add value.",
    marketNote:
      "North America remains an expansion market. This draft does not imply a physical office or legal operating entity in the United States or Canada.",
    countryLinks: [{ label: "United States", slug: "us" }],
  },
  {
    slug: "rest-of-world",
    label: "Rest of World",
    kicker: "International",
    headline: "International search beyond our core markets.",
    introduction:
      "A route for businesses with specialist hiring requirements across Asia-Pacific and other international locations.",
    emphasis: "The right specialist search, wherever the requirement takes us.",
    priorities: [
      "Cross-border specialist search",
      "Cybersecurity and digital infrastructure",
      "Data and AI talent",
      "Senior technology appointments",
    ],
    approach:
      "Review each international mandate individually, confirming delivery fit, geographic scope and local hiring requirements before proceeding.",
    marketNote:
      "Rest of World is a global enquiries hub rather than a claim of established operations in every country. Specific market pages can be added as demand grows.",
    countryLinks: [],
  },
] as const
