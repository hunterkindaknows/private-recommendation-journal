# solmere.org Setup Guide (Spaceship + GitHub Pages)

This is a first-time checklist to move your site from GitHub project URL to your custom domain.

Target result:

- `https://solmere.org/`
- optional: `https://www.solmere.org/` redirecting to apex

## What I already changed in code

These files are now configured for `solmere.org`:

- `app/layout.tsx` (`metadataBase`)
- `next.config.mjs` (supports root deploy without repo base path)
- `.github/workflows/deploy-pages.yml` (`SITE_URL=https://solmere.org`)
- `public/robots.txt` sitemap URL
- `public/sitemap.xml` host URLs
- `public/CNAME` (set to `solmere.org`)
- `scripts/generate-sitemap-from-out.mjs` default URL
- `scripts/indexnow-submit-from-sitemap.mjs` defaults/env support
- `scripts/accountless-link-seed.mjs` base URL

## Step 1) Push your latest code

From repo root:

```bash
git add app/layout.tsx next.config.mjs .github/workflows/deploy-pages.yml public/robots.txt public/sitemap.xml public/CNAME scripts/generate-sitemap-from-out.mjs scripts/indexnow-submit-from-sitemap.mjs scripts/accountless-link-seed.mjs docs/SOLMERE_DOMAIN_SETUP.md
git commit -m "Prepare custom domain cutover for solmere.org"
git push origin main
```

Wait for Actions deploy to finish.

## Step 2) Set custom domain in GitHub repo

1. Open repo: `hunterkindaknows/private-recommendation-journal`
2. Go to `Settings -> Pages`
3. In `Custom domain`, enter: `solmere.org`
4. Save
5. Enable `Enforce HTTPS` once certificate is issued

Important: certificate issuance can take a few minutes up to about an hour.

## Step 3) Add DNS records in Spaceship

In Spaceship DNS for `solmere.org`, set:

### Apex (`solmere.org`)

Add these `A` records:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### Optional `www`

Add `CNAME`:

- Host: `www`
- Value: `hunterkindaknows.github.io`

TTL: default/automatic is fine.

## Step 4) Wait for DNS propagation

Check:

```bash
nslookup solmere.org
nslookup www.solmere.org
```

Once records resolve correctly, GitHub Pages should start serving the domain.

## Step 5) Verify site and crawl files

Open in browser:

- `https://solmere.org/`
- `https://solmere.org/robots.txt`
- `https://solmere.org/sitemap.xml`
- `https://solmere.org/google9db7027a38c94b95.html`
- `https://solmere.org/BingSiteAuth.xml`
- `https://solmere.org/3949bc9bea5d4b259ba678a1ef0b0327.txt`

All should return `200`.

## Step 6) Update analytics worker CORS origin

Your collector currently checks `SITE_ORIGIN`. Update it to new domain:

```bash
cd worker/analytics
npx wrangler secret put SITE_ORIGIN
```

Enter exactly:

`https://solmere.org`

Then deploy:

```bash
npx wrangler deploy
```

## Step 7) Confirm analytics still works

Browse your site for 1-2 minutes, then run:

```bash
ANALYTICS_REPORT_ENDPOINT="https://penpal-analytics-collector.penpaleditanalytics.workers.dev/report" ANALYTICS_RANGE="last_hour" npm run analytics:report
```

If blockers are enabled, test in a clean browser profile.

## Step 8) Re-submit to search engines

### Google Search Console

- Add property: `https://solmere.org/`
- Submit sitemap: `https://solmere.org/sitemap.xml`
- Request indexing for homepage + top pages

### Bing Webmaster Tools

- Add property: `https://solmere.org/`
- Submit sitemap: `https://solmere.org/sitemap.xml`

## Step 9) IndexNow

If needed, set envs and submit manually:

```bash
INDEXNOW_HOST="solmere.org" \
INDEXNOW_KEY="3949bc9bea5d4b259ba678a1ef0b0327" \
INDEXNOW_KEY_LOCATION="https://solmere.org/3949bc9bea5d4b259ba678a1ef0b0327.txt" \
npm run indexnow:submit
```

## Step 10) Final checks

- No broken internal links
- Canonicals resolve under `solmere.org`
- Pages load without JS chunk 404s
- `robots.txt` and sitemap both valid and reachable

