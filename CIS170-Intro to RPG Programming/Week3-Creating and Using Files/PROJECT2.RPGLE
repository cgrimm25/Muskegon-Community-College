**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT2.RPGLE
// Programmer: Chris Grimm
// Date: 09/10/20
// Creates an Report using Input GTCSTP & Output PRJ2PRTF

// Control Options---
Ctl-opt Option(*Nodebugio);

// Declare Files----
Dcl-f GTCSTP Disk Usage (Input);
Dcl-f PRJ2PRTF Printer Usage (*Output) Oflind (EndOfPage);

// Declare Standalone Variables
Dcl-s EndOfPage Ind Inz (*On); // Overflow indicator, set to "on"

// ----------Main Procedure--------------------------------------------
READ GTCSTP;                 // Read the first record "priming" read
 DOW NOT %EOF;               // Check for end of file; begin loop
   IF EndOfPage;             // if indicator is "On" this logic will occur
     Write Heading;
     EndOfPage = *Off;       // turn indicator "off"
   Endif;                    // terminate the if statement
   Write Detail;             // Write a detail record on the report
   READ GTCSTP;              // get another record
 ENDDO;                      // End of loop
*INLR = *ON;                 // turn on the last record indicator
RETURN;                      // Return to OS or calling program