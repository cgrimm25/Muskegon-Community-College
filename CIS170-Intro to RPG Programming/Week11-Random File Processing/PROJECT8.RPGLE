**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT8.RPGLE
// Programmer: Chris Grimm
// Date: 11/02/20
// Creates an Report using Input WUSCTP & WUCRSP
// and Output PRJ8PRTF

// Control Options---
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f WUSCTP Disk Usage (Input) Keyed;
Dcl-f WUCRSP Disk Usage (Input) Keyed;
Dcl-f PRJ8PRTF Printer Usage (*Output) Oflind (EndOfPage);

//Declare Standalone Variables-
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

// Main Procedure

READ WUSCTP;                 // Read the first record "priming" read
DOW NOT %Eof;                // Check for end of file begin loop

  Chain (DEPT: %Char(CRSNO)) WUCRSP; // Chain into WUCRSP using listed keys

  If %Found(WUCRSP);         // If WUCRSP is found...
    If EndOfPage;            // If indicator is "On" this logic will occur
      Write HEADING;         // Write the Heading line
      EndOfPage = *Off;      // Turn indicator "off"
    Endif;                   // Terminate If statement

    Write DETAIL;            // Writes Detail line if record is found
  Else;                      // Otherwise
    Write ERROR;             // Writes Error line if record not found
  Endif;                     // Terminate the if statement

  Read WUSCTP;               // Read WUSCTP again
Enddo;                       // End of loop

*INLR = *ON;                 // Turn on the last record indicator
RETURN;                      // Return to OS or calling program

// End of Main Procedure---