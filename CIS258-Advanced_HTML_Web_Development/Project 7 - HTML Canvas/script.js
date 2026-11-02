/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Project #7 - Drawing with Canvas
// File Name:   script.js
// Live URL:    http://157.245.246.41:8014/script.js
// Author:      Chris Grimm
// Date:        11/01/2026
//
// Description:
//   External JavaScript handling home page DOM interactivity and Chapter 8 Canvas API:
//   - Three DOM events: mouseover, mouseout, click.
//   - Dynamic time greeting and project counting.
//   - Canvas 2D context drawing: 6 distinct items (arc, triangle, rectangle, 2 lines,
//     and polygon), 2D transformations (translate + rotate), and composite operation ("xor").
//==================================================================================
*/

// Track toggle state for the click event
let isAlternateMessage = false;

/**
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
 * Additional Feature: Dynamic Time-of-Day Greeting and Assignment Counter
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

/**
 * =========================================================================
 * Project #7: Chapter 8 HTML5 Canvas Drawing
 * Implements Requirements 1, 2, and 3
 * =========================================================================
 */
function drawCanvasGraphics() {
    var canvas = document.getElementById("myCanvas");
    if (!canvas || !canvas.getContext) return;

    var context = canvas.getContext("2d");

    // Clear canvas before drawing
    context.clearRect(0, 0, canvas.width, canvas.height);

    // =========================================================================
    // REQUIREMENT 1 - ITEM 1: Rectangle (Background Panel) - pp. 248-249
    // Features defined fill and stroke
    // =========================================================================
    context.fillStyle = "#0f172a";
    context.fillRect(10, 10, 480, 340);
    context.lineWidth = 3;
    context.strokeStyle = "#38bdf8";
    context.strokeRect(10, 10, 480, 340);

    // =========================================================================
    // REQUIREMENT 1 - ITEM 2: Arc or Circle (Golden Orb) - pp. 251-253
    // Features defined fill and stroke
    // =========================================================================
    context.beginPath();
    context.arc(80, 80, 45, 0, Math.PI * 2, true);
    context.fillStyle = "#eab308";
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = "#fef08a";
    context.stroke();

    // =========================================================================
    // REQUIREMENT 1 - ITEM 3: Triangle (Cyan Geometric Arrow) - pp. 250-251
    // Features defined fill and stroke
    // =========================================================================
    context.beginPath();
    context.moveTo(80, 160);
    context.lineTo(140, 260);
    context.lineTo(20, 260);
    context.closePath();
    context.fillStyle = "#06b6d4";
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "#cffafe";
    context.stroke();

    // =========================================================================
    // REQUIREMENT 1 - ITEM 4: Line 1 (Horizontal Dividing Line) - pp. 249-250
    // Features visible stroke
    // =========================================================================
    context.beginPath();
    context.moveTo(25, 290);
    context.lineTo(475, 290);
    context.lineWidth = 2;
    context.strokeStyle = "#94a3b8";
    context.stroke();

    // =========================================================================
    // REQUIREMENT 1 - ITEM 5: Line 2 (Accent Line with Round Cap) - pp. 249-250
    // Features visible stroke and custom lineCap
    // =========================================================================
    context.beginPath();
    context.moveTo(30, 325);
    context.lineTo(210, 325);
    context.lineWidth = 8;
    context.lineCap = "round";
    context.strokeStyle = "#22c55e";
    context.stroke();

    // =========================================================================
    // REQUIREMENT 1 - ITEM 6: Additional Shape (Diamond Badge) - pp. 250-251
    // REQUIREMENT 3: Transformation (pp. 256-260)
    // Uses context.translate() and context.rotate() to transform coordinate matrix
    // =========================================================================
    context.save(); // Save default coordinate matrix
    context.translate(400, 85); // Shift coordinate center to diamond position
    context.rotate((35 * Math.PI) / 180); // Rotate coordinate system by 35 degrees

    context.beginPath();
    context.rect(-35, -35, 70, 70);
    context.fillStyle = "#8b5cf6"; // Purple fill
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = "#ddd6fe";
    context.stroke();
    context.restore(); // Restore default unrotated coordinate matrix

    // =========================================================================
    // REQUIREMENT 2: Apply a Composite Operation (pp. 262-263)
    // Overlaps two shapes and applies "xor" operation to create cutout effect
    // =========================================================================
    // Shape A: Destination Shape (Red-Orange Circle)
    context.beginPath();
    context.arc(260, 165, 55, 0, Math.PI * 2);
    context.fillStyle = "#ea580c";
    context.fill();

    // Apply composite operation
    context.globalCompositeOperation = "xor";

    // Shape B: Source Shape (Cyan Square overlapping Shape A)
    context.fillStyle = "#0284c7";
    context.fillRect(230, 135, 90, 90);

    // Reset composite operation back to default for clean state
    context.globalCompositeOperation = "source-over";
}

// Initialize DOM features and canvas render on load
document.addEventListener("DOMContentLoaded", function () {
    displayGreeting();
    drawCanvasGraphics();
});

