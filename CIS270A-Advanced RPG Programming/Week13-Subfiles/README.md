# CIS 270A Project 11: Subfile Processing with Database Updates

## Overview
This project demonstrates advanced interactive application development on the IBM i platform using a **"Load-All" Subfile (SFL)**. The application allows users to query a local orders and products database table (`MYORDPRP`) using a newly created logical file (`CSORDPRPLF`) based on product status (Shipped `SH` or Backordered `BO`). The queried results populate a scrollable subfile grid where users can perform inline modifications to Quantity Ordered, Quantity on Hold, Tracking Number, and Status. Validated changes are then applied directly back to the physical database.

---

## File Directory
* **`CSORDPRP.PF`**: The original master physical file Data Description Specifications (DDS) provided by the university.
* **`CSORDRRP.PF-DTA.pdf`**: A raw data snapshot of the original Compusell Orders/Products file before being copied to the local environment.
* **`MYORDPRP.PF-DTA.pdf`**: A data snapshot of the localized, updated physical file after running the interactive subfile modifications.
* **`CSORDPRPLF.LF`**: The logical file index built over the local `MYORDPRP` copy, keyed specifically by `STS`, `ORD#`, and `PRODNO` to support efficient subfile loading.
* **`PRJ11DSPF.DSPF`**: The externally described workstation display file containing the initial prompt screen (`SCRN1`), the subfile grid (`SFLSHBO`), the subfile control record (`CTLSHBO`), and the footer navigation keys (`FOOTER`).
* **`PROJ11.RPGLE`**: The core interactive RPGLE program handling the subfile load, input evaluation, and targeted database updates.
* **`Project 11 Instructions.pdf`**: The official assignment requirements outlining the logical file constraints, subfile control parameters, and testing criteria.
* **`image_64599f.png`**: The 5250 terminal screenshot confirming the successful execution, rendering, and functionality of the subfile application grid.

---

## Technical Specifications & Architecture

### Logical File Access Path
To correctly sort the subfile records by status, order number, and product number, `CSORDPRPLF` is utilized. The `PFILE` keyword correctly references the localized `MYORDPRP` copy to ensure the application updates the test environment rather than modifying the master database.

### Buffer Separation (`Movedb` & `Movesfl`)
To prevent accidental data corruption during screen reads, the program safely transfers database values to screen variables (e.g., mapping `QTYORD` to `XQTYORD` and `STS` to `XSTS`) using dedicated mapping subroutines (`Movedb` and `Movesfl`). This effectively decouples the presentation layer from the database schema.

### `READC` Update Loop Optimization
Instead of iterating through the entire subfile grid line-by-line, the update subroutine (`Updatesr`) optimizes CPU performance by utilizing the `READC` (Read Changed) operation code. This ensures the program only identifies and processes the specific records that were actively modified by the user.

### Status Chaining Integrity
A critical component of the `Updatesr` subroutine is its `CHAIN` execution. The program correctly uses the primary query status (`STSIN`) from the subfile control record rather than the modified subfile status (`XSTS`). This guarantees the program successfully locates the *original* database record before applying the user's updates.

---

## Compilation Pipeline
To successfully deploy this application, the objects must be compiled in strict dependency order within your library environment:

1. **Create the Logical File:**
   `CRTLF FILE(YOURLIB/CSORDPRPLF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(CSORDPRPLF)`
2. **Create the Display File:**
   `CRTDSPF FILE(YOURLIB/PRJ11DSPF) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(PRJ11DSPF)`
3. **Create the Bound RPG Program:**
   `CRTBNDRPG PGM(YOURLIB/PROJ11) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJ11) OPTION(*NODEBUGIO)`