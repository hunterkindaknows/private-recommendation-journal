import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Editorial Philosophy",
  description:
    "How Solmere Journal chooses products, why recommendations are constrained, and the standards behind every published page.",
  alternates: {
    canonical: "/editorial-philosophy/",
  },
  openGraph: {
    title: "Editorial Philosophy — Solmere Journal",
    description:
      "How Solmere Journal chooses products, why recommendations are constrained, and the standards behind every published page.",
    url: "/editorial-philosophy/",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Philosophy — Solmere Journal",
    description:
      "How Solmere Journal chooses products, why recommendations are constrained, and the standards behind every published page.",
  },
}

export default function EditorialPhilosophyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Method</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Editorial Philosophy
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Our goal is not comprehensive shopping coverage. Our goal is
          decision-quality: fewer pages, sharper claims, and clear boundaries.
        </p>
      </header>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">Why We Limit Recommendations</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Most buying content fails because it confuses volume with value.
            Publishing ten options may look useful, but it often transfers the
            work back to the reader. We do the opposite. We absorb comparison
            effort, then publish one primary recommendation and one contrast
            pick only when it meaningfully changes the decision.
          </p>
          <p>
            Constraint is not minimalism for aesthetics. It is an editorial
            reliability mechanism. If we cannot justify a clear winner under
            realistic use, we do not publish.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">How Products Are Chosen</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Each recommendation is evaluated against practical criteria:
            durability under repeat use, material behavior over time, fit
            stability, replacement reliability, and failure modes in ordinary
            life. We explicitly note what we ignored so readers understand the
            tradeoffs.
          </p>
          <p>
            We also require a clear disqualifier. Every page states who the
            recommendation is for and who it will annoy. That is not rhetorical
            style; it is part of our selection standard.
          </p>
          <p>
            When Amazon availability is inconsistent or quality is ambiguous, we
            either choose a more stable option or postpone publication. We do
            not force a recommendation to keep cadence.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">Editorial Independence and Revenue</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            We disclose affiliate relationships on-page and in site-level
            disclosure. Commission potential does not determine the winner. In
            practice this means we sometimes recommend lower-ticket items if the
            long-term use case is better.
          </p>
          <p>
            We publish non-monetized notes and methodological pages because this
            site is not built as an offer wall. It is built as an editorial
            perspective. Products are one output of that perspective, not the
            entire purpose.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">If You Want The Short Version</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            We publish slower. We recommend less. We explain more. And we state
            boundaries directly so readers can decide quickly with confidence.
          </p>
          <p>
            If that matches your decision style, start with{" "}
            <Link href="/who-this-is-for/" className="gold-underline text-foreground">
              Who This Is For
            </Link>{" "}
            and then move to category pages.
          </p>
        </div>
      </section>
    </div>
  )
}
