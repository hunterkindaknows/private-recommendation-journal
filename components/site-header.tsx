"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { getAllCategories, categoryMeta } from "@/lib/data"

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const categories = getAllCategories()
  const pathname = usePathname()

  const navClass = (active: boolean) =>
    [
      "persona-badge editorial-link",
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
    ].join(" ")

  return (
    <header className="border-b border-border bg-card/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        {/* Logo / Site Name */}
        <Link href="/" className="editorial-link flex flex-col leading-none">
          <span className="font-serif text-2xl tracking-tight text-foreground">Stonebay</span>
          <span className="persona-badge mt-1 text-muted-foreground">Editorial Journal</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={`/${cat}`}
                className={navClass(pathname === `/${cat}` || pathname.startsWith(`/${cat}/`))}
              >
                {categoryMeta[cat].label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/topics"
              className={navClass(pathname === "/topics" || pathname.startsWith("/topics/"))}
            >
              Topics
            </Link>
          </li>
          <li>
            <Link
              href="/notes"
              className={navClass(pathname === "/notes" || pathname.startsWith("/notes/"))}
            >
              Notes
            </Link>
          </li>
          <li>
            <Link
              href="/archive"
              className={navClass(pathname === "/archive")}
            >
              Archive
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="rounded-sm border border-border p-1 md:hidden"
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
        <div className="border-t border-border bg-card px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/${cat}`}
                  className={
                    pathname === `/${cat}` || pathname.startsWith(`/${cat}/`)
                      ? "persona-badge text-lg text-foreground"
                      : "persona-badge text-lg text-muted-foreground"
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {categoryMeta[cat].label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/topics"
                className={
                  pathname === "/topics" || pathname.startsWith("/topics/")
                    ? "persona-badge text-lg text-foreground"
                    : "persona-badge text-lg text-muted-foreground"
                }
                onClick={() => setMobileOpen(false)}
              >
                Topics
              </Link>
            </li>
            <li>
              <Link
                href="/notes"
                className={
                  pathname === "/notes" || pathname.startsWith("/notes/")
                    ? "persona-badge text-lg text-foreground"
                    : "persona-badge text-lg text-muted-foreground"
                }
                onClick={() => setMobileOpen(false)}
              >
                Notes
              </Link>
            </li>
            <li>
              <Link
                href="/archive"
                className={
                  pathname === "/archive"
                    ? "persona-badge text-lg text-foreground"
                    : "persona-badge text-lg text-muted-foreground"
                }
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
                href="/who-this-is-for"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Who This Is For
              </Link>
            </li>
            <li>
              <Link
                href="/editorial-philosophy"
                className="text-sm text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Editorial Philosophy
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
