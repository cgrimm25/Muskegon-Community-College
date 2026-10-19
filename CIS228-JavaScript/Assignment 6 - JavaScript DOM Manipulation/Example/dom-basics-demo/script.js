/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #6 Reference Demo - Student Profile Card
// File Name:   script.js
// Author:      Clayton Corrello (Adapted by Chris Grimm)
// Date:        10/19/2026
//
// Description:
//   Demonstration script illustrating core DOM manipulation techniques: element caching,
//   textContent vs innerHTML modifications, attribute & class updates, event delegation,
//   dynamic element creation/removal, scoped DOM traversal, and browser console utilities.
//
// Input File:  User input from #new-course-input, button click events, and window DOM events
// Output File: DOM node mutations, on-screen activity log entries, and formatted console logs
//==================================================================================
*/

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
    // stopPropagation keeps this click from ALSO reaching the delegated
    // listener on the parent list - otherwise the class would toggle twice.
    li.addEventListener('click', function(event) {
        event.stopPropagation();
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

// Guard so init only ever runs once (avoids duplicate event listeners)
let initialized = false;

/**
 * Initializes the application
 */
function init() {
    if (initialized) return;
    initialized = true;
    
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

// Wait for DOM to be fully loaded.
// The script tag sits at the end of <body>, so the DOM is usually ready
// already - we check readyState to cover both cases.
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
