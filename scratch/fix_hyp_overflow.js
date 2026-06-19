const fs = require('fs');
const file = 'D:/DRIVE (Ai) Agents/00 Projects/Workplace CSR Slides/chapter-06.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Change .hyp-result-card CSS
content = content.replace(
    /(\.hyp-result-card\s*\{\s*[\s\S]*?padding:\s*)2rem(;\s*[\s\S]*?border-radius:\s*)16px/g,
    '$1 1rem 1.5rem$2 12px'
);

content = content.replace(
    /(\.hyp-result-card\s*\{\s*[\s\S]*?border-radius:\s*)16px(;\s*[\s\S]*?padding:\s*)2rem/g,
    '$1 12px$2 1rem 1.5rem'
);

// 2. Change grid container inline style
content = content.replace(
    '<div class="grid-2" style="width: 100%; max-width: 1000px; margin-top: 1.5rem;">',
    '<div class="grid-2" style="width: 100%; max-width: 1000px; margin-top: 1rem; gap: 1rem;">'
);

// 3. Change margin-top for paragraphs in the slide
content = content.replace(/<p style="margin-top: 1rem; color: var\(--text-muted\);">/g, '<p style="margin-top: 0.5rem; color: var(--text-muted); font-size: 0.95rem;">');

// 4. Change the title's margin if possible to save space
content = content.replace(
    '<h3 class="slide-subtitle">5 Hypotheses Validated via Statistical Modeling</h3>',
    '<h3 class="slide-subtitle" style="margin-bottom: 0;">5 Hypotheses Validated via Statistical Modeling</h3>'
);

// 5. Change font-size of popup-triggers inside this specific slide
content = content.replace(/<h3 class="popup-trigger"/g, '<h3 class="popup-trigger" style="font-size: 1.1rem; margin: 0;"');

fs.writeFileSync(file, content, 'utf8');
console.log('Hypothesis slide fixed.');
