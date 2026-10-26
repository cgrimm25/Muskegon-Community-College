# Project 6 - Using Canvas and JavaScript

## Overview
This project enhances the CIS-258 homework home page by integrating interactive client-side scripting based on Appendix B (*JavaScript: The Brains of Your Page*) of *HTML5: The Missing Manual*. The project separates presentation from behavior by migrating JavaScript to an external file (`script.js`), binding functions to three distinct browser event listeners (`mouseover`, `mouseout`, and `click`), altering visible DOM content dynamically, and executing conditional time-of-day greeting logic with directory element counting.

---

## File Directory

### Web Source Files
* **`index.html`**: The root homework home page containing the responsive layout structure, interactive event listeners (`onmouseover`, `onmouseout`, `onclick`), dynamic status indicators, and the external script reference.
* **`style.css`**: The external stylesheet defining responsive fluid columns, REM typography, mobile media queries, and styling for buttons, greetings, and dynamic status badges.
* **`script.js`**: The external JavaScript file containing event handler functions, DOM manipulation routines, and conditional logic.

### Documentation & Reference Materials (`Docs/`)
* **`Project #6 Instructions.pdf`**: Official assignment instructions detailing requirements for external script architecture, event handling, DOM modification, and feature summaries.

---

## Live Deployment & Video Resources

* **Live Student Server URL**: [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)

### Course Video Resources
* [JavaScript Overview In Preparation for Using HTML5 Canvas](https://www.youtube.com/watch?v=j23I9G230iU)
* [HTML5 The Missing Manual - Second Edition - Using A Function Pages: 454-455](https://www.youtube.com/watch?v=MTFihUeLFf4)
* [HTML The Missing Manual - 2nd Edition - Pages 455 - 457 Moving JavaScript to a Script File](https://www.youtube.com/watch?v=NGRjAu9kr1w)
* [HTML5 The Missing Manual - 2nd Edition - Responding to JavaScript Events Pages 457 - 459](https://www.youtube.com/watch?v=LeR4Wy5fSK4&t=1s)
* [HTML5 The Missing Manual - Pages 470 - 476 - JavaScript](https://www.youtube.com/watch?v=KzMYJSu1BJc)

---

## Supplemental Practice & Tutorial Resources

The following interactive W3Schools exercises and textbook companion files were used to reinforce core programming fundamentals during Week 5:

### Variables (Textbook pp. 459–463)
* [W3Schools Variables Demo](https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables): Interactive sandbox modifying and declaring JavaScript string and numeric variables.
* [W3Schools Variables Total Demo](https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_total): Sandbox evaluating variable concatenation, arithmetic summation, and output rendering.
* [W3Schools JavaScript Variables Guide](https://www.w3schools.com/js/js_variables.asp): Tutorial on variable scopes, declaration keywords, and data assignment.

### Conditional Logic & Loops (Textbook pp. 463–465)
* [W3Schools Conditional Logic Demo](https://www.w3schools.com/js/tryit.asp?filename=tryjs_ifthen): Hands-on sandbox experimenting with `new Date().getHours()` time-based conditional branching.
* [W3Schools JavaScript If/Else Tutorial](https://www.w3schools.com/js/js_if_else.asp): Reference for single-condition, multi-branch, and fallback logical checks.
* [W3Schools JavaScript For Loops Tutorial](https://www.w3schools.com/js/js_loop_for.asp): Reference guide covering loop structures, iteration counters, and array traversals.

### Objects & DOM Event Binding (Textbook pp. 468–476)
* [W3Schools JavaScript Objects Guide](https://www.w3schools.com/js/js_objects.asp): Tutorial explaining key-value object structures, method calls, and object properties.
* **Textbook Companion File (`ManipulateAnElement.html`)**: Appendix B publisher demonstration illustrating how inline and dynamic event hooks trigger JavaScript functions to modify live page markup.

---

## Technical Summary & Requirements Implementation

The implementation satisfies all Week 5 Part 1 JavaScript specifications:

| Requirement | Textbook Reference | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. External Script File** | pp. 455–457 | Created `script.js` and linked it externally using `<script src="script.js"></script>` at the end of the `<body>` element. |
| **2. Three Distinct Event Handlers** | pp. 457–459 (Table B-1) | • `mouseover` (`highlightBox()`): Turns the container border yellow (`#facc15`), deepens box-shadow, and updates status text.<br>• `mouseout` (`resetBox()`): Restores default cyan border (`#38bdf8`) and resets status message.<br>• `click` (`toggleWelcomeMessage()`): Triggers text and button state changes upon button selection. |
| **3. Visible Content Change** | pp. 470–476 | `toggleWelcomeMessage()` dynamically alters DOM content by toggling the text of `#dynamicMessage` between original text and a JavaScript confirmation message, while updating `#toggleBtn` label text. |
| **4. Additional JavaScript Feature** | pp. 459–465 | `displayGreeting()` evaluates system time using `new Date().getHours()` with multi-branch conditional logic (`if / else if / else`) to output "Good Morning", "Good Afternoon", or "Good Evening". Uses `document.querySelectorAll()` to dynamically count and display published assignments. |


---

## Getting Started

1. Clone or download this project repository.
2. Ensure `index.html`, `style.css`, and `script.js` remain in the same root folder.
3. Open `index.html` in any modern web browser or visit the live deployment at [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html).