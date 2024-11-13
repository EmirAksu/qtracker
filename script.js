// script.js

// Function to initialize the grid with dots
function initializeGrid() {
    const grid = document.getElementById('grid');
    const today = new Date().toLocaleDateString();
    const days = 30; // Number of days to display, e.g., one month

    for (let i = 0; i < days; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        // Check if today's dot should be active
        if (localStorage.getItem(today) !== 'inactive') {
            dot.classList.add('active'); // Set as active by default
        }

        // Toggle dot on click
        dot.addEventListener('click', () => {
            toggleDot(dot, today);
        });

        grid.appendChild(dot);
    }
    updateStreakDisplay();
}

// Function to toggle dot active/inactive
function toggleDot(dot, dateKey) {
    if (dot.classList.contains('active')) {
        dot.classList.remove('active');
        localStorage.setItem(dateKey, 'inactive');
        resetStreak(); // Reset streak if a day is marked inactive
    } else {
        dot.classList.add('active');
        localStorage.setItem(dateKey, 'active');
        updateStreak(); // Update streak if a day is marked active
    }
    updateStreakDisplay();
}

// Function to handle daily check-in and streak logic
function autoCheckIn() {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toLocaleDateString();

    // Start a new streak if today is active and yesterday was too
    if (localStorage.getItem(today) !== 'inactive') {
        if (localStorage.getItem(yesterdayKey) === 'active') {
            updateStreak();
        } else {
            resetStreak();
        }
    }
}

// Function to update the streak count in local storage
function updateStreak() {
    let currentStreak = parseInt(localStorage.getItem('streak') || '0', 10);
    localStorage.setItem('streak', currentStreak + 1);
}

// Function to reset the streak count in local storage
function resetStreak() {
    localStorage.setItem('streak', 0);
}

// Function to display the streak count on the page