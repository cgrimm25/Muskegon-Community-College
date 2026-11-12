/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228 JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #9 - Advanced Form Validation with jQuery
// File Name:   starter.js
// Author:      Chris Grimm
// Date:        11/12/2026
//
// Description:
//   jQuery script implementing client-side form validation. Captures the form
//   submission, validates the Name, Username, Email, and Password against regex
//   and length constraints, and provides visual feedback to the DOM.
//==================================================================================
*/

/**
 * STUDENT STARTING POINT: Form Validation Assignment
 * 
 * Instructions: Complete the logic within the 'submit' event handler 
 * to perform all required validation checks.
**/

$(document).ready(function() {
    // 1. Attach the submit event handler to the form
    $('#registrationForm').on('submit', function(e) {
        // --- STEP 1: Prevent Default Submission ---
        // Prevent the default form submission behavior (which would cause a page reload)
        e.preventDefault();

        // --- STEP 2: Reset State ---
        // Reset all previous error messages and clear error classes
        $('.error-message').text('');
        $('input').removeClass('error');
        
        let isValid = true;

        // =================================================================
        // ===             START VALIDATION LOGIC HERE (STUDENT WORK)    ===
        // =================================================================

        // --- Validation Functions ---

        // --- Validation 1: Name (Required) ---
        // Validate Name: Must not be empty
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
        // Validate Email: Must not be empty and must match a basic email pattern
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
        // Validate Password: Must not be empty and must be at least 8 characters
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

        // --- Submission Handling ---

        // --- STEP 3: Handle Submission Result ---
        if (isValid) {
            // If all fields are valid
            // Success case
            alert('✅ Success! Form validated successfully. User registered!');
            // Clear the form fields upon successful submission simulation
            $('#registrationForm')[0].reset(); 
        } else {
            // Failure case: Focus on the first error
            $('.error').first().focus();
        }
    });

    // Optional: Add live feedback (Blur validation) for better UX
    $('#name, #username, #email, #password').on('blur', function() {
        // [Implementation for blur validation can be added here by the student]
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
        
        else if (fieldId === 'username') {
            const username = $(this).val().trim();
            if (username === '') {
                $('#usernameError').text('Username is required.');
                $(this).addClass('error');
                hasError = true;
            } else if (username.length < 5) {
                $('#usernameError').text('Username must be at least 5 characters long.');
                $(this).addClass('error');
                hasError = true;
            } else {
                $('#usernameError').text('');
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
            } else if (password.length < 8) {
                $('#passwordError').text('Password must be at least 8 characters long.');
                $(this).addClass('error');
                hasError = true;
            } else {
                $('#passwordError').text('');
                $(this).removeClass('error');
            }
        }
    });
});
