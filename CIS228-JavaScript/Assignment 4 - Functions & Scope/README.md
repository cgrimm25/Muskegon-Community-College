# Assignment 4 - Advanced Scope and Nested Scope: Counter Factory

## Overview
This laboratory assignment demonstrates advanced JavaScript scoping mechanisms, lexical environment bindings, and function closures with mutable state. Converted from the baseline logger factory starter package, the application implements a `counterFactory` function that encapsulates private state variables within an outer function scope. Specialized closures (`userCounter` and `dataCounter`) retain and mutate their respective independent counter values across subsequent function calls without leaking state into the global namespace.

---

## File Directory

### Web Source Objects
* **`assignment.html`**: The single-page application structure providing UI controls, event triggers, and a preformatted output terminal area.
* **`assignment.js`**: Core JavaScript logic implementing the `counterFactory` higher-order function, closure instances, and DOM event listeners.
* **`style.css`**: Application stylesheet providing flexbox alignment, container styling, and terminal output formatting.

### Reference Starter Package (`Example/`)
* **`index.html`**: Original starter file demonstrating the logger factory pattern with UI trigger buttons.
* **`script.js`**: Baseline script showing lexical closure encapsulation with immutable context prefixes (`userLogger` and `dataLogger`).
* **`style.css`**: Baseline presentation stylesheet.
* **`README.md`**: Starter package documentation describing the logger factory architecture.

### Documentation & Reference Materials (`Docs/`)
* **`Assignment #4 Instructions.pdf`**: Official assignment specifications, factory pattern requirements, and submission instructions.

---

## Instructor Resources & Video Walkthroughs

* [CIS 228 Live Video Advanced Scope and Functions](https://www.youtube.com/watch?v=eMqTrQt43AA) – Instructor live session covering advanced scope principles, function contexts, and implementation guidance.
* [CIS 228 JavaScript Nested Functions](https://www.youtube.com/watch?v=6to_U4ey0r8) – Topic lecture detailing functional abstraction, scope chains, lexical scoping, and design patterns.
* [CIS 228 Nested Scope Assignment Review](https://www.youtube.com/watch?v=xJr7lmt3NQo) – Assignment review covering nested lexical scope, closure implementation details, and factory patterns.

---

## Technical Program Flow & Execution Summary

The script uses a higher-order function factory to produce independent closures that manage persistent state:

| Stage | Mechanism / Code | Purpose & Execution Behavior |
| :--- | :--- | :--- |
| **1. Factory Invocation** | `counterFactory(initialValue)` | Creates an isolated lexical scope, binds `let counter = initialValue`, and returns an inner `increment` function. |
| **2. Instance Creation** | `userCounter = counterFactory(0)`<br>`dataCounter = counterFactory(100)` | Spawns two completely decoupled closure instances with their own private state allocations. |
| **3. Closure Execution (User)** | `userCounter(1)`, `userCounter(5)` | Invoked via `#button1` click event. Modifies Scope 1's counter (0 -> 1 -> 6) and appends the result to `#output`. |
| **4. Closure Execution (Data)** | `dataCounter(10)`, `dataCounter(20)` | Invoked via `#button2` click event. Modifies Scope 2's counter (100 -> 110 -> 130) without altering Scope 1. |
| **5. State Persistence** | Lexical Scope Retention | Subsequent button clicks continue incrementing from the retained private counter values. |

---

## Key JavaScript Concepts Demonstrated

* **Closures with Mutable State**: Inner functions retain live references to variables in their parent scope even after the outer factory has finished executing.
* **Factory Function Pattern**: Utilizing a single reusable higher-order function to generate distinct functional instances with pre-configured initial states.
* **Lexical Scoping & Encapsulation**: Restricting direct access to `counter` from the global execution context, preventing external modification or naming collisions.
* **Scope Independence**: Demonstrating that each invocation of `counterFactory` generates a unique lexical environment, ensuring `userCounter` and `dataCounter` remain completely isolated.
* **DOM Event Integration**: Wiring button click handlers to execute closures and append state logs to a `<pre>` display element.

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Ensure `Assignment #4 Instructions.pdf` is placed in the `Docs/` directory.
3. Open `assignment.html` directly in any modern web browser (Chrome, Edge, Firefox).
4. Click **Increment 'User Counter' (Scope 1)** and **Increment 'Data Counter' (Scope 2)** alternately to observe independent state tracking in the output panel.