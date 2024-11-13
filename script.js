// script.js

// Function to initialize the grid with dots
function initializeGrid() {
    const grid = document.getElementById('grid');
    const days = 30; // Number of days to display, e.g., one month

    for (let i = 0; i < days; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        // Check if this day should be active
        const dateKey = getDateKey(i);
        const activityLevel = parseInt(localStorage.getItem(dateKey) || '0', 10);

        if (activityLevel > 0) {
            dot.classList.add(`active-${activityLevel}`);
        }

        // Toggle dot activity on click
        dot.addEventListener('click', () => toggleDot(dot, dateKey));

        grid.appendChild(dot);
    }
    updateStreakDisplay();
}

// Function to toggle dot active/inactive and update streak
function toggleDot(dot, dateKey) {
    let activityLevel = parseInt(localStorage.getItem(dateKey) || '0', 10);
    activityLevel = (activityLevel + 1) % 5; // Cycle through 0 to 4

    // Update dot classes based on activity level
    dot.className = 'dot';
    if (activityLevel > 0) {
        dot.classList.add(`active-${activityLevel}`);
    }

    localStorage.setItem(dateKey, activityLevel);
    updateStreak();
    updateStreakDisplay();
}

// Helper function to get a date key for each dot
function getDateKey(offset) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    return date.toLocaleDateString();
}

// Function to update the streak count in local storage
function updateStreak() {
    let streak = 0;
    for (let i = 0; i < 30; i++) {
        const dateKey = getDateKey(i);
        if (parseInt(localStorage.getItem(dateKey) || '0', 10) > 0) {
            streak++;
        } else {
            break;
        }
    }
    localStorage.setItem('streak', streak);
}

// Function to display the streak count on the page
function updateStreakDisplay() {
    const streakDisplay = document.getElementById('streak');
    const currentStreak = localStorage.getItem('streak') || 0;
    streakDisplay.innerText = `Current Streak: ${currentStreak} days`;
}

// Initialize app
window.onload = function() {
    initializeGrid();
    updateStreak();
};