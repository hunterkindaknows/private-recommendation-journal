import { readFile } from "node:fs/promises"
import path from "node:path"

const key = "3949bc9bea5d4b259ba678a1ef0b0327"
const host = "hunterkindaknows.github.io"
const keyLocation =
  "https://hunterkindaknows.github.io/private-recommendation-journal/3949bc9bea5d4b259ba678a1ef0b0327.txt"

function extractUrlsFromSitemap(xml) {
  const urls = []
  const regex = /<loc>(.*?)<\/loc>/g
  let match

  while ((match = regex.exec(xml)) !== null) {
    if (match[1]) urls.push(match[1].trim())
  }

  return Array.from(new Set(urls))
}

async function main() {
  const sitemapPath = path.resolve("out", "sitemap.xml")
  const sitemapXml = await readFile(sitemapPath, "utf8")
  const urlList = extractUrlsFromSitemap(sitemapXml)

  if (urlList.length === 0) {
    console.log("No URLs found in sitemap; skipping IndexNow submission.")
    return
  }

  const payload = {
    host,
    key,
    keyLocation,
    urlList,
  }

  const response = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`IndexNow submit failed: ${response.status} ${body}`)
  }

  console.log(`IndexNow submitted ${urlList.length} URLs successfully.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
