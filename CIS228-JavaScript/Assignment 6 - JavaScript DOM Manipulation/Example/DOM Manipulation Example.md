This project demonstrates fundamental DOM manipulation concepts through an interactive "Student Profile Card" application. It covers element selection, content modification, attribute manipulation, event handling, dynamic element creation, and DOM traversal—all with detailed comments for learning purposes.

### Project Structure
```
dom-basics-demo/
├── index.html      # Main HTML structure
├── styles.css      # Presentation styling
└── script.js       # DOM manipulation logic
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM Manipulation Basics - Student Profile Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <header class="demo-header">
            <h1>🎓 DOM Manipulation Basics</h1>
            <p class="subtitle">Interactive Student Profile Card Demo</p>
        </header>

        <!-- Main Demo Area -->
        <main class="demo-main">
            <!-- Control Panel - Buttons to trigger DOM operations -->
            <section class="control-panel">
                <h2>🎮 Control Panel</h2>
                <div class="button-group">
                    <button id="btn-change-name" class="btn btn-primary">Change Name</button>
                    <button id="btn-toggle-major" class="btn btn-secondary">Toggle Major</button>
                    <button id="btn-add-course" class="btn btn-success">Add Course</button>
                    <button id="btn-remove-course" class="btn btn-warning">Remove Last Course</button>
                    <button id="btn-update-gpa" class="btn btn-info">Update GPA</button>
                    <button id="btn-highlight-skills" class="btn btn-purple">Highlight Skills</button>
                    <button id="btn-reset" class="btn btn-danger">Reset All</button>
                </div>
                
                <div class="input-group">
                    <label for="new-course-input">New Course:</label>
                    <input type="text" id="new-course-input" placeholder="Enter course name (e.g., CS 301)">
                </div>
            </section>

            <!-- Student Profile Card - The target of DOM manipulation -->
            <section class="profile-card" id="profile-card">
                <div class="card-header">
                    <img id="avatar" src="https://api.dicebear.com/7.x/avataaars/svg?seed=student123" alt="Student Avatar" class="avatar">
                    <div class="student-info">
                        <h2 id="student-name">Alex Johnson</h2>
                        <p id="student-major">Computer Science Major</p>
                        <p id="student-year" class="year-badge">Junior</p>
                    </div>
                </div>

                <div class="card-body">
                    <!-- GPA Section -->
                    <div class="info-section">
                        <h3>📊 Academic Info</h3>
                        <div class="gpa-display">
                            <span class="label">Current GPA:</span>
                            <span id="gpa-value" class="gpa-value">3.75</span>
                            <button id="btn-edit-gpa" class="mini-btn">Edit</button>
                        </div>
                    </div>

                    <!-- Courses Section -->
                    <div class="info-section">
                        <h3>📚 Current Courses</h3>
                        <ul id="courses-list" class="courses-list">
                            <li class="course-item" data-course="CS 101">CS 101 - Intro to Programming</li>
                            <li class="course-item" data-course="CS 201">CS 201 - Data Structures</li>
                            <li class="course-item" data-course="MATH 210">MATH 210 - Discrete Mathematics</li>
                            <li class="course-item" data-course="ENG 105">ENG 105 - Technical Writing</li>
                        </ul>
                        <p id="course-count" class="course-count">Total Courses: 4</p>
                    </div>

                    <!-- Skills Section -->
                    <div class="info-section">
                        <h3>🛠️ Technical Skills</h3>
                        <div id="skills-container" class="skills-container">
                            <span class="skill-tag" data-skill="javascript">JavaScript</span>
                            <span class="skill-tag" data-skill="python">Python</span>
                            <span class="skill-tag" data-skill="html">HTML/CSS</span>
                            <span class="skill-tag" data-skill="git">Git</span>
                            <span class="skill-tag" data-skill="sql">SQL</span>
                        </div>
                    </div>

                    <!-- Activity Log - Shows DOM operations in real-time -->
                    <div class="info-section">
                        <h3>📝 Activity Log</h3>
                        <div id="activity-log" class="activity-log">
                            <div class="log-entry">📖 Page loaded - DOM ready</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- Educational Sidebar -->
        <aside class="educational-sidebar">
            <h3>📖 Key Concepts Demonstrated</h3>
            <ul class="concept-list">
                <li><strong>Element Selection:</strong> getElementById, querySelector, querySelectorAll</li>
                <li><strong>Content Modification:</strong> textContent, innerHTML</li>
                <li><strong>Attribute Manipulation:</strong> setAttribute, getAttribute, classList</li>
                <li><strong>Event Handling:</strong> addEventListener, event delegation</li>
                <li><strong>DOM Creation:</strong> createElement, appendChild, insertBefore</li>
                <li><strong>DOM Removal:</strong> removeChild, remove()</li>
                <li><strong>DOM Traversal:</strong> parentNode, children, nextElementSibling</li>
            </ul>
            
            <div class="code-tip">
                <h4>💡 Pro Tip</h4>
                <p>Open browser DevTools (F12) → Console to see detailed logs of each DOM operation!</p>
            </div>
        </aside>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### styles.css
```css
/* ========================================
   DOM Manipulation Demo - Styles
   ======================================== */

