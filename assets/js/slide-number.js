/**
 * slide-number.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Dynamic slide-number badge system for the PhD Thesis Presentation website.
 *
 * Features:
 *  • Auto-detects all .slide elements on the current page
 *  • Infers chapter label from the filename (chapter-01 → "Ch 01", etc.)
 *  • Injects a glassmorphism badge at the top-right of every slide showing
 *    "Ch XX, Slide N"
 *  • Hover over badge → dropdown listing all slides in the chapter with
 *    clickable jump links (scrolls the snap container to that slide)
 *  • Works with dark / light mode (uses CSS custom properties)
 *  • Console-logs the detected slide count per page
 *  • Warns when count is outside an expected range (1–50)
 *  • Fully dynamic – no hardcoded numbers. Adding/removing slides is automatic.
 *
 * Usage: Add before </body> in every HTML file:
 *   <script src="assets/js/slide-number.js"></script>
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function SlideNumberSystem() {
    'use strict';

    // ─── 1. CONFIG ────────────────────────────────────────────────────────────

    /** Expected slide count range for sanity check [min, max] */
    const EXPECTED_RANGE = [1, 50];

    /**
     * Maps filename keyword → display chapter label.
     * Supplemental pages (index, appendices, etc.) get generic labels.
     */
    const CHAPTER_MAP = {
        'chapter-01': 'Ch 01',
        'chapter-02': 'Ch 02',
        'chapter-03': 'Ch 03',
        'chapter-04': 'Ch 04',
        'chapter-05': 'Ch 05',
        'chapter-06': 'Ch 06',
        'chapter-07': 'Ch 07',
        'index':      'Home',
        'appendices': 'Appendix',
        'bibliography': 'Bibliography',
        'academic-engagements': 'Engagements',
    };

    // ─── 2. DETECT CHAPTER LABEL ─────────────────────────────────────────────

    function getChapterLabel() {
        const path = window.location.pathname;
        // Extract the filename without extension (e.g. "chapter-01")
        const filename = path.split('/').pop().replace(/\.[^.]+$/, '');

        for (const key of Object.keys(CHAPTER_MAP)) {
            if (filename === key) return CHAPTER_MAP[key];
        }

        // Fallback: try partial match (e.g. served from root as just "chapter-01")
        for (const key of Object.keys(CHAPTER_MAP)) {
            if (filename.includes(key)) return CHAPTER_MAP[key];
        }

        // Final fallback: show cleaned filename
        return filename || 'Page';
    }

    // ─── 3. GET SLIDE TITLE ───────────────────────────────────────────────────

    /**
     * Tries to extract a short human-readable title from a slide element for
     * the dropdown list. Uses h1 > h2 > h3 > aria-label > "Slide N" in order.
     */
    function getSlideTitle(slide, index) {
        const heading = slide.querySelector('h1, h2[class*="title"], h2, h3[class*="title"], h3');
        if (heading) {
            const text = heading.textContent.trim();
            if (text.length > 0) {
                return text.length > 42 ? text.slice(0, 40) + '…' : text;
            }
        }
        return 'Slide ' + (index + 1);
    }

    // ─── 4. BUILD & INJECT BADGES ────────────────────────────────────────────

    function init() {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const totalSlides = slides.length;
        const chapterLabel = getChapterLabel();

        // ── Console report ──────────────────────────────────────────────────
        console.log(
            '%c[SlideNumber] %c' + chapterLabel + ' — ' + totalSlides + ' slide(s) detected.',
            'color:#00d4ff;font-weight:700;',
            'color:inherit;'
        );

        // ── Sanity check ─────────────────────────────────────────────────────
        if (totalSlides < EXPECTED_RANGE[0] || totalSlides > EXPECTED_RANGE[1]) {
            console.warn(
                '[SlideNumber] ⚠️  Slide count (' + totalSlides + ') is outside expected range ' +
                '[' + EXPECTED_RANGE[0] + '–' + EXPECTED_RANGE[1] + ']. ' +
                'Please verify the page structure.'
            );
        }

        if (totalSlides === 0) return;

        const slideContainer = document.querySelector('.slide-container');

        // Pre-collect titles for the dropdown
        const slideTitles = slides.map((slide, i) => getSlideTitle(slide, i));

        slides.forEach(function (slide, index) {
            const slideNum = index + 1;
            const label = chapterLabel + ', Slide ' + slideNum;

            // Ensure slide is positioned so the badge can use position: absolute
            const computedPos = window.getComputedStyle(slide).position;
            if (computedPos === 'static') {
                slide.style.position = 'relative';
            }

            // ── Badge wrapper ────────────────────────────────────────────────
            const badge = document.createElement('div');
            badge.className = 'sn-badge';
            badge.setAttribute('aria-label', label + ' navigation');
            badge.setAttribute('role', 'navigation');

            // ── Badge label ──────────────────────────────────────────────────
            const badgeLabel = document.createElement('span');
            badgeLabel.className = 'sn-badge__label';
            badgeLabel.textContent = label;

            // ── Caret icon ───────────────────────────────────────────────────
            const caret = document.createElement('span');
            caret.className = 'sn-badge__caret';
            caret.innerHTML = '&#9662;'; // ▾

            // ── Dropdown ─────────────────────────────────────────────────────
            const dropdown = document.createElement('div');
            dropdown.className = 'sn-dropdown';
            dropdown.setAttribute('role', 'list');

            const header = document.createElement('div');
            header.className = 'sn-dropdown__header';
            header.textContent = chapterLabel + ' — All Slides';
            dropdown.appendChild(header);

            slides.forEach(function (targetSlide, targetIndex) {
                const item = document.createElement('button');
                item.className = 'sn-dropdown__item';
                if (targetIndex === index) item.classList.add('sn-dropdown__item--active');
                item.setAttribute('role', 'listitem');
                item.type = 'button';

                const numSpan = document.createElement('span');
                numSpan.className = 'sn-dropdown__num';
                numSpan.textContent = (targetIndex + 1);

                const titleSpan = document.createElement('span');
                titleSpan.className = 'sn-dropdown__title';
                titleSpan.textContent = slideTitles[targetIndex];

                item.appendChild(numSpan);
                item.appendChild(titleSpan);

                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close dropdown after navigation
                    badge.classList.remove('sn-badge--open');
                });

                dropdown.appendChild(item);
            });

            badge.appendChild(badgeLabel);
            badge.appendChild(caret);
            badge.appendChild(dropdown);
            slide.appendChild(badge);

            // ── Toggle dropdown on click ──────────────────────────────────────
            badge.addEventListener('click', function (e) {
                e.stopPropagation();
                // Close all other open badges first
                document.querySelectorAll('.sn-badge--open').forEach(function (b) {
                    if (b !== badge) b.classList.remove('sn-badge--open');
                });
                badge.classList.toggle('sn-badge--open');
            });
        });

        // ── Close dropdown when clicking outside ─────────────────────────────
        document.addEventListener('click', function () {
            document.querySelectorAll('.sn-badge--open').forEach(function (b) {
                b.classList.remove('sn-badge--open');
            });
        });

        // ── Update active badge as user scrolls between slides ────────────────
        if (slideContainer) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const badge = entry.target.querySelector('.sn-badge');
                        if (badge) {
                            // Subtle pulse when badge enters view
                            badge.classList.add('sn-badge--entered');
                        }
                    }
                });
            }, {
                root: slideContainer,
                threshold: 0.5
            });

            slides.forEach(function (slide) { observer.observe(slide); });
        }

        console.log('%c[SlideNumber] ✅ Badges injected for all ' + totalSlides + ' slides.', 'color:#00e676;');
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
