import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  categoryMeta,
  comparisonGuides,
  getComparisonGuideBySlug,
  getEditorialByAnySlug,
} from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return comparisonGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getComparisonGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.summary,
    alternates: {
      canonical: `/comparisons/${guide.slug}/`,
    },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const guide = getComparisonGuideBySlug(slug)
  if (!guide) notFound()

  const relatedEditorial = getEditorialByAnySlug(guide.relatedEditorialSlug)

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="py-6">
        <Link
          href="/comparisons"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Comparisons
        </Link>
      </div>
      <header className="pb-8">
        <span className="persona-badge text-accent">{guide.vs[0]} vs {guide.vs[1]}</span>
        <h1 className="mt-2 font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
          {guide.title}
        </h1>
      </header>
      <section className="border-t border-border py-8">
        <p className="text-base leading-relaxed text-foreground md:text-lg">{guide.summary}</p>
        <div className="mt-8 flex flex-col gap-6">
          {guide.sections.map((section) => (
            <article key={section.heading}>
              <h2 className="font-serif text-2xl text-foreground">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.content}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 border-l-2 border-accent pl-4">
          <p className="persona-badge text-muted-foreground">Verdict</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{guide.verdict}</p>
        </div>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">Next Step</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${guide.relatedCategory}`}
            className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
          >
            Category: {categoryMeta[guide.relatedCategory].label}
          </Link>
          <Link
            href={`/topics/${guide.relatedTopicSlug}`}
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
