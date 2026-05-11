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




// Apply different scale classes based on card width
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.hover-magnify');
    cards.forEach(card => {
        const width = card.offsetWidth;
        const height = card.offsetHeight;
        
        if (width < 150 || height < 100) {
            card.classList.add('hover-magnify-sm');
        } else if (width >= 150 && width <= 300) {
            card.classList.add('hover-magnify-md');
        } else if (width > 300) {
            card.classList.add('hover-magnify-lg');
        }
    });
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