/* CSS Custom Properties for consistent theming */
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --success-color: #059669;
    --warning-color: #d97706;
    --danger-color: #dc2626;
    --info-color: #0891b2;
    --purple-color: #7c3aed;
    --bg-color: #f8fafc;
    --card-bg: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --transition: all 0.2s ease;
}

/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Header Styles */
.demo-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
}

.demo-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
}

.subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
}

/* Main Layout */
.demo-main {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 30px;
    align-items: start;
}

/* Control Panel */
.control-panel {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    position: sticky;
    top: 20px;
}

.control-panel h2 {
    font-size: 1.25rem;
    margin-bottom: 20px;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 8px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.btn {
    padding: 12px 16px;
    border: none;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}

.btn:active {
    transform: translateY(0);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.btn-primary { background: var(--primary-color); color: white; }
.btn-secondary { background: var(--secondary-color); color: white; }
.btn-success { background: var(--success-color); color: white; }
.btn-warning { background: var(--warning-color); color: white; }
.btn-danger { background: var(--danger-color); color: white; }
.btn-info { background: var(--info-color); color: white; }
.btn-purple { background: var(--purple-color); color: white; }

.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color);
}

.input-group label {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.input-group input {
    padding: 10px 12px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    transition: var(--transition);
}

.input-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Profile Card */
.profile-card {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    overflow: hidden;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: linear-gradient(135deg, var(--primary-color), var(--purple-color));
    color: white;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
}

.student-info h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 4px;
}

.student-info #student-major {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 8px;
}

.year-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}

.card-body {
    padding: 24px;
}

.info-section {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
}

.info-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.info-section h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* GPA Display */
.gpa-display {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.label {
    font-weight: 500;
    color: var(--text-secondary);
}

.gpa-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.mini-btn {
    padding: 6px 12px;
    font-size: 0.75rem;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition);
}

.mini-btn:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Courses List */
.courses-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.course-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--bg-color);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-color);
    transition: var(--transition);
}

.course-item:hover {
    border-color: var(--primary-color);
    box-shadow: var(--shadow-sm);
}

.course-item.removing {
    animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeOut {
    to { opacity: 0; transform: translateX(-20px); height: 0; padding: 0; margin: 0; }
}

.course-count {
    margin-top: 12px;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
}

/* Skills Container */
.skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.skill-tag {
    padding: 6px 12px;
    background: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: var(--transition);
    cursor: default;
}

.skill-tag:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.skill-tag.highlighted {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

/* Activity Log */
.activity-log {
    max-height: 200px;
    overflow-y: auto;
    background: var(--bg-color);
    border-radius: var(--radius-md);
    padding: 12px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.8rem;
    line-height: 1.5;
}

.log-entry {
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    margin-bottom: 4px;
    animation: slideIn 0.3s ease;
}

.log-entry:nth-child(odd) { background: rgba(0, 0, 0, 0.02); }

@keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
}

.log-entry.success { border-left: 3px solid var(--success-color); }
.log-entry.info { border-left: 3px solid var(--info-color); }
.log-entry.warning { border-left: 3px solid var(--warning-color); }
.log-entry.error { border-left: 3px solid var(--danger-color); }

/* Educational Sidebar */
.educational-sidebar {
    background: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
    height: fit-content;
    position: sticky;
    top: 20px;
}

.educational-sidebar h3 {
    font-size: 1.1rem;
    margin-bottom: 16px;
    color: var(--text-primary);
}

.concept-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
}

