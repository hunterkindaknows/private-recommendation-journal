import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronLeft } from "lucide-react"
import { PrimaryPickBlock } from "@/components/primary-pick-block"
import { SecondaryPickBlock } from "@/components/secondary-pick-block"
import { PersonaTag } from "@/components/persona-tag"
import { DisclosureStrip } from "@/components/disclosure-strip"
import {
  editorials,
  getAllCategories,
  getEditorialBySlug,
  personas,
  getRelatedEditorials,
  getRelatedFieldNotes,
  topicClusters,
  categoryMeta,
  type Category,
} from "@/lib/data"

interface Props {
  params: Promise<{ category: string; slug: string }>
}

interface FaqItem {
  question: string
  answer: string
}

function toMetaDescription(text: string): string {
  if (text.length <= 155) return text
  return `${text.slice(0, 152).trimEnd()}...`
}

function buildEditorialFaq(editorial: (typeof editorials)[number]): FaqItem[] {
  return [
    {
      question: `Who is ${editorial.title} for?`,
      answer: editorial.whoThisIsFor,
    },
    {
      question: "Who should skip this recommendation?",
      answer: editorial.whoThisWillAnnoy,
    },
    {
      question: "What matters most in this pick?",
      answer: editorial.rationale.whatMatters,
    },
    {
      question: "What problems does this avoid?",
      answer: editorial.rationale.failureModes.join(" "),
    },
    {
      question: "What if this item is out of stock?",
      answer: editorial.outOfStockFallback,
    },
  ]
}

