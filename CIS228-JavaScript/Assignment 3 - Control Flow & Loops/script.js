/*
  Filename: script.js
  Institution: Muskegon Community College
  Semester: Fall 2026
  CIS-228-F01X JavaScript
  Assignment 3 Control Flow and Looping
  Author: Chris Grimm
  Date: 9/19/26
  Description: JavaScript for dynamic_input.html. Provides validaiton
    for input boxes ensuring the numbers entered are valid and letting the user know
    if their number is positive, negative or zero; or their number corresponds to a specific day of the week.
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
