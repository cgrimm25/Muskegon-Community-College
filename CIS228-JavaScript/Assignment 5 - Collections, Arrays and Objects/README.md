# Assignment 5 - Collections, Arrays and Objects: Convenience Store Inventory Manager

## Overview
This laboratory assignment demonstrates the manipulation, filtering, and aggregation of complex JavaScript data structures using Collections (arrays of objects). Converted from the baseline demonstration package, the application models an in-memory inventory management system for a convenience store. Using core functional array methods—`map()`, `filter()`, and `reduce()`—the script processes multi-property grocery objects, extracts formatted datasets, applies conditional threshold filters, computes aggregate financial statistics, and identifies category leaders without mutating source data.

---

## File Directory

### Web Source Objects
* **`index.html`**: The single-page application host providing structure, assignment documentation metadata, and the script entry point.
* **`inventory.js`**: Core JavaScript program defining the `groceryItems` collection, executing data transformations, and generating the formatted console report.

### Reference Starter Package (`Example/`)
* **`index.html`**: Baseline demo webpage featuring structured output panels for Objects, Arrays, and Collections.
* **`style.css`**: Presentation styles for the baseline UI containers and `<pre>` output blocks.
* **`script.js`**: Baseline script illustrating initial syntax for objects, primitive array operations, and collection iteration.
* **`README.md`**: Starter package documentation describing the baseline data structures.

### Documentation & Reference Materials (`Docs/`)
* **`Assignment 5 Instructions.pdf`**: Official assignment specifications, functional requirements, rubric benchmarks, and submission criteria.

---

## Instructor Resources & Video Walkthroughs

* [CIS 228 Collections, Arrays, and Objects Lecture](https://www.youtube.com/watch?v=cI2Wvkmq5Ts) – Course topic lecture covering JavaScript objects, array structures, collection design, and transformation methods.
* [CIS 228 Convenience Store Inventory Manager Walkthrough](https://www.youtube.com/watch?v=DY9IYaFX6pE) – Assignment walkthrough detailing collection modeling, map/filter/reduce implementation, and console report formatting.

---

## Technical Program Flow & Execution Summary

The script processes an in-memory collection of convenience store grocery items (minimum 8 items required by assignment specification) through sequential functional array pipelines:

| Stage | Operation / Method | Implementation Details & Behavior |
| :--- | :--- | :--- |
| **1. Data Modeling** | `groceryItems` Collection | Array of grocery item objects tracking `id`, `name`, `category`, `price`, `inStock`, and `quantity`. |
| **2. Name Extraction** | `map(item => item.name)` | Transforms collection objects into a clean, single-dimension array of product name strings. |
| **3. String Formatting** | `map(item => ...)` | Uses template literals and `.toFixed(2)` to generate formatted price tags (e.g., `"$2.99 - Milk"`). |
| **4. Value Computation** | `map(item => ({ ... }))` | Projects new objects pairing `name` with calculated total asset values (`price * quantity`). |
| **5. Availability Query** | `filter(item => item.inStock)` | Filters the collection down to active stock items where `inStock === true`. |
| **6. Category Partition** | `filter(item => item.category === "beverages")` | Isolates products assigned specifically to the beverage classification. |
| **7. Threshold Auditing** | `filter(item => item.quantity < 5)`<br>`filter(item => item.price > 5.00)` | Extracts inventory items requiring restock (< 5 units) and premium inventory items (> $5.00). |
| **8. Financial Aggregation** | `reduce((sum, item) => ...)` | Accumulates grand inventory value across all units and evaluates category sub-totals via chained filtering. |
| **9. Metrics & Counts** | `reduce()` conditional accumulator | Tally counts of in-stock items via ternary evaluation and computes the average item price. |
| **10. Category Max (Bonus)** | `reduce((acc, item) => ..., {})` | Groups products by category and retains only the highest-priced item per category using an object accumulator. |

---

## Key JavaScript Concepts Demonstrated

* **Collections (Arrays of Objects)**: Managing real-world domain records with mixed primitive datatypes (`string`, `number`, `boolean`) inside an iterable collection structure.
* **Pure Array Transformations (`map`)**: Transforming source arrays into newly projected arrays of identical lengths without mutating the original collection.
* **Declarative Subsetting (`filter`)**: Applying predicate functions returning boolean evaluations to extract targeted data subsets based on string matches, boolean flags, and numeric boundaries.
* **Iterative Accumulation (`reduce`)**: Reducing entire collections down to single primitive values (sums, counts, averages) using initialized accumulators (`0`).
* **Object Accumulation & Grouping**: Leveraging `{}` as an initial `reduce` accumulator to build hash-map dictionaries that classify records and compute category maximums dynamically.
* **Method Chaining**: Composing array pipelines by directly chaining `.filter()` into `.reduce()` to perform scoped calculations on filtered subsets.

---

## Getting Started

1. Clone or download this repository to your local machine.
2. Ensure `Assignment 5 Instructions.pdf` is placed in the `Docs/` directory.
3. Open `index.html` in any modern web browser (Chrome, Edge, Firefox).
4. Press **F12** (or right-click and choose **Inspect**) and open the **Console** tab to review the complete inventory report and data structures.