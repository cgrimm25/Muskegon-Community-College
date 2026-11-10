# Project 7: Instructor Retirement Report

## Overview
This project generates a formal Instructor Retirement Report for Wibaux University's HR department. Developed as a structured batch processing application on the IBM i platform, the program processes instructor records sequentially from an externally defined logical file (`INSTRUCTLF`) ordered alphabetically by instructor last name and first name. It calculates retirement eligibility dates (hire date + 30 years), computes remaining years until retirement against the current system date, formats concatenated names, calculates average faculty wages, and outputs formatted detail lines and summary grand totals to an external printer file (`RETIREREP`).

---

## File Directory

### Source Files

* **`INSTRUCTLF.lf`**: External logical file built over the instructor physical master file (`WUINSTP`). Defines a keyed sequence ordered by Last Name (`ILNAME`) followed by First Name (`IFNAME`) to satisfy alphabetical reporting requirements.

* **`PROJECT7.rpgle`**: The primary batch application logic written in fully free-form RPGLE (`**FREE`). Implements file declarations with the `Keyed` keyword, system date retrieval, native date arithmetic using the `+ %Years()` duration function, difference calculations via `%Diff`, name concatenation, inline count and salary accumulators, and spool file output control.

* **`RETIREREP.prtf`**: The external printer file Data Description Specifications (DDS). Utilizes file-level referencing (`REF(INSTRUCTLF)`), system job date formatting, page numbering (`EDTCDE(1)`), native USA date formats (`DATFMT(*USA)`), negative-capable years remaining (`EDTCDE(N)`), and summary total formatting with edit codes (`EDTCDE(1)` and `EDTCDE(J)`).

### Documentation & Reference Materials (`Docs/`)

* **`Chapter 8 - Working with Dates.pdf`**: Lecture slide presentation covering native date data types, date formatting (`*USA`, `*ISO`), typed literals, date arithmetic durations (`%Years`), and difference functions (`%Diff`).

* **`Project 7 Instructions.pdf`**: The course assignment specifications, business logic rules, retirement eligibility criteria (30 years of service), and print chart layout.

* **`PROJECT7-OUTPUT.pdf`**: The final spool output report demonstrating alphabetical sorting, date calculations, name formatting, and grand total salary summaries.

* **`WUINSTP.PF-DTA.pdf`**: A reference printout showing the raw instructor master records contained in the `WUINSTP` physical database file.

---

## Physical File Structure (`WUINSTP`)
The underlying data layer is an externally defined physical database file (`PF-DTA`) with a unique primary key defined on `INSTNO`. 

*(Note: Alphabetical sorting is handled by the logical file `INSTRUCTLF`, which keys on `ILNAME` and `IFNAME`).*

| Field Name | Data Type & Length      | Dec |    Key    | Column Heading Description |
| :--------- | :---------------------- | :-: | :-------: | :------------------------- |
| `INSTNO`   | Zoned Decimal (`S`) / 9 |  0  | **Key 1** | Instructor SSN             |
| `IFNAME`   | Character (`A`) / 10    |     |           | First Name                 |
| `ILNAME`   | Character (`A`) / 15    |     |           | Last Name                  |
| `DEPT`     | Character (`A`) / 3     |     |           | Course Department          |
| `SALARY`   | Zoned Decimal (`S`) / 8 |  2  |           | Salary                     |
| `RANK`     | Character (`A`) / 1     |     |           | Academic Rank              |
| `SEX`      | Character (`A`) / 1     |     |           | Sex                        |
| `HIRDAT`   | Zoned Decimal (`S`) / 8 |  0  |           | Date of Hire (CCYYMMDD)    |
| `MARSTS`   | Character (`A`) / 1     |     |           | Marital Status             |
| `DEPEND`   | Zoned Decimal (`S`) / 2 |  0  |           | Dependents                 |
| `TENURE`   | Character (`A`) / 1     |     |           | Tenured                    |
| `TITLE`    | Character (`A`) / 1     |     |           | Preferred Title            |
| `STREET`   | Character (`A`) / 20    |     |           | Street Address             |
| `CITY`     | Character (`A`) / 15    |     |           | City                       |
| `STATE`    | Character (`A`) / 2     |     |           | State                      |
| `ZIP`      | Zoned Decimal (`S`) / 9 |  0  |           | Zip Code                   |
| `IEMAIL`   | Character (`A`) / 30    |     |           | Instructor Email           |

---

