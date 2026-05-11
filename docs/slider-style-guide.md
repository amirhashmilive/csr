# Slider Style Guide

This project includes a generic, reusable image slider (lightbox) component designed for full-screen image viewing with navigation support.

## Required Files

Ensure the following files are imported in your HTML or globally available:

1. **CSS**: `<link rel="stylesheet" href="assets/css/slider-styles.css">`
2. **JavaScript**: `<script src="assets/js/slider.js"></script>`

*(Note: `style.css` may already import `slider-styles.css` globally, and `main.js` may load `slider.js` depending on the project setup.)*

## How to Create a Slider Group

A slider group consists of one or more clickable HTML elements. When any element is clicked, a lightbox opens showing its associated image. You can navigate between all images in the same group using the previous/next arrows or keyboard navigation.

### 1. HTML Structure Required

To make any element trigger the slider, you must add:
1. A **trigger class** (e.g., `pillar-click` or `timeline-click`). All elements sharing the same class will be grouped together in the same slider.
2. The `data-image` attribute containing the URL or path to the image.
3. (Optional but recommended) `cursor: pointer;` to indicate interactivity.

**Example Card:**

```html
<div class="glass-card my-custom-click-class" style="cursor: pointer;" data-image="assets/images/my-image.webp">
    <h3>Card Title</h3>
    <p>Click me to view the image!</p>
</div>
```

### 2. Adding Multiple Images per Card (Group Navigation)

To create a slider that navigates through multiple images, simply apply the *exact same trigger class* to multiple elements. 

The slider will automatically group them in the order they appear in the DOM.

```html
<!-- Clicking either of these will open a slider with 2 images -->
<div class="my-custom-click-class" data-image="image1.webp">Image 1</div>
<div class="my-custom-click-class" data-image="image2.webp">Image 2</div>
```

### 3. JavaScript Initialization

By default, the `slider.js` file automatically initializes two specific classes on DOM load:
- `.timeline-click` (used in Evolution of CSR)
- `.pillar-click` (used in CSR Communication)

If you are using one of these classes, no further JS is needed.

**Custom Initializations:**
If you want to create a new slider group with a different class, call the `initLightbox(triggerSelector, lightboxClass)` function. 

This should be done after the DOM is loaded:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Initializes all elements with class 'my-custom-click-class'
    initLightbox('.my-custom-click-class', 'custom-group');
});
```

### Summary of Features

- **Responsive**: Adapts to mobile and desktop screens.
- **Keyboard Support**: Left/Right arrows to navigate, ESC to close.
- **Click to Close**: Click the 'X' button or anywhere on the dark overlay background to close.
- **No Dependencies**: Built entirely with Vanilla JavaScript and CSS.
