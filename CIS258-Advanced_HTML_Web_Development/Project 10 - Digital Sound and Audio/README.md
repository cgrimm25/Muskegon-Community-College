# Project 10 - Customized Video Player

## Overview
This project completes Part 2 of Week 8 assignments, building upon the textbook's *World's Ugliest Video Player* (Chapter 10 / Video and Audio material, pp. 289–305) of *HTML5: The Missing Manual, 2nd Edition*. The application customizes the HTML5 video player layout, controls, and styling while maintaining a unified coursework portal, external stylesheet and script architecture, and bidirectional navigation.

---

## File Directory

### Web Source Files 
* **`index.html`**: The root coursework portal defining the responsive two-column layout, interactive DOM event handlers, and directory links to published assignments including Project #10 (`UglyPlayer.html`).
* **`UglyPlayer.html`**: The dedicated project page featuring a consistent site header, return navigation link to the home page, responsive container, customized playback controls, and real-time progress bar tracking.
* **`SoundEffects.html`**: The previous week's Project #9 canvas and audio simulation page, maintained for portfolio continuity.
* **`style.css`**: The master external stylesheet servicing all pages, managing fluid layout columns, theme colors, button interactions, video container sizing, and customized player styles (`#durationBar`, `#positionBar`, `#bufferBar`).
* **`script.js`**: The consolidated client-side script managing time-of-day greetings, Canvas drawing graphics, Bouncing Ball physics, and Project #10 video playback controls (`play()`, `pause()`, `stop()`, `speedUp()`, `slowDown()`, `normalSpeed()`, and `progressUpdate()`).

### Video Assets (`Vid/`)
* **`Vid/butterfly.mp4`**, **`Vid/butterfly.webm`**: Multi-format video streams loaded into the customized HTML5 player.

### Documentation & Reference Materials (`Docs/`)
* **`Docs/Project #10 Instructions.pdf`**: Official assignment requirements specifying the starting point, player customization rules, 5 distinct alterations, consistent headers, and navigation links.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/UglyPlayer.html](http://157.245.246.41:8014/UglyPlayer.html)
* **Home Page URL**: [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)


---

## Technical Summary & Requirements Implementation

The implementation satisfies all Week 8 Project 2 criteria:

| Requirement | Textbook Reference | Implementation Details & Methods |
| :--- | :--- | :--- |
| **1. Consistent Header** | Course Guidelines | Applied the identical `<h1>Chris Grimm's Home Page</h1>` header across `index.html` and `UglyPlayer.html`. |
| **2. Player Customization** | pp. 289–305 | Implemented at least five distinct visual and structural alterations to upgrade the default player appearance. |
| **3. Navigation Links** | Course Guidelines | Established bidirectional navigation linking `index.html` to `UglyPlayer.html` and vice versa. |
| **4. External Architecture** | Course Standards | Maintained strict separation of concerns by placing all styles in `style.css` and scripts in `script.js`. |
| **5. Video Source Files** | pp. 289–291 | Configured dual-format video sources (`butterfly.mp4`, `butterfly.webm`) inside the `Vid/` directory. |

---

## Submission Details

* **Live URL:** [http://157.245.246.41:8014/UglyPlayer.html](http://157.245.246.41:8014/UglyPlayer.html)
* **Numbered List of 5 Player Alterations:**
  1. **Customized Video Border & Shadow:** Replaced the double light-gray border with a sleek 2px cyan border (`#38bdf8`), 12px rounded corner radius, and a professional dark drop shadow (`box-shadow`).
  2. **Enlarged Responsive Container:** Increased the maximum container width from 445px to 600px with clean vertical spacing and fluid scaling.
  3. **Styled Duration Bar Track:** Upgraded the duration bar container with a dark-slate background (`#0f172a`), 1px cyan border, rounded edges, and internal shadow clipping.
  4. **Gradient Progress Fill:** Replaced the plain steelblue fill with a dynamic blue-to-cyan gradient (`#0284c7` to `#38bdf8`) paired with real-time tracking typography.
  5. **Enhanced Control Buttons:** Upgraded the control buttons with custom theme background colors (`#38bdf8`), bold typography, rounded corners, and smooth hover elevation effects.

---

## Getting Started

1. Clone or download this project directory.
2. Verify that `index.html`, `UglyPlayer.html`, `SoundEffects.html`, `style.css`, `script.js`, and `README.md` reside in the root directory, with video files stored in `Vid/` and assignment specifications in `Docs/`.
3. Open `index.html` or `UglyPlayer.html` in any modern web browser, or test the live deployment at [http://157.245.246.41:8014/UglyPlayer.html](http://157.245.246.41:8014/UglyPlayer.html).