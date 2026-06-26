# -*- coding: utf-8 -*-
"""
convert_fieldwork.py
====================
Scans the fieldwork photographs source folder, converts all JPG/PNG images
to WebP (full-size + thumbnails), and generates a manifest.json for the gallery.

Usage:
    py convert_fieldwork.py            # Normal run
    py convert_fieldwork.py --dry-run  # Preview only, no file writes
"""

import os
import sys
import json
import re
from pathlib import Path
from datetime import datetime, timezone

try:
    from PIL import Image, ExifTags
except ImportError:
    print("ERROR: Pillow not found. Run: pip install Pillow")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SOURCE_ROOT = Path(r"D:\DRIVE (D) Images\Category\CSR Images\Fieldwork Photographs")
TARGET_ROOT = Path(r"D:\DRIVE (Ai) Agents\00 Projects\Workplace CSR Slides\assets\images\fieldwork")
MANIFEST_PATH = TARGET_ROOT / "manifest.json"

FULL_MAX_PX   = 1920   # max longest edge for full-size WebP
THUMB_MAX_PX  = 600    # max longest edge for thumbnail WebP
FULL_QUALITY  = 80
THUMB_QUALITY = 75

DRY_RUN = "--dry-run" in sys.argv

# ---------------------------------------------------------------------------
# Category mapping: source folder name -> (slug, display name, FA icon)
# ---------------------------------------------------------------------------

CATEGORY_MAP = [
    ("01 Education",                    "education",            "Education",              "fa-graduation-cap"),
    ("02 Health",                       "healthcare",           "Healthcare",             "fa-heartbeat"),
    ("03 Environment",                  "environment",          "Environment",            "fa-leaf"),
    ("04 Livelihood",                   "livelihood",           "Livelihood",             "fa-seedling"),
    ("Community meetings",              "community-meetings",   "Community Meetings",     "fa-users"),
    ("Initiative Hordings of Company",  "csr-hoardings",        "CSR Hoardings",          "fa-sign"),
    ("Interviews",                      "interviews",           "Interviews",             "fa-microphone"),
    ("my picture of fieldwork",         "researcher-fieldwork", "Researcher's Fieldwork", "fa-user-circle"),
    ("Undecided category",              "uncategorized",        "Uncategorized",          "fa-folder-open"),
]

# Extensions to include (lowercase)
VALID_EXTS = {".jpg", ".jpeg", ".png"}

