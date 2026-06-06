# Project 4: Integrated Development with IBM Rational Developer for i (RDi)

## Overview
This project explores modern mid-range development workflows on the IBM i platform by transitioning from legacy green-screen SEU editing to the **IBM Rational Developer for i (RDi)** integrated development environment. The project is structured into three distinct technical parts, encompassing RPGLE application debugging, external printer file stabilizing via DDS syntax verification, and rapid user interface prototyping using the graphical RDi Report Designer utility.

---

## Project Structure & File Directory

### Part A: Using RDi for RPG Development (Folder: `Project4-A`)
* **`PROJECT4A.RPGLE`**: The corrected core application logic written in free-form RPGLE. It calculates flat interest amortization schedules, tracks dynamic page breaks, and maintains processing counters.
* **`FINREPORT.PRTF`**: The externally described printer file layout used by the RPG application to map headers, columns, edit codes, and trailing summary data.
* **`CSCFINP.PF-DTA.pdf`**: A reference lookup document displaying sample input records housed within the underlying production physical database layer.
* **`FINREPORT-OUTPUT.pdf`**: Captured spooled print stream data proving error-free execution and layout alignment matching the project design parameters.

### Part B: Using RDi for DDS (Folder: `Project4-B`)
* **`PROJECT4B.PRTF`**: The stabilized Data Description Specifications (DDS) source member defining a program-described profit evaluation sheet layout. It implements field-level inheritance matrices and applies custom float edit codes.

### Part C: Graphical UI Prototyping via Report Designer (Folder: `Project4-C`)
* **`PROJECT4C.PRTF`**: A custom printer layout created from scratch using the graphical RDi Report Designer tool to map out an administrative work logging record schema.

### General Scope Reference
* **`Project 4 Instructions.pdf`**: The official multi-part assignment sheet containing debugging criteria, structural specifications, and printchart design layouts.

---

## Core Technical Specs & Interface Engineering

### PART A: Programmatic Logic & Debugging
The application evaluates customer financing accounts over a fixed 12-month term at an annualized interest rate of 14%. The core calculation flow includes:
* **Liability Isolation**: Unpaid balances are computed by evaluating full baseline financing fields (`FINAMT`) against applied down payments (`DWNPAY`).
* **Flat Amortization**: Annual interest charges are evaluated across the upfront principal and appended immediately to the baseline debt liability, formatting a static monthly payment stream (`MONTHPAY = (BALDUE + Interest) / 12`).
* **Data Extraction**: Leverages a multi-tier data structure overlay (`PurDate`) to dynamically unpack date arrays (`PDATE`) down to independent month and day zones (`PURMON` / `PURDAY`) for formatting on the detail line as `dd-mm`.

### PART B: Data Description Specifications & Field Inheritance
Part B leverages RDi to construct an externally described printer file layout using advanced DDS rules:
* **File Referencing (`REF`)**: Explicitly binds field typing layouts directly to an external physical file definition (`CSINVP`).
* **Field Inheritance (`REFFLD`)**: Safely inherits system definitions for core database keys (`PRODNO`, `DESCRP`, `SELLPR`, `CURCST`) directly from the reference model layer, decreasing code duplication overhead.
* **Attribute Masking**: Injects floating currency tokens (`$`) snug against high-order digits alongside floating comma separations via edit codes (`EDTCDE(1 $)`) to handle standard clean visual accounting tracking.

### PART C: Graphical UI Prototyping via Report Designer
Part C focuses on rapid user interface prototyping using the graphical RDi Report Designer plug-in to design an administrative **ACME Work Report** mapped precisely against a physical file schema (`ACP001`):
* **Visual Title Blocks**: Incorporates dynamic system properties (`8DATE(*YY)`) alongside hard-coded header line constants to print clean, centered banner titles.
* **Social Security Masking**: Applies custom edit strings (`EDTWRD('   -  -    ')`) to automatically break raw 9-digit zoned fields (`SOCSEC`) into standardized, dash-separated string distributions.
* **Calculated Field Placeholders**: Reserves precise grid positioning columns for a runtime variable (`PAY`). This field acts as an unmapped design layout placeholder waiting to accept data derived from downstream software logic calculations.