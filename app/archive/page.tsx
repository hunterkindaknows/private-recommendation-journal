import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { editorials, personas, categoryMeta } from "@/lib/data"

export const metadata: Metadata = {
  title: "Editorial Archive and Monthly Picks | Stonebay Journal",
  description:
    "Browse all published editorials by date, persona, and category to find decisive recommendations fast.",
  alternates: {
    canonical: "/archive/",
  },
  openGraph: {
    title: "Editorial Archive and Monthly Picks | Stonebay Journal",
    description:
      "Browse all published editorials by date, persona, and category to find decisive recommendations fast.",
    url: "/archive/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Archive and Monthly Picks | Stonebay Journal",
    description:
      "Browse all published editorials by date, persona, and category to find decisive recommendations fast.",
  },
}

export default function ArchivePage() {
  // Sort all editorials by published date, newest first
  const sorted = [...editorials].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )

  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Archive</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-5xl">
          All Editorials
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {sorted.length} editorial{sorted.length !== 1 ? "s" : ""} published.
          Every one a decision.
        </p>
      </header>

      <section className="border-t border-border py-10">
        <div className="flex flex-col">
          {sorted.map((editorial) => {
            const persona = personas[editorial.persona]
            const cat = categoryMeta[editorial.category]
            return (
              <Link
                key={`${editorial.category}-${editorial.slug}`}
                href={`/${editorial.category}/${editorial.slug}`}
                className="group flex items-start justify-between border-b border-border py-6 transition-colors"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {editorial.published}
                    </span>
                    <span className="text-xs text-muted-foreground">/</span>
                    <span className="persona-badge text-accent">
                      {persona.name}
                    </span>
                    <span className="text-xs text-muted-foreground">/</span>
                    <span className="persona-badge text-muted-foreground">
                      {cat.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-foreground md:text-xl">
                    {editorial.title}
                  </h3>
                </div>
                <ArrowRight className="ml-4 mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
