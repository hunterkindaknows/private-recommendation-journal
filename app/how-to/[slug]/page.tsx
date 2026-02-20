import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import {
  categoryMeta,
  getEditorialByAnySlug,
  getHowToGuideBySlug,
  howToGuides,
} from "@/lib/data"

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return howToGuides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = getHowToGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.intro,
    alternates: { canonical: `/how-to/${guide.slug}/` },
  }
}

export default async function HowToGuidePage({ params }: Props) {
  const { slug } = await params
  const guide = getHowToGuideBySlug(slug)
  if (!guide) notFound()

  const relatedEditorial = getEditorialByAnySlug(guide.relatedEditorialSlug)
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.intro,
    totalTime: guide.totalTime,
    supply: guide.supplies.map((item) => ({ "@type": "HowToSupply", name: item })),
    step: guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.description,
    })),
  }

  return (
    <div className="mx-auto max-w-3xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="py-6">
        <Link
          href="/how-to"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          How-To
        </Link>
      </div>
      <header className="pb-8">
        <span className="persona-badge text-accent">{guide.totalTime}</span>
        <h1 className="mt-2 font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {guide.intro}
        </p>
      </header>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">You’ll Need</h2>
        <ul className="flex flex-col gap-2">
          {guide.supplies.map((item) => (
            <li key={item} className="border-l-2 border-border pl-4 text-sm text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">Steps</h2>
        <div className="flex flex-col gap-6">
          {guide.steps.map((step, index) => (
            <article key={step.name}>
              <p className="persona-badge text-accent">Step {index + 1}</p>
              <h3 className="mt-2 font-serif text-xl text-foreground">{step.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-border py-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">Related Reading</h2>
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
