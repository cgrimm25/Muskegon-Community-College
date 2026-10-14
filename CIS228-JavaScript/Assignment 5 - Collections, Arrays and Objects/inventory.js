/*
//==================================================================================
// Institution: Muskegon Community College
// Semester:    Fall 2026
// Course:      CIS-228-F01X JavaScript
// Instructor:  Clayton Corrello
// Project:     Assignment #5 - Convenience Store Inventory Manager
// File Name:   inventory.js
// Author:      Chris Grimm
// Date:        10/13/2026
//
// Description:
//   Inventory management script utilizing JavaScript Collections (array of objects)
//   to analyze convenience store stock using map, filter, and reduce operations.
//
// Input File:  None (In-memory collection)
// Output File: Browser Developer Tools Console (F12)
//==================================================================================
*/

// ============================================================================
// CREATE YOUR GROCERY ITEMS COLLECTION 
// ============================================================================
const groceryItems = [
  { id: 1, name: "Bottled Water", category: "beverages", price: 1.49, inStock: true, quantity: 24 },
  { id: 2, name: "Potato Chips", category: "snacks", price: 2.99, inStock: true, quantity: 12 },
  { id: 3, name: "Chocolate Bar", category: "snacks", price: 1.79, inStock: true, quantity: 30 },
  { id: 4, name: "Whole Milk", category: "dairy", price: 3.99, inStock: true, quantity: 8 },
  { id: 5, name: "White Bread", category: "bakery", price: 2.49, inStock: false, quantity: 0 },
  { id: 6, name: "Canned Soup", category: "canned", price: 1.99, inStock: true, quantity: 15 },
  { id: 7, name: "Frozen Pizza", category: "frozen", price: 6.99, inStock: true, quantity: 6 },
  { id: 8, name: "Energy Drink", category: "beverages", price: 3.49, inStock: true, quantity: 10 },
  { id: 9, name: "Yogurt", category: "dairy", price: 1.29, inStock: true, quantity: 20 },
  { id: 10, name: "Gum Pack", category: "snacks", price: 0.99, inStock: true, quantity: 3 } // quantity < 5 for low stock test
];

// ============================================================================
// MAP OPERATIONS
// ============================================================================
// Extract All Item Names: Create an array containing only the names of all grocery items
const itemNames = groceryItems.map(item => item.name);

// Create Price Tags: Create an array of formatted strings like "$2.99 - Milk"
const priceTags = groceryItems.map(item => `$${item.price.toFixed(2)} - ${item.name}`);

// Calculate total Value Per Item: Create an array of objects with name and totalValue (price × quantity)
const itemTotalValues = groceryItems.map(item => ({
  name: item.name,
  totalValue: item.price * item.quantity
}));

// ============================================================================
// FILTER OPERATIONS
// ============================================================================
// Boolean property:
// In-stock items only: Filter to show only items where inStock is true
const inStockItems = groceryItems.filter(item => item.inStock);

// String Comparison:
// Items by category: Filter items belonging to a specific category (e.g., “beverages”)
const beverages = groceryItems.filter(item => item.category === "beverages");

// Numeric comparison:
// Low stock items: Filter items with quantity less than 5
const lowStockItems = groceryItems.filter(item => item.quantity < 5);

// Expensive items: Filter items with price greater than $5.00
const expensiveItems = groceryItems.filter(item => item.price > 5.00);

// ============================================================================
// REDUCE OPERATIONS
// ============================================================================
// Total Inventory Value: Calculate the sum of (price × quantity) for all items
const totalInventoryValue = groceryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Total Value By Category: Calculate total inventory value for a specific category (e.g., "beverages")
const beveragesTotalValue = groceryItems.filter(item => item.category === "beverages").reduce((sum, item) => sum +
   (item.price * item.quantity), 0);

// Count Of In-Stock Items: Count how many items are currently in stock
const inStockCount = groceryItems.reduce((count, item) => count + (item.inStock ? 1 : 0), 0);
  
// Average price: Calculate the average price of all items
const averagePrice = groceryItems.reduce((sum, item) => sum + item.price, 0) / groceryItems.length;

// ============================================================================
// BONUS CHALLENGE: Most expensive item per category
// ============================================================================
const mostExpensivePerCategory = groceryItems.reduce((acc, item) => {
  // If the category isn't tracked yet, or this item costs more than the saved one:
  if (!acc[item.category] || item.price > acc[item.category].price) {
    acc[item.category] = item;
  }
  return acc;
}, {});

// ============================================================================
// DISPLAY RESULTS
// ============================================================================
console.log("=== CONVENIENCE STORE INVENTORY REPORT ===");

console.log("\nMAP OPERATIONS");
console.log("All Item Names:", itemNames);
console.log("Price Tags:", priceTags);
console.log("Item Total Values:", itemTotalValues);

console.log("\nFILTER OPERATIONS");
console.log("In-Stock Items:", inStockItems);
console.log("Beverages:", beverages);
console.log("Low Stock Items (<5):", lowStockItems);
console.log("Expensive Items (> $5):", expensiveItems);

console.log("\nREDUCE OPERATIONS");
console.log(`Total Inventory Value: $${totalInventoryValue.toFixed(2)}`);
console.log(`Beverages Total Value: $${beveragesTotalValue.toFixed(2)}`);
console.log(`In-Stock Item Count: ${inStockCount}`);
console.log(`Average Price: $${averagePrice.toFixed(2)}`);

console.log("\nBONUS CHALLENGE - MOST EXPENSIVE ITEM PER CATEGORY");
console.log(mostExpensivePerCategory);