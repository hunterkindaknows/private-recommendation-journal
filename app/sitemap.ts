import type { MetadataRoute } from "next"
import {
  comparisonGuides,
  editorials,
  fieldNotes,
  getAllCategories,
  glossaryEntries,
  howToGuides,
  topicClusters,
  useCaseGuides,
} from "@/lib/data"

const baseUrl = "https://hunterkindaknows.github.io/private-recommendation-journal"

function toDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00.000Z`)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/about",
    "/archive",
    "/topics",
    "/notes",
    "/comparisons",
    "/how-to",
    "/glossary",
    "/use-cases",
    "/who-this-is-for",
    "/editorial-philosophy",
    "/disclosure",
    "/policies/privacy-policy",
    "/policies/terms-of-service",
  ]

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}/`.replace(/\/\/$/, "/"),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.7,
  }))

  const categoryEntries = getAllCategories().map((category) => ({
    url: `${baseUrl}/${category}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const editorialEntries = editorials.map((editorial) => ({
    url: `${baseUrl}/${editorial.category}/${editorial.slug}/`,
    lastModified: toDate(editorial.updated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const noteEntries = fieldNotes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}/`,
    lastModified: toDate(note.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const topicEntries = topicClusters.map((topic) => ({
    url: `${baseUrl}/topics/${topic.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const comparisonEntries = comparisonGuides.map((guide) => ({
    url: `${baseUrl}/comparisons/${guide.slug}/`,
    lastModified: toDate(guide.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const glossaryPageEntries = glossaryEntries.map((entry) => ({
    url: `${baseUrl}/glossary/${entry.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const howToEntries = howToGuides.map((guide) => ({
    url: `${baseUrl}/how-to/${guide.slug}/`,
    lastModified: toDate(guide.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const useCaseEntries = useCaseGuides.map((guide) => ({
    url: `${baseUrl}/use-cases/${guide.slug}/`,
    lastModified: toDate(guide.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    ...staticEntries,
    ...categoryEntries,
    ...editorialEntries,
    ...noteEntries,
    ...topicEntries,
    ...comparisonEntries,
    ...glossaryPageEntries,
    ...howToEntries,
    ...useCaseEntries,
  ]
}
