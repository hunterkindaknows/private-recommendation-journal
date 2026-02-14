"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { getAllCategories, categoryMeta } from "@/lib/data"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const categories = getAllCategories()

  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo / Site Name */}
        <Link href="/" className="editorial-link">
          <span className="font-serif text-xl tracking-tight text-foreground">
            The&nbsp;
          </span>
          <span className="font-script text-2xl text-accent">Penpal</span>
          <span className="font-serif text-xl tracking-tight text-foreground">
            &nbsp;Edit
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/${cat}`}
                className="persona-badge text-muted-foreground editorial-link hover:text-foreground"
              >
                {categoryMeta[cat].label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/archive"
              className="persona-badge text-muted-foreground editorial-link hover:text-foreground"
            >
              Archive
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-border px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/${cat}`}
                  className="persona-badge text-lg text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {categoryMeta[cat].label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/archive"
                className="persona-badge text-lg text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Archive
              </Link>
            </li>
            <li className="mt-2 border-t border-border pt-4">
              <Link
                href="/about"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/disclosure"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Disclosure
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
