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

// Hover Popup Logic
document.addEventListener('DOMContentLoaded', () => {
    const hovers = document.querySelectorAll('.timeline-hover');
    if (hovers.length > 0) {
        const popup = document.createElement('div');
        popup.className = 'hover-image-popup';
        const img = document.createElement('img');
        popup.appendChild(img);
        document.body.appendChild(popup);

        hovers.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const src = el.getAttribute('data-image');
                if (src) {
                    img.src = src;
                    popup.classList.add('show');
                }
            });
            el.addEventListener('mouseleave', () => {
                popup.classList.remove('show');
            });
        });
    }
});
