# Editorial Master File (Redirect + Product Tuning)

Single-file inventory for editorial CTAs, redirect paths, and destination mapping.

Source of truth:
- Editorials: `lib/data.ts` (`editorials`)
- Redirect map: `lib/data.ts` (`goRedirectTargets`)
- Non-product notes: `lib/data.ts` (`fieldNotes`)

CTA plumbing:
- Primary CTA: `components/primary-pick-block.tsx`
- Secondary CTA: `components/secondary-pick-block.tsx`
- Interstitial redirect page: `app/go/[slug]/[pick]/page.tsx`

## Editorial Inventory (Current)

| Editorial Slug | Title | Category | Persona | Pick Type | Brand | Product | ASIN | CTA Path |
|---|---|---|---|---|---|---|---|---|
| `only-black-tee` | The Black Tee I Don’t Have to Think About | men | minimalist | primary | Calvin Klein | Men's Cotton Classics 3-Pack Undershirts | `B085HQD385` | `/go/only-black-tee/primary/` |
| `only-black-tee` | The Black Tee I Don’t Have to Think About | men | minimalist | secondary | Hanes | Men's Short Sleeve Beefy-T | `B00JUM78PO` | `/go/only-black-tee/secondary/` |
| `one-belt-no-crack` | The Belt Edge That Doesn’t Crumble | men | performance-analyst | primary | Levi's | Men’s 2-in-1 Reversible Belt – Everyday Casual Jean Style | `B01M26TKID` | `/go/one-belt-no-crack/primary/` |
| `socks-for-walking` | The Best Socks If You Actually Walk | men | practicalist | primary | Darn Tough | Vermont Men's Hiker Midweight Micro Crew Sock (Style 1466) | `B000XFW6O0` | `/go/socks-for-walking/primary/` |
| `everyday-chain` | The Everyday Chain That Reads Adult, Not Flashy | women | luxury-curator | primary | DEARMAY | 14K Gold Plated Dainty Herringbone Choker Snake Chain Necklace | `B0B6H8BDJM` | `/go/everyday-chain/primary/` |
| `white-sneaker-women` | The White Sneaker You Can Actually Replace | women | minimalist | primary | adidas | Women's Grand Court 2.0 Tennis Shoe | `B09KMGS7WY` | `/go/white-sneaker-women/primary/` |
| `daily-earrings` | The Daily Hoops You Stop Noticing (in the Good Way) | jewelry | minimalist | primary | PAVOI | 14K Gold Plated Lightweight Chunky Open Hoops for Women | `B0C2DJD7M5` | `/go/daily-earrings/primary/` |
| `maternity-bra-no-compromise` | A Maternity Bra That Doesn’t Feel Like Compromise | maternity | practicalist | primary | Kindred Bravely | French Terry Nursing Bra for Breastfeeding and Sleep, Racerback Crossover | `B0D14GJT7T` | `/go/maternity-bra-no-compromise/primary/` |
| `baby-monitor-worth-it` | The Baby Monitor I’d Pay For Again | baby | performance-analyst | primary | eufy | Security Video Baby Monitor 720P | `B07GBP3GH9` | `/go/baby-monitor-worth-it/primary/` |
| `car-coat-between-seasons-men` | A Car Coat for 38°F to 55°F | men | practicalist | primary | Cole Haan | Men's Button Up Wool Plush Car Coat | `B01LYFL7F4` | `/go/car-coat-between-seasons-men/primary/` |
| `waxed-jacket-transitional-men` | The Waxed Jacket That Handles Bad Weather Without Noise | men | performance-analyst | primary | Huckberry / Flint and Tinder | Men's Flannel-Lined Waxed Trucker Jacket, Water & Weather Resistant | `B0BVN2XZFL` | `/go/waxed-jacket-transitional-men/primary/` |
| `trench-for-between-seasons-women` | A Trench for the In-Between Months | women | luxury-curator | primary | LONDON FOG | Women's Single Breasted Long Trench Coat with Epaulettes and Belt | `B082N4KY9W` | `/go/trench-for-between-seasons-women/primary/` |
| `boots-for-cold-ground-men` | Boots for Cold Pavement Days | men | minimalist | primary | Thursday Boot Company | Captain Men's Lace-up Boot | `B07PP53522` | `/go/boots-for-cold-ground-men/primary/` |

## Field Notes (Non-Product Editorials)

- `galentines-woman-gaze-gift-standard`
- `how-to-find-ring-size-with-string`
- `who-this-is-for-who-this-annoys`
- `first-date-fit-notes-women`
- `what-im-wearing-in-between-weather`

These publish under:
- `/notes`
- `/notes/<slug>`
