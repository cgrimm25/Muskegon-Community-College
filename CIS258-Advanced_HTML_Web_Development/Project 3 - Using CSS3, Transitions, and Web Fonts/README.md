# Project #3 - Using CSS3, Transitions, and Web Fonts 

## Overview
This assignment enhances the root coursework home page (`index.html`) with external CSS3 styling (`style.css`) based on Chapter 6 specifications. Building upon the initial Week 2 landing page, the application implements an RGBA semi-transparent content container with rounded borders, a linear-gradient coursework directory container with asymmetric border radii, a radial-gradient viewport backdrop, and custom Google Web Fonts.

---

## File Directory

### Web Source Objects
* **`index.html`**: The updated root coursework home page structuring the welcome banner and coursework directory containers while linking external Google Fonts and CSS3 rules.
* **`style.css`**: External CSS3 stylesheet defining typography, RGBA alpha-channel transparency, rounded border geometries, box shadows, and linear/radial gradients.

### Documentation & Reference Materials (`Docs/`)
* **`Project #3 Instructions.pdf`**: Official assignment specifications, Chapter 6 feature requirements, live deployment URLs, and front-end rendering verification.

---

## Instructor Resources & Video Walkthroughs

* [Copy and Paste HTML Files In Your Editor (IDE)](https://www.youtube.com/watch?v=pCsJeaYK6gQ) – Walkthrough demonstrating how to duplicate, manage, and organize HTML project files within the Visual Studio Code workspace.
* [Google Fonts Demo](https://www.youtube.com/watch?v=A9fl8GVukGc) – Demonstration covering how to browse, filter, select, and embed Google Web Fonts into HTML documents using `<link>` tags and CSS `font-family` rules.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html)
* **Live External Stylesheet**: [http://157.245.246.41:8014/style.css](http://157.245.246.41:8014/style.css)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)

---

## Technical Summary & Implementation Details

The home page upgrade fulfills all Project #3 specifications across four core stages:

| Stage | Feature / Selector | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. External Stylesheet** | `<link href="style.css" rel="stylesheet">` | Separates presentation rules from HTML5 document structure for modular maintenance. |
| **2. Transparent & Rounded Box** | `.transparent-box` | Wraps the main welcome header in an RGBA semi-transparent background (`rgba(255, 255, 255, 0.15)`) with a `3px solid #38bdf8` border and `20px` rounded corners. |
| **3. Gradient Directory Box** | `.gradient-box` & `body` | Styles the coursework directory container with a `135deg` linear gradient (`#0284c7` to `#1e3a8a`), asymmetric rounded borders (`25px 5px 25px 5px`), and a `radial-gradient` page backdrop. |
| **4. Google Web Fonts** | `'Montserrat'` & `'Open Sans'` | Loads external font families via the Google Fonts API, applying bold `Montserrat` (`700`) to `<h1>`/`<h2>` headings and `Open Sans` (`400`/`600`) to body copy and links. |

---

## Key CSS3 Concepts Demonstrated

* **Alpha-Channel Color Transparency (`rgba`)**: Controlling background opacity independently of child text elements using red, green, blue, and alpha parameters (`0.15` opacity).
* **Custom Border Geometry (`border-radius`)**: Applying uniform (`20px`) and four-value asymmetric (`25px 5px 25px 5px`) corner rounding alongside drop shadows (`box-shadow`).
* **CSS3 Gradients (`linear-gradient` & `radial-gradient`)**: Generating smooth multi-stop color transitions across container backgrounds and the viewport canvas without external image assets.
* **Web Typography (`Google Fonts`)**: Embedding cloud-hosted font stylesheets in the document `<head>` for consistent cross-browser typography.

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Ensure `index.html` and `style.css` remain in the same root directory.
3. Open `index.html` locally in any modern web browser, or visit the live deployment at [http://157.245.246.41:8014/index.html](http://157.245.246.41:8014/index.html).