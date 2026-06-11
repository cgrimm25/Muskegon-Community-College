**Free
// This code is in fully free form, as denoted in line 1 above

// Program: MAKEDATE.RPGLE
// Programmer: Chris Grimm
// Date: 03/17/21
// Purpose: Sub-program to convert a numeric date and project a 30-day reminder milestone

// Control Options
Ctl-opt Option(*Nodebugio);

// Main Prototype
Dcl-pr MAKEDATE Extpgm;
  *N Zoned(8:0) Const;
  *N Date(*ISO);
End-pr;

// Procedure Interface
Dcl-pi MAKEDATE;
  ORDDAT     Zoned(8:0) Const;
  SENDEMAILR Date(*ISO);
End-pi;

// Logic
// Converts ORDDAT from a legacy numeric date format to a native date object
// and adds a 30-day duration buffer to that date
SENDEMAILR = %Date(ORDDAT: *USA) + %Days(30);

*Inlr = *On;  // Turn on the last record indicator
Return;       // Return to OS or calling program