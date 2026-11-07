// starter.js
/**
 * Student Assignment Starter File
 * 
 * Goal: Implement the advanced event handling logic for the dashboard.
 * Focus on Event Delegation, Debouncing, and Custom Events.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("--- Assignment Started ---");
    
    // TODO 1: Implement Debouncing for the search feature.
    const searchInput = document.getElementById('feature-search');
    // Implement debounce utility function here
    // searchInput.addEventListener('input', debounce(searchHandler, 300));


    // TODO 2: Implement Event Delegation for the feature cards.
    const cardContainer = document.getElementById('feature-cards');
    // Attach a single listener to the parent container
    cardContainer.addEventListener('click', (e) => {
        // 1. Check if the clicked element or its parent is a button.
        // 2. Use e.target or e.closest() to identify the feature card.
        // 3. Extract the data-feature attribute.
        // 4. Log the result to the console and update the UI log.
    });


    // TODO 3: Implement Pointer/Drag Interaction (Custom Events).
    const handle = document.getElementById('drag-handle');
    const logList = document.getElementById('log-list');
    
    let isDragging = false;

    // Start pointer monitoring on the handle
    handle.addEventListener('pointerdown', (e) => {
        // Prevent default browser drag behavior
        e.preventDefault(); 
        isDragging = true;
        console.log("Pointer Down: Dragging started.");
    });

    // Track movement and dispatch a custom event
    handle.addEventListener('pointermove', (e) => {
        if (isDragging) {
            // Dispatch a custom event that carries data about the drag (e.g., direction)
            // The event should bubble up to the document or a parent listener.
        }
    });

    // End pointer monitoring
    handle.addEventListener('pointerup', (e) => {
        if (isDragging) {
            // Dispatch a final custom event to signal completion.
            // This event should trigger the final result log.
        }
        isDragging = false;
    });
});
