# LETTER GUESSING GAME - JAVASCRIPT LOGIC SEQUENCE

## Overview
This game demonstrates basic JavaScript control flow concepts for a CIS-228-F01X JavaScript course at Muskegon Community College. The game generates a random letter between A and Z and prompts the user to guess it.

## Logic Flow

1. **Initialization** (letters_game.html:97)
   - Generate random target letter: 
     letters[Math.floor(Math.random() * letters.length)]
   - Initialize guessCount = 0
   - Cache DOM elements: messageDiv, guessCountSpan, guessBtn, guessInput

2. **Event Setup** (letters_game.html:105)
   -Add click event listener to the “Submit Guess” button

3. **Per-Guess Processing** (on button click): 
   a. Get user input and convert to uppercase: guessInput.value.trim().toUpperCase()
   b. Validate input: If not a single letter A-Z, show error message and exit 
   b. If letter passes validation, increment guessCount and update display otherwise tell the user  to insert a letter
   d. **Compare guess to target*:      
      - If guess > targetLetter: Display “Too high (later in the alphabet)! Try again.”  (red        background)
      - If guess < targetLetter: Display “Too low (earlier in the alphabet)! Try again.'” (green   background)
      - If guess === targetLetter:
        - Display “Congratulations! You guessed the letter in X guesses!”
        - Turn message green with centered text
        - Disable the guess button & input box
   e. Clear input field and focus back on it

## Key JavaScript Concepts Demonstrated
- **Random letter generation within an array**: letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    letters[Math.floor(Math.random() * letters.length)]
- **Input normalization**: toUpperCase() for case-insensitive handling
- **Comparison operators**: >, <, ===
- **Conditional logic**: if / else if / else chain
- **DOM manipulation**: textContent, className, disabled
- **Event handling**: addEventListener('click', ...)
- **Variable tracking**: Counter variable (guessCount) persistence

## Student Takeaways
- How to generate a random letter within the A-Z range
- Structuring multi-branch conditional logic
- Updating the webpage dynamically without refresh
- Tracking state across multiple user interactions