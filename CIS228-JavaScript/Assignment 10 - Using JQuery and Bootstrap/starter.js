/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #10 - Using jQuery and Bootstrap
// File Name:   starter.js
// Author:      Chris Grimm
// Date:        11/24/2026
//
// Description:
//   jQuery script implementing smooth feature card expansion via event
//   delegation and client-side email validation for the portfolio contact form.
//==================================================================================
*/

/**
 * starter.js
 * 
 * ====================================================================
 * STUDENT TASK AREA
 * 
 * COMPLETE THE FOLLOWING TASKS using jQuery:
 * 
 * 1. Feature Card Expansion: When a 'Learn More' button is clicked, 
 *    the associated hidden content div must smoothly reveal itself.
 * 
 * 2. Form Validation: When the contact form is submitted, the script must:
 *    a) Prevent the default form submission behavior.
 *    b) Check if the email input is empty.
 *    c) If empty, display an error message and prevent submission.
 *    d) If valid, show a success message and clear the form.
 * 
 * Remember to wrap all code in $(document).ready(function() { ... });
 * ====================================================================
 */
 
$(document).ready(function() {
    // START YOUR CODE HERE

    // Hide card details on load and let jQuery handle validation instead of HTML5 'required'
    $('.hidden-content').hide();
    $('#contactForm').attr('novalidate', 'novalidate');
    
    // 1. Feature Card Expansion
    $('#features').on('click', '.learn-more-btn', function() {
        const $card = $(this).closest('.card');
        const $hiddenContent = $card.find('.hidden-content');
        $hiddenContent.slideToggle();
    });

    // 2. Form Validation
    $('#contactForm').on('submit', function(event) {
        // a) Prevent the default form submission behavior.
        event.preventDefault();

        // Clear any previous error message
        $('#emailError').text('');

        // b) Check if the email input is empty.
        const email = $('#emailInput').val().trim();

        if (email === '') {
            // c) If empty, display an error message and prevent submission.
            $('#emailError').text('Please enter your email address.');
            $('#emailInput').focus();
        } else {
            // d) If valid, show a success message and clear the form.
            alert('Thank you! Your message has been sent.');
            $('#contactForm')[0].reset();
        }
    });
});