import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { fieldNotes } from "@/lib/data"

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Non-product editorials: Galentine notes, practical guides, and point-of-view pieces.",
}

export default function NotesIndexPage() {
  const sorted = [...fieldNotes].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  )

  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Field Notes</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-5xl">
          Guides, Culture, and Practical Notes
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {sorted.length} note{sorted.length !== 1 ? "s" : ""} published.
          Same voice, no product pressure.
        </p>
      </header>

      <section className="border-t border-border py-10">
        <div className="flex flex-col">
          {sorted.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group flex items-start justify-between border-b border-border py-6 transition-colors"
            >
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{note.published}</span>
                  <span className="text-xs text-muted-foreground">/</span>
                  <span className="persona-badge text-accent">{note.category}</span>
                </div>
                <h3 className="font-serif text-lg text-foreground md:text-xl">{note.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{note.excerpt}</p>
              </div>
              <ArrowRight className="ml-4 mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
