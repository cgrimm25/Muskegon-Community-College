# CIS 270A Project 12: Embedded SQL in ILE RPG

## Overview
This project explores the integration of Structured Query Language (SQL) directly within ILE RPG programs (`SQLRPGLE`) on the IBM i platform. The application transitions away from traditional native record-level access (RLA) in favor of Embedded SQL for both data retrieval via Cursors and mass data modification using set-at-a-time processing.

*Note: This project is maintained within the MCC education repository under the `CIS270A-Advanced RPG Programming` directory.*

---

## Architecture & File Directory

### Database Layer
* **`WUSTDP.PF`**: The Wibaux University Student Master File. Serves as the primary read-only source table for querying student records based on credit totals and in-district status.
* **`WUSCTP.PF`**: The Wibaux University Current Sections File containing class capacity and enrollment numbers.
* **`MYSECTIONS`**: A localized duplicate of `WUSCTP` created to safely execute mass SQL `UPDATE` statements without corrupting the master database.

### Presentation Layer
* **`PRJ12APRTF`**: The externally described printer file for Project 12A. Generates the "In-District Freshman Listing" report.
* **`PRJ12BPRTF`**: The externally described printer file for Project 12B. Generates the "Wexler University Raised Math Caps" audit report showing updated section capacities.

### Logic Layer
* **`PROJ12A.SQLRPGLE`**: Retrieves student records from the master file based on in-district status and credit totals.
* **`PROJ12B.SQLRPGLE`**: Executes mass `UPDATE` statements on the `MYSECTIONS` table to increase math enrollment capacities by 15%.
* **Visual Proofs**: `image_63fb0a.png`, `image_63fb04.png`, and `image_63fae7.png` document the successful report generation and data modifications.

---

## Technical Specifications

### Embedded SQL Implementation
* **Data Retrieval (Cursors)**: Project 12A utilizes SQL `DECLARE`, `OPEN`, `FETCH`, and `CLOSE` operations to navigate student datasets, replacing traditional `READ` loops.
* **Set-at-a-Time Updates**: Project 12B replaces record-by-record `UPDATE` logic with a single, optimized SQL `UPDATE` statement, dramatically reducing I/O overhead.
* **Database Journaling**: Because Embedded SQL `UPDATE` operations require transaction integrity, the target file (`MYSECTIONS`) is actively journaled before execution using the `STRJRNPF` command.

---

## Compilation Pipeline
Because these programs contain embedded SQL statements, they must be pre-compiled using the SQL compiler (`CRTSQLRPGI`) rather than the standard RPG compiler.

### 1. Environment Preparation
```bash
# Create a localized duplicate for SQL testing
CRTDUPOBJ OBJ(WUSCTP) FROMLIB(RPGIV_5THS) OBJTYPE(*FILE) TOLIB(F20DOLESHA) NEWOBJ(MYSECTIONS)

# Start journaling for transaction integrity
STRJRNPF FILE(F20DOLESHA/MYSECTIONS) JRN(MCCRPG4/MCCJOURNAL)