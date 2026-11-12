/**
 * script.js
 * Demonstrates AJAX fetching using jQuery.
 * The script waits for the DOM to be fully loaded before attaching event listeners.
 */

// Define the API endpoint for the demo data
// Using a reliable placeholder API for demonstration purposes
const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// Use jQuery's document ready function to ensure the script runs after the HTML is fully loaded
$(document).ready(function() {

    /**
     * Updates the status message element with the given class and text.
     * @param {string} className - 'loading', 'success', or 'error'.
     * @param {string} message - The message to display.
     */
    function updateStatus(className, message) {
        const $status = $('#statusMessage');
        $status.removeClass('loading success error');
        $status.addClass(className);
        $status.text(message);
    }

    /**
     * Renders the fetched data into the results area.
     * @param {object} data - The data object received from the API.
     */
    function displayData(data) {
        const $resultsArea = $('#resultsArea');
        $resultsArea.empty().removeClass('placeholder-text');

        // Assuming the data structure has 'title', 'body', and 'userId' (common JSON placeholder structure)
        
        let htmlContent = `
            <div class="data-item">
                <strong>Title:</strong> ${data.title}
            </div>
            <div class="data-item">
                <strong>User ID:</strong> ${data.userId}
            </div>
            <div class="data-item">
                <strong>Body Content:</strong> ${data.body}
            </div>
        `;

        $resultsArea.html(htmlContent);
    }

    // Attach the click event listener to the button
    $('#fetchDataButton').on('click', function() {
        
        // 1. Reset and set loading state
        updateStatus('loading', '⏳ Fetching data from the server... Please wait.');
        $('#resultsArea').empty().removeClass('placeholder-text');

        // 2. Perform the AJAX request using jQuery's $.ajax method
        $.ajax({
            url: API_URL, // Target API endpoint
            type: 'GET',  // HTTP method
            dataType: 'json', // Expecting JSON data
            
            // Success callback function
            success: function(data) {
                // Data was successfully retrieved
                updateStatus('success', '✅ Data loaded successfully!');
                displayData(data);
            },
            
            // Error callback function
            error: function(jqXHR, textStatus, errorThrown) {
                // An error occurred during the request
                console.error("AJAX Error:", textStatus, errorThrown);
                updateStatus('error', `❌ Error: Could not load data. Details: ${errorThrown || textStatus}`);
                $('#resultsArea').html('<p class="placeholder-text">Failed to load data. Check the console for details.</p>');
            },
            
            // Complete callback function (runs regardless of success or error)
            complete: function() {
                // Optionally update status here
            }
        });
    });

});
