### Demo Code Summary: Implementing Drag and Drop

This application demonstrates the core mechanics of the HTML Drag and Drop API using JavaScript event listeners. The process relies on three interconnected files: `index.html` for structure, `style.css` for presentation, and `script.js` for the interactive logic.

#### 💡 Core Concept: The Event Flow

The functionality is built around a specific sequence of events:

1.  **`dragstart`**: Detects when the user starts dragging an item.
2.  **`dragover`**: Detects when the dragged item hovers over a potential drop target. This event *must* be prevented by default to allow dropping.
3.  **`drop`**: Detects when the user releases the item over the target.

---

#### 📂 1. `index.html` (Structure and Setup)

The HTML sets up the visual containers and, crucially, enables drag functionality on the source items.

**Key Snippet:**
```html
<!-- Enabling drag capability on the source items -->
<div class="card draggable-item" draggable="true" data-id="item1">
    Card A: Initial Task
</div>

<!-- The designated drop area -->
<div id="drop-zone" class="drop-zone">
    <!-- Items will be dropped here -->
</div>
```
*   **`draggable="true"`**: This attribute on the source `div` is mandatory; it tells the browser that the element can be dragged.
*   **`data-id`**: Custom attributes are used to store unique, persistent identifiers for the items, which are critical for the JavaScript logic.

#### 🎨 2. `style.css` (Visual Feedback)

The CSS handles the visual improvements, most notably providing visual feedback to the user.

**Key Snippet:**
```css
/* Visual feedback when dragging over the drop zone */
.drop-zone.drag-over {
    background-color: #d4edda; 
    border-color: #28a745;
    box-shadow: 0 0 15px rgba(40, 167, 69, 0.5);
}
```
*   By adding the `.drag-over` class in JavaScript, we change the drop zone's appearance, confirming to the user that the area is an active and valid target.

#### 💻 3. `script.js` (The Logic)

This script manages the event listeners and the state changes, simulating the movement of the data.

**A. Tracking the Drag Item (`dragstart`)**
When dragging begins, we capture the item's unique ID and store it in the `dataTransfer` object.

**Key Snippet:**
```javascript
const handleDragStart = (e) => {
    const itemId = e.target.dataset.id;
    // Store the ID so the drop event knows what was dragged
    e.dataTransfer.setData('text/plain', itemId); 
    e.target.classList.add('dragging');
};
```

**B. Allowing the Drop (`dragover`)**
The `dragover` event is the most critical part of the setup. By default, browsers prevent dropping. We must explicitly tell the browser that dropping is allowed.

**Key Snippet:**
```javascript
const handleDragOver = (e) => {
    e.preventDefault(); // !!! This line is mandatory to enable dropping !!!
    dropZone.classList.add('drag-over');
};
```

**C. Completing the Move (`drop`)**
When the item is dropped, the `handleDrop` function executes:
1.  It prevents the default browser behavior (`e.preventDefault()`).
2.  It retrieves the stored ID using `e.dataTransfer.getData('text/plain')`.
3.  Crucially, instead of moving the original DOM element (which would break the source list), it uses `draggedElement.cloneNode(true)` to create a copy.
4.  The clone is then appended to the drop zone, completing the visual demonstration of the item's "processing."

**Key Snippet:**
```javascript
const handleDrop = (e) => {
    e.preventDefault();
    // Retrieve the ID passed during dragstart
    const itemId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.querySelector(`[data-id="${itemId}"]`);

    if (draggedElement) {
        // Clone the element to simulate a successful move
        const clonedElement = draggedElement.cloneNode(true);
        dropZone.appendChild(clonedElement);
    }
};
```