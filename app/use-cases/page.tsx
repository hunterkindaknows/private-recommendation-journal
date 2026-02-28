import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useCaseGuides } from "@/lib/data"

export const metadata: Metadata = {
  title: "Use-Case Guides",
  description:
    "Who this is for and who this annoys, organized by real fit and lifestyle use-cases.",
  alternates: { canonical: "/use-cases/" },
}

export default function UseCasesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Use Cases</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Who This Is For, Operationalized
        </h1>
      </header>
      <section className="border-t border-border py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {useCaseGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/use-cases/${guide.slug}`}
              className="group border border-border p-7 transition-colors hover:border-accent"
            >
              <span className="persona-badge text-accent">Use-Case</span>
              <h2 className="mt-3 font-serif text-2xl text-foreground">{guide.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Open checklist
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
