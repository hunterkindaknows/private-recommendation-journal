#!/usr/bin/env python3
"""
Amazon Product Image Scraper for Solmere Journal
=================================================
Scrapes full-resolution product images from Amazon product pages.
Uses async HTTP, rotating user agents, gallery JSON parsing, and
size-parameter stripping to get the highest quality images.

Usage:
    python scripts/scrape-images.py B085HQD385 only-black-tee calvin-klein-black-tee
    python scripts/scrape-images.py --batch asin-list.txt
    python scripts/scrape-images.py --snippets
"""

from __future__ import annotations

import argparse
import asyncio
import json
import random
import re
import sys
import time
from pathlib import Path
from typing import Any
from urllib.parse import urlencode

import aiohttp
from PIL import Image

# ── Constants ──────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_ROOT / "public" / "images"
WEBP_QUALITY = 85
MAX_IMAGE_WIDTH = 1500
MAX_CONCURRENT = 2
DELAY_SECONDS = 2.5

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0",
    "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.135 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15",
]

# ── Image URL manipulation ─────────────────────────────────────────────

def strip_amazon_size(url: str) -> str:
    """Strip Amazon's size parameter to get the full-resolution original."""
    # Remove ._AC_SX342_, ._SL1500_, ._SS40_, etc.
    return re.sub(r"\._[A-Z]{2}\d+_\.", ".", url)


def amazon_image_base(url: str) -> str | None:
    """Extract the base image ID from any Amazon image URL."""
    m = re.search(r"images/I/([A-Za-z0-9.]+)", url)
    if not m:
        return None
    base_id = m.group(1).split(".")[0]
    # Find the file extension
    ext = "jpg"
    for fmt in [".jpg", ".jpeg", ".png", ".webp"]:
        if fmt in url.lower():
            ext = fmt.lstrip(".")
            break
    return f"https://m.media-amazon.com/images/I/{base_id}.{ext}"


def amazon_image_with_size(url: str, width: int = 1500) -> str:
    """Force an Amazon image to a specific width."""
    base = amazon_image_base(url)
    if not base:
        return url
    base_id = re.search(r"images/I/([A-Za-z0-9]+)", base).group(1)
    ext = base.rsplit(".", 1)[-1]
    return f"https://m.media-amazon.com/images/I/{base_id}._AC_SX{width}_.{ext}"


# ── HTML parsing ───────────────────────────────────────────────────────

def extract_images_from_gallery_json(html: str) -> list[str]:
    """Parse the 'colorImages' JSON from Amazon's page scripts."""
    images: list[str] = []
    # Find script blocks containing colorImages
    for script_match in re.finditer(
        r'<script[^>]*>\s*(.*?)\s*</script>', html, re.DOTALL
    ):
        text = script_match.group(1)
        if "colorImages" not in text:
            continue
        # Extract hiRes URLs (priority) then large URLs
        hires = re.findall(r"'hiRes':\s*'([^']+)'", text)
        if hires:
            images.extend(hires)
        else:
            large = re.findall(r"'large':\s*'([^']+)'", text)
            images.extend(large)
    return images


def extract_product_data(html: str) -> dict[str, Any]:
    """Extract all image URLs + title from a product page."""
    result: dict[str, Any] = {
        "main": None,
        "main_hires": None,
        "gallery": [],
        "title": None,
        "all": [],
    }

    # ── Gallery JSON (most reliable, highest quality) ──
    gallery = extract_images_from_gallery_json(html)
    if gallery:
        result["gallery"] = gallery
        result["main"] = gallery[0]

    # ── Main image from HTML ──
    for pattern in [
        r'data-old-hires="([^"]+)"',
        r'"landingImage":\s*\{\s*"src":\s*"([^"]+)"',
        r'"hiRes":\s*"([^"]+)"',
        r'id="landingImage"[^>]*src="([^"]+)"',
        r'id="imgBlkFront"[^>]*src="([^"]+)"',
        r'id="landingImage"[^>]*data-old-hires="([^"]+)"',
    ]:
        m = re.search(pattern, html)
        if m:
            url = m.group(1).replace("\\", "")
            if not result["main"]:
                result["main"] = url
            if "hires" in pattern or "old-hires" in pattern:
                result["main_hires"] = url
            break

    # ── Title ──
    title_m = re.search(r'id="productTitle"[^>]*>\s*(.*?)\s*<', html, re.DOTALL)
    if title_m:
        result["title"] = re.sub(r"<[^>]+>", "", title_m.group(1)).strip()

    # ── All images on page ──
    seen = set()
    for m in re.finditer(
        r'https?://m\.media-amazon\.com/images/I/[^"\'\s)]+\.(?:jpg|jpeg|png)',
        html, re.IGNORECASE,
    ):
        url = m.group(0)
        if url not in seen:
            seen.add(url)
            result["all"].append(url)

    return result


