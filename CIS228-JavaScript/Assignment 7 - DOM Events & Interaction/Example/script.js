// script.js

/**
 * Advanced Event Handling Lab Script
 * Demonstrates Event Delegation, Event Object analysis, and Event Flow.
 */

const cardContainer = document.getElementById('card-container');
const outputPanel = document.getElementById('last-action');

/**
 * Handles the click event using Event Delegation.
 * This listener is attached only to the parent container.
 * @param {MouseEvent} e The event object provided by the browser.
 */
function handleCardClick(e) {
    // --- 1. Event Object Analysis ---
    
    // e.target: The actual element clicked (e.g., the button itself).
    const target = e.target;
    
    // e.currentTarget: The element the listener was attached to (the container).
    const currentTarget = e.currentTarget;

    // Check if the click originated on a button within a card
    if (target.classList.contains('card-button')) {
        // Use closest() to reliably find the parent card element, even if the button is nested.
        const cardElement = target.closest('.card');

        if (cardElement) {
            const cardId = cardElement.dataset.id;
            const cardTitle = cardElement.querySelector('h2').textContent;

            // --- 2. Core Logic: Using e.target data ---
            console.log("=============================================");
            console.log("✅ Event Fired Successfully (Event Delegation)");
            console.log(`Event Type: ${e.type}`);
            console.log(`Is Trusted Event: ${e.isTrusted}`);
            console.log(`Target Element (e.target):`, target);
            console.log(`Listening Container (e.currentTarget):`, currentTarget);
            console.log("---------------------------------------------");
            console.log(`Action Taken: Enrolling in ${cardTitle} (ID: ${cardId})`);
            console.log("---------------------------------------------");
            
            // --- 3. Visual Feedback ---
            outputPanel.textContent = `Successfully processed click on "${cardTitle}". (Delegated from: ${currentTarget.id})`;
        }
    } else {
        // If the click is outside the button but inside the container
        console.log("Click occurred, but not on an actionable button.");
    }
}


/**
 * Initializes the event listeners.
 * We use a single listener on the parent element (Event Delegation).
 */
function initializeEventHandling() {
    console.log("--- Lab Initialized ---");
    console.log("Event Listener attached to: #card-container (Parent)");
    console.log("When you click a child element, the event 'bubbles up' to the parent listener.");

    // Attach the single event listener to the parent container
    cardContainer.addEventListener('click', handleCardClick);
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeEventHandling);
