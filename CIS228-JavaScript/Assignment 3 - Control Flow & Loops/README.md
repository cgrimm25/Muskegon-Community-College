# Assignment: Dynamic Input for Control Flows and Loops

## Objective
Modify the starter application to accept dynamic user input instead of using hardcoded values. This assignment focuses on two core JavaScript concepts:
1. **If-Else Statements** — Accept a number input and determine if it is positive, negative, or zero.
2. **Switch Statements** — Accept a day number (0–6) and output the corresponding day name.

---

## Step 1: Project Files Setup

Create the following files in your project directory:
- `dynamic_input.html` — HTML structure containing input controls, buttons, and display containers.
- `styles.css` — Layout styling, button formatting, and `.output` container presentation.
- `script.js` — JavaScript logic for handling dynamic input and conditional flow.

Ensure `dynamic_input.html` links to both `styles.css` and `script.js`.

---

## Step 2: Implement the HTML Structure

In `dynamic_input.html`, build two `<section>` elements within `<main>`:

1. **Section 1: If-Else (Positive or Negative Number)**
   - Input element: `<input type="number" id="num-input" placeholder="Enter a number">`
   - Trigger button: `<button onclick="runIfElse()">Run</button>`
   - Output container: `<div id="if-else-output" class="output"></div>`

2. **Section 2: Switch (Day of the Week)**
   - Input element: `<input type="number" id="day-input" placeholder="Enter day (0-6)">`
   - Trigger button: `<button onclick="runSwitch()">Run</button>`
   - Output container: `<div id="switch-output" class="output"></div>`

---

## Step 3: Implement the JavaScript Functions

Open `script.js` and implement the logic for each function using dynamic values read from the DOM:

### 1. `runIfElse()`
- Read the input value using `document.getElementById('num-input').value`.
- Convert the value into a numeric type using `Number()`.
- Validate the value and set the inner text of `#if-else-output`:
  - If input is not a number: display `"Please enter a valid number."`
  - If number > 0: display `"The number X is positive."`
  - If number < 0: display `"The number X is negative."`
  - If number === 0: display `"The number is zero."`

### 2. `runSwitch()`
- Read the input value from `#day-input` and convert it with `Number()`.
- Use a `switch` statement to map numbers `0` through `6` to day names:
  - `0` → Sunday
  - `1` → Monday
  - `2` → Tuesday
  - `3` → Wednesday
  - `4` → Thursday
  - `5` → Friday
  - `6` → Saturday
- Provide a `default` case to handle numbers outside `0–6` or invalid entries:
  - Display `"Invalid day."` (or `"Invalid day! Please enter a number from (0-6)."`)
- Display the resulting message in `#switch-output`.

---

## Hints & Tips

### Selecting Input Values
Use `document.getElementById('input-id').value` to read values from an `<input>` element. Because input values are always retrieved as strings, convert them using `Number()`:
```javascript
const num = Number(document.getElementById('num-input').value);