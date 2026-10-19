# CHANGELOG_AI.md — AI-Generated Change History

All changes made by AI agents are logged here in reverse chronological order.

---

## 2026-10-19

### Replace "Understanding the Thesis Title" Slide with Highlighted CSR Definition Slide

- **`chapter-01.html`**: Removed the entire "Understanding the Thesis Title" slide (4-card grid: CSR, CSR Communication, Betterment of Society, Chhattisgarh & Jharkhand). Replaced with a clean, minimal "What is CSR?" slide containing a single prominently highlighted glass-card definition block with quote styling, border-left accent, and italic blockquote. Added scoped CSS classes (`.csr-definition-card`, `.csr-quote-icon`, `.csr-definition-text`) using `clamp()` for responsive sizing. Slide count unchanged (still 11 slides). Dynamic numbering via `slide-number.js` unaffected.

---

## 2026-10-17

### Move Title to Top of Card in All Caps & Remove Formality Lines on Slide 1

- **`index.html`**:
  - Removed thesis formality lead text (*"A Thesis Submitted in Partial Fulfilment of the Requirements for the Award of the Degree of"*) and degree text (*"Doctor of Philosophy in Mass Communication"*).
  - Moved thesis title to the upper side of the card, styled in ALL CAPS (*"A COMPARATIVE STUDY ON BETTERMENT OF SOCIETY THROUGH CORPORATE SOCIAL RESPONSIBILITY COMMUNICATION IN CHHATTISGARH AND JHARKHAND"*).
  - Rebalanced internal card spacing between header, scholar/supervisors body, and institution footer to maintain visual harmony without awkward gaps.
  - Verified layout across desktop viewports ensuring zero overflow and no scrollbars.

### Maximize Slide 1 Layout to ~90% Viewport with Larger Fonts

- **`index.html`**:
  - Restructured Slide 1 so that `.thesis-hero-card` wraps the full presentation cover content (subtitle, title, degree requirements, scholar block, supervisors committee, and academic institution).
  - Maximized card footprint to fill ~90% of viewport width (`90vw`, max-width `1600px`) and ~88% of viewport height (`88vh`), reducing excessive empty margins.
  - Increased font sizes across all elements using responsive `clamp()` units (Title up to 2.65rem, Scholar up to 2.1rem, Supervisors up to 1.5rem, University up to 1.45rem).
  - Verified zero vertical and horizontal overflow across common desktop resolutions (1920×1080, 1440×900, 1366×768) in both Dark and Light themes.

---

## 2026-10-16

### Restore Single Card Layout & Remove Extra Detail Lines on Home Page

- **`index.html`**:
  - Restored the single glass card layout (`.thesis-hero-card`) on Slide 1, reverting the multi-card split.
  - Removed the extra detail lines (*Comparative Scope: Chhattisgarh & Jharkhand*, *Mixed-Methods: 400 Surveys • 40 In-Depth Interviews*, and *Study Timeline: FY 2018–19 to FY 2022–23*).
  - Maintained the removal of the Raipur address line as requested previously.

### Redesign Home Page (Slide 1) Layout & Remove Address

- **`index.html`**:
  - Removed `"Raipur – 492013, Chhattisgarh, India"` from the academic institution details.
  - Replaced the single narrow vertical card with a 3-column glass card layout (`max-width: 1180px`) dividing details into **Research Scholar**, **Research Supervision**, and **Academic Institution**.
  - Added a horizontal thesis scope meta bar beneath the cards to present key comparative parameters (Chhattisgarh & Jharkhand, 400 Surveys & 40 Interviews, FY 2018–19 to FY 2022–23).
  - Maintained zero vertical overflow within the `100vh` scroll-snap viewport across desktop and laptop displays, with full responsive adaptation for mobile devices.

---

## 2026-08-01

### Add "Research Summary" Slide to Homepage

- **`index.html`**: Added a new "Research Summary — At a Glance" slide at the end of the homepage. Used a compact 4-column grid of tiny glass cards to summarize all 7 key sections of the thesis (Study Design, Framework, Objectives, Key Findings, Hypotheses, Recommendations, Contributions) with a hover-swap state that replaces the title and icon with detailed information.
- **`ARCHITECTURE.md`**: Updated `index.html` slide count to 4 (total: 95 slides).

### Update CES Slide in Chapter 01

- **`chapter-01.html`**: Updated the Communication Effectiveness Score (CES) slide. Replaced Font Awesome icons with emojis (📡, 🗣️, 🔄, ⏱️, 💡) and added a CSS-based content swap on hover so the default icon/title is replaced by descriptive hover text while scaling to 1.5x.

### Add "Understanding the Thesis Title" Slide to Chapter 01

- **`chapter-01.html`**: Inserted new slide breaking down the thesis title into 4 core components in a 2x2 grid (Corporate Social Responsibility, CSR Communication, Betterment of Society, Chhattisgarh & Jharkhand) with glass-card styling, icons, and hover magnification (1.5x). Positioned after Introduction slide and before CSR in India slide.
- **`ARCHITECTURE.md`**: Updated Chapter 01 slide count to 15 (total: 94 slides).

---

## 2026-07-03

### Add India's Development Landscape Slide to Chapter 01

- **`chapter-01.html`**: Inserted a new slide titled "India's Development Landscape (2015–2026)".
  - Completely removed the "India's Development Landscape (2015–2026)" slide as per user request.

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
