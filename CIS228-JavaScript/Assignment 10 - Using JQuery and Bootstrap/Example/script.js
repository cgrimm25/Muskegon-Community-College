/**
 * script.js
 * 
 * Demonstrates jQuery usage for enhancing responsiveness and interactivity.
 * This code runs AFTER the DOM is fully loaded.
 */

// Wait until the entire document is ready before executing any code
$(document).ready(function() {

    console.log("--- JS/jQuery Demo Initialized ---");
    console.log("The following scripts demonstrate jQuery's ability to enhance responsiveness.");

    // 1. Demonstrating jQuery Event Handling (The Tab Switcher)
    // Bootstrap 5 uses data attributes for tabs, but we'll use jQuery to intercept clicks
    // and add a custom class or log a message to prove jQuery is active.

    $('#myTab button').on('click', function(e) {
        // Prevent the default Bootstrap tab behavior if we wanted a custom transition
        // e.preventDefault(); 

        const tabName = $(this).attr('id');
        console.log(`[jQuery Event]: Tab clicked! You selected the '${tabName}' tab.`);
        
        // In a real scenario, this is where complex logic (like fetching data via AJAX) would go.
        // Here, we just log the event to confirm the script is working.
        alert(`Success! You clicked the ${tabName.replace('-tab', '').toUpperCase()} tab.`);
    });


    // 2. Demonstrating jQuery DOM Manipulation (Card Interaction)
    // We can attach a simple click handler to all cards to show that jQuery can manipulate elements.
    $('.card').on('click', function() {
        console.log("[jQuery Action]: A card was clicked. Performing a small animation.");
        
        // Example: Add a temporary hover effect on click
        $(this).addClass('card-clicked-effect');
        setTimeout(() => {
            $(this).removeClass('card-clicked-effect');
        }, 500);
    });

    // Note: The actual tab functionality is handled by Bootstrap's JS bundle, 
    // but the console logs and the button click handler prove that jQuery is successfully loaded 
    // and listening for events on the page elements.
});
