//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Final Project - Professional Portfolio
// File Name:   validate.js
// Live URL:    http://157.245.246.41:8014/FinalProject/JavaScript/validate.js
// Author:      Chris Grimm
// Date:        11/23/2026
//
// Description:
//   Satisfies Rubric Requirement 11 (Going Beyond the Basics) on contactme.html.
//   Client-side form validation and input formatting for contact details, service
//   selection, budget values, timeline dates, and required skill checkboxes.
//==================================================================================

// RUBRIC REQUIREMENT 11: Going Beyond the Basics (40 points)
// Main form submission handler orchestrating multi-step client-side validation.
function validateForm() {
  // Stop at first failed validation
  console.log("JavaScript file loaded");
  if (!validateContactInfo()) return false;
  if(!validateServiceRequested()) return false;
  if (!validateBudget()) return false;
  if (!validateTimelineDates()) return false;
  if (!validateSkills()) return false;

  return true; // All validations passed
}

// Validates required contact fields, email format, and 10-digit phone number
function validateContactInfo() {
  const companyorg = document.getElementById("companyorginput");
  const title = document.getElementById("titleinput");
  const fname = document.getElementById("fnameinput");
  const lname = document.getElementById("lnameinput");
  const email = document.getElementById("emailinput");
  const phone = document.getElementById("phoneinput");

  if (!companyorg.value.trim()) {
    alert("Please enter your company name or organization.");
    companyorg.focus();
    return false;
  }

  if (!title.value.trim()) {
    alert("Please enter your title.");
    title.focus();
    return false;
  }

  if (!fname.value.trim()) {
    alert("Please enter your first name.");
    fname.focus();
    return false;
  }

  if (!lname.value.trim()) {
    alert("Please enter your last name.");
    lname.focus();
    return false;
  }

  if (!email.value.trim()) {
    alert("Please enter your email address.");
    email.focus();
    return false;
  }

  // Basic email pattern validation
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email.value)) {
    alert("Please enter a valid email address.");
    email.focus();
    return false;
  }

  if (!phone.value.trim()) {
    alert("Please enter your phone number.");
    phone.focus();
    return false;
  }

  const cleanedPhone = phone.value.replace(/\D/g, ""); // Remove all non-digits
  if (cleanedPhone.length !== 10) {
    alert("Please enter a valid 10-digit phone number.");
    phone.focus();
    return false;
  }

  return true;
}

// Ensures a service option is selected
function validateServiceRequested() { 
  const services = document.getElementById("servicesoffered").value;
  if (services === "") {
    alert("Please select a service.");
    document.getElementById("servicesoffered").focus();
    return false;
  }

  return true;
}

// Validates positive numeric budget and selected rate period
function validateBudget() {
  
  const budgetInput = document.getElementById("budget");
  console.log("validateBudget called with:", budgetInput.value);
  const rawInput = budgetInput.value;
  const timerate = document.getElementById("timerate").value;
  // Strip dollar sign, commas, and whitespace
  const cleanedValue = rawInput.replace(/[$,]/g, "").trim();

  // Catch empty or bad number formats
  if (cleanedValue === "" || isNaN(cleanedValue) || Number(cleanedValue) <= 0) {
    alert("Please enter a valid numeric budget greater than 0.");
    budgetInput.focus();
    return false;
  }

  
  if (timerate === "") {
    alert("Please select a time rate (per).");
    document.getElementById("timerate").focus();
    return false;
  }

  return true;
}

// Validates start and end dates against today and chronological order
function validateTimelineDates() {
  const startMonth = document.getElementById("startmonth").value;
  const startDay = document.getElementById("startday").value;
  const startYear = document.getElementById("startyear").value;

  const endMonth = document.getElementById("endmonth").value;
  const endDay = document.getElementById("endday").value;
  const endYear = document.getElementById("endyear").value;

  const startDate = new Date(Number(startYear), Number(startMonth) - 1, Number(startDay));
  const endDate = new Date(Number(endYear), Number(endMonth) - 1, Number(endDay));
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time of day

  if (startDate < today) {
    alert("Start date cannot be in the past.");
    document.getElementById("startmonth").focus();
    return false;
  }

  if (endDate < today) {
    alert("End date cannot be in the past.");
    document.getElementById("endmonth").focus();
    return false;
  }

  if (endDate < startDate) {
    alert("End date must be after or the same as the start date.");
    document.getElementById("endmonth").focus();
    return false;
  }

  return true;
}

// Ensures at least one skill checkbox is selected
function validateSkills() {
  const checkboxes = document.querySelectorAll('input[name="skills"]');
  const oneChecked = Array.from(checkboxes).some((box) => box.checked);

  if (!oneChecked) {
    alert("Please select at least one skill under 'Skills Needed'.");
    checkboxes[0].focus();
    return false;
  }

  return true;
}

// RUBRIC REQUIREMENT 11: Initializes default dates and live phone/currency formatting
document.addEventListener("DOMContentLoaded", () => {

  // Default Start Date and End Date to tomorrow (current day + 1)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const year = String(tomorrow.getFullYear());

  document.getElementById("startmonth").value = month;
  document.getElementById("startday").value = day;
  document.getElementById("startyear").value = year;

  document.getElementById("endmonth").value = month;
  document.getElementById("endday").value = day;
  document.getElementById("endyear").value = year;

  const phoneInput = document.getElementById("phoneinput");

  phoneInput.addEventListener("input", (e) => {
    let numbers = e.target.value.replace(/\D/g, "");
    if (numbers.length > 10) numbers = numbers.slice(0, 10);

    let formatted = numbers;
    if (numbers.length > 6) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(
        3,
        6
      )}-${numbers.slice(6)}`;
    } else if (numbers.length > 3) {
      formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else if (numbers.length > 0) {
      formatted = `(${numbers}`;
    }

    phoneInput.value = formatted;
  });

  const budgetInput = document.getElementById("budget");

  budgetInput.addEventListener("input", (e) => {
    let input = e.target;
    let value = input.value;

    if (!value.match(/[\d.]/)) return;
  
    // Save cursor position
    const selectionStart = input.selectionStart;
  
    // Remove anything except digits and a single dot
    let cleaned = value.replace(/[^0-9.]/g, "");
  
    // Keep only the first dot
    const parts = cleaned.split(".");
    let dollars = parts[0];
    let cents = parts[1] || "";
    if (cents.length > 2) cents = cents.slice(0, 2);
  
    // Format dollars with commas
    let formattedDollars = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formatted = "$" + formattedDollars;
  
    if (value.includes(".")) {
      formatted += "." + cents;
    }
  
    // Update field and restore cursor position
    input.value = formatted;
  
    // Attempt to keep cursor near the same position
    const diff = formatted.length - value.length;
    input.setSelectionRange(selectionStart + diff, selectionStart + diff);
  });

  budgetInput.addEventListener("blur", () => {
    let raw = budgetInput.value.replace(/[^\d.]/g, "");
    if (!raw) {
      budgetInput.value = ""; // clear it completely
      return;
    }
  
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      budgetInput.value = num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    } else {
      budgetInput.value = ""; // fallback to truly empty if parse fails
    }
  });
});