.concept-list li {
    padding: 12px;
    background: var(--bg-color);
    border-radius: var(--radius-md);
    border-left: 3px solid var(--primary-color);
    font-size: 0.875rem;
    line-height: 1.5;
}

.concept-list strong {
    color: var(--primary-color);
    display: block;
    margin-bottom: 4px;
}

.code-tip {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 1px solid #fcd34d;
    border-radius: var(--radius-md);
    padding: 16px;
}

.code-tip h4 {
    color: #92400e;
    margin-bottom: 8px;
    font-size: 0.9rem;
}

.code-tip p {
    color: #78350f;
    font-size: 0.85rem;
    margin: 0;
}

/* Responsive Design */
@media (max-width: 900px) {
    .demo-main {
        grid-template-columns: 1fr;
    }
    
    .control-panel {
        position: static;
    }
    
    .educational-sidebar {
        position: static;
    }
}

@media (max-width: 600px) {
    .container {
        padding: 12px;
    }
    
    .demo-header h1 {
        font-size: 1.75rem;
    }
    
    .card-header {
        flex-direction: column;
        text-align: center;
    }
    
    .button-group {
        gap: 8px;
    }
    
    .btn {
        padding: 10px 12px;
        font-size: 0.85rem;
    }
}

/* Focus Styles for Accessibility */
*:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### script.js
```javascript
/**
 * DOM Manipulation Basics - Student Profile Demo
 * 
 * This script demonstrates fundamental DOM manipulation concepts:
 * 1. Element Selection Methods
 * 2. Content Modification (textContent vs innerHTML)
 * 3. Attribute & Class Manipulation
 * 4. Event Handling & Event Delegation
 * 5. Dynamic Element Creation & Insertion
 * 6. Element Removal
 * 7. DOM Traversal
 * 8. Form Handling
 * 
 * Open browser DevTools Console (F12) to see detailed operation logs!
 */

// ========================================
// 1. ELEMENT SELECTION - Cache DOM references
// ========================================

// Single element selection methods
const profileCard = document.getElementById('profile-card');           // By ID (fastest)
const studentName = document.getElementById('student-name');
const studentMajor = document.getElementById('student-major');
const studentYear = document.getElementById('student-year');
const gpaValue = document.getElementById('gpa-value');
const coursesList = document.getElementById('courses-list');
const courseCount = document.getElementById('course-count');
const skillsContainer = document.getElementById('skills-container');
const activityLog = document.getElementById('activity-log');
const avatar = document.getElementById('avatar');
const newCourseInput = document.getElementById('new-course-input');

// QuerySelector - more flexible, uses CSS selectors
const btnEditGpa = document.querySelector('#btn-edit-gpa');

// QuerySelectorAll - returns NodeList (static collection)
const allSkillTags = document.querySelectorAll('.skill-tag');
const allCourseItems = document.querySelectorAll('.course-item');
const allButtons = document.querySelectorAll('.control-panel .btn');

// ========================================
// 2. STATE MANAGEMENT - Track application data
// ========================================

const studentData = {
    name: 'Alex Johnson',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.75,
    courses: [
        { code: 'CS 101', name: 'Intro to Programming' },
        { code: 'CS 201', name: 'Data Structures' },
        { code: 'MATH 210', name: 'Discrete Mathematics' },
        { code: 'ENG 105', name: 'Technical Writing' }
    ],
    skills: ['JavaScript', 'Python', 'HTML/CSS', 'Git', 'SQL'],
    availableCourses: [
        { code: 'CS 301', name: 'Algorithms' },
        { code: 'CS 350', name: 'Database Systems' },
        { code: 'CS 401', name: 'Operating Systems' },
        { code: 'MATH 310', name: 'Linear Algebra' },
        { code: 'PHYS 201', name: 'Physics for Engineers' }
    ]
};

// Track original state for reset functionality
const originalState = JSON.parse(JSON.stringify(studentData));

// ========================================
// 3. UTILITY FUNCTIONS - Logging & Helpers
// ========================================

/**
 * Logs activity to the visual activity log and console
 * @param {string} message - Description of the operation
 * @param {string} type - Log type: 'success', 'info', 'warning', 'error'
 */
function logActivity(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    
    // Console logging with styling
    const styles = {
        success: 'color: #059669; font-weight: bold;',
        info: 'color: #0891b2;',
        warning: 'color: #d97706; font-weight: bold;',
        error: 'color: #dc2626; font-weight: bold;'
    };
    console.log(`%c${logMessage}`, styles[type] || styles.info);
    
    // Visual log in the UI
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = logMessage;
    
    // Insert at top (most recent first)
    activityLog.insertBefore(logEntry, activityLog.firstChild);
    
    // Limit log entries to prevent memory issues
    while (activityLog.children.length > 20) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

/**
 * Generates a random GPA between 2.0 and 4.0
 * @returns {number} Random GPA with 2 decimal places
 */
function generateRandomGPA() {
    return Math.round((Math.random() * 2 + 2) * 100) / 100;
}

/**
 * Gets a random available course not already enrolled
 * @returns {Object|null} Course object or null if none available
 */
function getRandomAvailableCourse() {
    const enrolledCodes = studentData.courses.map(c => c.code);
    const available = studentData.availableCourses.filter(c => !enrolledCodes.includes(c.code));
    return available.length > 0 ? available[Math.floor(Math.random() * available.length)] : null;
}

// ========================================
// 4. DOM CONTENT MODIFICATION FUNCTIONS
// ========================================

/**
 * Demonstrates textContent vs innerHTML
 * Updates student name with animation
 */
function changeStudentName() {
    const names = [
        'Alex Johnson', 'Jordan Smith', 'Taylor Williams', 
        'Morgan Brown', 'Casey Davis', 'Riley Wilson'
    ];
    
    // textContent - safe, treats content as plain text (prevents XSS)
    const newName = names[Math.floor(Math.random() * names.length)];
    studentName.textContent = newName;
    studentData.name = newName;
    
    logActivity(`Changed name using textContent: "${newName}"`, 'success');
    
    // Demonstrate innerHTML (use with caution - XSS risk!)
    // We'll use it safely here for demo purposes
    const nameElement = studentName;
    nameElement.style.transition = 'all 0.3s ease';
    nameElement.style.transform = 'scale(1.05)';
    nameElement.style.color = '#2563eb';
    
    setTimeout(() => {
        nameElement.style.transform = 'scale(1)';
        nameElement.style.color = '';
    }, 300);
}

/**
 * Toggles between two majors using classList and textContent
 */
function toggleMajor() {
    const majors = [
        { major: 'Computer Science', year: 'Junior' },
        { major: 'Data Science', year: 'Senior' },
        { major: 'Software Engineering', year: 'Sophomore' },
        { major: 'Cybersecurity', year: 'Junior' }
    ];
    
    const currentIndex = majors.findIndex(m => m.major === studentData.major);
    const nextIndex = (currentIndex + 1) % majors.length;
    const newMajor = majors[nextIndex];
    
    // Update textContent
    studentMajor.textContent = `${newMajor.major} Major`;
    studentYear.textContent = newMajor.year;
    
    // Update data
    studentData.major = newMajor.major;
    studentData.year = newMajor.year;
    
    // Visual feedback using classList
    studentMajor.classList.add('updating');
    studentYear.classList.add('updating');
    
    setTimeout(() => {
        studentMajor.classList.remove('updating');
        studentYear.classList.remove('updating');
    }, 300);
    
    logActivity(`Toggled major to "${newMajor.major}" (${newMajor.year})`, 'info');
}

/**
 * Updates GPA with random value - demonstrates attribute manipulation
 */
function updateGPA() {
    const newGPA = generateRandomGPA();
    const oldGPA = studentData.gpa;
    
    // Update textContent
    gpaValue.textContent = newGPA.toFixed(2);
    
    // Update data attribute for potential CSS/styling hooks
    gpaValue.setAttribute('data-previous-gpa', oldGPA.toFixed(2));
    gpaValue.setAttribute('data-current-gpa', newGPA.toFixed(2));
    
    // Conditional styling based on GPA change
    if (newGPA > oldGPA) {
        gpaValue.style.color = '#059669'; // Green for improvement
        gpaValue.classList.add('improved');
        setTimeout(() => gpaValue.classList.remove('improved'), 1000);
    } else if (newGPA < oldGPA) {
        gpaValue.style.color = '#dc2626'; // Red for decrease
        gpaValue.classList.add('decreased');
        setTimeout(() => gpaValue.classList.remove('decreased'), 1000);
    }
    
    studentData.gpa = newGPA;
    
    logActivity(`GPA updated: ${oldGPA.toFixed(2)} → ${newGPA.toFixed(2)}`, 
        newGPA > oldGPA ? 'success' : newGPA < oldGPA ? 'warning' : 'info');
}

/**
 * Highlights all skill tags - demonstrates querySelectorAll iteration
 */
function highlightSkills() {
    // querySelectorAll returns a NodeList - use forEach to iterate
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        // Staggered animation using setTimeout
        setTimeout(() => {
            tag.classList.toggle('highlighted');
            
            // Demonstrate dataset property (data-* attributes)
            const skillName = tag.dataset.skill;
            logActivity(`Toggled highlight for skill: ${skillName}`, 'info');
        }, index * 100);
    });
}

// ========================================
// 5. DYNAMIC ELEMENT CREATION & INSERTION
// ========================================

/**
 * Adds a new course to the list - demonstrates createElement, appendChild
 */
function addCourse() {
    const inputValue = newCourseInput.value.trim();
    
    let newCourse;
    
    if (inputValue) {
        // Parse user input (format: "CODE - Name" or just "Name")
        const parts = inputValue.split(' - ');
        newCourse = {
            code: parts[0].trim().toUpperCase(),
            name: parts[1] ? parts[1].trim() : `Course ${studentData.courses.length + 1}`
        };
        newCourseInput.value = ''; // Clear input
    } else {
        // Get random available course
        newCourse = getRandomAvailableCourse();
        if (!newCourse) {
            logActivity('No more courses available to add!', 'warning');
            return;
        }
    }
    
    // Check if already enrolled
    if (studentData.courses.some(c => c.code === newCourse.code)) {
        logActivity(`Already enrolled in ${newCourse.code}!`, 'warning');
        return;
    }
    
    // 1. CREATE the new element
    const li = document.createElement('li');
    li.className = 'course-item';
    li.dataset.course = newCourse.code;
    
    // 2. SET content (using textContent for safety)
    li.textContent = `${newCourse.code} - ${newCourse.name}`;
    
    // 3. ADD event listener for click (demonstrates dynamic event binding)
    li.addEventListener('click', function() {
        this.classList.toggle('selected');
        logActivity(`Course clicked: ${this.dataset.course}`, 'info');
    });
    
    // 4. INSERT into DOM - appendChild adds to end
    coursesList.appendChild(li);
    
    // Update data model
    studentData.courses.push(newCourse);
    
    // Update course count
    updateCourseCount();
    
    logActivity(`Added course: ${newCourse.code} - ${newCourse.name}`, 'success');
    
    // Animate the new element
    li.style.opacity = '0';
    li.style.transform = 'translateY(10px)';
    requestAnimationFrame(() => {
        li.style.transition = 'all 0.3s ease';
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    });
}

/**
 * Removes the last course - demonstrates removeChild and remove()
 */
function removeLastCourse() {
    const courseItems = coursesList.querySelectorAll('.course-item');
    
    if (courseItems.length === 0) {
        logActivity('No courses to remove!', 'warning');
        return;
    }
    
    // Get the last course item
    const lastCourse = courseItems[courseItems.length - 1];
    const courseCode = lastCourse.dataset.course;
    const courseName = lastCourse.textContent;
    
    // Method 1: remove() - modern, cleaner (removes element itself)
    // lastCourse.remove();
    
    // Method 2: removeChild - traditional (requires parent reference)
    // Use animation first, then remove
    lastCourse.classList.add('removing');
    
    // Wait for animation to complete
    setTimeout(() => {
        coursesList.removeChild(lastCourse);
        
        // Update data model
        studentData.courses = studentData.courses.filter(c => c.code !== courseCode);
        
        // Update count
        updateCourseCount();
        
        logActivity(`Removed course: ${courseName}`, 'warning');
    }, 300);
}

/**
 * Updates the course count display
 */
function updateCourseCount() {
    const count = studentData.courses.length;
    courseCount.textContent = `Total Courses: ${count}`;
    
    // Also demonstrate dataset for dynamic attributes
    courseCount.dataset.count = count;
}

// ========================================
// 6. EVENT HANDLING & DELEGATION
// ========================================

/**
 * Sets up all event listeners - demonstrates different event patterns
 */
function setupEventListeners() {
    // Direct event binding for control buttons
    document.getElementById('btn-change-name').addEventListener('click', changeStudentName);
    document.getElementById('btn-toggle-major').addEventListener('click', toggleMajor);
    document.getElementById('btn-add-course').addEventListener('click', addCourse);
    document.getElementById('btn-remove-course').addEventListener('click', removeLastCourse);
    document.getElementById('btn-update-gpa').addEventListener('click', updateGPA);
    document.getElementById('btn-highlight-skills').addEventListener('click', highlightSkills);
    document.getElementById('btn-reset').addEventListener('click', resetAll);
    
    // Event delegation for course items (handles dynamically added elements)
    coursesList.addEventListener('click', function(event) {
        // Find closest course-item (event delegation pattern)
        const courseItem = event.target.closest('.course-item');
        if (courseItem && event.target === courseItem) {
            courseItem.classList.toggle('selected');
            logActivity(`Course selected via delegation: ${courseItem.dataset.course}`, 'info');
        }
    });
    
    // Keyboard event for input
    newCourseInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addCourse();
        }
    });
    
    // GPA edit button - demonstrates prompt dialog
    btnEditGpa.addEventListener('click', function() {
        const currentGPA = studentData.gpa;
        const input = prompt(`Enter new GPA (current: ${currentGPA.toFixed(2)}):`, currentGPA.toFixed(2));
        
        if (input !== null) {
            const newGPA = parseFloat(input);
            if (!isNaN(newGPA) && newGPA >= 0 && newGPA <= 4.0) {
                gpaValue.textContent = newGPA.toFixed(2);
                studentData.gpa = newGPA;
                logActivity(`GPA manually set to: ${newGPA.toFixed(2)}`, 'success');
            } else {
                logActivity('Invalid GPA! Must be between 0.00 and 4.00', 'error');
            }
        }
    });
    
    // Avatar click - demonstrates attribute manipulation
    avatar.addEventListener('click', function() {
        const seeds = ['student123', 'student456', 'student789', 'student999', 'studentABC'];
        const newSeed = seeds[Math.floor(Math.random() * seeds.length)];
        
        // Update src attribute
        this.setAttribute('src', `https://api.dicebear.com/7.x/avataaars/svg?seed=${newSeed}`);
        
        // Update alt attribute
        this.setAttribute('alt', `Student Avatar - ${newSeed}`);
        
        logActivity(`Avatar updated with seed: ${newSeed}`, 'info');
    });
    
    // Skill tag hover - demonstrates event delegation on container
    skillsContainer.addEventListener('mouseenter', function(event) {
        const skillTag = event.target.closest('.skill-tag');
        if (skillTag) {
            skillTag.style.transform = 'scale(1.1)';
        }
    }, true); // Capture phase
    
    skillsContainer.addEventListener('mouseleave', function(event) {
        const skillTag = event.target.closest('.skill-tag');
        if (skillTag) {
            skillTag.style.transform = 'scale(1)';
        }
    }, true);
}

