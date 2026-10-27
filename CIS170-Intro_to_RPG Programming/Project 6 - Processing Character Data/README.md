# Project 4: IBM Rational Developer for i (RDi) Development

## Overview
This project explores modernization workflows on the IBM i platform using Rational Developer for i (RDi). Spanning three distinct lab assignments, the project covers diagnosing and correcting free-form RPGLE program logic, resolving Data Description Specifications (DDS) syntax and field alignment errors, and utilizing the visual RDi Report Designer to construct production printer layouts.

While the course assignments for Parts B and C strictly required DDS printer file creation, accompanying free-form RPGLE batch programs (`PROJECT4B.RPGLE` and `PROJECT4C.RPGLE`) were developed to execute the application cycle, perform calculations, and inspect the resulting spool output reports (`PROJECT4B-OUTPUT.pdf` and `PROJECT4C-OUTPUT.pdf`).

---

## File Directory

### Source Files
* **`Part A/FINREPORT.prtf`**: External printer file definition for the customer financing report. Defines page headers, customer detail rows with custom edit words (`EDTWRD`), and summary totals with floating dollar signs (`EDTWRD('   ,  $0.  ')`).
* **`Part A/PROJECT4A.rpgle`**: Fully free-form batch application logic (`**FREE`). Computes monthly finance charges at 14% annual interest over a 12-month term, unpacks commencement dates (`CDATE`) into `DD-MM` format via a data structure overlay, updates running accumulators, and prints detail rows and grand totals to `FINREPORT`.
* **`Part B/PRJ4BPRTF.prtf`**: External printer file DDS referencing the course inventory database file `CSINVP` via `REFFLD`. Configures zero-suppressed page numbering (`EDTCDE(Z)`), column headings, and floating dollar currency formatting (`EDTCDE(1 $)`).
* **`Part B/PROJECT4B.rpgle`**: *(Complementary Driver)* Free-form RPGLE program developed to test and validate `PRJ4BPRTF`. Reads `CSINVP` sequentially, computes item net profit (`SELLPR - CURCST`) using half-adjust rounding (`EVAL(H)`), accumulates grand total profits, and writes formatted reports.
* **`Part C/PRJ4CPRTF.prtf`**: External printer file constructed using the RDi visual Report Designer over keyed file `ACP001`. Features two-tier column headings, Social Security Number formatting (`EDTWRD('   -  -    ')`), and numeric edit codes (`EDTCDE(1)`).
* **`Part C/PROJECT4C.rpgle`**: *(Complementary Driver)* Free-form RPGLE program developed to test and validate `PRJ4CPRTF`. Implements a streamlined nested `DoW` control-break loop on `SOCSEC`, accumulates employee shift hours and production quantities, calculates rounded hourly productivity rates (`QTY / WKHOURS`), and outputs consolidated employee detail rows.

### Documentation & Reference Materials (`Docs/`)
* **`Project 4 Instructions.pdf`**: The course assignment specifications, business rules, and deliverables for Parts A, B, and C.
* **`Project 4 Part A.pdf`**: Lab submission document demonstrating RDi editor usage, compiler error list diagnostics, error resolution, and spooled file verification.
* **`Project 4 Part B.pdf`**: Lab submission document detailing DDS compiler errors (`CPD7410`, `CPD7425`, `CPD7807`, `CPD7506`) and the progression to a clean compile (`EVFF5132`).
* **`Project 4 Part C.pdf`**: Lab submission document featuring screen captures of RDi Report Designer in Design View and the clean DDS compile in Source View.
* **`CSCFINP.PF-DTA.pdf`**: Spool file printout listing raw customer master records in the `CSCFINP` physical database file.
* **`FINREPORT-OUTPUT.pdf`**: Final spool output report for Part A showing customer balances, financing terms, and grand totals.
* **`PROJECT4B-OUTPUT.pdf`**: Generated spool output report for Part B showing CompuSell inventory profit calculations and overall net profit.
* **`PROJECT4C-OUTPUT.pdf`**: Generated spool output report for Part C showing consolidated employee productivity metrics per hour without duplicate lines.

---

## Technical Summaries by Project Part

### Part A: RPGLE Diagnostic Resolution & Financing Report (`PROJECT4A`)
* **Objective**: Import, diagnose, and resolve compile errors in an existing RPGLE program using RDi Error Lists, then execute the program to generate the customer balance report.
* **Business Logic**: Preferred customers of `CloudServices24x7, Inc.` receive 12-month financing at a fixed 14% annual interest rate charged against the unpaid principal balance (`FINAMT - DWNPAY`). The monthly payment is computed as `(Balance + Interest) / 12` using half-adjust rounding (`EVAL(H)`).
* **Data Manipulation**:
  * An unnamed data structure overlays commencement date `CDATE` (`YYYYMMDD`) to isolate day (`PURDAY`) and month (`PURMON`) for `DD-MM` formatted output.
  * Running accumulators tally `TOTALDOWN`, `TOTALOWED`, `TOTALPAY`, and an overall customer count (`CUSTCOUNT`).
* **Diagnostics Corrected**: Resolved file definition syntax (`disc` to `Disk`, missing file references), missing assignment operators on `EVAL`, specification sequencing errors, and DDS `EDTWRD` digit replace position mismatches (`CPD7528`).

