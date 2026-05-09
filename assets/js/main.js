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

// Lightbox Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.timeline-click');
    if (triggers.length > 0) {
        // Collect images
        const images = [];
        triggers.forEach((el, index) => {
            images.push(el.getAttribute('data-image'));
            el.setAttribute('data-index', index);
        });

        // Create Lightbox HTML
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img class="lightbox-img" src="" alt="Timeline Image">
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
                <div class="lightbox-counter">1 / 3</div>
            </div>
        `;
        document.body.appendChild(overlay);

        const imgEl = overlay.querySelector('.lightbox-img');
        const counterEl = overlay.querySelector('.lightbox-counter');
        const closeBtn = overlay.querySelector('.lightbox-close');
        const prevBtn = overlay.querySelector('.lightbox-prev');
        const nextBtn = overlay.querySelector('.lightbox-next');
        
        let currentIndex = 0;

        function showImage(index) {
            currentIndex = index;
            if (currentIndex < 0) currentIndex = images.length - 1;
            if (currentIndex >= images.length) currentIndex = 0;
            imgEl.src = images[currentIndex];
            counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
        }

        function openLightbox(index) {
            showImage(index);
            overlay.classList.add('active');
        }

        function closeLightbox() {
            overlay.classList.remove('active');
        }

        triggers.forEach(el => {
            el.addEventListener('click', (e) => {
                const idx = parseInt(el.getAttribute('data-index'), 10);
                openLightbox(idx);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-counter')) {
                closeLightbox();
            }
        });

        prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentIndex + 1);
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
