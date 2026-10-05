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

The RPGLE program runs sequentially through three stages:

1. **File Declaration & State Initialization:**
   * Declares `GTCSTP` for sequential disk input (`Usage(*Input)`).
   * Declares `PRJ2PRTF` for printer output (`Usage(*Output)`) bound to the explicit overflow indicator `Oflind(EndOfPage)`.
   * Initializes `EndOfPage` to `*On` (`Inz(*On)`) so the report header prints immediately on the first iteration.

2. **The Priming Read & Processing Loop:**
   * **Priming Read**: Issues the initial `Read GTCSTP` before entering the loop to establish baseline file status.
   * **Loop Iteration (`DOW NOT %EOF`)**: Continuously cycles while records exist.
     * Evaluates `EndOfPage`: If `*On`, writes the `HEADING` record format, printing the report title, system date, page counter, and column headers, then resets `EndOfPage = *Off`.
     * Flushes current record buffer fields to the spool file using `Write Detail`.
     * Executes a subsequent `Read GTCSTP` to fetch the next record.

3. **Termination:**
   * When `%EOF` evaluates to true, exits the `DOW` loop.
   * Sets `*INLR = *On` to release object locks, flush buffers, close files, and return execution to the operating system.

---

## Environment Reproduction: Restoring Database & Running Code

Follow these steps to restore the test database and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore the Database File from `DATA.savf`

* **Step 1: Create the target save file on IBM i**
  Run this command on your 5250 green screen command line:
  ```cl
  CRTSAVF FILE(YOURLIB/DATA) TEXT('Project 2 Data Save File')
  ```

* **Step 2: Upload `DATA.savf` to your IFS home directory**
  1. Open IBM i Access Client Solutions (ACS) and select **Integrated File System**.
  2. Navigate to your user home folder: `/home/USERNAME/`.
  3. Upload `DATA.savf` from your local `Project 2` repository folder.
  4. Ensure **"Save to UTF-8 text file"** (or text conversion) is **UNCHECKED** so the file remains raw binary.

* **Step 3: Copy the stream file into the save file object**
  Execute this command on the 5250 green screen command line:
  ```cl
  CPYFRMSTMF FROMSTMF('/home/USERNAME/DATA.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/DATA.FILE') MBROPT(*REPLACE)
  ```

* **Step 4: Restore the physical file and all records**
  Execute `RSTOBJ` to restore `GTCSTP` with all records into your library:
  ```cl
  RSTOBJ OBJ(GTCSTP) SAVLIB(CGRIMM1) DEV(*SAVF) SAVF(YOURLIB/DATA) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored data**
  Verify that all 71 records are present in the table:
  ```cl
  RUNQRY QRYFILE((YOURLIB/GTCSTP))
  ```

---

### 2. Compile Printer File DDS
Place `PRJ2PRTF.prtf` into your source physical file `QDDSSRC` and compile:
```cl
CRTPRTF FILE(YOURLIB/PRJ2PRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ2PRTF)
```

---

### 3. Compile and Run the Program
Place `PROJECT2.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT2) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT2)
```

Run the program to generate the spooled report:
```cl
CALL PGM(YOURLIB/PROJECT2)
```

View the generated output in your spooled files:
```cl
WRKSPLF
```