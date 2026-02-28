import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { topicClusters } from "@/lib/data"

export const metadata: Metadata = {
  title: "Topic Clusters and Buying Guides",
  description:
    "Explore topical authority clusters that connect product editorials with practical supporting notes.",
  alternates: {
    canonical: "/topics/",
  },
}

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Topics</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-6xl">
          Editorial Clusters
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          This is how we organize depth: each cluster links product editorials
          with practical notes so pages are not isolated.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/comparisons" className="border border-border px-4 py-2 text-sm text-foreground hover:border-accent">
            Comparisons
          </Link>
          <Link href="/how-to" className="border border-border px-4 py-2 text-sm text-foreground hover:border-accent">
            How-To
          </Link>
          <Link href="/glossary" className="border border-border px-4 py-2 text-sm text-foreground hover:border-accent">
            Glossary
          </Link>
          <Link href="/use-cases" className="border border-border px-4 py-2 text-sm text-foreground hover:border-accent">
            Use Cases
          </Link>
        </div>
      </header>

      <section className="border-t border-border py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {topicClusters.map((cluster) => (
            <Link
              key={cluster.slug}
              href={`/topics/${cluster.slug}`}
              className="group border border-border p-7 transition-colors hover:border-accent"
            >
              <span className="persona-badge text-accent">Cluster</span>
              <h2 className="mt-3 font-serif text-2xl text-foreground">{cluster.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {cluster.description}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {cluster.editorialSlugs.length} editorials · {cluster.noteSlugs.length} notes
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground editorial-link">
                Explore cluster
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
