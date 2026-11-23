//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Final Project - Professional Portfolio
// File Name:   canvas.js
// Live URL:    http://157.245.246.41:8014/FinalProject/JavaScript/canvas.js
// Author:      Chris Grimm
// Date:        11/23/2026
//
// Description:
//   Satisfies Rubric Requirement 7 (HTML Canvas) and Requirement 11 (Going Beyond).
//   Draws an interactive particle network representing a tech stack. Particles bounce 
//   off the canvas edges and draw connecting lines when the user's mouse nears them.
//==================================================================================

const canvas = document.getElementById("portfolioCanvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const skills = ["CLLE", "DDS", "RPGLE", "SQLRPGLE","SQL", "IBM i", "Bootstrap", "JavaScript", "HTML5", "CSS3", "DB2", "JSON", "REST APIs"];

// RUBRIC REQUIREMENT 11: Going Beyond the Basics (40 points)
// Tracks pointer coordinates within a 100px radius to dynamically connect nearby nodes.
let mouse = {
    x: null,
    y: null,
    radius: 100 // Area of effect for drawing connection lines
};

// Track mouse movement over the canvas
canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.x - rect.left;
    mouse.y = event.y - rect.top;
});

// Remove mouse coordinates when leaving canvas so lines don't get stuck
canvas.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
});

// RUBRIC REQUIREMENT 8: Responsive Design (50 points)
// Sizes the canvas dynamically to match its responsive parent container.
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

// RUBRIC REQUIREMENT 7 & 11: Object-oriented Particle class for node rendering and motion
class Particle {
    constructor(x, y, dx, dy, size, text) {
        this.x = x;
        this.y = y;
        this.dx = dx; // velocity x
        this.dy = dy; // velocity y
        this.size = size;
        this.text = text;
    }

    // Draw the dot and skill text
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#00f2fe'; // Bright cyan
        ctx.fill();
        
        ctx.font = "12px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x + 8, this.y + 4);
    }

    // Move the particle and bounce off walls
    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

// Populate the particle array
function init() {
    particlesArray = [];
    resizeCanvas();
    for (let i = 0; i < skills.length; i++) {
        let size = 3;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let dx = (Math.random() - 0.5) * 1.5;
        let dy = (Math.random() - 0.5) * 1.5;
        particlesArray.push(new Particle(x, y, dx, dy, size, skills[i]));
    }
}

// Draw lines between particles if the mouse is near them
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        // Connect to mouse
        if (mouse.x != null && mouse.y != null) {
            let dxMouse = mouse.x - particlesArray[a].x;
            let dyMouse = mouse.y - particlesArray[a].y;
            let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
            
            if (distanceMouse < mouse.radius) {
                opacityValue = 1 - (distanceMouse / mouse.radius);
                ctx.strokeStyle = 'rgba(0, 242, 254,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

// RUBRIC REQUIREMENT 11: Continuous requestAnimationFrame loop for smooth canvas animation
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function() {
    resizeCanvas();
    init(); // Re-initialize particles to prevent them getting stuck out of bounds
});

init();
animate();