# Project 6: Fun With Characters - Customer Credentials & Formatting Report

## Overview
This project constructs a character data manipulation and string normalization application on the IBM i platform to process records from the `CSCSTP` Customer Master File. The program reads alphanumeric and numeric data fields that are natively stored in uppercase formatting, executes advanced built-in character functions to derive new customized tracking tokens, and outputs the formatted records sequentially through a multi-line stacked layout structure using a single write action inside the loop.

---

## File Directory
* **`PROJECT6.RPGLE`**: The application source program written in fully free-form RPGLE. It manages input database cursor streams, maps translation arrays, manipulates dynamic lengths, and evaluates conditional string extractions.
* **`PRJ6PRTF.PRTF`**: The externally described printer file Data Description Specifications (DDS). It builds the interface report stack, tracks runtime page lines, and implements positional field locations.
* **`Project 6 Instructions.pdf`**: The official scope document detailing target field specifications, validation examples, built-in string rules, and evaluation criteria.
* **`PROJECT 6-OUTPUT.pdf`**: A sample printout of the final compiled report confirming perfect text casing translation, telephone mask integration, and zero-suppressed zip layout distribution.
* **`CSCSTP.PF-DTA.pdf`**: A reference lookup document displaying sample input records housed within the underlying production physical database layer.

---

## Physical File Schema (`CSCSTP`)
The processing loop sequentially reads data entries from an externally defined master file containing the following architectural layout:

| Field Name | Type / Length | Dec | Description / Data Labels |
| :--- | :--- | :--- | :--- |
| `CUSTNO` | Zoned (`S`) / 6 | 0 | Unique Customer Identification Key |
| `CENAME` | Character (`A`) / 10 | | First Name (Stored Upper Case) |
| `CLNAME` | Character (`A`) / 15 | | Last Name (Stored Upper Case) |
| `CSTREET` | Character (`A`) / 20 | | Street Address |
| `CCITY` | Character (`A`) / 15 | | City |
| `CSTATE` | Character (`A`) / 2 | | State Code |
| `CZIP` | Zoned (`S`) / 9 | 0 | Raw Zip + 4 Code String |
| `CPHONE` | Zoned (`S`) / 10 | 0 | Raw 10-Digit Primary Phone Number |
| `CALPHONE` | Zoned (`S`) / 10 | 0 | Raw 10-Digit Alternate Phone Number |
| `CEMAIL` | Character (`A`) / 35 | | Primary Email Account Address |
| `ORDDAT` | Zoned (`S`) / 8 | 0 | Last Order Commencement Date (`YYYYMMDD`) |
| `BALDUE` | Zoned (`S`) / 6 | 2 | Live Outstanding Accounts Balance |

---

## Core Technical Specs & String Handling Mechanics

### 1. Dynamic User ID Generation
The program builds a lowercase, professional workspace credential token (`USERID`) by performing casing conversions and character merging:
* **Case Translation (`%XLATE`)**: Scans upper-case text buffers (`CENAME` and `CLNAME`) against standard reference arrays to force string output down to lower-case.
* **Whitespace Pruning (`%TRIM`)**: Strips padding trailing spaces before appending components.
* **String Concatenation (`+`)**: Merges the lowercase first name, a structural dot delimiter (`.`), the lowercase last name, and the character-marshaled customer ID sequence (`%CHAR(CUSTNO)`).

### 2. Password Security Formulation
A standardized account authorization password (`PASSWORD`) is parsed out of the database elements:
* **Substring Partitioning (`%SUBST`)**: Targets and extracts the exact high-order starting character (position 1, length 1) from the translated lower-case name variables.
* **Token Merging**: Combines the lower-case first initial, the lower-case last initial, the unpadded text customer sequence, and appends a static terminal exclamation punctuation token (`!`).

### 3. Sentence-Case Name Normalization
To transform cold, database-wide uppercase blocks into polished layout entries (e.g., `John Doe`), the translation maps work snug with space injections:
* **Initial Capitalization**: The logic preserves the original uppercase character for the first position of the first and last name fields.
* **Lower-Case Translation**: Isolates character sequences from position 2 onward, forcing them to lower-case before trimming and re-assembling them into a single string container split by a clean single space separator.

### 4. Advanced Number Masking via Edit Words (`%EDITW`)
Because program-described text blocks inside `PRJ6PRTF` don't possess native DDS format codes, complex numeric string transformations are handled inside the application loop using explicit edit words:
* **Zip+4 Expansion**: Converts the raw 9-digit zoned zip field into a 10-character formatted string container, inserting a structural hyphen separator snug between the primary code block and the routing codes (e.g., `49442-1432`).
* **Telephone Normalization**: Marshals 10-digit zoned values (`CPHONE`) into clear corporate presentation strings, injecting parenthetical boundaries around area codes and mid-string dashes (e.g., `(231) 777-0523`).

### 5. Year Slicing from Variable Dates
Extracting the calendar year from the order date field (`ORDDAT`) presents an engineering challenge due to varying string lengths (7-digit versus 8-digit storage values). The loop resolves this via length evaluation:
* **String Conversion**: Casts the raw numeric field into an adjustable character string register (`MyDate`).
* **Conditional Parsing**: An `If/Else` evaluation tests string lengths. If `MyDate` evaluates to 7 digits, a 4-character substring is extracted from position 4 to isolate the year. Otherwise, it safely isolates the year block from position 5 to guarantee layout consistency across older legacy entries.