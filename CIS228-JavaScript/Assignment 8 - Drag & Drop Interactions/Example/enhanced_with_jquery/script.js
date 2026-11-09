/**
 * CIS 228: Drag and Drop Demonstration Script (jQuery Version)
 * Utilizes jQuery to simplify DOM manipulation and event handling.
 */

$(document).ready(function() {
    
    // 1. Bind drag events to all draggable items
    $('.draggable-item').on('dragstart', function(e) {
        // Store the unique ID of the item being dragged
        const itemId = $(this).data('id');
        e.originalEvent.dataTransfer.setData('text/plain', itemId); 
        
        // Add visual feedback
        $(this).addClass('dragging');
    }).on('dragend', function() {
        // Clean up visual state
        $(this).removeClass('dragging');
    });

    // 2. Bind dragover, dragleave, and drop events to the drop zone
    $('#drop-zone').on('dragover', function(e) {
        e.preventDefault(); // CRITICAL: Allows dropping
        $(this).addClass('drag-over');
    }).on('dragleave', function() {
        $(this).removeClass('drag-over');
    }).on('drop', function(e) {
        e.preventDefault();
        $(this).removeClass('drag-over');

        // 1. Retrieve the data passed during dragstart
        const itemId = e.originalEvent.dataTransfer.getData('text/plain');
        
        // 2. Select the original element based on the stored ID
        const $draggedElement = $(`[data-id="${itemId}"]`);

        if ($draggedElement.length) {
            // 3. Clone the element to simulate a successful move
            // We use .clone() to get a copy that can be safely appended.
            const $clonedElement = $draggedElement.clone();
            
            // 4. Clean up classes for the new location
            $clonedElement.removeClass('draggable-item').addClass('dropped-card');
            
            // 5. Append the clone to the drop zone
            $(this).append($clonedElement);
            
            console.log(`Item ${itemId} successfully moved to the drop zone.`);
        }
    });
});
