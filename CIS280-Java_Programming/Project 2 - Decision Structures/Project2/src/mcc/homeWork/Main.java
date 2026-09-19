/*
 * File: Main.java
 * Author: Chris Grimm
 * Date: 9/19/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 2 - Decision Structures
 * Description: Calls the class NumberRangeValidator which contains
 *   the primary logic for this project.
*/

package mcc.homeWork;

public class Main {

	public static void main(String[] args) {
		
		NumberRangeValidator nrv;
		nrv = new NumberRangeValidator();
		
		nrv.validateRange();
	}

}
