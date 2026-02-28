import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EditorialCard } from "@/components/editorial-card"
import {
  getFeaturedEditorials,
  getFeaturedFieldNotes,
  getMonthlyPicks,
  universalPicks,
  personas,
  type PersonaSlug,
} from "@/lib/data"

export const metadata: Metadata = {
  title: "Decisive Editorial Picks for Women | Stonebay Journal",
  description:
    "A women-first editorial journal with one clear recommendation per page, practical disqualifiers, and zero listicle clutter.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Decisive Editorial Picks for Women | Stonebay Journal",
    description:
      "A women-first editorial journal with one clear recommendation per page, practical disqualifiers, and zero listicle clutter.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decisive Editorial Picks for Women | Stonebay Journal",
    description:
      "A women-first editorial journal with one clear recommendation per page, practical disqualifiers, and zero listicle clutter.",
  },
}

export default function HomePage() {
  const featured = getFeaturedEditorials().slice(0, 5)
  const monthly = getMonthlyPicks("2026-02").slice(0, 3)
  const notes = getFeaturedFieldNotes().slice(0, 3)
  const personaSlugs = Object.keys(personas) as PersonaSlug[]
  const primaryCta = monthly[0] ?? featured[0]

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-20 md:py-28">
        <div className="border border-border bg-card p-8 md:p-12">
          <span className="persona-badge text-accent">Stonebay Field Desk</span>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-light leading-[1.05] text-foreground md:text-7xl">
            Cold clarity for women who want one strong decision.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We publish recommendation pages with tight filters, explicit tradeoffs,
            and a clear point of view. No catalog sprawl. No trend fog.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && (
              <Link
                href={`/${primaryCta.category}/${primaryCta.slug}`}
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm text-primary-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Read this week&apos;s pick
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 text-sm text-foreground transition-colors hover:border-accent"
            >
              Why this exists
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 text-sm text-foreground transition-colors hover:border-accent"
            >
              Browse past picks
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Orientation</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            How to use Stonebay fast
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="border border-border bg-card p-6">
            <h3 className="font-serif text-xl text-foreground">1. Start with your friction</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose category for direct decisions, or notes for practical guidance
              when you are not ready to buy.
            </p>
          </article>
          <article className="border border-border bg-card p-6">
            <h3 className="font-serif text-xl text-foreground">2. Read the disqualifier</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every page states who the pick is for and who should skip it. That
              is where indecision disappears.
            </p>
          </article>
          <article className="border border-border bg-card p-6">
            <h3 className="font-serif text-xl text-foreground">3. Take one next step</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Buy now, save for later, or jump to supporting notes. Each page is
              built to move you forward.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="persona-badge text-accent">Monthly Desk</span>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              February 2026 picks
            </h2>
          </div>
          <Link
            href="/archive"
            className="hidden items-center gap-1 text-sm text-muted-foreground editorial-link md:inline-flex"
          >
            View archive
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {monthly.map((editorial) => (
            <EditorialCard key={editorial.slug} editorial={editorial} showCategory />
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Core Reads</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Editorials we can defend line by line
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {featured.map((editorial) => (
            <EditorialCard key={editorial.slug} editorial={editorial} showCategory />
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="persona-badge text-accent">Field Notes</span>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Utility notes and buyer clarity
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Practical guidance with the same editorial filter as product pages.
            </p>
          </div>
          <Link
            href="/notes"
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
              className="group border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <span className="persona-badge text-accent">{note.category}</span>
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

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Always Valid</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">Universal picks</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Stable defaults we revisit often and change rarely.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {universalPicks.map((pick) => (
            <Link
              key={pick.slug}
              href={`/${pick.category}/${pick.slug}`}
              className="group flex items-start justify-between border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <div>
                <h3 className="font-serif text-lg text-foreground">{pick.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pick.oneLiner}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Editorial Desk</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Four editors, distinct filters
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {personaSlugs.map((slug) => {
            const p = personas[slug]
            return (
              <Link
                key={slug}
                href={`/editor/${slug}`}
                className="group border border-border bg-card p-8 transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary font-serif text-lg text-foreground">
                    {p.avatarInitial}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">{p.name}</h3>
                    <p className="persona-badge mt-1 text-muted-foreground">{p.tagline}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.bio.slice(0, 150)}...
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                  Read editor profile
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
