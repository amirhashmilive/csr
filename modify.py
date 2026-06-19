
import re

file_path = "chapter-03.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pillar_5_html = """

            <h3 style="text-align: center; margin-bottom: 1rem; color: var(--accent-cg); font-size: 1.1rem; margin-top: 2rem;">Pillar 5 Breakdown</h3>
            <div class="grid-3" style="max-width: 900px; margin: 0 auto; gap: 1rem;">
                <div class="glass-card hover-magnify" style="text-align: center; padding: 1.2rem;">
                    <i class="fas fa-comments" style="font-size: 1.8rem; color: var(--accent-jh); margin-bottom: 0.8rem;"></i>
                    <h4 style="font-size: 1rem;">Channels</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Verbal, Print, Electronic, Social Media</p>
                </div>
                
                <div class="glass-card hover-magnify" style="text-align: center; padding: 1.2rem;">
                    <i class="fas fa-language" style="font-size: 1.8rem; color: var(--success-color); margin-bottom: 0.8rem;"></i>
                    <h4 style="font-size: 1rem;">Language</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Use of native/tribal dialects vs Hindi/English</p>
                </div>
                
                <div class="glass-card hover-magnify" style="text-align: center; padding: 1.2rem;">
                    <i class="fas fa-sync" style="font-size: 1.8rem; color: var(--warning-color); margin-bottom: 0.8rem;"></i>
                    <h4 style="font-size: 1rem;">Feedback</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Existence of two-way grievance mechanisms</p>
                </div>
            </div>"""

# Remove Slide 2
content = re.sub(r"        <!-- Slide 2: The Five-Pillar Framework -->.*?        </section>\n", "", content, flags=re.DOTALL)

# Remove Slide 3
content = re.sub(r"        <!-- Slide 3: Why Communication Matters More Than Spending -->.*?        </section>\n", "", content, flags=re.DOTALL)

# Insert Pillar 5 Breakdown into Slide 7
target_slide_7 = """                    <p style="text-align: center; font-size: 0.85rem; color: var(--warning-color); margin-top: 2rem; font-style: italic;">* NGO/Implementers act as intermediaries</p>
                </div>
            </div>"""
content = content.replace(target_slide_7, target_slide_7 + pillar_5_html)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated chapter-03.html successfully.")