// ========================================
// 7. DOM TRAVERSAL DEMONSTRATIONS
// ========================================

/**
 * Demonstrates various DOM traversal methods
 */
function demonstrateTraversal() {
    logActivity('--- DOM Traversal Demo ---', 'info');
    
    // Starting from a known element
    const firstCourse = coursesList.querySelector('.course-item');
    if (!firstCourse) return;
    
    // Parent traversal
    logActivity(`Parent of first course: ${firstCourse.parentElement.tagName}`, 'info');
    logActivity(`Grandparent: ${firstCourse.parentElement.parentElement.className}`, 'info');
    
    // Children traversal
    const courseChildren = coursesList.children;
    logActivity(`Courses list has ${courseChildren.length} direct children`, 'info');
    
    // Sibling traversal
    if (firstCourse.nextElementSibling) {
        logActivity(`Next sibling: ${firstCourse.nextElementSibling.textContent}`, 'info');
    }
    
    // QuerySelector from parent (scoped selection)
    const allItemsInList = coursesList.querySelectorAll('.course-item');
    logActivity(`Found ${allItemsInList.length} course items via scoped querySelectorAll`, 'info');
    
    // Closest - finds nearest ancestor matching selector
    const cardFromCourse = firstCourse.closest('.profile-card');
    logActivity(`Closest .profile-card from course: ${cardFromCourse ? 'Found' : 'Not found'}`, 'info');
}