# Regex: generic camera filenames (no human-readable meaning)
GENERIC_RE = re.compile(
    r'^(img_\d|c\d{4}t\d|dji_\d|a7s\d|_a7s\d|\d{10,}|\d+)$',
    re.IGNORECASE
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def sanitize_slug(text: str) -> str:
    """Convert text to a safe URL/filename slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text[:80].strip('-')


def is_generic_name(stem: str) -> bool:
    """Return True if the filename stem looks like a camera code."""
    clean = stem.replace(' ', '_').replace('-', '_')
    return bool(GENERIC_RE.match(clean))


def make_caption(filepath: Path, category_dir: Path) -> str:
    """
    Derive a human-readable caption.
    Priority:
      1. Descriptive filename  (not a generic camera code, len > 8)
      2. Deepest subfolder name between category root and file
      3. Category folder name as last resort
    """
    stem = filepath.stem
    # Strip trailing duplicate extension like ".jpg" from "photo.jpg.jpg"
    stem = re.sub(r'\.(jpe?g|png)$', '', stem, flags=re.IGNORECASE)
    # Remove trailing " (2)" style suffixes for caption display
    caption_stem = re.sub(r'\s*\(\d+\)\s*$', '', stem).strip()

    if not is_generic_name(stem) and len(caption_stem) > 8:
        # Use descriptive filename; title-case if all-lower or all-upper
        if caption_stem.isupper() or caption_stem.islower():
            caption_stem = caption_stem.title()
        return caption_stem

    # Fall back to subfolder name
    try:
        rel = filepath.relative_to(category_dir)
        parts = rel.parts  # (subfolder?, ..., filename)
        subfolders = parts[:-1]  # everything before the filename
        if subfolders:
            folder = subfolders[-1]
            # Skip privacy-protection folder names
            if "do not mention" in folder.lower():
                folder = subfolders[-2] if len(subfolders) > 1 else category_dir.name
            return folder.strip()
    except ValueError:
        pass

    return category_dir.name.strip()


def is_beneficiary(filepath: Path) -> tuple:
    """
    Detect named beneficiary portraits.
    Returns (True, person_name) or (False, '').
    """
    for part in filepath.parts:
        if "do not mention" in part.lower():
            # The person's name is the immediate parent folder
            parent = filepath.parent.name
            skip_words = ("beneficiary", "community", "interview", "leaders", "do not")
            if not any(w in parent.lower() for w in skip_words):
                return True, parent
    return False, ""


def auto_orient(img: Image.Image) -> Image.Image:
    """Rotate image according to EXIF orientation tag."""
    try:
        exif = img._getexif()
        if exif is None:
            return img
        for tag, value in exif.items():
            if ExifTags.TAGS.get(tag) == 'Orientation':
                angles = {3: 180, 6: 270, 8: 90}
                if value in angles:
                    img = img.rotate(angles[value], expand=True)
                break
    except Exception:
        pass
    return img


def resize_fit(img: Image.Image, max_px: int) -> Image.Image:
    """Resize to fit within max_px on longest edge, preserving aspect ratio."""
    w, h = img.size
    if max(w, h) <= max_px:
        return img
    if w >= h:
        return img.resize((max_px, int(h * max_px / w)), Image.LANCZOS)
    else:
        return img.resize((int(w * max_px / h), max_px), Image.LANCZOS)


def unique_slug(slug: str, used: set) -> str:
    """Return slug, appending a counter if already in `used`."""
    if slug not in used:
        used.add(slug)
        return slug
    n = 2
    while f"{slug}-{n}" in used:
        n += 1
    result = f"{slug}-{n}"
    used.add(result)
    return result


def convert_image(src: Path, full_dst: Path, thumb_dst: Path) -> bool:
    """Open, orient, resize, save as WebP. Returns True on success."""
    try:
        with Image.open(src) as img:
            img = auto_orient(img)
            if img.mode not in ("RGB", "L"):
                img = img.convert("RGB")
            if not DRY_RUN:
                full_dst.parent.mkdir(parents=True, exist_ok=True)
                thumb_dst.parent.mkdir(parents=True, exist_ok=True)
                resize_fit(img.copy(), FULL_MAX_PX).save(full_dst,  "WEBP", quality=FULL_QUALITY,  method=4)
                resize_fit(img.copy(), THUMB_MAX_PX).save(thumb_dst, "WEBP", quality=THUMB_QUALITY, method=4)
        return True
    except Exception as e:
        print(f"  [ERROR] {src.name}: {e}")
        return False


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    prefix = "[DRY RUN] " if DRY_RUN else ""
    print(f"{prefix}Starting fieldwork photograph conversion...")
    print(f"  Source : {SOURCE_ROOT}")
    print(f"  Target : {TARGET_ROOT}")
    print()

    categories_data = []
    total_ok  = 0
    total_skp = 0
    total_err = 0

    for folder_name, slug, display_name, icon in CATEGORY_MAP:
        src_cat = SOURCE_ROOT / folder_name
        if not src_cat.exists():
            print(f"[WARN] Missing folder: {folder_name}")
            continue

        print(f"[{display_name}]")
        cat_images = []
        used_slugs: set = set()

        for src in sorted(src_cat.rglob("*")):
            if not src.is_file():
                continue
            ext = src.suffix.lower()
            if ext not in VALID_EXTS:
                continue

            # Skip .jpg.jpg / .jpeg.jpeg style duplicates
            if src.stem.lower().endswith(('.jpg', '.jpeg', '.png')):
                print(f"  [SKIP] {src.name}  (duplicate extension)")
                total_skp += 1
                continue

            # Caption
            ben, person = is_beneficiary(src)
            if ben and person:
                caption = f"{person}, Beneficiary"
            else:
                caption = make_caption(src, src_cat)

            # Output paths
            name_slug   = unique_slug(sanitize_slug(src.stem), used_slugs)
            rel_full    = f"assets/images/fieldwork/{slug}/{name_slug}.webp"
            rel_thumb   = f"assets/images/fieldwork/{slug}/thumbs/{name_slug}.webp"
            abs_full    = TARGET_ROOT / slug / f"{name_slug}.webp"
            abs_thumb   = TARGET_ROOT / slug / "thumbs" / f"{name_slug}.webp"

            # Subcategory from intermediate folders
            try:
                rel_parts   = src.relative_to(src_cat).parts  # (subfolder?, ..., filename)
                sub_parts   = rel_parts[:-1]
                subcategory = sub_parts[-1] if sub_parts else ""
                if "do not mention" in subcategory.lower():
                    subcategory = sub_parts[-2] if len(sub_parts) > 1 else ""
            except ValueError:
                subcategory = ""

            print(f"  -> {src.name}")
            print(f"     caption : {caption}")

            ok = convert_image(src, abs_full, abs_thumb)
            if ok:
                total_ok += 1
                cat_images.append({
                    "src":         rel_full,
                    "thumb":       rel_thumb,
                    "caption":     caption,
                    "subcategory": subcategory,
                })
            else:
                total_err += 1

        categories_data.append({
            "id":     slug,
            "name":   display_name,
            "icon":   icon,
            "count":  len(cat_images),
            "images": cat_images,
        })
        print(f"  [OK] {len(cat_images)} image(s)\n")

    # Write manifest
    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalImages": total_ok,
        "categories":  categories_data,
    }

    if not DRY_RUN:
        TARGET_ROOT.mkdir(parents=True, exist_ok=True)
        with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        print(f"[MANIFEST] Written to {MANIFEST_PATH}")
    else:
        print("[MANIFEST] Skipped (dry run).")

    print()
    print("-" * 60)
    print(f"  Converted : {total_ok}")
    print(f"  Skipped   : {total_skp}")
    print(f"  Errors    : {total_err}")
    print("-" * 60)
    if DRY_RUN:
        print("Dry run complete. Re-run without --dry-run to write files.")
    else:
        print("Conversion complete!")


if __name__ == "__main__":
    main()
