document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference, otherwise use dark as default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Create theme toggle button if it doesn't exist
    let toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle light/dark mode');
        document.body.appendChild(toggleBtn);
    }

    updateIcon(savedTheme);

    // Toggle theme on click
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Brief transition class for smooth CSS variable propagation
        document.documentElement.classList.add('theme-transitioning');
        setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 450);

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);

        // Dispatch custom event so charts can re-render with new colors
        window.dispatchEvent(new Event('themeChanged'));
    });

    /**
     * Update the toggle button content.
     * When in dark mode  → show "☀ Light"  (clicking switches TO light)
     * When in light mode → show "☽ Dark"   (clicking switches TO dark)
     */
    function updateIcon(theme) {
        if (!toggleBtn) return;
        if (theme === 'dark') {
            toggleBtn.innerHTML =
                '<i class="fas fa-sun" aria-hidden="true"></i>' +
                '<span class="toggle-label">Light</span>';
        } else {
            toggleBtn.innerHTML =
                '<i class="fas fa-moon" aria-hidden="true"></i>' +
                '<span class="toggle-label">Dark</span>';
        }
    }
});
