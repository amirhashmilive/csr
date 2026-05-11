# Border Style Guide

This project includes a reusable, premium border class designed to match the visual styling of timeline milestones (like the "Pre 2014" marker). 

## CSS Class Name

**`.border-glow-blue`**

## Visual Description

Applying this class adds a thick, solid blue border accompanied by a subtle, glowing neon shadow. 
Specifically, the effect includes:
- **Border:** `4px solid`
- **Color:** Blue (using `var(--accent-cg)`)
- **Corners:** Rounded (`border-radius: 12px`)
- **Glow:** A soft blue neon box shadow (`box-shadow: var(--neon-glow)`)

## When to Use This Border

Use this border class when you want to heavily emphasize an interactive or highly important card element. It acts as a primary "highlight" state, drawing immediate visual attention while maintaining the site's cinematic aesthetic. This is the exact style currently used on the 5 pillar cards in the CSR Communication slide.

## How to Apply It

To apply this style to any container, simply add the `.border-glow-blue` class to its HTML class list.

**Example Implementation:**

```html
<!-- Applying the border to a standard glass card -->
<div class="glass-card border-glow-blue" style="text-align: center; padding: 1.5rem;">
    <h3>Premium Emphasized Card</h3>
    <p>This card now has the thick blue border and neon glow!</p>
</div>
```

**Note:** This class handles the border, border-radius, and shadow. It does *not* affect background colors, layout (like padding/flexbox), or text content. You can safely combine it with other utility classes like `.glass-card` or `.hover-magnify`.
