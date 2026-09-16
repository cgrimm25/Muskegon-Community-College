/*
 * File: Library.java
 * Author: Chris Grimm
 * Date: 10/8/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 1 - Basic Object Oriented Application
 * Description: Library class for establishing a library
 *   so librarians, members, and books can be added to it.
*/
package LibraryManagementSystem;

import java.util.ArrayList;

public class Library {

	private ArrayList<Book> books;
	private ArrayList<Member> members;
	private int nextBookID = 0;
	private int nextMemberID = 0;

	public Library() {
		books = new ArrayList<Book>();
		members = new ArrayList<Member>();

		System.out.println("Library established.");

	}

	public void addBook(Book _book) {
		this.books.add(_book);
		System.out.println("Book added sucessfully! Book ID: " + _book.getBookID());

	}
	
	//Overload
	public void addBook(String title, String author) {
		Book newBook = new Book(this.getNextBookID(), title, author);
	    this.books.add(newBook);
	    System.out.println("Book added successfully! Book ID: " + newBook.getBookID());
	}

	public void removeBook(Book _book) {
		this.books.remove(_book);
		System.out.println("Book removed sucessfully! Book ID: " + _book.getBookID());
	}

	public void getAvailableBooks() {

		if (books.size() == 0) {
			System.out.println("No books are available.\n");
			return;
		}

		for (Book book : this.books) {

			if (book.getIsAvailable()) {
				book.getDetails();
				System.out.println();
			}
		}

	}

	public void addMember(Member _member) {

		this.members.add(_member);

		System.out.println("Member added sucessfully! Member ID: " + _member.getMemberID());

	}

	public int getNextBookID() {

		this.nextBookID++;

		return nextBookID;
	}

	public int getNextMemberID() {

		this.nextMemberID++;

		return nextMemberID;
	}

	public Book getBook(int _bookID) {
		for (Book book : this.books) {
			if (book.getBookID() == _bookID) {
				return book;
			}
		}
		return null; // or throw an exception if the book is not found
	}

	public Member getMember(int _memberID) {
		for (Member member : this.members) {
			if (member.getMemberID() == _memberID) {
				return member;
			}
		}
		return null; // or throw an exception if the book is not found
	}

}
