// Global object to store chart instances so they can be destroyed before re-rendering
const chartInstances = {};

// Theme-aware color getter
function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        textColor: isDark ? '#f8f9ff' : '#1a1a24',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        cgPrimary: isDark ? '#00d4ff' : '#0066cc', // Cyan/Blue
        jhPrimary: isDark ? '#ff6b35' : '#cc4400', // Orange
        cgSecondary: isDark ? 'rgba(0, 212, 255, 0.5)' : 'rgba(0, 102, 204, 0.5)',
        jhSecondary: isDark ? 'rgba(255, 107, 53, 0.5)' : 'rgba(204, 68, 0, 0.5)',
        other1: isDark ? '#a020f0' : '#8a2be2', // Purple
        other2: isDark ? '#00fa9a' : '#2e8b57', // Green
        other3: isDark ? '#ffd700' : '#daa520'  // Gold
    };
}

// Chart defaults
Chart.defaults.font.family = "'Inter', sans-serif";

function createChart(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Destroy existing chart if it exists
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    const colors = getChartColors();
    Chart.defaults.color = colors.textColor;
    Chart.defaults.scale.grid.color = colors.gridColor;

    // Build the chart
    chartInstances[canvasId] = new Chart(canvas, {
        type: type,
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: colors.textColor }
                },
                ...options.plugins
            },
            ...options
        }
    });
}

// Global initialization function (called from specific HTML pages)
window.initCharts = function() {
    // This will be overridden or called by page-specific scripts
    // Example: if (typeof renderPageCharts === 'function') renderPageCharts();
    if (typeof window.renderPageCharts === 'function') {
        window.renderPageCharts(getChartColors());
    }
};

// Listen for theme changes to re-render charts
window.addEventListener('themeChanged', () => {
    window.initCharts();
});

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Small timeout to ensure canvas elements are ready
    setTimeout(() => {
        window.initCharts();
    }, 100);
});
