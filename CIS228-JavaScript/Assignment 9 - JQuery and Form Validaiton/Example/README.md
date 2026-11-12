### Markdown Description

This application provides a front-end demonstration of basic form validation using jQuery, suitable for a JavaScript introductory course. The goal is to validate user input (Name, Email, Password) before allowing form submission.

**Functionality and Logic:**

1.  **Structure (`index.html`):** Sets up a simple registration form. It includes links to the necessary external resources: jQuery (via CDN), `style.css`, and the custom validation script, `script.js`.
2.  **Styling (`style.css`):** Provides basic, clean styling for readability. Crucially, it includes a class (`.error`) to visually highlight fields that fail validation.
3.  **Validation (`script.js`):**
    *   It uses the `$(document).ready()` wrapper to ensure the DOM is fully loaded before attaching event handlers.
    *   It attaches a `submit` event handler to the form.
    *   When the form is submitted, it prevents the default submission behavior (`e.preventDefault()`).
    *   It performs three validation checks using jQuery selectors and JavaScript methods:
        *   **Name:** Checks if the field is empty.
        *   **Email:** Checks if the field is empty and uses a basic regex pattern check for email format.
        *   **Password:** Checks if the field is empty and if the password meets a minimum length requirement (e.g., 6 characters).
    *   If validation fails, it displays a specific error message next to the offending field and scrolls the user's focus to the first error.
    *   If all validations pass, it simulates a successful submission by showing a success alert.

**Setup Instructions:**

1.  Create a directory for your project.
2.  Create three files inside this directory: `index.html`, `style.css`, and `script.js`.
3.  Copy the respective code blocks into these files.
4.  Open `index.html` in a web browser to run the demonstration.

***

### Code Sample

**`index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CIS 228 Form Validation Demo</title>
    
    <!-- Link the external CSS file -->
    <link rel="stylesheet" href="style.css">
    
    <!-- Include jQuery library from CDN -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>User Registration Demo</h1>
        <p>This form uses jQuery to demonstrate client-side form validation.</p>
        
        <form id="registrationForm">
            
            <div class="form-group">
                <label for="name">Full Name:</label>
                <input type="text" id="name" name="name" required>
                <div class="error-message" id="nameError"></div>
            </div>

            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" required>
                <div class="error-message" id="emailError"></div>
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                <div class="error-message" id="passwordError"></div>
            </div>

            <button type="submit">Register Account</button>
        </form>
    </div>

    <!-- Link the custom JavaScript file -->
    <script src="script.js"></script>
</body>
</html>
```

**`style.css`**
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f7f9;
    display: flex;
    justify-content: center;
    padding: 40px;
}

.container {
    background-color: #ffffff;
    padding: 30px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
}

h1 {
    color: #333;
    text-align: center;
    margin-bottom: 10px;
}

p {
    text-align: center;
    color: #666;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #555;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; /* Ensures padding doesn't increase overall width */
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
    border-color: #007bff;
    outline: none;
}

/* Styling for validation errors */
.error-message {
    color: #dc3545; /* Red color for errors */
    font-size: 0.9em;
    margin-top: 5px;
    height: 1.2em; /* Reserves space even when empty */
}

/* Styling for inputs that have failed validation */
.error {
    border-color: #dc3545 !important;
    background-color: #f8d7da; /* Light red background */
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 15px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
```

**`script.js`**
```javascript
/**
 * CIS 228 Form Validation Demo Script
 * Uses jQuery to handle client-side form validation.
 * Attaches event listeners and validation logic to the registration form.
 */

$(document).ready(function() {

    // 1. Attach the submit event handler to the form
    $('#registrationForm').on('submit', function(e) {
        // Prevent the default form submission behavior (which would cause a page reload)
        e.preventDefault();

        // Reset all previous error messages and styles
        $('.error-message').text('');
        $('input').removeClass('error');

        let isValid = true;

        // --- Validation Functions ---

        // Validate Name: Must not be empty
        const name = $('#name').val().trim();
        if (name === '') {
            $('#nameError').text('Full Name is required.');
            $('#name').addClass('error');
            isValid = false;
        }

        // Validate Email: Must not be empty and must match a basic email pattern
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic regex for email
        if (email === '') {
            $('#emailError').text('Email Address is required.');
            $('#email').addClass('error');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            $('#emailError').text('Please enter a valid email format (e.g., user@domain.com).');
            $('#email').addClass('error');
            isValid = false;
        }

        // Validate Password: Must not be empty and must be at least 6 characters
        const password = $('#password').val().trim();
        if (password === '') {
            $('#passwordError').text('Password is required.');
            $('#password').addClass('error');
            isValid = false;
        } else if (password.length < 6) {
            $('#passwordError').text('Password must be at least 6 characters long.');
            $('#password').addClass('error');
            isValid = false;
        }
        
        // --- Submission Handling ---

        if (isValid) {
            // If all fields are valid
            alert('✅ Success! Form validated successfully. (In a real app, data would be sent to a server here)');
            
            // Optional: Clear the form fields upon successful submission simulation
            $('#registrationForm')[0].reset();
        } else {
            // If validation failed, focus on the first invalid field for better UX
            $('.error').first().focus();
        }
    });

    // Optional: Add live feedback (blur validation) for better UX
    $('#name, #email, #password').on('blur', function() {
        // Re-run specific validation checks when the field loses focus
        const fieldId = $(this).attr('id');
        let hasError = false;

        if (fieldId === 'name') {
            if ($(this).val().trim() === '') {
                $('#nameError').text('Full Name is required.');
                $(this).addClass('error');
                hasError = true;
            } else {
                $('#nameError').text('');
                $(this).removeClass('error');
            }
        } 
        
        else if (fieldId === 'email') {
            const email = $(this).val().trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                $('#emailError').text('Email Address is required.');
                $(this).addClass('error');
                hasError = true;
            } else if (!emailPattern.test(email)) {
                $('#emailError').text('Please enter a valid email format.');
                $(this).addClass('error');
                hasError = true;
            } else {
                $('#emailError').text('');
                $(this).removeClass('error');
            }
        } 
        
        else if (fieldId === 'password') {
            const password = $(this).val().trim();
            if (password === '') {
                $('#passwordError').text('Password is required.');
                $(this).addClass('error');
                hasError = true;
            } else if (password.length < 6) {
                $('#passwordError').text('Password must be at least 6 characters long.');
                $(this).addClass('error');
                hasError = true;
            } else {
                $('#passwordError').text('');
                $(this).removeClass('error');
            }
        }
    });

});
```