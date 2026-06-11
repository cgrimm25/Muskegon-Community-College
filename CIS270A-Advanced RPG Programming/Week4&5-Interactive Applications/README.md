# Advanced RPG Projects 4 & 5: Interactive Student Grade Calculator & Audit Log System

## Overview
This project implements an interactive, multi-screen transaction-processing application on the IBM i platform using fully free-form RPGLE, externally described relational database physical files, and a multi-panel workstation display configuration. The application delivers a robust data entry utility for educational administrators to query a master student database, verify enrollment integrity, input assignment evaluation parameters, and process defensive data validation traps via nested execution loops. Validated transaction details are dynamically converted into rounded percentage marks, evaluated against passing thresholds, rendered with responsive visual attributes, and committed to a production transactional audit log database.

---

## File Directory
* **`WUSTDP.PF`**: The master student profile physical database file. It serves as the primary un-keyed lookup file housing comprehensive student metadata records.
* **`POINTSP.PF` / `MYPOINTSP.PF`**: The transactional evaluation physical database file. It acts as an append-only ledger designed to record student project scores, description fields, and numeric targets.
* **`PROJ4_5.RPGLE`**: The core interactive processing application written in fully free-form RPGLE. It drives the event-driven workstation transaction block, executes random access index verification queries, enforces defensive data integrity validation loops, and runs calculation subroutines.
* **`PRJ045DSPF.DSPF`**: The externally described workstation display file. It houses the visual canvas and positional coordinates for three independent panel record formats (`SCRN1`, `SCRN2`, and `SCRN3`) tied to an isolated program indicator area layer.
* **`Project 4&5 Instructions.pdf`**: The official assignment requirements and technical design documentation detailing validation parameters, application behavior constraints, and visual presentation specifications.
* **`WUSTDP.PF-DTA.pdf`**: A diagnostic environment printout showing raw production student master records housed within the host table layer.
* **`POINTSP.PF-DTA.pdf`**: A diagnostic environment printout showcasing the append-only ledger entries recording student evaluation metrics.
* **`PROJECT4-OUTPUT.pdf`**: Screen captures of the live interactive terminal panels showing validation routines, input errors, and final transaction writes.

---

## Relational Database Architecture

The interactive system interfaces across two distinct physical file definitions to execute data validation, profile inheritance, and transaction logging operations:

### 1. Student Master Repository Schema (`WUSTDP`)
Sourced as a read-only referenced index to verify student status and inherit descriptive details into the entry panels.

| Field Name | Type / Length | Dec | Description / Data Labels |
| :--- | :--- | :--- | :--- |
| `STUSSN` | Zoned (`S`) / 9 | 0 | Unique Student Social Security Number (Primary Access Path Key) |
| `SLNAME` | Character (`A`) / 15 | | Student Last Name |
| `SFNAME` | Character (`A`) / 10 | | Student First Name |
| `SMNAME` | Character (`A`) / 10 | | Student Middle Name |
| `STREET` | Character (`A`) / 20 | | Street Address |
| `CITY` | Character (`A`) / 15 | | City |
| `STATE` | Character (`A`) / 2 | | State Code |
| `ZIP` | Zoned (`S`) / 9 | 0 | Zip+4 Postal Code |
| `PHONE` | Zoned (`S`) / 10 | 0 | Telephone Number |
| `CRDTOT` | Zoned (`S`) / 3 | 0 | Total Earned Academic Credits |
| `DCODE` | Character (`A`) / 1 | | Regional District Code |
| `ADMDAT` | Zoned (`S`) / 8 | 0 | Date Admitted Ledger (`CCYYMMDD`) |
| `CLASS` | Character (`A`) / 1 | | Academic Classification Flag |
| `GRDDAT` | Character (`A`) / 8 | | Date Graduated Record Layout |
| `SDEPT` | Character (`A`) / 3 | | Academic Department of Major Code |
| `GPA` | Zoned (`S`) / 3 | 2 | Cumulative Grade Point Average |
| `DEGREE` | Character (`A`) / 3 | | Degree Granted Identifier |
| `SEMAIL` | Character (`A`) / 30 | | Corporate Student Email Address |

