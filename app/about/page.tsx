import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { personas, type PersonaSlug } from "@/lib/data"

export const metadata: Metadata = {
  title: "About Our Editorial Philosophy",
  description:
    "Stonebay Journal is a premium editorial recommendation publication. One primary pick per page. We publish decisions, not lists.",
  alternates: {
    canonical: "/about/",
  },
}

export default function AboutPage() {
  const personaSlugs = Object.keys(personas) as PersonaSlug[]

  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">About</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          A recommendation journal,
          <br />
          <span className="italic">not a storefront.</span>
        </h1>
      </header>

      <section className="border-t border-border py-10">
        <div className="editorial-prose">
          <p className="text-base leading-relaxed text-foreground md:text-lg">
            Stonebay Journal exists because shopping shouldn{"'"}t feel like
            research. We publish one primary recommendation per editorial
            page, supported by a clear premise, honest rationale, and at most
            one contrast pick. That{"'"}s it.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We don{"'"}t publish {"\""}10 best{"\""}  lists. We don{"'"}t rank products
            we haven{"'"}t evaluated. We don{"'"}t add filler to hit a word count.
            Every editorial page is a decision, and every decision comes from
            one of our four editors with distinct philosophies but
            a shared commitment to constraint.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Our revenue comes from Amazon affiliate commissions. This is
            disclosed clearly on every editorial page and in our footer. We
            never let commissions influence which product we recommend. If we
            can{"'"}t find something worth recommending, we publish nothing.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="mb-2 font-serif text-2xl text-foreground">
          Our Principles
        </h2>
        <ul className="mt-6 flex flex-col gap-6">
          {[
            {
              title: "Authority comes from constraint",
              body: "One primary pick. Max one secondary. 3\u20135 reasons. No exceptions.",
            },
            {
              title: "Decisions, not lists",
              body: "Every page answers a single question decisively. We optimize for clarity, not comprehensiveness.",
            },
            {
              title: "Transparent monetization",
              body: "Amazon affiliate links are disclosed on every page. Our editorial voice is never for sale.",
            },
            {
              title: "Slow publishing",
              body: "We add editorials only when we have a recommendation worth standing behind. No content calendars, no filler.",
            },
          ].map((principle) => (
            <li
              key={principle.title}
              className="border-l-2 border-accent pl-6"
            >
              <h3 className="font-serif text-lg text-foreground">
                {principle.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="mb-6 font-serif text-2xl text-foreground">
          Start Here
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/who-this-is-for/"
            className="group border border-border p-5 transition-colors hover:border-accent"
          >
            <p className="persona-badge text-accent">Reader Fit</p>
            <h3 className="mt-2 font-serif text-xl text-foreground">
              Who This Is For
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn who this editorial model helps most and who should skip it.
            </p>
          </Link>
          <Link
            href="/editorial-philosophy/"
            className="group border border-border p-5 transition-colors hover:border-accent"
          >
            <p className="persona-badge text-accent">Method</p>
            <h3 className="mt-2 font-serif text-xl text-foreground">
              Editorial Philosophy
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See exactly how we choose products and why recommendations stay constrained.
            </p>
          </Link>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="mb-6 font-serif text-2xl text-foreground">
          Meet the Editorial Desk
        </h2>
        <div className="flex flex-col gap-4">
          {personaSlugs.map((slug) => {
            const p = personas[slug]
            return (
              <Link
                key={slug}
                href={`/editor/${slug}`}
                className="group flex items-center justify-between border border-border px-6 py-4 transition-colors hover:border-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-serif text-primary-foreground">
                    {p.avatarInitial}
                  </div>
                  <div>
                    <span className="font-serif text-lg text-foreground">
                      {p.name}
                    </span>
                    <p className="font-script text-sm text-accent">
                      {p.tagline}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
