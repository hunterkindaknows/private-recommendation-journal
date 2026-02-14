import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { EditorialCard } from "@/components/editorial-card"
import {
  getAllCategories,
  categoryMeta,
  getEditorialsByCategory,
  type Category,
} from "@/lib/data"

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ category: cat }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const meta = categoryMeta[category as Category]
  if (!meta) return {}
  return {
    title: meta.label,
    description: meta.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = category as Category

  if (!getAllCategories().includes(cat)) {
    notFound()
  }

  const meta = categoryMeta[cat]
  const editorials = getEditorialsByCategory(cat)

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Category header */}
      <section className="py-16 md:py-24">
        <div className="editorial-prose">
          <span className="persona-badge text-accent">Category</span>
          <h1 className="mt-2 font-serif text-5xl font-light text-foreground md:text-6xl">
            {meta.label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Editorials */}
      <section className="border-t border-border py-12">
        <div className="mb-10">
          <span className="persona-badge text-muted-foreground">
            {editorials.length} editorial{editorials.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex flex-col gap-10">
          {editorials.map((editorial) => (
            <EditorialCard key={editorial.slug} editorial={editorial} />
          ))}
        </div>

        {editorials.length === 0 && (
          <p className="py-12 text-center font-serif text-lg italic text-muted-foreground">
            Coming soon. We only publish when we have a recommendation worth
            standing behind.
          </p>
        )}
      </section>
    </div>
  )
}
