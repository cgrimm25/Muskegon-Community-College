# Advanced RPG Project 7: Fun With Modular Programming & Parameter Architecture

## Overview
This project implements a fully decoupled, modular batch processing architecture on the IBM i platform using fully free-form ILE RPG, sub-program parameter exchanges, and an externally described printer file layout. Moving away from monolithic design methodologies, the solution leverages a central master driver program (`PRJ7CALLER`) to orchestrate database cursor iterations over a customer master physical file (`CSCSTP`). For each record fetched, the driver manages statically bound parameter exchanges (`CALLP`) across four independent, single-purpose called sub-programs (`MAKEID`, `MAKEPASS`, `MAKEFOUR`, and `MAKEDATE`). These sub-programs execute character translation, credential derivation, string slicing, and native date arithmetic before returning computed tokens back to the caller to stream a formatted audit log report (`PRJ07PRTF`).

---

## File Directory
* **`PRJ7CALLER.RPGLE`**: The central driver and calling program written in fully free-form RPGLE. It manages database record buffers, file cursors, loop conditions, page overflow structures, and coordinates parameter serialization.
* **`MAKEID.RPGLE`**: A specialized sub-program module that handles uppercase-to-lowercase translation and whitespace trimming to construct a normalized corporate user account string.
* **`MAKEPASS.RPGLE`**: A security profile sub-program module that extracts name initials, formats unique keys, and appends punctuation arrays to assemble automated customer passwords.
* **`MAKEFOUR.RPGLE`**: A data masking and parsing module that isolates and returns the terminal four digits of a packed decimal telephone field.
* **`MAKEDATE.RPGLE`**: A date transformation and arithmetic module that marshals legacy decimal date values into native ISO representations and projects a 30-day transactional milestone.
* **`PRJ07PRTF.PRTF`**: The externally described printer file Data Description Specifications (DDS) defining vertical spacing controls, system date tokens, page counters, and formatted text masks.
* **`Project 7 Instructions.pdf`**: The official design blueprint defining required sub-program prototypes, parameter mapping constraints, and visual reporting specifications.
* **`CSCSTP.PF-DTA.pdf`**: A diagnostic system print stream showcasing the raw production records housed within the master customer database table.
* **`PRJ7CALLER-OUTPUT.pdf`**: The final spooled output print stream confirming clean text alignment, successful parameter calculations, and date projection math.

---

## Customer Master Schema (`CSCSTP`)
The central calling program processes records sequentially from the externally described physical inventory model for CloudServices247:

| Field Name | Type / Length | Description / Data Labels |
| :--- | :--- | :--- |
| `CUSTNO` | Zoned (`S`) / 6 | Unique Customer Account Identification Key |
| `CFNAME` | Character (`A`) / 10 | Given First Name (Stored in Uppercase) |
| `CLNAME` | Character (`A`) / 15 | Family Last Name (Stored in Uppercase) |
| `CSTREET` | Character (`A`) / 20 | Street Address Ledger Field |
| `CCITY` | Character (`A`) / 15 | Municipal City Designation |
| `CSTATE` | Character (`A`) / 2 | Two-Character State Code |
| `CZIP` | Character (`A`) / 9 | Full Zip+4 Postal Code Block |
| `CPHONE` | Zoned (`S`) / 10 | Raw Customer Telephone Number |
| `CALPHONE` | Zoned (`S`) / 10 | Alternate Telephone Suffix |
| `CEMAIL` | Character (`A`) / 35 | Corporate Customer Email Address |
| `ORDDAT` | Zoned (`S`) / 8 | Legacy Decimal Last Order Timestamp |
| `BALDUE` | Zoned (`S`) / 6 | Current Outstanding Financial Balance |

---

## Modular Sub-Program Specifications
Each sub-program module communicates exclusively via an explicit Procedure Interface (`Dcl-pi`) that strictly mirrors the corresponding prototypes (`Dcl-pr`) bound inside the calling environment.

### 1. `MAKEID` — User Account Generation
* **Input Parameters**: `CFNAME` (Char 10), `CLNAME` (Char 15), `CUSTNO` (Zoned 6) — Passed by constant reference (`Const`).
* **Output Parameter**: `USERID` (Char 33) — Passed by reference.
* **Logic**: Translates name parameters from uppercase to lowercase characters, trims trailing blank spaces, and concatenates the components using an explicitly injected period string separator (e.g., `john.doe.100001`).

### 2. `MAKEPASS` — Security Profile Generation
* **Input Parameters**: `CFNAME` (Char 10), `CLNAME` (Char 15), `CUSTNO` (Zoned 6) — Passed by constant reference (`Const`).
* **Output Parameter**: `PASSWORD` (Char 9) — Passed by reference.
* **Logic**: Converts the first initial of the first and last name to lowercase, appends the 6-digit customer number, and concludes with an exclamation point (e.g., `jd100001!`).

### 3. `MAKEFOUR` — Data Masking
* **Input Parameter**: `PACKCPHONE` (Packed 10).
* **Output Parameter**: `LAST4PHONE` (Char 4) — Passed by reference.
* **Logic**: Extracts the final four digits of a telephone number utilizing the `%Subst` built-in function to return a clean 4-character string.

### 4. `MAKEDATE` — Date Transformation
* **Input Parameter**: `ORDDAT` (Zoned 8) — Passed by constant reference (`Const`).
* **Output Parameter**: `SENDEMAILR` (Date *USA) — Passed by reference.
* **Logic**: Marshals the 8-digit numeric date into a native Date object, then utilizes built-in date arithmetic (`%Days`) to advance the milestone exactly 30 days into the future for an email reminder.

---

## Presentation Layer (`PRJ07PRTF`)
The output generation maps directly to the external printer file specifications:
* **Header Elements**: System Date (`DATE(*SYS *YY)`), hardcoded title `"Fun With Modular Programming"`, and standard Page Number auto-incrementing fields.
* **Detail Elements**: Generates the final stacked output layout showing the raw Customer Number alongside the derived User ID, Password, Last Four of Phone, and the formatted Send Email Reminder native date.

---

## Compilation Pipeline
Because this application architecture relies on dynamic external program calls, the sub-programs must be successfully compiled into standard `*PGM` objects prior to compiling and executing the master calling driver.

1.  Compile the Presentation Layer:
    `CRTPRTF FILE(YOURLIB/PRJ07PRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ07PRTF)`
2.  Compile the Sub-Program Modules:
    `CRTBNDRPG PGM(YOURLIB/MAKEID) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(MAKEID) OPTION(*NODEBUGIO)`
    `CRTBNDRPG PGM(YOURLIB/MAKEPASS) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(MAKEPASS) OPTION(*NODEBUGIO)`
    `CRTBNDRPG PGM(YOURLIB/MAKEFOUR) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(MAKEFOUR) OPTION(*NODEBUGIO)`
    `CRTBNDRPG PGM(YOURLIB/MAKEDATE) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(MAKEDATE) OPTION(*NODEBUGIO)`
3.  Compile and Execute the Caller:
    `CRTBNDRPG PGM(YOURLIB/PRJ7CALLER) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PRJ7CALLER) OPTION(*NODEBUGIO)`
    `CALL PGM(YOURLIB/PRJ7CALLER)`