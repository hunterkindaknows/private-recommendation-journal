import type { MetadataRoute } from "next"

const siteUrl = "https://hunterkindaknows.github.io/private-recommendation-journal"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/go/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
