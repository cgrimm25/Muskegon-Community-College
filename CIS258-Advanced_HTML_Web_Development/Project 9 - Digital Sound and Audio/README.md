# Project 9 - Bouncing Ball with Sound

## Overview
This project completes Part 1 of Week 8 assignments, building upon the textbook's *Bouncing Ball with Sound* example (Chapter 9 / Audio material, pp. 271–285) of *HTML5: The Missing Manual, 2nd Edition*. The application combines HTML5 Canvas vector animations, physics calculations (gravity and friction), dynamic multi-channel collision sound effects, and looping background music with source attribution into a unified coursework portal.

---

## File Directory

### Web Source Files 
* **`index.html`**: The root coursework portal defining the responsive two-column layout, interactive DOM event handlers, and directory links to published assignments including Project #9.
* **`SoundEffects.html`**: The dedicated project page featuring a consistent site header, 800×400 canvas drawing surface, bouncing ball controls, and background music attribution.
* **`style.css`**: The master external stylesheet servicing both pages, managing fluid layout columns, theme colors, button interactions, and responsive canvas scaling.
* **`script.js`**: The consolidated client-side script managing time-of-day greetings, Canvas drawing graphics, ball constructor logic, gravity/friction physics, collision sound rotation (`boing1.wav`, `boing2.wav`, `beep.mp3`), and audio playback states.

### Audio Assets (`Music/`)
* **`Music/legacy.mp3`**: Selected replacement background music track ("Legacy" by Scott Buckley) sourced from the YouTube Audio Library.
* **`Music/boing1.wav`**, **`Music/boing2.wav`**, **`Music/boing3.wav`**, **`Music/beep.mp3`**: Multi-channel audio collision sound effects.

### Documentation & Reference Materials (`Docs/`)
* **`Docs/Project #9 Instructions.pdf`**: Official assignment requirements specifying canvas dimensions, custom ball fill and outline styling, background music replacement, looping attributes, and attribution guidelines.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/SoundEffects.html](http://157.245.246.41:8014/SoundEffects.html)
* **Home Page URL**: [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)

---

## Course Video Resources

The following video tutorials from *HTML5: The Missing Manual (2nd Edition)* provide foundational instruction for canvas rendering, audio integration, and interactive scripting applied across this module:

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

The implementation satisfies all Week 8 Project 1 criteria:

| Requirement | Textbook Reference | Implementation Details & Methods |
| :--- | :--- | :--- |
| **1. Consistent Header** | Course Guidelines | Applied the identical `<h1>Chris Grimm's Home Page</h1>` header across `index.html` and `SoundEffects.html`. |
| **2. Canvas Dimensions** | pp. 271–275 | Configured `#ballCanvas` width to `800` pixels and height to `400` pixels. |
| **3. Custom Ball Fill** | pp. 271–276 | Assigned custom cyan fill (`#06b6d4`) inside the `Ball` constructor, satisfying the non-green/non-brown requirement. |
| **4. Ball Outlines** | pp. 271–276 | Configured each ball with a red outline (`strokeColor = "red"`) and a line width of `10` (`context.lineWidth = 10`). |
| **5. New Background Music** | pp. 277–282 | Replaced default audio with **"Legacy"** by Scott Buckley (`legacy.mp3`) uploaded to the server's `Music/` directory. |
| **6. Looping Music** | pp. 277–282 | Added the HTML5 `loop` attribute to the background audio element (`<audio id="backgroundMusic" loop>`). |
| **7. Music Credit & Link** | pp. 277–282 | Displayed the track title, artist name, and a direct hyperlink to the YouTube source (`https://www.youtube.com/watch?v=hgXE6xS6pf8`). |
| **8. Navigation Links** | Course Guidelines | Established bidirectional navigation links connecting `index.html` and `SoundEffects.html`. |

---

## Submission Details

* **Live URL:** [http://157.245.246.41:8014/SoundEffects.html](http://157.245.246.41:8014/SoundEffects.html)
* **Audio Configuration:**
  * **Background Track:** "Legacy" by Scott Buckley (`Music/legacy.mp3`) with repeating loop.
  * **Collision Effects:** Rotating audio queue (`audio1`, `audio2`, `audio3`) referencing `boing1.wav`, `boing2.wav`, and `boing3.wav`.
* **Visual Specifications:**
  * **Canvas Size:** 800px × 400px
  * **Ball Fill:** Cyan (`#06b6d4`)
  * **Ball Outline:** Red (`red`) with `10px` stroke width

---

## Getting Started

1. Clone or download this project directory.
2. Verify that `index.html`, `SoundEffects.html`, `style.css`, `script.js`, and `README.md` reside in the root directory, with audio files stored in `Music/` and assignment specifications in `Docs/`.
3. Open `index.html` or `SoundEffects.html` in any modern web browser, or test the live deployment at [http://157.245.246.41:8014/SoundEffects.html](http://157.245.246.41:8014/SoundEffects.html).