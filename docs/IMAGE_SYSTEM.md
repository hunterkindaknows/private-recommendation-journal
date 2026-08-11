# Solmere Journal — Product Image System

## How it works

Every editorial page now has a **collapsed "Images" section** that defaults closed. Most readers won't see it. Googlebot will.

### What Google sees

1. **Page URL** — strongest signal. The image inherits ~80% of its ranking power from the page it lives on.
2. **Image URL path** — `solmere.org/images/belt-no-crack-genuine-leather.webp` tells Google what the image is before reading any metadata.
3. **Alt text** — #1 ranking factor for Google Images. Natural language keyword-rich description.
4. **Title attribute** — reinforces keyword association for semantic analysis.
5. **Figcaption** — Google treats this as "official context" for the image. Affiliate link in caption tells Google the image is purchase-related.
6. **Surrounding text** — Google reads 50-100 words around the image. The editorial content provides rich context.

### HTML Template (bulletproof)

```html
<figure class="product-featured">
  <img 
    src="https://solmere.org/images/belt-no-crack-genuine-leather.webp" 
    alt="Genuine leather belt that doesn't crack after 6 months of daily wear" 
    title="Solmere's top pick for a crack-resistant belt"
    width="800" 
    height="600" 
    loading="lazy" 
    decoding="async" 
    fetchpriority="high">
  <figcaption>
    Our top pick: the only belt that survived our 6-month crack test. 
    <a href="/go/one-belt-no-crack/primary/">Check price on Amazon →</a>
  </figcaption>
</figure>
```

## Adding Images to Products

### Step 1: Get the image URL

Go to the Amazon product page, right-click the main product image → **Copy image address**.

### Step 2: Add to batch file

Edit `scripts/_url_batch.txt` and replace `PASTE_URL_HERE` with the actual image URL:

```
https://m.media-amazon.com/images/I/81xyz...jpg only-black-tee calvin-klein-black-tee
```

### Step 3: Run the scraper

```bash
python scripts/scrape-images.py --batch scripts/_url_batch.txt
```

This downloads each image, converts to WebP, optimizes (max 1200px wide), and saves to `public/images/` with Solmere-branded filenames.

### Step 4: Build and push

```bash
npm run build
git add public/images/ out/images/
git commit -m "Add product images for [slugs]"
git push
```

## Scraper Commands

```bash
# Single ASIN (may be blocked by Amazon)
python scripts/scrape-images.py B085HQD385 only-black-tee calvin-klein-black-tee

# Direct image URL (preferred)
python scripts/scrape-images.py --url "https://m.media-amazon.com/..." only-black-tee calvin-klein-black-tee

# Batch from file
python scripts/scrape-images.py --batch scripts/_url_batch.txt

# Generate TypeScript data snippets
python scripts/scrape-images.py --snippets
```

## File Naming Convention

Images are stored as: `public/images/{editorial-slug}-{brand}-{keyword}.webp`

Examples:
- `only-black-tee-calvin-klein-mens-cotton-classics.webp`
- `one-belt-no-crack-levis-reversible-belt.webp`
- `white-sneaker-women-adidas-grand-court.webp`

## Product Inventory

See `docs/PRODUCT_INVENTORY.md` for the full list of all 19 products and their ASINs.
