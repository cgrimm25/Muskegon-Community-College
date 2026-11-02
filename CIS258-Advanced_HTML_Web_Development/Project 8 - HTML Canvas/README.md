# Project 8 - Customize Canvas Paint Program

## Overview
This project customizes the interactive canvas painting application from Chapter 8 (*An Interactive Paint Program*, pp. 263–270) of *HTML5: The Missing Manual, 2nd Edition*. The application enables freehand vector drawing using mouse events (`mousedown`, `mousemove`, `mouseup`, `mouseout`) on an HTML5 `<canvas>` element. Key customizations include replacing the original color palette with Purple, Orange, and Teal, modifying the pen thickness steps to 3px, 12px, and 25px, synchronizing custom 48×48 transparent toolbar icons, and ensuring default drawing state initialization.

---

## File Directory

### Web Source Files 
* **`Paint.html`**: The root document defining the semantic markup, floating toolbar panels for pen color, pen thickness, and operations, the embedded `<canvas id="drawingCanvas" width="500" height="300">` drawing surface, and image export preview container.
* **`Paint.css`**: The external stylesheet controlling toolbar positioning, button styling, canvas borders, pointer feedback, and groove-bordered selection states (`img.Selected`) for active drawing tools.
* **`Paint.js`**: The external JavaScript file handling mouse event coordinates, canvas 2D rendering paths, runtime stroke color and line width adjustments, image data serialization (`toDataURL()`), and active tool highlighting.

### Image Assets (`Img/`)
* **`Img/pen_purple.gif`**: 48×48 transparent icon representing the primary Purple (`rgb(147, 51, 234)`) drawing pen.
* **`Img/pen_orange.gif`**: 48×48 transparent icon representing the Orange (`rgb(249, 115, 22)`) drawing pen.
* **`Img/pen_teal.gif`**: 48×48 transparent icon representing the Teal (`rgb(6, 182, 212)`) drawing pen.
* **`Img/pen_thin.gif`**: 48×48 icon for the fine 3px line thickness setting.
* **`Img/pen_medium.gif`**: 48×48 icon for the medium 12px line thickness setting.
* **`Img/pen_thick.gif`**: 48×48 icon for the bold 25px line thickness setting.
* **`Img/pen_blue.gif`**, **`Img/pen_green.gif`**, **`Img/pen_red.gif`**: Archived baseline publisher icons retained for reference.

### Documentation & Reference Materials (`Docs/`)
* **`Docs/Project #8 Instructions.pdf`**: Official assignment requirements specifying the color palette modifications, pen thickness updates, directory hierarchy, and testing criteria.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/paint/Paint.html](http://157.245.246.41:8014/paint/Paint.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)

---

## Course Video Resources

The following video tutorials from *HTML5: The Missing Manual (2nd Edition)* provide foundational instruction for canvas rendering, path construction, and coordinate handling applied across this module:

* [HTML5 The Missing Manual - Second Edition - Using Canvas To Draw Lines 245-451](https://www.youtube.com/watch?v=f7Rhuizmxac)
  * Demonstrates initializing the 2D drawing context, setting line widths, stroke styles, and configuring line cap endpoints.
* [HTML The Missing Manual - 2nd Edition - Using Canvas To Draw and Fill Shapes 251 - 253](https://www.youtube.com/watch?v=dQYtwqwTpW8)
  * Covers building continuous paths with `beginPath()`, `moveTo()`, `lineTo()`, and applying strokes and fills.
* [HTML5 The Missing Manual - 2nd Edition - Using Canvas To Draw Rectangles 253](https://www.youtube.com/watch?v=O9It5Q7674Y)
  * Covers rectangle drawing methods and surface resetting using `clearRect()`.
* [HTML The Missing Manual - 2nd Edition - Using Canvas To Draw Arcs and Circles 254 - 255](https://www.youtube.com/watch?v=OBmlk9ll1tU)
  * Details arc angles and radian geometry relevant to canvas coordinates and circular line joins.

---

## Technical Summary & Requirements Implementation

The implementation satisfies all Week 7 Project, Part 2 customization criteria:

| Requirement | Textbook Reference | Implementation Details & Methods |
| :--- | :--- | :--- |
| **1. Change Paint Colors** | pp. 263–268 | Replaced original Red (`rgb(212,21,29)`), Green (`rgb(131,190,61)`), and Blue (`rgb(0,86,166)`). Configured `changeColor()` calls in `Paint.html` with Purple (`rgb(147, 51, 234)`), Orange (`rgb(249, 115, 22)`), and Teal (`rgb(6, 182, 212)`). |
| **2. Change Pen Thicknesses** | pp. 263–268 | Updated `changeThickness()` arguments from original `1`, `5`, and `10` to `3` (Fine), `12` (Medium), and `25` (Thick), ensuring clearly visible line variations on the canvas. |
| **3. Interface Icon Updates** | pp. 263–265 | Created and linked custom 48×48 transparent GIF toolbar icons (`pen_purple.gif`, `pen_orange.gif`, `pen_teal.gif`) located in the relative `Img/` folder. |
| **4. Default Initialization Fix** | pp. 265–267 | Configured `context.strokeStyle`, `context.lineWidth`, `lineCap = "round"`, and `lineJoin = "round"` inside `window.onload` in `Paint.js`. Pre-selected the default tools (`purplePen` and `thinPen`) to prevent unstyled black strokes prior to clicking. |
| **5. Operations & Canvas Persistence** | pp. 268–270 | Verified `clearCanvas()` resets the drawing surface using `context.clearRect(0, 0, canvas.width, canvas.height)`, and `saveCanvas()` extracts canvas data into a static `<img>` via `canvas.toDataURL()`. |
| **6. Server Directory Structure** | Course Guidelines | Published application into the dedicated `/paint/` folder on the student server alongside its `Img/` asset subdirectory. |

---

## Submission Details

* **Live URL:** [http://157.245.246.41:8014/paint/Paint.html](http://157.245.246.41:8014/paint/Paint.html)
* **New Paint Colors:**
  * **Purple:** `rgb(147, 51, 234)` (replaced original Red)
  * **Orange:** `rgb(249, 115, 22)` (replaced original Green)
  * **Teal:** `rgb(6, 182, 212)` (replaced original Blue)
* **Pen Thickness Changes:**
  * **Fine:** Changed from **1px** to **3px**
  * **Medium:** Changed from **5px** to **12px**
  * **Thick:** Changed from **10px** to **25px**

---

## Getting Started

1. Clone or download this project directory.
2. Verify that `Paint.html`, `Paint.css`, `Paint.js`, and `README.md` reside in the root `paint/` directory, with image files stored in `paint/Img/` and assignment specifications in `Docs/`.
3. Open `Paint.html` in any modern web browser or test the live deployment at [http://157.245.246.41:8014/paint/Paint.html](http://157.245.246.41:8014/paint/Paint.html).