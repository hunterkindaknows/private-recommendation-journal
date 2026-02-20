import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  categoryMeta,
  getEditorialByAnySlug,
  getUseCaseGuideBySlug,
  useCaseGuides,
} from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return useCaseGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getUseCaseGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.summary,
    alternates: { canonical: `/use-cases/${guide.slug}/` },
  }
}

export default async function UseCaseGuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getUseCaseGuideBySlug(slug)
  if (!guide) notFound()

  const editorials = guide.relatedEditorialSlugs
    .map((item) => getEditorialByAnySlug(item))
    .filter((item) => Boolean(item))

  return (
    <div className="mx-auto max-w-3xl px-6">
      <div className="py-6">
        <Link
          href="/use-cases"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Use Cases
        </Link>
      </div>
      <header className="pb-8">
        <span className="persona-badge text-accent">Use-Case Guide</span>
        <h1 className="mt-2 font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {guide.summary}
        </p>
      </header>
      <section className="border-t border-border py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-l-2 border-accent pl-4">
            <p className="persona-badge text-muted-foreground">Who this is for</p>
            <p className="mt-1 text-sm text-foreground">{guide.whoThisIsFor}</p>
          </div>
          <div className="border-l-2 border-border pl-4">
            <p className="persona-badge text-muted-foreground">Who this annoys</p>
            <p className="mt-1 text-sm text-muted-foreground">{guide.whoThisAnnoys}</p>
          </div>
        </div>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">Checklist</h2>
        <ul className="flex flex-col gap-2">
          {guide.checklist.map((item) => (
            <li key={item} className="border-l-2 border-border pl-4 text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">Where to Go Next</h2>
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
          {editorials.map((editorial) => (
            <Link
              key={editorial!.slug}
              href={`/${editorial!.category}/${editorial!.slug}`}
              className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
            >
              {editorial!.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
