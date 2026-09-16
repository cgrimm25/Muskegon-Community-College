/*
 * File: Librarian.java
 * Author: Chris Grimm
 * Date: 10/8/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 1 - Basic Object Oriented Application
 * Description: Librarian class for the library's librarian.
 *   
*/
package LibraryManagementSystem;

public class Librarian extends Member {

	private int employeeID = 0;

	public Librarian(int _employeeID, int _memberID, String _name) {
		super(_memberID, _name);
		this.employeeID = _employeeID;

		System.out.println("Librarian added sucessfully! Employee ID: "  + employeeID);
	}

	public void addBookToLibrary(Book _book, Library _library) {
		if (_library != null) {
			_library.addBook(_book);
		} else {
			System.out.println("Library not found.");
		}

	}

	public static void removeBookFromLibrary(Book _book, Library _library) {
		if (_library != null) {
			_library.removeBook(_book);
		} else {
			System.out.println("Book not found in the library.");
		}
	}

	public void addMemberToLibrary(Member _member, Library _library) {
		if (_library != null) {
			_library.addMember(_member);
			System.out.println("Member added.\n");
		} else {
			System.out.println("Library not found.");
		}

	}
	
	@Override
	public void getMemberInfo() {
	    super.getMemberInfo(); 
	    System.out.println("Employee ID: " + this.employeeID);
	}

}
