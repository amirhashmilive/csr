# WORKFLOW.md — Development Workflow

## How Changes Are Made

### Adding a New Slide

1. Open the target `chapter-XX.html` file.
2. Inside the `.slide-container` div, add a new `<section class="slide">…</section>` block.
3. Use existing patterns: `.slide-title` for headings, `.slide-subtitle` for subheadings, `.glass-card` for content cards.
4. Apply `.hover-magnify` to interactive cards.
5. Use grid classes (`.grid-2`, `.grid-3`, `.grid-4`, `.grid-7`) for multi-column layouts.
6. Slide numbering updates automatically — no manual work needed.
7. Commit with descriptive message.

### Adding a New Chapter Page

1. Create `chapter-XX.html` using an existing chapter as a template.
2. Include the standard `<head>` boilerplate: Google Fonts, Font Awesome, `style.css`, and Chart.js (if needed).
3. Add the chapter navigation bar (`.chap-nav`) at the top.
4. Add the home button (`.back-btn`).
5. Add the standard script block before `</body>` (see ARCHITECTURE.md for load order).
6. Update `CHAPTER_MAP` in `assets/js/slide-number.js` with the new filename-to-label mapping.
7. Add the chapter link to index.html's thesis structure slide.

### Adding a Chart

1. Add a `<canvas id="uniqueChartId"></canvas>` inside a `.chart-container` div.
2. Define `window.renderPageCharts = function(colors) { … }` in a `<script>` block at the bottom of the page.
3. Call `createChart('uniqueChartId', type, data, options)` using the `colors` parameter for theme-aware colours.
4. The chart will automatically re-render on theme change via the `themeChanged` event.

### Adding a Popup (Statistical Insight)

1. Add a `data-popup="popup-key"` attribute to the trigger element.
2. Add the `.popup-trigger` class for dotted-underline styling.
3. Add the popup data entry to `popupData` in `assets/js/popup.js`.
4. The popup system is event-delegated — no per-element initialisation needed.

### Adding a Lightbox Slider

1. Add `data-image="path/to/image.webp"` and a trigger class to clickable elements.
2. If using `.timeline-click` or `.pillar-click`, it auto-initialises.
3. For custom classes, call `initLightbox('.my-class', 'group-name')` in a DOMContentLoaded handler.
4. See `docs/slider-style-guide.md` for full usage.

### Modifying Styles

1. All global styles go in `assets/css/style.css`.
2. Page-specific styles use inline `<style>` blocks in the `<head>` of each HTML file.
3. Always use CSS custom properties for colours.
4. Test both dark and light modes after any style change.
5. Test at 768px breakpoint for mobile.

---

## Git Workflow

- **Single branch:** `main`
- **Remote:** `origin` → `https://github.com/amirhashmilive/csr.git`
- **Flow:** Edit → Test locally → `git add -A` → `git commit` → `git push origin main`
- **No pull requests, no CI/CD** — direct push to main.

---

## Export Utilities

| Script | Purpose | Dependencies |
|---|---|---|
| `capture_slides.py` | Screenshot all slides → single PDF | Selenium, Edge/Chrome WebDriver, img2pdf |
| `convert_to_pptx.py` | Parse HTML → PowerPoint `.pptx` | BeautifulSoup, python-pptx |
| `modify.py` | One-off HTML modification (chapter-03) | Python re module |
