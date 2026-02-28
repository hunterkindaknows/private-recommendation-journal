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
    <div className="mx-auto max-w-3xl px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Breadcrumb */}
      <div className="py-6">
        <Link
          href={`/${cat}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {categoryMeta[cat].label}
        </Link>
      </div>

      {/* Header */}
      <header className="pb-8">
        <div className="mb-4">
          <PersonaTag persona={editorial.persona} />
        </div>
        <h1 className="font-serif text-3xl font-light leading-tight text-foreground md:text-5xl">
          {editorial.title}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Published {editorial.published} &middot; Updated{" "}
          {editorial.updated}
        </p>
      </header>

      {/* Premise */}
      <section className="border-t border-border py-8">
        <p className="text-base leading-relaxed text-foreground md:text-lg">
          {editorial.premise}
        </p>
      </section>

      {/* Primary Pick */}
      <PrimaryPickBlock pick={editorial.primaryPick} />

      {/* Rationale */}
      <section className="py-8">
        <h2 className="mb-6 font-serif text-2xl text-foreground">
          What Matters Here
        </h2>
        <p className="text-sm leading-relaxed text-foreground">
          {editorial.rationale.whatMatters}
        </p>

        <h3 className="mb-3 mt-8 font-serif text-xl text-foreground">
          What We Ignored
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {editorial.rationale.whatWeIgnored}
        </p>

        <h3 className="mb-3 mt-8 font-serif text-xl text-foreground">
          Failure Modes
        </h3>
        <ul className="flex flex-col gap-2">
          {editorial.rationale.failureModes.map((mode, i) => (
            <li
              key={i}
              className="border-l-2 border-border pl-4 text-sm text-muted-foreground"
            >
              {mode}
            </li>
          ))}
        </ul>

        <h3 className="mb-3 mt-8 font-serif text-xl text-foreground">
          Why This, Not The Popular One
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {editorial.whyThisNotPopular}
        </p>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="mb-6 font-serif text-2xl text-foreground">
          Fit Check
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-l-2 border-accent pl-4">
            <span className="persona-badge text-muted-foreground">
              Who this is for
            </span>
            <p className="mt-1 text-sm text-foreground">{editorial.whoThisIsFor}</p>
          </div>
          <div className="border-l-2 border-border pl-4">
            <span className="persona-badge text-muted-foreground">
              Who this will annoy
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              {editorial.whoThisWillAnnoy}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="mb-6 font-serif text-2xl text-foreground">
          Material and Build Notes
        </h2>
        <p className="text-sm leading-relaxed text-foreground">
          {editorial.primaryPick.product.shortSpecs ??
            "Material and construction notes are based on listed specs, wear behavior, and repeat-use fit stability."}
        </p>
      </section>

      {/* Secondary Pick */}
      {editorial.secondaryPick && (
        <SecondaryPickBlock pick={editorial.secondaryPick} />
      )}

      {/* Rejected Alternatives */}
      {editorial.rejected && editorial.rejected.length > 0 && (
        <section className="py-8">
          <details className="group">
            <summary className="cursor-pointer font-serif text-lg text-foreground">
              <span className="ml-1">
                Alternatives We Rejected
              </span>
            </summary>
            <div className="mt-4 flex flex-col gap-4">
              {editorial.rejected.map((item, i) => (
                <div
                  key={i}
                  className="border-l-2 border-border pl-4"
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.whyRejected}
                  </p>
                </div>
              ))}
            </div>
          </details>
        </section>
      )}

      {/* Edit sign-off */}
      <section className="border-t border-border py-8">
        <p className="font-script text-lg text-accent">
          Written by{" "}
          <Link
            href={`/editor/${editorial.persona}`}
            className="gold-underline text-foreground"
          >
            {editorial.persona === "minimalist" && "The Minimalist"}
            {editorial.persona === "performance-analyst" &&
              "The Performance Analyst"}
            {editorial.persona === "luxury-curator" && "The Luxury Curator"}
            {editorial.persona === "practicalist" && "The Practicalist"}
          </Link>
        </p>
      </section>

      {/* Disclosure */}
      <DisclosureStrip updatedDate={editorial.lastReviewedDate} />
      <section className="pb-10 pt-2">
        <p className="text-xs text-muted-foreground">
          Out-of-stock fallback: {editorial.outOfStockFallback}
        </p>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="mb-5 font-serif text-2xl text-foreground">Related Reading</h2>
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

      <section className="border-t border-border py-8">
        <h2 className="mb-5 font-serif text-2xl text-foreground">How We Choose</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We limit recommendations by design: one primary pick, one contrast
          pick only when needed, and explicit disqualifiers. We publish slower
          than typical affiliate blogs so each page can stay opinionated and
          specific.
        </p>
      </section>

      {relatedTopics.length > 0 && (
        <section className="border-t border-border py-8">
          <h2 className="mb-5 font-serif text-2xl text-foreground">Topic Clusters</h2>
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

      <section className="border-t border-border py-8">
        <h2 className="mb-5 font-serif text-2xl text-foreground">About the Editor</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <Link href={`/editor/${author.slug}`} className="gold-underline text-foreground">
            {author.name}
          </Link>{" "}
          writes with a clear filter: {author.optimizes}. This page follows that
          exact standard.
        </p>
      </section>

      <section className="border-t border-border py-8">
        <h2 className="mb-5 font-serif text-2xl text-foreground">FAQ</h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="border border-border p-4">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
