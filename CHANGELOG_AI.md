# CHANGELOG_AI.md — AI-Generated Change History

All changes made by AI agents are logged here in reverse chronological order.

---

## 2026-07-03

### Add India's Development Landscape Slide to Chapter 01

- **`chapter-01.html`**: Inserted a new slide titled "India's Development Landscape (2015–2026)".
  - Displayed the 10 key indices, with the "SDG Index" highlighted prominently as a large primary card.
  - Organized the remaining 9 indices in a supporting 3x3 grid.
  - Formatted layout using flexbox to fit optimally within a 100vh viewport height.
  - Reduced padding and font sizes to prevent slide overflow and ensure proper sizing.
  - Renamed specific indices for clarity (e.g., "Human Development Index (HDI)").

## 2026-06-27

### Remove Hover Text Swap from Research Hypotheses Slide

- **`chapter-04.html`**: Removed `.hyp-swap-card` class and inner `.hover-state` content from the cards on Slide 5 (Research Hypotheses) to prevent text replacement on hover, keeping only the `.hover-magnify` scale effect.

### Mobile Responsiveness Phase 1 Overhaul

- **`assets/css/style.css`**: Added mobile overrides for resource cards (flex-direction: row, horizontal layout, compact sizing) on viewports <= 768px.
- **`index.html`**:
  - Compressed Slide 1 (Hero) text sizes and margins to fit on smaller mobile screens.
  - Formatted Slide 3 resource cards to support the compact row layout on mobile viewports.
- **`chapter-02.html`**:
  - Slide 3 (Venn Diagram): Added media query overrides to scale down container and reposition circles horizontally to prevent right-edge overflow.
  - Slide 4 (Timeline): Converted timeline to a vertical layout and modified theorist cards container to wrap.
  - Slides 2 & 8: Resized text, padding, and statistics cards to prevent vertical clipping.
- **`chapter-05.html`**:
  - Slide 3 (Why Pragmatism?): Converted flow chart row to stacked column format, rotated plus/arrow elements, and formatted triangulation cards to vertical rows.
  - Slide 5 (Sample Distribution): Replaced inline column sizes with responsive `grid-2` class and added a `district-grid` layout that collapses on mobile.

### Add Fieldwork Photographs Gallery to Appendices

- **`convert_fieldwork.py`** (new): Python/Pillow script scans source folder (`D:\DRIVE (D) Images\...`), converts 125 fieldwork images to WebP (full 1920px + thumbs 600px), generates `assets/images/fieldwork/manifest.json`.
- **`assets/images/fieldwork/`** (new): 125 WebP photographs across 9 categories (Education, Healthcare, Environment, Livelihood, Community Meetings, CSR Hoardings, Interviews, Researcher's Fieldwork, Uncategorized). Each category has a `thumbs/` subfolder.
- **`appendices.html`**: Replaced placeholder Slide 5 (icon placeholders) with dynamic tabbed gallery. Gallery loads from `manifest.json` via `fetch()`. Includes: category pill tabs, 3-column scrollable grid, 1.5× hover magnify on cards, caption overlay, lightbox integration.
- **`assets/js/slider.js`**: Added `data-caption` attribute support to `initLightbox()`. Caption displays below image in lightbox overlay. Backwards-compatible.
- **`assets/css/slider-styles.css`**: Added `.lightbox-caption` style.
- **`assets/css/style.css`**: Added Section 20 — Fieldwork Gallery styles (`.gallery-tabs`, `.gallery-tab-btn`, `.gallery-scroll-area`, `.gallery-grid-3col`, `.gallery-card`, `.gallery-card-caption`, `.gallery-card-badge`, responsive overrides).

---

## 2026-06-20

### Clean up Academic Engagements & Appendices

- Fixed overflow issues in "Third Progress Report" and "Fourth Progress Report" slides by adjusting table padding and font size.
- Removed redundant slides: "Certificates & Evidence" and "Publication Links" from Academic Engagements.
- Removed redundant slides: "Journal Publications", "Certificates", "Interview Recordings (Excerpts)", and "Raw Data & Documentation" from Appendices.

### Updated Chapter 01 Slides

- Removed bottom text and adjusted layout on CES Slide (Slide 5).
- Removed redundant slides: "Why a Comparative Analysis?" and "Key Terms Defined".

### Complete Redesign of Chapter 07 (Findings & Conclusions)

- Replaced custom CSS styling with the unified `glass-card` design language used in Chapter 01.
- Updated the "Summary of Major Findings" slide from text lists to a 3-column grid of glass cards with icons.
- Transformed Corporate and NGO Recommendations into dynamic, interactive glass cards.
- Restructured the "Contributions of the Study" slide to cleanly separate Theoretical and Practical contributions into large, icon-driven glass cards.
- Wrapped the final conclusion statements into a master glass card for a polished final look.

### Visual & Layout Enhancements (Chapter 01 & 02)

- Added "Retrospective Study" badge to the CSR Expenditure slide in Chapter 01.
- Redesigned the "Chhattisgarh & Jharkhand" slide in Chapter 01 with a robust 2-column grid to prevent overflow.
- Cleaned up the Venn diagram in "The Missing Intersection" slide in Chapter 02 by removing paper citations.
- Added a `--warning-text-color` token to `style.css` to fix visibility issues of yellow text in Light Mode.

### Initialized project memory files

- Created `AGENTS.md` — Master AI agent instructions
- Created `BOOTSTRAP.md` — Session execution sequence
- Created `ARCHITECTURE.md` — Complete project structure (93 slides across 11 pages)
- Created `WORKFLOW.md` — Development workflow and patterns
- Created `CODING_STANDARD.md` — Coding rules and conventions
- Created `UI_GUIDELINES.md` — UI/UX design system documentation
- Created `MEMORY.md` — Project knowledge, decisions, and reasoning
- Created `CURRENT_TASK.md` — Active task tracker (no active task)
- Created `CHANGELOG_AI.md` — This file
- Created `KNOWN_ISSUES.md` — Open bugs and technical debt

**No existing files were modified.** All 10 files are new additions to the project root.
