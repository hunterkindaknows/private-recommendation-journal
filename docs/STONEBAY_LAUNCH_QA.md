# Stonebay Launch QA Checklist

This checklist is for each major visual/content release before and after deploy.

## 1) Pre-Deploy Local Checks

- Run `npm run build` locally.
- Confirm no route regressions in:
  - Home
  - Category pages
  - Editorial pages
  - Notes / Topics / Archive
  - Policy pages
- Confirm no CTA links point to `#`.
- Confirm affiliate links still route through `/go/...` where expected.

## 2) Design QA (Stonebay Look)

- Palette is cool and mineral (`slate`, `stone`, `bay blue`) across all pages.
- No blur/haze/glow visual effects.
- Typography hierarchy is clear on desktop and mobile.
- Header and footer branding read `Stonebay`.
- Active nav state is visible.

## 3) Content QA

- Home hero language is unisex (no explicit women-only phrasing).
- Voice remains feminine-forward in tone but inclusive in wording.
- About / Disclosure / Policies use `Stonebay Journal` naming.
- Editorial pages maintain:
  - What matters
  - What ignored
  - Failure modes
  - Fit check
  - FAQ

## 4) SEO QA

- Each major index page has unique `title` + `description` + OG/Twitter fields.
- Editorial pages produce unique metadata from page content.
- Canonicals remain unchanged for current GitHub Pages URL structure.
- `public/sitemap.xml` is valid XML (not plain text list).
- `public/robots.txt` is accessible at the deployed project path.
- Confirm no `_not-found` or utility routes are in sitemap.

## 5) Analytics QA

- `pulse.js` loads on page view.
- `/collect` requests succeed in a browser without blocking extensions.
- Worker health endpoint returns `{ "ok": true }`.
- Report endpoint returns non-zero totals after browsing:
  - `last_hour`
  - `last_day`

## 6) Post-Deploy Checks

- GitHub Actions deploy completed successfully.
- Live homepage loads with no 404 JS chunk errors.
- Browser console has no critical runtime exceptions.
- Favicon displays as the new Stonebay icon.

## 7) Monitoring Window (First 24 Hours)

- Check analytics totals each few hours for event flow.
- Confirm outbound click events are still tracked.
- Re-run URL inspection for key pages if major metadata changed.

