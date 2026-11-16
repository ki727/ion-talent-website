/** Real photography. Illustrative scenes do not claim to show a regional office or local landmark. */
type RegionalPhotograph = {
  src: string
  alt: string
  caption: string
  position: string
}

export const REGIONAL_PHOTOGRAPHY: Record<string, RegionalPhotograph> = {
  uk: {
    src: "/photography/global/commercial-architecture.webp",
    alt: "Stone and glass building façades, used as illustrative commercial architecture",
    caption: "Commercial architecture · Illustrative photography",
    position: "43% center",
  },
  europe: {
    src: "/photography/about-office.webp",
    alt: "People working at desks in a bright shared office, used as illustrative workplace photography",
    caption: "A shared workspace · Illustrative photography",
    position: "center 65%",
  },
  us: {
    src: "/photography/global/new-york-waterfront.webp",
    alt: "New York waterfront at dusk with illuminated buildings reflected in the river",
    caption: "New York · Libre Photography",
    position: "center 56%",
  },
  "asia-pacific": {
    src: "/photography/global/urban-landscape.webp",
    alt: "Modern waterfront buildings and urban greenery, used as illustrative city photography",
    caption: "Urban landscape · Illustrative photography",
    position: "center 65%",
  },
}
