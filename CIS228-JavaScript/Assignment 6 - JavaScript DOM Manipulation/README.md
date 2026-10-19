# Assignment 6 - DOM Manipulation: Interactive Study Task List

## Overview
This laboratory assignment demonstrates core client-side Document Object Model (DOM) manipulation, dynamic node rendering, and user event handling using vanilla JavaScript. Converted from the baseline student profile demo package, the application implements an interactive Study Task List manager. The application tracks tasks in real time, validates and formats user text input, safely creates and appends list nodes, prevents runtime exceptions during list deletions, selects random motivational messages, and toggles batch and individual task completion states using dynamic CSS class manipulation.

---

## Instructor Resources & Video Walkthroughs

* [DOM Manipulation Example Repository](https://github.com/profcorrello/DOM-Manipulation-Example) – Upstream course repository containing the baseline student profile card demo, interactive control patterns, and assignment starter templates.
* [CIS 228 JavaScript DOM Manipulation Presentation](https://www.youtube.com/watch?v=CrjF447wRUU) – Instructor walkthrough covering core DOM manipulation concepts, element caching, dynamic event listeners, and assignment implementation steps.

---

## File Directory

### Primary Application Objects (`/`)
* **`index.html`**: Semantic HTML structure hosting the study task list, text input controls, action buttons, dynamic counter, and feedback display.
* **`script.js`**: Core client-side JavaScript executing DOM element caching, event listeners, input validation guards, task creation/removal, random quote generation, and completion toggling.
* **`styles.css`**: Application stylesheet defining CSS variables, card layout, button interactions, and completion state styling (`.task-item.done`).
* **`README.md`**: Project documentation covering laboratory deliverables, program architecture, execution stages, and local setup instructions.

### Documentation Materials (`Docs/`)
* **`Assignment 6 Instructions.pdf`**: Official course assignment instructions, rubric requirements, rules, and grading criteria.

### Reference Demonstration & Starter Package (`Example/`)
* **`DOM Manipulation Example.md`**: Upstream lesson document breaking down DOM concepts, APIs, and annotated code patterns.
* **`README.md`**: Upstream repository overview describing class demo functionality, starter files, and learning objectives.

#### Student Starter Package (`Example/assignment/`)
* **`Assignment.md`**: Guided assignment instructions, step-by-step TODO walk-throughs, and troubleshooting tips.
* **`index.html`**: Starter markup structure defining the task list interface baseline.
* **`script.js`**: Starter template containing selector mappings, quote array, and the 6 `TODO` markers.
* **`styles.css`**: Provided layout styles, transitions, and baseline class definitions.

#### Demonstration Package (`Example/dom-basics-demo/`)
* **`index.html`**: Interactive Student Profile Card demonstration page with controls, courses list, and educational sidebar.
* **`script.js`**: Demonstration script illustrating element caching, content modification, class toggling, event delegation, and live activity logging.
* **`styles.css`**: Stylesheet providing card layout, interactive control styles, and animation sequences.

---

## Technical Program Flow & Execution Summary

The application manipulates the browser DOM tree in response to user input and browser events across six sequential stages:

| Stage | Trigger / Mechanism | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. Event Binding** | `setupEventListeners()` | Binds action buttons to named handler functions (`addTask`, `removeLastTask`, `changeMessage`, `markAllDone`) without executing them prematurely. |
| **2. Count Auditing** | `updateCount()` | Scans active DOM nodes using `querySelectorAll('.task-item').length` and updates `#task-count` dynamically. |
| **3. Input & Insertion** | `addTask()` | Trims `#task-input` value, guards against empty strings, creates a new `<li>` element with `.className = 'task-item'`, appends it to `#task-list`, and resets the input box. |
| **4. Deletion & Cleanup** | `removeLastTask()` | Queries current task nodes, guards against an empty list, preserves the target's `.textContent`, calls modern `.remove()`, and logs the removed task name. |
| **5. Quote Selection** | `changeMessage()` | Generates a bounded random index (`Math.floor(Math.random() * QUOTES.length)`) and updates `#message.textContent`. |
| **6. Batch Toggling** | `markAllDone()` | Loops through all `.task-item` nodes with `.forEach()` and applies `classList.toggle('done')` to toggle completed styling in both directions. |
| **Bonus 1 (Keyboard)** | `taskInput keydown` | Listens for `event.key === 'Enter'` on `#task-input` and triggers `addTask()` directly from the keyboard. |
| **Bonus 2 (Delegation)** | `taskList click` | Uses event delegation on parent `#task-list` to toggle `.done` on individual `.task-item` elements (both starter and newly created items). |

---

## Key JavaScript Concepts Demonstrated

* **Safe Content Injection (`textContent`)**: Prevents Cross-Site Scripting (XSS) vulnerabilities by injecting user input strictly through `.textContent` rather than `innerHTML`.
* **Defensive Programming (Guard Clauses)**: Enforces validation checks that abort function execution early if user input is empty or if deletions are attempted on an empty list, preventing runtime `TypeErrors`.
* **Dynamic Node Generation**: Constructs new DOM nodes dynamically using `document.createElement()`, assigns CSS class identifiers, and inserts nodes into the active render tree via `.appendChild()`.
* **Node Removal**: Locates and deletes existing elements cleanly from the DOM hierarchy using modern `element.remove()`.
* **Event Delegation Pattern**: Attaches a single click listener to the parent container (`#task-list`) to handle events originating from dynamically created child elements without re-attaching listeners.
* **CSS Class Toggling**: Dynamically manipulates element classes via `classList.toggle()` to synchronize visual presentation rules (`strikethrough`, green borders) with user interaction state.

---

## Getting Started

1. Clone or download this repository to your local computer.
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox).
3. Press **F12** (or right-click and select **Inspect**) and open the **Console** tab to observe runtime logs and confirm error-free execution.
4. Test application features:
   * Type a task into the text box and press **Enter** or click **Add Task**.
   * Click **Remove Last Task** to delete tasks sequentially and verify the empty-list guard.
   * Click **Motivate Me!** to cycle through random motivational quotes.
   * Click **Toggle Done (All)** or click any single task item directly to toggle completion styling.