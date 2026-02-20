import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  categoryMeta,
  getEditorialByAnySlug,
  getGlossaryEntryBySlug,
  glossaryEntries,
} from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return glossaryEntries.map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const entry = getGlossaryEntryBySlug(slug)
  if (!entry) return {}
  return {
    title: entry.title,
    description: entry.definition,
    alternates: { canonical: `/glossary/${entry.slug}/` },
  }
}

export default async function GlossaryEntryPage({ params }: Props) {
  const { slug } = await params
  const entry = getGlossaryEntryBySlug(slug)
  if (!entry) notFound()

  const relatedEditorial = getEditorialByAnySlug(entry.relatedEditorialSlug)

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="py-6">
        <Link
          href="/glossary"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Glossary
        </Link>
      </div>
      <header className="pb-8">
        <span className="persona-badge text-accent">{entry.term}</span>
        <h1 className="mt-2 font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
          {entry.title}
        </h1>
      </header>
      <section className="border-t border-border py-8">
        <p className="text-base leading-relaxed text-foreground md:text-lg">{entry.definition}</p>
        <h2 className="mb-2 mt-8 font-serif text-2xl text-foreground">Why It Matters</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{entry.whyItMatters}</p>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">Related Reading</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${entry.relatedCategory}`}
            className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
          >
            Category: {categoryMeta[entry.relatedCategory].label}
          </Link>
          <Link
            href={`/topics/${entry.relatedTopicSlug}`}
            className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
          >
            Topic Cluster
          </Link>
          {relatedEditorial && (
            <Link
              href={`/${relatedEditorial.category}/${relatedEditorial.slug}`}
              className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
            >
              Related Editorial
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
