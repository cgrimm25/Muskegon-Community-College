# Project 10: Interactive Applications Continued
# Student Exam Results

## Overview
This project builds upon the foundational interactive programming concepts introduced in Project 9 by requiring a fully custom IBM i interactive inquiry application designed from scratch. Utilizing Data Description Specifications (DDS) and free-form ILE RPG (`**FREE`), this application interfaces with the Wibaux University exam master file (`WUEXAMP`). The program prompts the user for a student's social security number, executes a random database lookup (`CHAIN`), and dynamically toggles between error validation states and a formatted output screen displaying the student's exam scores. 

---

## File Directory

### Source Files

* **`PROJECT10.rpgle`**: The primary interactive application logic written in fully free-form RPGLE. Declares the `WUEXAMP` physical file for keyed access and the `PRJ10DSPF` workstation file for the UI. Employs a custom indicator data structure (`Indds`) to manage the primary event loop (`DOW Not Exit`), handle command keys (F3, F12), and trigger the `INVSTUNO` (Invalid Student Number) validation flag when a `CHAIN` operation fails. 
* **`PRJ10DSPF.dspf`**: Custom external display file created via RDi Screen Designer. Defines two interactive formats:
  * **`SCRN1`**: The primary input prompt capturing the `STUNO` (Student Number) field, utilizing `ERRMSG` tied to indicator 90 for error conditioning.
  * **`SCRN2`**: The result view format displaying student names and test scores. Utilizes `REFFLD` at the file level to inherit data types, lengths, and constraints directly from the `WUEXAMP` database schema, formatted with the `EDTCDE(3)` edit code for numeric test score presentation.

### Documentation & Reference Materials (`Docs/`)

