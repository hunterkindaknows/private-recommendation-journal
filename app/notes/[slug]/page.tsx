import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  categoryMeta,
  fieldNotes,
  getEditorialByAnySlug,
  getFieldNoteBySlug,
  topicClusters,
  type Category,
} from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getFieldNoteBySlug(slug)
  if (!note) return {}
  const canonicalPath = `/notes/${note.slug}/`
  return {
    title: note.title,
    description: note.excerpt,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: note.title,
      description: note.excerpt,
      url: canonicalPath,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.excerpt,
    },
  }
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params
  const note = getFieldNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  const fallbackCategory: Category =
    note.category === "valentine"
      ? "women"
      : note.tags.includes("jewelry")
        ? "jewelry"
        : note.tags.includes("nursing") || note.tags.includes("baby")
          ? "maternity"
          : "men"

  const resolvedCategory = note.relatedCategory ?? fallbackCategory

  const fallbackTopic =
    topicClusters.find((cluster) => cluster.noteSlugs.includes(note.slug))?.slug ??
    topicClusters[0].slug

  const resolvedTopicSlug = note.relatedTopicSlug ?? fallbackTopic
  const relatedEditorial =
    (note.relatedEditorialSlug
      ? getEditorialByAnySlug(note.relatedEditorialSlug)
      : undefined) ??
    getEditorialByAnySlug(
      topicClusters.find((cluster) => cluster.slug === resolvedTopicSlug)?.editorialSlugs[0] ?? ""
    )

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="py-6">
        <Link
          href="/notes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Field Notes
        </Link>
      </div>

      <header className="pb-8">
        <span className="persona-badge text-accent">{note.category}</span>
        <h1 className="mt-2 font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
          {note.title}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Published {note.published} · Updated {note.updated}
        </p>
      </header>

      <section className="border-t border-border py-8">
        <div className="flex flex-col gap-5">
          {note.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-foreground md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {(resolvedCategory || resolvedTopicSlug || relatedEditorial) && (
        <section className="border-t border-border py-8">
          <h2 className="mb-4 font-serif text-2xl text-foreground">Continue Reading</h2>
          <div className="flex flex-wrap gap-3">
            {resolvedCategory && (
              <Link
                href={`/${resolvedCategory}`}
                className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
              >
                Category: {categoryMeta[resolvedCategory].label}
              </Link>
            )}
            {resolvedTopicSlug && (
              <Link
                href={`/topics/${resolvedTopicSlug}`}
                className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
              >
                Topic Cluster
              </Link>
            )}
            {relatedEditorial && (
              <Link
                href={`/${relatedEditorial.category}/${relatedEditorial.slug}`}
                className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
              >
                Related Pick
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
