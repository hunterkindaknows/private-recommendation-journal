import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { howToGuides } from "@/lib/data"

export const metadata: Metadata = {
  title: "How-To Guides | Stonebay Journal",
  description:
    "Practical how-to guides for sizing, layering, care, and fit troubleshooting.",
  alternates: { canonical: "/how-to/" },
  openGraph: {
    title: "How-To Guides | Stonebay Journal",
    description:
      "Practical how-to guides for sizing, layering, care, and fit troubleshooting.",
    url: "/how-to/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-To Guides | Stonebay Journal",
    description:
      "Practical how-to guides for sizing, layering, care, and fit troubleshooting.",
  },
}

export default function HowToPage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">How-To</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Practical Steps, Not Guesswork
        </h1>
      </header>
      <section className="border-t border-border py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {howToGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/how-to/${guide.slug}`}
              className="group border border-border p-7 transition-colors hover:border-accent"
            >
              <span className="persona-badge text-accent">{guide.totalTime}</span>
              <h2 className="mt-3 font-serif text-2xl text-foreground">{guide.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{guide.intro}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Open guide
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
