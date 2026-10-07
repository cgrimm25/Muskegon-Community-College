/**
 * //==================================================================================
 * // Institution: Muskegon Community College
 * // Semester:    Fall 2026
 * // Course:      CIS-228-F01X JavaScript
 * // Instructor:  Clayton Corrello
 * // Project:     Assignment #4 - Advanced Scope and Nested Scope
 * // File Name:   assignment.js
 * // Author:      Chris Grimm
 * // Date:        09/28/2026
 * //
 * // Description:
 * //   Implements a counter factory pattern utilizing JavaScript closures and lexical 
 * //   scoping to manage private mutable state. Instantiates isolated counter functions 
 * //   (userCounter and dataCounter) and binds button events to manipulate independent scope.
 * //
 * // Input File:  None (DOM User Interaction)
 * // Output File: Preformatted Text Injections to #output
 * //==================================================================================
 *
 * @param {number} initialValue - The variable that defines the outer scope's 'state'.
 * @returns {function} A specialized counter function (the closure).
 */

const counterFactory = (initialValue) => {
  // Private counter variable in the outer scope
  let counter = initialValue;

  // Inner function that forms the closure
  const increment = (incrementBy) => {
    counter += incrementBy;
    return counter;
  };

  // Return the specialized function
  return increment;
};

/*
 * ========================================================
 * APPLICATION INITIALIZATION
 * ========================================================
*/

// --- Scope 1: User Counter ---
const userCounter = counterFactory(0);

// --- Scope 2: Data Counter ---
const dataCounter = counterFactory(100);

// ========================================================
// EVENT LISTENERS (Executing the Closure)
// ========================================================

document.getElementById("button1").addEventListener("click", () => {
  const val1 = userCounter(1);
  const val2 = userCounter(5);
  document.getElementById("output").textContent +=
    `[User Counter]: ${val1}, ${val2}\n`;
});

document.getElementById("button2").addEventListener("click", () => {
  const val1 = dataCounter(10);
  const val2 = dataCounter(20);
  document.getElementById("output").textContent +=
    `[Data Counter]: ${val1}, ${val2}\n`;
});

// Initial prompt to guide the user
document.getElementById("output").textContent =
  "Click a button to execute the functions and see the scope chain in action.\n";