# ── Async scraper ──────────────────────────────────────────────────────

class AmazonScraper:
    def __init__(self, delay: float = DELAY_SECONDS):
        self.delay = delay
        self._last_request = 0.0

    async def _rate_limit(self):
        elapsed = asyncio.get_event_loop().time() - self._last_request
        if elapsed < self.delay:
            await asyncio.sleep(self.delay - elapsed + random.uniform(0, 1))
        self._last_request = asyncio.get_event_loop().time()

    def _headers(self) -> dict:
        return {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "DNT": "1",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
        }

    async def fetch_page(self, session: aiohttp.ClientSession, url: str) -> str | None:
        """Fetch a page with retries and backoff."""
        for attempt in range(4):
            await self._rate_limit()
            try:
                async with session.get(
                    url,
                    headers=self._headers(),
                    timeout=aiohttp.ClientTimeout(total=30),
                ) as resp:
                    if resp.status == 503:
                        wait = 10 * (attempt + 1)
                        print(f"  503 — backing off {wait}s...", file=sys.stderr)
                        await asyncio.sleep(wait)
                        continue
                    if resp.status != 200:
                        if attempt < 3:
                            await asyncio.sleep(3)
                            continue
                        return None
                    html = await resp.text()
                    if len(html) < 2000 or "Type the characters you see" in html:
                        if attempt < 3:
                            print(f"  Captcha/bot detection — retrying...", file=sys.stderr)
                            await asyncio.sleep(5 * (attempt + 1))
                            continue
                        return None
                    return html
            except Exception as e:
                if attempt < 3:
                    await asyncio.sleep(2 ** attempt)
                    continue
                print(f"  Failed: {e}", file=sys.stderr)
                return None
        return None

    async def download_image(
        self, session: aiohttp.ClientSession, url: str, dest: Path
    ) -> bool:
        """Download an image to a file."""
        try:
            await self._rate_limit()
            headers = {
                "User-Agent": random.choice(USER_AGENTS),
                "Referer": "https://www.amazon.com/",
            }
            async with session.get(
                url, headers=headers, timeout=aiohttp.ClientTimeout(total=20)
            ) as resp:
                if resp.status == 200:
                    dest.write_bytes(await resp.read())
                    return True
        except Exception:
            pass
        return False


# ── Image optimization ─────────────────────────────────────────────────

def optimize_image(src: Path, dest: Path) -> bool:
    """Convert to WebP, resize if > MAX_IMAGE_WIDTH."""
    try:
        img = Image.open(src)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        w, h = img.size
        if w > MAX_IMAGE_WIDTH:
            ratio = MAX_IMAGE_WIDTH / w
            img = img.resize((MAX_IMAGE_WIDTH, int(h * ratio)), Image.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "WEBP", quality=WEBP_QUALITY, optimize=True)
        return True
    except Exception as e:
        print(f"  Optimize failed: {e}", file=sys.stderr)
        return False


# ── Main scraping flow ─────────────────────────────────────────────────

async def scrape_product(
    scraper: AmazonScraper,
    session: aiohttp.ClientSession,
    asin: str,
    slug: str,
    keyword_slug: str,
    max_images: int = 3,
) -> list[Path]:
    """Scrape images for a single product ASIN."""
    url = f"https://www.amazon.com/dp/{asin}"
    print(f"  {slug}: fetching {url}...")

    html = await scraper.fetch_page(session, url)
    if not html:
        print(f"  {slug}: could not fetch page (Amazon may be blocking)")
        return []

    data = extract_product_data(html)
    title = data.get("title", "")

    # Collect image URLs — prefer hi-res, then gallery, then main
    urls: list[str] = []
    if data.get("main_hires"):
        urls.append(data["main_hires"])
    if data.get("gallery"):
        for u in data["gallery"]:
            if u not in urls:
                urls.append(u)
    if data.get("main") and data["main"] not in urls:
        urls.append(data["main"])

    # Strip size params for full-res originals
    urls = [strip_amazon_size(u) for u in urls]
    urls = list(dict.fromkeys(urls))  # deduplicate

    if not urls:
        print(f"  {slug}: no images found on page")
        return []

    print(f"  {slug}: found {len(urls)} image(s), downloading up to {max_images}...")
    urls = urls[:max_images]

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    saved: list[Path] = []

    for i, img_url in enumerate(urls):
        suffix = f"-{i + 1}" if i > 0 else ""
        filename = f"{slug}-{keyword_slug}{suffix}"
        temp_path = IMAGES_DIR / f"_tmp_{filename}"
        final_path = IMAGES_DIR / f"{filename}.webp"

        if final_path.exists():
            print(f"    Already exists: {final_path.name}")
            saved.append(final_path)
            continue

        # Try download with different size params
        for size_url in [img_url, amazon_image_with_size(img_url, 1500)]:
            if await scraper.download_image(session, size_url, temp_path):
                break
        else:
            print(f"    Download failed for {filename}")
            temp_path.unlink(missing_ok=True)
            continue

        # Optimize to WebP
        if optimize_image(temp_path, final_path):
            temp_path.unlink(missing_ok=True)
            size_kb = final_path.stat().st_size / 1024
            print(f"    Saved: {final_path.name} ({size_kb:.0f} KB)")
            saved.append(final_path)
        else:
            temp_path.unlink(missing_ok=True)

    return saved


