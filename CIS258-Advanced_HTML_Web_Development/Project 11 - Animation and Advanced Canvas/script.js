/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Project #11 - Advanced Canvas
// File Name:   script.js
// Live URL:    http://157.245.246.41:8014/Project11/script.js
// Author:      Chris Grimm
// Date:        11/05/2026
//
// Description:
//   Consolidated logic for 5 advanced canvas topics including:
//   image cropping, text rendering, pattern fills, interactive shapes, 
//   and physics-based animation.
//==================================================================================
*/

var canvas;
var context;

window.onload = function () {
  // =========================================================================
  // TOPIC 1: Part of Image Logic
  // =========================================================================
  // CroppedPicture.html
  if (document.getElementById("cropCanvas")) {
    canvas = document.getElementById("cropCanvas");
    context = canvas.getContext("2d");
    var img = document.getElementById("portrait");
    context.drawImage(img, 0, 0, 200, 100, 75, 25, 200, 100);
  }

  // =========================================================================
  // TOPIC 2: Text Segments Logic
  // =========================================================================
  // Text.html
  if (document.getElementById("textCanvas")) {
    canvas = document.getElementById("textCanvas");
    context = canvas.getContext("2d");
    drawTextSegments();
  }

  // =========================================================================
  // TOPIC 3: Fill a Shape with a Pattern Logic
  // =========================================================================
  // Pattern.html
  if (document.getElementById("patternCanvas")) {
    canvas = document.getElementById("patternCanvas");
    context = canvas.getContext("2d");
    var patternImg = document.getElementById("brickTile");
    var pattern = context.createPattern(patternImg, "repeat");
    context.fillStyle = pattern;
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
  }

  // =========================================================================
  // TOPIC 4: Interactive Circles Topic
  // =========================================================================
  // InteractiveCircles.html
  if (document.getElementById("interactiveCanvas")) {
    canvas = document.getElementById("interactiveCanvas");
    context = canvas.getContext("2d");
    canvas.onmousedown = canvasClickInteractive;
  }

  // =========================================================================
  // TOPIC 5: Animation Topic
  // =========================================================================
  // Animation.html
  if (document.getElementById("animationCanvas")) {
    canvas = document.getElementById("animationCanvas");
    context = canvas.getContext("2d");
    canvas.onmousedown = canvasClickAnimation;
    setTimeout(drawFrame, 20);
  }
};

// =========================================================================
// TOPIC 2: Text Segments Logic
// =========================================================================
function drawTextSegments() {
  // Segment 1
  context.font = "bold 24px Arial";
  context.fillStyle = "#38bdf8";
  context.fillText("1. Standard Filled Text", 20, 40);

  // Segment 2
  context.font = "italic 22px Times New Roman";
  context.fillStyle = "#facc15";
  context.fillText("2. Italicized Serif Text", 20, 90);

  // Segment 3
  context.font = "35px Courier";
  context.strokeStyle = "#22c55e";
  context.lineWidth = 1.5;
  context.strokeText("3. STROKED TEXT", 20, 150);

  // Segment 4
  context.font = "20px Verdana";
  context.fillStyle = "#f8fafc";
  context.shadowColor = "rgba(255, 255, 255, 0.4)";
  context.shadowOffsetX = 2;
  context.shadowOffsetY = 2;
  context.shadowBlur = 4;
  context.fillText("4. Text featuring a drop shadow", 20, 210);

  // Segment 5
  context.shadowColor = "transparent"; // Reset shadow
  context.font = "14px sans-serif";
  context.fillStyle = "#94a3b8";
  context.fillText(
    "5. This completes the five separate text segments requirement.",
    20,
    270,
  );
}

// =========================================================================
// TOPIC 4: Interactive Circles Logic
// =========================================================================

// This function stores the details for a single circle.
function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.isSelected = false;
}

// This array hold all the circles on the canvas.
var circles = [];
var previousSelectedCircle;

