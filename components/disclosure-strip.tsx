import Link from "next/link"

interface DisclosureStripProps {
  updatedDate?: string
}

export function DisclosureStrip({ updatedDate }: DisclosureStripProps) {
  return (
    <div className="my-12 border-t border-border pt-6">
      <p className="text-xs leading-relaxed text-muted-foreground">
        As an Amazon Associate I earn from qualifying purchases. All editorial
        opinions are our own.{" "}
        <Link
          href="/disclosure"
          className="underline decoration-accent underline-offset-2 editorial-link"
        >
          Full disclosure
        </Link>
      </p>
      {updatedDate && (
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated: {updatedDate}
        </p>
      )}
    </div>
  )
}