async def scrape_all(
    products: list[dict[str, str]],
    max_per_product: int = 3,
) -> dict[str, list[Path]]:
    """Scrape images for multiple products."""
    scraper = AmazonScraper()
    results: dict[str, list[Path]] = {}

    sem = asyncio.Semaphore(MAX_CONCURRENT)

    async def scrape_one(p: dict[str, str]):
        async with sem:
            saved = await scrape_product(
                scraper, session, p["asin"], p["slug"], p["keyword_slug"], max_per_product
            )
            results[p["slug"]] = saved

    async with aiohttp.ClientSession() as session:
        tasks = [scrape_one(p) for p in products]
        await asyncio.gather(*tasks)

    return results


# ── Snippets generator ─────────────────────────────────────────────────

def generate_snippets() -> str:
    """Generate TypeScript image data for lib/data.ts."""
    if not IMAGES_DIR.exists():
        return "// No images found"

    images = sorted(IMAGES_DIR.glob("*.webp"))
    if not images:
        return "// No .webp images found"

    lines = ["// Auto-generated — paste into Product.images[]", ""]
    for img in images:
        stem = img.stem
        slug = stem.split("-")[0]  # rough
        lines.append(f'// {stem}')
        lines.append(f'{{ src: "/images/{img.name}", alt: "Product image for {stem}", title: "Solmere Journal", caption: "Read the full review." }},')
        lines.append("")
    return "\n".join(lines)


# ── CLI ────────────────────────────────────────────────────────────────

def parse_batch_file(path: str) -> list[dict[str, str]]:
    """Parse a batch file with format: ASIN slug keyword-slug (one per line)."""
    products = []
    for line in Path(path).read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) >= 3 and parts[0].startswith("B"):
            products.append({
                "asin": parts[0],
                "slug": parts[1],
                "keyword_slug": parts[2],
            })
    return products


async def amain() -> None:
    parser = argparse.ArgumentParser(description="Amazon product image scraper for Solmere Journal")
    parser.add_argument("identifier", nargs="?", help="ASIN (e.g. B085HQD385)")
    parser.add_argument("slug", nargs="?", help="Editorial slug")
    parser.add_argument("keyword", nargs="?", help="SEO keyword slug")
    parser.add_argument("--batch", help="Process a batch file")
    parser.add_argument("--max", type=int, default=3, help="Max images per product (default: 3)")
    parser.add_argument("--snippets", action="store_true", help="Generate data.ts snippets")
    args = parser.parse_args()

    if args.snippets:
        print(generate_snippets())
        return

    if args.batch:
        products = parse_batch_file(args.batch)
        if not products:
            print(f"No valid ASINs found in {args.batch}", file=sys.stderr)
            return
        print(f"Scraping {len(products)} products (max {args.max} images each)...\n")
        results = await scrape_all(products, max_per_product=args.max)
        total = sum(len(v) for v in results.values())
        print(f"\nDone: {total} images saved.")
        for slug, paths in results.items():
            status = f"{len(paths)} images" if paths else "FAILED"
            print(f"  {slug}: {status}")
    elif args.identifier and args.slug and args.keyword:
        products = [{
            "asin": args.identifier,
            "slug": args.slug,
            "keyword_slug": args.keyword,
        }]
        results = await scrape_all(products, max_per_product=args.max)
    else:
        parser.print_help()


def main():
    asyncio.run(amain())


if __name__ == "__main__":
    main()
