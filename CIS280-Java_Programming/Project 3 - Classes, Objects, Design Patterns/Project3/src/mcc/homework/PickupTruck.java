/*
 * File: PickupTruck.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Concrete subclass of Truck representing pickup-specific hauling and bed characteristics
*/

package mcc.homework;

class PickupTruck extends Truck {
	public PickupTruck(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	// @Overloading
	public PickupTruck(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year, _vin);
	}

}