import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { EditorialCard } from "@/components/editorial-card"
import {
  getFeaturedEditorials,
  getMonthlyPicks,
  universalPicks,
  personas,
  type PersonaSlug,
} from "@/lib/data"

export default function HomePage() {
  const featured = getFeaturedEditorials().slice(0, 5)
  const monthly = getMonthlyPicks("2026-02").slice(0, 3)
  const personaSlugs = Object.keys(personas) as PersonaSlug[]

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* ============== HERO ============== */}
      <section className="py-20 md:py-32">
        <div className="editorial-prose">
          <p className="font-script text-lg text-accent">
            A private recommendation journal
          </p>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-foreground md:text-7xl">
            Decisive picks.
            <br />
            <span className="italic">Minimal noise.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            One primary recommendation per page. No endless lists, no
            comparison tables, no sponsored clutter. We publish decisions so
            you can stop second-guessing.
          </p>
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
