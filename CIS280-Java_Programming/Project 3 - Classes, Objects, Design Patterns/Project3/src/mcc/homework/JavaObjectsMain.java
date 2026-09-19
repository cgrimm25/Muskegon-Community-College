/*
 * File: JavaObjectsMain.java
 * Author: Chris Grimm
 * Date: 10/03/24
 * Institution: Muskegon Community College
 * CIS-280 Java Programming 
 * Project 3 - Java Objects Assignment
 * Description: Main driver program demonstrating object creation, inheritance, and interface implementations[cite: 3, 4]
*/

package mcc.homework;

public class JavaObjectsMain {

	public static void main(String[] args) {

		int vin = 0;
        
		System.out.println("Welcome to Java Objects Assignment\n");
		
		// Trucks
		Truck myFordTruck1 = new Truck("Ford", "F-150", 2021);
		myFordTruck1.startEngine();
		myFordTruck1.loadCargo(45);
		myFordTruck1.unloadCargo(45);
		myFordTruck1.tow(20);
		System.out.println("");

		Truck myFordTruck2 = new Truck("Ford", "F-150", 2021, 123456789);
		myFordTruck2.startEngine();
		myFordTruck2.loadCargo(55);
		myFordTruck2.unloadCargo(35);
		myFordTruck2.tow(60);
		System.out.println("");

		// Pickup Trucks
		PickupTruck myF1501 = new PickupTruck("Ford", "F-150", 2007);
		myF1501.startEngine();
		myF1501.loadCargo(45);
		myF1501.unloadCargo(45);
		myF1501.tow(5);
		System.out.println("");

		vin = 1234566666;
		PickupTruck myF1502 = new PickupTruck("Ford", "F-150 Raptor", 2024, vin);
		myF1502.startEngine();
		myF1502.loadCargo(45);
		myF1502.unloadCargo(45);
		myF1502.tow(15);
		System.out.println("");

		// Semi-Trucks
		vin = 173488666;
		SemiTruck mySemi1 = new SemiTruck("Volvo", "V2", 1998, vin);
		mySemi1.loadCargo(45);
		mySemi1.unloadCargo(45);
		System.out.println("");

		vin = 1234588666;
		SemiTruck mySemi2 = new SemiTruck("Mack", "Anthem", 2023, vin);
		mySemi2.loadCargo(145);
		mySemi2.unloadCargo(145);
		System.out.println("");

		// Cars
		Car myHondaCar1 = new Car("Honda", "Civic", 2016);
		myHondaCar1.startEngine();
		myHondaCar1.openSunroof();
		myHondaCar1.playMusic("Jingle Bells");
		System.out.println("");

		vin = 8888;
		Car myHondaCar2 = new Car("Honda", "Accord", 2024, vin);
		myHondaCar2.startEngine();
		myHondaCar2.openSunroof();
		myHondaCar2.playMusic("Don't Stop Beleiving");
		System.out.println("");

		// Sedans
		Sedan myToyotaSedan1 = new Sedan("Toyota", "Camry", 2020);
		myToyotaSedan1.startEngine();
		myToyotaSedan1.openSunroof();
		myToyotaSedan1.playMusic("Old Town Road");
		System.out.println("");

		vin = 9999;
		Sedan myToyotaSedan2 = new Sedan("Toyota", "Corolla", 2023, vin);
		myToyotaSedan2.startEngine();
		myToyotaSedan2.openSunroof();
		myToyotaSedan2.playMusic("Stairway to Heaven");
		System.out.println("");

		// Sports Car
		SportsCar myChevroletSportsCar1 = new SportsCar("Chevrolet", "Corvette", 2015);
		myChevroletSportsCar1.startEngine();
		myChevroletSportsCar1.openSunroof();
		myChevroletSportsCar1.playMusic("Red River");
		System.out.println("");

		vin = 6666;
		SportsCar myChevroletSportsCar2 = new SportsCar("Chevrolet", "Camaro", 2022, vin);
		myChevroletSportsCar2.startEngine();
		myChevroletSportsCar2.openSunroof();
		myChevroletSportsCar2.playMusic("All Night Long");
		System.out.println("");

		// Boats
		Boat myboat1 = new Boat("Martin", "Speedboat", 2018);
		myboat1.startEngine();
		myboat1.cabinLight();
		myboat1.playMusic("Bohemian Rhapsody");
		System.out.println("");

		vin = 7777;
		Boat myboat2 = new Boat("Aston", "Tugboat", 2009, vin);
		myboat2.startEngine();
		myboat2.playMusic("Shape of You");
		System.out.println("");

		// Sailboats
		SailBoat mySailboat1 = new SailBoat("Sunfish", "Sailboat", 2018);
		mySailboat1.startEngine();
		mySailboat1.raiseSails();
		mySailboat1.lowerSails();
		mySailboat1.cabinLight();
		mySailboat1.playMusic("Bohemian Rhapsody");
		System.out.println("");

		vin = 8888;
		SailBoat mySailboat2 = new SailBoat("Baracuda", "Sailboat", 2019, vin);
		mySailboat2.startEngine();
		mySailboat2.raiseSails();
		mySailboat2.lowerSails();
		mySailboat2.playMusic("Shape of You");
		System.out.println("");

		// Submarines
		Submarine mySubmarine1 = new Submarine("Sonar", "Submarine", 2018);
		mySubmarine1.startEngine();
		mySubmarine1.surface();
		mySubmarine1.dive();
		mySubmarine1.dive();
		mySubmarine1.surface();
		mySubmarine1.playMusic("Respect");
		System.out.println("");
		
		System.out.println("\nThank you for using Java Objects Assignment");

	}

}
