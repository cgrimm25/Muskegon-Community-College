/**
 * STUDENT STARTING POINT: Form Validation Assignment
 * 
 * Instructions: Complete the logic within the 'submit' event handler 
 * to perform all required validation checks.
 */

$(document).ready(function() {
    // 1. Attach the submit event handler to the form
    $('#registrationForm').on('submit', function(e) {
        // --- STEP 1: Prevent Default Submission ---
        e.preventDefault();

        // --- STEP 2: Reset State ---
        // Reset all previous error messages and clear error classes
        $('.error-message').text('');
        $('input').removeClass('error');
        
        let isValid = true;

        // =================================================================
        // ===             START VALIDATION LOGIC HERE (STUDENT WORK)    ===
        // =================================================================

        // --- Validation 1: Name (Required) ---
        const name = $('#name').val().trim();
        if (name === '') {
            $('#nameError').text('Full Name is required.');
            $('#name').addClass('error');
            isValid = false;
        }

        // --- Validation 2: Username (Required & Min Length) ---
        const username = $('#username').val().trim();
        if (username === '') {
            $('#usernameError').text('Username is required.');
            $('#username').addClass('error');
            isValid = false;
        } else if (username.length < 5) {
            $('#usernameError').text('Username must be at least 5 characters long.');
            $('#username').addClass('error');
            isValid = false;
        }

        // --- Validation 3: Email (Required & Format) ---
        const email = $('#email').val().trim();
        // Regex for basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (email === '') {
            $('#emailError').text('Email Address is required.');
            $('#email').addClass('error');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            $('#emailError').text('Please enter a valid email format.');
            $('#email').addClass('error');
            isValid = false;
        }

        // --- Validation 4: Password (Required & Min Length) ---
        const password = $('#password').val().trim();
        if (password === '') {
            $('#passwordError').text('Password is required.');
            $('#password').addClass('error');
            isValid = false;
        } else if (password.length < 8) {
            $('#passwordError').text('Password must be at least 8 characters long.');
            $('#password').addClass('error');
            isValid = false;
        }

        // =================================================================
        // ===             END VALIDATION LOGIC HERE (STUDENT WORK)     ===
        // =================================================================


        // --- STEP 3: Handle Submission Result ---
        if (isValid) {
            // Success case
            alert('✅ Success! Form validated successfully. User registered!');
            $('#registrationForm')[0].reset(); // Clear the form
        } else {
            // Failure case: Focus on the first error
            $('.error').first().focus();
        }
    });

    // Optional: Add live feedback (Blur validation) for better UX
    $('#name, #username, #email, #password').on('blur', function() {
        // [Implementation for blur validation can be added here by the student]
    });
});
