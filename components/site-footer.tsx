import Link from "next/link"
import { personas, type PersonaSlug } from "@/lib/data"

export function SiteFooter() {
  const personaSlugs = Object.keys(personas) as PersonaSlug[]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="editorial-link">
              <span className="font-serif text-lg text-foreground">
                The&nbsp;
              </span>
              <span className="font-script text-xl text-accent">Penpal</span>
              <span className="font-serif text-lg text-foreground">
                &nbsp;Edit
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Decisive picks. Minimal noise.
              <br />A private recommendation journal.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="persona-badge mb-4 text-foreground">Categories</h4>
            <ul className="flex flex-col gap-2">
              {["men", "women", "jewelry", "maternity", "baby"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/${cat}`}
                    className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Penpals */}
          <div>
            <h4 className="persona-badge mb-4 text-foreground">Our Penpals</h4>
            <ul className="flex flex-col gap-2">
              {personaSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/editor/${slug}`}
                    className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                  >
                    {personas[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="persona-badge mb-4 text-foreground">Info</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/archive"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Archive
                </Link>
              </li>
              <li>
                <Link
                  href="/comparisons"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Comparisons
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  How-To
                </Link>
              </li>
              <li>
                <Link
                  href="/glossary"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Glossary
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/disclosure"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/privacy-policy"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/terms-of-service"
                  className="text-sm text-muted-foreground editorial-link hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom disclosure */}
        <div className="mt-16 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            As an Amazon Associate I earn from qualifying purchases. All
            editorial opinions are our own. We only recommend products we have
            independently evaluated and genuinely stand behind.
          </p>
        </div>
      </div>
    </footer>
  )
}
