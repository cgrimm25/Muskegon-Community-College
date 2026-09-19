/*
 * File: Submarine.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Concrete subclass of Boat modeling submersible operations, diving, and depth controls.
*/

package mcc.homework;

class Submarine extends Boat {
	private boolean isSubmerged = false;

	public Submarine(String _make, String _model, int _year) {
		super(_make, _model, _year);
	}

	@Override
	void startEngine() {
		System.out.println("Turbine started.");
	}

	@Override
	public void cabinLight() {
		System.out.println("Cabin light tunred on.");
	}

	public void dive() {
		if (isSubmerged) {
			System.out.println("The submarine has already dove.");
		} else {
			System.out.println("The submarine dives.");
			isSubmerged = true;
		}
	}

	public void surface() {
		if (isSubmerged) {
			System.out.println("The submarine surfaces.");
			isSubmerged = false;
		} else {
			System.out.println("The submarine is already at the surface.");
		}

	}
}