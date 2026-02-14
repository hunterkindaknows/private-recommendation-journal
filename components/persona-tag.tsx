import Link from "next/link"
import { personas, type PersonaSlug } from "@/lib/data"

interface PersonaTagProps {
  persona: PersonaSlug
  linked?: boolean
}

export function PersonaTag({ persona, linked = true }: PersonaTagProps) {
  const p = personas[persona]

  const badge = (
    <span className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 persona-badge text-muted-foreground transition-colors hover:border-accent hover:text-accent">
      <span
        className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-primary-foreground"
        style={{ fontSize: "0.5rem", lineHeight: 1 }}
      >
        {p.avatarInitial}
      </span>
      {p.name}
    </span>
  )

  if (linked) {
    return (
      <Link href={`/editor/${persona}`} className="editorial-link">
        {badge}
      </Link>
    )
  }

  return badge
}
