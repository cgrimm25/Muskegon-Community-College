/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Demonstration of Collections, Arrays and Objects
// File Name:   script.js
// Author:      Clayton Corrello (Adapted by Chris Grimm)
// Date:        10/08/2026
//
// Description:
//   Demonstrates core JavaScript data structures including object methods, array 
//   transformations (map, filter, reduce), and operations over an array of objects.
//
// Input File:  None
// Output File: Preformatted Text Injections to DOM (<pre> elements)
//==================================================================================
*/

//
// 1. Object Example
//
// A simple "user" object with properties and a method.
const user = {
  firstName: "Alice",
  lastName: "Johnson",
  age: 30,
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  }
};

// Display the object and its method result in the HTML.
const objectOutput = document.getElementById("object-output");
objectOutput.textContent = `User object:
- firstName: ${user.firstName}
- lastName: ${user.lastName}
- age: ${user.age}
- fullName(): ${user.fullName()}`;

//
// 2. Array Example
//
// An array of numbers, with common array methods used to transform it.
const numbers = [12, 4, 57, 23, 9, 71];

// Map: square each number
const squared = numbers.map(n => n * n);

// Filter: keep only even numbers
const evens = numbers.filter(n => n % 2 === 0);

// Reduce: sum all numbers
const total = numbers.reduce((acc, n) => acc + n, 0);

const arrayOutput = document.getElementById("array-output");
arrayOutput.textContent = `Original array: [${numbers.join(", ")}]
Squared (map): [${squared.join(", ")}]
Even numbers only (filter): [${evens.join(", ")}]
Sum of all numbers (reduce): ${total}`;

//
// 3. Collection Example (Array of Objects)
//
// A "collection" of product objects. This mimics a real-world data set.
const products = [
  { id: 1, name: "Laptop", price: 999, inStock: true },
  { id: 2, name: "Mouse", price: 25, inStock: false },
  { id: 3, name: "Keyboard", price: 75, inStock: true },
  { id: 4, name: "Monitor", price: 199, inStock: true }
];

// 3a) Access a specific item by index
const firstProduct = products[0];

// 3b) Map over the collection to get just the names
const productNames = products.map(p => p.name);

// 3c) Filter to only in-stock items
const inStockProducts = products.filter(p => p.inStock);

// 3d) Reduce to calculate total inventory value (price * quantity assumed 1)
const totalValue = products.reduce((sum, p) => sum + p.price, 0);

const collectionOutput = document.getElementById("collection-output");
collectionOutput.textContent = `Collection of products (array of objects):
• First product: ID = ${firstProduct.id}, Name = "${firstProduct.name}", Price = $${firstProduct.price}, 
   InStock = ${firstProduct.inStock}
• All product names: [${productNames.join(", ")}]
• In-stock products: [${inStockProducts.map(p => p.name).join(", ")}]
• Total value of all products (assuming qty=1): $${totalValue}`;

// ------------------------------------------------------------------
// Optional: a tiny demo of "adding" to the collection dynamically
// ------------------------------------------------------------------

products.push({ id: 5, name: "Webcam", price: 45, inStock: true });
console.log("Updated collection:", products);
