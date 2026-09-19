/*
 * File: Sedan.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Concrete subclass of Car representing sedan-specific properties and implementations.
*/

package mcc.homework;

class Sedan extends Car {
	public Sedan(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	// @Overloading
	public Sedan(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year, _vin);
	}
}