import { promises as fs } from "node:fs"
import path from "node:path"

const outDir = path.resolve("out")
const siteUrl = (process.env.SITE_URL ?? "https://solmere.org").replace(/\/+$/, "")

const excludedPathPrefixes = ["/go/"]
const excludedExactPaths = new Set([
  "/404/",
  "/404",
  "/500/",
  "/500",
  "/_not-found/",
  "/_not-found",
])
const excludedFilePatterns = [/^google[a-z0-9]+\.html$/i]

async function walkHtmlFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkHtmlFiles(fullPath)))
      continue
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath)
    }
  }

  return files
}

function htmlFileToRoute(filePath) {
  const relative = path.relative(outDir, filePath).replace(/\\/g, "/")

  if (relative === "index.html") return "/"
  if (relative.endsWith("/index.html")) {
    return `/${relative.slice(0, -"index.html".length)}`
  }

  return null
}

function shouldIncludeRoute(routePath) {
  if (!routePath) return false
  if (excludedExactPaths.has(routePath)) return false
  if (excludedPathPrefixes.some((prefix) => routePath.startsWith(prefix))) return false
  return true
}

function toUrl(routePath) {
  if (routePath === "/") return `${siteUrl}/`
  const normalized = routePath.endsWith("/") ? routePath : `${routePath}/`
  return `${siteUrl}${normalized}`
}

function toLastModDate(date) {
  return date.toISOString().slice(0, 10)
}

function buildSitemapXml(entries) {
  const items = entries
    .map(
      ({ url, lastmod }) =>
        `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
}

async function main() {
  const htmlFiles = await walkHtmlFiles(outDir)
  const filteredHtmlFiles = htmlFiles.filter((filePath) => {
    const base = path.basename(filePath)
    return !excludedFilePatterns.some((pattern) => pattern.test(base))
  })
  const rawEntries = await Promise.all(
    filteredHtmlFiles.map(async (filePath) => {
      const route = htmlFileToRoute(filePath)
      if (!shouldIncludeRoute(route)) return null
      const stat = await fs.stat(filePath)
      return {
        url: toUrl(route),
        lastmod: toLastModDate(stat.mtime),
      }
    })
  )

  const uniqueByUrl = new Map()
  for (const entry of rawEntries) {
    if (!entry) continue
    const existing = uniqueByUrl.get(entry.url)
    if (!existing || entry.lastmod > existing.lastmod) {
      uniqueByUrl.set(entry.url, entry)
    }
  }

  const finalEntries = Array.from(uniqueByUrl.values()).sort((a, b) =>
    a.url.localeCompare(b.url)
  )

  const xml = buildSitemapXml(finalEntries)
  const outSitemapPath = path.join(outDir, "sitemap.xml")
  const publicSitemapPath = path.resolve("public", "sitemap.xml")
  await fs.writeFile(outSitemapPath, xml, "utf8")
  await fs.writeFile(publicSitemapPath, xml, "utf8")

  console.log(
    `Generated sitemap with ${finalEntries.length} URLs at ${outSitemapPath} and ${publicSitemapPath}`
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
