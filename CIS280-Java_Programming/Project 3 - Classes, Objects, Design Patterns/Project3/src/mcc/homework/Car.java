/*
 * File: Car.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Abstract class representing cars, extending Vehicles and implementing car-specific behaviors.
*/

package mcc.homework;

interface CarInterface {
	void openSunroof();
	void playMusic(String song);
}

class Car extends Vehicle implements CarInterface {
	public Car(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	// @Overloading
	public Car(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year, _vin);
	}

	@Override
	void startEngine() {
		System.out.println("Car engine started.");
	}

	@Override
	public void openSunroof() {
		System.out.println("Sunroof opened.");
	}

	@Override
	public void playMusic(String song) {
		System.out.println("Playing music: " + song);
	}
}