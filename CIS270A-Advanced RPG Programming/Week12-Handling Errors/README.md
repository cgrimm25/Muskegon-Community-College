# CIS 270A Project 10: Error Handling and Exception Monitoring in ILE RPG

## Overview
This project explores defensive programming techniques in fully free-form ILE RPG to handle runtime exceptions that would otherwise result in abnormal program terminations. The application intentionally forces systemic errors—such as database I/O failures, division by zero, and array bound violations—to demonstrate how to cleanly trap and recover from these conditions using operation extenders, built-in functions, and structural monitor blocks.

---

## File Directory
* **`PROJ10A.RPGLE`**: The Part 1 & 2 logic program. It triggers an intentional I/O error (by closing `MYCSTP` before chaining) and traps it using the `(e)` operation extender and `%Error` built-in function.
* **`PRJ10AP1.PRTF` & `PRJ10AP2.PRTF`**: The externally described printer files for outputting reports and error lines for Project 10-A.
* **`PROJ10B.RPGLE`**: The Part 3 logic program. It transitions from localized extenders to structural block monitoring using `Monitor`, `On-error *File`, and a generic `On-error *All` catch-all.
* **`PRJ10BPRTF.PRTF`**: The externally described printer file for Project 10-B.
* **`PROJ10ERR.RPGLE`**: The Part 4 logic program. It implements precision error trapping by isolating offending code blocks and monitoring for specific IBM i system status codes.
* **`PRJ10CPRTF.PRTF`**: The externally described printer file for Project 10-C.

---

## Technical Implementation

### 1. Extenders and Built-In Functions (10-A)
To prevent a hard crash during file operations, the program utilizes the `(e)` extender directly on the operation code (e.g., `Chain(e)`). The logic then evaluates the `%Error` built-in function to gracefully route the execution flow to an error-handling subroutine.

### 2. Generic Monitor Blocks (10-B)
The mainline processing sequence is wrapped entirely within a `Monitor` block. 
* **`On-error *File`**: Specifically traps file-based errors (like attempting to read a closed file).
* **`On-error *All`**: Acts as a generic safety net for any other unhandled environmental failures.

### 3. Specific Status Code Monitoring (10-C)
The program isolates individual variables and arrays inside separate `Monitor` groups to trap exact programmatic violations using their IBM i system status codes:
* **`00102`**: Traps Division by Zero errors.
* **`00103`**: Traps Variable Too Small (Numeric Overflow) errors.
* **`00121`**: Traps Array Out of Bounds errors.

---

## Compilation Pipeline
To successfully deploy these modules, compile the printer files before binding the RPG programs. Use the following commands in your environment:

### Project 10-A
`CRTPRTF FILE(YOURLIB/PRJ10AP1) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ10AP1)`
`CRTPRTF FILE(YOURLIB/PRJ10AP2) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ10AP2)`
`CRTBNDRPG PGM(YOURLIB/PROJ10A) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJ10A) OPTION(*NODEBUGIO)`

### Project 10-B
`CRTPRTF FILE(YOURLIB/PRJ10BPRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ10BPRTF)`
`CRTBNDRPG PGM(YOURLIB/PROJ10B) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJ10B) OPTION(*NODEBUGIO)`

### Project 10-C
`CRTPRTF FILE(YOURLIB/PRJ10CPRTF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ10CPRTF)`
`CRTBNDRPG PGM(YOURLIB/PROJ10ERR) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJ10ERR) OPTION(*NODEBUGIO)`