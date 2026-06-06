# Project 2: GTC Customer Accounts Report

## Overview
This project generates a formatted **GTC Customer Accounts Report**. It expands on foundational IBM i compilation patterns by implementing an externally described printer file that references a master customer database file. The program processes records sequentially from the physical database layer, applying advanced field-level editing codes (`EDTCDE`) and edit words (`EDTWRD`) directly within the DDS design layer to format phone and currency fields dynamically.

## File Directory
* **`PROJECT2.RPGLE`**: The core logical source code written in free-form RPGLE. It maps out a continuous read loop utilizing the `GTCSTP` file database structure and monitors data streams for terminal breaks.
* **`PRJ2PRTF.PRTF`**: The externally described printer file Data Description Specifications (DDS) outlining the specific interface grid, field positioning metrics, and text justification masks.
* **`Project 2 Instructions.pdf`**: The official assignment detailing structural design guidelines, explicit field formatting parameters, and environment manipulation tasks.
* **`PROJECT 2-Output.pdf`**: A sample printout of the final compiled report demonstrating compliance with structural field-masking parameters.
* **`GTCSTP.PF-DTA.pdf`**: A diagnostic system printout showcasing raw production samples contained within the underlying physical Customer Master File.

---

## Physical File Structure (`GTCSTP`)
The processing layer interacts with a pre-configured physical file (`GTCSTP`) built via the following Data Description Specifications (DDS) schema:

| Field Name | Type / Length | Dec | Key / Constraints | Field Description / Text Labels |
| :--- | :--- | :--- | :--- | :--- |
| `CPHONE` | Zoned (`S`) / 10 | 0 | **Primary Key** | Customer Phone Number |
| `CLNAME` | Character (`A`) / 15 | | | Last Name |
| `CENAME` | Character (`A`) / 10 | | | First Name |
| `CSTRET` | Character (`A`) / 20 | | | Street Address |
| `CCITY` | Character (`A`) / 15 | | | City Location |
| `CSTAT` | Character (`A`) / 2 | | | State Code |
| `CZIP` | Zoned (`S`) / 5 | 0 | | Zip Code |
| `CURBIL` | Zoned (`S`) / 6 | 2 | | Current Bill Amount |
| `AMTOWE` | Zoned (`S`) / 6 | 2 | | Total Amount Owed |
| `PAYDAT` | Zoned (`S`) / 8 | 0 | | Last Payment Date (Numeric) |
| `PAYDATL` | Date (`L`) | | | Last Payment Date (Timestamp Type) |

---

## Output Display & Interface Requirements
The output printer template uses advanced DDS masks to enforce data styling parameters during spool generation:

* **System Header Layout**: Tracks system counters to output the runtime target date and structured page markers (`PAGNBR`) alongside the centered banner title `GTC CUSTOMER ACCOUNTS`.
* **`CPHONE` Masking**: Employs a custom edit word (`EDTWRD`) configuration to unpack the 10-digit zoned numeric buffer into a readable string formatting mask: `(555)123-4567`.
* **`CLNAME` Alignment**: Emits the text field to the printer grid as a raw value without structural string modification.
* **`CURBIL` Transformation**: Uses Edit Code `J` to maintain explicit negative flags with a trailing minus sign, separate numeric thousands with commas, and print a clear zero balance.
* **`AMTOWE` Transformation**: Composes an identical number mask structure using Edit Code `J` while appending a dynamic, floating currency descriptor character (`$`) snug against the high-order digit.