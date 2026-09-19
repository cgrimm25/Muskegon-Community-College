/*
 * File: Boat.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Class representing boats, extending Vehicles and implementing marine navigation methods.
*/

package mcc.homework;

interface BoatInterface {
	void cabinLight();
	void playMusic(String _song);
}

class Boat extends Vehicle implements BoatInterface {
	public Boat(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year);
	}

	// @Overloading
	public Boat(String _make, String _model, int _year) {
		super(_make, _model, _year);

	}

	@Override
	void startEngine() {
		System.out.println("Boat engine started.");
	}

	@Override
	public void cabinLight() {
		System.out.println("Cabin light tunred on.");
	}

	@Override
	public void playMusic(String _song) {
		System.out.println("Playing music: " + _song);
	}
}
