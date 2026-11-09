# Assignment 8 - Digital Sorting Station

## Overview
The Digital Sorting Station is an interactive DOM application simulating an inventory management interface where users categorize unsorted digital assets into departmental folders. The application relies entirely on standard HTML5 DOM features and vanilla JavaScript to provide a native drag-and-drop experience, demonstrating event-driven architecture, cross-event state management, and real-time visual feedback without external library dependencies.

---

## Instructor Resources & Video Walkthroughs

* [JavaScript Drag and Drop Operations Repository](https://github.com/profcorrello/JavaScript-Drag-and-Drop-Operations) – Upstream course repository containing the baseline drag-and-drop demonstrations and starter templates.
* [CIS 228 JavaScript Drag and Drop Live Lecture](https://www.youtube.com/watch?v=eMMNpxFBH4M) – Live class recording covering native HTML5 drag-and-drop event flows.
* [CIS 228 JavaScript Drag and Drop](https://www.youtube.com/watch?v=Fm_34EyXd58) – Instructor walkthrough of the core native JavaScript assignment requirements and implementation.
* [CIS 228 JavaScript Drag and Drop with JQuery](https://www.youtube.com/watch?v=5Uiezk4cRbE) – Additional walkthrough covering the jQuery-enhanced implementation of the drag-and-drop API.

---

## File Directory

### Primary Application Objects (`/`)
* **`index.html`**: The semantic HTML document containing the `inventory-section` (Source Inventory) and three distinct `drop-zone` target containers ("Needs Review", "Complete", "Archived").
* **`solution.js`**: The primary JavaScript file executing the interactive drag-and-drop lifecycle, securely managing payloads, and executing node cloning.
* **`style.css`**: The application stylesheet dictating the layout and interactive state classes (`.dragging`, `.drag-over`) toggled during the drag lifecycle.
* **`README.md`**: Project documentation covering execution stages and core JavaScript logic.

### Documentation Materials (`Docs/`)
* **`Assignment 8 Instructions.pdf`**: Official assignment parameters outlining technical requirements, visual feedback rules, and step-by-step logic requirements for the Digital Sorting Station.

### Reference Demonstration Package (`Example/`)
* **`/` (Example Root)**
  * **`index.html`**, **`script.js`**, **`style.css`**: Upstream vanilla JavaScript demonstration files.
  * **`README.md`**: Upstream lesson documentation covering drag-and-drop operations.
  * **`.gitignore`**: Standard repository ignore rules.
* **`assignment_files/`**
  * **`assignment.md`**, **`index.html`**, **`style.css`**: Guided starter templates and walkthrough notes for the assignment.
* **`enhanced_with_jquery/`**
  * **`index.html`**, **`script.js`**, **`style.css`**: Alternative demonstration illustrating the same application logic utilizing the jQuery library.
  * **`JQueryEnhanced.md`**: Upstream lesson documentation detailing the jQuery-specific mechanics and event wrappers.

---

## Technical Program Flow & Execution Summary

This application implements standard event listeners to handle the complete drag-and-drop lifecycle across four major phases:

### Phase 1: Initialization (`dragstart`)
Fires the instant a user clicks and begins dragging a `.draggable-item`. The application applies the `.dragging` class to the item for visual feedback. Crucially, it executes `e.dataTransfer.setData('text/plain', e.target.dataset.id)` to capture the custom data attribute (the item's unique identifier) and securely package it into the browser's data transfer payload.

### Phase 2: Hover Target (`dragover`)
Fires continuously while the dragged item hovers over any of the designated `.drop-zone` target containers. The application applies the `.drag-over` CSS class to visually highlight the valid target area. The handler invokes `e.preventDefault()`, which is a mandatory requirement to override the default browser rejection and enable the container to accept incoming drops.

### Phase 3: Clean Up (`dragleave` & `dragend`)
The `dragleave` event fires when the user drags the cursor outside of a target zone boundary, and the `dragend` event fires when the user releases the mouse button, regardless of location. These handlers are strictly responsible for stripping away the `.drag-over` and `.dragging` CSS classes to reset the user interface to its default state and prevent persistent visual highlight bugs.

### Phase 4: Synchronization (`drop`)
Fires when the user releases the mouse button over a valid, actively hovering `.drop-zone`. The handler retrieves the initial payload string via `e.dataTransfer.getData('text/plain')`. It locates the exact original DOM node in the source inventory, executes a deep clone via `cloneNode(true)`, and appends the new cloned element into the target zone container. The original item remains completely untouched in the source list.

---

## Key JavaScript Concepts Demonstrated

* **DataTransfer API**: Utilizing the native browser clipboard object to securely pass critical item identifiers (`data-id`) across completely decoupled event listeners.
* **Default Event Prevention**: Demonstrating that web browsers naturally forbid drop actions, requiring developers to explicitly invoke `e.preventDefault()` within `dragover` events to authorize DOM manipulation.
* **DOM Cloning Mechanics**: Leveraging `cloneNode(true)` to execute a deep copy of an element—including its text content and nested children—and inserting it into a new target zone, specifically fulfilling the requirement to preserve the original source inventory state.

---

## Getting Started

Because this application relies entirely on native HTML, CSS, and JavaScript, no build tools, external libraries, or local servers are required to run it.

1. **Clone or Download** this repository to your local machine.
2. **Launch the Application** by opening `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari).
3. **Interact:**
   * Click and hold any card in the **Unsorted Inventory** on the left (e.g., "Project Report Q3").
   * Drag the card over to one of the three target zones on the right ("Needs Review", "Complete", or "Archived"). Notice how the target zone highlights green to indicate it is a valid drop area.
   * Release the mouse to drop the card. A clone of the card will be appended to the target zone, while the original card remains safely in your inventory.