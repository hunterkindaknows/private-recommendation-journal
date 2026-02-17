import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Who This Is For",
  description:
    "Who The Penpal Edit is for, who it is not for, and how to decide if this editorial style matches your buying behavior.",
  alternates: {
    canonical: "/who-this-is-for/",
  },
}

export default function WhoThisIsForPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Reader Fit</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Who This Is For
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          This site is intentionally narrow. It is built for readers who want
          a fast, opinionated recommendation instead of an endless comparison
          process.
        </p>
      </header>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">This Is For You If...</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            You are tired of opening twelve tabs to buy one thing. You do not
            need every option; you need one decision that is defended with
            clear reasoning. You value somebody saying, "Buy this," and telling
            you exactly why.
          </p>
          <p>
            You prefer perspective over aggregation. You are less interested in
            feature inflation and more interested in whether a product holds up
            in ordinary life: repeat wear, laundry cycles, comfort under stress,
            practical replacement, and friction in daily routines.
          </p>
          <p>
            You appreciate disqualifiers. If a recommendation is not for your
            use case, you want that stated directly. You do not interpret that
            as negativity; you interpret it as respect for your time.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">This Is Not For You If...</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            You want "Top 50" style pages with broad price ladders and dozens
            of alternates. We do not publish that format because it often
            creates analysis paralysis instead of clarity.
          </p>
          <p>
            You want trend-first shopping. Our editorial voice is built for
            utility, durability, and intent. If your primary goal is novelty,
            this will feel too strict.
          </p>
          <p>
            You want universal recommendations that claim to work for everyone.
            We reject that premise. A trustworthy recommendation always has a
            boundary. If there are no boundaries, there is no real point of
            view.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <h2 className="font-serif text-2xl text-foreground">How To Use This Site Well</h2>
        <div className="mt-5 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Start with one category page and read the Fit Check block first.
            Confirm whether you are the right reader for that recommendation.
            Then read the material/build notes and failure modes. If those match
            your priorities, the buying decision should take minutes, not days.
          </p>
          <p>
            If you are new, read{" "}
            <Link href="/editorial-philosophy/" className="gold-underline text-foreground">
              Editorial Philosophy
            </Link>{" "}
            next. It explains why we limit picks and how recommendations are
            chosen. If that method fits how you make decisions, this site will
            save you substantial time.
          </p>
        </div>
      </section>
    </div>
  )
}
