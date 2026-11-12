# Assignment 9 - Advanced Form Validation with jQuery

## Overview
The Student Registration Portal is an interactive web form demonstrating client-side form validation powered by jQuery. The application ensures data integrity prior to server submission by enforcing input requirements, regex patterns, and length constraints. It provides immediate, contextual visual feedback for invalid fields via live "blur" events and restricts the browser's default submission behavior until all requirements are satisfied.

---

## Instructor Resources & Video Walkthroughs

* [JavaScript, jQuery, and Form Validation Repository](https://github.com/profcorrello/JavaScript-JQuery-and-Form-Validation) – Upstream course repository containing baseline validation strategies, DOM targeting via jQuery, and starter templates.
* [CIS 228 JavaScript JQuery Form Validation](https://www.youtube.com/watch?v=rARPeeRMJOA&list=PLfFD6-ie4BBUPWxOW-iQtEwtj0gHKHa6F) – Instructor lecture and demonstration covering client-side form validation, jQuery event handlers (`submit`, `blur`), and DOM manipulation for visual error feedback.
* [CIS 228 JavaScript JQuery and Form Validation](https://www.youtube.com/watch?v=KSd7yu4u4-4) – Additional instructor walkthrough detailing the integration of regular expressions (regex) and specific field constraint logic.

---

## File Directory

### Primary Application Objects (`/`)
* **`index.html`**: The semantic HTML structure for the Registration Portal. It contains inputs for Name, Username, Email, and Password, alongside dedicated `.error-message` containers. It also loads the jQuery library via CDN.
* **`starter.js`**: The primary JavaScript/jQuery file. It binds a `submit` event listener to the form, executes discrete validation branches for each input, manages focus states, and includes live `blur` validation for immediate user feedback.
* **`style.css`**: The application stylesheet. It dictates standard form layouts and provides the `.error` class styling (red borders and background shading) used to visually highlight invalid inputs.
* **`README.md`**: Project documentation covering the validation rules and script behavior.

### Documentation Materials (`Docs/`)
* **`Assignment 9 Instructions.pdf`**: Official assignment parameters outlining technical requirements, jQuery method constraints, and the grading rubric.

### Reference Demonstration Package (`Example/`)
* **`ajax_demo/`**
  * **`AJAX_DEMO.md`**: Guide explaining asynchronous data fetching using jQuery's `$.ajax()` method.
  * **`index.html`**, **`script.js`**, **`style.css`**: Files demonstrating how to retrieve and render data from a server without a page reload.
* **`assignment/`**
  * **`assignment.md`**: Original Markdown instructions for the advanced form validation assignment.
  * **`index.html`**, **`starter.js`**, **`style.css`**: The initial, unmodified assignment template files provided by the instructor.
* **`/` (Example Root)**
  * **`index.html`**, **`script.js`**, **`style.css`**: Upstream jQuery demonstration files showing baseline form validation implementation.
  * **`README.md`**: Upstream lesson documentation covering the form validation logic and jQuery setup.
  * **`.gitignore`**: Standard repository ignore rules.

---

## Technical Program Flow & Execution Summary

This application implements standard event listeners to handle the complete form validation lifecycle across the following phases:

### Phase 1: Live Blur Validation
When a user clicks into a field and then clicks out (`blur` event), the script immediately validates that specific field. If the input is invalid, it applies the `.error` CSS class and displays a specific warning. If the user corrects the input, the error formatting is immediately removed without waiting for a form submission.

### Phase 2: Default Prevention
Upon clicking the submit button, the script immediately fires `e.preventDefault()`, stopping the browser from refreshing the page or attempting an HTTP POST request before the data is fully validated.

### Phase 3: State Reset
Before validating the submission attempt, the script clears all previous error messages using `$('.error-message').text('')` and removes all visual red borders using `$('input').removeClass('error')` to prevent duplicate or lingering error states.

### Phase 4: Field Checks
A cascading series of `if/else` checks evaluates the trimmed `.val()` of each input:
* **Name**: Verified against an empty string (`=== ''`).
* **Username**: Verified against emptiness, then evaluated for a minimum string length of 5.
* **Email**: Verified against emptiness, then tested against a standard Regular Expression pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) using `.test()`.
* **Password**: Verified against emptiness, then evaluated for a minimum string length of 8.

### Phase 5: UI Feedback & Resolution
If any field fails a check, the global `isValid` flag is marked `false`. The script then uses jQuery's `.first().focus()` to force the browser cursor to jump to the highest input field on the page containing an error. If `isValid` remains `true` across all checks, an alert fires and the native DOM `.reset()` method clears the form for the next user.

---

## Key JavaScript Concepts Demonstrated

* **jQuery Event Handling**: Utilizing `.on('submit')` and `.on('blur')` to capture user interactions and trigger specific validation logic routines.
* **DOM Traversal and Manipulation**: Leveraging jQuery selectors (`$('#id')`), `.text()`, and `.addClass()` / `.removeClass()` to dynamically render contextual error messages and visual feedback states without reloading the page.
* **Regular Expressions (Regex)**: Implementing `emailPattern.test()` to validate complex string structures against a standard email format.

---

## Getting Started

Because this application utilizes a CDN link for jQuery, it does not require a local Node.js environment or build step, but it **does** require an active internet connection to load the library.

1. **Clone or Download** this repository to your local machine.
2. **Launch the Application** by opening `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari).
3. **Interact:**
   * Click "Register Account" without typing anything to trigger the 'Required' errors across all four fields.
   * Click into a field and click away (blur) without entering valid data to see live error rendering.
   * Type short strings into the Username and Password fields to trigger the minimum length errors (5 and 8 characters, respectively).
   * Type a standard string without an `@` or domain into the Email field to trigger the Regex format error.
   * Fill out all fields properly to successfully trigger the confirmation alert and form reset.