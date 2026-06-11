**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PRJ7CALLER.RPGLE
// Programmer: Chris Grimm
// Date: 03/17/21
// Purpose: Batch program that calls several programs to generate a report consisting of
//          Customer Number, User ID, Password, Last Four of Phone, and an email reminder date

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f CSCSTP    Disk    Usage(Input);
Dcl-f PRJ07PRTF Printer Usage(*Output) Oflind(EndOfPage);

// Prototype and Procedure Interface for PRJ7CALLER
Dcl-pr PRJ7CALLER Extpgm;
End-pr;

Dcl-pi PRJ7CALLER End-pi;

// Prototypes for called programs
Dcl-pr MAKEID Extpgm;
  *N Char(10)   Const;
  *N Char(15)   Const;
  *N Zoned(6:0) Const;
  *N Char(33);
End-pr;

Dcl-pr MAKEPASS Extpgm;
  *N Char(10)   Const;
  *N Char(15)   Const;
  *N Zoned(6:0) Const;
  *N Char(9);
End-pr;

Dcl-pr MAKEFOUR Extpgm;
  *N Packed(10:0);
  *N Char(4);
End-pr;

Dcl-pr MAKEDATE Extpgm;
  *N Zoned(8:0) Const;
  *N Date(*USA);
End-pr;

// Declare Standalone Variables
Dcl-s EndOfPage   Ind           Inz(*On); // Overflow indicator, set to "on"
Dcl-s PACKCPHONE Packed(10:0);

// ----------Main Procedure--------------------------------------------

READ CSCSTP;                // Read the first record "priming" read
DOW NOT %Eof(CSCSTP);       // Check for end of file; begin loop

  If EndOfPage;             // If indicator is "On" this logic will occur
    WRITE HEADING;          // Write a Heading line on the report
    EndOfPage = *Off;       // Turn indicator "Off"
  Endif;                    // Terminate the if statement

  // Create user id by calling procedure MAKEID
  MAKEID(CFNAME: CLNAME: CUSTNO: USERID);

  // Create a password by calling procedure MAKEPASS
  MAKEPASS(CFNAME: CLNAME: CUSTNO: PASSWORD);

  // Create a field consisting of the last 4 digits of customer's phone number
  // by calling procedure MAKEFOUR
  PACKCPHONE = %Dec(CPHONE); // Convert CPHONE to packed data
  MAKEFOUR(PACKCPHONE: LAST4PHONE);

  // Create an email reminder date by calling procedure MAKEDATE
  MAKEDATE(ORDDAT: SENDEMAILR);

  WRITE DETAIL;             // Write a detail record on the report
  READ CSCSTP;              // Get another record
Enddo;                      // End of loop

*Inlr = *On;                // Turn on the last record indicator
Return;                     // Return to OS or calling program