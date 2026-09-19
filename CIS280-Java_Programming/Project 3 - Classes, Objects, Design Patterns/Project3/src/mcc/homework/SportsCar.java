/*
 * File: SportsCar.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Concrete subclass of Car representing sports car features and performance implementations.
*/
package mcc.homework;

class SportsCar extends Car {
	public SportsCar(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	// @Overloading
	public SportsCar(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year, _vin);
	}
}