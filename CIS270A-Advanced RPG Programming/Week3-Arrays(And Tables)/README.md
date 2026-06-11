# Advanced RPG Project 3: Wexler University Student Exam Average & Grade Report

## Overview
This project implements an advanced array manipulation and character-parsing engine on the IBM i platform using fully free-form RPGLE, externally described physical database schemas, and structured printer layouts. The application handles complex data normalization by decoding 25 consecutive, un-delimited student exam scores stored inside a single character string block. It leverages data structure memory overlays to cleanly slice alphanumeric buffers into numeric arrays, executes high-speed matrix additions using vector-style built-in functions (%XFOOT), and processes event-driven grading classifications via compile-time alternating arrays to completely eliminate performance-heavy conditional branching loops (IF/ELSEIF blocks) per academic administrative specifications.

---

## File Directory
* **`GRADEBOOK.PF`**: The externally described physical database file source definition specifying unique student keys, first and last name containers, and the primary un-parsed 75-byte exam score block field.
* **`PROJ3.RPGLE`**: The core data processing program written in fully free-form RPGLE. It manages the primary file iteration loop, configures data structure memory matrices, maps alternating compile-time data arrays, and executes matrix arithmetic lookup subroutines.
* **`PRJ03PRTF.PRTF`**: The externally described printer layout Data Description Specifications (DDS). Mapped via the RDi Report Designer, it structures report headers (HEADING), zero-suppressed counters, custom suffix literals (%), and detail audit rows (DETAIL).
* **`Project 3 Instructions.pdf`**: The official specifications sheet mapping out data parsing challenges, explicit grading scales, architectural constraints, and visual printchart targets.
* **`GRADEBOOK.PF-DTA.pdf`**: A diagnostic environment printout showing raw production student exam records housed within the host table layer.
* **`PROJ3-OUTPUT.pdf`**: The final compiled execution report spool print stream demonstrating precise column alignment, combined student names, and correctly computed letter grade assignments.

---

## Architectural Schema & Memory Layouts

### 1. Master Database Schema (`GRADEBOOK`)
Records are processed sequentially from the externally described physical storage model utilizing a unique primary identifier path:
* **`STUNO`**: Zoned Decimal (9,0) representing the unique student identification number (Primary Access Key).
* **`SFNAME`**: Character (10) field storing the student's first name.
* **`SLNAME`**: Character (15) field storing the student's last name.
* **`SCORES`**: Alphanumeric Text (75) acting as a compressed data buffer housing 25 independent, 3-digit whole numeric percentage marks back-to-back (e.g., `095088100...`).

### 2. Data Structure Array Overlay Matrix
Because the 25 exam scores are jammed into a flat 75-character text buffer, they cannot be natively referenced by standard mathematical processing commands. The program bypasses manual substring loop slicing by mapping an internal data structure overlay at the memory layout level:
```rpgle
Dcl-ds *N;
  SCORES      Char(75);
  SCORESARRAY Zoned(3:0) Dim(25) Pos(1);
End-ds;