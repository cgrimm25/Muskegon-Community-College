# Project 9: Interactive Product & Supplier Inquiry System

## Overview
This project implements an interactive workstation application on the IBM i platform using fully free-form RPGLE and Data Description Specifications (DDS) display files. The application provides a transactional user interface that allows an operator to input a product number, validates it against an inventory master file, performs a secondary random access lookup on the associated supplier, and displays detailed supplier information or validation errors directly on the workstation screen.

---

## File Directory
* **`PROJECT9.RPGLE`**: The core application program written in free-form RPGLE that manages the workstation control loop, executes sequential indicator checking, and drives dual random `CHAIN` lookups.
* **`INQSCREEN.DSPF`**: The externally described workstation display file specifying the exact multi-panel layouts, input fields, output coordinates, and conditioning error indicators.
* **`Project 9 Instructions.pdf`**: The official assignment specification detailing the user interface guidelines, database validation rules, and indicator-routing logic.
* **`Project 9 Screenshots.pdf`**: Captured live terminal sessions confirming proper verification behavior for active products, invalid keys, and orphaned supplier links.
* **`CSINVP.PF-DTA.pdf`**: A reference dump of production records contained within the underlying Product Inventory master database file.
* **`CSSUPP.PF-DTA.pdf`**: A reference dump of production records contained within the underlying Corporate Supplier master database file.

---

## Database Architecture & Files
The workstation terminal acts as a presentation layer gathering parameters to drive a relational validation bridge across two distinct physical database entities:

1. **`CSINVP` (Product Inventory File)**: Sourced as an input keyed database file. It uses the entered item number (`PRODIN`) as its primary key to check for item validity and fetch the corresponding supplier code assignment (`SUPCOD`).
2. **`CSSUPP` (Supplier Master File)**: Sourced as an input keyed database file. It treats the retrieved `SUPCOD` field as a foreign key search argument to pull corporate contact profiles randomly into memory.
3. **`INQSCREEN` (Workstation Display File)**: Configured as a direct workstation transactional interface using a separate indicator area (`INDARA`) to insulate the driving application code from direct presentation flag parameters.

---

## Workstation Display Formats
The layout architecture segregates the user experience into two distinct operational panel buffers:

### 1. `SCRN1` (Product Search Panel)
* **Function**: Prompts the user to enter a 6-digit numeric product number into the `PRODIN` input field.
* **Session Branding**: Maps the current workstation user profile ID (`USER`) and active job execution date (`DATE(*JOB)`) across the top status heading line.
* **Error Messaging**: Implements two custom error message lines (`ERRMSG`) tied to indicators `90` and `95`. These allow non-destructive error handling without clearing entered values.
* **Exit Controls**: Binds function key F3 (`CA03`) to indicator `03` to facilitate safe exit handling.

### 2. `SCRN2` (Supplier Details Display Panel)
* **Function**: Renders detailed information for verified suppliers.
* **Field Inheritance**: References database attributes directly from `SUPREC` inside `CSSUPP` using reference keywords (`REFFLD`) to display fields like `SUPCOD`, `SNAME`, `CONTAC`, `SSTRET`, `SCITY`, `SSTAT`, `SZIP`, and `SPHONE`.
* **Data Masking**: Employs explicit edit codes (`EDTCDE(Y)`) and formatting definitions to render zip codes with standard hyphens and telephone numbers with area codes cleanly.

---

## Core Program Logic & Validation Flow
The application executes an event-driven workstation cycle inside a `DOW Not Exit` loop. The behavioral workflow is governed by a dual-track validation sequence:

1. **Workstation Interaction**: The program issues an `Exfmt SCRN1` command to present the input screen and await user submission.
2. **Product Validation (`CHAIN 1`)**: When Enter is pressed, the program conducts a random access `CHAIN` against `CSINVP` using the screen input field `PRODIN`.
   * *If Not Found*: The program flips indicator `90` (`INVPRODNO`) to `*ON`. When `SCRN1` re-displays, it triggers the error message: `"Invalid product number"`.
3. **Supplier Validation (`CHAIN 2`)**: If the product is found, the program extracts its associated `SUPCOD` and executes a secondary random access `CHAIN` against `CSSUPP`.
   * *If Not Found*: The program flips indicator `95` (`NOTFOUND`) to `*ON`. When control routes back to `SCRN1`, it displays the error message: `"Product Number valid, but Supplier code not found"`.
   * *If Found*: Both error indicators remain `*OFF`, and the program executes an `Exfmt SCRN2` command to flush the verified supplier info to the panel.
4. **Shutdown Stack**: When function key F3 is caught, the loop structure terminates, the last record indicator is raised (`*INLR = *ON`), and the workstation interface drops cleanly.

---

## Verification Test Cases
The system can be fully verified using the following production record scenarios:
* **`117711` or `130102`**: Valid product codes linked to active suppliers; successfully opens `SCRN2` detailing the full supplier profile.
* **`110110`**: Valid product record containing an orphaned or missing supplier code; successfully traps the exception and displays the indicator `95` warning on `SCRN1`.
* **Invalid Input**: Entering a completely unmapped product number trips indicator `90`, forcing an `"Invalid product number"` prompt.