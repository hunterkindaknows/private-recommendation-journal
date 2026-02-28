import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { glossaryEntries } from "@/lib/data"

export const metadata: Metadata = {
  title: "Glossary | Stonebay Journal",
  description:
    "Tiny definitions for technical clothing and material terms that influence buying decisions.",
  alternates: {
    canonical: "/glossary/",
  },
  openGraph: {
    title: "Glossary | Stonebay Journal",
    description:
      "Tiny definitions for technical clothing and material terms that influence buying decisions.",
    url: "/glossary/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary | Stonebay Journal",
    description:
      "Tiny definitions for technical clothing and material terms that influence buying decisions.",
  },
}

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Glossary</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Material Terms, Clearly
        </h1>
      </header>
      <section className="border-t border-border py-10">
        <div className="grid gap-4 md:grid-cols-2">
          {glossaryEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/glossary/${entry.slug}`}
              className="group border border-border p-5 transition-colors hover:border-accent"
            >
              <p className="persona-badge text-accent">{entry.term}</p>
              <h2 className="mt-2 font-serif text-xl text-foreground">{entry.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{entry.definition}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Read entry
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
