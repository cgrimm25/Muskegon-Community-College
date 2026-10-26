# Project 5: Controlling Program Workflow

## Overview
This project implements structured programming and workflow control techniques on the IBM i platform using fully free-form ILE RPG (`**FREE`) and Data Description Specifications (DDS). Focusing on concepts from Chapter 5 of *Programming in ILE RPG*, the application processes the Wibaux University student master database to produce a cross-tabulated demographic summary report.

Unlike detail-line transaction reports, this project emphasizes post-loop summary reporting, relational decision-making (`If`/`Elseif`), iterative file processing (`DoW Not %EOF`), and modular program organization through required subroutines (`Exsr`/`Begsr`). The resulting cross-tabulation matrix categorizes undergraduate student enrollments by academic level and residency status, calculating cross-footing row and column totals upon end-of-file condition.

---

## File Directory

### Source Files
* **`PRJ5PRTF.prtf`**: External printer file definition constructed in DDS. Defines the report page headers (`HEADING`), column alignment labels for residency classifications, and the multi-tier cross-tabulation summary lines (`TOTAL`) with edit codes (`EDTCDE(1)`) for formatted numeric counts and suppressed leading zeros.
* **`PROJECT5.rpgle`**: Fully free-form batch RPGLE application (`**FREE`). Reads `WUSTDP` sequentially, filters for undergraduate student status (`CLASS = 'U'`), routes records to classification-specific subroutines based on cumulative credits earned (`CRDTOT`), invokes a summary calculation routine (`CALCS`) to cross-foot rows and columns, and writes the completed summary matrix after loop termination.

### Documentation & Reference Materials (`Docs/`)
* **`Chapter 5 - Controlling Program Workflow.pdf`**: Course presentation slides detailing structured design, relational/logical comparisons, conditional selection (`If`/`Elseif`/`Select`), loop iteration (`DoW`/`DoU`/`For`), and subroutine architecture (`*INZSR`, `Exsr`, `Begsr`).
* **`Project 5 Instructions.pdf`**: The course assignment specifications, business rules, classification credit boundaries, subroutine requirements, and target output layout.
* **`PROJECT 5-OUTPUT.pdf`**: Spool file output report verifying the final compiled report against the required distribution counts.
* **`WUSTDP.PF-DTA.pdf`**: Physical database printout displaying the raw input student records, residency district codes, classification flags, and earned credit values.

---

## Technical Summary & Program Architecture

### Business Logic & Record Filtering
* **Undergraduate Isolation**: Only records where `CLASS = 'U'` are tallied. Graduate records (`CLASS = 'G'`) are bypassed.
* **Academic Level Subdivision**: Undergraduates are classified according to total earned credits (`CRDTOT`):
  * **Freshmen**: Fewer than 30 credits (`CRDTOT < 30`).
  * **Sophomores**: 30 to 59 credits (`CRDTOT <= 59`).
  * **Juniors**: 60 to 89 credits (`CRDTOT <= 89`).
  * **Seniors**: 90 or more credits (`CRDTOT >= 90`).
* **Residency Status**: Evaluated by the district code field (`DCODE`):
  * `'I'`: In-District
  * `'O'`: Out-Of-District
  * `'F'`: International

### Modular Subroutine Design
In adherence to course requirements, the program separates discrete business operations into dedicated subroutines:
* **`Freshman` / `Sophomores` / `Juniors` / `Seniors`**: Subroutines invoked conditionally from the main read loop based on `CRDTOT`. Each routine checks `DCODE` and increments the appropriate residency counter for that class tier.
* **`CALCS`**: Executed after end-of-file (`%EOF`). Calculates horizontal row sums across all classifications, vertical column sums across all residency types, and computes the grand total cross-foot check.
* **Summary Printing Cycle**: Because no detail transaction lines are printed, page headers and the summary matrix are written only once after all input records have been read and tabulated.

---

## Database & Physical File Structures

### Wibaux University Student Master (`WUSTDP`)
Supplied via master course files, uniquely keyed on `STUSSN`.

