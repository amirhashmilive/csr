// Lightbox Slider Logic
function initLightbox(triggerSelector, lightboxClass) {
    const triggers = document.querySelectorAll(triggerSelector);
    if (triggers.length === 0) return;

    // Collect images
    const images = [];
    triggers.forEach((el, index) => {
        images.push(el.getAttribute('data-image'));
        el.setAttribute('data-index', index);
    });

    // Create Lightbox HTML
    const overlay = document.createElement('div');
    overlay.className = `lightbox-overlay ${lightboxClass}-overlay`;
    overlay.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img class="lightbox-img" src="" alt="Image">
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
            <div class="lightbox-counter">1 / ${images.length}</div>
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

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initLightbox('.timeline-click', 'timeline');
    initLightbox('.pillar-click', 'pillar');
});
