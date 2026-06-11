# Advanced RPG Project 2: Accounts Receivable Batch Posting & Exception Report

## Overview
This project implements an automated batch-processing and database-update posting engine on the IBM i platform using fully free-form RPGLE, externally described relational physical files, and a multi-format report layout printer file. The application handles a core accounts receivable workflow for GTC Telephone Company by consuming sequential transaction logs from a payment file (`GTCPAYP`), executing random access index lookups (`CHAIN`) against a copy of the master client ledger table (`MYCSTP`), calculating dynamic balance updates within localized subroutines, performing target-isolated data updates, and streaming real-time audit or exception lines onto an externally described printing grid (`PRJ02PRTF`).

---

## File Directory
* **`PROJ2.RPGLE`**: The core data processing program written in fully free-form RPGLE. It drives the sequential transaction loop, coordinates multi-file relational streams via random access chains, handles overflow indicators, isolates ledger updates within subroutines, and runs optimized field locks.
* **`PRJ02PRTF.PRTF`**: The externally described printer file Data Description Specifications (DDS). It defines horizontal coordinates, column headings, and formatting masks for four unique record layouts: `HEADING`, `DETAIL`, `ERRORL`, and `ERROR`.
* **`Project 2 Instructions.pdf`**: The official functional scope document detailing data-mapping parameters, file duplication configurations, validation tracking variables, and updating rules.
* **`GTCPAYP.PF-DTA.pdf`**: A diagnostic system printout showcasing raw record data streams from the primary input transaction payments file.
* **`MYCSTP.PF-DTA.pdf`**: A diagnostic system printout displaying database records inside the master customer database file copy before and after posting cycles.
* **`PROJ2-OUTPUT.pdf`**: The final compiled execution audit spool print stream confirming aligned transaction entries, trailing minus flags, and unposted exception total counters.

---

## Relational Architecture & Interface Framework

The posting system manages data cross-references simultaneously across two distinct physical disk files and a four-part printer structure using keyed sequence access trees:

### 1. Primary Payment Transaction File (`GTCPAYP`)
Sourced as a sequential, input-only disk queue file. The driving loop consumes record fields line-by-line using an error-free priming read structure:
* **`CPHONE`**: Zoned Decimal (10,0) used as the transaction search key link.
* **`AMTPD`**: Zoned Decimal (6,2) capturing raw cash/remittance amounts posted by payers.
* **`DATRCV`**: Zoned Numeric (8,0) recording the legacy transaction date format (`CCYYMMDD`).
* **`DATRCVL`**: Native Date data type (`*ISO`) holding the formal transaction object timestamp.

### 2. Master Customer Database File Copy (`MYCSTP`)
Configured for shared random-access key searching and active record rewriting (`Usage(*Update) Keyed`). Upon successful validation hooks, matching master records (`CUSREC`) accept incoming financial updates:
* **`CPHONE`**: Zoned Decimal (10,0) acting as the **Primary Key Access Path Path**.
* **`CLNAME` / `CFNAME`**: Alphanumeric customer data fields inherited by detail layouts.
* **`AMTOWE`**: Zoned Decimal (6,2) tracking global outstanding balance liabilities.
* **`PAYDAT` / `PAYDATL`**: Dual-track date placeholders updating the customer's payment history logs.

### 3. Externally Described Output Printer File (`PRJ02PRTF`)
Structured dynamically to break up audit lines and trap ledger failures cleanly using independent format subfiles:
* **`HEADING`**: Emits system calendar dates (`DATE`), zero-suppressed page counters (`PAGNBR`), corporate branding blocks, and standard programmer profile parameters (**Chris Grimm**).
* **`DETAIL`**: Emits rows for successful updates, passing down referenced variables (`CPHONE`, `DATRCVL`, `AMTPD`) along the balance audit line.
* **`ERRORL`**: An exception rows layout that triggers when an incoming payment key has no parent account. It displays the unposted parameters alongside a visual alarm: `*** Customer Record Not Found ***`.
* **`ERROR`**: A summary footer written exactly once at end-of-file. It references a packed program variable (`ERRORTOT`) to flag the total number of unposted orphan transaction rows.

---

## Core Technical Specifications & Processing Mechanics

### 1. Keyed Random Access Checking (`CHAIN`)
During every file iteration step, the application extracts the customer phone key parameter from the transaction record buffer (`GTCPAYP.CPHONE`) and uses it to query the indexing structure of the customer table:
```rpgle
Chain CPHONE MYCSTP;