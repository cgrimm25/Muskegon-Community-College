# Assignment 3 - Control Flow and Looping: Dynamic Input

## Overview
This laboratory assignment demonstrates JavaScript control flow, decision branching, and user-driven input processing within the browser runtime. Building upon a baseline static starter project, the application replaces hardcoded values with dynamic DOM input fields. It evaluates numeric polarity (positive, negative, zero) using multi-branch `if-else` conditionals and maps integer indices (`0`–`6`) to calendar weekday names via a `switch` statement with fallback error handling.

---

## File Directory

### Web Source Objects
* **`dynamic_input.html`**: The primary single-page application markup providing semantic containers, numeric inputs, execution buttons, and dynamic output containers.
* **`starter.html`**: The baseline assignment HTML scaffold provided for conversion to dynamic inputs.
* **`script.js`**: Client-side logic reading user inputs from the DOM, coercing values to numeric types, and executing conditional decision trees.
* **`styles.css`**: Application stylesheet defining layout geometry, button interaction states, and output card styling.

### Reference Starter Package (`Example/`)
* **`index.html`**: Original starter file demonstrating hardcoded implementations of five core control flow concepts (`if-else`, `switch`, `for`, `while`, `do-while`).
* **`script.js`**: Baseline script executing hardcoded iterations and static conditional logic.
* **`styles.css`**: Baseline presentation stylesheet.
* **`README.md`**: Starter package documentation describing the baseline lab structure.

### Documentation & Reference Materials (`Docs/`)
* **`Assignment #3 Instructions.pdf`**: Official laboratory guidelines, functional requirements, and submission deliverables.

---

## Instructor Resources & Video Walkthroughs

* [CIS 228 JavaScript Control Flow Lab Assignment](https://www.youtube.com/watch?v=yxnE5XNocRE) – Instructor lab walkthrough demonstrating control flow mechanics, baseline starter review, and dynamic input conversion.
* [CIS 228 JavaScript Flows and Functions](https://www.youtube.com/watch?v=9vomgcqEwig) – Topic lecture covering Boolean logic, conditional execution, switch branching, and code scoping.

---

## Technical Program Flow & Execution Summary

The application processes user data through two discrete, event-driven pathways triggered by button click events:

| Component / Function | Target Input | Evaluation Structure | Execution Behavior & Output Scope |
| :--- | :--- | :--- | :--- |
| **`runIfElse()`** | `#num-input` | `if / else if / else` | Evaluates numeric sign. Injects polarity feedback (`positive`, `negative`, or `zero`) into `#if-else-output`. |
| **`runSwitch()`** | `#day-input` | `switch (day)` | Evaluates day integer (0–6) to resolve corresponding day strings (`Sunday`–`Saturday`). Triggers `default` case on invalid range. |

---

## Key JavaScript Concepts Demonstrated

* **Dynamic DOM Reading**: Extracting real-time string values from `<input>` controls via `document.getElementById().value`.
* **Type Conversion**: Explicit coercion of string input to numbers using `Number()`.
* **Multi-Branch Conditionals**: Evaluating directional inequality (`num > 0`, `num < 0`) and zero equality.
* **Multi-Way Switching**: Implementing clean mapping with `case` blocks, explicit `break` termination, and default fallback handling.
* **DOM Output Injection**: Dynamically updating `#if-else-output` and `#switch-output` via `.innerText`.

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Ensure `Assignment #3 Instructions.pdf` is stored in the `Docs/` directory.
3. Open `dynamic_input.html` directly in any modern web browser (Chrome, Edge, Firefox).
4. Enter test values:
   * **If-Else Section**: Enter positive, negative, and zero values to verify polarity messages.
   * **Switch Section**: Enter integers `0` through `6` to verify weekday mappings, and out-of-range numbers to verify default validation.