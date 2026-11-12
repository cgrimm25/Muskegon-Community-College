# CIS 228 Assignment: Advanced Form Validation with jQuery

## Objective
This assignment requires you to demonstrate proficiency in using jQuery for client-side event handling and implementing robust form validation logic. You will take an existing registration form and implement the validation rules defined below.

## Prerequisites
*   Basic understanding of HTML structure.
*   Familiarity with jQuery selectors and methods (`.on()`, `.val()`, `.text()`, `.addClass()`).
*   Ability to use JavaScript conditional statements (`if/else`).

## The Task
Your goal is to complete the logic within `starter.js`. When the user attempts to submit the form, your script must perform the following checks:

1.  **Name Field:** Must not be empty.
2.  **Username Field:** Must not be empty, and must be at least 5 characters long.
3.  **Email Field:** Must not be empty and must conform to a basic email pattern (e.g., user@domain.com).
4.  **Password Field:** Must not be empty and must be at least 8 characters long.

**Validation Requirements:**
*   **Prevent Default:** If validation fails, the form submission must be stopped (`e.preventDefault()`).
*   **User Feedback:** For *each* failed validation, an error message must appear immediately below the field, and the field itself must be visually highlighted using the `.error` CSS class.
*   **Focus:** If the validation fails, the browser focus should automatically jump to the *first* field that failed validation.
*   **Success:** If *all* fields pass validation, an alert box confirming success must be shown, and the form should be cleared.

## Deliverables
Submit the following files:
1.  `index.html`
2.  `style.css`
3.  `starter.js` (Your completed work)

## Grading Rubric (Total: 100 Points)
| Component | Points | Description |
| :--- | :--- | :--- |
| **Structure & Linking** | 10 | Correct linking of jQuery, CSS, and JS. |
| **Event Handling** | 20 | Correctly using `$(document).ready()` and preventing default form submission. |
| **Name Validation** | 20 | Correctly checking for emptiness and displaying the error. |
| **Username Validation** | 20 | Correctly checking for emptiness AND minimum length (5 characters). |
| **Email Validation** | 20 | Correctly checking for emptiness AND valid regex format. |
| **Password Validation** | 10 | Correctly checking for emptiness AND minimum length (8 characters). |
