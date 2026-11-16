/** Real photography. Illustrative scenes do not claim to show a regional office or local landmark. */
type RegionalPhotograph = {
  src: string
  alt: string
  caption: string
  position: string
  nativeSize?: { width: number; height: number }
  supporting?: {
    src: string
    alt: string
    caption: string
    width: number
    height: number
  }
}

export const REGIONAL_PHOTOGRAPHY: Record<string, RegionalPhotograph> = {
  uk: {
    src: "/photography/global/london-bridge-commuters.jpg",
    alt: "Commuters and a red bus on London Bridge, with The Shard at dusk",
    caption: "London Bridge · London",
    position: "50% center",
    nativeSize: { width: 612, height: 408 },
    supporting: {
      src: "/photography/global/london-bank-skyline.jpeg",
      alt: "An elevated view of Bank junction, red buses and the City of London skyline",
      caption: "Bank · City of London",
      width: 399,
      height: 501,
    },
  },
  europe: {
    src: "/photography/about-office.webp",
    alt: "People working at desks in a bright shared office, used as illustrative workplace photography",
    caption: "A shared workspace · Illustrative photography",
    position: "center 65%",
  },
  us: {
    src: "/photography/global/new-york-wall-street.jpg",
    alt: "Wall Street in New York, with American flags, pedestrians and the stock exchange",
    caption: "Wall Street · New York",
    position: "center",
    nativeSize: { width: 612, height: 408 },
  },
  "asia-pacific": {
    src: "/photography/global/urban-landscape.webp",
    alt: "Modern waterfront buildings and urban greenery, used as illustrative city photography",
    caption: "Urban landscape · Illustrative photography",
    position: "center 65%",
  },
}
