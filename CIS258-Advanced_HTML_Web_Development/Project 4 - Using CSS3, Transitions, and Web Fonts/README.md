# Project #4 - Using CSS3, Transitions, and Web Fonts

## Overview
This assignment extends an article-based web page (`week3project2.html`) with advanced Chapter 6 CSS3 features. Built upon the baseline *Apocalypse Now* starter template, the application incorporates five distinct visual and interactive customizations: Google Web Fonts, multi-stop linear gradients and drop shadows, RGBA semi-transparent rounded boxes, image card framing with hover transitions and 2D transforms, and interactive subheading hover effects.

---

## File Directory

### Web Source Objects
* **`week3project2.html`**: The customized HTML5 Apocalypse article incorporating Google Web Fonts, semantic structures, and enhanced CSS styling.
* **`ApocalypsePage_Revised.css`**: The main external CSS3 stylesheet defining layout columns, gradient headers, rounded box backgrounds, shadows, and interactive hover transitions.
* **`ApocalypsePage_Revised.html`**: The original instructor-provided starter template page.

### Custom Font-Face Stylesheets
* **`ImpactLabel.css`**: External `@font-face` stylesheet defining the `ImpactLabelRegular` and `ImpactLabelReversedRegular` font families.
* **`Metrophobic.css`**: External `@font-face` stylesheet defining the `MetrophobicRegular` font family.
* **`ZeroZero.css`**: External `@font-face` stylesheet defining the `ZeroZeroIsRegular` font family.

### Media Assets & Supplemental Files
* **`human_skull.jpg`**: Supporting JPEG photographic image featured inside the span figure card.
* **`quotes_start.png` & `quotes_end.png`**: Graphic quotation mark asset files used within the pull quote layout.

### Documentation & Reference Materials (`Docs/`)
* **`Project #4 Instructions.pdf`**: Official assignment specifications, enhancement requirements, live deployment links, and front-end verification details.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/Chapter06/Fonts/week3project2.html](http://157.245.246.41:8014/Chapter06/Fonts/week3project2.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)

---

## Technical Summary & Implementation Details

The project successfully implements **five distinct Chapter 6 enhancements**:

| Enhancement | Feature / Property | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. Web Fonts** | Google Fonts API (`Special Elite`, `Oswald`) | Integrates cloud-hosted font stylesheets to style header subtitles and article lead-in text. |
| **2. Gradients & Shadows** | `linear-gradient`, `box-shadow`, `text-shadow` | Replaces the flat header background with a multi-stop linear gradient and adds depth with text and box shadows. |
| **3. Rounded RGBA Boxes** | `rgba()`, `border-radius`, `box-shadow` | Styles pull-quotes and the footer with semi-transparent background alpha-channels and asymmetric rounded corners. |
| **4. Card Framing & Transforms** | `transition`, `transform: scale()` | Frames the skull figure as a card with a hover effect that smoothly enlarges and tilts the image. |
| **5. Interactive Subheadings** | `transition: transform 0.3s ease` | Enhances article subheadings (`h2`) with smooth hover transitions, leveling out rotations and shifting font color. |

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Ensure all CSS stylesheets, image assets, and `week3project2.html` remain in the `Chapter06/Fonts/` directory structure.
3. Open `week3project2.html` locally in any modern web browser, or visit the live deployment at [http://157.245.246.41:8014/Chapter06/Fonts/week3project2.html](http://157.245.246.41:8014/Chapter06/Fonts/week3project2.html).