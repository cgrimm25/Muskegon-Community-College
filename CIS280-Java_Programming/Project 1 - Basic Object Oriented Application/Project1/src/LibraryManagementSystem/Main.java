/*
 * File: Main.java
 * Author: Chris Grimm
 * Date: 10/8/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 1 - Basic Object Oriented Application
 * Description: Main procedure of the Library Management System
 *   that drives the process. This system keeps tracks of books and members,
 *   allowing the library members to borrow and return books.
*/

package LibraryManagementSystem;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		// Initialize the Scanner
		Scanner scanner = new Scanner(System.in);

		//***********************//
		//*  Pre-Populate Data  *//
		//***********************//

		// Library
		Library library = new Library();

		// Librarian
		Librarian librarian = new Librarian(1, 3, "Mary Swason");

		// Books
		int bookID = 0;
		String bookName = "";
		String authorName = "";
		Book book1 = new Book(library.getNextBookID(), "Don Quixote", "Miguel de Cervantes");
		Book book2 = new Book(library.getNextBookID(), "1984", "George Orwell");
		library.addBook(book1);
		library.addBook(book2);

		// Members
		int memberID = 0;
		Member member1 = new Member(library.getNextMemberID(), "Andrew Smith");
		Member member2 = new Member(library.getNextMemberID(), "Tom Johnson");
		library.addMember(member1);
		library.addMember(member2);

		System.out.println(); // prints blank line for spacing

		// Simple command-line interaction
		while (true) {

			// Program Title
			System.out.println("Welcome to the Library Management System!\n");
			System.out.println("Menu:");
			System.out.println("1. View available books");
			System.out.println("2. Borrow a book");
			System.out.println("3. Return a book");
			System.out.println("4. Add a book");
			System.out.println("5. Remove a book");
			System.out.println("6. Exit");

			System.out.print("\nPlease select a choice from the menu. ");
			int choice = scanner.nextInt();

			switch (choice) {

			// View Available Books
			case 1:
				System.out.println();
				library.getAvailableBooks();
				break;

			// Borrow A Book (Self Checkout)
			case 2:
				System.out.print("\nEnter memberID: ");
				memberID = scanner.nextInt();
				Member borrowingMember = library.getMember(memberID);
				System.out.print("\nEnter the bookID of the book you wish to borrow: ");
				bookID = scanner.nextInt();
				Book borrowbook = library.getBook(bookID);
				System.out.println();
				borrowingMember.borrowBook(borrowbook);
				System.out.println();
				break;

			// Return A Book (Self Return)
			case 3:
				System.out.print("\nEnter memberID: ");
				memberID = scanner.nextInt();
				Member returningMember = library.getMember(memberID);
				System.out.println();
				returningMember.returnBook();
				System.out.println();
				break;

			// Add a book by librarian
			case 4:
				System.out.print("\nEnter the title of the book to add: ");
				scanner.nextLine();
				bookName = scanner.nextLine();
				System.out.print("\nEnter the author of the book to add: ");
				authorName = scanner.nextLine();
				Book newbook = new Book(library.getNextBookID(), bookName, authorName);
				System.out.println();
				librarian.addBookToLibrary(newbook, library);
				System.out.println();
				break;

			// Remove a book by librarian
			case 5:
				System.out.print("\nEnter the bookID of the book you wish to remove: ");
				bookID = scanner.nextInt();
				Book removingbook = library.getBook(bookID);
				System.out.println();
				Librarian.removeBookFromLibrary(removingbook, library);
				System.out.println();
				break;

	        // Exit
			case 6:
				System.out.println("\nThank you for using the Library Management System. Have a nice day!");
				scanner.close();
				System.exit(0);

			default:
				System.out.println("\nInvalid choice!\n");
				break;
			}
		}
	}
}
