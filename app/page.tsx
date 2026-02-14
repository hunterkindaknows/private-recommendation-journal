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

export default function HomePage() {
  const featured = getFeaturedEditorials().slice(0, 5)
  const monthly = getMonthlyPicks("2026-02").slice(0, 3)
  const notes = getFeaturedFieldNotes().slice(0, 3)
  const personaSlugs = Object.keys(personas) as PersonaSlug[]
  const primaryCta = monthly[0] ?? featured[0]

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* ============== HERO ============== */}
      <section className="py-20 md:py-32">
        <div className="editorial-prose">
          <p className="font-script text-lg text-accent">
            A private recommendation journal
          </p>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-foreground md:text-7xl">
            We choose the one worth buying.
            <br />
            <span className="italic">You skip the overwhelm.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            This site is for women who want clear recommendations with a point
            of view. One primary pick per page, practical disqualifiers, and
            zero catalog noise.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCta && (
              <Link
                href={`/${primaryCta.category}/${primaryCta.slug}`}
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                Read this week's pick
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-accent"
            >
              Learn our philosophy
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm text-foreground transition-colors hover:border-accent"
            >
              See last month&apos;s picks
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== HOW TO USE THIS SITE ============== */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">How It Works</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Fast orientation, then action
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="border border-border p-6">
            <h3 className="font-serif text-xl text-foreground">1. Pick a lane</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with category, archive, or notes depending on whether you
              want a product decision or guidance.
            </p>
          </article>
          <article className="border border-border p-6">
            <h3 className="font-serif text-xl text-foreground">2. Read the filter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every editorial states who the recommendation is for and who it
              will annoy. That is the decision shortcut.
            </p>
          </article>
          <article className="border border-border p-6">
            <h3 className="font-serif text-xl text-foreground">3. Take the next step</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Buy the pick, save it for later, or move to a supporting note.
              Every page should move you forward.
            </p>
          </article>
        </div>
      </section>

      {/* ============== MONTHLY FIELD NOTES ============== */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="persona-badge text-accent">Field Notes</span>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              February 2026 Picks
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
            <EditorialCard
              key={editorial.slug}
              editorial={editorial}
              showCategory
            />
          ))}
        </div>
      </section>

      {/* ============== FEATURED EDITORIALS ============== */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Featured</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Editorials We Stand Behind
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {featured.map((editorial) => (
            <EditorialCard
              key={editorial.slug}
              editorial={editorial}
              showCategory
            />
          ))}
        </div>
      </section>

      {/* ============== FIELD NOTES ============== */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="persona-badge text-accent">Field Notes</span>
            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Galentine and Practical Notes
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Women-first perspective, practical clarity, no performative fluff.
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
              className="group border border-border p-6 transition-colors hover:border-accent"
            >
              <span className="persona-badge text-accent">{note.category}</span>
              <h3 className="mt-3 font-serif text-xl text-foreground">
                {note.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {note.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Read note
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============== UNIVERSAL PICKS ============== */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Always Valid</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Universal Picks
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Our default recommendations. Rarely changed.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {universalPicks.map((pick) => (
            <Link
              key={pick.slug}
              href={`/${pick.category}/${pick.slug}`}
              className="group flex items-start justify-between border border-border p-6 transition-colors hover:border-accent"
            >
              <div>
                <h3 className="font-serif text-lg text-foreground">
                  {pick.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pick.oneLiner}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      </section>

      {/* ============== MEET THE PENPALS ============== */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mb-10">
          <span className="persona-badge text-accent">Our Voices</span>
          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Meet the Penpals
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Four editors, four philosophies. Same commitment to one great pick.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {personaSlugs.map((slug) => {
            const p = personas[slug]
            return (
              <Link
                key={slug}
                href={`/editor/${slug}`}
                className="group border border-border p-8 transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground font-serif text-lg text-primary-foreground">
                    {p.avatarInitial}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-foreground">
                      {p.name}
                    </h3>
                    <p className="font-script text-sm text-accent">
                      {p.tagline}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.bio.slice(0, 150)}...
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                  <span className="font-serif italic">Read about me</span>
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
