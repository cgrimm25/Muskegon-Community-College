/*
 * File: SailBoat.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Concrete subclass of Boat representing sailboat dynamics and sail operations.
*/

package mcc.homework;

class SailBoat extends Boat {
	public SailBoat(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year, _vin);
	}

	// @Overloading
	public SailBoat(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	@Override
	void startEngine() {
		System.out.println("Trolling motor started.");
	}

	@Override
	public void cabinLight() {
		System.out.println("Cabin light tunred on.");
	}

	public void lowerSails() {
		System.out.println("Sails lowered.");
	}

	public void raiseSails() {
		System.out.println("Sails raised.");
	}
}
