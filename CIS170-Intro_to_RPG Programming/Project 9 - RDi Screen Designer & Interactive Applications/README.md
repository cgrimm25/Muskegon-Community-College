# Project 9: RDi Screen Designer & Interactive Applications
# CloudServices24x7, Inc. Supplier Information

## Overview
This project implements an interactive Product Supplier Inquiry application using IBM i Display Files (DSPF) and ILE RPG. Moving beyond batch processing, this program utilizes a `WORKSTN` device file with the `INDARA` (Indicator Area) keyword to cleanly map UI interactions and error handling to an internal RPG data structure. It prompts the user for a product number, validates it against the Inventory Master file (`CSINVP`), and uses the resulting supplier code to query the Supplier Master file (`CSSUPP`) to display comprehensive supplier contact details.

---

## File Directory

### Source Files

* **`PROJECT9.rpgle`**: The primary interactive application logic written in fully free-form RPGLE (`**FREE`). Declares physical files for input and a workstation file (`INQSCREEN`) for UI. Utilizes an indicator data structure to map `F3` exits and dual `CHAIN` validations. Evaluates `%Found` to toggle error indicators `*IN90` (Invalid Product) and `*IN95` (Missing Supplier).
* **`INQSCREEN.dspf`** *(Listed locally as `.prtf`)*: External display file Data Description Specifications (DDS). Defines two interactive screens:
  * **`SCRN1`**: The primary prompt capturing the `PRODIN` product number. Contains `ERRMSG` keywords conditioned by indicators 90 and 95 to display validation failures.
  * **`SCRN2`**: The supplier details view. Utilizes the `REFFLD` keyword to map display attributes directly from the `CSSUPP` database schema, formatted with edit words (`EDTWRD`) for zip codes and phone numbers.

### Documentation & Reference Materials (`Docs/`)

* **`Chapter 12 - Writing Interactive Applications.pdf`**: Lecture slide presentation detailing `WORKSTN` declarations, Display File DDS keywords (`INDARA`, `ERRMSG`, `REFFLD`), indicator data structures, and the `EXFMT` operation code.
* **`Project 9 Instructions.pdf`**: The course assignment specifications, business logic rules, and UI layout grid coordinates for RDi Screen Designer.
* **`Project 9 Screenshots.pdf`**: Output verification showing the successful display of Supplier #972 and #676, alongside the triggered error message lines for invalid states.
* **`CSINVP.PF-DTA.pdf` / `CSSUPP.PF-DTA.pdf`**: Physical database printouts containing the raw inventory and supplier relational data.

---

## Physical File Structures

The interactive application cross-references two physical database files:

### 1. Inventory Master File (`CSINVP`)
The primary transactional file queried by user input (`PRODIN`).
| Field Name | Data Type & Length | Dec | Key | Description |
| :--- | :--- | :---: | :---: | :--- |
| `PRODNO` | Zoned Decimal (`S`) / 6 | 0 | **Key 1** | Product Number |
| `PRODTYPE` | Character (`A`) / 3 | | | Product Type |
| `PACT` | Character (`A`) / 1 | | | Product Active Flag |
| `DESCRP` | Character (`A`) / 40 | | | Description |
| `SUPCOD` | Character (`A`) / 3 | | | Supplier Code (Foreign Key) |

### 2. Supplier Master File (`CSSUPP`)
The secondary master file randomly accessed using the `SUPCOD` retrieved from `CSINVP`.
| Field Name | Data Type & Length | Dec | Key | Description |
| :--- | :--- | :---: | :---: | :--- |
| `SUPCOD` | Character (`A`) / 3 | | **Key 1** | Supplier Code |
| `SNAME` | Character (`A`) / 25 | | | Supplier Name |
| `CONTAC` | Character (`A`) / 30 | | | Contact Person |
| `SSTRET` | Character (`A`) / 20 | | | Street Address |
| `SCITY` | Character (`A`) / 15 | | | City |
| `SSTAT` | Character (`A`) / 2 | | | State |
| `SZIP` | Zoned Decimal (`S`) / 9 | 0 | | Zip Code |
| `SPHONE` | Zoned Decimal (`S`) / 10 | 0 | | Phone Number |

---

## Technical Program Flow & Execution

The program utilizes an interactive event loop driven by the `EXFMT` opcode:

1. **Environment Setup & File Declarations:**
   * Declares `CSINVP` and `CSSUPP` for random disk input (`Keyed`).
   * Declares `INQSCREEN` as a `Workstn` device utilizing `Indds(Indicators)`.
   * Maps an internal data structure to intercept the F3 command key (Indicator 03) and output validation errors (Indicators 90 and 95).

2. **Interactive UI Loop (`DOW Not Exit`):**
   * **Prompt User**: Executes `Exfmt SCRN1` to render the initial input screen and wait for user input.
   * **Chain 1 (Inventory)**: If the user presses Enter (not F3), the program executes `Chain PRODIN CSINVP`. If no record is found, indicator 90 (`INVPRODNO`) is set to `*On`, and the loop restarts, displaying "Invalid product number" on `SCRN1`.
   * **Chain 2 (Supplier)**: If the product is found, the program extracts `SUPCOD` and executes `Chain SUPCOD CSSUPP`. If the supplier does not exist, indicator 95 (`NOTFOUND`) is set to `*On`, and the loop restarts, displaying "Product Number valid, but Supplier Code not found" on `SCRN1`.
   * **Display Results**: If both chains succeed, the program executes `Exfmt SCRN2`, populating the referenced fields with the supplier's contact data, pausing until the user presses Enter to return to the initial prompt.

3. **Program Termination:**
   * Upon pressing `F3` (Indicator 03), the loop condition `Not Exit` resolves to false.
   * Sets `*INLR = *ON` to close all files, release system locks, and return execution control to the operating system.

---

## Environment Reproduction: Setup, Compilation & Execution

Follow these steps to unpack the database files from the master course save file and run the application in your target IBM i library (`YOURLIB`):

### 1. Restore Database Files from Master Save File `RPGIV5THSU.savf`

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

**Step 4: Restore the physical files**  
Execute `RSTOBJ` to extract both required files from the container into your active library:
```cl
RSTOBJ OBJ(CSINVP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
RSTOBJ OBJ(CSSUPP) SAVLIB(RPGIV5THSU) DEV(*SAVF) SAVF(YOURLIB/RPGIV5THSU) RSTLIB(YOURLIB)
```

### 2. Compile Display File DDS
Place `INQSCREEN.dspf` into your source physical file `QDDSSRC` and compile using `CRTDSPF` (Create Display File):
```cl
CRTDSPF FILE(YOURLIB/INQSCREEN) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(INQSCREEN)
```

### 3. Compile and Run the Program
Place `PROJECT9.rpgle` into your source physical file `QRPGLESRC` and compile:
```cl
CRTBNDRPG PGM(YOURLIB/PROJECT9) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(PROJECT9)
```

Execute the program from the 5250 command line:
```cl
CALL PGM(YOURLIB/PROJECT9)
```

### 4. Interactive Testing
Test the UI error indicators and successful chains using the following data points:
* **Successful Chain**: Enter `117711` or `130102`.
* **Invalid Product (Ind 90)**: Enter `999999`.
* **Missing Supplier (Ind 95)**: Enter `110110`.