import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  topicClusters,
  getTopicClusterBySlug,
  getEditorialByAnySlug,
  getFieldNoteBySlug,
  categoryMeta,
} from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return topicClusters.map((cluster) => ({ slug: cluster.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cluster = getTopicClusterBySlug(slug)
  if (!cluster) return {}
  return {
    title: cluster.title,
    description: cluster.description,
  }
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const cluster = getTopicClusterBySlug(slug)

  if (!cluster) {
    notFound()
  }

  const clusterEditorials = cluster.editorialSlugs
    .map((item) => getEditorialByAnySlug(item))
    .filter((item) => Boolean(item))
  const clusterNotes = cluster.noteSlugs
    .map((item) => getFieldNoteBySlug(item))
    .filter((item) => Boolean(item))

  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="py-6">
        <Link
          href="/topics"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Topics
        </Link>
      </div>

      <header className="pb-10">
        <span className="persona-badge text-accent">Cluster</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-5xl">
          {cluster.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {cluster.description}
        </p>
      </header>

      <section className="border-t border-border py-8">
        <h2 className="mb-5 font-serif text-2xl text-foreground">Editorials in this cluster</h2>
        <div className="flex flex-col gap-5">
          {clusterEditorials.map((editorial) => (
            <Link
              key={editorial!.slug}
              href={`/${editorial!.category}/${editorial!.slug}`}
              className="group border border-border p-5 transition-colors hover:border-accent"
            >
              <p className="persona-badge text-muted-foreground">
                {categoryMeta[editorial!.category].label}
              </p>
              <h3 className="mt-2 font-serif text-xl text-foreground">{editorial!.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="mb-5 font-serif text-2xl text-foreground">Supporting notes</h2>
        <div className="flex flex-col gap-5">
          {clusterNotes.map((note) => (
            <Link
              key={note!.slug}
              href={`/notes/${note!.slug}`}
              className="group border border-border p-5 transition-colors hover:border-accent"
            >
              <p className="persona-badge text-accent">{note!.category}</p>
              <h3 className="mt-2 font-serif text-xl text-foreground">{note!.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
