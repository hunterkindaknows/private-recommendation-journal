# Editorial Master File (Redirect + Product Tuning)

Single-file inventory for editorial CTAs, redirect paths, and destination mapping.

Source of truth:
- Editorials: `lib/data.ts` (`editorials`)
- Redirect map: `lib/data.ts` (`goRedirectTargets`)

CTA plumbing:
- Primary CTA: `components/primary-pick-block.tsx`
- Secondary CTA: `components/secondary-pick-block.tsx`
- Interstitial redirect page: `app/go/[slug]/[pick]/page.tsx`

## Compliance-Oriented Redirect Pattern

- User clicks explicit Amazon CTA on editorial page.
- CTA goes to an on-site redirect path (`/go/<slug>/<pick>/`).
- Interstitial page clearly states destination and product.
- Page then forwards to Amazon; manual fallback link is shown.

## Editorial Inventory

| Editorial Slug | Title | Category | Persona | Pick Type | Brand | Product | ASIN | CTA Path |
|---|---|---|---|---|---|---|---|---|
| `only-black-tee` | The Black Tee I Don’t Have to Think About | men | minimalist | primary | Calvin Klein | Cotton Classics Crew Neck T-Shirt (Black) | `B0C3Q4X7B8` | `/go/only-black-tee/primary/` |
| `only-black-tee` | The Black Tee I Don’t Have to Think About | men | minimalist | secondary | Hanes | Beefy-T Crewneck T-Shirt (Black) | `B09V3R6L2Q` | `/go/only-black-tee/secondary/` |
| `one-belt-no-crack` | The Belt Edge That Doesn’t Crumble | men | performance-analyst | primary | Levi's | Men's Casual Leather Belt | `B08L5Q9R2N` | `/go/one-belt-no-crack/primary/` |
| `socks-for-walking` | The Best Socks If You Actually Walk | men | practicalist | primary | Darn Tough | Micro Crew Light Hiker | `B01N5M6J3G` | `/go/socks-for-walking/primary/` |
| `everyday-chain` | The Everyday Chain That Reads Adult, Not Flashy | women | luxury-curator | primary | Amazon Collection | 14K Gold Box Chain Necklace | `B0B5FW6J7Q` | `/go/everyday-chain/primary/` |
| `white-sneaker-women` | The White Sneaker You Can Actually Replace | women | minimalist | primary | adidas | Stan Smith Sneaker | `B09R4Q8N7T` | `/go/white-sneaker-women/primary/` |
| `daily-earrings` | The Daily Hoops You Stop Noticing (in the Good Way) | jewelry | minimalist | primary | PAVOI | 14K Gold Plated Lightweight Hoop Earrings | `B08F2Y6P4K` | `/go/daily-earrings/primary/` |
| `maternity-bra-no-compromise` | A Maternity Bra That Doesn’t Feel Like Compromise | maternity | practicalist | primary | Kindred Bravely | French Terry Racerback Nursing Bra | `B07MMQKQ1N` | `/go/maternity-bra-no-compromise/primary/` |
| `baby-monitor-worth-it` | The Baby Monitor I’d Pay For Again | baby | performance-analyst | primary | eufy | SpaceView Pro Baby Monitor | `B08FF4GV5C` | `/go/baby-monitor-worth-it/primary/` |

## Redirect Destination Map

These are centralized in `goRedirectTargets` and currently point to Amazon search URLs with your affiliate tag.

- `/go/only-black-tee/primary/` -> Calvin Klein black tee search
- `/go/only-black-tee/secondary/` -> Hanes Beefy-T black tee search
- `/go/one-belt-no-crack/primary/` -> Levi's leather belt search
- `/go/socks-for-walking/primary/` -> Darn Tough Micro Crew Light Hiker search
- `/go/everyday-chain/primary/` -> Amazon Collection 14K chain search
- `/go/white-sneaker-women/primary/` -> adidas Stan Smith women search
- `/go/daily-earrings/primary/` -> PAVOI hoop earrings search
- `/go/maternity-bra-no-compromise/primary/` -> Kindred Bravely nursing bra search
- `/go/baby-monitor-worth-it/primary/` -> eufy SpaceView Pro search

## Editorial Contract Now Enforced in Data

Each editorial now carries:
- `disclosureType`
- `lastReviewedDate`
- `outOfStockFallback`
- `whyThisNotPopular`
- `whoThisIsFor`
- `whoThisWillAnnoy`

Each product now carries:
- `merchant`
- `imageSourceType`
- `pricePolicy`
