# Assignment 1 - JS Syntax and Core Mechanics

## Overview
This laboratory assignment introduces foundational JavaScript syntax, browser runtime execution environments, and basic developer tooling. Built using standard HTML5 document shells and client-side JavaScript (`<script>`), the project demonstrates three fundamental mechanisms for program output and execution: native window modal dialogs (`alert()`), direct DOM document stream writing (`document.write()`), and browser developer console output (`console.log()`).

---

## File Directory

### Web Source Objects
* **`base.html`**: Starter HTML shell used as the boilerplate structure for running embedded and linked JavaScript scripts.
* **`alert_box.html`**: Demonstration of browser-native interaction dialogs (e.g., `alert()`) and user notification prompts.
* **`console_example.html`**: Examples showing JavaScript output, variable inspection, and debugging workflows via the browser developer console (`console.log()`).

### Documentation & Reference Materials (`Docs/`)
* **`Assignment #1 Instructions.pdf`**: Detailed assignment prompt, requirements, and grading criteria.

---

## Instructor Resources & Video Walkthroughs

* [CIS 228 Lab Assignment Exercise 1](https://www.youtube.com/watch?v=2u0K0Z3GsVk) – Assignment 1 visual setup walkthrough covering HTML base creation, alert modals, `document.write()` usage, and developer console verification.
* [CIS 228 JavaScript Syntax Basics](https://www.youtube.com/watch?v=fpY3W07HUuU) – Lecture reference video exploring JavaScript language mechanics, execution context, syntax rules, and standard coding conventions.

---

## Technical Program Flow & Execution Summary

The exercises highlight the behavioral differences across JavaScript output interfaces:

| Script File | Target Interface | API / Method | Execution Behavior & Scope |
| :--- | :--- | :--- | :--- |
| **`base.html`** | Document Object Model (DOM) | Static Markup | Renders baseline static HTML markup without script execution. |
| **`alert_box.html`** | Window UI Thread | `alert()` | Synchronously halts rendering and JavaScript execution until user acknowledges the modal dialog (`OK`). |
| **`console_example.html`** | Document Buffer | `document.write()` | Streams raw HTML markup directly into the open document stream prior to DOM completion. |
| **`console_example.html`** | Developer Tools Console | `console.log()` | Asynchronously logs diagnostic data to the browser developer debugging console without modifying the rendered DOM. |

---

## Getting Started

1. Clone or download this folder to your local machine.
2. Open any `.html` file directly in a modern web browser (e.g., Chrome, Edge, Firefox).
3. Open the browser's developer tools (**F12** or **Ctrl+Shift+I** / **Cmd+Option+I**) and navigate to the **Console** tab to view logged output for `console_example.html`.
4. Refer to `Docs/Assignment #1 Instructions.pdf` for specific task objectives and submission details.