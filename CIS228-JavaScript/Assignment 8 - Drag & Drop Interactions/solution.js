/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228 JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #8 - Digital Sorting Station
// File Name:   solution.js
// Author:      Chris Grimm
// Date:        11/09/2026
//
// Description:
//   Core logic for native HTML5 drag and drop functionality. Manages the 
//   dragstart/dragend events on source cards, dragover/dragleave visual 
//   feedback on target zones, and executes a deep clone operation on drop.
//==================================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // === START CODING HERE ===
    // 1. Get references to all required elements
    const draggableItems = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-zone');

    // 2. Implement the dragstart and dragend handlers for the source items.
    //    (Attach these handlers to all items in the 'draggableItems' NodeList)
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {

            // Must set the item's data-id into the dataTransfer object.
            e.dataTransfer.setData('text/plain', e.target.dataset.id);

            // Must add the 'dragging' class for visual feedback.
            e.target.classList.add('dragging');
        });

        item.addEventListener('dragend', (e) => {

            // Must remove the 'dragging' class for visual feedback.
            e.target.classList.remove('dragging');
        });
    });

    // 3. Implement the dragover handler for the drop zones.
    //    (Attach this handler to all elements in the 'dropZones' NodeList)
    dropZones.forEach(zone => {
        
        // - CRITICAL: Must call event.preventDefault() and apply the 'drag-over' class.
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.currentTarget.classList.add('drag-over');
        });

        // 4. Implement the dragleave handler for the drop zones.
        //    (Attach this handler to all elements in the 'dropZones' NodeList)
        zone.addEventListener('dragleave', (e) => {

            // Must remove the 'drag-over' class
            e.currentTarget.classList.remove('drag-over');
        });

        // 5. Implement the drop handler for the drop zones.
        //    (Attach this handler to all elements in the 'dropZones' NodeList)
        zone.addEventListener('drop', (e) => {
            
            // Prevent default browser behavior 
            e.preventDefault();

            // Remove visual highlight upon successful drop
            e.currentTarget.classList.remove('drag-over');
            
            // Must retrieve the item ID from the event dataTransfer.
            const itemId = e.dataTransfer.getData('text/plain');
            
            // Find the original element using the ID.
            const originalElement = document.querySelector(`[data-id="${itemId}"]`);
            
            if (originalElement) {

                // Clone the original element (DO NOT MOVE IT).
                const clonedElement = originalElement.cloneNode(true);

                // Append the clone to the current drop zone.
                e.currentTarget.appendChild(clonedElement);
            }
        });
    });
    // === END CODING HERE ===

});