# Project 12 - Web Storage

## Overview

This project completes the Week 10 assignment focused on Saving and Displaying Data with HTML5 Web Storage (`localStorage`). It consists of two distinct components: modifying a publisher-provided Canvas Maze game to automatically save and restore a player's coordinates, and upgrading a data-dump page to read and display those stored coordinates in a formatted, ordered list. 

## File Directory

### Web Source Files
* **`Maze.html`**: The main game interface containing the HTML5 Canvas element.
* **`Maze.css`**: External stylesheet governing the visual presentation of the maze interface.
* **`Maze.js`**: The core game logic handling movement, collision detection, and `localStorage` integration to save/load the player's X and Y coordinates on page load and unload.
* **`FindAllItems.html`**: A utility page that dumps and displays the contents of the browser's `localStorage`.
* **`FindAllItems.css`**: External stylesheet ensuring the dumped list items are formatted with bold text.
* **`FindAllItems.js`**: The separated JavaScript logic that iterates through local storage keys and appends them to the DOM.

### Image Assets (`Img/`)
* **`Img/face.png`**: The player sprite icon.
* **`Img/maze.png`**: The background image used to draw the maze and calculate collisions.

### Reference Materials (`Docs/`)
* **`Docs/Project #12 Instructions.pdf`**: Official assignment requirements specifying the auto-save functionality, list formatting, and browser compatibility notes.

* **`Starter/`**: A directory containing the unmodified, original publisher source code for reference before fixes were applied.
  * **`Starter/FindAllItems.html`**: Original publisher data dump file.
  * **`Starter/Maze.html`**: Original publisher maze interface.
  * **`Starter/Maze.css`**: Original publisher maze styles.
  * **`Starter/Maze.js`**: Original publisher maze logic (containing broken `confirm()` loops and scoping bugs).

## Live Deployment & Validation Links

* **Live Maze Game**: <http://157.245.246.41:8014/Chapter10/Maze.html>
* **Live Local Storage Dump**: <http://157.245.246.41:8014/Chapter10/FindAllItems.html>
* **W3C Markup Validation Service**: <https://validator.w3.org/>
* **W3C CSS Validation Service**: <https://jigsaw.w3.org/css-validator/>

---

## Technical Summary & Requirements Implementation

The implementation satisfies all Project #12 criteria and resolves several critical legacy code bugs to ensure compatibility with modern browsers like Chrome.

| Requirement / Bug Fix | Implementation Details & Methods | 
| ----- | ----- | 
| **1. Save Player Position** | Removed the legacy `confirm()` dialog from `window.onbeforeunload` to comply with modern browser security policies, ensuring `localStorage.setItem()` fires automatically and silently when leaving the page. | 
| **2. Global Variable Scoping** | Removed the local `var` declarations for `x` and `y` inside `window.onload` to ensure the script updates the global coordinate variables used by the keyboard event listeners. |
| **3. Infinite Loop Prevention** | Removed the string encapsulation and parentheses from `setTimeout(drawFrame, 10)` to prevent infinite loop crashes in modern Chrome. |
| **4. Collision Box Eraser** | Increased the size of the canvas eraser rectangle to `16x16` pixels to prevent anti-aliased edge pixels from trapping the player sprite against the maze walls. |
| **5. Scrolling Prevention** | Implemented `e.preventDefault()` within `processKey()` to stop the browser window from scrolling while the user is playing the game with arrow keys. |
| **6. Numbered, Bold List Output** | Modified `FindAllItems.html` to utilize an `<ol id="itemList">` element rather than an unordered list, and targeted it in `FindAllItems.css` with `font-weight: bold;`. | 
| **7. Separation of Concerns** | Extracted inline styles and `<script>` blocks from `FindAllItems.html` into dedicated `.css` and `.js` files for cleaner architecture. | 

---

## Getting Started

1. Clone or download this project directory (`Project 12 - Web Storage`).
2. Because this project relies on the `localStorage` API, testing via `file://` protocols may behave inconsistently depending on your browser. 
3. For best results, access the live URLs or run the files through a local development server (like VS Code Live Server).
4. **To Test:** 
    * Open `Maze.html`. Click the canvas to focus the window, and use the arrow keys to move the face.
    * Close the tab or refresh the page. When the page reloads, the face will spawn exactly where you left it.
    * Open `FindAllItems.html` and click "Dump the contents of Local Storage" to view the saved coordinates.