### Part B: DDS Debugging & Inventory Profit Report (`PRJ4BPRTF` / `PROJECT4B`)
* **Objective**: Diagnose and debug an erroneous printer file DDS member in RDi to achieve a clean compile (`EVFF5132`).
* **DDS Specifications**:
  * Employs field referencing (`REFFLD`) against the course inventory physical file `CSINVP` for item number (`PRODNO`), description (`DESCRP`), selling price (`SELLPR`), and current cost (`CURCST`).
  * Configures edit codes for zero-suppressed page numbers (`EDTCDE(Z)`) and currency formatting with floating dollar signs (`EDTCDE(1 $)`).
* **Diagnostics Corrected**: Corrected invalid keywords on constant fields (`CPD7506`), character entry errors (`CPD7410`, `CPD7425`), overlapping horizontal field coordinate collisions (`CPD7807`), and improper edit code assignments on alpha fields.
* **Execution**: `PROJECT4B.RPGLE` was constructed to sequentially read `CSINVP`, compute item net profit (`SELLPR - CURCST`), accumulate grand total profits, and output formatted pages to `PRJ4BPRTF`.

### Part C: Visual Report Designer & Control-Break Reporting (`PRJ4CPRTF` / `PROJECT4C`)
* **Objective**: Use RDi Report Designer in Design View to lay out an employee productivity report over the keyed physical file `ACP001` (`K SOCSEC`).
* **DDS Specifications**:
  * Defines two-tier column headings, masked Social Security Numbers using edit words (`EDTWRD('   -  -    ')`), and formatted numeric metrics (`EDTCDE(1)`).
* **Control-Break Architecture**:
  * Because employee shift records in `ACP001` share the same `SOCSEC` across different dates, `PROJECT4C.RPGLE` employs a nested `DoW` control-break loop.
  * The outer loop initializes employee key boundaries, while the inner loop accumulates total hours worked (`WKHOURS`) and units produced (`QTY`) across consecutive keyed records.
  * Computes overall productivity rate per hour (`QTY / WKHOURS`) with half-adjust rounding (`EVAL(H)`) and divide-by-zero protection before generating a single consolidated detail line per employee.

---

## Database & Physical File Structures

### Customer Financing Master (`CSCFINP`)
Supplied via master course files, uniquely keyed on `FINNO`.

| Field Name | Type & Length | Dec | Description |
| :--- | :---: | :---: | :--- |
| `FINNO` | Zoned Decimal (`S`) / 6 | 0 | Finance Number (Unique Key) |
| `CUSTNO` | Zoned Decimal (`S`) / 6 | 0 | Preferred Customer Number |
| `FINAMT` | Zoned Decimal (`S`) / 7 | 2 | Purchase / Finance Amount |
| `DWNPAY` | Zoned Decimal (`S`) / 7 | 2 | Customer Down Payment |
| `CDATE` | Zoned Decimal (`S`) / 8 | 0 | Commencement Date (`YYYYMMDD`) |
| `REMIT` | Character (`A`) / 1 | | Remittance Period (`M` = Monthly, `Q` = Quarterly) |
| `TERM` | Zoned Decimal (`S`) / 3 | 0 | Financing Term in Months |
| `BALDUE` | Zoned Decimal (`S`) / 7 | 2 | Principal Balance Due |

### ACME Work File (`ACP001`)
Supplied via master course files, keyed on `SOCSEC`.

| Field Name | Type & Length | Dec | Description |
| :--- | :---: | :---: | :--- |
| `SOCSEC` | Zoned Decimal (`S`) / 9 | 0 | Employee Social Security Number (Key) |
| `NAME` | Character (`A`) / 16 | | Employee Full Name |
| `WKDATE` | Zoned Decimal (`S`) / 8 | 0 | Date Worked (`YYYYMMDD`) |
| `WKHOURS` | Zoned Decimal (`S`) / 4 | 2 | Hours Worked on Shift |
| `QTY` | Zoned Decimal (`S`) / 3 | 0 | Production Units Completed |

---

## Compilation & Execution Instructions

Execute these commands from a 5250 command line or the RDi Command Entry console:

### 1. Part A Execution
```cl
/* 1. Compile external printer file */
CRTPRTF FILE(YOURLIB/FINREPORT) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(FINREPORT)

/* 2. Compile batch RPGLE program */
CRTBNDRPG PGM(YOURLIB/PROJECT4A) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT4A)

/* 3. Run application and verify output */
CALL PGM(YOURLIB/PROJECT4A)
WRKSPLF
```

### 2. Part B Execution
```cl
/* 1. Compile external printer file */
CRTPRTF FILE(YOURLIB/PRJ4BPRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ4BPRTF)

/* 2. Compile batch RPGLE driver */
CRTBNDRPG PGM(YOURLIB/PROJECT4B) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT4B)

/* 3. Run application and verify output */
CALL PGM(YOURLIB/PROJECT4B)
WRKSPLF
```

### 3. Part C Execution
```cl
/* 1. Compile external printer file generated via Report Designer */
CRTPRTF FILE(YOURLIB/PRJ4CPRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ4CPRTF)

/* 2. Compile control-break RPGLE driver */
CRTBNDRPG PGM(YOURLIB/PROJECT4C) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT4C)

/* 3. Run application and inspect grouped report */
CALL PGM(YOURLIB/PROJECT4C)
WRKSPLF
```