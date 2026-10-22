# Project 5 - Responsive Design and Fluid Layout

## Overview
This project upgrades the CIS-258 homework home page into a responsive layout based on Chapter 7 of *HTML5: The Missing Manual*. The page implements a percentage-based fluid multi-column design, relative REM typography, and a mobile media query targeting screen widths of 384px or smaller to restyle and stack columns vertically.

---

## File Directory

### Web Source Files
* **`index.html`**: The root homework home page containing the semantic row wrapper, fluid column containers (`.col1` and `.col2`), course directory navigation links, and box containers.
* **`style.css`**: The external stylesheet defining global `box-sizing: border-box`, fluid column widths, percentage margins, REM typography rules, clearfix logic, and the 384px responsive media query.

### Documentation & Reference Materials (`Docs/`)
* **`README.md`**: Project documentation, directory file inventory, technical implementation matrix, and deployment instructions.
* **`Docs/Project #5 Instructions.pdf`**: Official assignment instructions detailing requirements for columns, margins, typography, and media query breakpoints.
* **Course Video Resource**: [Welcome to Week 4 - Responsive Design Using HTML5 and CSS](https://www.youtube.com/watch?v=RElq0Av1A9Q) – Instructor overview lecture covering responsive design principles, fluid columns, and media query implementation.

---

## Live Deployment & Video Resources

* **Live Student Server URL**: [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html)
* **Lecture Video**: [Welcome to Week 4 - Responsive Design Using HTML5 and CSS](https://www.youtube.com/watch?v=RElq0Av1A9Q)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)

---

## Technical Summary & Requirements Implementation

The implementation satisfies all five Chapter 7 responsive design specifications:

| Requirement | Textbook Reference | Implementation Details & Selector Rules |
| :--- | :--- | :--- |
| **1. Unequal Columns** | pp. 222–223 | Built with an asymmetric fluid layout: `.col1` is set to `28.6%` and `.col2` is set to `68.6%`, avoiding a 50%/50% split. |
| **2. Column Margins** | pp. 223–225 | Applied `margin-right: 2.8%` to `.col1`, resulting in a total row width calculation of $28.6\% + 2.8\% + 68.6\% = 100\%$. |
| **3. REM Text Sizes** | pp. 228–230 | Defined three distinct scalable text sizes: `1rem` on `body`, `1.25rem` on `h2`, and `1.8rem` on `h1`. |
| **4. Color Shift at $\le$ 384px** | p. 235 | An `@media screen and (max-width: 384px)` query switches `.col1` background to `#3b0764` and `.col2` background to `#064e3b`. |
| **5. Column Stacking at $\le$ 384px** | p. 238 | Inside the 384px media query, `float: none;`, `width: auto;`, and `margin-right: 0;` remove floats and stack columns vertically. |

---

## Getting Started

1. Clone or download this project repository.
2. Keep `index.html` and `style.css` in the project root with `Project #5 Instructions.pdf` placed inside the `Docs/` directory.
3. Open `index.html` locally in a web browser, or view the live deployment at [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html).