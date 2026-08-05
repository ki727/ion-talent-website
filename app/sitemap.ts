import type { MetadataRoute } from "next"
import { opportunities } from "@/lib/opportunities"
import { SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/opportunities`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/refer`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/referral-terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const roleRoutes: MetadataRoute.Sitemap = opportunities.map((opportunity) => ({
    url: `${SITE_URL}/opportunities/${opportunity.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...roleRoutes]
}
