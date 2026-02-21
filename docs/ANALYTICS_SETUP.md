# Real-Time Analytics Setup (GitHub Pages + Cloudflare Worker)

This setup gives you session-level, source-aware telemetry without running any server on your machine.

Traffic path:

`Visitor browser -> Cloudflare Worker collector -> Cloudflare D1`

Your home IP/network is never part of that path.

## What was added in this repo

- Site tracker: `public/tracker.js`
- Sitewide loader: `app/layout.tsx`
- Worker collector code: `worker/analytics/src/index.ts`
- D1 schema: `worker/analytics/schema.sql`
- Wrangler config: `worker/analytics/wrangler.toml`
- Quick report script: `scripts/analytics-report.mjs`

## 1) Create Cloudflare D1 database

Run from `worker/analytics`:

```bash
wrangler d1 create penpal-analytics
```

Copy the returned `database_id` into `worker/analytics/wrangler.toml`:

- Replace `REPLACE_WITH_D1_DATABASE_ID`

Apply schema:

```bash
wrangler d1 execute penpal-analytics --file=./schema.sql
```

## 2) Set Worker secrets/vars

Set secret salt (required for IP hashing):

```bash
wrangler secret put IP_HASH_SALT
```

Set allowed site origin (must match your production origin exactly):

```bash
wrangler secret put SITE_ORIGIN
```

Use this value:

`https://hunterkindaknows.github.io`

## 3) Deploy the Worker

From `worker/analytics`:

```bash
wrangler deploy
```

After deploy, note your collector URL, for example:

`https://penpal-analytics-collector.<subdomain>.workers.dev/collect`

## 4) Wire tracker endpoint into GitHub Pages build

In GitHub repo settings:

- `Settings -> Secrets and variables -> Actions -> Variables`
- Add variable: `NEXT_PUBLIC_ANALYTICS_ENDPOINT`
- Value: your Worker `/collect` URL

The workflow already passes this variable into the static build in:

`.github/workflows/deploy-pages.yml`

Then push a commit to trigger redeploy.

## 5) Validate ingestion

Open browser devtools on your site and verify a successful request to:

- `https://...workers.dev/collect`

Worker health endpoint:

- `https://...workers.dev/health`

## 6) Query timeframe reports

Built-in report endpoint:

- `GET https://...workers.dev/report?range=last_hour`
- `GET https://...workers.dev/report?range=last_day`
- `GET https://...workers.dev/report?range=last_30_days`

Local CLI helper:

```bash
ANALYTICS_REPORT_ENDPOINT="https://...workers.dev/report" ANALYTICS_RANGE="last_day" npm run analytics:report
```

## Captured events

- `view`
- `scroll` at 30/60/90%
- `outbound_click`
- `time_on_page`

Stored with:

- path
- referrer host/url
- session id
- timezone
- viewport
- country (from Cloudflare)
- hashed visitor id (`ip_hash`)

Raw IP is not stored.
