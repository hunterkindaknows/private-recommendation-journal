import { ExternalLink, Check } from "lucide-react"
import Link from "next/link"
import type { Editorial } from "@/lib/data"

interface PrimaryPickBlockProps {
  pick: Editorial["primaryPick"]
}

export function PrimaryPickBlock({ pick }: PrimaryPickBlockProps) {
  const { product, reasons, bestFor, notFor } = pick
  const isInternalGoLink = product.affiliateUrl.startsWith("/")

  return (
    <section className="my-12 border border-border bg-card p-8 md:p-10">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className="persona-badge text-accent">Primary Pick</span>
          <h3 className="mt-2 font-serif text-2xl text-card-foreground md:text-3xl">
            {product.productName}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            by {product.brand} &middot;{" "}
            <span className="font-serif italic">{product.priceBand}</span>
          </p>
        </div>
      </div>

      {/* Reasons */}
      <ul className="mb-8 flex flex-col gap-3">
        {reasons.map((reason, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-sm leading-relaxed text-card-foreground">
              {reason}
            </span>
          </li>
        ))}
      </ul>

      {/* Best for / Not for */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="border-l-2 border-accent pl-4">
          <span className="persona-badge text-muted-foreground">Best for</span>
          <p className="mt-1 text-sm text-card-foreground">{bestFor}</p>
        </div>
        <div className="border-l-2 border-border pl-4">
          <span className="persona-badge text-muted-foreground">Not for</span>
          <p className="mt-1 text-sm text-muted-foreground">{notFor}</p>
        </div>
      </div>

      {/* CTA */}
      {isInternalGoLink ? (
        <Link
          href={product.affiliateUrl}
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Check price on Amazon
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      ) : (
        <a
          href={product.affiliateUrl}
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Check price on Amazon
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        As an Amazon Associate I earn from qualifying purchases.
      </p>
    </section>
  )
}
