/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #6 - DOM Manipulation: Interactive Study Task List
// File Name:   script.js
// Author:      Chris Grimm
// Date:        10/19/2026
//
// Description:
//   Core client-side script implementing DOM event listeners, programmatic element
//   creation, input validation guards, node insertion/removal, dynamic counter tracking,
//   random motivational quote display, and classList toggle styling for study tasks.
//
// Input File:  User text input from #task-input and button click/keydown events
// Output File: Dynamic DOM node mutations (#task-list, #task-count, #message) and Console logs
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
    btnRemove.addEventListener('click', removeLastTask);
    btnMotivate.addEventListener('click', changeMessage);
    btnDoneAll.addEventListener('click', markAllDone);

    //Bonus: Press Enter in the input box to add a task 
    taskInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Bonus: Click a single task to toggle done (Event Delegation)
    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('task-item')) {
            event.target.classList.toggle('done');
        }
    });
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
    const total = taskList.querySelectorAll('.task-item').length;
    taskCount.textContent = `Total Tasks: ${total}`;
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
    const text = taskInput.value.trim();

    if (text === '') {
        message.textContent = 'Please type a task first!';
        return;
    }

    const li = document.createElement('li');
    li.className = 'task-item';    
    li.textContent = text;

    taskList.appendChild(li);

    taskInput.value = '';
    updateCount();
    message.textContent = `Added: ${text}`;

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
    const items = taskList.querySelectorAll('.task-item');

    if (items.length === 0) {
        message.textContent = 'No tasks left to remove!';
        return;
    }

    const removedText = items[items.length - 1].textContent;
    items[items.length - 1].remove();

    updateCount();
    message.textContent = `Removed: ${removedText}`;

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
    const newMessage = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    message.textContent = newMessage;
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
    const items = document.querySelectorAll('.task-item');
    items.forEach(function (item) {
          item.classList.toggle('done');
    });
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
