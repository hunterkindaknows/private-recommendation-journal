import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { type Editorial, personas, categoryMeta } from "@/lib/data"

interface EditorialCardProps {
  editorial: Editorial
  showCategory?: boolean
}

export function EditorialCard({
  editorial,
  showCategory = false,
}: EditorialCardProps) {
  const persona = personas[editorial.persona]

  return (
    <article className="group flex flex-col border border-border bg-card p-7 md:p-8">
      {/* Meta row */}
      <div className="mb-3 flex items-center gap-3">
        <span className="persona-badge text-accent">
          {persona.name}
        </span>
        {showCategory && (
          <>
            <span className="text-xs text-muted-foreground">/</span>
            <span className="persona-badge text-muted-foreground">
              {categoryMeta[editorial.category].label}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl leading-snug text-foreground md:text-2xl">
        <Link
          href={`/${editorial.category}/${editorial.slug}`}
          className="editorial-link"
        >
          {editorial.title}
        </Link>
      </h3>

      {/* Premise */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {editorial.premise.length > 180
          ? editorial.premise.slice(0, 180) + "\u2026"
          : editorial.premise}
      </p>

      {/* Read link */}
      <Link
        href={`/${editorial.category}/${editorial.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm text-foreground editorial-link group-hover:gap-3"
        style={{ transition: "gap 0.2s ease" }}
      >
        <span>Read editorial</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </article>
  )
}