### 2. Transaction Evaluation Log Schema (`MYPOINTSP`)
Configured as an output-only database table to write validated project transaction records. Fields utilize explicit column reference positioning (`REFFLD`) within the display panels.

| Field Name | Type / Length | Dec | Description / Data Labels |
| :--- | :--- | :--- | :--- |
| `STUNO` | Zoned (`S`) / 9 | 0 | Inherited Student Identification Number |
| `ASSIGNDESC`| Character (`A`) / 20 | | Master Assignment Text Description |
| `PTSRECEIVE`| Zoned (`S`) / 3 | 0 | Raw Evaluated Points Received by Student |
| `PTSPOSSIBL`| Zoned (`S`) / 3 | 0 | Maximum Point Limit Threshold Possible |

---

## Workstation Display Architecture & Interface Design

The display configuration utilizes an independent indicator area (`INDARA`) keyword to cleanly decouple display conditioning flags from the core RPG processing buffer, mapping functional logic fields to dedicated positional registers:

### 1. `SCRN1` — Student Verification Panel
* **Functional Purpose**: Prompts the operator to enter a valid student identification number.
* **Branding & Identity**: Displays system job dates (`DATE(*JOB)`) formatted via a standard edit code and establishes the developer profile signature line (**Programmer: Chris Grimm**).
* **Defensive Trap Execution**: Integrates field-level conditioning indicator `90`. If a queried student code is unmapped, the screen forces the cursor to position directly inside the input container via position cursor commands (`DSPATR(PC)`) and drops a non-destructive error message block (`ERRMSG`): `"Invalid Student Number"`.

### 2. `SCRN2` — Score Entry & Evaluation Panel
* **Functional Purpose**: Renders the verified student's full name alongside description and numeric input fields.
* **Profile Inheritance**: Dynamically maps output-only database fields `SLNAME` and `SFNAME` inherited from the successfully positioned `WUSTDP` record pointer.
* **Rigorous Input Constraints**: Implements dual field-level conditioning flags to trap invalid numeric entry bounds before allowing calculation updates:
  * **Indicator `91`**: Conditions a points received violation trap. If the operator enters a score exceeding the point limit boundary, it trips an evaluation warning: `"The points received cannot exceed the points possible."`
  * **Indicator `92`**: Conditions an absolute scale limit trap. If the maximum points field is evaluated as zero or a negative integer, it trips a structural formatting warning: `"The points possible cannot be zero or negative."`
  * Both exceptions lock the interface screen, trigger an audible error state, and position the display cursor (`DSPATR(PC)`) immediately onto the offending input field.

### 3. `SCRN3` — Administrative Academic Performance Sheet
* **Functional Purpose**: Renders final calculated performance metrics and performance grading feedback cards.
* **String Masking**: Displays the final computed score within a customized 5-digit decimal editing word template (`EDTWRD('  0.  %')`) to cleanly map trailing percent signs and handle zero suppression.
* **Responsive Layout Toggling**: Utilizes a combination of indicator states to dynamically shift terminal messaging styles based on passing criteria:
  * **Indicator `93` (`FAILOPASS`)**: Evaluates if the final numeric grade drops below a standard academic passing floor. If true, the layout selectively enables the `MSGF` field, outputting the text constant `"Student failed"` rendered in bright high-visibility text (`COLOR(RED)`).
  * **Indicator `N93`**: Evaluates if the grade meets or exceeds passing thresholds. If true, the layout shifts context to activate the `MSGP` container, displaying a clean `"Student passed"` message layout.

---

## Core Technical Specifications & Program Logic

The application workflow runs an event-driven master transaction execution block structured inside a continuous loop governed by functional workstation input vectors (`F3=Exit` and `F12=Cancel` command keys):

```rpgle
DOW Not Exit;
  Exfmt SCRN1;
  If Not Exit;
    INVSTUSSN = *OFF;
    Chain STUNO WUSTDP;
    INVSTUSSN = Not %Found(WUSTDP);
    
    If %Found(WUSTDP);
      Exfmt SCRN2;
      // Defensive loops and calculation logic process here...
    Endif;
  Endif;
Enddo;