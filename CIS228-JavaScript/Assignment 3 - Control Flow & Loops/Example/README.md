# Control Flows and Loops in JavaScript

A basic web application that demonstrates the fundamentals of control flows and looping constructs in JavaScript.

## Overview

The project consists of three files:

- **`index.html`** – The web page structure. It contains sections for five JavaScript concepts:
  - If‑Else statements
  - Switch statements
  - For loops
  - While loops
  - Do‑While loops

  Each section has a “Run Example” button that executes the corresponding JavaScript function and displays the output below.

- **`styles.css`** – External stylesheet providing a clean, readable layout, styled buttons, and a `.output` class for result display.

- **`script.js`** – External JavaScript file with five functions, one per concept. Each function writes a demo result to its associated `<div>` when the button is clicked.

## How It Works

1. Open `index.html` in a browser.
2. Click any “Run Example” button.
3. The associated JavaScript function runs and the output appears in the gray box below.

## Concepts Covered

| Section | Construct | Demo |
|---|---|---|
| If‑Else | Conditional branching | Checks if a number is positive, negative, or zero |
| Switch | Multi-way branching | Maps a numeric day (0‑6) to a day name |
| For Loop | Fixed‑count iteration | Prints “Iteration 1” through “Iteration 5” |
| While Loop | Condition‑checked loop | Counts down from 5 to 1 |
| Do‑While Loop | Post‑checked loop | Counts down from 5 to 1, guarantees at least one iteration |

## Files

```
.
├── index.html
├── styles.css
└── script.js
```

## Customization

- Add more examples by extending the functions in `script.js` and adding new sections in `index.html`.
- Modify `styles.css` to change colors, fonts, or layout.