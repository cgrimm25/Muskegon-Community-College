/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228 JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #7 - Advanced DOM Event Handling Lab
// File Name:   assignment.js
// Author:      Chris Grimm
// Date:        11/07/2026
//
// Description:
//   Core client-side script implementing advanced event handling patterns:
//   debouncing for search inputs, event delegation for feature cards, and unified 
//   pointer events coupled with custom event dispatching for swipe interactions.
//
// Input File:  User input from #feature-search, pointer events on #drag-handle and clicks
// Output File: DOM node mutations (#log-list) and Console logs
//==================================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("--- Assignment Started ---");

  // ==========================================
  // TODO 1: Implement Debouncing for the search feature.
  // ==========================================
  const searchInput = document.getElementById("feature-search");

  // Implement debounce utility function here
  function debounce(func, delay) {
    let timeout;
    return function (e) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(e), delay);
    };
  }

  function searchHandler(e) {
    const query = e.target.value;
    console.log(`Searched: ${query}`);

    const li = document.createElement("li");
    li.textContent = `Searched: ${query}`;
    document.getElementById("log-list").appendChild(li);
  }

  searchInput.addEventListener("input", debounce(searchHandler, 300));

  // ==========================================
  // TODO 2: Implement Event Delegation for the feature cards.
  // ==========================================
  const cardContainer = document.getElementById("feature-cards");

  // Attach a single listener to the parent container
  cardContainer.addEventListener("click", (e) => {
    // 1. Check if the clicked element or its parent is a button.
    if (e.target.closest(".card-button")) {
      // 2. Use e.target or e.closest() to identify the feature card.
      const card = e.target.closest(".feature-card");

      // 3. Extract the data-feature attribute.
      const featureId = card.dataset.feature;

      // 4. Log the result to the console and update the UI log.
      console.log(`Feature selected: ${featureId}`);
      const li = document.createElement("li");
      li.textContent = `Feature selected: ${featureId}`;
      document.getElementById("log-list").appendChild(li);
    }
  });

  // ==========================================
  // TODO 3: Implement Pointer/Drag Interaction (Custom Events).
  // ==========================================
  const handle = document.getElementById("drag-handle");
  const logList = document.getElementById("log-list");

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  // Start pointer monitoring on the handle
  handle.addEventListener("pointerdown", (e) => {
    // Prevent default browser drag behavior
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    e.target.setPointerCapture(e.pointerId);
    console.log("Pointer Down: Dragging started.");
  });

  // Track movement and dispatch a custom event
  handle.addEventListener("pointermove", (e) => {
    if (isDragging) {
      // Dispatch a custom event that carries data about the drag (e.g., direction)
      // The event should bubble up to the document or a parent listener.
      const moveEvent = new CustomEvent("swipeMove", {
        detail: { moving: true },
        bubbles: true,
      });
      e.target.dispatchEvent(moveEvent);
    }
  });

  // End pointer monitoring
  handle.addEventListener("pointerup", (e) => {
    if (isDragging) {
      // Dispatch a final custom event to signal completion.
      // This event should trigger the final result log.
      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;
      let direction = "none";

      if (Math.abs(diffX) > Math.abs(diffY)) {
        direction = diffX > 0 ? "right" : "left";
      } else {
        direction = diffY > 0 ? "down" : "up";
      }

      const endEvent = new CustomEvent("swipe", {
        detail: { direction: direction },
        bubbles: true,
      });
      e.target.dispatchEvent(endEvent);
    }
    isDragging = false;
  });

  // Listen on the document for the custom 'swipe' event
  document.addEventListener("swipe", (e) => {
    const li = document.createElement("li");
    li.textContent = `Swipe finished: ${e.detail.direction}`;
    logList.appendChild(li);
  });
});
