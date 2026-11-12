# Project 8: Class Offerings at Wibaux University

## Overview
This project generates a comprehensive Class Offerings report for Wibaux University by demonstrating relational database processing in ILE RPG. Developed as a batch processing application on the IBM i platform, the program sequentially processes a primary file containing scheduled class sections (`WUSCTP`) and uses a composite key to randomly access (`CHAIN`) a secondary course master file (`WUCRSP`) to retrieve detailed course titles and credit values. The output is a formatted multi-column printer file (`PRJ8PRTF`) that handles both matched records and exception reporting for invalid course references.

---

## File Directory

### Source Files

* **`PROJECT8.rpgle`**: The primary batch application logic written in fully free-form RPGLE (`**FREE`). Implements dual file declarations with the `Keyed` keyword, sequential processing (`READ`), and random record retrieval (`CHAIN`) using a composite key (`DEPT: CRSNO`). The program evaluates the `%Found` built-in function to determine whether to write a standard detail line or an error line.

* **`PRJ8PRTF.prtf`**: The external printer file Data Description Specifications (DDS). Defines report page headers, multi-field matched course records (`DETAIL`), and missing course exception records (`ERROR`). Utilizes the `REFFLD` keyword to inherit field attributes directly from the `WUCRSP` database file.

### Documentation & Reference Materials (`Docs/`)

* **`Chapter 9 - Accessing and Updating Database Files.pdf`**: Lecture slide presentation covering sequential access (`READ`), random access (`CHAIN`), composite/concatenated keys, and file I/O resulting indicators (`%EOF`, `%Found`).

* **`Project 8 Instructions.pdf`**: The course assignment specifications, business logic rules, database schemas for `WUSCTP` and `WUCRSP`, and layout directives for generating the report via RDi Report Designer.

* **`PROJECT8-OUTPUT.pdf`**: The final spool output report demonstrating sequential processing, successful course data retrieval via `CHAIN`, and "Course Not Found!" error exception lines for unmatched records.

* **`WUSCTP.PF-DTA.pdf`**: A reference printout showing the raw schedule section records contained in the `WUSCTP` physical database file.

* **`WUCRSP.PF-DTA.pdf`**: A reference printout showing the raw course master records contained in the `WUCRSP` physical database file.

---

## Physical File Structures

The application relies on a one-to-many relationship between the course master file (`WUCRSP`) and the scheduled sections file (`WUSCTP`).

### 1. Current Sections File (`WUSCTP`)
The primary transactional file read sequentially by the program. It contains specific scheduled instances of a course. It is keyed on `SECTION`.

| Field Name | Data Type & Length      | Dec | Description |
| :--------- | :---------------------- | :-: | :------------------------- |
| `SECTION`  | Zoned Decimal (`S`) / 5 |  0  | Section Number (Unique Key)|
| `DEPT`     | Character (`A`) / 3     |     | Course Department          |
| `CRSNO`    | Zoned Decimal (`S`) / 3 |  0  | Course Number              |
| `SECTIM`   | Zoned Decimal (`S`) / 4 |  0  | Meeting Time               |
| `SECDAY`   | Character (`A`) / 3     |     | Meeting Days               |
| `ROOM`     | Character (`A`) / 4     |     | Room                       |
| `CAP`      | Zoned Decimal (`S`) / 3 |  0  | Maximum Enrollment         |
| `CURENL`   | Zoned Decimal (`S`) / 3 |  0  | Current Enrollment         |
| `INSTNO`   | Zoned Decimal (`S`) / 9 |  0  | Instructor SSN             |

### 2. Course Master File (`WUCRSP`)
The secondary master file accessed randomly (via `CHAIN`). It is defined with a composite key comprised of `DEPT` and `COURSE`.

