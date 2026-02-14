import type { MetadataRoute } from "next"
import { editorials, fieldNotes, getAllCategories, personas, type PersonaSlug } from "@/lib/data"

const siteUrl = "https://hunterkindaknows.github.io/private-recommendation-journal"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/archive/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/disclosure/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/notes/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${siteUrl}/${category}/`,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const personaPages: MetadataRoute.Sitemap = (Object.keys(personas) as PersonaSlug[]).map(
    (persona) => ({
      url: `${siteUrl}/editor/${persona}/`,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  )

  const editorialPages: MetadataRoute.Sitemap = editorials.map((editorial) => ({
    url: `${siteUrl}/${editorial.category}/${editorial.slug}/`,
    lastModified: editorial.updated,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  const notePages: MetadataRoute.Sitemap = fieldNotes.map((note) => ({
    url: `${siteUrl}/notes/${note.slug}/`,
    lastModified: note.updated,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...personaPages, ...editorialPages, ...notePages]
}
