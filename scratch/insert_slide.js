const fs = require('fs');

const file = 'D:/DRIVE (Ai) Agents/00 Projects/Workplace CSR Slides/chapter-06.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `        </section>\r
\r
        <section class="slide">\r
            <div class="part-divider">PART A: QUANTITATIVE</div>\r
            <h2 class="slide-title">Q6: State Distribution</h2>`;

const replacement = `        </section>\r
\r
        <section class="slide">\r
            <div class="part-divider">PART A: QUANTITATIVE</div>\r
            <h2 class="slide-title">Respondent Demographics</h2>\r
            <div class="grid-3" style="margin-top: 2rem;">\r
                <div class="glass-card hover-magnify" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">\r
                    <i class="fas fa-user-shield" style="font-size: 2.5rem; color: var(--accent-cg); margin-bottom: 1rem;"></i>\r
                    <h3 style="color: var(--text-muted); font-size: 1rem; margin-bottom: 0.5rem;">Q1: Name</h3>\r
                    <p style="font-weight: 600; font-size: 1.1rem; margin: 0;">Not displayed (anonymized)</p>\r
                </div>\r
                <div class="glass-card hover-magnify" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">\r
                    <i class="fas fa-calendar-alt" style="font-size: 2.5rem; color: var(--accent-jh); margin-bottom: 1rem;"></i>\r
                    <h3 style="color: var(--text-muted); font-size: 1rem; margin-bottom: 0.5rem;">Q2: Age</h3>\r
                    <p style="font-weight: 600; font-size: 1.1rem; margin: 0;">31-45 years (predominant age group)</p>\r
                </div>\r
                <div class="glass-card hover-magnify" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">\r
                    <i class="fas fa-venus-mars" style="font-size: 2.5rem; color: var(--accent-cg); margin-bottom: 1rem;"></i>\r
                    <h3 style="color: var(--text-muted); font-size: 1rem; margin-bottom: 0.5rem;">Q3: Gender</h3>\r
                    <p style="font-weight: 600; font-size: 1.1rem; margin: 0;">50% Male | 50% Female</p>\r
                </div>\r
                <div class="glass-card hover-magnify" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">\r
                    <i class="fas fa-tractor" style="font-size: 2.5rem; color: var(--accent-jh); margin-bottom: 1rem;"></i>\r
                    <h3 style="color: var(--text-muted); font-size: 1rem; margin-bottom: 0.5rem;">Q4: Occupation</h3>\r
                    <p style="font-weight: 600; font-size: 1.1rem; margin: 0;">Agriculture, Daily wage labour</p>\r
                </div>\r
                <div class="glass-card hover-magnify" style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">\r
                    <i class="fas fa-map-marked-alt" style="font-size: 2.5rem; color: var(--accent-cg); margin-bottom: 1rem;"></i>\r
                    <h3 style="color: var(--text-muted); font-size: 1rem; margin-bottom: 0.5rem;">Q5: Address</h3>\r
                    <p style="font-weight: 600; font-size: 1.1rem; margin: 0;">10 districts across CG and JH</p>\r
                </div>\r
            </div>\r
        </section>\r
\r
        <section class="slide">\r
            <div class="part-divider">PART A: QUANTITATIVE</div>\r
            <h2 class="slide-title">Q6: State Distribution</h2>`;

content = content.replace(targetStr, replacement);

const targetStr2 = targetStr.replace(/\r/g, '');
const replacement2 = replacement.replace(/\r/g, '');

content = content.replace(targetStr2, replacement2);

fs.writeFileSync(file, content, 'utf8');
console.log('Slide inserted');
