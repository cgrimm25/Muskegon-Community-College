# Project 6: Processing Character Data
# Fun With Characters

## Overview
This project implements character manipulation, string evaluation, and custom data formatting techniques on the IBM i platform using fully free-form ILE RPG (`**FREE`) and Data Description Specifications (DDS). Focusing on concepts from Chapter 7 of *Programming in ILE RPG*, the application processes the customer master file (`CSCSTP`) and generates a formatted multi-line customer directory report (`PRJ6PRTF`).

Unlike single-line column reports, this project formats individual customer account records across a multi-tier vertical detail block. It utilizes RPG IV built-in functions including translation (`%XLATE`), extraction (`%SUBST`), whitespace trimming (`%TRIM`), string conversion (`%CHAR`, `%DEC`), length inspection (`%LEN`), edit words (`%EDITW`), and edit codes (`%EDITC`) to build sanitized and formatted account credentials from raw uppercase database fields.

---

## File Directory

### Source Files
* **`PRJ6PRTF.prtf`**: External printer file definition constructed in DDS. Defines the report page headers (`HEADING`) with run date, centered report title, zero-suppressed page counter (`PAGNBR`), and multi-line customer detail records (`DETAIL`) referencing base customer fields (`CUSTNO`) and placeholder definitions for all calculated character fields.
* **`PROJECT6.rpgle`**: Fully free-form batch RPGLE program (`**FREE`). Sequentially reads `CSCSTP`, transforms raw character and numeric data into formatted account identifiers and masks, checks for page overflow conditions, and writes formatted customer detail blocks to `PRJ6PRTF`.

### Documentation & Reference Materials (`Docs/`)
* **`03 PROJECT6-RPGLE.pdf`**: Compiler listing verification showing complete source statements, cross-reference tables, and successful compilation indicators (`*RNF7031`, `*RNF7066`).
* **`06 Project 6-Output.pdf`**: The target spool file report demonstrating exact output layout, character casing, edit masks, and page boundary formatting.
* **`Chapter 7 - Processing Character Data.pdf`**: Course lecture slides covering character operations, assignment rules (`EVAL`, `EVALR`), figurative constants, built-in functions (`%TRIM`, `%SUBST`, `%XLATE`, `%SCAN`), and character conversion.
* **`CSCSTP.PF-DTA.pdf`**: Physical database printout displaying the raw input customer records, addresses, telephone numbers, order dates, and balance figures.
* **`Project 6 Instructions.pdf`**: The course assignment specifications, business rules, field manipulation requirements, and layout guidelines.
* **`Project 6 Tips.pdf`**: Guidance on SEU lowercase typing, declaring standalone variables, string trimming, and combining `%SUBST` with string concatenation.

### External References & Documentation

