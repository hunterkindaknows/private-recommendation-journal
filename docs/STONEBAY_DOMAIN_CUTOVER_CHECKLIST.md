# Stonebay.co Domain Cutover Checklist (Prep Only)

Current state remains on GitHub project path:

- `https://hunterkindaknows.github.io/private-recommendation-journal/`

Do not execute cutover until `stonebay.co` DNS and GitHub Pages custom domain are ready.

## 1) DNS and GitHub Pages

- Add custom domain in repo Pages settings.
- Configure DNS records at registrar for `stonebay.co` and `www.stonebay.co`.
- Wait for certificate provisioning in GitHub Pages.
- Confirm HTTPS is active for both apex and `www`.

## 2) Canonical and Metadata Base Switch

Files to update on cutover day:

- `app/layout.tsx`
  - `metadataBase` -> `https://stonebay.co`
- Any hardcoded absolute URLs in metadata or docs

## 3) Sitemap and Robots Switch

- Build with:
  - `SITE_URL="https://stonebay.co" npm run sitemap:generate`
- Ensure new sitemap URLs are all `https://stonebay.co/...`.
- Update `robots.txt` sitemap line to:
  - `Sitemap: https://stonebay.co/sitemap.xml`

## 4) IndexNow Switch

Set environment values (no script rewrite needed):

- `INDEXNOW_HOST=stonebay.co`
- `INDEXNOW_KEY=<new_or_existing_key>`
- `INDEXNOW_KEY_LOCATION=https://stonebay.co/<key>.txt`

Then run:

- `npm run indexnow:submit`

## 5) Verification Files Migration

Ensure root availability on new domain for:

- Google verification HTML file
- Bing `BingSiteAuth.xml`
- Pinterest verification HTML
- TikTok verification txt
- IndexNow key txt

All must resolve at `https://stonebay.co/<filename>` with `200`.

## 6) Analytics Endpoint and CORS

If site origin changes, update Worker secret:

- `SITE_ORIGIN=https://stonebay.co`

Then redeploy Worker:

- `npx wrangler deploy` from `worker/analytics`

## 7) Search Console / Webmaster Updates

- Add and verify `https://stonebay.co/` property in Google Search Console.
- Add and verify domain in Bing Webmaster Tools.
- Submit fresh sitemap on both platforms.
- Request indexing for homepage + top category + top 3 editorials.

## 8) Redirect Plan

If old GitHub Pages URLs remain publicly indexed, implement redirects from old URL paths to new domain equivalents where possible.

Minimum mapping:

- Homepage
- Category pages
- Editorial slugs
- Notes/topics archive

## 9) Final Cutover Validation

- `https://stonebay.co/robots.txt` returns `200`
- `https://stonebay.co/sitemap.xml` returns valid XML
- Canonical tags point to `stonebay.co`
- OG `url` fields point to `stonebay.co`
- Analytics events still flow after origin switch

