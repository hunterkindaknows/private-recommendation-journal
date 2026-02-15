import { promises as fs } from "node:fs"
import path from "node:path"

const outDir = path.resolve("out")
const siteUrl = (process.env.SITE_URL ?? "https://hunterkindaknows.github.io/private-recommendation-journal").replace(/\/+$/, "")

const excludedPathPrefixes = ["/go/"]
const excludedExactPaths = new Set(["/404/", "/404", "/500/", "/500"])

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

  return `/${relative.replace(/\.html$/, "")}`
}

function shouldIncludeRoute(routePath) {
  if (excludedExactPaths.has(routePath)) return false
  if (excludedPathPrefixes.some((prefix) => routePath.startsWith(prefix))) return false
  return true
}

function toUrl(routePath) {
  if (routePath === "/") return `${siteUrl}/`
  const normalized = routePath.endsWith("/") ? routePath : `${routePath}/`
  return `${siteUrl}${normalized}`
}

function buildSitemapXml(urls) {
  const items = urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`
}

async function main() {
  const htmlFiles = await walkHtmlFiles(outDir)
  const routes = htmlFiles
    .map(htmlFileToRoute)
    .filter(shouldIncludeRoute)
  const uniqueSortedUrls = Array.from(new Set(routes.map(toUrl))).sort((a, b) =>
    a.localeCompare(b)
  )

  const xml = buildSitemapXml(uniqueSortedUrls)
  const sitemapPath = path.join(outDir, "sitemap.xml")
  await fs.writeFile(sitemapPath, xml, "utf8")

  console.log(`Generated sitemap with ${uniqueSortedUrls.length} URLs at ${sitemapPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
