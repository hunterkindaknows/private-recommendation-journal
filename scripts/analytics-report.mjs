const endpoint = process.env.ANALYTICS_REPORT_ENDPOINT
const range = process.env.ANALYTICS_RANGE || "last_day"

if (!endpoint) {
  console.error("Missing ANALYTICS_REPORT_ENDPOINT env var.")
  process.exit(1)
}

const reportUrl = new URL(endpoint)
reportUrl.searchParams.set("range", range)

const res = await fetch(reportUrl)
if (!res.ok) {
  console.error(`Report request failed: ${res.status} ${res.statusText}`)
  process.exit(1)
}

const body = await res.json()
console.log(JSON.stringify(body, null, 2))
