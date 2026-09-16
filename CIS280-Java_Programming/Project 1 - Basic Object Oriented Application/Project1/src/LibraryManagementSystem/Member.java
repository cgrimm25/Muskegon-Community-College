/*
 * File: Member.java
 * Author: Chris Grimm
 * Date: 10/8/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 1 - Basic Object Oriented Application
 * Description: Member class for the library members.
*/
package LibraryManagementSystem;

public class Member {

	private int memberID = 0;
	private String name = "";
	private Book borrowedBook = null;

	public Member(int _memberID, String _name) {
		this.memberID = _memberID;
		this.name = _name;

	}

	public void borrowBook(Book _book) {
		if (_book.getIsAvailable()) {
			_book.borrowBook();
			this.borrowedBook = _book;
			System.out.println("The book was borrowed.");
		} else {
			System.out.println("The book is not available.");
		}
	}

	public void returnBook() {
		if (this.borrowedBook != null) {
			this.borrowedBook.returnBook();
			this.borrowedBook = null;
			System.out.println("The book was returned.");
		} else {
			System.out.println("No book was borrowed.");
		}
	}

	public void getMemberInfo() {

		System.out.println("Member ID: " + this.memberID + "\n" + "Name: " + this.name);

		if (this.borrowedBook != null) {
			System.out.println("Book: ");
			this.borrowedBook.getDetails();
		} else {
			System.out.println(", Book: None");
		}

	}

	public int getMemberID() {

		return this.memberID;
	}

}
