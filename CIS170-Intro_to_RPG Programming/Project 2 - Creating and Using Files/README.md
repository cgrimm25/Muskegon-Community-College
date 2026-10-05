# Project 2: GTC Customer Accounts Report

## Overview
This project generates a formatted GTC Customer Accounts Report. Developed as a structured, read/write batch application on the IBM i platform, the program processes transactional account records sequentially from a physical database file (`GTCSTP`) and writes formatted lines out to an externally defined printer file (`PRJ2PRTF`) using fully free-form RPGLE logic (`**FREE`).

---

## File Directory

* **`PROJECT2.rpgle`**: The core application logic written in free-form RPGLE. Implements file declarations, an overflow indicator (`EndOfPage`), a priming read loop, dynamic page header control, detail line printing, and clean program termination (`*INLR = *ON`).
* **`PRJ2PRTF.prtf`**: The external printer file Data Description Specifications (DDS). Uses file-level database referencing (`REF(GTCSTP)`), system job dates (`*SYS *YY`), dynamic page counters (`PAGNBR`), telephone edit words (`EDTWRD`), and currency edit codes (`EDTCDE(J)` and `EDTCDE(J $)`).
* **`DATA.savf`**: An IBM i binary save file container housing the compiled `GTCSTP` physical data file along with all original test database records. Enables complete environment reproduction on any IBM i system.
* **`GTCSTP.PF-DTA.pdf`**: A reference printout showing the raw customer records contained within the `GTCSTP` database file.
* **`PROJECT 2-Output.pdf`**: The final spool file execution output demonstrating proper line spacing, phone number mask formatting, floating currency signs, and multi-page overflow control.
* **`Project 2 Instructions.pdf`**: The course assignment specifications, requirements outline, and report design guidelines.

---

## Physical File Structure (`GTCSTP`)
The underlying data layer is an externally defined physical database file (`PF-DTA`) with a unique primary key on `CPHONE`.

| Field Name | Data Type & Length       |  Dec  |    Key    | Column Heading Description          |
| :--------- | :----------------------- | :---: | :-------: | :---------------------------------- |
| `CPHONE`   | Zoned Decimal (`S`) / 10 |   0   | **Key 1** | Customer Phone Number               |
| `CLNAME`   | Character (`A`) / 15     |       |           | Last Name                           |
| `CFNAME`   | Character (`A`) / 10     |       |           | First Name                          |
| `CSTRET`   | Character (`A`) / 20     |       |           | Street Address                      |
| `CCITY`    | Character (`A`) / 15     |       |           | City                                |
| `CSTAT`    | Character (`A`) / 2      |       |           | State                               |
| `CZIP`     | Zoned Decimal (`S`) / 5  |   0   |           | Postal Zip Code                     |
| `CURBIL`   | Zoned Decimal (`S`) / 6  |   2   |           | Current Bill Amount                 |
| `AMTOWE`   | Zoned Decimal (`S`) / 6  |   2   |           | Total Amount Owed                   |
| `PAYDAT`   | Zoned Decimal (`S`) / 8  |   0   |           | Last Payment Date (Numeric)         |
| `PAYDATL`  | Date (`L`) / 10          |       |           | Last Payment Date (ISO Format)      |

---

## Technical Program Flow & Execution

The program executes through four sequential phases:

1. **Environment Setup & Named Constants:**
   * Tax rates are defined as named constants to avoid hardcoded values: `FedTaxRate` (`.18`), `StateTaxRate` (`.05`), and `FICArate` (`.0751`).
   * Declares `WUHRLYP` for sequential disk input (`Usage(*Input)`) and `PRJ3PRTF` for printer output (`Usage(*Output)`) bound to the `EndOfPage` overflow indicator.
   * Initializes `EndOfPage` to `*On` (`Inz(*On)`) so headers print on the first cycle.

2. **Data Structure Field Overlay:**
   * An unnamed data structure (`Dcl-ds *N`) declares `FNAME Char(10)` and overlays `INITIAL Char(1) Overlay(FNAME)`.
   * When `WUHRLYP` is read into memory, `FNAME` maps directly to this data structure, instantly extracting the first initial without substring functions.

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

## Environment Reproduction: Restoring Database & Running Code

### 1. Restore the Database File from `DATA.savf`

* **Step 1: Create the target save file on IBM i**  
  Run this command on your 5250 green screen command line:
  ```cl
  CRTSAVF FILE(YOURLIB/DATA) TEXT('Project 3 Data Save File')
  ```

* **Step 2: Upload `DATA.savf` to your IFS home directory**  
  1. Open IBM i Access Client Solutions (ACS) and select **Integrated File System**.
  2. Navigate to your user home folder: `/home/USERNAME/`.
  3. Upload `DATA.savf` from your local `Project 3` repository folder.
  4. Ensure **"Save to UTF-8 text file"** (or text conversion) is **UNCHECKED** so the file remains raw binary.

* **Step 3: Copy the stream file into the save file object**  
  Execute this command on the 5250 green screen command line:
  ```cl
  CPYFRMSTMF FROMSTMF('/home/USERNAME/DATA.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/DATA.FILE') MBROPT(*REPLACE)
  ```

* **Step 4: Restore the physical file and all records**  
  Execute `RSTOBJ` to restore `WUHRLYP` with all records into your library:
  ```cl
  RSTOBJ OBJ(WUHRLYP) SAVLIB(CGRIMM1) DEV(*SAVF) SAVF(YOURLIB/DATA) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored data**  
  Verify that all 17 records are present in the table:
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