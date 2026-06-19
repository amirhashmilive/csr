# AGENTS.md — Master AI Agent Instructions

## Project Identity

- **Project:** PhD Thesis Presentation Website
- **Title:** "A Comparative Study on Betterment of Society through Corporate Social Responsibility Communication in Chhattisgarh and Jharkhand"
- **Scholar:** Sayed Amir Mustafa Hashmi (Enrolment No.: R/Ph.D. 005)
- **Repository:** https://github.com/amirhashmilive/csr.git
- **Branch:** `main`
- **Hosting:** Static HTML (no build, no server required — open `index.html` in browser)

---

## Critical Rules

1. **NEVER use the phrase "societal betterment."** Always write **"betterment of society"** (or its capitalised form). The JS in `main.js` auto-enforces this at runtime, but source content must also comply.
2. **Always use CSS custom properties** (`var(--text-main)`, `var(--accent-cg)`, etc.) instead of hardcoded hex colours. This ensures both dark and light themes render correctly.
3. **Slide structure is sacred.** Every content section lives inside `<section class="slide">…</section>` wrapped by `.slide-container`. Do not break this pattern.
4. **No build tools.** This is a pure HTML/CSS/JS static site. No npm, no bundlers, no frameworks.
5. **Do not remove or rename existing files** without explicit user instruction.
6. **Charts must be theme-aware.** All Chart.js charts use `renderPageCharts(colors)` with colours from `getChartColors()` in `charts.js`. Charts re-render on theme change.
7. **Slide numbers are dynamic.** Never hardcode slide numbers. The `slide-number.js` system handles all numbering automatically.
8. **Hover-magnify on cards:** All `.glass-card` elements with `.hover-magnify` scale to 1.5× on hover (1.02× on mobile). Cards wider than 400px auto-receive `.hover-magnify-lg` for gentler scaling.

---

## Session Startup

Before every session, read the following files in order:

1. `BOOTSTRAP.md` — Execution sequence
2. `CURRENT_TASK.md` — What to work on
3. `ARCHITECTURE.md` — Project structure
4. `CODING_STANDARD.md` — Coding rules
5. `MEMORY.md` — Decisions and context

---

## File Ownership

| File | Owner | Notes |
|---|---|---|
| `*.html` | Human + AI | AI edits with caution; human approves |
| `assets/css/style.css` | AI-managed | Design system, tokens, all styles |
| `assets/js/*.js` | AI-managed | All JS logic |
| `docs/*.md` | AI-managed | Style guides and references |
| `*.md` (root) | AI-managed | Project memory files |
| `pdf/**` | Human-only | Academic documents — never modify |
| `*.py` (root) | Utility | Export/conversion scripts |

---

## Commit Conventions

- **Format:** `<verb> <what> in <where>`
- **Examples:**
  - `Fix mobile responsiveness: Ensure card text is visible on small screens`
  - `Add Respondent Demographics slide for Q1-Q5`
  - `Update hypothesis slider to full slideshow with navigation`
- Keep commits atomic: one logical change per commit.
- Always update `CHANGELOG_AI.md` after making changes.