function addRandomCircle() {
  // Give the circle a random size and position.
  var radius = randomFromTo(10, 60);
  var x = randomFromTo(0, canvas.width);
  var y = randomFromTo(0, canvas.height);

  // Give the circle a random color.
  var colors = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
  ];
  var color = colors[randomFromTo(0, 6)];

  // Create the new circle.
  var circle = new Circle(x, y, radius, color);

  // Store it in the array.
  circles.push(circle);

  // Redraw the canvas.
  drawCircles();
}

function clearInteractiveCanvas() {
  // Remove all the circles.
  circles = [];

  // Update the display.
  drawCircles();
}

function drawCircles() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Go through all the circles.
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    // Draw the circle.
    context.globalAlpha = 0.85;
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    context.fillStyle = circle.color;
    context.strokeStyle = "white";

    if (circle.isSelected) {
      context.lineWidth = 5;
    } else {
      context.lineWidth = 1;
    }
    context.fill();
    context.stroke();
  }
}

function canvasClickInteractive(e) {
  // Get the canvas click coordinates.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // Look for the clicked circle.
  for (var i = circles.length - 1; i >= 0; i--) {
    var circle = circles[i];
    var distanceFromCenter = Math.sqrt(
      Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2),
    );
    if (distanceFromCenter <= circle.radius) {
      if (previousSelectedCircle != null)
        previousSelectedCircle.isSelected = false;
      previousSelectedCircle = circle;
      circle.isSelected = true;
      drawCircles();
      return;
    }
  }
}

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

// =========================================================================
// TOPIC 5: Animation Logic
// =========================================================================

// These are the details that represent an individual ball.
function Ball(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.strokeColor = "white";
  this.fillColor = "#ef4444";
}

// This is an array that will hold all the balls on the canvas
var animBalls = [];

function addBall() {
  // Get the requested size.
  var radiusInput = document.getElementById("ballSize").value;
  var radius = parseFloat(radiusInput);

  // Safety check: Prevent NaN (empty input) from crashing the drawing loop
  if (isNaN(radius) || radius <= 0) {
    radius = 15;
    document.getElementById("ballSize").value = 15;
  }

  // Create the new ball.
  var ball = new Ball(50, 50, 1, 1, radius);

  // Store it in the ball array.
  animBalls.push(ball);
}

function clearBalls() {
  // Remove all the balls.
  animBalls = [];
}

function drawFrame() {
  // Schedule the next frame FIRST so a math error cannot permanently kill the loop
  setTimeout(drawFrame, 20);

  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  // Go through all the balls.
  for (var i = 0; i < animBalls.length; i++) {
    // Move each ball to its new position.
    var ball = animBalls[i];
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Add in a "gravity" effect that makes the ball fall faster.
    if (ball.y < canvas.height) ball.dy += 0.22;

    // Add in a "friction" effect that slows down the ball's side-to-side motion.
    ball.dx = ball.dx * 0.998;

    // If the ball has hit the side, bounce it.
    if (ball.x + ball.radius > canvas.width) {
      ball.x = canvas.width - ball.radius;
      ball.dx = -ball.dx;
    } else if (ball.x - ball.radius < 0) {
      ball.x = ball.radius;
      ball.dx = -ball.dx;
    }

    // If the ball has hit the bottom or top, bounce it and slow it down slightly.
    if (ball.y + ball.radius > canvas.height) {
      ball.y = canvas.height - ball.radius;
      ball.dy = -ball.dy * 0.96;
    } else if (ball.y - ball.radius < 0) {
      ball.y = ball.radius;
      ball.dy = -ball.dy * 0.96;
    }

    // Check if the user wants lines.
    if (!document.getElementById("connectedBalls").checked) {
      context.beginPath();
      context.fillStyle = ball.fillColor;
    } else {
      context.fillStyle = "white";
    }

    // Draw the ball.
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.lineWidth = 2;
    context.fill();
    context.stroke();
  }
}

function canvasClickAnimation(e) {
  // Get the canvas click coordinates.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // Look for the clicked ball.
  for (var i in animBalls) {
    var ball = animBalls[i];
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
