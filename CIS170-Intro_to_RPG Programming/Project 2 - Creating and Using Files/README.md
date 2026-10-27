# Project 2: Creating and Using Files
# GTC Customer Accounts Report

## Overview
This project generates a formatted GTC Customer Accounts Report. Developed as a structured, read/write batch application on the IBM i platform, the program processes transactional account records sequentially from a physical database file (`GTCSTP`) and writes formatted lines out to an externally defined printer file (`PRJ2PRTF`) using fully free-form RPGLE logic (`**FREE`).

---

## File Directory

### Source Files
* **`PROJECT2.rpgle`**: The core application logic written in free-form RPGLE. Implements file declarations, an overflow indicator (`EndOfPage`), a priming read loop, dynamic page header control, detail line printing, and clean program termination (`*INLR = *ON`).
* **`PRJ2PRTF.prtf`**: The external printer file Data Description Specifications (DDS). Defines page header constants, job dates, dynamic page numbers (`PAGNBR`), detail row field mapping via `REFFLD`, customer phone number edit words, and numeric edit formatting.

### Documentation & Reference Materials (`Docs/`)
* **`Chapter 3 - Creating and Using Files.pdf`**: Lecture slide presentation covering DDS physical file definitions, externally described printer files, record formats, field referencing, and file compilation workflows.
* **`DDS Display & Printer File Template.pdf`**: Reference template guide detailing DDS keyword syntax, edit codes, edit words, and spacing/skipping rules for display and printer files.
* **`GTCSTP.PF-DTA.pdf`**: A reference printout showing the raw customer account records contained within the `GTCSTP` database file.
* **`Printer Spacing Chart.pdf`**: Standard printer spacing chart (PSC) "printchart" layout grid specifying character column coordinates (1–62) and line positions (1–12) used to map and verify visual report layouts.
* **`Project 2 Instructions.pdf`**: The course assignment specifications, requirements outline, and original visual printchart mockup.
* **`PROJECT 2-Output.pdf`**: The final spool file execution output demonstrating proper line spacing, numeric mask formatting, and multi-page overflow control.

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

The RPGLE program executes sequentially through three stages:

1. **File Declaration & State Initialization:**
   * Declares `GTCSTP` for sequential disk input (`Usage(*Input)`).
   * Declares `PRJ2PRTF` for printer output (`Usage(*Output)`) bound to the explicit overflow indicator `Oflind(EndOfPage)`.
   * Initializes `EndOfPage` to `*On` (`Inz(*On)`) so the report headers print immediately on the first iteration.

2. **The Priming Read & Processing Loop:**
   * **Priming Read**: Issues the initial `Read GTCSTP` before entering the loop to establish baseline file status.
   * **Loop Iteration (`DOW NOT %EOF`)**: Continuously cycles while records exist:
     * Evaluates `EndOfPage`: If `*On`, writes the report header format containing the report title, system date, page counter, and column headers, then resets `EndOfPage = *Off`.
     * Flushes current record buffer fields to the spool file using `Write DETAIL`.
     * Executes a subsequent `Read GTCSTP` to fetch the next record.

3. **Termination:**
   * When `%EOF` evaluates to true, exits the `DOW` loop.
   * Sets `*INLR = *On` to release object locks, flush buffers, close files, and return execution to the operating system.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore `GTCSTP` from Master Save File `RPGIV5THSU.savf`

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
  Execute `RSTOBJ` to extract `GTCSTP` from the `RPGIV5THSU` container into your active library:
  ```cl
  RSTOBJ OBJ(GTCSTP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored table**  
  Confirm that all 71 customer account records are present:
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

---

### 4. View and Verify Spool Output

* **Via 5250 Green Screen:**
  1. Open your active spool files:
     ```cl
     WRKSPLF
     ```
  2. Locate `PRJ2PRTF` under the **File** column.
  3. Enter option **5** (Display) next to `PRJ2PRTF` and press **Enter** to inspect report column alignment and page breaks.

* **Via IBM i Access Client Solutions (ACS):**
  1. From the main ACS interface, open **Printer Output**.
  2. Locate and open the generated `PRJ2PRTF` file to review formatted output and compare against `PROJECT 2-Output.pdf`.