* **`Project 10 Instructions.pdf`**: The course assignment specifications outlining the requirements to select a database, design a two-screen UI from scratch, implement validation logic, and capture exact testing states.
* **`Project 10 Screenshots.pdf`**: Output verification confirming the successful deployment of the custom UI, displaying both a successful data retrieval (Student #269968069) and the proper triggering of the `Invalid Student Number` error message for an unmatched key.
* **`WUEXAMP.PF-DTA.pdf`**: The physical database printout serving as the reference table for valid student numbers and exam data used to test the interactive chains.
* **`BIDS.PF-DTA.pdf` / `WUHRLYP.PF-DTA.pdf`**: Alternative physical database options provided by the assignment prompt (unused in this implementation).

---

## Physical File Structure (`WUEXAMP`)

The assignment offered a choice between three relational tables. The application was built against `WUEXAMP`, but the inferred data dictionary schemas for all three files are documented below.

### 1. Exam Master File (`WUEXAMP`) - *Primary File Used*
The underlying transactional master file queried by user input (`STUNO`).

| Field Name | Data Type (Inferred) | Key | Description | 
| ----- | ----- | ----- | ----- | 
| `STUNO` | Zoned Decimal / 9,0 | **Key 1** | Student Soc. Sec. Number | 
| `SFNAME` | Character / 10 | | First Name | 
| `SLNAME` | Character / 15 | | Last Name | 
| `EXAM1` | Zoned Decimal / 3,0 | | Exam 1 Grade | 
| `EXAM2` | Zoned Decimal / 3,0 | | Exam 2 Grade | 
| `EXAM3` | Zoned Decimal / 3,0 | | Exam 3 Grade | 
| `EXAM4` | Zoned Decimal / 3,0 | | Exam 4 Grade | 
| `EXAM5` | Zoned Decimal / 3,0 | | Exam 5 Grade | 

### 2. Hourly Payroll File (`WUHRLYP`) - *Alternative Option*
A master file containing employee payroll and hourly wage data.

| Field Name | Data Type (Inferred) | Key | Description | 
| ----- | ----- | ----- | ----- | 
| `EMPNO` | Zoned Decimal / 9,0 | **Key 1** | Employee SSN | 
| `LNAME` | Character | | Last Name | 
| `FNAME` | Character | | First Name | 
| `REGHRS` | Zoned Decimal / 4,1 | | Regular Hours Worked | 
| `OTHRS` | Zoned Decimal / 4,1 | | Overtime Hours Worked | 
| `RATE` | Zoned Decimal / 5,2 | | Hourly Pay Rate | 
| `PAYCODE` | Character / 1 | | Payment/Status Code (e.g., W, B, M) | 
| `Hire Date`| Zoned Decimal / 8,0 | | Legacy Hire Date (CCYYMMDD) | 

### 3. Bids & Estimates File (`BIDS`) - *Alternative Option*
A transactional file containing construction, flooring, or material bid dimensions and costs.

| Field Name | Data Type (Inferred) | Key | Description | 
| ----- | ----- | ----- | ----- | 
| `JOBNO` | Zoned Decimal / 4,0 | **Key 1** | Job Number | 
| `PCODE` | Zoned Decimal / 5,0 | | Product Code |
| `PCOST` | Zoned Decimal / 5,2 | | Product Cost | 
| `COVRG` | Zoned Decimal / 3,0 | | Coverage Area | 
| `LENFT` | Zoned Decimal / 2,0 | | Length (Feet) | 
| `LENIN` | Zoned Decimal / 2,0 | | Length (Inches) | 
| `WIDFT` | Zoned Decimal / 2,0 | | Width (Feet) | 
| `WIDIN` | Zoned Decimal / 2,0 | | Width (Inches) | 
| `HTFT`  | Zoned Decimal / 2,0 | | Height (Feet) | 
| `HTIN`  | Zoned Decimal / 2,0 | | Height (Inches) | 
| `PCT`   | Zoned Decimal / 3,2 | | Percentage / Multiplier | 

---

## Technical Program Flow & Execution

The application employs a standard interactive control loop governed by the `EXFMT` operation code:

1. **Environment Setup:**
   * Declares `WUEXAMP` as a keyed input file and `PRJ10DSPF` as the `Workstn` UI.
   * Maps internal boolean flags (`Exit`, `Cancel`, `INVSTUNO`) to DDS indicators (03, 12, 90) via the `Indds(Indicators)` data structure.

2. **Interactive UI Loop (`DOW Not Exit`):**
   * **Prompt User**: Triggers `Exfmt SCRN1` to render the initial input screen and suspend program execution until the user presses Enter or a mapped command key.
   * **Database Lookup (`CHAIN`)**: If the user submits the form (Enter), the program executes `Chain STUNO WUEXAMP`. 
     * If the student number does not exist, indicator 90 (`INVSTUNO`) is evaluated to `*On` via `Not %Found(WUEXAMP)`. The loop restarts, triggering the `ERRMSG` keyword in the DDS to display "Invalid Student Number".
     * If the student number is found, the program falls through to `Exfmt SCRN2`.
   * **Display Results**: `SCRN2` renders the student's name and exam data inherited from the file buffer. The user can press Enter or F12 (Cancel) to return to `SCRN1`, or F3 to exit entirely.

3. **Program Termination:**
   * If `F3` is pressed on either screen, Indicator 03 resolves `Not Exit` to false, breaking the loop.
   * The program executes `*INLR = *ON` to close files, release locks, and terminate.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore Database File from Master Save File `RPGIV5THSU.savf`

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

**Step 4: Restore the physical file**  
Execute `RSTOBJ` to extract the required exam master file into your active library:
```cl
RSTOBJ OBJ(WUEXAMP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
```

### 2. Compile Display File DDS
Place `PRJ10DSPF.dspf` into your source physical file `QDDSSRC` and compile using `CRTDSPF` (Create Display File):
```cl
CRTDSPF FILE(YOURLIB/PRJ10DSPF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ10DSPF)
```

### 3. Compile and Run the Program
Place `PROJECT10.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT10) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT10)
```

Execute the program from the 5250 command line:
```cl
CALL PGM(YOURLIB/PROJECT10)
```

### 4. Interactive Testing
Test the custom UI validation logic using the following inputs:
* **Successful Chain**: Enter `269968069`.
* **Invalid Student Number (Ind 90)**: Enter `999999999`.