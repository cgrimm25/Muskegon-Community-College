# Project 1: CloudServices 24/7 Inventory Report

## Overview
This project generates a comprehensive CloudServices 24/7 Inventory Report. Developed as a structured, read-and-write mid-range application on the IBM i platform, the program processes transactional inventory records sequentially from a physical database file and formats them into an external printer file layout using fully free-form RPGLE logic.

## File Directory
* **`PROJECT1.RPGLE`**: The application programming logic written in free-form RPGLE. Implements an error-free, standard priming read loop, end-of-file condition validation, and manual page overflow carriage returns.
* **`INVREPORT.PRTF`**: The external printer file Data Description Specifications (DDS) mapping out precise field placements, editing codes (`EDTCDE`), edit words (`EDTWRD`), and dynamic system variables like page numbers and job dates.
* **`Project 1 Instructions.pdf`**: The official assignment specification outline detailing core design specs, library environment setup instructions, and the original printchart mockup.
* **`PROJECT 1-Output.pdf`**: A sample execution printout of the final compiled report demonstrating structural visual compliance with the printchart design layout.
* **`CSINVP.PF-DTA.pdf`**: A diagnostic data printout showcasing sample production records stored inside the underlying database file system.

---

## Physical File Structure (`CSINVP`)
The database storage layer consists of an externally defined physical file structured using the following Data Description Specifications (DDS) schema:

| Field Name | Type / Length | Dec | Key | Column Heading Description |
| :--- | :--- | :--- | :--- | :--- |
| `PRODNO` | Packed (`P`) / 6 | 0 | **Key 1** | Product Number |
| `PACT` | Character (`A`) / 1 | | | Product Active Flag |
| `DESCRP` | Character (`A`) / 40 | | | Product Description |
| `SELLPR` | Zoned (`S`) / 6 | 2 | | Selling Price |
| `SHIPWT` | Zoned (`S`) / 5 | 2 | | Shipping Weight |
| `QTYOH` | Packed (`P`) / 4 | 0 | | Quantity On Hand |
| `RORPNT` | Packed (`P`) / 4 | 0 | | Reorder Point |
| `RORQTY` | Packed (`P`) / 4 | 0 | | Reorder Quantity |
| `RORCOD` | Character (`A`) / 1 | | | Reorder Code |
| `SUPCOD` | Character (`A`) / 3 | | | Supplier Code |
| `CURCST` | Zoned (`S`) / 6 | 2 | | Current Cost |
| `AVGCST` | Zoned (`S`) / 6 | 2 | | Average Cost |

*Note: The physical file enforces logical integrity constraints via a unique primary key restriction on the `PRODNO` field.*

---

## Core Technical Specs & Execution Flow
The system executes a high-performance, predictable file processing flow across three distinct structural phases:

### 1. Initialization & File Mapping
The program binds external system interfaces to internal logical models, opening the sequential input channel for database table `CSINVP` and formatting pointers for the line-printer interface `INVREPORT` while assigning an explicit binary switch tracking overflow constraints (`EndOfPage`).

### 2. Page Formatting & The Priming Read Loop
* **The Priming Read**: An isolated retrieval instruction safely populates buffer memory with the initial product stream entry prior to entering programmatic logical check states.
* **Dynamic Header Rendering**: If line tracking detects page boundary thresholds (`EndOfPage = *On`), the execution block triggers high-level write commands targeting the printer subfile record structure (`Write Heads`). This action prints system metrics (Job Date and Page Counters), resets the overflow bit, and shifts the print head downward.
* **The Main Iteration Block (`DOW NOT %EOF`)**: Runs continuously until physical data boundaries are hit. It converts numeric types, flushes mapped detail fields to the print spooler via `Write Detail`, and issues a trailing data line request to maintain stable loops without memory leaks.

### 3. Graceful Termination Procedures
Once the data sequence hits terminal parameters, the logic breaks cleanly out of processing loops, trips the Last Record execution flag (`*INLR = *ON`) to sign off on current variable scopes, and returns environment control seamlessly back to the OS subsystem.