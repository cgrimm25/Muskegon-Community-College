# Project 3: Wibaux University Payroll Register

## Overview
This project generates a formatted Payroll Register report for hourly employees at Wibaux University. Developed as a structured batch processing application on the IBM i platform, the program processes employee records sequentially from an externally defined physical database file (`WUHRLYP`). It calculates gross pay including time-and-a-half overtime, computes tax withholdings (Federal, State, and FICA) using named constants and half-adjust rounding (`EVAL(H)`), extracts employee initials using an unnamed data structure overlay, and writes formatted detail rows and grand totals to an external printer file (`PRJ3PRTF`).

---

## File Directory

### Source Files
* **`PROJECT3.rpgle`**: The primary batch application logic written in fully free-form RPGLE (`**FREE`). Contains named tax constants, file declarations, an unnamed data structure overlay for initial extraction, record read loops, arithmetic calculations with half-adjust rounding, accumulator logic, and spool file output control.
* **`PRJ3PRTF.prtf`**: The external printer file Data Description Specifications (DDS). Utilizes file-level referencing (`REF(WUHRLYP)`), system job dates (`*SYS *YY`), zero-suppressed page numbering (`EDTCDE(Z)`), Social Security number edit words (`EDTWRD('   -  -    ')`), standard numeric edit codes (`EDTCDE(1)` and `EDTCDE(3)`), and summary total formatting with floating dollar signs (`EDTCDE(1 $)`).

### Documentation & Reference Materials (`Docs/`)
* **`Project 3 Instructions.pdf`**: The course assignment specifications, business logic rules, tax deduction percentages, and print chart layout.
* **`PROJECT 3-OUTPUT.pdf`**: The final spool output report demonstrating proper header alignment, SSN masking, initial extraction, calculated tax deductions, and the accumulated grand totals line.
* **`WUHRLYP.PF-DTA.pdf`**: A reference printout showing the raw employee master records contained in the `WUHRLYP` physical database file.

---

## Physical File Structure (`WUHRLYP`)
The underlying data layer is an externally defined physical database file (`PF-DTA`) with a unique primary key defined on `EMPNO`. This file is supplied via the master textbook save file `RPGIV5THSU.savf`.

| Field Name | Data Type & Length      | Dec |    Key    | Column Heading Description      |
| :--------- | :---------------------- | :-: | :-------: | :------------------------------ |
| `EMPNO`    | Zoned Decimal (`S`) / 9 |  0  | **Key 1** | Employee SSN        |
| `LNAME`    | Character (`A`) / 15    |     |           | Last Name           |
| `FNAME`    | Character (`A`) / 10    |     |           | First Name          |
| `REGHRS`   | Zoned Decimal (`S`) / 3 |  1  |           | Regular Hours Worked |
| `OTHRS`    | Zoned Decimal (`S`) / 3 |  1  |           | Overtime Hours Worked|
| `RATE`     | Zoned Decimal (`S`) / 4 |  2  |           | Hourly Pay Rate     |
| `HIRDATE`  | Zoned Decimal (`S`) / 8 |  0  |           | Hire Date (YYYYMMDD)|
| `PAYCODE`  | Character (`A`) / 1     |     |           | Pay Code            |

---

## Technical Program Flow & Execution

The program executes through four sequential phases:

1. **Environment Setup & Named Constants:**
   * Tax rates are defined as named constants to avoid hardcoded values: `FedTaxRate` (`.18`), `StateTaxRate` (`.05`), and `FICArate` (`.0751`).
   * Declares `WUHRLYP` for sequential disk input (`Usage(*Input)`) and `PRJ3PRTF` for printer output (`Usage(*Output)`) bound to the `EndOfPage` overflow indicator.
   * Initializes `EndOfPage` to `*On` (`Inz(*On)`) so the page headers print on the first cycle.

2. **Data Structure Field Overlay:**
   * An unnamed data structure (`Dcl-ds *N`) declares `FNAME Char(10)` and overlays `INITIAL Char(1) Overlay(FNAME)`.
   * When `WUHRLYP` is read into memory, `FNAME` maps directly to this data structure, extracting the first character into `INITIAL` without requiring substring functions.

3. **Batch Loop & Calculated Fields:**
   * **Priming Read**: Executes an initial `READ WUHRLYP` before loop entry.
   * **Processing Loop (`DOW NOT %EOF`)**: Cycles through all records:
     * Computes Gross Pay with time-and-a-half overtime: `(RATE * REGHRS) + ((1.5 * RATE) * OTHRS)`.
     * Computes tax withholdings using half-adjust rounding: `EVAL(H) FEDTAX = GROSSPAY * FedTaxRate`, `EVAL(H) STATETAX = GROSSPAY * StateTaxRate`, and `EVAL(H) FICA = GROSSPAY * FICArate`.
     * Computes Net Pay: `GROSSPAY - (FEDTAX + STATETAX + FICA)`.
     * Updates running accumulators: `GROSSTOT`, `FEDTOT`, `STATETOT`, `FICATOT`, and `NETPAYTOT`.
     * Checks `EndOfPage`: If active, writes the `HEADING` record format and resets `EndOfPage = *Off`.
     * Outputs formatted detail rows using `WRITE DETAIL` and reads the next record.

4. **Summary Accumulation & Program Termination:**
   * Upon reaching end-of-file (`%EOF`), exits the loop and writes the summary line once via `WRITE TOTAL`, displaying final payroll sums with floating dollar signs.
   * Sets `*INLR = *ON` to close all files, release system locks, and return execution control to the operating system.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore `WUHRLYP` from Master Save File `RPGIV5THSU.savf`

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
  Execute `RSTOBJ` to extract `WUHRLYP` from the `RPGIV5THSU` container into your active library:
  ```cl
  RSTOBJ OBJ(WUHRLYP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored table**  
  Confirm that all 17 employee records are present:
  ```cl
  RUNQRY QRYFILE((YOURLIB/WUHRLYP))
  ```

---

### 2. Compile Printer File DDS
Place `PRJ3PRTF.prtf` into your source physical file `QDDSSRC` and compile:
```cl
CRTPRTF FILE(YOURLIB/PRJ3PRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ3PRTF)
```

---

### 3. Compile and Run the Program
Place `PROJECT3.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT3) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT3)
```

Execute the program from the 5250 command line:
```cl
CALL PGM(YOURLIB/PROJECT3)
```

---

### 4. View and Verify Spool Output

* **Via 5250 Green Screen:**
  1. Open your active spool files:
     ```cl
     WRKSPLF
     ```
  2. Locate `PRJ3PRTF` under the **File** column.
  3. Enter option **5** (Display) next to `PRJ3PRTF` and press **Enter** to inspect the report layout.

* **Via IBM i Access Client Solutions (ACS):**
  1. From the main ACS interface, select **Printer Output**.
  2. Locate and open the generated `PRJ3PRTF` file to review formatted output, verify initial extraction, and compare totals against `PROJECT 3-OUTPUT.pdf`.