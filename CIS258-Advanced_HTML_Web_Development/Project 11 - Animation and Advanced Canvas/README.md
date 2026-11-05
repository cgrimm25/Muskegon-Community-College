# Project 11 - Advanced Canvas

## Overview
This project completes the Week 9 Advanced Canvas assignment, demonstrating five distinct HTML5 Canvas concepts: image slicing, styled text, pattern filling, shape interactivity, and physics-based animation. The application organizes these topics across five separate web pages, all accessible from a central navigation hub and styled with a unified external CSS architecture.

---

## File Directory

### Web Source Files 
* **`home.html`**: The central directory hub providing bidirectional navigation links to all five Canvas topic pages.
* **`CroppedPicture.html`**: Dedicated page for Topic 1, demonstrating image slicing and cropping on a canvas.
* **`Text.html`**: Dedicated page for Topic 2, demonstrating five distinctively styled segments of text.
* **`Pattern.html`**: Dedicated page for Topic 3, demonstrating pattern fills using a repeating background image.
* **`InteractiveCircles.html`**: Dedicated page for Topic 4, featuring interactive clickable shapes and hit detection.
* **`Animation.html`**: Dedicated page for Topic 5, featuring a physics-based animation loop with bouncing balls.
* **`style.css`**: The master external stylesheet servicing all pages, managing the dark-slate theme, typography, layout, and canvas elements.
* **`script.js`**: The consolidated client-side script managing the logic, drawing contexts, arrays, and math for all five canvas topics.

### Image Assets (`Img/`)
* **`Img/darwin.jpg`**: Source image utilized for the cropped picture demonstration (Topic 1).
* **`Img/brick_tile.gif`**: Source image utilized for the repeating pattern fill demonstration (Topic 3).

### Documentation & Reference Materials (`Docs/`)
* **`Docs/Project #11 Instructions.pdf`**: Official assignment requirements specifying the five chosen topics, multi-page organization, navigation links, and the three-sentence written submission requirement.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/Project11/home.html](http://157.245.246.41:8014/Project11/home.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)
* **W3C CSS Validation Service**: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)

---

## Technical Summary & Requirements Implementation

The implementation satisfies all Week 9 Project #11 criteria:

| Requirement | Implementation Details & Methods |
| :--- | :--- |
| **1. Image Slicing (p. 278)** | Used the overloaded `drawImage()` method with 9 arguments in `CroppedPicture.html` to extract and display Charles Darwin's face from a hidden DOM element. |
| **2. Drawing Text (pp. 279–280)** | Used `fillText()`, `strokeText()`, and dynamic `context.font` properties in `Text.html` to sequentially render 5 distinctly styled text segments, including drop shadows. |
| **3. Pattern Fills (pp. 283–293)** | Used `context.createPattern()` with a hidden repeating brick tile in `Pattern.html`, applying it directly to `context.fillStyle`. |
| **4. Interactivity (pp. 293–300)** | Built a hit-detection system in `InteractiveCircles.html` that uses the Pythagorean theorem to measure distances between mouse clicks and randomly generated shape coordinates. |
| **5. Animation (pp. 300–307)** | Developed a physics loop in `Animation.html` with gravity, friction, and boundary snapping, utilizing `setTimeout()` to rapidly clear and redraw coordinates. |
| **6. File Organization** | Separated the 5 topics into distinct HTML files linked via a central `home.html` hub, sharing a consolidated `style.css` and `script.js`. |

---

## Submission Details

* **Live URL:** [http://157.245.246.41:8014/Project11/home.html](http://157.245.246.41:8014/Project11/home.html)

**Topic Summaries:**
1. **Topic 1:** I created a canvas that pulls a source image of Charles Darwin from the Img folder and selectively renders only a specific cropped portion of his face. This demonstrates the topic of image slicing by using the overloaded drawImage() method, passing nine distinct arguments to define the source coordinates and the destination placement. While developing this, I learned that keeping the original image tag hidden via CSS ensures the canvas logic can still reference the loaded DOM element without awkwardly displaying the uncropped source image on the page.
2. **Topic 2:** I generated a single canvas that sequentially renders a numbered list of five distinct text segments, each utilizing a different styling technique. This demonstrates the topic by utilizing fillText(), strokeText(), and manipulating the context.font property to adjust families and sizes dynamically. During development, I changed the fourth and fifth segments to experiment with drop shadows, learning that I must explicitly reset the shadow properties back to transparent afterward so they do not accidentally inherit onto the final text string.
3. **Topic 3:** I created a canvas that draws a rectangle and completely fills its interior with a repeating brick tile image from the Img folder. This demonstrates pattern filling by utilizing the context.createPattern() method, passing in the hidden DOM image and the "repeat" string argument. I learned that once a pattern is created, it is treated exactly like a solid hex color by the canvas engine, meaning I could simply assign it to context.fillStyle before invoking the fill method on my path.
4. **Topic 4:** I built an application where clicking a button spawns randomly sized circles, and clicking directly on the canvas highlights a specific circle with a thick white border. This demonstrates shape interactivity by calculating the exact mathematical distance between the user's raw mouse click coordinates and the center point of each generated circle using the Pythagorean theorem. I changed the textbook's default colors to match my dark-slate theme and learned that storing shape data in a JavaScript array is strictly required for interactivity, as the canvas itself immediately forgets shapes once they are drawn.
5. **Topic 5:** I developed a physics-based animation loop that spawns colored balls that drop via simulated gravity, bounce off the canvas walls, and gradually slow down due to a friction multiplier. This demonstrates the topic of canvas animation by using setTimeout() to recursively trigger a frame-drawing function, clearing the canvas completely before redrawing the balls in their new coordinate positions. I changed the visual styling to match my project theme and learned that true canvas animation does not involve moving objects, but rather rapidly erasing and redrawing the entire frame to simulate motion based on state variables.

---

## Getting Started

1. Clone or download this project directory (`Project 11 - Animation and Advanced Canvas`).
2. Verify that `home.html`, the 5 topic HTML files, `style.css`, and `script.js` reside in the root directory, with image files stored in `Img/` and assignment specifications in `Docs/`.
3. Open `home.html` in any modern web browser to access the directory hub, or test the live deployment at [http://157.245.246.41:8014/Project11/home.html](http://157.245.246.41:8014/Project11/home.html).