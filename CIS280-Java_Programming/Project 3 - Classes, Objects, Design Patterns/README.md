# Project 3: Java Objects Assignment

A Java application demonstrating Object-Oriented Programming (OOP) concepts, focusing on class inheritance hierarchies, encapsulation, and interface implementation. The system models a tiered vehicle classification structure covering land vehicles and aquatic vessels.

---

## Architecture Overview

The system organizes transportation types into structured class hierarchies through inheritance and dedicated interfaces[cite: 3, 4]:

- **Base Class:**
  - `Vehicles` — Core superclass containing common vehicle attributes and functionality[cite: 3, 4].

- **Land Vehicles:**
  - `Car` — Implements `CarInterface` and serves as the parent class for `Sedan` and `SportsCar`[cite: 4].
  - `Truck` — Implements `TruckInterface` and serves as the parent class for `PickupTruck` and `SemiTruck`[cite: 4].

- **Watercraft:**
  - `Boat` — Implements `BoatInterface`, inherits from `Vehicles`, and serves as the parent class for specialized marine vessels[cite: 3, 4].
  - `SailBoat` — Extends `Boat` to implement wind-driven watercraft operations[cite: 3, 4].
  - `Submarine` — Extends `Boat` to model submersible vehicle behaviors and depth navigation[cite: 3, 4].

---

## Class Inheritance Trace

The project implements a three-tier inheritance tree rooted in a common superclass, with specialized categories implementing dedicated interfaces:

```text
                           [Vehicles]
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
      [Car]                 [Truck]                 [Boat]
 (implements            (implements            (implements
  CarInterface)          TruckInterface)        BoatInterface)
     ┌──┴──┐                ┌──┴──┐                ┌──┴──┐
     │     │                │     │                │     │
  [Sedan] [SportsCar]  [PickupTruck] [SemiTruck] [SailBoat] [Submarine]
  
```
## Project Structure

  Project3/
├── .classpath
├── .project
├── .settings/
│   ├── org.eclipse.core.resources.prefs
│   └── org.eclipse.jdt.core.prefs
├── bin/
│   └── mcc/
│       └── homework/
│           ├── Boat.class
│           ├── BoatInterface.class
│           ├── Car.class
│           ├── CarInterface.class
│           ├── JavaObjectsMain.class
│           ├── PickupTruck.class
│           ├── SailBoat.class
│           ├── Sedan.class
│           ├── SemiTruck.class
│           ├── SportsCar.class
│           ├── Submarine.class
│           ├── Truck.class
│           ├── TruckInterface.class
│           └── Vehicle.class
└── src/
    └── mcc/
        └── homework/
            ├── Boat.java
            ├── Car.java
            ├── JavaObjectsMain.java
            ├── PickupTruck.java
            ├── SailBoat.java
            ├── Sedan.java
            ├── SemiTruck.java
            ├── SportsCar.java
            ├── Submarine.java
            ├── Truck.java
            └── Vehicles.java