| Field Name | Type & Length | Dec | Description |
| :--- | :---: | :---: | :--- |
| `STUSSN` | Zoned Decimal (`S`) / 9 | 0 | Student Social Security Number (Unique Key) |
| `SLNAME` | Character (`A`) / 15 | | Student Last Name |
| `SFNAME` | Character (`A`) / 10 | | Student First Name |
| `SMNAME` | Character (`A`) / 10 | | Student Middle Name |
| `STREET` | Character (`A`) / 20 | | Street Address |
| `CITY` | Character (`A`) / 15 | | City |
| `STATE` | Character (`A`) / 2 | | State Code |
| `ZIP` | Zoned Decimal (`S`) / 9 | 0 | Zip+4 Postal Code |
| `PHONE` | Zoned Decimal (`S`) / 10 | 0 | Telephone Number |
| `CRDTOT` | Zoned Decimal (`S`) / 3 | 0 | Total Earned Credit Hours |
| `DCODE` | Character (`A`) / 1 | | District Code (`I` = In-District, `O` = Out-of-District, `F` = International) |
| `ADMDAT` | Zoned Decimal (`S`) / 8 | 0 | Date Admitted (`YYYYMMDD`) |
| `CLASS` | Character (`A`) / 1 | | Classification Flag (`U` = Undergraduate, `G` = Graduate) |
| `GRDDAT` | Zoned Decimal (`S`) / 8 | 0 | Date Graduated (`YYYYMMDD`) |
| `SDEPT` | Character (`A`) / 3 | | Department Code of Student Major |
| `GPA` | Zoned Decimal (`S`) / 3 | 2 | Grade Point Average |
| `DEGREE` | Character (`A`) / 3 | | Degree Granted |
| `SEMAIL` | Character (`A`) / 30 | | Student Email Address |

---

## Verification & Expected Output Summary

Running `PROJECT5` against the 30-record `WUSTDP` master file filters out 5 graduate records and outputs the following cross-tabulation matrix:

| Classification | In-District | Out-Of-District | International | Total |
| :--- | :---: | :---: | :---: | :---: |
| **Freshman** | 9 | 5 | 5 | **19** |
| **Sophomores** | 1 | 0 | 0 | **1** |
| **Juniors** | 1 | 1 | 1 | **3** |
| **Seniors** | 1 | 0 | 1 | **2** |
| **Total** | **12** | **6** | **7** | **25** |

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore `WUSTDP` from Master Save File `RPGIV5THSU.savf`

* **Step 1: Create the target save file on IBM i**  
  Run this command on your 5250 green screen command line:
  ```cl
  CRTSAVF FILE(YOURLIB/RPGIV5THSU) TEXT('RPG IV 5th Ed Student Save File')
  ```

* **Step 2: Upload `RPGIV5THSU.savf` to your IFS home directory**  
  1. Open IBM i Access Client Solutions (ACS) and select **Integrated File System**.
  2. Navigate to your user home folder: `/home/USERNAME/`.
  3. Upload `RPGIV5THSU.savf` from your local repository data assets folder.
  4. Ensure **"Save to UTF-8 text file"** (or text conversion) is **UNCHECKED** so the stream file remains raw binary.

* **Step 3: Copy the stream file into the save file object**  
  Execute this command on the 5250 green screen command line:
  ```cl
  CPYFRMSTMF FROMSTMF('/home/USERNAME/RPGIV5THSU.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/RPGIV5THSU.FILE') MBROPT(*REPLACE)
  ```

* **Step 4: Restore the physical file and test records**  
  Execute `RSTOBJ` to extract `WUSTDP` from the `RPGIV5THSU` container into your active library:
  ```cl
  RSTOBJ OBJ(WUSTDP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored table**  
  Confirm that all 30 student records are present:
  ```cl
  RUNQRY QRYFILE((YOURLIB/WUSTDP))
  ```

---

### 2. Compile Printer File
```cl
CRTPRTF FILE(YOURLIB/PRJ5PRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ5PRTF)
```

### 3. Compile Batch RPGLE Program
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT5) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT5)
```

### 4. Run Application & Review Spooled Output
```cl
CALL PGM(YOURLIB/PROJECT5)
WRKSPLF
```