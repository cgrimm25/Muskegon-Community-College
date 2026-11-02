# Project 7 - Drawing with Canvas

## Overview
This project enhances the CIS-258 homework home page by embedding an HTML5 `<canvas>` element and drawing a custom geometric vector showcase with client-side JavaScript, following Chapter 8 (*Basics of Drawing with the Canvas*, pp. 245–263) of *HTML5: The Missing Manual, 2nd Edition*. The composition features six distinct vector items, 2D coordinate transformation matrix operations (`translate` and `rotate`), and a composite operation (`"xor"`) rendering an overlapping cutout effect.

---

## File Directory

### Web Source Files
* **`index.html`**: The root homework home page containing the semantic column structure, interactive DOM event controls, directory hyperlinks, and the embedded `<canvas id="myCanvas" width="500" height="360">` container.
* **`style.css`**: The external stylesheet defining responsive fluid column widths, REM-based typography, interactive status styles, the 384px mobile media query, and dedicated canvas framing rules (borders, dark slate background, and drop shadows).
* **`script.js`**: The external JavaScript file executing DOM event handlers, system time greeting logic, and the complete 2D Canvas drawing routine (`drawCanvasGraphics()`).

### Documentation & Reference Materials (`Docs/`)
* **`Docs/Project #7 Instructions.pdf`**: Official assignment requirements specifying the 6 canvas items, transformation rules, composite operation, and submission guidelines.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)

---

## Course Video Resources

The following video tutorials from *HTML5: The Missing Manual (2nd Edition)* provide foundational instruction for canvas rendering, path construction, and coordinate handling applied across this module:

* [HTML5 The Missing Manual - Second Edition - Using Canvas To Draw Lines 245-451](https://www.youtube.com/watch?v=f7Rhuizmxac)
  * Covers initializing the 2D drawing context, setting line widths, stroke styles, and configuring line cap endpoints.
* [HTML The Missing Manual - 2nd Edition - Using Canvas To Draw and Fill Shapes 251 - 253](https://www.youtube.com/watch?v=dQYtwqwTpW8)
  * Covers building closed paths with `beginPath()`, `moveTo()`, `lineTo()`, and `closePath()`, as well as applying strokes and fills.
* [HTML5 The Missing Manual - 2nd Edition - Using Canvas To Draw Rectangles 253](https://www.youtube.com/watch?v=O9It5Q7674Y)
  * Demonstrates standard rectangle geometry using `fillRect()` and `strokeRect()`.
* [HTML The Missing Manual - 2nd Edition - Using Canvas To Draw Arcs and Circles 254 - 255](https://www.youtube.com/watch?v=OBmlk9ll1tU)
  * Demonstrates constructing arcs, circular paths, and radial angles using `context.arc()` and radian math ($2\pi$).

---

## Technical Summary & Requirements Implementation

The implementation satisfies all Part 1 drawing requirements:

| Requirement | Textbook Reference | Implementation Details & Methods |
| :--- | :--- | :--- |
| **1. Rectangle** | pp. 248–249, 253 | Dark navy background card frame drawn with `context.fillRect(10, 10, 480, 340)` and bordered with cyan stroke using `context.strokeRect(10, 10, 480, 340)`. |
| **2. Arc or Circle** | pp. 251–255 | Golden circular orb rendered with `context.arc(80, 80, 45, 0, Math.PI * 2, true)` with solid yellow fill and lighter stroked border. |
| **3. Triangle** | pp. 250–253 | Custom polygon path built using `moveTo(80, 160)`, `lineTo(140, 260)`, `lineTo(20, 260)`, and `closePath()`, filled with cyan. |
| **4. Line 1** | pp. 248–251 | Horizontal slate divider line drawn with `moveTo(25, 290)` and `lineTo(475, 290)` with a 2px stroke width. |
| **5. Line 2** | pp. 248–251 | Vibrant green horizontal accent bar drawn from `(30, 325)` to `(210, 325)` featuring an 8px stroke and `context.lineCap = "round"`. |
| **6. Additional Shape & Transformation** | pp. 256–260 | Purple square centered at `(-35, -35)` with dimensions `70x70`. Transformed using `context.translate(400, 85)` and rotated by 35 degrees (`(35 * Math.PI) / 180`) into an angled diamond badge, sandboxed between `context.save()` and `context.restore()`. |
| **7. Composite Operation** | pp. 262–263 | Set `context.globalCompositeOperation = "xor"` between an orange circle (`arc` at `260, 165`) and an overlapping blue square (`fillRect` at `230, 135`). Overlapping pixels cancel out to reveal the dark canvas background. |
| **8. Continuity & Responsiveness** | Chapters 7 & Appendix B | Maintains fluid column layout (`28.6%` / `68.6%`), REM typography, small-screen stacking at $\le$ 384px, button content toggle, and dynamic greeting. |

---

## Submission Details

* **Transformation Used & Affected Shape:**
  * A translation and rotation transformation (`context.translate(400, 85)` and `context.rotate((35 * Math.PI) / 180)`). It affects the purple square in the top right, rotating it into an angled diamond badge.
* **Composite Operation Used & Visible Effect:**
  * The `"xor"` composite operation on an orange circle and an overlapping blue square. Where the square overlaps the circle, it cuts out the color and turns transparent, leaving a square cutout that shows the dark background underneath.

---

## Getting Started

1. Clone or download this project directory.
2. Verify that `index.html`, `style.css`, `script.js`, and `README.md` reside in the root project folder, with instruction files in `Docs/`.
3. Open `index.html` in any modern web browser or visit the live server deployment at [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html).