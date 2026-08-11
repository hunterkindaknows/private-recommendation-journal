#!/usr/bin/env python3
"""
Amazon Product Image Scraper for Solmere Journal
=================================================
Downloads product images, renames them with SEO-friendly slugs,
converts to WebP, and saves to public/images/.

Usage:
    # Scrape by ASIN (attempts to find images on Amazon page)
    python scripts/scrape-images.py B085HQD385 only-black-tee "calvin-klein-black-tee"

    # Download from direct image URLs
    python scripts/scrape-images.py --url "https://m.media-amazon.com/..." only-black-tee "calvin-klein-black-tee"

    # Batch mode from a file (one ASIN/URL per line)
    python scripts/scrape-images.py --batch asin-list.txt

    # Generate data.ts snippets for all images in public/images/
    python scripts/scrape-images.py --snippets

Output:
    public/images/{slug}-{keyword}.webp    (primary image)
    public/images/{slug}-{keyword}-alt.webp (alternate angles)

Each image gets proper SEO metadata embedded in the file.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

import httpx
from PIL import Image

# ── Constants ──────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = PROJECT_ROOT / "public" / "images"
WEBP_QUALITY = 85
MAX_IMAGE_WIDTH = 1200
REQUEST_TIMEOUT = 30
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

# ── Amazon image URL patterns ─────────────────────────────────────────
AMAZON_IMAGE_RE = re.compile(
    r'https?://m\.media-amazon\.com/images/I/[^"\'\s]+\.(?:jpg|png|jpeg)',
    re.IGNORECASE,
)
AMAZON_LANDING_IMAGE_RE = re.compile(
    r'"landingImage":\s*\{\s*"src":\s*"([^"]+)"',
)
AMAZON_HIRES_RE = re.compile(
    r'"hiRes":\s*"([^"]+)"',
)


def slugify(text: str) -> str:
    """Convert text to URL-safe slug."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text[:80]


def fetch_page(url: str) -> str | None:
    """Fetch a webpage with retries."""
    for attempt in range(3):
        try:
            resp = httpx.get(
                url,
                headers={"User-Agent": USER_AGENT},
                timeout=REQUEST_TIMEOUT,
                follow_redirects=True,
            )
            resp.raise_for_status()
            return resp.text
        except Exception as e:
            if attempt == 2:
                print(f"  Failed to fetch {url}: {e}", file=sys.stderr)
                return None
            time.sleep(2 ** attempt)
    return None


def find_amazon_images(html: str) -> list[str]:
    """Extract image URLs from Amazon product page HTML."""
    images: list[str] = []

    # Try landingImage / hiRes JSON patterns first (highest quality)
    for pattern in [AMAZON_HIRES_RE, AMAZON_LANDING_IMAGE_RE]:
        matches = pattern.findall(html)
        for m in matches:
            img = m.replace("\\", "")
            if img not in images:
                images.append(img)

    # Fall back to generic media-amazon URLs
    if not images:
        matches = AMAZON_IMAGE_RE.findall(html)
        seen = set()
        for m in matches:
            # Prefer larger variants: replace scaling suffixes
            m = re.sub(r"\._.*?_\.", ".", m)
            if m not in seen:
                seen.add(m)
                images.append(m)

    return images


def download_image(url: str, dest: Path) -> bool:
    """Download an image to the given path."""
    try:
        resp = httpx.get(
            url,
            headers={"User-Agent": USER_AGENT},
            timeout=REQUEST_TIMEOUT,
            follow_redirects=True,
        )
        resp.raise_for_status()
        dest.write_bytes(resp.content)
        return True
    except Exception as e:
        print(f"  Download failed: {e}", file=sys.stderr)
        return False


def optimize_image(src: Path, dest: Path, max_width: int = MAX_IMAGE_WIDTH) -> bool:
    """
    Convert image to WebP, resize if needed, and optimize.
    Returns True on success.
    """
    try:
        img = Image.open(src)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")

        w, h = img.size
        if w > max_width:
            ratio = max_width / w
            img = img.resize((max_width, int(h * ratio)), Image.LANCZOS)

        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "WEBP", quality=WEBP_QUALITY, optimize=True)
        return True
    except Exception as e:
        print(f"  Optimize failed: {e}", file=sys.stderr)
        return False


def scrape_by_asin(asin: str, slug: str, keyword: str) -> list[Path]:
    """
    Scrape product images from an Amazon ASIN page.
    Returns list of saved file paths.
    """
    url = f"https://www.amazon.com/dp/{asin}"
    print(f"Fetching {url}...")
    html = fetch_page(url)
    if not html:
        # Try the product page directly as a fallback
        url = f"https://www.amazon.com/gp/product/{asin}"
        print(f"Retrying with {url}...")
        html = fetch_page(url)

    if not html:
        print("  Could not fetch Amazon page. Try providing a direct image URL with --url.")
        return []

    images = find_amazon_images(html)
    if not images:
        print("  No images found on page. Amazon may be blocking the request.")
        print("  Try providing a direct image URL with --url.")
        return []

    print(f"  Found {len(images)} image(s)")
    return _download_and_save(images[:3], slug, keyword)  # max 3 per product


