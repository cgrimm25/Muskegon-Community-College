# Assignment 7 - Advanced DOM Event Handling Lab

## Overview
This laboratory assignment demonstrates advanced client-side JavaScript event handling patterns within a "Component Interaction Dashboard". The application moves beyond basic single-element listeners to implement performance-critical and scalable architectures, specifically focusing on Event Delegation, Debouncing, and the Pointer Events API combined with Custom Event dispatching.

---

## Instructor Resources & Video Walkthroughs

* [DOM Events and Interactions Example Repository](https://github.com/profcorrello/Lab-Assignments---DOM-Events-and-Interactions) – Upstream course repository containing the baseline event delegation demonstration, event object analysis, and assignment starter templates.
* [CIS 228 DOM Events and Interactions Presentation](https://www.youtube.com/watch?v=vo45Z6MuKK8) – Course lecture and demonstration presentation covering event propagation, bubbling phases, delegation patterns, and performance optimization techniques.

---

## File Directory

### Primary Application Objects (`/`)
* **`index.html`**: Semantic HTML structure hosting the Component Interaction Dashboard, including a search input, feature grid, and pointer interaction handle.
* **`assignment.js`**: Core client-side JavaScript executing the debounced search handler, parent-level event delegation for feature cards, pointer event tracking, and custom `swipe` event dispatching.
* **`styles.css`**: Application stylesheet defining CSS variables, card layouts, interaction handles, and log output styling.
* **`README.md`**: Project documentation covering laboratory deliverables, program architecture, execution stages, and setup instructions.

### Documentation Materials (`Docs/`)
* **`Assignment 7 Instructions.pdf`**: Official course assignment instructions detailing required conceptual implementations (Delegation, Debouncing, Pointer Events) and step-by-step logic requirements.

### Reference Demonstration Package (`Example/`)
* **`index.html`**: Upstream interactive course enrollment dashboard demonstrating parent-level event attachment.
* **`README.md`**: Upstream lesson document breaking down event propagation, bubbling, and annotated delegation code patterns.
* **`script.js`**: Demonstration script illustrating the use of `e.target`, `e.currentTarget`, and `e.target.closest()` to identify event origins.
* **`styles.css`**: Stylesheet providing card layout and visual feedback for the demonstration.

### Starter Files (`Starter/`)
* **`index.html`**: Original assignment markup with dual script tags (since corrected).
* **`starter.js`**: Original provided assignment template containing structural TODO markers for the three core event patterns.
* **`styles.css`**: Original provided baseline stylesheet.

---

## Technical Program Flow & Execution Summary

The application implements three distinct event patterns to manipulate the DOM tree efficiently:

| Feature | Trigger / Mechanism | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. Debouncing** | `#feature-search input` | Uses a custom `debounce(func, delay)` utility to wrap `searchHandler`. The function resets a timeout on every keystroke, executing the UI update only after the user pauses typing for 300ms. |
| **2. Event Delegation** | `#feature-cards click` | Attaches a single listener to the parent container to handle dynamic child elements. Validates the click using `e.target.closest('.card-button')`, traverses up to `.feature-card`, and extracts the `dataset.feature` identifier for logging. |
| **3. Pointer Tracking** | `#drag-handle pointerdown` | Records `startX` and `startY` coordinates and calls `e.target.setPointerCapture()` to track movement outside the element boundaries. |
| **4. Swipe Movement** | `#drag-handle pointermove` | Dispatches continuous bubbling `CustomEvent('swipeMove')` objects if `isDragging` is true, signaling active movement. |
| **5. Swipe Resolution** | `#drag-handle pointerup` | Calculates distance traveled on the X and Y axes. Resolves the primary direction (`up`, `down`, `left`, `right`) and dispatches a final bubbling `CustomEvent('swipe')` containing the direction payload. |
| **6. Custom Event Capture** | `document swipe` | A document-level listener catches the bubbling custom event and appends the final swipe direction as a new `<li>` to `#log-list`. |

---

## Key JavaScript Concepts Demonstrated

* **Event Delegation Pattern**: Attaching a single listener to a common parent container instead of individual child elements, improving memory management and handling dynamically loaded content.
* **Event Object Analysis**: Differentiating between `e.target` (the deepest element physically clicked) and `e.currentTarget` (the parent element holding the listener).
* **Robust Element Selection**: Using the `e.target.closest(selector)` method to safely traverse up the DOM tree from a click target to locate necessary parent containers.
* **Performance Debouncing**: Implementing a utility function using `setTimeout` and `clearTimeout` to restrict the execution frequency of handlers bound to rapid events like `input`.
* **Pointer Events API**: Unifying mouse, touch, and stylus input handling via `pointerdown`, `pointermove`, and `pointerup`.
* **Pointer Capture**: Utilizing `setPointerCapture()` to ensure an element continues receiving pointer events even when dragged outside its physical boundaries.
* **Custom Event Dispatching**: Creating new `CustomEvent` objects with specific `detail` payloads and `bubbles: true`, and firing them via `dispatchEvent()` to decouple application modules.

---

## Getting Started

1. Clone or download this repository to your local computer.
2. Open `/index.html` in any modern web browser.
3. Open the **Console** (`F12`) to observe runtime event logs.
4. Test application features:
   * Type text into the Search Features box and observe the delayed logging.
   * Click the "Use" buttons on the Available Features cards to trigger the delegated listener.
   * Click and drag the yellow Pointer/Drag Interaction handle to trigger custom directional swipe events.