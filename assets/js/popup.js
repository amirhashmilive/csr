const popupData = {
    'ces-cg': {
        title: 'Communication Effectiveness Score (CES) - Chhattisgarh',
        formula: 'CES = (Awareness × 0.2) + (Clarity × 0.3) + (Language × 0.3) + (Channel × 0.2)',
        rawData: 'Score: 2.67 | n = 200',
        whyMatters: 'Demonstrates the efficacy of Chhattisgarh\'s verbal, community-embedded communication model. This serves as the benchmark for effective CSR communication in tribal areas.'
    },
    'ces-jh': {
        title: 'Communication Effectiveness Score (CES) - Jharkhand',
        formula: 'CES = (Awareness × 0.2) + (Clarity × 0.3) + (Language × 0.3) + (Channel × 0.2)',
        rawData: 'Score: 1.89 | n = 200',
        whyMatters: 'Highlights a critical shortfall in Jharkhand\'s institutional reliance. The lower score directly correlates with lower perceived impact.'
    },
    'cohens-d': {
        title: 'Cohen\'s d Effect Size',
        formula: 'd = (M₁ - M₂) / SD_pooled = (2.67 - 1.89) / 0.63',
        rawData: 'd = 1.24 (Large Effect)',
        whyMatters: 'An effect size > 0.8 is considered large. A d of 1.24 indicates a monumental, statistically significant gap between the two states that cannot be attributed to chance.'
    },
    'clarity-gap': {
        title: 'Clarity of Communication Gap',
        formula: 'Gap = % CG (Clear) - % JH (Clear)',
        rawData: 'CG: 86% | JH: 60% | Gap: 26 points',
        whyMatters: '40% of beneficiaries in Jharkhand find CSR communication unclear. Without clarity, the intended societal betterment cannot be fully realized or appreciated.'
    },
    'language-gap': {
        title: 'Local Language Usage Gap',
        formula: 'Gap = % CG (Local) - % JH (Local)',
        rawData: 'CG: 80% | JH: 54% | Gap: 26 points',
        whyMatters: 'Language is a structural barrier. Failure to communicate in local/tribal dialects in Jharkhand leads to marginalization of the target beneficiaries.'
    },
    'awareness-gap': {
        title: 'CSR Initiative Awareness Gap',
        formula: 'Gap = % CG (Aware) - % JH (Aware)',
        rawData: 'CG: 78% | JH: 65% | Gap: 13 points',
        whyMatters: 'Awareness is the foundational step of the Five-Pillar Framework. If beneficiaries are unaware, subsequent steps (engagement, impact) fail.'
    },
    'identification-gap': {
        title: 'Corporate Identification Gap',
        formula: 'Gap = % CG (Accurate) - % JH (Accurate)',
        rawData: 'Accurate ID: CG 52% | JH 38% (Incorrect: CG 18% | JH 32%)',
        whyMatters: 'Jharkhand\'s incorrect identification rate is nearly double that of Chhattisgarh, indicating poor brand visibility and disconnected implementation.'
    },
    'qol-gap': {
        title: 'Perceived Quality of Life Improvement',
        formula: 'Gap = % CG (Improved) - % JH (Improved)',
        rawData: 'CG: 80% | JH: 62% | Gap: 18 points',
        whyMatters: 'This represents the largest gap in specific impact indicators. Four out of five CG beneficiaries feel their life improved, directly linked to better communication.'
    },
    'h1-ttest': {
        title: 'Hypothesis 1: Independent Samples t-test',
        formula: 't = (M₁ - M₂) / SE',
        rawData: 't(398) = 12.41, p < 0.001',
        whyMatters: 'Statistically confirms that the difference in Communication Effectiveness Scores between Chhattisgarh and Jharkhand is highly significant.'
    },
    'h2-regression': {
        title: 'Hypothesis 2: Binary Logistic Regression',
        formula: 'Log(p/1-p) = β₀ + β₁(CES)',
        rawData: 'χ²(2) = 118.65, p < 0.001, Nagelkerke R² = 0.31, OR = 4.8',
        whyMatters: 'Proves that effective communication increases the odds of educational improvement by nearly five times (quintuples).'
    },
    'h3-anova': {
        title: 'Hypothesis 3: Two-Way ANOVA',
        formula: 'DV: Healthcare | IV1: State | IV2: Channel',
        rawData: 'Interaction: F(3,389) = 5.14, p = 0.002',
        whyMatters: 'Reveals a nuanced finding: Even in the lower-performing state (JH), verbal channels yield significantly higher healthcare perception than print/electronic.'
    },
    'h4-chisq': {
        title: 'Hypothesis 4: Chi-Square Test of Independence',
        formula: 'χ² = Σ (O - E)² / E',
        rawData: 'χ²(3) = 24.88, p < 0.001, Cramer\'s V = 0.25',
        whyMatters: 'Shows a significant association between communication channels and environmental impact recognition, with verbal channels performing best (62.2%).'
    },
    'h5-mlr': {
        title: 'Hypothesis 5: Multiple Linear Regression',
        formula: 'Livelihood Impact = β₁(CES) + β₂(State) + C',
        rawData: 'R² = 0.50, F(2,397) = 397.65, p < 0.001, β(CES) = 0.67',
        whyMatters: 'Demonstrates that Communication Effectiveness is a much stronger predictor of livelihood impact (β=0.67) than merely which state the beneficiary lives in (β=0.15).'
    },
    'sector-anova': {
        title: 'Sectoral Satisfaction ANOVA',
        formula: 'One-Way ANOVA comparing Banking, Metal, Energy, Cement',
        rawData: 'F(3,396) = 12.33, p < 0.001, η² = 0.09. Banking Mean = 2.44',
        whyMatters: 'Empirically establishes that the Banking/Financial sector outperforms heavy industries in CSR communication satisfaction.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup content structure
    overlay.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-times popup-close"></i>
            <h2 id="popup-title" class="neon-text-cg"></h2>
            
            <div style="margin-top: 1.5rem; background: var(--bg-glass); padding: 1rem; border-radius: 8px;">
                <h4 style="color: var(--accent-jh); margin-bottom: 0.5rem;"><i class="fas fa-calculator"></i> Formula / Calculation</h4>
                <p id="popup-formula" style="font-family: monospace;"></p>
            </div>
            
            <div style="margin-top: 1.5rem;">
                <h4 style="color: var(--accent-cg); margin-bottom: 0.5rem;"><i class="fas fa-database"></i> Raw Data</h4>
                <p id="popup-raw" style="font-size: 1.1rem; font-weight: 600;"></p>
            </div>

            <div style="margin-top: 1.5rem; border-left: 4px solid var(--success-color); padding-left: 1rem;">
                <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-lightbulb"></i> Why It Matters</h4>
                <p id="popup-why" style="line-height: 1.6;"></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);

    const titleEl = document.getElementById('popup-title');
    const formulaEl = document.getElementById('popup-formula');
    const rawEl = document.getElementById('popup-raw');
    const whyEl = document.getElementById('popup-why');
    const closeBtn = document.querySelector('.popup-close');

    // Event Delegation for popup triggers
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-popup]');
        if (trigger) {
            const popupId = trigger.getAttribute('data-popup');
            const data = popupData[popupId];
            
            if (data) {
                titleEl.textContent = data.title;
                formulaEl.textContent = data.formula;
                rawEl.textContent = data.rawData;
                whyEl.textContent = data.whyMatters;
                
                overlay.classList.add('active');
            }
        }
    });

    // Close popup functionality
    const closePopup = () => overlay.classList.remove('active');
    
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });
});
