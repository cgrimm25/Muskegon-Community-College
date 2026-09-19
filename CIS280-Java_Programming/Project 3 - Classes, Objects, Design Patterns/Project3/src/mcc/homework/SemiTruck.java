/*
 * File: SemiTruck.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Concrete subclass of Truck representing commercial semi-truck transport operations.
*/

package mcc.homework;

class SemiTruck extends Truck {
	public SemiTruck(String _make, String _model, int _year) {
		super(_make, _model, _year);

	}

	public SemiTruck(String _make, String _model, int _year, int _vin) {
		super(_make, _model, _year, _vin);

	}

	@Override
	public void unloadCargo(int _weight) {

		if (_weight < 100) {
			System.out.println("Unable to unload from semi-truck with VIN: " + super.vin);
		} else {
			System.out.println("Unloading cargo from semi-truck with VIN: " + super.vin);
		}

	}

	@Override
	public void loadCargo(int _weight) {

		if (_weight > 100) {
			System.out.println("Unable to load cargo onto semi-truck with VIN: " + super.vin);
		} else
			System.out.println("Loading cargo onto semi-truck with VIN: " + super.vin);
	}

}