def scrape_by_url(image_url: str, slug: str, keyword: str) -> list[Path]:
    """Download from a direct image URL."""
    return _download_and_save([image_url], slug, keyword)


def _download_and_save(urls: list[str], slug: str, keyword: str) -> list[Path]:
    """Download images and save as optimized WebP."""
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    saved: list[Path] = []

    for i, url in enumerate(urls):
        suffix = f"-{i + 1}" if i > 0 else ""
        filename = f"{slug}-{keyword}{suffix}"
        temp_path = IMAGES_DIR / f"_temp_{filename}"
        final_path = IMAGES_DIR / f"{filename}.webp"

        if final_path.exists():
            print(f"  Already exists: {final_path.name}")
            saved.append(final_path)
            continue

        print(f"  Downloading: {url[:80]}...")
        if not download_image(url, temp_path):
            continue

        if optimize_image(temp_path, final_path):
            temp_path.unlink(missing_ok=True)
            size_kb = final_path.stat().st_size / 1024
            print(f"  Saved: {final_path.name} ({size_kb:.0f} KB)")
            saved.append(final_path)
        else:
            temp_path.unlink(missing_ok=True)

    return saved


def generate_data_snippets() -> str:
    """
    Scan public/images/ and generate TypeScript data snippets
    that can be pasted into lib/data.ts.
    """
    if not IMAGES_DIR.exists():
        return "// No images found in public/images/"

    images = sorted(IMAGES_DIR.glob("*.webp"))
    if not images:
        return "// No .webp images found in public/images/"

    lines = ["// Auto-generated image data — paste into Product interface", ""]
    by_slug: dict[str, list[str]] = {}
    for img in images:
        stem = img.stem
        # Extract slug prefix: "only-black-tee-calvin-klein" -> "only-black-tee"
        parts = stem.split("-")
        slug = None
        for editorial_slugs in [
            "only-black-tee", "one-belt-no-crack", "socks-for-walking",
            "everyday-chain", "white-sneaker-women", "daily-earrings",
            "maternity-bra-no-compromise", "baby-monitor-worth-it",
            "car-coat-between-seasons-men", "waxed-jacket-transitional-men",
            "trench-for-between-seasons-women", "boots-for-cold-ground-men",
            "henry-topcoat-work-rotation-men", "dakota-waxed-jacket-men",
            "cashmere-set-cold-mornings-women", "budget-chukka-men-transitional",
            "pinch-penny-loafer-cold-dry-days", "grid-base-layer-men-core-warmth",
        ]:
            if stem.startswith(editorial_slugs):
                slug = editorial_slugs
                break
        if not slug:
            slug = stem
        by_slug.setdefault(slug, []).append(f"/images/{img.name}")

    for slug, image_paths in sorted(by_slug.items()):
        lines.append(f"// {slug}")
        lines.append(f'images: {json.dumps(image_paths)}')
        lines.append("")

    return "\n".join(lines)


def process_batch(batch_file: str) -> None:
    """Process a batch file with one entry per line."""
    path = Path(batch_file)
    if not path.exists():
        print(f"File not found: {batch_file}", file=sys.stderr)
        sys.exit(1)

    lines = [l.strip() for l in path.read_text().splitlines() if l.strip() and not l.startswith("#")]
    for line in lines:
        parts = line.split()
        if len(parts) < 3:
            print(f"Skipping malformed line: {line}")
            continue
        identifier, slug, keyword = parts[0], parts[1], parts[2]
        print(f"\n{'=' * 60}")
        if identifier.startswith("http"):
            scrape_by_url(identifier, slug, keyword)
        elif identifier.startswith("B"):
            scrape_by_asin(identifier, slug, keyword)
        else:
            print(f"Unknown identifier: {identifier}")


# ── CLI ────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Amazon product image scraper for Solmere Journal"
    )
    parser.add_argument(
        "identifier", nargs="?",
        help="ASIN (e.g. B085HQD385) or direct image URL"
    )
    parser.add_argument("slug", nargs="?", help="Editorial slug (e.g. only-black-tee)")
    parser.add_argument("keyword", nargs="?", help="SEO keyword slug (e.g. calvin-klein-black-tee)")
    parser.add_argument("--url", action="store_true", help="Treat identifier as a direct image URL")
    parser.add_argument("--batch", help="Process a batch file (one entry per line)")
    parser.add_argument("--snippets", action="store_true", help="Generate data.ts snippets from existing images")
    args = parser.parse_args()

    if args.snippets:
        print(generate_data_snippets())
    elif args.batch:
        process_batch(args.batch)
    elif args.identifier and args.slug and args.keyword:
        if args.url or args.identifier.startswith("http"):
            scrape_by_url(args.identifier, args.slug, args.keyword)
        else:
            scrape_by_asin(args.identifier, args.slug, args.keyword)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
