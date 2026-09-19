/*
 * File: Vehicles.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Base class defining shared attributes and core behaviors for all vehicles.
*/

package mcc.homework;

abstract class Vehicle {
	String make;
	String model;
	int year;
	int vin;

	public Vehicle(String _make, String _model, int _year) {
		this.make = _make;
		this.model = _model;
		this.year = _year;

	}

	// @Overloading
	public Vehicle(String _make, String _model, int _year, int _vin) {
		super();
		this.make = _make;
		this.model = _model;
		this.year = _year;
		this.vin = _vin;

	}

	abstract void startEngine();

	public int getVin() {
		return vin;
	}

}
