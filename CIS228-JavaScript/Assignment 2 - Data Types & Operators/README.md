# Assignment 2 - Data Types & Operators: Letter Guessing Game

## Overview
This laboratory assignment demonstrates JavaScript primitive data types, string manipulation, array indexing, and conditional decision logic. Converted from a baseline numeric guessing model, the application generates a pseudorandom target character from the English alphabet (`A`–`Z`) and processes user guesses through an event-driven loop. The game normalizes case sensitivity, verifies character boundaries using regular expressions, provides alphabetical guidance hints ("too high" / "too low"), and dynamically alters DOM styling and control state upon victory.

---

## File Directory

### Web Source Objects
* **`letters_game.html`**: The complete single-page application containing markup, internal CSS styles, and client-side JavaScript logic for the letter-guessing game.
* **`index.html`**: The original starter number-picking game file from the course example archive used as the baseline for conversion.

### Documentation & Reference Materials (`Docs/`)
* **`Assignment #2 Instructions.pdf`**: Official assignment requirements, video instructions, and submission deliverables.
* **`README.md for the Letter Picking Example.pdf`**: Reference documentation outlining the instructor's logic sequence, character conversion math (`charCodeAt`), and control flow architecture.

---

## Instructor Resources & Video Walkthroughs

* [CIS 228 Live Demo Number Picking Game](https://www.youtube.com/watch?v=w1PAkhGVBUU) – Instructor assignment walkthrough covering the baseline number-picking game demonstration, code walkthrough, and conversion guidelines.
* [CIS 228 JavaScript Variables and Expressions](https://www.youtube.com/watch?v=aD8UJziG6JE) – Lecture video covering data storage, naming standards, expression hierarchies, and variable mechanics.

---

## Technical Program Flow & Execution Summary

The script operates through an event-driven flow triggered by the `click` event listener on `#guessBtn`:

| Stage | Mechanism / Code | Purpose & Execution Behavior |
| :--- | :--- | :--- |
| **1. Initialization** | `letters[Math.floor(Math.random() * letters.length)]` | Selects a random character from the string lookup array (`A`–`Z`) and caches DOM element pointers. |
| **2. Sanitization** | `guessInput.value.trim().toUpperCase()` | Trims whitespace and normalizes character casing to ensure case-insensitive parity ('a' = 'A'). |
| **3. Input Validation** | `/^[A-Z]$/.test(guess)` | Validates that the input contains exactly one valid alphabetic character before incrementing guess counters. |
| **4. Comparison Logic** | `guess > targetLetter` / `guess < targetLetter` | Evaluates character sequence to return contextual feedback (`too-high` or `too-low` style classes). |
| **5. State Termination** | `guess === targetLetter` | Displays congratulatory message, renders total attempt count, and disables input fields (`disabled = true`). |

---

## Key JavaScript Concepts Demonstrated

* **Character Lookup & Randomization**: Using `Math.random()` scaled against `letters.length` to index into an alphabetical sequence.
* **Input Normalization**: Utilizing `trim()` and `toUpperCase()` for sanitized comparison against target constants.
* **Regular Expression Validation**: Enforcing strict character sets via `/^[A-Z]$/` prior to processing state transitions.
* **Relational Comparison**: Comparing alphabetical characters directly using relational operators (`>`, `<`, `===`).
* **Dynamic DOM Manipulation**: Updating `.textContent`, switching CSS utility classes (`.too-high`, `.too-low`, `.correct`), and toggling element `disabled` properties.

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Ensure `Assignment #2 Instructions.pdf` and `README.md for the Letter Picking Example.pdf` are placed in the `Docs/` directory.
3. Open `letters_game.html` directly in any modern web browser (Chrome, Edge, Firefox).
4. Enter a letter between **A** and **Z**, submit your guess, and use the alphabetical hints to find the target character.