// ========================================
// 8. RESET & INITIALIZATION
// ========================================

/**
 * Resets all data and UI to initial state
 */
function resetAll() {
    // Restore data
    Object.assign(studentData, JSON.parse(JSON.stringify(originalState)));
    
    // Reset UI elements
    studentName.textContent = studentData.name;
    studentMajor.textContent = `${studentData.major} Major`;
    studentYear.textContent = studentData.year;
    gpaValue.textContent = studentData.gpa.toFixed(2);
    gpaValue.style.color = '';
    
    // Reset avatar
    avatar.setAttribute('src', 'https://api.dicebear.com/7.x/avataaars/svg?seed=student123');
    
    // Clear and rebuild courses list
    coursesList.innerHTML = ''; // innerHTML = '' removes all children
    studentData.courses.forEach(course => {
        const li = document.createElement('li');
        li.className = 'course-item';
        li.dataset.course = course.code;
        li.textContent = `${course.code} - ${course.name}`;
        coursesList.appendChild(li);
    });
    
    updateCourseCount();
    
    // Reset skills
    allSkillTags.forEach(tag => tag.classList.remove('highlighted'));
    
    // Clear activity log except initial message
    activityLog.innerHTML = '<div class="log-entry">📖 Page loaded - DOM ready</div>';
    
    logActivity('All data reset to initial state', 'success');
}

