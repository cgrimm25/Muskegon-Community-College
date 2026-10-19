/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #6 - DOM Manipulation: Interactive Study Task List (Starter)
// File Name:   script.js
// Author:      Clayton Corrello (Adapted by Chris Grimm)
// Date:        10/19/2026
//
// Description:
//   Student starter template containing DOM element selections, reference quotes,
//   initialization logic, an inline syntax cheat sheet, and 6 TODO markers
//   guiding full implementation of dynamic list manipulation.
//
// Input File:  User keystrokes in #task-input and button click events
// Output File: DOM mutations (#task-list, #task-count, #message) and Console output
//==================================================================================
*/

/**
 * ============================================================
 *  ASSIGNMENT: Interactive Study Task List
 * ============================================================
 *
 *  HOW TO COMPLETE THIS ASSIGNMENT
 *  1. Search this file for "TODO" (Ctrl+F on Windows, Cmd+F on Mac).
 *  2. There are 6 TODOs, numbered in the same order as the
 *     assignment sheet (Step 1 ... Step 6).
 *  3. Make a change -> save the file -> refresh your browser.
 *  4. If something breaks, check the Console (F12) for red text.
 *
 *  You may look at the class demo (dom-basics-demo) for patterns.
 *  Do NOT edit index.html or styles.css.
 *
 * ------------------------------------------------------------
 *  CHEAT SHEET (all of these appear in the class demo)
 * ------------------------------------------------------------
 *  Select an element:     const el = document.getElementById('id');
 *  Read / change text:    el.textContent = 'new text';
 *  Read what was typed:   input.value
 *  Create an element:     const li = document.createElement('li');
 *  Give it a class:       li.className = 'task-item';
 *  Put text inside it:    li.textContent = text;
 *  Add it to the page:    list.appendChild(li);
 *  Remove an element:     list.removeChild(item);   // or: item.remove();
 *  React to a click:      btn.addEventListener('click', functionName);
 *                         ⚠ write the function NAME, without ( )
 *  All matches:           document.querySelectorAll('.task-item')
 *  Loop over matches:     list.forEach(function (item) { ... });
 *  Random item:           arr[Math.floor(Math.random() * arr.length)]
 * ============================================================
 */

// =============================================
// THE ELEMENTS (already selected for you)
// =============================================
const message = document.getElementById('message');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const btnMotivate = document.getElementById('btn-motivate');
const btnDoneAll = document.getElementById('btn-done-all');

// Quotes used by "Motivate Me!" (Step 5) — already provided
const QUOTES = [
    'You got this! One task at a time.',
    'Small progress is still progress.',
    'Future you will say thanks.',
    'Focus up — the finish line is closer than it looks.',
    'Done is better than perfect.'
];

// =============================================
// STEP 1 — WIRE UP THE BUTTONS  (10 points)
// =============================================
function setupEventListeners() {
    // Already done for you — this is exactly what the other three need:
    btnAdd.addEventListener('click', addTask);

    // TODO 1: Connect the remaining three buttons, using the same pattern:
    //
    //    <button variable>.addEventListener('click', <function name>);
    //
    //    btnRemove   should call  removeLastTask
    //    btnMotivate should call  changeMessage
    //    btnDoneAll  should call  markAllDone
    //
    // ⚠ Common mistake: addTask() with parentheses runs the function
    //   immediately. Write addTask (no parentheses) so it runs on the click.
}

// =============================================
// STEP 2 — KEEP THE COUNTER UPDATED  (10 points)
// =============================================
function updateCount() {
    // TODO 2: Make the counter paragraph (#task-count) show the real number
    //         of tasks currently in the list.
    //
    //    1. Count the tasks:
    //         const total = taskList.querySelectorAll('.task-item').length;
    //    2. Show the result (template literal uses backticks ` not quotes '):
    //         taskCount.textContent = `Total Tasks: ${total}`;
    //
    // Call this function whenever tasks are added or removed.
}

// =============================================
// STEP 3 — ADD A TASK  (25 points)
// =============================================
function addTask() {
    // TODO 3a: Read what the user typed and remove extra spaces:
    //         const text = taskInput.value.trim();
    //
    // TODO 3b: If text is an empty string, stop the function early:
    //         - message.textContent = 'Please type a task first!';
    //         - return;
    //
    // TODO 3c: Create the list item:
    //         const li = document.createElement('li');
    //         li.className = 'task-item';   // ← without this it looks unstyled
    //         li.textContent = text;         // ← never use innerHTML for user input
    //
    // TODO 3d: Add the new item to the bottom of the list:
    //         taskList.appendChild(li);
    //
    // TODO 3e: Three finishing touches:
    //         - clear the box so the next task starts fresh:  taskInput.value = '';
    //         - keep the counter correct:                     updateCount();
    //         - confirm success:      message.textContent = `Added: ${text}`;
}

// =============================================
// STEP 4 — REMOVE THE LAST TASK  (15 points)
// =============================================
function removeLastTask() {
    // TODO 4a: Select every task in the list:
    //         const items = taskList.querySelectorAll('.task-item');
    //
    // TODO 4b: If there are none (items.length === 0), show a friendly
    //          message and return early — otherwise the page will crash:
    //         message.textContent = 'No tasks left to remove!';
    //         return;
    //
    // TODO 4c: Remove the last task — choose ONE of these:
    //         taskList.removeChild(items[items.length - 1]);
    //         — or the modern way —
    //         items[items.length - 1].remove();
    //
    // TODO 4d: Finish up:
    //         - updateCount();
    //         - tell the user which task was removed (items[...]text was stored
    //           BEFORE removing — capture it in a variable first).
}

// =============================================
// STEP 5 — MOTIVATE ME!  (15 points)
// =============================================
function changeMessage() {
    // TODO 5: Pick a random quote from QUOTES and show it in #message.
    //
    //    This is the same idea as "Change Name" in the class demo:
    //
    //    const index = Math.floor(Math.random() * QUOTES.length);
    //    message.textContent = QUOTES[index];

    // (You do NOT need a loop for this.)
}

// =============================================
// STEP 6 — TOGGLE ALL TASKS  (15 points)
// =============================================
function markAllDone() {
    // TODO 6: Select every task, then add the class "done" to each one
    //         (CSS already knows how to style .done).
    //
    //    const items = document.querySelectorAll('.task-item');
    //    items.forEach(function (item) {
    //        // add the class here
    //    });
    //
    //    Tip: classList.toggle('done') adds the class if it is missing
    //    and removes it if it is there — so this button can also
    //    "un-done" everything. That is why the button says Toggle.
}

// =============================================
// STARTUP (already written for you)
// =============================================
function init() {
    setupEventListeners();
    updateCount(); // shows the starting count as soon as the page loads
}

// Wait until the page has finished loading, then start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
