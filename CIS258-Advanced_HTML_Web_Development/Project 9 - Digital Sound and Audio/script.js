/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Project #9 - Bouncing Ball with Sound
// File Name:   script.js
// Live URL:    http://157.245.246.41:8014/script.js
// Author:      Chris Grimm
// Date:        11/04/2026
//
// Description:
//   Consolidated client-side script servicing index.html and SoundEffects.html:
//   - Home Page: DOM interactivity, greeting, and Project #7 Canvas rendering.
//   - Project #9: Ball constructor with custom cyan fill and 10px red outline,
//     animation loop, physics (gravity/friction), collision sound effects, and audio.
//==================================================================================
*/

// =============================================================================
// SECTION 1: Home Page Interactivity (index.html)
// =============================================================================

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
      messagePara.innerHTML =
        "<strong>JavaScript Active:</strong> You successfully triggered a DOM update via an external click event listener!";
      if (toggleBtn) {
        toggleBtn.textContent = "Reset Message";
      }
      isAlternateMessage = true;
    } else {
      messagePara.innerHTML =
        "This is where I build out my HTML home page content this semester.";
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

  greetingElement.innerHTML =
    greetingText +
    " <em>Currently showcasing " +
    projectCount +
    " published assignments.</em>";
}

// =========================================================================
// HTML5 Canvas Drawing
// =========================================================================

function drawCanvasGraphics() {
  var canvas = document.getElementById("myCanvas");
  if (!canvas || !canvas.getContext) return;

  var context = canvas.getContext("2d");

  // Clear canvas before drawing
  context.clearRect(0, 0, canvas.width, canvas.height);

  // ITEM 1: Rectangle (Background Panel)
  context.fillStyle = "#0f172a";
  context.fillRect(10, 10, 480, 340);
  context.lineWidth = 3;
  context.strokeStyle = "#38bdf8";
  context.strokeRect(10, 10, 480, 340);

  // ITEM 2: Arc or Circle (Golden Orb)
  context.beginPath();
  context.arc(80, 80, 45, 0, Math.PI * 2, true);
  context.fillStyle = "#eab308";
  context.fill();
  context.lineWidth = 4;
  context.strokeStyle = "#fef08a";
  context.stroke();

  // ITEM 3: Triangle (Cyan Geometric Arrow)
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

  // ITEM 4: Line 1 (Horizontal Dividing Line)
  context.beginPath();
  context.moveTo(25, 290);
  context.lineTo(475, 290);
  context.lineWidth = 2;
  context.strokeStyle = "#94a3b8";
  context.stroke();

  // ITEM 5: Line 2 (Accent Line with Round Cap)
  context.beginPath();
  context.moveTo(30, 325);
  context.lineTo(210, 325);
  context.lineWidth = 8;
  context.lineCap = "round";
  context.strokeStyle = "#22c55e";
  context.stroke();

  // ITEM 6: Additional Shape (Diamond Badge) * Transformation
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

  // Composite Operation ("xor")
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

// =============================================================================
// SECTION 2: Project #9 Bouncing Ball Logic (SoundEffects.html)
// =============================================================================

/**
 * Ball constructor.
 * Requirement 3: Color other than green or brown (cyan: #06b6d4).
 * Requirement 4: Red outline with a line width of 10.
 */
function Ball(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.strokeColor = "red"; // Requirement: Red outline
  this.fillColor = "#06b6d4"; // Requirement: Non-green, non-brown fill (Cyan)
}

// Global state variables for the bouncing ball animation
var balls = [];
var canvas;
var context;


// Single window.onload initializing whichever page is open
window.onload = function() {
  // If on index.html, load greeting and canvas showcase
  if (document.getElementById("myCanvas")) {
    displayGreeting();
    drawCanvasGraphics();
  }

  // If on SoundEffects.html, initialize bouncing ball canvas
  canvas = document.getElementById("ballCanvas");
  if (canvas) {
    context = canvas.getContext("2d");
    canvas.onmousedown = canvasClick;

    // Redraw every 20 milliseconds.
    setTimeout(drawFrame, 20);
  }
};

function addBall() {
  // Get the requested size.
  var radius = parseFloat(document.getElementById("ballSize").value);

  // Create the new ball.
  var ball = new Ball(50, 50, 1, 1, radius);

  // Store it in the ball array.
  balls.push(ball);

  // Play background music, if it's not already playing.
  document.getElementById("backgroundMusic").play();
}

function clearBalls() {
  // Remove all the balls.
  balls = [];

  // Stop background music.
  document.getElementById("backgroundMusic").pause();
  document.getElementById("backgroundMusic").currentTime = 0;
}

/**
 * Renders each animation frame: physics calculations, wall collisions, and ball drawing.
 */
function drawFrame() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Note that you need to call beginPath() to make sure you don't redraw part of what
  // you were drawing before.
  context.beginPath();

  // Go through all the balls.
  for (var i in balls) {

    // Move each ball to its new position.
    var ball = balls[i];
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Add in a "gravity" effect that makes the ball fall faster.
    if (ball.y < canvas.height) ball.dy += 0.22;

    // Add in a "friction" effect that slows down the ball's side-to-side motion.
    ball.dx = ball.dx * 0.998;

    // If the ball has hit the side, bounce it.
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      boing();
      ball.dx = -ball.dx;
    }

    // If the ball has hit the bottom, bounce it, but slow it down slightly.
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      boing();
      ball.dy = -ball.dy * 0.96;
    }

    // Check if the user wants lines.
    if (!document.getElementById("connectedBalls").checked) {
      context.beginPath();
      context.fillStyle = ball.fillColor;
    } else {
      context.fillStyle = "white";
    }

    // Requirement 4: Draw the ball with a 10px red outline.
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.strokeStyle = ball.strokeColor;
    context.lineWidth = 10;
    context.fill();
    context.stroke();
  }

  // Draw the next frame in 20 milliseconds.
  setTimeout(drawFrame, 20);
}

/**
 * Shifts velocity when an existing ball is clicked.
 */
function canvasClick(e) {
  // Get the canvas click coordinates.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // Look for the clicked ball.
  for (var i in balls) {
    var ball = balls[i];
    if (clickX > ball.x - ball.radius && clickX < ball.x + ball.radius) {
      if (clickY > ball.y - ball.radius && clickY < ball.y + ball.radius) {
        // Change the clicked ball's speed.
        ball.dx -= 2;
        ball.dy -= 3;
        return;
      }
    }
  }
}

/**
 * Cycles through collision audio elements on bounce.
 */
var audioElementCount = 3;
var audioElementIndex = 1;

function boing() {
  var audioElementName = "audio" + audioElementIndex;
  var audio = document.getElementById(audioElementName);

  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(function () {});
  }

  if (audioElementIndex === audioElementCount) {
    audioElementIndex = 1;
  } else {
    audioElementIndex += 1;
  }
}


