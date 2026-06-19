# KNOWN_ISSUES.md — Open Bugs and Technical Debt

## Active Issues

### 1. Hardcoded Hex Colours in Inline Styles

**Severity:** Low
**Location:** Multiple HTML files (chapter-01.html, chapter-03.html, etc.)
**Details:** Some inline styles use hardcoded hex colours instead of CSS variables. Examples:
- `color: #fff` on pyramid levels in chapter-01.html (`.pyramid-level` uses `color: #fff`)
- `color: #333` on `.pyramid-3`
- Card-specific accent colours like `#3498db`, `#e74c3c`, `#2ecc71`, `#f1c40f`, `#9b59b6` are used inline for visual differentiation — these are acceptable as they are decorative accents, not text/background colours.

**Risk:** Pyramid text may be invisible in light mode if background colours are close to white.

---

### 2. Page-Specific Inline `<style>` Blocks

**Severity:** Low (Technical debt)
**Location:** Every HTML file
**Details:** Each chapter page has its own `<style>` block in `<head>` for page-specific CSS. Some of these styles could be consolidated into `style.css` for easier maintenance. Examples include `.timeline`, `.pillar-grid`, `.ces-grid`, `.pyramid` classes.

**Risk:** Style duplication and harder global updates.

---

### 3. Backup Files in Assets

**Severity:** Low (Housekeeping)
**Location:** `assets/css/style.css.backup`, `assets/js/main.js.backup`
**Details:** Pre-cinematic-enhancement backup files exist alongside active files. These serve as rollback points but add clutter.

**Risk:** No functional risk; may confuse new contributors.

---

### 4. Scratch Scripts in Repository

**Severity:** Low (Housekeeping)
**Location:** `scratch/` directory
**Details:** Contains 5 one-off fix scripts (`fix_css.js`, `fix_hyp_overflow.js`, `fix_q_badges.js`, `fix_q_badges.py`, `insert_slide.js`) that were used for past modifications and are no longer active.

**Risk:** No functional risk; may confuse new contributors.

---

### 5. `modify.py` Left in Root

**Severity:** Low (Housekeeping)
**Location:** `modify.py`
**Details:** A one-off Python script used to modify `chapter-03.html` (removing slides 2 and 3, inserting Pillar 5 breakdown). Task is complete; script is no longer needed.

**Risk:** May be accidentally re-run, modifying chapter-03.html unintentionally.

---

### 6. Bibliography Is a Single Slide

**Severity:** Low (Content)
**Location:** `bibliography.html`
**Details:** The entire bibliography (164+ references) is contained in a single slide. This may cause very long scroll within the slide on all screen sizes.

**Risk:** Poor readability of references on mobile.

---

### 7. `chap-nav` Hover Colour Is Hardcoded

**Severity:** Low
**Location:** `assets/css/style.css`, line 430
**Details:** `.chap-nav a:hover` uses `color: #e67e22` (a hardcoded orange) instead of a CSS variable. This works visually but doesn't follow the convention of using variables.

**Risk:** Won't adapt if the accent colour scheme changes.

---

### 8. Chart.js CDN Pinned to Specific Version

**Severity:** Low
**Location:** All chapter HTML files
**Details:** Chart.js is loaded from `cdn.jsdelivr.net/npm/chart.js@4.4.0`. This pins a specific version which is good for stability but may miss security patches.

**Risk:** No immediate risk; monitor for CVEs in Chart.js 4.x.

---

### 9. Missing `<meta name="description">` on All Pages

**Severity:** Low (SEO)
**Location:** All HTML files
**Details:** No pages include a `<meta name="description">` tag. While this is an academic presentation (not a public-facing site), adding descriptions would improve SEO if the site is ever indexed.

**Risk:** No functional risk; poor SEO metadata.

---

### 10. `.sn-dropdown__item:hover` Uses Hardcoded rgba

**Severity:** Low
**Location:** `assets/css/style.css`, line 1306
**Details:** The slide number dropdown hover uses `background: rgba(0, 212, 255, 0.1)` instead of a CSS variable. The light mode override on line 1318 uses `rgba(0, 102, 204, 0.1)`.

**Risk:** Won't automatically adapt to future accent colour changes.

---

## Resolved Issues

| Date | Issue | Resolution |
|---|---|---|
| June 2026 | Ch 03 theory convergence hover cards invisible in light mode | Updated to use `var(--text-main)` |
| June 2026 | Homepage title used hardcoded colour | Changed to `var(--text-main)` |
| June 2026 | Popup overlay flickered on hover | Added `pointer-events: none` during hover display |
| June 2026 | Hypothesis Testing Results slide overflowed | Compacted styles |
| June 2026 | Q badge too large and unstyled | Redesigned to tiny pill with glowing glass effect |
| June 2026 | Mobile: broken HTML structure at slide 10 | Fixed structure in chapter-06 |
| June 2026 | Mobile: card text invisible on small screens | Added comprehensive mobile text visibility overrides |
