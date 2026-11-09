/**
 * CIS 228: Drag and Drop Demonstration Script
 * Implements drag-and-drop functionality using native browser events.
 * @author Clay Corrello and Expert Software Engineering Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all necessary elements
    const draggableItems = document.querySelectorAll('.draggable-item');
    const dropZone = document.getElementById('drop-zone');

    // --- Drag Start Event Handler ---
    /**
     * Handles the start of the drag operation.
     * Sets the data payload for the drop event.
     * @param {DragEvent} e - The drag event object.
     */
    const handleDragStart = (e) => {
        // Store the unique ID (data-id) of the item being dragged
        const itemId = e.target.dataset.id;
        e.dataTransfer.setData('text/plain', itemId); 
        
        // Add a temporary class for visual feedback
        e.target.classList.add('dragging');
    };

    // --- Drag End Event Handler ---
    /**
     * Cleans up the visual state after the drag ends (whether dropped or cancelled).
     * @param {DragEvent} e - The drag event object.
     */
    const handleDragEnd = (e) => {
        // Remove the temporary visual class
        e.target.classList.remove('dragging');
    };

    // --- Drag Over Event Handler (Crucial for allowing drops) ---
    /**
     * Fired continuously while the item is dragged over the drop zone.
     * MUST call preventDefault() to signal that dropping is allowed.
     * @param {DragEvent} e - The drag event object.
     */
    const handleDragOver = (e) => {
        e.preventDefault(); // This is the critical step!
        // Provide visual feedback that the drop zone is active
        dropZone.classList.add('drag-over');
    };

    // --- Drag Leave Event Handler ---
    /**
     * Fired when the item leaves the drop zone.
     * @param {DragEvent} e - The drag event object.
     */
    const handleDragLeave = (e) => {
        // Remove visual feedback when cursor leaves
        dropZone.classList.remove('drag-over');
    };

    // --- Drop Event Handler ---
    /**
     * Handles the successful drop of an item.
     * @param {DragEvent} e - The drop event object.
     */
    const handleDrop = (e) => {
        e.preventDefault();
        
        // Remove visual feedback
        dropZone.classList.remove('drag-over');

        // 1. Retrieve the data passed during dragstart
        const itemId = e.dataTransfer.getData('text/plain');
        
        // 2. Find the original element
        const draggedElement = document.querySelector(`[data-id="${itemId}"]`);

        if (draggedElement) {
            // 3. Create a clone of the element to append to the drop zone
            // This prevents the original element from being removed from the source list.
            const clonedElement = draggedElement.cloneNode(true);
            
            // 4. Reset classes and styling of the cloned element for the new location
            clonedElement.classList.remove('draggable-item');
            clonedElement.classList.add('dropped-card'); 
            
            // 5. Append the clone to the drop zone
            dropZone.appendChild(clonedElement);
            
            console.log(`Item ${itemId} successfully moved to the drop zone.`);
        }
    };

    // ==================================================
    // 2. Attach Event Listeners
    // ==================================================

    // Attach handlers to all draggable items
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    // Attach handlers to the drop zone
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
});