| Field Name | Data Type & Length      | Dec |    Key    | Description |
| :--------- | :---------------------- | :-: | :-------: | :------------------------- |
| `DEPT`     | Character (`A`) / 3     |     | **Key 1** | Course Department          |
| `COURSE`   | Character (`A`) / 3     |     | **Key 2** | Course Number              |
| `CRSTTL`   | Character (`A`) / 25    |     |           | Course Title               |
| `CREDIT`   | Zoned Decimal (`S`) / 1 |  0  |           | Credits                    |

---

## Technical Program Flow & Execution

The program executes through three sequential phases:

1. **Environment Setup & File Declarations:**
   * Declares `WUSCTP` (Sections) and `WUCRSP` (Courses) for sequential and random disk input with the `Keyed` keyword (`Usage(*Input) Keyed`).
   * Declares `PRJ8PRTF` for printer output (`Usage(*Output)`) bound to the `EndOfPage` overflow indicator.

2. **Sequential Read & Random Chain (`CHAIN`):**
   * **Priming Read**: Executes an initial sequential `READ` against the sections file (`WUSCTP`).
   * **Processing Loop (`DOW NOT %Eof(WUSCTP)`)**: Cycles through all section records:
     * Checks `EndOfPage`: If active, writes the `HEADING` record format and resets `EndOfPage = *Off`.
     * **Composite Key Lookup**: Executes `Chain (DEPT: CRSNO) WUCRSP;` to locate the corresponding master course record. RPG seamlessly handles the conversion of the numeric `CRSNO` from the sections file to match the character `COURSE` key in the master file.
     * Evaluates `%Found(WUCRSP)`:
       * **If True:** Writes the standard `DETAIL` record containing the retrieved course title and credits.
       * **If False:** Writes the exception `ERROR` record ("Course Not Found!").
     * Issues the next sequential `READ` against `WUSCTP`.

3. **Program Termination:**
   * Upon reaching end-of-file for `WUSCTP`, exits the loop.
   * Sets `*INLR = *ON` to close files and return execution control to the operating system.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database files from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore Database Files from Master Save File `RPGIV5THSU.savf`

**Step 1: Create the target save file on IBM i**  
Run this command on your 5250 green screen command line:
```cl
CRTSAVF FILE(YOURLIB/RPGIV5THSU) TEXT('RPG IV 5th Ed Student Save File')
```

**Step 2: Upload `RPGIV5THSU.savf` to your IFS home directory**  
1. Open IBM i Access Client Solutions (ACS) and select **Integrated File System**.
2. Navigate to your user home folder: `/home/USERNAME/`.
3. Upload `RPGIV5THSU.savf` from your local repository data assets folder.
4. Ensure **"Save to UTF-8 text file"** (or text conversion) is **UNCHECKED** so the stream file remains raw binary.

**Step 3: Copy the stream file into the save file object**  
Execute this command on the 5250 green screen command line:
```cl
CPYFRMSTMF FROMSTMF('/home/USERNAME/RPGIV5THSU.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/RPGIV5THSU.FILE') MBROPT(*REPLACE)
```

**Step 4: Restore the physical files**  
Execute `RSTOBJ` to extract both required files from the container into your active library:
```cl
RSTOBJ OBJ(WUSCTP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
RSTOBJ OBJ(WUCRSP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
```

### 2. Compile Printer File DDS
Place `PRJ8PRTF.prtf` into your source physical file `QDDSSRC` and compile:
```cl
CRTPRTF FILE(YOURLIB/PRJ8PRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ8PRTF)
```

### 3. Compile and Run the Program
Place `PROJECT8.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT8) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT8)
```

Execute the program from the 5250 command line:
```cl
CALL PGM(YOURLIB/PROJECT8)
```

### 4. View and Verify Spool Output
* **Via 5250 Green Screen:** Run `WRKSPLF`, locate `PRJ8PRTF`, and enter option **5** (Display).
* **Via IBM i Access Client Solutions (ACS):** Open **Printer Output**, locate `PRJ8PRTF`, and compare the generated output against `PROJECT8-OUTPUT.pdf` to ensure the `CHAIN` exception logic correctly printed the "Course Not Found!" lines.