**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT1.RPGLE
// Programmer: Chris Grimm
// Date: 09/01/20
// Creates an Inventory Report for CloudServices 24/7

// Control Options 
Ctl-opt Option(*Nodebugio);

// Declare Files----
Dcl-f CSINVP Disk Usage (Input);
Dcl-f INVREPORT Printer Usage (*Output) Oflind(EndOfPage);

// Declare Standalone Variables
Dcl-s EndOfPage Ind Inz (*On); // Overflow indicator, set to "on"

// ----------Main Procedure--------------------------------------------
READ CSINVP;                 // Read the first record "priming" read
 DOW NOT %EOF;               // Check for end of file; begin loop
   IF EndOfPage;             // if indicator is "On" this logic will occur
     Write Heads;
     EndOfPage = *Off;       // turn indicator "off"
   Endif;                    // terminate the if statement
   Write Detail;             // Write a detail record on the report
   READ CSINVP;              // get another record
 ENDDO;                      // End of loop
*INLR = *ON;                 // turn on the last record indicator
RETURN;                      // Return to OS or calling program