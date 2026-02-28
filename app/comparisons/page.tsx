import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { comparisonGuides } from "@/lib/data"

export const metadata: Metadata = {
  title: "Comparison Guides | Stonebay Journal",
  description:
    "Specific confusion solved directly: side-by-side comparisons without listicle noise.",
  alternates: {
    canonical: "/comparisons/",
  },
  openGraph: {
    title: "Comparison Guides | Stonebay Journal",
    description:
      "Specific confusion solved directly: side-by-side comparisons without listicle noise.",
    url: "/comparisons/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparison Guides | Stonebay Journal",
    description:
      "Specific confusion solved directly: side-by-side comparisons without listicle noise.",
  },
}

export default function ComparisonsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Comparisons</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Specific Confusion, Solved
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Educational breakdowns for real buying crossroads.
        </p>
      </header>

      <section className="border-t border-border py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {comparisonGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/comparisons/${guide.slug}`}
              className="group border border-border p-7 transition-colors hover:border-accent"
            >
              <span className="persona-badge text-accent">{guide.vs[0]} vs {guide.vs[1]}</span>
              <h2 className="mt-3 font-serif text-2xl text-foreground">{guide.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {guide.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Read comparison
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
