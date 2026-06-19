# MEMORY.md — Project Knowledge, Decisions, and Reasoning

## Project Context

This is a PhD thesis presentation website for Sayed Amir Mustafa Hashmi. The thesis compares CSR communication effectiveness between two Indian states — Chhattisgarh and Jharkhand. The website converts traditional PowerPoint slides into an immersive, scroll-snapping HTML5 experience with glassmorphism UI, interactive charts, and statistical insight popups.

---

## Key Decisions

### Terminology Enforcement (Critical)

- The phrase **"societal betterment"** must never appear anywhere. The correct phrasing is **"betterment of society"**.
- This is enforced at runtime by a DOM walker + MutationObserver in `main.js` that auto-corrects any occurrence.
- Source content must also comply — the runtime enforcement is a safety net, not the primary mechanism.

### Theme System

- Default theme is **dark mode** (set via `data-theme="dark"` on `<html>`).
- User preference persists to `localStorage` under key `theme`.
- Theme toggle button is dynamically created by `theme.js` if not found in the DOM.
- All charts re-render on theme change via the `themeChanged` custom event dispatched by `theme.js`.

### Hover Magnification

- `.hover-magnify` was adopted as a universal hover effect for cards: scale 1.5× on desktop, 1.02× on mobile.
- Cards wider than 400px are auto-tagged with `.hover-magnify-lg` by `main.js` to prevent layout-breaking zoom.
- This logic runs after a 100ms delay to ensure CSS layout is calculated.
- The `.framework-card` class predates `.hover-magnify` — it uses scale 2.0× and is specific to one slide.

### Slide Number System

- Added June 2026.
- Fully dynamic — reads DOM at load time, injects badges into every `.slide`.
- Badge positioned at bottom-right (originally top-right, moved to bottom-right for better UX).
- Dropdown opens on click (not hover) to avoid accidental triggers.
- `CHAPTER_MAP` in `slide-number.js` maps filenames to display labels.
- Sanity check warns in console if slide count is outside 1–50 range.

### Popup System

- Changed from click-to-open to **hover-triggered** (mouseenter/mouseleave) based on user preference.
- Uses event delegation on `document.body` — no per-element binding needed.
- Popup data is a static object in `popup.js` keyed by string IDs.
- During hover, `pointer-events: none` is set on the overlay to prevent flickering.

### Lightbox Slider

- Two default groups auto-initialise: `.timeline-click` and `.pillar-click`.
- Custom groups require calling `initLightbox('.class', 'group-name')`.
- Images are `.webp` format stored under `assets/images/chapter-XX/`.

### Mobile Responsiveness

- 768px is the primary breakpoint.
- Cards are forced into horizontal row layout on mobile (`flex-direction: row`).
- All grids collapse to single column.
- Hover effects are toned down to prevent touch interaction issues.
- Light mode mobile has extensive text visibility overrides (lines 914–1081 in `style.css`).

### CSS Backup Files

- `style.css.backup` and `main.js.backup` contain pre-cinematic-enhancement versions.
- These serve as rollback points, not active code.

---

## Data Points (from the thesis)

| Metric | Value |
|---|---|
| Total surveys | 400 (200 per state) |
| Total interviews | 40 |
| Hypotheses tested | 5 |
| States compared | 2 (Chhattisgarh, Jharkhand) |
| Districts covered | 10 (5 per state) |
| Bibliography entries | 164+ |
| Published papers | 10 (in `pdf/journals/`) |
| Conference certificates | 5 (in `pdf/certificates/`) |
| CES Score CG | 2.67 |
| CES Score JH | 1.89 |
| Cohen's d | 1.24 (large effect) |
| Objectives | 5 |
| Theories | 4 (Stakeholder, Two-Way Symmetrical, Agenda-Setting, Diffusion of Innovations) |

---

## Timeline of Major Changes

| Date | Change |
|---|---|
| June 2026 | Slide numbering system added (`slide-number.js`) |
| June 2026 | Cinematic enhancements added (fade-ins, micro-interactions) |
| June 2026 | Popup system changed from click to hover trigger |
| June 2026 | Q badges redesigned (tinier pill, question number, glowing glass) |
| June 2026 | Chapter 03 theory convergence hover cards fixed for light mode |
| June 2026 | Mobile responsiveness overhaul (comprehensive 768px overrides) |
| June 2026 | Homepage title colour updated to use theme variables |
| June 2026 | Respondent Demographics slide added to Chapter 06 |
| June 2026 | Hypothesis slider converted to full slideshow with navigation |
| June 2026 | Light mode mobile text visibility fixes added |
| June 2026 | Project memory files initialised |
