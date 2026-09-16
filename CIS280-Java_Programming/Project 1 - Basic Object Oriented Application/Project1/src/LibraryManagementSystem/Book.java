/*
 * File: Book.java
 * Author: Chris Grimm
 * Date: 10/8/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 1 - Basic Object Oriented Application
 * Description: Book class for the library's books.
*/
package LibraryManagementSystem;

public class Book {

	private int bookID = 0;
	private String title = "";
	private String author = "";
	private boolean isAvailable = true;

	public Book(int _bookid, String _title, String _author) {
		this.bookID = _bookid;
		this.title = _title;
		this.author = _author;

	}

	public void getDetails() {
		System.out.println("BookID: " + this.bookID + "\n" + 
	                       "Title: " + this.title + "\n" + 
				           "Author: " + this.author);

	}

	public void borrowBook() {

		this.isAvailable = false;
	}

	public void returnBook() {

		this.isAvailable = true;
	}

	public boolean getIsAvailable() {

		return this.isAvailable;
	}

	public int getBookID() {

		return this.bookID;
	}

}
