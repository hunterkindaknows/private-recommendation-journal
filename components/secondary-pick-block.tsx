import { ExternalLink } from "lucide-react"
import type { Editorial } from "@/lib/data"

interface SecondaryPickBlockProps {
  pick: NonNullable<Editorial["secondaryPick"]>
}

export function SecondaryPickBlock({ pick }: SecondaryPickBlockProps) {
  const { product, why } = pick

  return (
    <section className="my-8 border-l-2 border-accent bg-secondary/50 p-6 md:p-8">
      <span className="persona-badge text-muted-foreground">
        Contrast Pick
      </span>
      <h4 className="mt-2 font-serif text-lg text-foreground">
        {product.productName}
      </h4>
      <p className="mt-1 text-xs text-muted-foreground">
        by {product.brand} &middot;{" "}
        <span className="font-serif italic">{product.priceBand}</span>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground">{why}</p>
      <a
        href={product.affiliateUrl}
        rel="noopener noreferrer nofollow sponsored"
        className="mt-4 inline-flex items-center gap-2 text-sm text-foreground underline decoration-accent underline-offset-4 editorial-link"
      >
        See details
        <ExternalLink className="h-3 w-3" />
      </a>
    </section>
  )
}