/**
 * Initializes the application
 */
function init() {
    logActivity('Initializing DOM Manipulation Demo...', 'info');
    
    // Setup event listeners
    setupEventListeners();
    
    // Demonstrate traversal after a short delay
    setTimeout(demonstrateTraversal, 1000);
    
    // Add some interactive console helpers
    window.DOMDemo = {
        studentData,
        logActivity,
        addCourse,
        removeLastCourse,
        changeStudentName,
        toggleMajor,
        updateGPA,
        highlightSkills,
        resetAll,
        // Expose DOM elements for experimentation
        elements: {
            profileCard,
            studentName,
            studentMajor,
            coursesList,
            skillsContainer,
            activityLog
        }
    };
    
    logActivity('Demo ready! Try: DOMDemo.changeStudentName() in console', 'success');
    logActivity('Available commands: DOMDemo.addCourse(), DOMDemo.resetAll(), etc.', 'info');
}

// ========================================
// 9. APPLICATION ENTRY POINT
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Also handle case where script loads after DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// EDUCATIONAL NOTES (visible in console)
// ========================================

console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                    DOM MANIPULATION BASICS DEMO                   ║
╠═══════════════════════════════════════════════════════════════════╣
║  KEY CONCEPTS COVERED:                                            ║
║                                                                   ║
║  1. ELEMENT SELECTION                                             ║
║     • document.getElementById(id) - Fastest, single element       ║
║     • document.querySelector(selector) - First match, CSS syntax  ║
║     • document.querySelectorAll(selector) - All matches, NodeList ║
║                                                                   ║
║  2. CONTENT MODIFICATION                                          ║
║     • element.textContent = "text" - Safe, plain text only        ║
║     • element.innerHTML = "<b>HTML</b>" - Parses HTML (XSS risk!) ║
║                                                                   ║
║  3. ATTRIBUTE & CLASS MANIPULATION                                ║
║     • element.setAttribute(name, value)                           ║
║     • element.getAttribute(name)                                  ║
║     • element.classList.add/remove/toggle/contains(class)         ║
║     • element.dataset.property (for data-* attributes)            ║
║                                                                   ║
║  4. EVENT HANDLING                                                ║
║     • element.addEventListener(event, handler)                    ║
║     • Event delegation: parent.addEventListener(...)              ║
║     • event.target, event.currentTarget, event delegation         ║
║                                                                   ║
║  5. DOM CREATION & INSERTION                                      ║
║     • document.createElement(tagName)                             ║
║     • parent.appendChild(child) - Adds to end                     ║
║     • parent.insertBefore(new, reference) - Inserts before        ║
║     • parent.prepend(child) - Adds to beginning (modern)          ║
║                                                                   ║
║  6. ELEMENT REMOVAL                                               ║
║     • element.remove() - Modern, removes element itself           ║
║     • parent.removeChild(child) - Traditional                     ║
║     • parent.innerHTML = '' - Removes all children                ║
║                                                                   ║
║  7. DOM TRAVERSAL                                                 ║
║     • element.parentElement / parentNode                          ║
║     • element.children / childNodes                               ║
║     • element.nextElementSibling / previousElementSibling         ║
║     • element.closest(selector) - Finds nearest ancestor          ║
║     • element.querySelector(selector) - Scoped selection          ║
║                                                                   ║
║  TRY IN CONSOLE:                                                  ║
║  • DOMDemo.changeStudentName()                                    ║
║  • DOMDemo.addCourse()                                            ║
║  • DOMDemo.elements.studentName.style.color = 'red'               ║
║  • document.querySelectorAll('.course-item').forEach(el => ...)   ║
║                                                                   ║
║  Open DevTools (F12) → Console to experiment!                     ║
╚═══════════════════════════════════════════════════════════════════╝
`);
```

