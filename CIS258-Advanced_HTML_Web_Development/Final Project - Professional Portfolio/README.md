# Final Project - Professional Portfolio

## Overview

This project completes the **CIS-258: Advanced HTML Web Development** Final Project (Fall 2026) at Muskegon Community College, instructed by Christopher VanOosterhout. Rather than focusing on isolated HTML or CSS concepts, this six-page professional portfolio brings together HTML5, Bootstrap 5.3.3, custom CSS3, responsive Flexbox layouts, HTML5 Canvas animation, and client-side JavaScript form validation into a cohesive, production-ready website.

The portfolio showcases my background as a Software Engineer specializing in IBM i (`RPGLE`, `SQLRPGLE`, `CLLE`, `DDS`, `DB2`) and modern web development, featuring dedicated pages for my introduction, technical skills, education, work experience, development projects, and an interactive contact form.

---

## Project Structure

```text
Final Project - Professional Portfolio/
├── Documents/
│   ├── Final Project Documentation.pdf
│   ├── Final Project Overview and Details.pdf
│   ├── README.txt
│   └── resume.pdf
├── Images/
│   ├── android.png
│   ├── apple.png
│   ├── cua.png
│   ├── favicon.ico
│   ├── github.png
│   ├── gvsu.png
│   ├── icon.png
│   ├── introductionvideo.png
│   ├── mcc.png
│   ├── medhost.png
│   ├── menu.png
│   ├── mshs.png
│   ├── self.jpg
│   ├── skills.png
│   └── wellsky.png
├── JavaScript/
│   ├── canvas.js
│   └── validate.js
├── Video/
│   └── introductionvideo.mp4
├── contactme.html
├── custom.css
├── education.html
├── experience.html
├── home.html
├── projects.html
├── README.md
└── skills.html
```

---

## File Directory

### Web Source Files (Root)
* **`home.html`**: Main landing page featuring the hero introduction, LinkedIn call-to-action, profile photo (`self.jpg`), embedded introduction video (`introductionvideo.mp4`), and interactive HTML5 `<canvas>` tech-stack visualization.
* **`skills.html`**: Technical skills and methodologies showcase utilizing a Bootstrap list group styled with custom `:nth-child()` alternating row shading alongside a skill diagram.
* **`education.html`**: Academic history featuring Muskegon Community College, Grand Valley State University, and Marquette Senior High School in responsive two-column Bootstrap cards.
* **`experience.html`**: Relevant software engineering work history (MEDHOST, WellSky, and CU*Answers) structured in responsive two-column Bootstrap cards without HTML layout tables.
* **`projects.html`**: Project showcase linking to my GitHub profile (`cgrimm25`), a three-column responsive grid of featured IBM i projects (`GETWEATHER REST API`, `Library Application`, `Book Catalog CSV Importer`), and a scrollable list of CIS-258 course projects styled with `:nth-child(even)` highlights.
* **`contactme.html`**: Multi-column contact and project inquiry form with Bootstrap form controls, radio buttons, date selectors, skill checkboxes, and client-side validation.
* **`custom.css`**: External stylesheet overriding Bootstrap defaults and implementing the linear header gradient (`.hero-gradient`), `:nth-child()` selectors, hover elevation transitions, responsive canvas wrapper rules, and scrollable project list styling.

### JavaScript Files (`JavaScript/`)
* **`JavaScript/canvas.js`**: Object-oriented ES6 script (`Particle` class) powering the interactive HTML5 `<canvas>` skill visualization on `home.html` with `requestAnimationFrame`, edge-collision physics, mouse-tracking connection lines, and dynamic resize handling.
* **`JavaScript/validate.js`**: Client-side validation and live UX formatting script for `contactme.html`, handling default date initialization, live `(XXX) XXX-XXXX` phone masking, live USD currency formatting with cursor preservation, regex email validation, chronological local-time date checks, and required checkbox verification.

### Media & Assets (`Images/` & `Video/`)
* **`Video/introductionvideo.mp4`**: Recorded portfolio walkthrough and personal introduction video embedded on `home.html`.
* **`Images/introductionvideo.png`**: Static poster thumbnail displayed on the `home.html` video player prior to playback.
* **`Images/self.jpg`**: Profile portrait displayed on `home.html` with custom hover elevation styling.
* **`Images/icon.png`**, **`Images/favicon.ico`**, **`Images/apple.png`**, **`Images/android.png`**: Site branding logo and cross-platform favicon assets.
* **`Images/skills.png`**, **`Images/github.png`**: Skill diagram (`skills.html`) and GitHub profile banner (`projects.html`).
* **`Images/mcc.png`**, **`Images/gvsu.png`**, **`Images/mshs.png`**: Educational institution logos (`education.html`).
* **`Images/medhost.png`**, **`Images/wellsky.png`**, **`Images/cua.png`**: Employer logos (`experience.html`).
* **`Images/menu.png`**: Navigation asset.

