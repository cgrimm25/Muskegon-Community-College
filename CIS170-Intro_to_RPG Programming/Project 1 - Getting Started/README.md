# Project 1: CloudServices 24/7 Inventory Report

## Overview
This project generates a formatted CloudServices 24/7 Inventory Report. Developed as a structured, read/write batch application on the IBM i platform, the program processes transactional inventory records sequentially from a physical database file (`CSINVP`) and writes formatted lines out to an externally defined printer file (`INVREPORT`) using fully free-form RPGLE logic (`**FREE`).

---

## File Directory

### Source & Database Objects
* **`PROJECT1.rpgle`**: The core application logic written in free-form RPGLE. Implements file declarations, an overflow indicator (`EndOfPage`), a priming read loop, dynamic page header control, detail line printing, and clean program termination (`*INLR = *ON`).
* **`INVREPORT.prtf`**: The external printer file Data Description Specifications (DDS). Defines page header constants, job dates (`*JOB`), dynamic page numbers (`PAGNBR`), detail row field mapping via `REFFLD`, and numeric edit formatting (`EDTCDE(K)` and `EDTCDE(N)`).


### Documentation & Reference Materials (`Docs/`)
* **`Chapter 2 - Getting Started.pdf`**: Lecture slide presentation covering introductory RPGLE program structure, file description specifications, cycle vs. free-form looping, and basic IBM i output formatting.
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

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore `CSINVP` from Master Save File `RPGIV5THSU.savf`

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
  Execute `RSTOBJ` to extract `CSINVP` from the `RPGIV5THSU` container into your active library:
  ```cl
  RSTOBJ OBJ(CSINVP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored table**  
  Confirm that all 123 inventory records are present:
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

---

### 4. View and Verify Spool Output

* **Via 5250 Green Screen:**
  1. Open your active spool files:
     ```cl
     WRKSPLF
     ```
  2. Locate `INVREPORT` under the **File** column.
  3. Enter option **5** (Display) next to `INVREPORT` and press **Enter** to inspect report column alignment and page breaks.

* **Via IBM i Access Client Solutions (ACS):**
  1. From the main ACS interface, open **Printer Output**.
  2. Locate and open the generated `INVREPORT` file to review formatted output and compare against `PROJECT 1-Output.pdf`.