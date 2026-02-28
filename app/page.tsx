import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  getFeaturedEditorials,
  getFeaturedFieldNotes,
  getMonthlyPicks,
  personas,
} from "@/lib/data"

export const metadata: Metadata = {
  title: "Decisive Editorial Picks with Cold Clarity | Stonebay Journal",
  description:
    "A unisex editorial journal with one clear recommendation per page, practical disqualifiers, and zero listicle clutter.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Decisive Editorial Picks with Cold Clarity | Stonebay Journal",
    description:
      "A unisex editorial journal with one clear recommendation per page, practical disqualifiers, and zero listicle clutter.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decisive Editorial Picks with Cold Clarity | Stonebay Journal",
    description:
      "A unisex editorial journal with one clear recommendation per page, practical disqualifiers, and zero listicle clutter.",
  },
}

export default function HomePage() {
  const featured = getFeaturedEditorials()
  const notes = getFeaturedFieldNotes().slice(0, 3)
  const monthly = getMonthlyPicks("2026-02")

  const primary = monthly[0] ?? featured[0]
  const contrast = monthly[1] ?? featured[1]
  const contextualReads = featured.filter((item) => item.slug !== primary?.slug).slice(0, 3)

  if (!primary) return null

  const primaryPersona = personas[primary.persona]

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-20 md:py-28">
        <div className="border border-border bg-card px-8 py-10 md:px-12 md:py-14">
          <span className="persona-badge">Stonebay Field Desk</span>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-[1.05] text-foreground md:text-7xl">
            Cold clarity for people who want one strong decision.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Stonebay is an editorial authority site, not a catalog. We publish
            one answer with clear tradeoffs and hard boundaries, so you can
            decide fast and move on.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${primary.category}/${primary.slug}`}
              className="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-sm text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Read today&apos;s decision
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/editorial-philosophy/"
              className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 text-sm text-foreground transition-colors hover:border-primary"
            >
              See the method
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="persona-badge">Primary Recommendation</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {primary.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Written by {primaryPersona.name} · {primary.published}
            </p>
          </div>
          <Link
            href={`/${primary.category}/${primary.slug}`}
            className="hidden items-center gap-1 text-sm text-muted-foreground editorial-link md:inline-flex"
          >
            Open editorial
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="border border-border bg-card p-6 md:col-span-2">
            <h3 className="font-serif text-xl text-foreground">Why this is the one</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{primary.premise}</p>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              If this page does not fit your use case, skip it. That boundary is
              part of the recommendation quality, not a weakness.
            </p>
            <div className="mt-6 border-l-2 border-[#BF3D3D] pl-4">
              <p className="persona-badge">Disqualifier Standard</p>
              <p className="mt-2 text-sm text-[#BF3D3D]">
                If you want broad option lists or trend-first picks, this site will feel too strict.
              </p>
            </div>
          </article>

          {contrast && (
            <article className="border border-border bg-secondary p-6">
              <span className="persona-badge">Contrast Read</span>
              <h3 className="mt-3 font-serif text-lg text-foreground">{contrast.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A secondary philosophy, not a cheaper clone.
              </p>
              <Link
                href={`/${contrast.category}/${contrast.slug}`}
                className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link"
              >
                Read contrast
                <ArrowRight className="h-3 w-3" />
              </Link>
            </article>
          )}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-8">
          <span className="persona-badge">Contextual Reading</span>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Related editorials with adjacent use-cases
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {contextualReads.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.category}/${item.slug}`}
              className="group border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <p className="persona-badge">{item.category}</p>
              <h3 className="mt-3 font-serif text-xl text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.premise.length > 150 ? `${item.premise.slice(0, 150)}...` : item.premise}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Read
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="persona-badge">Field Notes</span>
            <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Utility first. No product pressure.
            </h2>
          </div>
          <Link
            href="/notes/"
            className="hidden items-center gap-1 text-sm text-muted-foreground editorial-link md:inline-flex"
          >
            View all notes
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="group border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <span className="persona-badge">{note.category}</span>
              <h3 className="mt-3 font-serif text-xl text-foreground">{note.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Read note
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