export async function generateStaticParams() {
  return editorials.map((e) => ({
    category: e.category,
    slug: e.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const editorial = getEditorialBySlug(category as Category, slug)
  if (!editorial) return {}
  const canonicalPath = `/${editorial.category}/${editorial.slug}/`
  const description = toMetaDescription(editorial.premise)
  return {
    title: editorial.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: editorial.title,
      description,
      type: "article",
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: editorial.title,
      description,
    },
  }
}

export default async function EditorialPage({ params }: Props) {
  const { category, slug } = await params
  const cat = category as Category

  if (!getAllCategories().includes(cat)) {
    notFound()
  }

  const editorial = getEditorialBySlug(cat, slug)
  if (!editorial) {
    notFound()
  }
  const relatedEditorials = getRelatedEditorials(editorial, 3)
  const relatedNotes = getRelatedFieldNotes(editorial, 2)
  const relatedTopics = topicClusters.filter((cluster) =>
    cluster.editorialSlugs.includes(editorial.slug)
  )
  const faqs = buildEditorialFaq(editorial)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
  const author = personas[editorial.persona]

  return (
    <div className="mx-auto max-w-4xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="py-8">
        <Link
          href={`/${cat}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {categoryMeta[cat].label}
        </Link>
      </div>

      <header className="border border-border bg-card px-8 py-10 md:px-10 md:py-12">
        <div className="mb-5">
          <PersonaTag persona={editorial.persona} />
        </div>
        <h1 className="max-w-3xl font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
          {editorial.title}
        </h1>
        <p className="mt-3 text-xs tracking-wide text-muted-foreground">
          Published {editorial.published} · Updated {editorial.updated}
        </p>
      </header>

      <section className="border-x border-b border-border bg-card px-8 py-8 md:px-10">
        <p className="max-w-3xl text-base leading-relaxed text-foreground md:text-lg">
          {editorial.premise}
        </p>
      </section>

      <PrimaryPickBlock pick={editorial.primaryPick} />

      <section className="border border-border bg-card p-8 md:p-10">
        <h2 className="mb-6 font-serif text-3xl text-foreground">What matters here</h2>
        <p className="text-sm leading-relaxed text-foreground">{editorial.rationale.whatMatters}</p>

        <h3 className="mb-3 mt-10 font-serif text-xl text-foreground">What we ignored</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {editorial.rationale.whatWeIgnored}
        </p>

        <h3 className="mb-3 mt-10 font-serif text-xl text-foreground">Failure modes</h3>
        <ul className="flex flex-col gap-3">
          {editorial.rationale.failureModes.map((mode, i) => (
            <li key={i} className="border-l border-border pl-4 text-sm text-muted-foreground">
              {mode}
            </li>
          ))}
        </ul>

        <h3 className="mb-3 mt-10 font-serif text-xl text-foreground">Why this, not the popular one</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{editorial.whyThisNotPopular}</p>
      </section>

      <section className="mt-10 border border-border bg-card p-8 md:p-10">
        <h2 className="mb-6 font-serif text-3xl text-foreground">Fit check</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="border-l-2 border-accent pl-4">
            <span className="persona-badge text-muted-foreground">Who this is for</span>
            <p className="mt-2 text-sm text-foreground">{editorial.whoThisIsFor}</p>
          </div>
          <div className="border-l border-border pl-4">
            <span className="persona-badge text-muted-foreground">Who this will annoy</span>
            <p className="mt-2 text-sm text-muted-foreground">{editorial.whoThisWillAnnoy}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 border border-border bg-card p-8 md:p-10">
        <h2 className="mb-6 font-serif text-3xl text-foreground">Material and build notes</h2>
        <p className="text-sm leading-relaxed text-foreground">
          {editorial.primaryPick.product.shortSpecs ??
            "Material and construction notes are based on listed specs, wear behavior, and repeat-use fit stability."}
        </p>
      </section>

      {editorial.secondaryPick && <SecondaryPickBlock pick={editorial.secondaryPick} />}

      {editorial.rejected && editorial.rejected.length > 0 && (
        <section className="mt-10 border border-border bg-card p-8 md:p-10">
          <details className="group">
            <summary className="cursor-pointer font-serif text-lg text-foreground">
              Alternatives we rejected
            </summary>
            <div className="mt-5 flex flex-col gap-4">
              {editorial.rejected.map((item, i) => (
                <div key={i} className="border-l border-border pl-4">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.whyRejected}</p>
                </div>
              ))}
            </div>
          </details>
        </section>
      )}

      <section className="mt-10 border border-border bg-card p-8 md:p-10">
        <p className="text-sm text-muted-foreground">
          Written by{" "}
          <Link href={`/editor/${editorial.persona}`} className="gold-underline text-foreground">
            {editorial.persona === "minimalist" && "The Minimalist"}
            {editorial.persona === "performance-analyst" && "The Performance Analyst"}
            {editorial.persona === "luxury-curator" && "The Luxury Curator"}
            {editorial.persona === "practicalist" && "The Practicalist"}
          </Link>
        </p>
      </section>

      <DisclosureStrip updatedDate={editorial.lastReviewedDate} />
      <section className="pb-10 pt-2">
        <p className="text-xs text-muted-foreground">Out-of-stock fallback: {editorial.outOfStockFallback}</p>
      </section>

      <section className="border border-border bg-card p-8 md:p-10">
        <h2 className="mb-6 font-serif text-3xl text-foreground">Related reading</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {relatedEditorials.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.category}/${item.slug}`}
              className="border border-border p-4 text-sm text-foreground transition-colors hover:border-accent"
            >
              {item.title}
            </Link>
          ))}
          {relatedNotes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="border border-border p-4 text-sm text-foreground transition-colors hover:border-accent"
            >
              {note.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 border border-border bg-card p-8 md:p-10">
        <h2 className="mb-5 font-serif text-3xl text-foreground">How we choose</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We limit recommendations by design: one primary pick, one contrast pick only when
          needed, and explicit disqualifiers. We publish slower than typical affiliate blogs so
          each page can stay opinionated and specific.
        </p>
      </section>

      {relatedTopics.length > 0 && (
        <section className="mt-10 border border-border bg-card p-8 md:p-10">
          <h2 className="mb-5 font-serif text-3xl text-foreground">Topic clusters</h2>
          <div className="flex flex-wrap gap-3">
            {relatedTopics.map((cluster) => (
              <Link
                key={cluster.slug}
                href={`/topics/${cluster.slug}`}
                className="border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
              >
                {cluster.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="my-10 border border-border bg-card p-8 md:p-10">
        <h2 className="mb-5 font-serif text-3xl text-foreground">About the editor</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <Link href={`/editor/${author.slug}`} className="gold-underline text-foreground">
            {author.name}
          </Link>{" "}
          writes with a clear filter: {author.optimizes}. This page follows that exact standard.
        </p>
      </section>

      <section className="mb-20 border border-border bg-card p-8 md:p-10">
        <h2 className="mb-5 font-serif text-3xl text-foreground">FAQ</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="border border-border p-4">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
