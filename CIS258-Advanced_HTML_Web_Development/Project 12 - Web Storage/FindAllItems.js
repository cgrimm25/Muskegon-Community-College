/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-258-F02X Advanced HTML Web Development
// Instructor:  Christopher VanOosterhout
// Project:     Project #12 - Saving and Displaying Data with Web Storage
// File Name:   FindAllItems.js
// Live URL:    http://157.245.246.41:8014/Chapter10/FindAllItems.js
// Author:      Chris Grimm
// Date:        11/09/2026
//
// Description:
//   Retrieves and prints all items from localStorage to the DOM.
//==================================================================================
*/

function findAllItems() {
  var itemList = document.getElementById("itemList");
  itemList.innerHTML = "";

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var item = localStorage.getItem(key);

    var newItem = document.createElement("li");
    newItem.innerHTML = key + ": " + item;
    itemList.appendChild(newItem);
  }
}