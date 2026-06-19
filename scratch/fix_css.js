const fs = require('fs');
const filePath = 'D:/DRIVE (Ai) Agents/00 Projects/Workplace CSR Slides/chapter-06.html';
let content = fs.readFileSync(filePath, 'utf-8');

// We need to replace the .q-badge-container and .q-badge-group styles
const newCss = `
        .q-badge-container {
            position: absolute;
            left: 2rem;
            top: 0;
            bottom: 0;
            margin: auto;
            height: fit-content;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1.5rem;
            z-index: 150;
        }
        
        .q-badge-group {
            display: flex;
        }

        .q-badge-wrapper {
            position: relative;
            cursor: pointer;
            z-index: 10;
        }

        .q-badge-glow {
            position: absolute;
            inset: -3px;
            border-radius: 20px;
            background: linear-gradient(137deg, #00d4ff, #0066cc, #00d4ff);
            opacity: 0.5;
            filter: blur(8px);
            transition: opacity 0.3s ease;
            z-index: 0;
            pointer-events: none;
        }

        .q-badge {
            position: relative;
            background: var(--resource-card-bg, rgba(20, 20, 25, 0.7));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid var(--resource-card-border, rgba(255,255,255,0.1));
            border-radius: 20px;
            padding: 0.4rem 1rem;
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-main);
            transition: all 0.3s ease;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .q-badge-wrapper:hover .q-badge {
            border-color: var(--bg-glass-border);
            box-shadow: var(--neon-glow);
            transform: scale(1.05);
        }

        .q-badge-wrapper:hover .q-badge-glow {
            opacity: 0.9;
        }

        .q-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 998;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }

        .q-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            width: 80%;
            max-width: 600px;
            background: var(--resource-card-bg, rgba(17, 17, 17, 0.95));
            border: 1px solid var(--resource-card-border, rgba(255,255,255,0.15));
            border-radius: 24px;
            padding: 3rem;
            text-align: center;
            font-size: 1.8rem;
            font-weight: 600;
            color: var(--text-main);
            box-shadow: 0 15px 40px rgba(0,0,0,0.6), var(--neon-glow);
            opacity: 0;
            pointer-events: none;
            z-index: 999;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        html[data-theme="light"] .q-popup,
        html[data-theme="light"] .q-badge {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(0,0,0,0.1);
        }

        .q-badge-wrapper:hover ~ .q-overlay {
            opacity: 1;
        }

        .q-badge-wrapper:hover ~ .q-popup {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
`;

const cssStart = content.indexOf('.q-badge-container {');
const cssEnd = content.indexOf('</style>', cssStart);

content = content.substring(0, cssStart) + newCss.trim() + "\n    " + content.substring(cssEnd);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed CSS');
