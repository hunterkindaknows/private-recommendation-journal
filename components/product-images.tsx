"use client"

import { useState } from "react"
import { Image, ChevronDown } from "lucide-react"
import Link from "next/link"

export interface ProductImage {
  /** Path relative to public/, e.g. "/images/only-black-tee-calvin-klein.webp" */
  src: string
  /** Descriptive alt text — include primary keyword naturally */
  alt: string
  /** Tooltip / title attribute */
  title?: string
  /** Image width hint (defaults to 800) */
  width?: number
  /** Image height hint (defaults to 600) */
  height?: number
  /** Brief caption — include affiliate link if relevant */
  caption?: string
  /** Affiliate link for caption CTA */
  affiliateUrl?: string
}

interface ProductImagesProps {
  /** Primary pick images */
  primaryImages: ProductImage[]
  /** Optional contrast/alt pick images */
  secondaryImages?: ProductImage[]
  /** Product name for labeling */
  primaryLabel?: string
  secondaryLabel?: string
}

export function ProductImages({
  primaryImages,
  secondaryImages,
  primaryLabel = "Product Images",
  secondaryLabel = "Contrast Pick Images",
}: ProductImagesProps) {
  const [activeTab, setActiveTab] = useState<"primary" | "secondary">("primary")

  const hasPrimary = primaryImages.length > 0
  const hasSecondary = (secondaryImages ?? []).length > 0

  if (!hasPrimary && !hasSecondary) return null

  const currentImages = activeTab === "primary" ? primaryImages : (secondaryImages ?? [])

  return (
    <section className="border-t border-border py-8">
      <details className="group">
        <summary className="flex cursor-pointer items-center gap-2 font-serif text-lg text-foreground">
          <Image className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>Images</span>
          <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>

        <div className="mt-6">
          {/* Tab bar — only show if both tabs have content */}
          {hasPrimary && hasSecondary && (
            <div className="mb-6 flex border-b border-border">
              <button
                onClick={() => setActiveTab("primary")}
                className={
                  "px-4 pb-3 pt-1 text-sm transition-colors " +
                  (activeTab === "primary"
                    ? "border-b-2 border-accent font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {primaryLabel}
              </button>
              <button
                onClick={() => setActiveTab("secondary")}
                className={
                  "px-4 pb-3 pt-1 text-sm transition-colors " +
                  (activeTab === "secondary"
                    ? "border-b-2 border-accent font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {secondaryLabel}
              </button>
            </div>
          )}

          {/* Image grid */}
          <div className="grid gap-8">
            {currentImages.map((img, i) => (
              <figure key={i} className="product-featured">
                <img
                  src={img.src}
                  alt={img.alt}
                  title={img.title ?? img.alt}
                  width={img.width ?? 800}
                  height={img.height ?? 600}
                  loading="lazy"
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="h-auto w-full border border-border object-cover"
                />
                {img.caption && (
                  <figcaption className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {img.caption}
                    {img.affiliateUrl && (
                      <>
                        {" "}
                        <Link
                          href={img.affiliateUrl}
                          className="underline decoration-accent underline-offset-2 hover:text-foreground"
                          rel="noopener noreferrer nofollow sponsored"
                        >
                          Check price on Amazon →
                        </Link>
                      </>
                    )}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </details>
    </section>
  )
}
