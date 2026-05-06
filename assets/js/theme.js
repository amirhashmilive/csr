document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference, otherwise use dark as default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    // Create theme toggle button if it doesn't exist
    let toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        document.body.appendChild(toggleBtn);
    }

    // Toggle theme on click
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);

        // Dispatch custom event so charts can re-render with new colors
        window.dispatchEvent(new Event('themeChanged'));
    });

    function updateIcon(theme) {
        if (toggleBtn) {
            toggleBtn.innerHTML = theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }
});