## Technical Program Flow & Execution

The program executes through three sequential phases:

1. **Environment Setup & File Declarations:**
   * Declares `INSTRUCTLF` for sequential disk input with the `Keyed` keyword (`Usage(*Input) Keyed`) to enforce alphabetical ordering.
   * Declares `RETIREREP` for printer output (`Usage(*Output)`) bound to the `EndOfPage` overflow indicator.
   * Initializes standalone variables including `EndOfPage` (`*On`), `Currentdate` (`*Sys`), and the grand total salary accumulator (`GSALARY`).

2. **Batch Processing Loop & Date Calculations:**
   * **Priming Read**: Executes an initial `READ INSTRUCTLF` before loop entry.
   * **Processing Loop (`DOW NOT %Eof`)**: Cycles through all instructor records:
     * Converts legacy numeric date (`HIRDAT`) to native date format (`HIREDATE = %Date(HIRDAT)`).
     * Calculates retirement eligibility date by adding 30 years: `RDATE = HireDate + %Years(30)`.
     * Computes years remaining until retirement against the system date: `RYEARS = %Diff(RDATE:Currentdate:*Years)`.
     * Concatenates and trims instructor names: `COMBINED = %TRIM(IFNAME) + ' ' + %TRIM(ILNAME)`.
     * Increments the instructor counter (`COUNT += 1`) and accumulates total salary (`GSALARY += SALARY`).
     * Checks `EndOfPage`: If active, writes the `HEADINGS` record format and resets `EndOfPage = *Off`.
     * Outputs formatted detail rows using `WRITE DETAIL` and reads the next record.

3. **Summary Calculations & Program Termination:**
   * Upon reaching end-of-file (`%EOF`), exits the loop and computes the half-adjusted average annual wage: `Eval(h) AVGWAGE = GSALARY / COUNT`.
   * Writes the summary footer once via `WRITE FOOTER`, displaying average wage and total instructors.
   * Sets `*INLR = *ON` to close all files, release system locks, and return execution control to the operating system.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore `WUINSTP` from Master Save File `RPGIV5THSU.savf`

Step 1: Create the target save file on IBM i
Run this command on your 5250 green screen command line:
```cl
CRTSAVF FILE(YOURLIB/RPGIV5THSU) TEXT('RPG IV 5th Ed Student Save File')
```

Step 2: Upload `RPGIV5THSU.savf` to your IFS home directory
1. Open IBM i Access Client Solutions (ACS) and select Integrated File System.
2. Navigate to your user home folder: `/home/USERNAME/`.
3. Upload `RPGIV5THSU.savf` from your local repository data assets folder.
4. Ensure "Save to UTF-8 text file" (or text conversion) is UNCHECKED so the stream file remains raw binary.

Step 3: Copy the stream file into the save file object
Execute this command on the 5250 green screen command line:
```cl
CPYFRMSTMF FROMSTMF('/home/USERNAME/RPGIV5THSU.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/RPGIV5THSU.FILE') MBROPT(*REPLACE)
```

Step 4: Restore the physical file and test records
Execute `RSTOBJ` to extract `WUINSTP` from the `RPGIV5THSU` container into your active library:
```cl
RSTOBJ OBJ(WUINSTP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
```

Step 5: Verify the restored table
Confirm that all 47 instructor records are present:
```cl
RUNQRY QRYFILE((YOURLIB/WUINSTP))
```

### 2. Compile Logical File DDS
Place `INSTRUCTLF.lf` into your source physical file `QDDSSRC` and compile:
```cl
CRTLF FILE(YOURLIB/INSTRUCTLF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(INSTRUCTLF)
```

### 3. Compile Printer File DDS
Place `RETIREREP.prtf` into your source physical file `QDDSSRC` and compile:
```cl
CRTPRTF FILE(YOURLIB/RETIREREP) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(RETIREREP)
```

### 4. Compile and Run the Program
Place `PROJECT7.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT7) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT7)
```

Execute the program from the 5250 command line:
```cl
CALL PGM(YOURLIB/PROJECT7)
```

### 5. View and Verify Spool Output
* Via 5250 Green Screen: Run `WRKSPLF`, locate `RETIREREP`, and enter option 5 (Display) to inspect the report layout and alphabetical sorting.
* Via IBM i Access Client Solutions (ACS): Open Printer Output, locate `RETIREREP`, and compare the generated output against `PROJECT7-OUTPUT.pdf`.