import { writeFile } from "node:fs/promises"

const siteBase =
  "https://solmere.org/"

const targets = [
  {
    label: "Homepage",
    url: siteBase,
    note: "Editorial hub and site-level perspective.",
  },
  {
    label: "Who This Is For",
    url: `${siteBase}who-this-is-for/`,
    note: "Reader-fit signal page (non-commercial).",
  },
  {
    label: "Editorial Philosophy",
    url: `${siteBase}editorial-philosophy/`,
    note: "Method and selection standard page (non-commercial).",
  },
  {
    label: "Field Notes Index",
    url: `${siteBase}notes/`,
    note: "Informational note cluster index.",
  },
]

function nowIso() {
  return new Date().toISOString()
}

async function publishTelegraph() {
  const shortName = `solmereedit${Date.now().toString().slice(-5)}`
  const accountResp = await fetch("https://api.telegra.ph/createAccount", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      short_name: shortName,
      author_name: "Solmere Journal",
    }),
  })

  if (!accountResp.ok) {
    throw new Error(`Telegraph createAccount failed: ${accountResp.status}`)
  }

  const accountJson = await accountResp.json()
  if (!accountJson?.ok || !accountJson?.result?.access_token) {
    throw new Error(`Telegraph createAccount invalid response: ${JSON.stringify(accountJson)}`)
  }

  const accessToken = accountJson.result.access_token

  const contentNodes = [
    { tag: "h3", children: ["Solmere Journal: Editorial Perspective Site"] },
    {
      tag: "p",
      children: [
        "This is an independent mention of a women-first editorial recommendation journal focused on constrained, opinionated buying decisions.",
      ],
    },
    ...targets.flatMap((target) => [
      { tag: "p", children: [{ tag: "a", attrs: { href: target.url }, children: [target.label] }] },
      { tag: "p", children: [target.note] },
    ]),
    {
      tag: "p",
      children: [`Published: ${nowIso()}`],
    },
  ]

  const pageResp = await fetch("https://api.telegra.ph/createPage", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      access_token: accessToken,
      title: "Solmere Journal — Reference Links",
      author_name: "Solmere Journal",
      return_content: "false",
      content: JSON.stringify(contentNodes),
    }),
  })

  if (!pageResp.ok) {
    throw new Error(`Telegraph createPage failed: ${pageResp.status}`)
  }

  const pageJson = await pageResp.json()
  if (!pageJson?.ok || !pageJson?.result?.url) {
    throw new Error(`Telegraph createPage invalid response: ${JSON.stringify(pageJson)}`)
  }

  return pageJson.result.url
}

async function publishPasteRs() {
  const body = [
    "Solmere Journal — independent link references",
    `Published: ${nowIso()}`,
    "",
    ...targets.map((target) => `- ${target.label}: ${target.url}`),
  ].join("\n")

  const resp = await fetch("https://paste.rs", {
    method: "POST",
    headers: { "content-type": "text/plain; charset=utf-8" },
    body,
  })

  if (!resp.ok) {
    throw new Error(`paste.rs failed: ${resp.status}`)
  }

  const url = (await resp.text()).trim()
  if (!url.startsWith("http")) {
    throw new Error(`paste.rs returned unexpected response: ${url}`)
  }

  return url
}

async function main() {
  const results = []

  try {
    const telegraphUrl = await publishTelegraph()
    results.push({ platform: "Telegraph", status: "ok", url: telegraphUrl })
  } catch (error) {
    results.push({ platform: "Telegraph", status: "error", error: String(error) })
  }

  try {
    const pasteUrl = await publishPasteRs()
    results.push({ platform: "paste.rs", status: "ok", url: pasteUrl })
  } catch (error) {
    results.push({ platform: "paste.rs", status: "error", error: String(error) })
  }

  const report = [
    "# Accountless Link Seed Results",
    "",
    `Generated: ${nowIso()}`,
    "",
    "## Targets",
    ...targets.map((t) => `- ${t.label}: ${t.url}`),
    "",
    "## Publishing Results",
    ...results.map((r) =>
      r.status === "ok"
        ? `- ${r.platform}: ${r.url}`
        : `- ${r.platform}: ERROR -> ${r.error}`
    ),
    "",
    "## Next Steps",
    "- Submit successful external URLs in Google Search Console URL Inspection.",
    "- Submit successful external URLs in Bing Webmaster URL Inspection.",
    "- Re-run this script only when you add meaningful new content (avoid spammy frequency).",
  ].join("\n")

  await writeFile("docs/LINK_SEED_RESULTS.md", report, "utf8")

  // eslint-disable-next-line no-console
  console.log(report)
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
