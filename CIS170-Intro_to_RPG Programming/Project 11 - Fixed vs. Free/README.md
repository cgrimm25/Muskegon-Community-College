# Project 11: Fixed vs. Free
# Inventory Master Report

## Overview
This project explores legacy RPG programming techniques by generating an Inventory Master Report using **program-described files** and **Fixed-Format RPG specifications**. Unlike previous modern ILE RPG projects that relied on externally described database schemas and printer files (DDS), this batch processing application defines all file structures, input mappings, and output layouts directly within the RPG source code using `F`, `I`, and `O` specifications. The calculation logic utilizes mixed-mode free-form (`/FREE` and `/END-FREE`) to process the records and control page overflow.

---

## File Directory

### Source Files

* **`PROJECT11.rpgle`**: The standalone batch application program. It does not use `**FREE`. Instead, it uses strictly aligned fixed-format specifications:
  * **F-Specs**: Declares `CSINVP` (Disk) and `QPRINT` (Printer).
  * **I-Specs**: Maps the exact byte positions and data types for the incoming `CSINVP` physical file.
  * **C-Specs**: Uses `/FREE` and `/END-FREE` blocks for the main processing loop (`READ`, `DOW`, `EXCEPT`).
  * **O-Specs**: Defines the exact column alignments, edit codes, headers, and detail lines for the `QPRINT` spool output.

### Documentation & Reference Materials (`Docs/`)

* **`Project 11 Instructions.pdf`**: The assignment specifications detailing the fixed-format constraints, input record layout, and the exact print spacing chart required for the output report.
* **`RPG Example Code using INPUT and OUTPUT Specs.pdf`**: A reference guide outlining the column alignments and syntax for Fixed-Format F, I, and O specs.
* **`PROEJCT11-OUTPUT.pdf`**: The final spool output report demonstrating manual spacing, page numbering, and numeric editing (handling negative values and zero suppression) via O-spec edit codes.
* **`CSINVP.PF-DTA.pdf`**: A reference printout showing the raw inventory records contained in the `CSINVP` database file.

---

## Physical File Structure (`CSINVP`)

In this project, `CSINVP` is treated as a **Program-Described File**. The RPG program does not pull the schema from the database; instead, it manually maps the buffer positions using **Input (I) Specifications**. 

| Field Name | Start | End | Length & Type | Dec | Description |
| :--- | :---: | :---: | :--- | :---: | :--- |
| `PRODNO` | 1 | 6 | 6 / Zoned (`S`) | 0 | Product Number |
| `PRODTYPE` | 7 | 9 | 3 / Character (`A`) | | Product Type |
| `PACT` | 10 | 10 | 1 / Character (`A`) | | Product Active |
| `DESCRP` | 11 | 50 | 40 / Character (`A`)| | Description |
| `SELLPR` | 51 | 56 | 6 / Zoned (`S`) | 2 | Selling Price |
| `SHIPWT` | 57 | 61 | 5 / Character (`A`) | | Shipping Weight (Lbs-Oz) |
| `QTYOH` | 62 | 64 | 3 / Packed (`P`) | 0 | Quantity on Hand |
| `RORPNT` | 65 | 67 | 3 / Packed (`P`) | 0 | Reorder Point |
| `RORQTY` | 68 | 70 | 3 / Packed (`P`) | 0 | Reorder Quantity |
| `RORCOD` | 71 | 71 | 1 / Character (`A`) | | Reorder Code |
| `SUPCOD` | 72 | 74 | 3 / Zoned (`S`) | 0 | Supplier Code |
| `SHPCST` | 75 | 80 | 6 / Zoned (`S`) | 2 | Shipping Cost |
| `CURCST` | 81 | 86 | 6 / Zoned (`S`) | 2 | Current Cost |
| `AVGCST` | 87 | 92 | 6 / Zoned (`S`) | 2 | Average Cost |

*(Note: Packed fields take up fewer bytes on disk than their actual numeric length. For example, a 5-digit packed number fits into 3 bytes).*

---

## Technical Program Flow & Execution

The program relies heavily on the legacy RPG program cycle concepts, implemented manually:

1. **File Declarations (F-Specs):**
   * Declares `CSINVP` as a program-described input file.
   * Declares `QPRINT` as a program-described printer file (`132` characters wide), hooking the page overflow indicator `*INOF` (`OFLIND(*INOF)`).

2. **Data Mapping (I-Specs):**
   * Maps the raw data buffer for `CSINVP` directly to variable names based on exact byte start and end positions.

3. **Processing Loop (C-Specs / Mixed Free-Form):**
   * Drops into `/FREE` to run a standard sequential read loop (`DOW NOT %EOF`).
   * **Overflow Handling**: Checks `IF *INOF`. If true, it triggers the header generation (`EXCEPT HEADINGS`) and resets the indicator (`*INOF = *OFF`).
   * Uses the `EXCEPT DETAIL` operation code to trigger the output of a single inventory record.

4. **Output Generation (O-Specs):**
   * Defines named output exception blocks (`HEADINGS` and `DETAIL`).
   * `HEADINGS`: Specifies the exact constant string literals (e.g., `'Inventory Master Report'`) and their ending positions on the page. Prints the system date (`*DATE` with `Y` edit code) and page number (`PAGE` with `Z` edit code).
   * `DETAIL`: Maps the variables mapped in the I-Specs to exact columns, applying edit code `1` to numeric values to display commas and negative signs correctly.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database file and run the application in your target IBM i library (`YOURLIB`). Because this project uses program-described files, **no DDS compilation is required**.

### 1. Restore Database File from Master Save File `RPGIV5THSU.savf`

**Step 1: Create the target save file on IBM i**  
Run this command on your 5250 green screen command line:
```cl
CRTSAVF FILE(YOURLIB/RPGIV5THSU) TEXT('RPG IV 5th Ed Student Save File')
```

**Step 2: Upload `RPGIV5THSU.savf` to your IFS home directory**  
1. Open IBM i Access Client Solutions (ACS) and select **Integrated File System**.
2. Navigate to your user home folder: `/home/USERNAME/`.
3. Upload `RPGIV5THSU.savf` from your local repository data assets folder.
4. Ensure **"Save to UTF-8 text file"** (or text conversion) is **UNCHECKED** so the stream file remains raw binary.

**Step 3: Copy the stream file into the save file object**  
Execute this command on the 5250 green screen command line:
```cl
CPYFRMSTMF FROMSTMF('/home/USERNAME/RPGIV5THSU.savf') TOMBR('/QSYS.LIB/YOURLIB.LIB/RPGIV5THSU.FILE') MBROPT(*REPLACE)
```

**Step 4: Restore the physical file**  
Execute `RSTOBJ` to extract the required inventory master file into your active library:
```cl
RSTOBJ OBJ(CSINVP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
```

### 2. Compile and Run the Program
Place `PROJECT11.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT11) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT11)
```

Execute the program from the 5250 command line:
```cl
CALL PGM(YOURLIB/PROJECT11)
```

### 3. View and Verify Spool Output
* **Via 5250 Green Screen:** Run `WRKSPLF`, locate the `QPRINT` spool file (since there is no external PRTF), and enter option **5** (Display).
* Verify that the column alignments, zero suppression, and pagination match the provided `PROEJCT11-OUTPUT.pdf`.