### Documentation & Reference Materials (`Documents/`)
* **`Documents/Final Project Documentation.pdf`**: Full written submission mapping all 11 rubric requirements with live URLs, implementation explanations, and verification screenshots.
* **`Documents/Final Project Overview and Details.pdf`**: Official assignment instructions, framework options, and 310-point grading rubric.
* **`Documents/README.txt`**: Plain-text server documentation linked directly from the site's top navigation bar.
* **`Documents/resume.pdf`**: Downloadable PDF resume linked directly from the site's top navigation bar.

---

## Resources & Reference Materials

The following official documentation and validation tools were utilized during the design, development, and testing of this project:

**Framework & Styling:**
* [Bootstrap 5.3 Official Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/) (Grid System, Navbar, Cards, Ratio, List Group, and Form Utilities)

**JavaScript & HTML5 APIs:**
* [MDN Web Docs – Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [MDN Web Docs – `window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
* [MDN Web Docs – `Date` Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
* [MDN Web Docs – Regular Expressions (`RegExp`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

---

## Live Deployment & Validation Links

* **Home Page**: <http://157.245.246.41:8014/FinalProject/home.html>
* **Skills Page**: <http://157.245.246.41:8014/FinalProject/skills.html>
* **Education Page**: <http://157.245.246.41:8014/FinalProject/education.html>
* **Experience Page**: <http://157.245.246.41:8014/FinalProject/experience.html>
* **Projects Page**: <http://157.245.246.41:8014/FinalProject/projects.html>
* **Contact Me Page**: <http://157.245.246.41:8014/FinalProject/contactme.html>
* **Server README (`README.txt`)**: <http://157.245.246.41:8014/FinalProject/Documents/README.txt>
* **W3C Nu HTML Checker**: <https://validator.w3.org/nu/>
* **W3C CSS Validation Service**: <https://jigsaw.w3.org/css-validator/>

---

## Technical Summary & Requirements Implementation

The implementation satisfies all 11 CIS-258 Final Project rubric criteria (310 points total) and exceeds the four-page minimum with six complete pages.

| Rubric Requirement | Points | Implementation Details & Methods |
| :--- | :-: | :--- |
| **1. Framework Implementation** | 20 | Built using **Bootstrap 5.3.3** via CDN (`bootstrap.min.css` and `bootstrap.bundle.min.js`) paired with `custom.css` across all six pages. Leverages Flexbox grids (`row`, `col-md-*`, `col-lg-*`, `row-cols-*`), sticky responsive navbar, cards, list groups, badges, buttons, ratio containers, and form controls. |
| **2. CSS `nth` Selectors** | 10 | Implemented two meaningful `:nth-child()` rules in `custom.css`: `.skills-list li:nth-child(odd)` (`#ffffff`) / `.skills-list li:nth-child(even)` (`#f8f9fa`) for alternating row shading on `skills.html`, and `.project-links li:nth-child(even) span` (`#0a3d62`) to highlight alternating course projects on `projects.html`. |
| **3. Content, Navigation & Organization** | 10 | Shared sticky `<nav>` bar across all six pages with `class="nav-link active"` and `aria-current="page"` indicators, direct links to `Documents/resume.pdf` and `Documents/README.txt`, and a `visually-hidden-focusable` "Skip navigation" link for keyboard accessibility. |
| **4. Visual Design & Consistency** | 20 | Cohesive visual identity across all pages using a shared brushed-steel header gradient (`.hero-gradient`), dark navbar and footer (`bg-dark`), unified Bootstrap typography, and smooth hover elevation (`transform: translateY(-5px)`) on `.card`, `.skills-list`, and `.profile-photo`. |
| **5. Multi-Column Layouts** | 35 | Responsive CSS Flexbox multi-column grids across all six pages with zero HTML layout tables: 2-column intro/photo (`col-md-8`/`col-md-4`) and video/canvas (`col-lg-6`) on `home.html`; 2-column skills/diagram (`col-lg-7`/`col-lg-5`) on `skills.html`; 2-column horizontal cards (`col-md-3`/`col-md-9`) on `education.html` & `experience.html`; 3-column project grid (`row-cols-1 row-cols-md-3`) on `projects.html`; and multi-column form rows (`col-md-6`, `col-md-4`, `row-cols-2 row-cols-md-4`) on `contactme.html`. |
| **6. CSS Color Gradient** | 10 | Applied a brushed-steel linear gradient (`background: linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%);`) via `.hero-gradient` in `custom.css` to the `<header>` banner on every page. |
| **7. HTML Canvas** | 25 | Implemented an interactive `<canvas id="portfolioCanvas">` inside `.canvas-wrapper` on `home.html`, controlled by `JavaScript/canvas.js`, rendering animated cyan tech-stack nodes that bounce off boundaries and draw fading lines to the cursor within a 100px radius. |
| **8. Responsive Design** | 50 | Tested across desktop, tablet, and smartphone viewports. Features a collapsible mobile navbar (`navbar-toggler`), fluid images (`img-fluid`), `ratio ratio-16x9` video scaling, breakpoint-driven column stacking, and dynamic canvas resizing via `window.addEventListener('resize', ...)`. |
| **9. HTML Validation** | 50 | Validated all six HTML pages (`home.html`, `skills.html`, `education.html`, `experience.html`, `projects.html`, `contactme.html`) using the W3C Nu HTML Checker with zero errors or warnings. |
| **10. Server Upload & Documentation** | 40 | Deployed the complete `/FinalProject/` directory to the student Apache/Ubuntu web server with exact case-sensitive file paths, on-site `Documents/README.txt`, and full written Blackboard documentation (`Documents/Final Project Documentation.pdf`). |
| **11. Creativity & Going Beyond** | 40 | Implemented an object-oriented ES6 Canvas particle network (`JavaScript/canvas.js`) and a multi-step client-side form validation & live input formatting engine (`JavaScript/validate.js`). |

---

## Additional Enhancements Summary

To go beyond standard coursework for Rubric Requirement 11, two interactive JavaScript features were engineered and integrated into the site:

1. **Interactive Object-Oriented Canvas Particle Network (`JavaScript/canvas.js`)**:
   * **Implementation**: Uses an ES6 `Particle` class, `requestAnimationFrame`, edge-collision physics, and Euclidean distance calculations (`Math.sqrt`) to animate 13 labeled tech-stack nodes (`CLLE`, `DDS`, `RPGLE`, `SQLRPGLE`, `SQL`, `IBM i`, `Bootstrap`, `JavaScript`, `HTML5`, `CSS3`, `DB2`, `JSON`, `REST APIs`) and draw alpha-blended cyan lines to the user's cursor within a `100px` radius.
   * **Challenge & Solution**: On smaller screens or window resizes, particles could become trapped outside the visible canvas bounds. This was resolved by dynamically binding `canvas.width` and `canvas.height` to `canvas.parentElement.clientWidth` / `clientHeight` and re-initializing the particle array on `window.resize`.

2. **Client-Side Form Validation & Live Input Formatting (`JavaScript/validate.js`)**:
   * **Implementation**: On `DOMContentLoaded`, defaults the project start and end dates to tomorrow, formats phone numbers live as `(XXX) XXX-XXXX`, and formats budget inputs live as USD currency while preserving cursor position (`setSelectionRange`). On submit, validates required fields, regex email syntax, 10-digit phone numbers, positive numeric budgets, chronological dates, and at least one selected skill checkbox.
   * **Challenge & Solution**: Parsing `YYYY-MM-DD` strings with `new Date()` can shift dates by one day due to UTC vs. local timezone conversion. This was resolved by constructing `Date` objects numerically (`new Date(Number(year), Number(month) - 1, Number(day))`) so all comparisons against `today` remain accurate in local time.

---

## Getting Started

1. Clone or download this project directory (`Final Project - Professional Portfolio`).
2. Open the project through a local development server (such as VS Code Live Server) or visit the live student server deployment at <http://157.245.246.41:8014/FinalProject/home.html>.
3. **To Test:**
   * **Navigation & Consistency**: Click through all six pages plus the **Resume** and **Read Me** links in the sticky navbar to verify active-page highlighting and consistent headers/footers.
   * **Interactive Canvas (`home.html`)**: Move your cursor across the dark canvas panel to observe real-time node connection lines, and resize the browser window to verify dynamic canvas recalculation.
   * **CSS `:nth-child()` Selectors**: Inspect the alternating row backgrounds on `skills.html` and the alternating dark navy text highlights inside the scrollable course project list on `projects.html`.
   * **Responsive Design**: Resize the browser window or open DevTools mobile emulation (e.g., `412px` width) to verify the collapsed hamburger menu, stacked columns, and fluid media scaling.
   * **Form Validation & Live Formatting (`contactme.html`)**: Try submitting an empty form to trigger validation alerts, type digits into the **Phone** and **Budget** fields to observe live formatting, and test selecting a past date or an end date earlier than the start date.

