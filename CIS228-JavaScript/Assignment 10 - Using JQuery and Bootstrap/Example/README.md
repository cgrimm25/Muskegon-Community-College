# 💻 jQuery & Bootstrap Mastery Project

This repository provides a complete educational resource for teaching fundamental front-end development skills, focusing on **responsiveness**, **Bootstrap**, and **jQuery** event handling.

It is divided into two distinct sections:
1.  **🚀 Live Demo:** A fully working example demonstrating best practices.
2.  **🧑‍🎓 Student Assignment:** A scaffolded project challenging students to implement core functionality from scratch.

---

## 🌟 Project Overview

The goal of this module is to teach students how to build a modern, responsive, single-page website using the industry-standard combination of **Bootstrap (CSS/Utility)**, **jQuery (JS)**, and **Custom CSS**.

By mastering this combination, students learn to manage layout, handle complex interactivity, and ensure their site functions flawlessly across all devices.

---

## 🚀 Section 1: The Live Demo (Best Practices Showcase)

This section demonstrates the ideal implementation of the concepts. It serves as a "walkthrough" for students to understand *how* the code should work.

### ✨ Key Features Demonstrated:

*   **Responsive Grid:** Uses `col-md-*` and `col-lg-*` classes to ensure content reflows perfectly on mobile, tablet, and desktop screens.
*   **jQuery Event Handling:** Implements a functional tab system using jQuery to switch content sections dynamically without reloading the page.
*   **Modular Structure:** Clear separation of concerns between HTML (structure), CSS (style), and JavaScript (behavior).

### 🛠️ Usage

Simply open the `index.html` file in a browser to see the fully functional and responsive demo.

---

## 🧑‍🎓 Section 2: Student Assignment (The Challenge)

This section provides a scaffolded, incomplete version of the portfolio. Students must use the provided structure and implement the missing logic in `starter.js` to complete the assignment.

### 🎯 Learning Objectives & Tasks

Students must successfully complete the following three tasks:

1.  **Task 1: Responsiveness (Bootstrap)**
    *   *Requirement:* The layout must use Bootstrap's grid system correctly (already largely set up in `index.html`).
2.  **Task 2: Feature Card Interactivity (jQuery)**
    *   *Requirement:* Implement an event listener that detects a click on the "Learn More" button. Upon clicking, it must smoothly reveal the associated hidden content div using a jQuery animation method (e.g., `.slideDown()`).
3.  **Task 3: Form Validation (jQuery/JS)**
    *   *Requirement:* Intercept the form submission event. Validate that the email field is not empty. If empty, display a specific error message and prevent the form from submitting.

### 💡 Hints Guide for Implementation

To guide students, the following hints are provided for the `starter.js` file:

*   **For Task 2:** Focus on **Event Delegation** using `$(document).on('click', ...)` to target the buttons. Use methods like `.closest()` and `.find()` to navigate the DOM relative to the clicked element.
*   **For Task 3:** The most critical step is using `event.preventDefault()` inside the form submit handler to stop the browser's default action. Use `if/else` logic combined with `$('#id').val()` to check input values.

---

## 🚀 Getting Started

1.  **Clone/Download:** Get the files into a local directory.
2.  **Run:** Open `index.html` in your preferred web browser.
3.  **Study:** Review the structure and functionality, then tackle the challenges in `starter.js`!