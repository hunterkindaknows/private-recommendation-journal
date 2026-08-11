"use client"

import { useState, useCallback, useEffect } from "react"
import { Image, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

export interface ProductImage {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  caption?: string
  affiliateUrl?: string
}

interface ProductImagesProps {
  primaryImages: ProductImage[]
  secondaryImages?: ProductImage[]
  primaryLabel?: string
  secondaryLabel?: string
}

function ImageCarousel({ images }: { images: ProductImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  if (images.length === 0) return null

  const current = images[selectedIndex]

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden border border-border bg-[#fafaf5]">
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <figure className="product-featured flex items-center justify-center" style={{ maxHeight: 520 }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  title={img.title ?? img.alt}
                  width={img.width ?? 800}
                  height={img.height ?? 600}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="h-auto max-h-[520px] w-full object-contain"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons — visible on hover */}
      <button
        onClick={scrollPrev}
        className={
          "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground shadow-sm backdrop-blur transition-opacity " +
          (isHovered ? "opacity-100" : "opacity-0")
        }
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className={
          "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-1.5 text-foreground shadow-sm backdrop-blur transition-opacity " +
          (isHovered ? "opacity-100" : "opacity-0")
        }
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators — always visible */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={
              "h-2 rounded-full transition-all " +
              (i === selectedIndex
                ? "w-5 bg-accent"
                : "w-2 bg-border hover:bg-muted-foreground")
            }
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Caption for current image */}
      {current.caption && (
        <figcaption className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
          {current.caption}
          {current.affiliateUrl && (
            <>
              {" "}
              <Link
                href={current.affiliateUrl}
                className="underline decoration-accent underline-offset-2 hover:text-foreground"
                rel="noopener noreferrer nofollow sponsored"
              >
                Check price on Amazon →
              </Link>
            </>
          )}
        </figcaption>
      )}
    </div>
  )
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
          {/* Tab bar */}
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

          <ImageCarousel images={currentImages} />
        </div>
      </details>
    </section>
  )
}
