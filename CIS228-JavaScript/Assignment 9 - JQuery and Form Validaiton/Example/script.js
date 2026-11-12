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
