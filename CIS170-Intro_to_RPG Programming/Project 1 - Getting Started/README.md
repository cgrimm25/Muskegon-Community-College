# Project 1: CloudServices 24/7 Inventory Report

## Overview
This project generates a formatted CloudServices 24/7 Inventory Report. Developed as a structured, read/write batch application on the IBM i platform, the program processes transactional inventory records sequentially from a physical database file (`CSINVP`) and writes formatted lines out to an externally defined printer file (`INVREPORT`) using fully free-form RPGLE logic (`**FREE`).

---

## File Directory

* **`PROJECT1.rpgle`**: The core application logic written in free-form RPGLE. Implements file declarations, an overflow indicator (`EndOfPage`), a priming read loop, dynamic page header control, detail line printing, and clean program termination (`*INLR = *ON`).
* **`INVREPORT.prtf`**: The external printer file Data Description Specifications (DDS). Defines page header constants, job dates (`*JOB`), dynamic page numbers (`PAGNBR`), detail row field mapping via `REFFLD`, and numeric edit formatting (`EDTCDE(K)` and `EDTCDE(N)`).
* **`DATA.savf`**: An IBM i binary save file container housing the compiled `CSINVP` physical data file along with all original test database records. Enables complete environment reproduction on any IBM i system.
* **`CSINVP.PF-DTA.pdf`**: A reference printout showing the raw production inventory records contained within the `CSINVP` database file.
* **`PROJECT 1-Output.pdf`**: The final spool file execution output demonstrating proper line spacing, numeric mask formatting, and multi-page overflow control.
* **`Project 1 Instructions.pdf`**: The course assignment specifications, requirements outline, and original visual printchart mockup.

---

## Physical File Structure (`CSINVP`)
The underlying data layer is an externally defined physical database file (`PF-DTA`) with a unique primary key on `PRODNO`.

| Field Name | Data Type & Length       |  Dec  |    Key    | Column Heading Description |
| :--------- | :----------------------- | :---: | :-------: | :------------------------- |
| `PRODNO`   | Zoned Decimal (`S`) / 6  |   0   | **Key 1** | Product Number             |
| `PRODTP`   | Character (`A`) / 3      |       |           | Product Type               |
| `PACT`     | Character (`A`) / 1      |       |           | Product Active Flag        |
| `DESCRP`   | Character (`A`) / 40     |       |           | Product Description        |
| `SELLPR`   | Zoned Decimal (`S`) / 6  |   2   |           | Selling Price              |
| `SHIPWT`   | Zoned Decimal (`S`) / 5  |   0   |           | Shipping Weight (Lbs-Oz)   |
| `QTYOH`    | Packed Decimal (`P`) / 4 |   0   |           | Quantity On Hand           |
| `RORPNT`   | Packed Decimal (`P`) / 4 |   0   |           | Reorder Point              |
| `RORQTY`   | Packed Decimal (`P`) / 4 |   0   |           | Reorder Quantity           |
| `RORCOD`   | Character (`A`) / 1      |       |           | Reorder Code               |
| `SUPCOD`   | Character (`A`) / 3      |       |           | Supplier Code              |
| `SHPCST`   | Zoned Decimal (`S`) / 5  |   2   |           | Shipping Cost              |
| `CURCST`   | Zoned Decimal (`S`) / 6  |   2   |           | Current Cost               |
| `AVGCST`   | Zoned Decimal (`S`) / 6  |   2   |           | Average Cost               |

---

## Technical Program Flow & Execution
The RPGLE program runs sequentially through three stages:

1. **File Declaration & State Initialization:**
   * Declares `CSINVP` for sequential disk input (`Usage(*Input)`).
   * Declares `INVREPORT` for printer output (`Usage(*Output)`) bound to the explicit overflow indicator `Oflind(EndOfPage)`.
   * Initializes `EndOfPage` to `*On` (`Inz(*On)`) so the header prints immediately on the first iteration.

2. **The Priming Read & Processing Loop:**
   * **Priming Read**: Issues the initial `Read CSINVP` before entering the loop to establish baseline file status.
   * **Loop Iteration (`DOW NOT %EOF`)**: Continuously cycles while records exist.
     * Evaluates `EndOfPage`: If `*On`, writes the `HEADS` record format, printing the report title, system job date, page counter, and column headers, then resets `EndOfPage = *Off`.
     * Flushes current record buffer fields to the spool file using `Write Detail`.
     * Executes a subsequent `Read CSINVP` to fetch the next record.

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
  CRTSAVF FILE(YOURLIB/DATA) TEXT('Project 1 Data Save File')
  ```

* **Step 2: Upload `DATA.savf` to your IFS home directory**
  1. Open IBM i Access Client Solutions (ACS) and select **Integrated File System**.
  2. Navigate to your user home folder: `/home/USERNAME/`.
  3. Upload `DATA.savf` from your local `Project 1 - Getting Started` repository folder.
  4. Ensure **"Save to UTF-8 text file"** (or text conversion) is **UNCHECKED** so the file remains raw binary.

* **Step 3: Copy the stream file into the save file object**
  Execute this command on the 5250 green screen command line:
  ```cl
  CPYFRMSTMF FROMSTMF('/home/USERNAME/DATA.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/DATA.FILE') MBROPT(*REPLACE)
  ```

* **Step 4: Restore the physical file and all records**
  Execute `RSTOBJ` to restore `CSINVP` with all records into your library:
  ```cl
  RSTOBJ OBJ(CSINVP) SAVLIB(CGRIMM1) DEV(*SAVF) SAVF(YOURLIB/DATA) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored data**
  Verify that all 123 records are present in the table:
  ```cl
  RUNQRY QRYFILE((YOURLIB/CSINVP))
  ```

---

### 2. Compile Printer File DDS
Place `INVREPORT.prtf` into your source physical file `QDDSSRC` and compile:
```cl
CRTPRTF FILE(YOURLIB/INVREPORT) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(INVREPORT)
```

---

### 3. Compile and Run the Program
Place `PROJECT1.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT1) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT1)
```

Run the program to generate the spooled report:
```cl
CALL PGM(YOURLIB/PROJECT1)
```

View the generated output in your spooled files:
```cl
WRKSPLF
```