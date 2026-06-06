# Project 8: Random File Processing - Class Offerings Report

## Overview
This project implements a multi-file **Class Offerings Report** system for Wibaux University. It demonstrates random database access methodologies on the IBM i platform using free-form RPGLE. The program combines sequential file processing with random access processing by reading a master sections table line-by-line and dynamically executing a key-driven lookup (`CHAIN`) against a secondary course description table. It also resolves a common production database challenge involving a data type mismatch during search key construction.

---

## File Directory
* **`PROJECT8.RPGLE`**: The main free-form RPGLE source file implementing the sequential input loop, string type-conversions, random `CHAIN` lookups, and conditional layout record formatting logic.
* **`PRJ8PRTF.PRTF`**: The externally described printer file designed using the RDi Report Designer. It defines the visual canvas for the structural report headings, standard details, and custom exception/error formats.
* **`Project 8 Instructions.pdf`**: The official assignment requirements sheet specifying file structures, composite key definitions, and business logic.
* **`Project 8-OUTPUT.pdf`**: A sample printout of the final compiled report confirming accurate data matching, error tracking, and page overflow behavior.
* **`WUSCTP.PF-DTA.pdf`**: A reference dump of the raw production records stored inside the master Sections physical database file.
* **`WUCRSP.PF-DTA.pdf`**: A reference dump of the raw validation records stored inside the master Course physical database file.

---

## Database Schema Reference

The application processes data across two distinct physical files located within the library workspace:

### 1. Sections Master File (`WUSCTP`)
Processed sequentially as the primary drive file for the report loop:
* **`SECTION`**: Zoned Decimal (5,0) representing the unique section number.
* **`DEPT`**: Character (3) storing the course department code (e.g., `'ACT'`, `'BIO'`).
* **`CRSNO`**: Zoned Decimal (3,0) storing the specific course number (**Numeric Storage**).
* **`SECTIM`**: Zoned Decimal (4,0) tracking class meeting times.
* **`SECDAY`**: Character (3) logging days of the week.
* **`ROOM`**: Character (4) tracking the facility room assignment.

### 2. Course Reference File (`WUCRSP`)
Accessed randomly within the primary processing loop via an explicit composite access path key:
* **`DEPT`**: Character (3) serving as **Composite Key 1**.
* **`COURSE`**: Character (3) serving as **Composite Key 2** (**Alphanumeric Storage**).
* **`CRSTTL`**: Character (25) storing the official descriptive course title.
* **`CREDIT`**: Zoned Decimal (1,0) representing academic credit hours.

---

## Core Program Logic & Operations

### 1. Key Type-Mismatch Resolution
The random retrieval requires building a search key matching the composite access path of `WUCRSP` (`DEPT` + `COURSE`). However, a structural field mismatch exists between files: `WUCRSP.COURSE` is defined as alphanumeric text, whereas `WUSCTP.CRSNO` is defined as numeric. 

The program dynamically resolves this inside the `CHAIN` statement by using the character conversion built-in function (`%CHAR`) to marshal the numeric course field into a temporary string variable matching the reference file layout:
```rpgle
Chain (DEPT: %Char(CRSNO)) WUCRSP;