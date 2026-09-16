# Library Management System

## Overview
This project is a Java Console Application that implements a simple Library Management System to keep track of books and members. It is designed to practice key Object-Oriented Programming (OOP) principles, including Encapsulation, Inheritance, Polymorphism, and Abstraction.

## Project Details
* **Author:** Chris Grimm
* **Institution:** Muskegon Community College
* **Course:** CIS-280 Java Programming
* **Project Name:** Project 1 - Basic Object Oriented Application
* **Date:** 10/8/24

## OOP Concepts Applied
* **Encapsulation:** Class attributes are private and accessed via public getters and setters.
* **Inheritance:** The `Librarian` class inherits from the `Member` class to add extra functionality for managing books.
* **Polymorphism:** Method overriding and method overloading are utilized for operations like adding or borrowing books.
* **Abstraction:** The underlying details of book borrowing and returning are abstracted into dedicated methods.

## Project Structure
The application consists of the following classes:
* **`Book.java`**: Manages individual book attributes, including the title, author, and availability status.
* **`Member.java`**: Handles library members and their ability to borrow and return books.
* **`Librarian.java`**: Extends the `Member` class and includes administrative methods to add and remove books from the library.
* **`Library.java`**: Serves as the core collection class, utilizing `ArrayLists` to store all books and members.
* **`Main.java`**: The driver class that runs the interactive command-line interface.

## Usage
The program was built using the Eclipse IDE. Upon execution, the system pre-populates with a librarian, two books ("Don Quixote" and "1984"), and two standard members. 

Users interact with the system via a numeric menu to perform the following actions:
1. View available books
2. Borrow a book (Self Checkout)
3. Return a book (Self Return)
4. Add a book (Librarian functionality)
5. Remove a book (Librarian functionality)
6. Exit the application