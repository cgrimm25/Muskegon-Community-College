**Assignment Goal:**
Students must build a "Personal Portfolio Landing Page" that uses the provided structure and successfully implements three core tasks using jQuery:
1.  **Responsiveness:** Use Bootstrap's grid system correctly.
2.  **Interactivity (Task 2):** On clicking a "Learn More" button, the corresponding hidden content must expand/reveal using jQuery animations.
3.  **Form Validation (Task 3):** When the "Submit" button is clicked, the script must validate the email field. If empty, it must display a specific error message and prevent the form submission.

**Setup Instructions:**
1.  Create a project folder (e.g., `student-assignment`).
2.  Create three files inside this folder: `index.html`, `style.css`, and `starter.js`.
3.  Copy and paste the content into the respective files.
4.  The students will complete the required logic in `starter.js`.

### 💡 Hints Guide for Implementation 
This guide details the concepts students should research and implement in `starter.js`.

**1. Task 2: Feature Card Interactivity (jQuery Hints)**
*   **Concept:** Event Delegation and DOM Manipulation.
*   **Goal:** Make the hidden content appear when the button is clicked.
*   **Key jQuery Methods to Use:**
    *   `$(document).ready()`: To ensure the code runs only after the page loads.
    *   `.on('click', selector, function)`: To handle click events efficiently.
    *   `.closest()`: To reliably find the parent card container relative to the button that was clicked.
    *   `.find()`: To locate the specific hidden content div within the parent card.
    *   `.slideToggle()` or `.slideDown()`: To reveal the content with a smooth animation.

**2. Task 3: Contact Form Validation (jQuery/JS Hints)**
*   **Concept:** Form Submission Handling and Input Validation.
*   **Goal:** Stop the form submission and show an error if the email is missing.
*   **Key JavaScript/jQuery Methods to Use:**
    *   `$(selector).on('submit', function(event) { ... })`: To intercept the form submission event.
    *   `event.preventDefault()`: **CRITICAL STEP**. This line must be the first action to stop the browser from submitting the form normally.
    *   `.val()`: To retrieve the current value of an input field (e.g., `$('#emailInput').val()`).
    *   `if/else` statements: To check if the value is empty (`=== ''`).
    *   DOM Insertion: To inject the error message text into the designated error container (`#emailError`).

---

**Code Sample**:

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Crucial for responsiveness -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portfolio Assignment</title>
    
    <!-- Bootstrap CSS CDN (REQUIRED) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="bg-light">

    <!-- Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="#">Student Portfolio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- 1. Hero Section (Task 1 Focus) -->
    <section id="home" class="p-5 text-center hero-section my-5">
        <div class="container">
            <h1 class="display-3 fw-bold">Hi, I'm a Web Developer Student</h1>
            <p class="lead mb-4">Learning modern development using Bootstrap and mastering JavaScript!</p>
            <button class="btn btn-primary btn-lg" id="start-btn">View My Projects</button>
        </div>
    </section>

    <!-- 2. Features Section (Task 2 Focus) -->
    <section id="features" class="container my-5">
        <h2 class="text-center mb-5">My Core Skills</h2>
        <div class="row g-4">
            
            <!-- Feature Card 1 -->
            <div class="col-md-4">
                <div class="card h-100 p-4 shadow-sm">
                    <h5 class="card-title">HTML & Bootstrap</h5>
                    <p class="card-text">Building responsive layouts using the grid system.</p>
                    <button class="btn btn-outline-primary learn-more-btn w-100">Learn More</button>
                    <!-- Hidden content for Task 2 -->
                    <div class="hidden-content mt-3 p-2 border bg-light">
                        <small>Bootstrap ensures the site looks good on phones, tablets, and desktops.</small>
                    </div>
                </div>
            </div>

            <!-- Feature Card 2 -->
            <div class="col-md-4">
                <div class="card h-100 p-4 shadow-sm">
                    <h5 class="card-title">JavaScript (jQuery)</h5>
                    <p class="card-text">Implementing interactive elements, event handling, and DOM manipulation.</p>
                    <button class="btn btn-outline-primary learn-more-btn w-100">Learn More</button>
                    <!-- Hidden content for Task 2 -->
                    <div class="hidden-content mt-3 p-2 border bg-light">
                        <small>jQuery simplifies complex JS tasks like DOM traversal and event binding.</small>
                    </div>
                </div>
            </div>

            <!-- Feature Card 3 -->
            <div class="col-md-4">
                <div class="card h-100 p-4 shadow-sm">
                    <h5 class="card-title">CSS & Styling</h5>
                    <p class="card-text">Using custom CSS to fine-tune the look and feel.</p>
                    <button class="btn btn-outline-primary learn-more-btn w-100">Learn More</button>
                    <!-- Hidden content for Task 2 -->
                    <div class="hidden-content mt-3 p-2 border bg-light">
                        <small>CSS controls the aesthetics, making the site visually appealing and polished.</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. Contact Section (Task 3 Focus) -->
    <section id="contact" class="py-5">
        <div class="container">
            <h2 class="text-center mb-4">Get In Touch</h2>
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <form id="contactForm">
                        <div class="mb-3">
                            <label for="nameInput" class="form-label">Name</label>
                            <input type="text" class="form-control" id="nameInput" required>
                        </div>
                        <div class="mb-3">
                            <label for="emailInput" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="emailInput" required>
                            <!-- Placeholder for validation message -->
                            <div class="error-message text-danger" id="emailError"></div>
                        </div>
                        <button type="submit" class="btn btn-success w-100">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>


    <!-- Bootstrap JS Bundle (MUST be loaded after jQuery) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery CDN (REQUIRED) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- Custom Script (STUDENT WORK GOES HERE) -->
    <script src="starter.js"></script>

</body >
</html>
```

### `style.css`
```css
/* Custom CSS Styling for the Portfolio */

/* Styles for the Hero Section */
.hero-section {
    background-color: #eef7ff; /* Light blue background */
    border-radius: 0 0 30px 30px; /* Rounded bottom corners */
}

/* Styling for the hidden content area */
.hidden-content {
    background-color: #fff3cd; /* Light yellow background for emphasis */
    border-color: #ffc107;
    cursor: pointer;
    transition: all 0.3s;
}

/* Styling for the error message area */
.error-message {
    font-size: 0.9rem;
    margin-top: 0.2rem;
}
```

### `starter.js`
```javascript
/**
 * starter.js
 * 
 * ====================================================================
 * STUDENT TASK AREA
 * 
 * COMPLETE THE FOLLOWING TASKS using jQuery:
 * 
 * 1. Feature Card Expansion: When a 'Learn More' button is clicked, 
 *    the associated hidden content div must smoothly reveal itself.
 * 
 * 2. Form Validation: When the contact form is submitted, the script must:
 *    a) Prevent the default form submission behavior.
 *    b) Check if the email input is empty.
 *    c) If empty, display an error message and prevent submission.
 *    d) If valid, show a success message and clear the form.
 * 
 * Remember to wrap all code in $(document).ready(function() { ... });
 * ====================================================================
 */

$(document).ready(function() {
    // START YOUR CODE HERE
});
```