/**
 * //==================================================================================
 * // Institution: Muskegon Community College
 * // Semester:    Fall 2026
 * // Course:      CIS-228-F01X JavaScript
 * // Instructor:  Clayton Corrello
 * // Project:     Assignment #4 - Advanced Scope and Nested Scope (Starter Example)
 * // File Name:   script.js
 * // Author:      Clayton Corrello (Adapted by Chris Grimm)
 * // Date:        09/28/2026
 * //
 * // Description:
 * //   Demonstrates a logger factory pattern utilizing JavaScript closures to retain
 * //   an immutable context prefix across function calls while maintaining scope isolation.
 * //
 * // Input File:  None (DOM User Interaction)
 * // Output File: Preformatted Text Injections to #output
 * //==================================================================================
**/

/**
 * ========================================================
 * JAVASCRIPT NESTED FUNCTIONS, CLOSURE, AND SCOPE DEMO
 * ========================================================
 * 
 * This script demonstrates how a closure (the inner function)
 * retains access to variables (the 'prefix') from its outer 
 * scope, even after the outer function has completed execution.
 * This prevents variable loss and is crucial for state management.
 * 
 * @param {string} contextPrefix - The variable that defines the outer scope's 'state'.
 * @returns {function} A specialized logging function (the closure).
 */
const loggerFactory = (contextPrefix) => {
    // The 'contextPrefix' variable is defined in the outer scope.
    // The returned function (the closure) will "capture" this variable.
    console.log(`[Factory]: Creating logger for context: "${contextPrefix}"`);

    /**
     * This inner function forms the closure. It can access 'contextPrefix'
     * from the parent scope, even after loggerFactory finishes.
     * @param {string} message - The message to log.
     */
    const logMessage = (message) => {
        // The inner function accesses the 'contextPrefix' variable from the outer scope.
        const logEntry = `[${contextPrefix}]: ${message}`;
        console.log(`[Log]: ${logEntry}`);
        
        // Display the output to the user interface
        const outputElement = document.getElementById('output');
        if (outputElement) {
            outputElement.textContent += `${logEntry}\n`;
        }
    };

    // Return the specialized function
    return logMessage;
};


/**
 * ========================================================
 * APPLICATION INITIALIZATION
 * ========================================================
 * 
 * We create two different "loggers" by calling the factory twice.
 * Each call establishes a distinct, isolated scope and variable binding.
 */

// --- Scope 1: User Module Logger ---
// The first call creates a logger bound to 'User Module'.
// The 'userLogger' variable now holds a closure that remembers 'userContext'.
const userLogger = loggerFactory("User Module");

// --- Scope 2: Data Processor Logger ---
// The second call creates a completely separate logger bound to 'Data Processor'.
// This ensures the scopes do not interfere with each other.
const dataLogger = loggerFactory("Data Processor");


// ========================================================
// EVENT LISTENERS (Executing the Closure)
// ========================================================

document.getElementById('button1').addEventListener('click', () => {
    userLogger("User 'Alice' successfully logged in.");
    userLogger("Checked profile settings.");
});

document.getElementById('button2').addEventListener('click', () => {
    dataLogger("Processed 1,500 records successfully.");
    dataLogger("Calculated SHA256 hash for batch.");
});

// Initial prompt to guide the user
document.getElementById('output').textContent = "Click a button to execute the functions and see the scope chain in action.";
