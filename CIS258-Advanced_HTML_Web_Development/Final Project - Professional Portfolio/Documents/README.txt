//=====================================================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Final Project - Professional Portfolio
// File Name:   ReadMe.txt
// Live URL:    http://157.245.246.41:8014/FinalProject/Documents/ReadMe.txt
// Author:      Chris Grimm
// Date:        11/23/2026
//
// Description:
//   Documentation for the CIS-258 Advanced HTML Final Project explaining site navigation and where each
//   rubric requirement is implemented across the portfolio pages and stylesheets.
//=====================================================================================================================


***********************************************************************************************************************
**  SITE OVERVIEW & NAVIGATION                                                                                       **
***********************************************************************************************************************
  Portfolio showcasing skills, education, experience, projects, resume, and contact form.
  Where to find:
  - Top sticky navigation bar across home.html, skills.html, education.html, experience.html, projects.html, and
    contactme.html linking to Home, Skills, Education, Experience, Projects, Resume, Read Me, and Contact Me.


***********************************************************************************************************************
**  1. FRAMEWORK IMPLEMENTATION (20 POINTS)                                                                          **
***********************************************************************************************************************
  Uses Bootstrap 5 alongside custom.css for navbar, cards, grids, buttons, and form controls.
  Where to find:
  - Bootstrap 5 CDN and custom.css linked in the <head> of home.html, skills.html, education.html,
    experience.html, projects.html, and contactme.html.


***********************************************************************************************************************
**  2. CSS NTH SELECTORS (10 POINTS)                                                                                 **
***********************************************************************************************************************
  Uses :nth-child selectors to alternate row shading and style alternating project list items.
  Where to find:
  - custom.css: .skills-list li:nth-child(odd) and .skills-list li:nth-child(even) on skills.html.
  - custom.css: .project-links li:nth-child(even) span on projects.html.


***********************************************************************************************************************
**  3. CONTENT, NAVIGATION, AND ORGANIZATION (10 POINTS)                                                               **
***********************************************************************************************************************
  Organizes portfolio content into clear pages with consistent navigation and active-page indicators.
  Where to find:
  - Shared <nav> bar across all HTML pages with active link styling and aria-current="page".


***********************************************************************************************************************
**  4. VISUAL DESIGN AND CONSISTENCY (20 POINTS)                                                                     **
***********************************************************************************************************************
  Maintains a consistent header gradient, dark navigation/footer bars, card styling, and typography.
  Where to find:
  - custom.css and page templates across home.html, skills.html, education.html, experience.html, projects.html,
    and contactme.html.


***********************************************************************************************************************
**  5. MULTI-COLUMN LAYOUTS (35 POINTS)                                                                              **
***********************************************************************************************************************
  Uses responsive multi-column grids across multiple pages without using HTML layout tables.
  Where to find:
  - home.html: Two-column intro/photo row (col-md-8 / col-md-4) and two-column video/canvas row (col-lg-6).
  - skills.html: Two-column skills list and diagram layout (col-lg-7 / col-lg-5).
  - education.html & experience.html: Two-column card layouts (col-md-3 / col-md-9).
  - projects.html: Three-column project card grid (row-cols-md-3).
  - contactme.html: Multi-column form rows (col-md-6, col-md-4, row-cols-md-4).


***********************************************************************************************************************
**  6. CSS COLOR GRADIENT (10 POINTS)                                                                                **
***********************************************************************************************************************
  Applies a linear-gradient background to the page header banner.
  Where to find:
  - custom.css: .hero-gradient applied to <header> on home.html, skills.html, education.html, experience.html,
    projects.html, and contactme.html.


***********************************************************************************************************************
**  7. HTML CANVAS (25 POINTS)                                                                                       **
***********************************************************************************************************************
  Implements an interactive <canvas> element with dynamic drawing and mouse interaction.
  Where to find:
  - home.html: <canvas id="portfolioCanvas"> inside .canvas-wrapper, controlled by JavaScript/canvas.js.


***********************************************************************************************************************
**  8. RESPONSIVE DESIGN (50 POINTS)                                                                                 **
***********************************************************************************************************************
  Adapts navigation, columns, media, and spacing across desktop, tablet, and mobile screens.
  Where to find:
  - Bootstrap responsive grid/navbar classes and custom.css across all pages.


***********************************************************************************************************************
**  9. HTML VALIDATION (50 POINTS)                                                                                   **
***********************************************************************************************************************
  Checked with the W3C Nu HTML Checker so all HTML pages pass without errors.
  Where to find:
  - All HTML pages in the project root (home.html, skills.html, education.html, experience.html, projects.html,
    contactme.html).


***********************************************************************************************************************
**  10. SERVER UPLOAD AND PROJECT DOCUMENTATION (40 POINTS)                                                            **
***********************************************************************************************************************
  Uploaded to the student web server and documented for rubric review.
  Where to find:
  - Live site under /FinalProject/ (http://157.245.246.41:8014/FinalProject/home.html) and this ReadMe.txt file.


***********************************************************************************************************************
**  11. CREATIVITY, ADDITIONAL FEATURES, AND GOING BEYOND THE BASICS (40 POINTS)                                      **
***********************************************************************************************************************
  Adds interactive canvas animation and client-side form validation beyond basic static HTML/CSS.
  Where to find:
  - home.html & JavaScript/canvas.js: Interactive node animation with requestAnimationFrame and pointer tracking.
  - contactme.html & JavaScript/validate.js: Form validation script.