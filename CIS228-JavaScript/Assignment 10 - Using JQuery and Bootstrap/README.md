# Assignment 10 - Using jQuery and Bootstrap

## Overview
The Personal Portfolio Landing Page is a responsive single-page web application built with Bootstrap 5 and enhanced with jQuery. The project combines a responsive grid layout with client-side interactivity, demonstrating delegated event handling, smooth DOM animations for expandable skill cards, and client-side contact form validation.

---

## Instructor Resources & Video Walkthroughs

* [jQuery and Bootstrap Repository](https://github.com/profcorrello/JQuery-and-Bootstrap) – Upstream course repository containing the responsive Bootstrap and jQuery live demonstration, starter templates, and assignment instructions.
* [CIS 228 Modern JavaScript Frameworks](https://www.youtube.com/watch?v=VSa8NS9UncQ&feature=youtu.be) – Course lecture and demonstration covering modern JavaScript libraries and frameworks, Bootstrap integration, and jQuery interactivity.

---

## File Directory

### Primary Application Objects (`/`)
* **`index.html`**: The semantic HTML structure for the Student Portfolio Landing Page, utilizing Bootstrap 5 for the navigation bar, hero section, responsive three-column feature grid, and contact form, while loading Bootstrap and jQuery via CDN.
* **`starter.js`**: The primary JavaScript/jQuery file that initializes hidden card states, binds a delegated click handler for smooth card expansion, and validates the contact form email field on submission.
* **`style.css`**: Custom stylesheet supplementing Bootstrap 5 with styling for the hero banner, collapsible `.hidden-content` boxes, and `.error-message` text.
* **`README.md`**: Project documentation covering the directory layout, program execution flow, core concepts, and usage instructions.

### Documentation Materials (`Docs/`)
* **`Assignment 10 Instructions.pdf`**: Official assignment instructions outlining the three core tasks (Responsiveness, Feature Card Interactivity, and Contact Form Validation), setup steps, and the jQuery Hints Guide.

### Reference Demonstration Package (`Example/`)
* **`assignment/`**
  * **`assignment.md`**: Original Markdown instructions and hints guide for the portfolio assignment.
  * **`index.html`**, **`starter.js`**, **`style.css`**: The unmodified starter template files provided for the assignment.
* **`/` (Example Root)**
  * **`index.html`**, **`script.js`**, **`style.css`**: Upstream demonstration files showcasing Bootstrap's responsive grid system and jQuery tab/card event handling.
  * **`README.md`**: Upstream lesson overview explaining the live demo and student assignment objectives.
  * **`.gitignore`**: Standard repository ignore rules.

---

## Technical Program Flow & Execution Summary

This application wraps all interactive behavior inside `$(document).ready()` to ensure the DOM is fully constructed before executing across four main phases:

### Phase 1: Initialization & DOM Setup
As soon as the document is ready, the script hides all `.hidden-content` elements using `$('.hidden-content').hide()` so the feature card details start collapsed. It also applies the `novalidate` attribute to `#contactForm` via `.attr('novalidate', 'novalidate')`, preventing native HTML5 `required` popups from intercepting the submission before the custom jQuery validation runs.

### Phase 2: Feature Card Expansion (`click`)
A delegated click listener is attached to the `#features` container targeting `.learn-more-btn` buttons. When a button is clicked, the handler traverses up to the parent card via `$(this).closest('.card')`, locates the nested detail box with `.find('.hidden-content')`, and smoothly expands or collapses it using `.slideToggle()`.

### Phase 3: Form Submission Interception & State Reset (`submit`)
When the user submits `#contactForm`, the handler immediately calls `event.preventDefault()` to stop the browser from reloading the page or sending a default request. It then clears any prior validation text from `#emailError` using `.text('')`.

### Phase 4: Email Validation & Resolution
The script retrieves and trims the email value via `$('#emailInput').val().trim()`. If the trimmed string is empty (`=== ''`), it injects an error message into `#emailError` and moves cursor focus back to `#emailInput` using `.focus()`. If a value is present, it displays a confirmation `alert()` and clears all inputs using `$('#contactForm')[0].reset()`.

---

## Key JavaScript Concepts Demonstrated

* **Event Delegation & DOM Traversal**: Using `$('#features').on('click', '.learn-more-btn', ...)` alongside `.closest()` and `.find()` to reliably target sibling/child elements relative to the clicked button.
* **jQuery UI Animations**: Controlling element visibility smoothly with `.hide()` and `.slideToggle()` without writing custom CSS keyframe or timer logic.
* **Form Handling & Client-Side Validation**: Intercepting form submissions with `event.preventDefault()`, extracting and sanitizing input values with `.val().trim()`, and dynamically updating DOM feedback elements with `.text()`.
* **Bootstrap 5 & jQuery Integration**: Pairing Bootstrap's responsive grid classes (`col-md-4`, `col-lg-6`) and CDN bundle with custom jQuery event logic in the proper script loading order.

---

## Getting Started

Because this application loads Bootstrap 5 and jQuery via CDN, no local build tools or servers are required, though an active internet connection is needed to load the external libraries.

1. **Clone or Download** this repository to your local machine.
2. **Launch the Application** by opening `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari).
3. **Interact:**
   * Resize your browser window to observe the Bootstrap navigation bar collapse and the feature cards reflow responsively.
   * Click the **Learn More** button on any skill card under **My Core Skills** to smoothly expand and collapse its hidden details.
   * Scroll to **Get In Touch** and click **Send Message** with an empty Email Address field to trigger the inline `#emailError` message.
   * Enter a name and email address, then click **Send Message** to see the confirmation alert and automatic form reset.