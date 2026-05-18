document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate dot indicators based on number of slides
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        const dotContainer = document.createElement('div');
        dotContainer.className = 'progress-dots';
        
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            
            // Click to scroll
            dot.addEventListener('click', () => {
                slide.scrollIntoView({ behavior: 'smooth' });
            });
            
            dotContainer.appendChild(dot);
        });
        
        document.body.appendChild(dotContainer);

        // 2. Intersection Observer to update active dot
        const dots = document.querySelectorAll('.dot');
        const observerOptions = {
            root: document.querySelector('.slide-container'),
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.from(slides).indexOf(entry.target);
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[index]) dots[index].classList.add('active');
                    
                    // Trigger animations on slide entry
                    const animatedEls = entry.target.querySelectorAll('.glass-card, .slide-title, .slide-subtitle');
                    animatedEls.forEach(el => {
                        el.style.animation = 'none';
                        el.offsetHeight; /* trigger reflow */
                        el.style.animation = null; 
                    });
                }
            });
        }, observerOptions);

        slides.forEach(slide => observer.observe(slide));
    }

    // 3. Keyboard navigation (Up/Down arrows)
    const container = document.querySelector('.slide-container');
    if (container) {
        document.addEventListener('keydown', (e) => {
            const currentScroll = container.scrollTop;
            const viewportHeight = window.innerHeight;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                container.scrollBy({ top: viewportHeight, behavior: 'smooth' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                container.scrollBy({ top: -viewportHeight, behavior: 'smooth' });
            }
        });
    }
});





// =====================================================================
// CINEMATIC ENHANCEMENTS — Intersection Observer for slide fade-ins
// =====================================================================

(function initCinematicEffects() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    // First/hero slide is immediately visible
    if (slides[0]) slides[0].classList.add('is-visible');

    const slideContainer = document.querySelector('.slide-container');

    const cinematicObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var slide = entry.target;
                // Remove then re-add to retrigger CSS animation
                slide.classList.remove('is-visible');
                void slide.offsetWidth; // force reflow
                slide.classList.add('is-visible');
            }
        });
    }, {
        root: slideContainer,
        threshold: 0.25
    });

    slides.forEach(function(slide, i) {
        if (i === 0) return; // skip hero
        cinematicObserver.observe(slide);
    });
})();

// =====================================================================
// AUTOMATIC TEXT ENFORCEMENT
// =====================================================================
function enforceBettermentOfSociety() {
    const walkDOM = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.nodeValue;
            const regex = /societal\s+betterment/gi;
            if (regex.test(text)) {
                node.nodeValue = text.replace(regex, (match) => {
                    if (match === match.toUpperCase()) {
                        return "BETTERMENT OF SOCIETY";
                    } else if (match === match.toLowerCase()) {
                        return "betterment of society";
                    } else if (match.split(/\s+/).every(w => /^[A-Z]/.test(w))) {
                        return "Betterment of Society";
                    } else if (/^[A-Z]/.test(match)) {
                        return "Betterment of society";
                    }
                    return "betterment of society";
                });
                console.log("✅ Enforcement active: 'societal betterment' → 'betterment of society'");
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            for (let i = 0; i < node.childNodes.length; i++) {
                walkDOM(node.childNodes[i]);
            }
        }
    };
    
    // Only run if document.body is available
    if (document.body) {
        walkDOM(document.body);
    }
}

document.addEventListener('DOMContentLoaded', enforceBettermentOfSociety);
window.addEventListener('load', enforceBettermentOfSociety);

document.addEventListener('DOMContentLoaded', () => {
    const textObserver = new MutationObserver((mutations) => {
        let shouldEnforce = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0 || mutation.type === 'characterData') {
                shouldEnforce = true;
                break;
            }
        }
        if (shouldEnforce) {
            // Temporarily disconnect to avoid infinite loop when changing text
            textObserver.disconnect();
            enforceBettermentOfSociety();
            textObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
        }
    });

    if (document.body) {
        textObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
});

// =====================================================================
// AUTOMATIC HASH NAVIGATION (Scrolls to anchor links like #thesis-structure)
// =====================================================================
window.addEventListener('load', () => {
    if (window.location.hash) {
        setTimeout(() => {
            try {
                const targetSlide = document.querySelector(window.location.hash);
                if (targetSlide) {
                    targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (e) {
                console.error("Invalid hash target:", e);
            }
        }, 200); // Slight delay ensures layout rendering and CSS scroll-snapping are complete
    }
});

