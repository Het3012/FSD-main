// Enhanced Workout Rep Counter with Set Tracking
const counterEl = document.getElementById("counter");
const sessionCountEl = document.getElementById("sessionCount");
const incBtn = document.getElementById("increment");
const decBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");
const addSetBtn = document.getElementById("addSet");
const saveWorkoutBtn = document.getElementById("saveWorkout");
const setsListEl = document.getElementById("setsList");

const STORAGE_KEY = "workout-rep-counter";
const SETS_KEY = "workout-sets";
const SESSION_KEY = "workout-session";

// Load data from localStorage
function getCount() {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
}

function setCount(val) {
    localStorage.setItem(STORAGE_KEY, val);
}

function getSets() {
    const stored = localStorage.getItem(SETS_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveSets(sets) {
    localStorage.setItem(SETS_KEY, JSON.stringify(sets));
}

function getSessionCount() {
    return Number(localStorage.getItem(SESSION_KEY)) || 1;
}

function setSessionCount(val) {
    localStorage.setItem(SESSION_KEY, val);
}

// Initialize
let count = getCount();
let sessionCount = getSessionCount();
let currentSets = getSets();

function updateDisplay() {
    counterEl.textContent = count;
    sessionCountEl.textContent = sessionCount;
    updateSetsDisplay();
}

function updateSetsDisplay() {
    setsListEl.innerHTML = '';
    
    if (currentSets.length === 0) {
        setsListEl.innerHTML = '<div style="text-align: center; color: #999; font-style: italic;">No sets completed yet</div>';
        return;
    }

    currentSets.forEach((set, index) => {
        const setEl = document.createElement('div');
        setEl.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            padding: 10px 15px;
            font-size: 14px;
        `;
        
        setEl.innerHTML = `
            <span><strong>Set ${index + 1}:</strong> ${set.reps} reps</span>
            <span style="color: #666; font-size: 12px;">${set.time}</span>
        `;
        
        setsListEl.appendChild(setEl);
    });

    // Add total summary
    const totalReps = currentSets.reduce((sum, set) => sum + set.reps, 0);
    const summaryEl = document.createElement('div');
    summaryEl.style.cssText = `
        background: #e8f5e8;
        border: 1px solid #c3e6cb;
        border-radius: 6px;
        padding: 10px 15px;
        font-weight: 600;
        color: #155724;
        text-align: center;
        margin-top: 10px;
    `;
    summaryEl.textContent = `Total: ${currentSets.length} sets • ${totalReps} reps`;
    setsListEl.appendChild(summaryEl);
}

function addNewSet() {
    if (count > 0) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        currentSets.push({
            reps: count,
            time: timeString,
            timestamp: now.getTime()
        });
        
        saveSets(currentSets);
        
        // Reset counter for next set
        count = 0;
        setCount(count);
        
        // Increment session
        sessionCount++;
        setSessionCount(sessionCount);
        
        updateDisplay();
        
        // Visual feedback
        addSetBtn.style.background = '#28a745';
        addSetBtn.textContent = 'Set Added!';
        setTimeout(() => {
            addSetBtn.style.background = '#007bff';
            addSetBtn.textContent = 'New Set';
        }, 1000);
    }
}

function saveWorkout() {
    if (currentSets.length > 0) {
        // Clear current workout
        currentSets = [];
        saveSets(currentSets);
        
        // Reset counters
        count = 0;
        sessionCount = 1;
        setCount(count);
        setSessionCount(sessionCount);
        
        updateDisplay();
        
        // Visual feedback
        saveWorkoutBtn.style.background = '#28a745';
        saveWorkoutBtn.textContent = 'Saved!';
        setTimeout(() => {
            saveWorkoutBtn.style.background = '#17a2b8';
            saveWorkoutBtn.textContent = 'Save Workout';
        }, 1500);
    }
}

// Event listeners
incBtn.addEventListener("click", () => {
    count++;
    setCount(count);
    updateDisplay();
});

decBtn.addEventListener("click", () => {
    if (count > 0) {
        count--;
        setCount(count);
        updateDisplay();
    }
});

resetBtn.addEventListener("click", () => {
    count = 0;
    setCount(count);
    updateDisplay();
});

addSetBtn.addEventListener("click", addNewSet);
saveWorkoutBtn.addEventListener("click", saveWorkout);

// Enhanced keyboard support
window.addEventListener("keydown", (e) => {
    // Prevent actions when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.key) {
        case '+':
        case ' ': // Spacebar
            e.preventDefault();
            incBtn.click();
            break;
        case '-':
            e.preventDefault();
            decBtn.click();
            break;
        case 'r':
        case 'R':
            e.preventDefault();
            resetBtn.click();
            break;
        case 's':
        case 'S':
            e.preventDefault();
            addSetBtn.click();
            break;
        case 'Enter':
            e.preventDefault();
            if (count > 0) {
                addSetBtn.click();
            }
            break;
    }
});

// Initialize display
updateDisplay();
