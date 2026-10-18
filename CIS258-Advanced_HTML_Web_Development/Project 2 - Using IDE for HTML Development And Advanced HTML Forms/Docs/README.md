# Project #2 - Using IDE for HTML Development and Advanced HTML Forms (Part 2)

## Overview
This assignment demonstrates the implementation of HTML5 web forms, semantic input types, regular expression pattern validation, and client-side JavaScript fallback validation. Adapted from the baseline *Zookeeper Application Form* starter package, the application models a **Library Volunteer Application Form** deployed to a URL-safe `Chapter04` server directory.

---

## File Directory

### Web Source Objects
* **`week2project2.html`**: The modified Library Volunteer Application Form featuring custom HTML5 input validation attributes, regex patterns, placeholders, and JavaScript fallback logic.
* **`ZookeeperForm.css`**: External stylesheet providing typography, fieldset framing, inline-block label alignment, and focus/input dimensions.
* **`modernizr-latest.js`**: Modernizr v2.6.3 library used to detect native browser support for HTML5 form attributes (`Modernizr.input.required`).

### Reference Starter Package
* **`ZooKeeperForm_Revised.html`**: Baseline starter HTML form provided by the instructor prior to organization customization and validation enhancements.

### Documentation & Reference Materials (`Docs/`)
* **`Project #2 Instructions.pdf`**: Official assignment specifications, URL naming standards, form validation requirements, live deployment links, and front-end verification screenshot.

---

## Instructor Resources & Video Walkthroughs

* [Week 2 - Using HTML Forms and the Client Server Relationship on the Internet](https://www.youtube.com/watch?v=FWSqoaunFmQ) – Course lecture and walkthrough covering HTML5 form controls, client-side validation attributes, regular expression patterns, and the client-server publishing workflow.

---

## Live Deployment & Validation Links

* **Live Student Server URL**: [http://157.245.246.41:8014/Chapter04/week2project2.html](http://157.245.246.41:8014/Chapter04/week2project2.html)
* **W3C Markup Validation Service**: [https://validator.w3.org/](https://validator.w3.org/)

---

## Technical Summary & Implementation Details

The form adapts the starter template to fulfill all Project 2 specifications across six core stages:

| Stage | Feature / Element | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. URL-Safe Directory** | `Chapter04/` | Eliminates folder spaces (`Chapter 04` to `Chapter04`) to comply with standard web server URL conventions. |
| **2. Domain Adaptation** | `<title>`, `<h1>`, `<legend>`, `<label>` | Re-themes the Zookeeper application into a **Library Volunteer Application Form** with eight library-specific volunteer area checkboxes. |
| **3. Input Placeholders** | `placeholder="..."` | Adds user input hints across the `name` (`"Chris Grimm"`), `telephone` (`"6165551234"`), and `email` (`"chrisgrimm@example.com"`) fields. |
| **4. Regex Phone Validation** | `pattern="[0-9]{10}"` & `required` | Enforces mandatory telephone entry restricted strictly to 10 numeric digits with a descriptive `title` tooltip on validation failure. |
| **5. Numeric Step Control** | `<input id="age" step="1">` | Modifies the `age` number input increment from `0.1` (tenths of a year) to `1` (whole-year increments) within a `0` to `120` range. |
| **6. Custom & Fallback JS** | `validateComments()` & `validateForm()` | Enforces a 20-character minimum on `<textarea id="comments">` via `setCustomValidity()` and uses Modernizr to provide required-field fallback checks. |

---

## Key HTML5 & Form Concepts Demonstrated

* **Constraint Validation API & Regex Patterns**: Using `required`, `type="email"`, `type="date"`, `type="number"`, and `pattern="[0-9]{10}"` to enforce data integrity natively before form submission.
* **CSS Pseudo-Class Validation Styling**: Highlighting incomplete or invalid mandatory inputs dynamically using `textarea:required:invalid` and `input:required:invalid`.
* **Progressive Enhancement with Modernizr**: Detecting browser support via `Modernizr.input.required` and falling back to DOM iteration (`document.getElementById("libraryVolunteerForm").elements`) when native support is absent.

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Open `week2project2.html` locally in any modern web browser, or visit the live deployment at [http://157.245.246.41:8014/Chapter04/week2project2.html](http://157.245.246.41:8014/Chapter04/week2project2.html).