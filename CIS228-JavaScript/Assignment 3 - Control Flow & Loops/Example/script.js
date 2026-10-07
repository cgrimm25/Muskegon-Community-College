/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #3 - Control Flow and Looping (Starter Example)
// File Name:   script.js
// Author:      Clayton Corrello (Adapted by Chris Grimm)
// Date:        09/19/2026
//
// Description:
//   Baseline script demonstrating basic control flow mechanisms using hardcoded 
//   values. Executes if-else branching, multi-condition switch evaluation, and 
//   for, while, and do-while looping constructs triggered via interface buttons.
//
// Input File:  None (Hardcoded Values)
// Output File: Dynamic Output Container Text/HTML Injections
//==================================================================================
*/

function runIfElse() {
  const output = document.getElementById('if-else-output');
  let text = '';
  const num = 7;
  if (num > 0) {
    text = 'The number ' + num + ' is positive.';
  } else if (num < 0) {
    text = 'The number ' + num + ' is negative.';
  } else {
    text = 'The number is zero.';
  }
  output.innerText = text;
}

function runSwitch() {
  const output = document.getElementById('switch-output');
  let text = '';
  const day = 3;
  switch (day) {
    case 0:
      text = 'Sunday';
      break;
    case 1:
      text = 'Monday';
      break;
    case 2:
      text = 'Tuesday';
      break;
    case 3:
      text = 'Wednesday';
      break;
    case 4:
      text = 'Thursday';
      break;
    case 5:
      text = 'Friday';
      break;
    case 6:
      text = 'Saturday';
      break;
    default:
      text = 'Invalid day';
  }
  output.innerText = text;
}

function runForLoop() {
  const output = document.getElementById('for-loop-output');
  let text = '';
  for (let i = 1; i <= 5; i++) {
    text += 'Iteration ' + i + '<br>';
  }
  output.innerHTML = text;
}

function runWhileLoop() {
  const output = document.getElementById('while-loop-output');
  let text = '';
  let count = 5;
  while (count > 0) {
    text += 'Count: ' + count + '<br>';
    count--;
  }
  output.innerHTML = text;
}

function runDoWhileLoop() {
  const output = document.getElementById('do-while-loop-output');
  let text = '';
  let count = 5;
  do {
    text += 'Count: ' + count + '<br>';
    count--;
  } while (count > 0);
  output.innerHTML = text;
}