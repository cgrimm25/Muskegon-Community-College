### Markdown Description

This revised application implements the exact same drag-and-drop functionality but replaces the vanilla JavaScript DOM API with **jQuery**.

**Comparison and New Functionality (Vanilla JS vs. jQuery):**

The core difference is that jQuery provides a simplified, chainable syntax for handling common web tasks, significantly reducing the boilerplate code required for DOM manipulation and event handling.

| Feature | Vanilla JavaScript (Previous) | jQuery (Enhanced) | Improvement/Difference |
| :--- | :--- | :--- | :--- |
| **DOM Selection** | `document.querySelectorAll()` | `$('.selector')` | More concise and readable syntax for selecting elements. |
| **Event Binding** | `element.addEventListener('event', handler)` | `$(element).on('event', handler)` | Standardized and easier event attachment, especially for delegated events. |
| **Event Prevention** | `e.preventDefault()` | `e.preventDefault()` | The method remains the same, but its context is cleaner within the jQuery wrapper. |
| **DOM Manipulation** | `element.appendChild()`, `element.classList.add()` | `$(element).append()`, `$(element).addClass()` | Simplifies appending, class toggling, and traversal significantly. |
| **Code Structure** | Requires manual setup for every listener. | Uses the `$(document).ready()` wrapper, which is often cleaner for initializing scripts. |

**Key Functionality Enhancements:**

1.  **Readability and Conciseness:** The code is dramatically shorter and easier to read due to jQuery's fluid syntax.
2.  **Event Delegation (Conceptual):** While not strictly required for this small demo, jQuery's event handling pattern prepares the code for more complex scenarios, such as attaching a single listener to a parent element that handles events for multiple dynamically added children.
3.  **DOM Handling:** jQuery's `$()` selector and methods simplify the process of selecting, cloning, and appending elements.

**Setup Instructions:**

1.  Create a new folder (e.g., `jquery-drag-drop-demo`).
2.  Save the three code blocks below into that folder as `index.html`, `style.css`, and `script.js`.
3.  Open `index.html` in your web browser. jQuery is loaded via a CDN link in `index.html`.

***

### Code Sample

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop Demo (jQuery)</title>
    <link rel="stylesheet" href="style.css">
    <!-- Include jQuery library from CDN -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>CIS 228: Drag and Drop Demonstration (jQuery)</h1>
    <p>Drag the items from the "Source Inventory" into the "Processing Drop Zone".</p>

    <div class="container">
        <!-- Source Inventory (The draggable items) -->
        <div class="inventory-section">
            <h2>Source Inventory</h2>
            <div class="card draggable-item" draggable="true" data-id="item1">
                Card A: Initial Task
            </div>
            <div class="card draggable-item" draggable="true" data-id="item2">
                Card B: Pending Review
            </div>
            <div class="card draggable-item" draggable="true" data-id="item3">
                Card C: Ready for Deployment
            </div>
        </div>

        <!-- Processing Drop Zone (The target area) -->
        <div id="drop-zone" class="drop-zone">
            <h2>Processing Drop Zone</h2>
            <p>Drop items here to process them.</p>
        </div>
    </div>

    <!-- jQuery script tag must be placed after the jQuery library loads -->
    <script src="script.js"></script>
</body>
</html>
```

#### `style.css`

```css
/* General Reset and Body Styling */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f7f9;
    color: #333;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    color: #0056b3;
    margin-bottom: 10px;
}

/* Layout Container */
.container {
    display: flex;
    justify-content: space-around;
    width: 90%;
    max-width: 1200px;
    margin-top: 30px;
    gap: 40px;
}

/* Section Styling (Source and Drop Zone) */
.inventory-section, .drop-zone {
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-height: 300px;
}

/* Source Inventory specific styling */
.inventory-section {
    background-color: #e9f5ff;
    border: 2px dashed #b3d9ff;
}

/* Drop Zone specific styling */
.drop-zone {
    background-color: #e6ffe6;
    border: 2px solid #5cb85c;
    transition: background-color 0.3s, border-color 0.3s;
}

/* Visual feedback when dragging over the drop zone */
.drop-zone.drag-over {
    background-color: #d4edda; 
    border-color: #28a745;
    box-shadow: 0 0 15px rgba(40, 167, 69, 0.5);
}

/* Card Styling (Draggable Items) */
.card {
    background-color: #ffffff;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: grab;
    transition: transform 0.2s, opacity 0.2s;
}

/* Styling for the item while it is being dragged */
.dragging {
    opacity: 0.4;
    transform: scale(0.98);
    border: 2px dashed #999;
}

/* Styling for the content inside the drop zone */
.drop-zone .card {
    background-color: #ffffff;
}
```

#### `script.js`

```javascript
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
```