### How to Run This Project

1. **Create the project folder:**
   ```bash
   mkdir dom-basics-demo
   cd dom-basics-demo
   ```

2. **Save the three files** with the exact names shown above (`index.html`, `styles.css`, `script.js`)

3. **Open in browser:**
   - Double-click `index.html` 
   - Or serve locally: `npx serve` or `python -m http.server 8000`

4. **Explore in DevTools (F12):**
   - **Console tab**: See real-time logs of every DOM operation
   - **Elements tab**: Inspect live DOM changes
   - **Try commands**: `DOMDemo.changeStudentName()`, `DOMDemo.addCourse()`

### Learning Objectives Covered

| Concept | Demonstrated In |
|---------|----------------|
| **Element Selection** | `getElementById`, `querySelector`, `querySelectorAll` |
| **Content Modification** | `textContent` (safe), `innerHTML` (with warnings) |
| **Attributes & Classes** | `setAttribute`, `classList.toggle`, `dataset` |
| **Event Handling** | `addEventListener`, delegation, keyboard events |
| **Dynamic Creation** | `createElement`, `appendChild`, `insertBefore` |
| **Element Removal** | `remove()`, `removeChild()`, animation cleanup |
| **DOM Traversal** | `parentElement`, `children`, `closest()`, siblings |
| **Modern Patterns** | `const/let`, arrow functions, template literals, destructuring |

This demo provides hands-on experience with every fundamental DOM operation while maintaining clean, educational code with extensive logging for learning reinforcement.
