# Project 5: Wibaux University Student Population Summary Report

## Overview
This project generates a **Student Population Summary Report** that cross-references academic classifications with residency metrics. It demonstrates advanced workflow management in free-form RPGLE, including multi-tier nested conditional verification logic (`If`/`Elseif`), execution distribution via required subroutines (`Begsr`/`Endsr`), and programmatic data filtering. Because this is a true summary report, it suppresses detail lines during file iteration, instead accumulating raw counts into storage grids to emit a single comprehensive matrix layout after the primary loop completes.

## File Directory
* **`PROJECT5.RPGLE`**: The application programming logic written in free-form RPGLE. Implements the primary file input loop, filter restrictions, credit matrix routing rules, and localized cross-tabulation subroutines.
* **`PRJ5PRTF.PRTF`**: The external printer file Data Description Specifications (DDS) defining the cross-tab summary grid layout, complete with zero-suppression markers (`EDTCDE(1)`) and structured block spacing codes.
* **`Project 5 Instructions.pdf`**: The official assignment guideline specifying credit bracket rules, residency identifiers, validation data benchmarks, and report mockup criteria.
* **`PROJECT 5-OUTPUT.pdf`**: A sample printout of the final compiled report confirming perfect layout matching and mathematical consistency against student records.
* **`WUSTDP.PF-DTA.pdf`**: A diagnostic data print file exposing the raw production student master entries used to verify programmatic logic.

---

## Physical File Structure (`WUSTDP`)
The data processing layer interacts with an externally defined student master table (`WUSTDP`) structured with the following Data Description Specifications (DDS) fields:

| Field Name | Type / Length | Dec | Key / Constraints | Field Description / Labels |
| :--- | :--- | :--- | :--- | :--- |
| `STUSSN` | Zoned (`S`) / 9 | 0 | **Primary Key** | Student Social Security Number |
| `SLNAME` | Character (`A`) / 15 | | | Last Name |
| `SFNAME` | Character (`A`) / 10 | | | First Name |
| `SMNAME` | Character (`A`) / 10 | | | Middle Name |
| `STREET` | Character (`A`) / 20 | | | Street Address |
| `CITY` | Character (`A`) / 15 | | | City |
| `STATE` | Character (`A`) / 2 | | | State |
| `ZIP` | Zoned (`S`) / 9 | 0 | | Zip+4 Code |
| `PHONE` | Zoned (`S`) / 10 | 0 | | Phone Number |
| `CRDTOT` | Zoned (`S`) / 3 | 0 | | Total Earned Credits |
| `DCODE` | Character (`A`) / 1 | | | District Residency Code |
| `ADMDAT` | Zoned (`S`) / 8 | 0 | | Date Admitted |
| `CLASS` | Character (`A`) / 1 | | | Student Classification Flag |
| `GRDDAT` | Character (`A`) / 8 | | | Date Graduated |
| `SDEPT` | Character (`A`) / 3 | | | Department of Major |
| `GPA` | Zoned (`S`) / 3 | 2 | | Grade Point Average |
| `DEGREE` | Character (`A`) / 3 | | | Degree Granted |
| `SEMAIL` | Character (`A`) / 30 | | | Student Email Address |

---

## Core Technical Specs & Program Workflow

### 1. Data Filtering Constraints
The program evaluates all incoming data from `WUSTDP` but strictly isolates fields according to academic enrollment types:
* **Undergraduate Filter**: Evaluates the classification field flag (`CLASS`). Only students marked as undergraduates (`'U'`) are targeted for statistical tracking; graduate student records (`'G'`) are cleanly skipped during execution loops.

### 2. Academic Bracket Routing Rules
Undergraduates are systematically routed into respective subroutines based on cumulative earned credits (`CRDTOT`):
* **Freshmen**: Fewer than 30 total earned credits.
* **Sophomores**: 30 to 59 total earned credits.
* **Juniors**: 60 to 89 total earned credits.
* **Seniors**: 90 or more total earned credits.

### 3. Cross-Tabulation Summary Subroutines
The application maintains localized memory counters to map out a structural population grid. When a student record passes the verification layer, a localized `Select`/`When` block evaluates the residency parameters (`DCODE`):
* **In-District (`'I'`)**: Increments the localized bracket's in-district variable counter.
* **Out-Of-District (`'O'`)**: Increments the localized bracket's out-of-district variable counter.
* **International (`'F'`)**: Increments the localized bracket's international variable counter.

Once the terminal file break indicator triggers (`%EOF`), a master mathematical processing routine (`CALCS`) runs to evaluate cross-totals, column accumulations, and row matrices before outputting a single, comprehensive `TOTAL` print block.