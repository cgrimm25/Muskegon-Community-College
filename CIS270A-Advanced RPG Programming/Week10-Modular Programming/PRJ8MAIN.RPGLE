**Free
// This code is in fully free form, as denoted in line 1 above

//*************************************************************************************************
// Module that will be the entry point when bound with other modules (MODID, MODPASS, MODFOUR, and
// MODDATE)
// Program: PRJ8MAIN.RPGLE
// Programmer: Chris Grimm
// Date: 03/21/21
// Purpose: Batch program that calls several procedures to generate a report consisting of
//          Customer Number, User ID, Password, Last Four of Phone, and an email reminder date
//*************************************************************************************************

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f CSCSTP    Disk    Usage(*Input);
Dcl-f PRJ08PRTF Printer Usage(*Output) Oflind(EndOfPage);

// Prototype and Procedure Interface for PRJ8MAIN
Dcl-pr PRJ8MAIN Extpgm End-pr;
Dcl-pi PRJ8MAIN End-pi;

// Prototypes for called procedures
Dcl-pr MODID Char(33);
  *N Char(10)   Value;
  *N Char(15)   Value;
  *N Zoned(6:0) Value;
End-pr;

Dcl-pr MODPASS Char(9);
  *N Char(10)   Value;
  *N Char(15)   Value;
  *N Zoned(6:0) Value;
End-pr;

Dcl-pr MODFOUR Char(4);
  *N Zoned(10:0) Value;
End-pr;

Dcl-pr MODDATE Date(*ISO);
  *N Zoned(8:0) Value;
End-pr;

// Declare Standalone Variables
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

// ----------Main Procedure--------------------------------------------

READ CSCSTP;                // Read the first record "priming" read
DOW NOT %EOF(CSCSTP);       // Check for end of file; begin loop

  If EndOfPage;             // If indicator is "On" this logic will occur
    WRITE HEADING;          // Write a Heading line on the report
    EndOfPage = *Off;       // Turn indicator "Off"
  Endif;                    // Terminate the if statement

  // Create user id by calling procedure MODID
  USERID = MODID(CFNAME: CLNAME: CUSTNO);

  // Create a password by calling procedure MODPASS
  PASSWORD = MODPASS(CFNAME: CLNAME: CUSTNO);

  // Create a field consisting of the last 4 digits of customer's phone number
  // by calling procedure MODFOUR
  LAST4PHONE = MODFOUR(CPHONE);

  // Create an email reminder date by calling procedure MODDATE
  SENDEMAILR = MODDATE(ORDDAT);

  WRITE DETAIL;             // Write a detail record on the report
  READ CSCSTP;              // Get another record
Enddo;                      // End of loop

*Inlr = *On;                // Turn on the last record indicator
Return;                     // Return to OS or calling program