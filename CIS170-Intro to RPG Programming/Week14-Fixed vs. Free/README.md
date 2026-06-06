# Project 11: Fixed-Form RPG IV Inventory Master Report

## Overview
This project constructs a program-described inventory reporting application on the IBM i platform using traditional fixed-form RPG IV (ILE RPG) structural layouts. Unlike modern externally described files, this application explicitly maps the binary structure and byte-length constraints of the database records and printer layouts directly inside the source member program definitions. The program processes raw warehouse product records, handles packed decimal format unpack conversions, and drives sequential report layout builds with automated line page-overflow constraints.

---

## File Directory
* **`PROJECT11.RPGLE`**: The core fixed-format RPG IV source file featuring explicit Header (H), File (F), Input (I), and Output (O) specifications tied to an inline free-form calculation block.
* **`Project 11 Instructions.pdf`**: The official scope criteria sheet mapping data storage column limits, packed definitions, and visual print boundaries.
* **`PROJECT 11-OUTPUT.pdf`**: A sample execution printout of the final compiled report demonstrating clean column alignments and precise accounting formatting masks.
* **`CSINVP.PF-DTA.pdf`**: A reference data print file exposing the raw production warehouse database entries used to map structural positions.

---

## Fixed-Form Specification Architecture

The program avoids the modern `**Free` tag at line 1 to safely process column-restricted fixed-form layouts required by compiler standards for program-described entries:

### 1. File Description Specifications (`F-Specs`)
* **`CSINVP`**: Declared as the primary input (`I`), program-described (`F`) database disk file containing a fixed record block size of 92 bytes.
* **`QPRINT`**: Declared as the output printer file (`O`), program-described (`F`) with a standard line width capacity of 132 characters. It explicitly hooks into the system overflow indicator `*INOF` via the `OFLIND` keyword to manage page breaks programmatically.

### 2. Input Specifications (`I-Specs`)
The program-described database layout inside `CSINVP` isolates individual data types by defining hardcoded buffer starting and ending positions:

| Record Format | Field Name | Packed Status (`P`) | From Position | To Position | Decimal places | Description |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **`INVREC`** | `PRODNO` | | 1 | 6 | 0 | Unique Product Number |
| | `PRODTYPE`| | 7 | 9 | | Product Type Code |
| | `PACT` | | 10 | 10 | | Product Active Status Flag |
| | `DESCRP` | | 11 | 50 | | Master Item Text Description |
| | `SELLPR` | | 51 | 56 | 2 | Base Retail Unit Selling Price |
| | `SHIPWT` | | 57 | 61 | | Item Weight (Pounds 1–3, Ounces 4–5) |
| | `QTYOH` | **Yes** | 62 | 64 | 0 | Dynamic Quantity On Hand Balance |
| | `RORPNT` | **Yes** | 65 | 67 | 0 | Corporate Reorder Point Limit |
| | `RORQTY` | **Yes** | 68 | 70 | 0 | Automated Reorder Quantity Level |
| | `RORCOD` | | 71 | 71 | | Reorder Tracking Flag Code |
| | `SUPCOD` | **Yes** | 72 | 74 | 0 | Reference Supplier Match Key |
| | `SHPCST` | **Yes** | 75 | 80 | 2 | Dynamic Freight/Shipping Cost Fee