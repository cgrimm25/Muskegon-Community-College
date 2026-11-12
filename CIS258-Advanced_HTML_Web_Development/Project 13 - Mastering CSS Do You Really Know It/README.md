# Project 13 - Mastering CSS Do You Really Know It?

## Overview

This project completes the Week 11 assignment focused on Advanced CSS and DOM manipulation. The core objective of this project is to completely style a provided web page without altering the underlying HTML structure in any way. By relying exclusively on a custom CSS stylesheet, the project demonstrates the power of advanced CSS selectors, pseudo-elements, and responsive media queries.

## File Directory

### Web Source Files
* **`index.html`**: The structural HTML file provided by the instructor. Per the assignment requirements, the HTML structure within the `<body>` remains 100% unmodified.
* **`style.css`**: The external stylesheet containing all visual formatting, responsive breakpoints, structural pseudo-classes, and CSS-generated content.

### Documentation & Reference Materials (`Docs/`)
* **`Docs/Project #13 Instructions.pdf`**: Official assignment requirements and grading criteria.
---

## Resources & Reference Materials

The following reference materials and documentation were utilized to implement the advanced CSS techniques in this project:

**Responsive Design:**
* [Alternating Row Background Colors Upon Resize (YouTube Demonstration)](https://www.youtube.com/watch?v=WZZfjIbKf28)

## Advanced CSS Selectors Breakdown & Testing Environments

* **Descendant combinators**: Select matching elements anywhere inside another element.  
  * [Element Element Combinator Practice](https://www.w3schools.com/css/tryit.asp?filename=trycss_sel_element_element)
* **Child combinators**: Select matching elements that are direct children.  
  * [Child Combinator Practice](https://www.w3schools.com/css/tryit.asp?filename=trycss_sel_element_gt)
* **Adjacent sibling combinators**: Select a matching element immediately following another sibling element.  
  * [Adjacent Sibling Combinator Practice](https://www.w3schools.com/css/tryit.asp?filename=trycss_sel_element_pluss)
* **General sibling combinators**: Select matching sibling elements that appear later.  
  * [General Sibling Combinator Practice](https://www.w3schools.com/css/tryit.asp?filename=trycss_sel_element_tilde)
* **Attribute selectors**: Select elements based on their attributes or attribute values.  
  * [Attribute Selector Practice](https://www.w3schools.com/css/tryit.asp?filename=trycss_sel_attribute)

---

## Live Deployment & Validation Links

* **Live Page**: <http://157.245.246.41:8014/Project13/index.html>
* **W3C Markup Validation Service**: <https://validator.w3.org/>
* **W3C CSS Validation Service**: <https://jigsaw.w3.org/css-validator/>

---

## Technical Summary & Requirements Implementation

The implementation satisfies all Project #13 criteria using advanced CSS features and strict adherence to structural boundaries.

| Requirement / Styling Feature | Implementation Details & Methods | 
| ----- | ----- | 
| **1. Text Style & Container Border** | Applied a clean custom font family (`Segoe UI`, sans-serif) to the body and styled `.container` with a colored border and rounded corners. | 
| **2. Centered Headline** | Targeted the `h4` element with `text-align: center;` and custom color/font sizing. |
| **3. Generated Content Prefix** | Used the `::before` pseudo-element and `content: "State of ";` on list items (`li`) to dynamically prepend the required phrase without modifying the HTML markup. |
| **4. Alternating Typography & Colors** | Leveraged structural pseudo-classes `:nth-child(odd)` and `:nth-child(even)` to alternate background shades and apply bold weight to even-numbered rows. |
| **5. Responsive Media Queries** | Implemented four distinct `@media` rules at `max-width` breakpoints of `1000px`, `900px`, `800px`, and `700px` to dynamically alter row background color themes upon window resize. |
| **6. Additional Enhancement 1 (Box-Shadow)** | Added a subtle 3D drop-shadow (`box-shadow: 0px 8px 16px rgba(0,0,0,0.15);`) to `.container` for visual depth. | 
| **7. Additional Enhancement 2 (Adjacent Sibling)** | Utilized the adjacent sibling combinator (`h4 + ol`) from the advanced selectors reading to precisely apply top margins to the ordered list when immediately following the headline. |

---

## Additional Enhancements Summary

To go beyond the base requirements, the following two CSS enhancements were added:

1. **Box-Shadow for Depth**: Applied a `box-shadow` rule to the `.container` class to give the bordered content area a subtle 3D drop-shadow effect against the page background. 
2. **Adjacent Sibling Combinator (`h4 + ol`)**: Based on the *More CSS Selectors* reading, I utilized the adjacent sibling combinator (`+`) to specifically target the ordered list *only* when it directly follows the `h4` headline. This applies a top margin to create clean vertical spacing between the title and the list elements.

---

## Getting Started

1. Clone or download this project directory (`Project 13`).
2. Run the files through a local development server or access the live student server deployment.
3. **To Test:** 
    * Open `index.html` in a web browser.
    * Verify that each list item displays the "State of " prefix and alternating row colors.
    * Resize the browser window across the `1000px`, `900px`, `800px`, and `700px` thresholds to observe the responsive background color theme transitions.