# Advanced RPG Project 6: Interactive Instructor File Maintenance System

## Overview
This project implements an interactive database file maintenance utility (CRUD engine) on the IBM i platform using fully free-form RPGLE, an externally described physical database file layout, and a multi-format workstation display file configured with separate indicator tracking. The application allows real-time Add, Change, Delete, and Inquiry operations against a master faculty repository file, utilizing robust data validation loops, custom field-protection masks, and responsive color-conditioned layout rendering to ensure transactional safety.

---

## File Directory
* **`WUINSTP.PF`**: The physical database file source definition specifying unique keyed structural records for faculty data storage.
* **`PROJ6.RPGLE`**: The core data processing program written in fully free-form RPGLE that manages execution selection logic, validation routines, index checks, and database modifications.
* **`PRJ06DSPF.DSPF`**: The externally described workstation display file mapping the interactive layout coordinates and data fields for `SCRN1` and `SCRN2`.
* **`Project 6 Instructions.pdf`**: The official functional criteria document detailing date mapping conversions, data entry constraints, and validation standards.
* **`WUINSTP.PF-DTA.pdf`**: An environment snapshot showing raw database records contained within the original master physical storage layer.
* **`MYINSTP.PF-DTA.pdf`**: An environment snapshot showing the updated records within the localized copy of the master file used for program execution and testing.

---

## Master Instructor Repository Schema (`MYINSTP`)
Configured for shared random keyed retrieval, record-locking updates, and record purge routines (`Usage(*Update: *Output: *Delete) Keyed`).

| Field Name | Type / Length | Dec | Description / Data Labels |
| :--- | :--- | :--- | :--- |
| `INSTNO` | Zoned (`S`) / 9 | 0 | Instructor Social Security Number (Unique Primary Access Path Key) |
| `IFNAME` | Character (`A`) / 10 | | Instructor Given First Name |
| `ILNAME` | Character (`A`) / 15 | | Instructor Family Last Name |
| `DEPT` | Character (`A`) / 3 | | Academic Course Department Assignment Code |
| `SALARY` | Zoned (`S`) / 8 | 2 | Gross Annual Base Salary Ledger |
| `RANK` | Character (`A`) / 1 | | Faculty Academic Rank Code (Values 1 to 4) |
| `SEX` | Character (`A`) / 1 | | Biological Gender Code Indicator ('M' or 'F') |
| `HIRDAT` | Zoned (`S`) / 8 | 0 | Legacy Date of Hire Integer Layout (`CCYYMMDD`) |
| `MARSTS` | Character (`A`) / 1 | | Marital Status Classification Code ('M' or 'S') |
| `DEPEND` | Zoned (`S`) / 2 | 0 | Total Number of Registered Dependents |
| `TENURE` | Character (`A`) / 1 | | Tenured Faculty Tracking Flag ('Y' or 'N') |
| `TITLE` | Character (`A`) / 1 | | Preferred Academic Title Classification |
| `STREET` | Character (`A`) / 20 | | Street Address Container |
| `CITY` | Character (`A`) / 15 | | Municipal City Designation |
| `STATE` | Character (`A`) / 2 | | Two-Character State Code Layout |
| `ZIP` | Zoned (`S`) / 9 | 0 | Numeric Postal Zip Code Block |
| `IEMAIL` | Character (`A`) / 30 | | Corporate Faculty Email Address Field |

---

## Workstation Display Architecture & Interface Design
The user interface manages screen presentation properties via an independent indicator area