* **[MidrangeWiki - RPG Built-In Functions](https://wiki.midrange.com/index.php/RPG_Built_In_Functions)**: Reference guide and syntax catalog for built-in functions available in ILE RPG.
* **[IBM Documentation - Built-in Functions (IBM i 7.4)](https://www.ibm.com/docs/en/i/7.4.0?topic=functions-built-in)**: Official IBM knowledge center reference for ILE RPG built-in functions (`%SUBST`, `%XLATE`, `%TRIM`, `%EDITW`, `%EDITC`, `%LEN`, etc.).
* **[Jay Moseley's RPG Tutorial - Lesson 11 (Edit Codes & Edit Words)](https://www.jaymoseley.com/hercules/rpgtutor/rpg011.htm)**: In-depth tutorial covering formatting rules, zero suppression, punctuation insertion, and digit replacement using edit words and codes.

---

## Technical Summary & Character Manipulation Logic

The application processes each incoming record from `CSCSTP` through dedicated character handling functions to populate the output detail fields:

### 1. User ID Generation (`USERID`)
* **Requirement**: Full first name in lowercase, followed by a period, full last name in lowercase, followed by a period, and the numeric customer number.
* **Implementation**: Uses `%XLATE` with `Uppercase` and `Lowercase` constants to shift character cases, `%TRIM` to strip trailing blanks from variable-length names, and `%CHAR` to convert `CUSTNO`:
  ```rpgle
  USERID = %TRIM(%XLATE(Uppercase:Lowercase:CFNAME)) + '.'
         + %TRIM(%XLATE(Uppercase:Lowercase:CLNAME)) + '.'
         + %CHAR(CUSTNO);
  ```

### 2. Password Generation (`PASSWORD`)
* **Requirement**: Customer's first initial in lowercase, last initial in lowercase, followed by the customer number, ending with an exclamation mark (`!`).
* **Implementation**: Translates names to lowercase, extracts the first character of each using `%SUBST(string:1:1)`, and concatenates the customer number and literal:
  ```rpgle
  PASSWORD = %SUBST(%XLATE(Uppercase:Lowercase:CFNAME):1:1)
           + %SUBST(%XLATE(Uppercase:Lowercase:CLNAME):1:1)
           + %CHAR(CUSTNO) + '!';
  ```

### 3. Proper Name Formatting (`NAME`)
* **Requirement**: First and last names formatted in title case (first letter capitalized, remaining letters lowercase) separated by exactly one space.
* **Implementation**: Uses `%XLATE` with a start position parameter of `2` (`%XLATE(from:to:string:start)`) to leave column 1 untouched while shifting the remainder to lowercase, concatenated with a single space:
  ```rpgle
  NAME = %TRIM(%XLATE(Uppercase:Lowercase:CFNAME:2)) + ' '
       + %TRIM(%XLATE(Uppercase:Lowercase:CLNAME:2));
  ```

### 4. Postal Code Masking (`ZIP`)
* **Requirement**: 9-digit postal code formatted into standard Zip+4 format (`XXXXX-XXXX`).
* **Implementation**: Converts the raw character zip `CZIP` to zoned decimal via `%DEC(CZIP:9:0)` and applies `%EDITW` using a 9-digit edit mask (`'0    -    '`):
  ```rpgle
  CUSTZIP = %DEC(CZIP:9:0);
  ZIP = %EDITW(CUSTZIP:'0    -    ');
  ```

### 5. Telephone Number Formatting (`PHONE`)
* **Requirement**: 10-digit telephone number formatted with parentheses and hyphenation: `(XXX)XXX-XXXX`.
* **Implementation**: Applies `%EDITW` directly to numeric `CPHONE` using the standard phone edit word:
  ```rpgle
  PHONE = %EDITW(CPHONE:'0(   )   -    ');
  ```

### 6. Order Year Extraction (`YEAROUT`)
* **Requirement**: Extract the 4-digit century/year (`YYYY`) from the packed/zoned order date (`ORDDAT`).
* **Implementation**: Accommodates varying date length representations (7-digit `MDDYYYY` vs. 8-digit `MMDDYYYY`) by converting to character via `%CHAR`, testing length with `%LEN`, and extracting the trailing 4 digits with `%SUBST`:
  ```rpgle
  MyDate = %CHAR(ORDDAT);
  If %LEN(MyDate) = 7;
    YEAROUT = %SUBST(MYDATE:4:4);
  ELSE;
    YEAROUT = %SUBST(MYDATE:5:4);
  ENDIF;
  ```

### 7. Balance Due Formatting (`BALANCE`)
* **Requirement**: Format numeric currency values with commas and suppress zero suppression except after decimal point.
* **Implementation**: Evaluated using edit code `1` (`EDTCDE('1')`):
  ```rpgle
  BALANCE = %EDITC(BALDUE:'1');
  ```

---

## Physical File Structure (`CSCSTP`)
Supplied via master course files, uniquely keyed on `CUSTNO`.

| Field Name | Type & Length | Dec | Description |
| :--- | :---: | :---: | :--- |
| `CUSTNO` | Packed Decimal (`P`) / 6 | 0 | Customer Number (Unique Key) |
| `CFNAME` | Character (`A`) / 10 | | First Name |
| `CLNAME` | Character (`A`) / 15 | | Last Name |
| `CSTREET` | Character (`A`) / 20 | | Street Address |
| `CCITY` | Character (`A`) / 15 | | City |
| `CSTATE` | Character (`A`) / 2 | | State Code |
| `CZIP` | Character (`A`) / 9 | | Zip+4 Postal Code |
| `CPHONE` | Packed Decimal (`P`) / 10 | 0 | Telephone Number |
| `CALPHONE` | Packed Decimal (`P`) / 10 | 0 | Alternate Phone Number |
| `CEMAIL` | Character (`A`) / 35 | | Email Address |
| `ORDDAT` | Packed Decimal (`P`) / 8 | 0 | Last Order Date (`MMDDYYYY` or `MDDYYYY`) |
| `BALDUE` | Packed Decimal (`P`) / 6 | 2 | Current Balance Due |

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore `CSCSTP` from Master Save File `RPGIV5THSU.savf`

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
  Execute `RSTOBJ` to extract `CSCSTP` from the `RPGIV5THSU` container into your active library:
  ```cl
  RSTOBJ OBJ(CSCSTP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
  ```

* **Step 5: Verify the restored table**  
  Confirm that customer records are present:
  ```cl
  RUNQRY QRYFILE((YOURLIB/CSCSTP))
  ```

---

### 2. Compile Printer File DDS
Place `PRJ6PRTF.prtf` into source physical file `QDDSSRC` and compile:
```cl
CRTPRTF FILE(YOURLIB/PRJ6PRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ6PRTF)
```

### 3. Compile Batch RPGLE Program
Place `PROJECT6.rpgle` into source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT6) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT6)
```

### 4. Run Application & Review Spooled Output
```cl
CALL PGM(YOURLIB/PROJECT6)
WRKSPLF
```
Select option **5** next to `PRJ6PRTF` to inspect the generated customer account report.