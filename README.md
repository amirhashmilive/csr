# PhD Thesis Presentation Website

**Project:** "A Comparative Study on Betterment of Society through Corporate Social Responsibility Communication in Chhattisgarh and Jharkhand"
**Scholar:** Sayed Amir Mustafa Hashmi (Enrolment No.: R/Ph.D. 005)

## Overview
This is a comprehensive, interactive web-based presentation of a Ph.D. thesis. It converts standard PowerPoint slides into an immersive, long-scrolling HTML5 experience with 3D elements, glassmorphism UI, interactive data visualizations, and dark/light mode toggling.

## File Structure
- `index.html` - Homepage
- `chapter-01.html` to `chapter-07.html` - The core thesis chapters
- `appendices.html` - Supplemental materials
- `bibliography.html` - Reference list
- `academic-engagements.html` - Publications and progress reports
- `assets/`
  - `css/style.css` - Design system and responsive layout
  - `js/main.js` - Scroll snap and navigation logic
  - `js/theme.js` - Dark/light mode manager
  - `js/charts.js` - Chart.js integrations
  - `js/popup.js` - Insight layer for statistical details
  - `js/slide-number.js` - **Dynamic slide numbering system** _(added June 2026)_

## Key Features
- **Scroll-Snap Navigation:** Full-page sections that snap into place.
- **Theme Engine:** Fully persistent dark and light modes.
- **Interactive Charts:** 22+ charts built with Chart.js that automatically update colors when the theme changes.
- **Popup Insights:** A custom event-delegated popup system explaining formulas, effect sizes (Cohen's d), and significance tests for key metrics.
- **Slide Number Badges:** Every slide displays a dynamic badge (e.g. "Ch 01, Slide 3") with a clickable dropdown for chapter navigation.
- **Fully Responsive:** Adapts from mobile screens up to large presentation displays.

## Technology Stack
- HTML5 / CSS3 (Custom properties, Flexbox/Grid, Animations)
- Vanilla JavaScript (ES6+)
- Chart.js 4.4.0 (via CDN)
- Font Awesome 6 (via CDN)
- Google Fonts (Inter)

## How to Run
Simply open `index.html` in any modern web browser. No local server or build process is required.

---

## Slide Numbering System

### Overview

The slide numbering system is powered by `assets/js/slide-number.js`. It is fully dynamic — no slide numbers are hardcoded anywhere. All numbers are auto-calculated at page load time from the actual DOM.

### How it Works

1. **Chapter Detection** — The script reads `window.location.pathname` to extract the filename (e.g. `chapter-01.html`) and maps it to a display label (`Ch 01`). Supplemental pages map to labels like `Home`, `Appendix`, `Bibliography`, and `Engagements`.

2. **Slide Discovery** — All `.slide` elements on the current page are queried with `document.querySelectorAll('.slide')` and numbered sequentially from 1.

3. **Badge Injection** — A small glassmorphism badge is injected into the **top-right corner** of each `.slide`. It reads:
   ```
   Ch 01, Slide 3  ▾
   ```

4. **Hover Dropdown** — Clicking the badge opens a dropdown listing every slide in the current page. Each item is a button that smoothly scrolls to that slide. The current slide item is highlighted.

5. **Console Logging** — On every page load, the browser console shows:
   ```
   [SlideNumber] Ch 01 — 14 slide(s) detected.
   [SlideNumber] ✅ Badges injected for all 14 slides.
   ```

6. **Sanity Check** — If the slide count falls outside the expected range (1–50), a warning is printed:
   ```
   [SlideNumber] ⚠️ Slide count (0) is outside expected range [1–50]. Please verify the page structure.
   ```

### Styling

All badge styles live under the `SLIDE NUMBER BADGE SYSTEM` section at the bottom of `assets/css/style.css`. The badges use the existing CSS custom properties (`--bg-glass`, `--bg-glass-border`, `--accent-cg`, etc.) so they automatically respect dark and light mode.

Key CSS classes:

| Class | Purpose |
|---|---|
| `.sn-badge` | The pill-shaped badge container |
| `.sn-badge--open` | Applied when dropdown is visible |
| `.sn-badge--entered` | Triggers entry animation on scroll |
| `.sn-dropdown` | The slide list dropdown panel |
| `.sn-dropdown__item` | A single slide link button |
| `.sn-dropdown__item--active` | Highlights the current slide in the dropdown |

### Maintaining Slide Numbers

Because the system is fully dynamic, **no manual updates are needed** when slides are added or removed:

- **Adding a slide:** Add a new `<section class="slide">…</section>` inside `.slide-container`. The badge and number will appear automatically on next page load.
- **Removing a slide:** Delete the `<section class="slide">` block. All subsequent slide numbers will re-number automatically.
- **Changing page labels:** Edit the `CHAPTER_MAP` object at the top of `assets/js/slide-number.js`.

### Chapter Label Mapping

| Filename | Displayed Label |
|---|---|
| `chapter-01.html` | Ch 01 |
| `chapter-02.html` | Ch 02 |
| `chapter-03.html` | Ch 03 |
| `chapter-04.html` | Ch 04 |
| `chapter-05.html` | Ch 05 |
| `chapter-06.html` | Ch 06 |
| `chapter-07.html` | Ch 07 |
| `index.html` | Home |
| `appendices.html` | Appendix |
| `bibliography.html` | Bibliography |
| `academic-engagements.html` | Engagements |

### Adding the Script to a New Page

If a new HTML file is created, add this line before `</body>`:

```html
<script src="assets/js/slide-number.js"></script>
```

That's all — the system handles everything else automatically.
