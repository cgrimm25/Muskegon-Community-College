# Project 7: Wibaux University Instructor Retirement & Chronological Report

## Overview
This project generates an **Instructor Retirement Report** for the Human Resources department at Wibaux University. It demonstrates advanced mid-range database access methodologies and native date handling operations on the IBM i platform. The program introduces logical file processing using keyed sequence access paths rather than standard arrival sequences. Additionally, it implements native date type validation, calendar arithmetic (calculating 30-year employment thresholds), date-differential tracking against active system time, and localized string formatting.

---

## File Directory
* **`PROJECT7.RPGLE`**: The core application processing logic written in fully free-form RPGLE. It configures a keyed input loop over a logical file layout, evaluates chronological retirement targets, calculates running summary balances, and handles detail page carriage returns.
* **`RETIREREP.PRTF`**: The externally described printer file Data Description Specifications (DDS). It defines visual boundaries for report headers, detail distributions, and the final administrative evaluation block (`FOOTER`), utilizing specific format editing masks like `EDTCDE(N)` to gracefully express negative integers.
* **`INSTRUCTLF.LF`**: The externally described logical file Data Description Specifications (DDS). It builds an alternative indexed access path over the physical instructor table to enforce sorting rules at the database level.
* **`Project 7 Instructions.pdf`**: The official assignment guideline specifying calculation criteria, chronological goals, field definitions, and reporting requirements.
* **`PROJECT 7-OUTPUT.pdf`**: A sample execution printout of the final compiled report confirming perfect alphabetical tracking, clean name combination spacing, and date-formatting compliance.
* **`WUINSTP.PF-DTA.pdf`**: A reference lookup document displaying sample input records housed within the underlying production physical database layer.

---

## Database Architecture & Logical Indexing

### 1. Physical Master Schema (`WUINSTP`)
The raw warehouse repository stores instructor details inside an un-keyed physical layout using the following schema:

| Field Name | Type / Length | Dec | Description / Data Labels |
| :--- | :--- | :--- | :--- |
| `INSTNO` | Zoned (`S`) / 9 | 0 | Unique Instructor Social Security Number |
| `IFNAME` | Character (`A`) / 10 | | Instructor First Name |
| `ILNAME` | Character (`A`) / 15 | | Instructor Last Name |
| `DEPT` | Character (`A`) / 3 | | Course Department Affiliation |
| `SALARY` | Zoned (`S`) / 8 | 2 | Current Base Annual Salary Wage |
| `RANK` | Character (`A`) / 1 | | Academic Rank Code |
| `SEX` | Character (`A`) / 1 | | Gender Identifier Flag |
| `HIRDAT` | Zoned (`S`) / 8 | 0 | Legacy Date of Hire (`CCYMMDD`) |
| `MARSTS` | Character (`A`) / 1 | | Marital Status Identifier |
| `DEPEND` | Zoned (`S`) / 2 | 0 | Number of Claimed Dependents |
| `TENURE` | Character (`A`) / 1 | | Corporate Tenured Status Flag |

### 2. Keyed Logical File Layer (`INSTRUCTLF`)
Per administrative criteria, the final report must sequence records alphabetically by instructor names. Rather than consuming execution overhead sorting arrays within application memory space, this project implements a clean architectural pattern by utilizing a logical file definition:
* **Base Mapping**: Binds directly against the underlying physical record layout format (`INSTREC` referencing `WUINSTP`).
* **Composite Index Matrix**: Declares a primary composite sorting path using key field definitions (`K ILNAME` followed by `K IFNAME`).
* **Keyed Processing**: The application compiler explicitly configures the input channel with the `Keyed` parameter (`Dcl-f INSTRUCTLF Disk Usage(Input) Keyed;`). This forces the database engine to stream records directly into processing loops in perfectly sorted alphabetical sequence.

---

## Technical Calculations & Chronological Logic

The logical core processes each incoming record to track retirement readiness parameters using built-in functions:

### 1. Numeric-to-Native Date Conversion
The legacy storage structure records original employment entry (`HIRDAT`) as a raw zoned numeric sequence using a `ccyymmdd` formatting grid (e.g., `20150203`). The program safely marshals this numeric field into a true, native data type pointer (`HIREDATE`) using the date conversion function:
```rpgle
HIREDATE = %Date(HIRDAT);