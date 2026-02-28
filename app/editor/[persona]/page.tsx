import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { EditorialCard } from "@/components/editorial-card"
import {
  personas,
  getEditorialsByPersona,
  type PersonaSlug,
} from "@/lib/data"

interface Props {
  params: Promise<{ persona: string }>
}

const validSlugs: PersonaSlug[] = [
  "minimalist",
  "performance-analyst",
  "luxury-curator",
  "practicalist",
]

export async function generateStaticParams() {
  return validSlugs.map((p) => ({ persona: p }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona: personaSlug } = await params
  const p = personas[personaSlug as PersonaSlug]
  if (!p) return {}
  const canonicalPath = `/editor/${p.slug}/`
  const description = p.bio.slice(0, 160)
  return {
    title: `${p.name} \u2014 About Me`,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${p.name} — About Me`,
      description,
      url: canonicalPath,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} — About Me`,
      description,
    },
  }
}

export default async function PersonaPage({ params }: Props) {
  const { persona: personaSlug } = await params
  const slug = personaSlug as PersonaSlug

  if (!validSlugs.includes(slug)) {
    notFound()
  }

  const persona = personas[slug]
  const editorialsList = getEditorialsByPersona(slug)

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Back link */}
      <div className="py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Home
        </Link>
      </div>

      {/* Persona header */}
      <header className="pb-12">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-foreground font-serif text-3xl text-primary-foreground">
            {persona.avatarInitial}
          </div>
          <div>
            <span className="persona-badge text-accent">Penpal</span>
            <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">
              {persona.name}
            </h1>
            <p className="mt-1 font-script text-lg text-accent">
              {persona.tagline}
            </p>
          </div>
        </div>
      </header>

      {/* About me */}
      <section className="border-t border-border py-10">
        <h2 className="mb-4 font-serif text-2xl text-foreground">
          About Me
        </h2>
        <p className="text-base leading-relaxed text-foreground">
          {persona.bio}
        </p>
      </section>

      {/* Philosophy */}
      <section className="border-t border-border py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <span className="persona-badge text-accent">I Optimize For</span>
            <p className="mt-2 text-sm leading-relaxed text-foreground">
              {persona.optimizes}
            </p>
          </div>
          <div>
            <span className="persona-badge text-accent">I Avoid</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {persona.avoids}
            </p>
          </div>
          <div>
            <span className="persona-badge text-accent">My Page Vibe</span>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {persona.pageVibe}
            </p>
          </div>
        </div>
      </section>

      {/* Sign off */}
      <section className="border-t border-border py-10">
        <blockquote className="border-l-2 border-accent pl-6">
          <p className="font-script text-2xl text-foreground">
            {persona.signOff}
          </p>
        </blockquote>
      </section>

      {/* Editorials by this persona */}
      {editorialsList.length > 0 && (
        <section className="border-t border-border py-10">
          <h2 className="mb-6 font-serif text-2xl text-foreground">
            My Editorials
          </h2>
          <div className="flex flex-col gap-8">
            {editorialsList.map((editorial) => (
              <EditorialCard
                key={editorial.slug}
                editorial={editorial}
                showCategory
              />
            ))}
          </div>
        </section>
      )}

      {/* See other penpals */}
      <section className="border-t border-border py-10">
        <h3 className="mb-4 font-serif text-xl text-foreground">
          Other Penpals
        </h3>
        <div className="flex flex-wrap gap-3">
          {validSlugs
            .filter((s) => s !== slug)
            .map((s) => {
              const other = personas[s]
              return (
                <Link
                  key={s}
                  href={`/editor/${s}`}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-accent"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-primary-foreground">
                    {other.avatarInitial}
                  </span>
                  {other.name}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )
            })}
        </div>
      </section>
    </div>
  )
}
