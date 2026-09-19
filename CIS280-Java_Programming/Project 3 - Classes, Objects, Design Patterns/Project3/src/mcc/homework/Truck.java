/*
 * File: Truck.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Abstract class representing trucks, extending Vehicles and implementing truck operations[cite: 3, 4]
*/

package mcc.homework;

interface TruckInterface {
	void loadCargo(int _weight);
	void tow(int _weight);
	void unloadCargo(int _weight);
}

class Truck extends Vehicle implements TruckInterface {

	protected int _vin;

	public Truck(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	// @Overloading
	public Truck(String make, String model, int year, int vin) {
		super(make, model, year, vin);

	}

	@Override
	void startEngine() {
		System.out.println("Truck engine started.");
	}

	@Override
	public void loadCargo(int _weight) {
		System.out.println("Loading " + _weight + " kg of cargo.");
	}

	@Override
	public void unloadCargo(int _weight) {
		System.out.println("Unloading cargo of " + _weight + " kg of cargo.");
	}

	@Override
	public void tow(int _weight) {
		System.out.println("Towing " + _weight + " kg.");
	}
}
