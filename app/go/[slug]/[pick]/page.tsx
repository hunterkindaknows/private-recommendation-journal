import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getGoRedirectTarget, goRedirectTargets, type PickSlot } from "@/lib/data"
import { RedirectClient } from "./redirect-client"

interface Props {
  params: Promise<{ slug: string; pick: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return goRedirectTargets.map((target) => ({
    slug: target.slug,
    pick: target.pick,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, pick } = await params
  const target = getGoRedirectTarget(slug, pick as PickSlot)
  if (!target) return {}

  return {
    title: `Taking you to Amazon: ${target.label}`,
    description: `Redirect page for ${target.label}`,
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function GoRedirectPage({ params }: Props) {
  const { slug, pick } = await params
  const target = getGoRedirectTarget(slug, pick as PickSlot)

  if (!target) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <RedirectClient destinationUrl={target.destinationUrl} />

      <p className="persona-badge text-accent">Redirect</p>
      <h1 className="mt-2 font-serif text-4xl font-light text-foreground">
        Taking you to Amazon...
      </h1>
      <p className="mt-4 text-base text-muted-foreground">{target.label}</p>

      <p className="mt-8 text-sm text-muted-foreground">
        If nothing happens, use the button below.
      </p>

      <p className="mt-4">
        <a
          href={target.destinationUrl}
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Continue to Amazon
        </a>
      </p>

      <p className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground editorial-link hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to site
        </Link>
      </p>
    </div>
  )
}
