/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Project #6 - Add JavaScript to Your Home Page
// File Name:   script.js
// Live URL:    http://157.245.246.41:8014/script.js
// Author:      Chris Grimm
// Date:        10/26/2026
//
// Description:
//   External JavaScript file implementing Appendix B concepts:
//   - Event 1 (mouseover): Highlights the interactive container.
//   - Event 2 (mouseout): Resets the interactive container styling.
//   - Event 3 (click): Interactively toggles and updates visible page content.
//   - Additional Feature: Conditional logic (if/else) using Date() to display
//     a dynamic time-of-day greeting and calculate total published projects.
//==================================================================================
*/

// Track toggle state for the click event
let isAlternateMessage = false;

/**
 * Event 1: mouseover
 * Highlights the Column 1 container and updates status indicator text.
 */
function highlightBox() {
    var box = document.getElementById("welcomeBox");
    var status = document.getElementById("interactionStatus");
    if (box) {
        box.style.borderColor = "#facc15"; // Bright yellow highlight
        box.style.boxShadow = "0 10px 25px rgba(250, 204, 21, 0.35)";
    }
    if (status) {
        status.textContent = "Status: Pointer hovering over container!";
    }
}

/**
 * Event 2: mouseout
 * Restores original container border and resets status indicator text.
 */
function resetBox() {
    var box = document.getElementById("welcomeBox");
    var status = document.getElementById("interactionStatus");
    if (box) {
        box.style.borderColor = "#38bdf8"; // Reset back to theme cyan
        box.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
    }
    if (status) {
        status.textContent = "Status: Ready for interaction.";
    }
}

/**
 * Event 3: click (Changes visible page content)
 * Toggles and updates the text inside the welcome paragraph dynamically.
 */
function toggleWelcomeMessage() {
    var messagePara = document.getElementById("dynamicMessage");
    var toggleBtn = document.getElementById("toggleBtn");

    if (messagePara) {
        if (!isAlternateMessage) {
            messagePara.innerHTML = "<strong>JavaScript Active:</strong> You successfully triggered a DOM update via an external click event listener!";
            if (toggleBtn) {
                toggleBtn.textContent = "Reset Message";
            }
            isAlternateMessage = true;
        } else {
            messagePara.innerHTML = "This is where I build out my HTML home page content this semester.";
            if (toggleBtn) {
                toggleBtn.textContent = "Change Content";
            }
            isAlternateMessage = false;
        }
    }
}

/**
 * Requirement 4: Additional JavaScript Feature
 * Uses variables, JavaScript Date object, and conditional logic (if/else if/else)
 * to compute a contextual greeting based on current system time.
 */
function displayGreeting() {
    var greetingElement = document.getElementById("timeGreeting");
    if (!greetingElement) return;

    var currentHour = new Date().getHours();
    var greetingText = "";

    if (currentHour < 12) {
        greetingText = "Good Morning! Welcome to my coursework portal.";
    } else if (currentHour < 18) {
        greetingText = "Good Afternoon! Welcome to my coursework portal.";
    } else {
        greetingText = "Good Evening! Welcome to my coursework portal.";
    }

    // Count published projects currently in the directory
    var projectList = document.querySelectorAll(".gradient-box ul li");
    var projectCount = projectList.length;

    greetingElement.innerHTML = greetingText + " <em>Currently showcasing " + projectCount + " published assignments.</em>";
}

// Run the greeting calculation when the DOM content is loaded
document.addEventListener("DOMContentLoaded", displayGreeting);