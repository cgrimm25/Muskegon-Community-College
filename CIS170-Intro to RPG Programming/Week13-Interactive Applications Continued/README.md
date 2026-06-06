# Project 10: Interactive Student Exam Results Inquiry System

## Overview
This project implements an interactive database inquiry application built completely from scratch on the IBM i platform using fully free-form RPGLE and Data Description Specifications (DDS) workstation display files. The program provides a multi-panel transaction interface that prompts a user for a unique student identification key, executes a random data lookup (`CHAIN`) against the master exam records database (`WUEXAMP`), and conditionally outputs detailed exam scores or a localized field validation alert.

---

## File Directory
* **`PROJECT10.RPGLE`**: The core free-form RPGLE program implementing the application logic stream, database random access chains, and screen-state monitoring.
* **`PRJ10DSPF.DSPF`**: The externally described workstation display file defining field arrangements, keyword configurations, and input/output control grids.
* **`Project 10 Instructions.pdf`**: The official assignment requirements tracking sheet for building interactive inquiries from scratch.
* **`WUEXAMP.PF-DTA.pdf`**: The master reference schema data dump for the Student Exam Results file used as the core application database.
* **`BIDS.PF-DTA.pdf`**: Production database reference dump available within the library workspace environment.
* **`WUHRLYP.PF-DTA.pdf`**: Production database reference dump available within the library workspace environment.

---

## Database Schema Reference (`WUEXAMP`)
The random record extraction interacts directly with the `EXAMREC` format of the `WUEXAMP` physical file hosted within the `RPGIV_5THS` library. The application targets and extracts the following key-mapped fields:
* **`STUNO`**: Zoned Decimal (9,0) representing the unique Student Identification Number, which serves as the primary access key path.
* **`SFNAME`**: Character (10) field storing the student's first name.
* **`SLNAME`**: Character (15) field storing the student's last name.
* **`EXAM1` to `EXAM5`**: Zoned Decimal (3,0) numeric fields logging individual raw exam percentage grades.

---

## Workstation Interface Architecture (`PRJ10DSPF`)
The interactive user experience is partitioned across two discrete layout record formats utilizing a dedicated indicator area (`INDARA`) to decouple program logic from display attributes:

### 1. `SCRN1` (Key Data Entry Panel)
* **Function**: Prompts the operator to supply an individual student record key via the input-capable `STUNO` field.
* **Header Elements**: Maps the standard `DATE(*JOB)` system date and the active workstation `USER` handle within the top-line row fields.
* **Validation Messaging**: Implements an inline error message keyword (`ERRMSG`) conditioned by response indicator `90` (`INVSTUNO`) to display a targeted prompt: `"Invalid Student Number"`.
* **Cursor Controls**: Focuses the workstation cursor position snug to the input container (`DSPATR(PC)`) automatically when the error state trips.

### 2. `SCRN2` (Exam Results Display Panel)
* **Function**: Invoked dynamically upon successful record lookups to present output-only student data grids.
* **Field Inheritance**: References description labels and length definitions directly from the underlying physical database file using field reference properties (`R`).
* **Data Masking**: Implements proper statistical editing via edit codes (`EDTCDE(3)`) across all five raw numeric exam grade elements to suppress unnecessary leading zero padding.
* **Navigational Matrix**: Grants the operator multi-track navigational controls: pressing **F3** exits the run cycle entirely, pressing **F12** (`Cancel`) routes control back to the primary search panel, and pressing **Enter** cleanly sweeps back to the initial entry frame.

---

## Application Workflow Logic
The software architecture encapsulates the event-driven transaction cycle within a continuous execution block tied to standard command key indicators:

1. **Workstation Prompting**: The engine uses an `Exfmt SCRN1` statement to push the entry fields out to the user shell and freeze thread execution until a submission event fires.
2. **Random Access Validation**: Upon an enter trigger, the code fires a direct `Chain STUNO WUEXAMP` query to match database indices.
3. **Condition Assessment Block**:
   * **Record Found (`%Found = *On`)**: The logic intercepts the successful buffer filling, clears active errors, and issues an `Exfmt SCRN2` command to flush formatted grade cards out to the active window.
   * **Record Not Found (`%Found = *Off`)**: The engine traps the structural exception, switches indicator `90` to true, and safely loop-routes control back to the entry panel to render the explicit error notification.
4. **Graceful Shutdown**: Toggling the **F3** command function key updates the `Exit` indicator flag, causing the program control loop to instantly break, set the final record completion flag (`*INLR = *ON`), and safely close all transactional workstation channels.