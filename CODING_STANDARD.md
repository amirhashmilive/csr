# CODING_STANDARD.md — Coding Rules and Patterns

## HTML Conventions

### Slide Structure

Every content section follows this pattern:

```html
<section class="slide">
    <h2 class="slide-title">Title</h2>
    <h3 class="slide-subtitle">Subtitle</h3>
    <!-- Content using glass-card, grids, etc. -->
</section>
```

- All slides live inside a single `.slide-container` div.
- Each slide is a `<section>` with `class="slide"`.
- Hero/title slides use inline styles for centering and sizing.
- Slides use `scroll-snap-align: start` for full-page snapping.

### Card Patterns

```html
<!-- Standard content card -->
<div class="glass-card hover-magnify">
    <i class="fas fa-icon" style="font-size: 3rem; color: var(--accent-cg);"></i>
    <h3>Card Title</h3>
    <p style="color: var(--text-muted);">Description</p>
</div>

<!-- Stat card with colour accent border -->
<div class="glass-card hover-magnify" style="text-align: center; border-top: 3px solid var(--accent-cg);">
    <h3 style="color: var(--accent-cg);">Stat Value</h3>
    <p style="color: var(--text-muted);">Stat Label</p>
</div>
```

### Page Head Boilerplate

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chapter XX: Title | PhD Thesis Presentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <style>/* Page-specific styles here */</style>
</head>
```

### Chapter Navigation Bar

Every chapter page includes a fixed nav bar:

```html
<nav class="chap-nav">
    <a href="chapter-01.html" class="active" data-fullname="Introduction">Ch 01</a>
    <span class="chap-nav-sep">|</span>
    <!-- ... Ch 02 through Ch 07 ... -->
</nav>
```

- The `.active` class marks the current chapter.
- `data-fullname` provides tooltip text on hover.

---

## CSS Conventions

### Theme Variables (Must Use)

| Variable | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--bg-primary` | `#f8f9ff` | `#0a0a0f` | Page background |
| `--text-main` | `#1a1a24` | `#f8f9ff` | Primary text |
| `--text-muted` | `#555566` | `#a0a0b0` | Secondary text |
| `--bg-glass` | `rgba(255,255,255,0.7)` | `rgba(255,255,255,0.05)` | Card background |
| `--bg-glass-border` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` | Card borders |
| `--accent-cg` | `#0066cc` | `#00d4ff` | Chhattisgarh accent (blue/cyan) |
| `--accent-jh` | `#cc4400` | `#ff6b35` | Jharkhand accent (orange) |
| `--success-color` | `#28a745` | `#00e676` | Positive/success |
| `--warning-color` | `#ffc107` | `#ffd600` | Warning/caution |
| `--neon-glow` | subtle blue | cyan glow | Card hover glow |

### Forbidden Patterns

- ❌ Never use hardcoded hex colours (e.g., `#ffffff`, `#f0f0ff`) for text or backgrounds
- ❌ Never use `color: white` or `color: black` — use `var(--text-main)`
- ❌ Never hardcode slide numbers in HTML
- ❌ Never use inline `<script>` for functionality that belongs in a shared JS file
- ❌ Never use `!important` in `style.css` unless inside a `@media` block for mobile overrides

### Grid Classes

| Class | Columns | Max Width |
|---|---|---|
| `.grid-2` | 2 | 1200px |
| `.grid-3` | 3 | 1200px |
| `.grid-4` | 4 | 1200px |
| `.grid-7` | auto-fit, min 250px | 1200px |

All grids collapse to 1 column at 768px.

### Animation Classes

| Class | Effect |
|---|---|
| `.hover-magnify` | Scale to 1.5× on hover, 1.02× on mobile |
| `.hover-magnify-lg` | Scale to 1.02× (auto-applied to cards >400px wide) |
| `.glow-blue` | Breathing blue border glow |
| `.glow-green` | Breathing green border glow |
| `.glow-purple` | Breathing purple border glow |
| `.glow-orange` | Breathing orange border glow |
| `.glow-cyan` | Breathing cyan border glow |
| `.border-glow-blue` | Static blue border with neon glow |

---

## JavaScript Conventions

### Module Pattern

All scripts use IIFE or DOMContentLoaded patterns. No ES modules, no imports.

```javascript
(function() {
    'use strict';
    // Logic here
})();
```

or

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Logic here
});
```

### Chart Registration

Page-specific charts register via `window.renderPageCharts`:

```javascript
window.renderPageCharts = function(colors) {
    createChart('canvasId', 'bar', { /* data */ }, { /* options */ });
};
```

### Console Logging

Use prefixed console logs for debugging:

```javascript
console.log('[SlideNumber] Ch 01 — 14 slide(s) detected.');
console.log('✅ Enforcement active: ...');
```

---

## File Naming

- HTML pages: `chapter-XX.html` (zero-padded), `appendices.html`, `bibliography.html`
- Images: `assets/images/chapter-XX/category/descriptive-name.webp`
- PDFs: `pdf/category/descriptive-name.pdf`
- Image format: `.webp` preferred for web images
