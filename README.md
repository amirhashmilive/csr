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

## Key Features
- **Scroll-Snap Navigation:** Full-page sections that snap into place.
- **Theme Engine:** Fully persistent dark and light modes.
- **Interactive Charts:** 22+ charts built with Chart.js that automatically update colors when the theme changes.
- **Popup Insights:** A custom event-delegated popup system explaining formulas, effect sizes (Cohen's d), and significance tests for key metrics.
- **Fully Responsive:** Adapts from mobile screens up to large presentation displays.

## Technology Stack
- HTML5 / CSS3 (Custom properties, Flexbox/Grid, Animations)
- Vanilla JavaScript (ES6+)
- Chart.js 4.4.0 (via CDN)
- Font Awesome 6 (via CDN)
- Google Fonts (Inter)

## How to Run
Simply open `index.html` in any modern web browser. No local server or build process is required.
