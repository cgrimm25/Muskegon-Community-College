/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #3 - Control Flow and Looping
// File Name:   script.js
// Author:      Chris Grimm
// Date:        09/19/2026
//
// Description:
//   Implements client-side dynamic evaluation logic for user inputs. Contains functions
//   to validate numeric input, determine polarity (positive, negative, zero) using
//   if-else branch structures, and map numerical indices (0-6) to weekdays via switch statements.
//
// Input File:  None (DOM User Input)
// Output File: Dynamic DOM Container Updates (#if-else-output, #switch-output)
//==================================================================================
*/

function runIfElse() {
  const output = document.getElementById('if-else-output');
  const num = Number(document.getElementById('num-input').value);
  let text = '';
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
  const day = Number(document.getElementById('day-input').value);
  let text = '';
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
      text = 'Invalid day! Please enter a number from (0-6).';
  }
  output.innerText = text;
}
