// Get all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const scoreDisplay = document.getElementById('score');

// Total number of questions
const totalQuestions = 101;

// Function to calculate and update score
function updateScore() {
    // Count how many checkboxes are checked
    const checkedCount = document.querySelectorAll('input[type="checkbox"]:checked').length;
    
    // Calculate purity score (100 minus number of checked items)
    const purityScore = totalQuestions - checkedCount;
    
    // Update the score display
    scoreDisplay.textContent = purityScore;
    
    // Save to localStorage so score persists on page reload
    saveProgress();
}

// Function to save progress to localStorage
function saveProgress() {
    const progress = {};
    checkboxes.forEach((checkbox) => {
        progress[checkbox.id] = checkbox.checked;
    });
    localStorage.setItem('purityTestProgress', JSON.stringify(progress));
}

// Function to load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('purityTestProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        checkboxes.forEach((checkbox) => {
            if (progress[checkbox.id]) {
                checkbox.checked = true;
            }
        });
        updateScore();
    }
}

// Add event listener to each checkbox
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', updateScore);
});

// Load saved progress when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
});

// Optional: Add a reset button functionality
// You can add this to the HTML if desired
function resetTest() {
    if (confirm('Are you sure you want to reset your test? This cannot be undone.')) {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        localStorage.removeItem('purityTestProgress');
        updateScore();
    }
}

// Make reset function available globally if needed
window.resetTest = resetTest;
