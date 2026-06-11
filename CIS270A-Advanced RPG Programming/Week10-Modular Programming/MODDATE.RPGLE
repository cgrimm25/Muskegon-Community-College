**Free
// This code is in fully free form, as denoted in line 1 above

//*************************************************************************************************
// MODDATE A Module that can be used by other programs
// Program: MODDATE.RPGLE
// Programmer: Chris Grimm
// Date: 03/21/21
//*************************************************************************************************

Ctl-opt Nomain;

// Prototype
Dcl-pr MODDATE Date(*ISO);
  *N Zoned(8:0) Value;
End-pr;

// Procedure MODDATE
Dcl-proc MODDATE Export; // Begin procedure MODDATE

  // Procedure Interface
  Dcl-pi *N Date(*ISO);
    ORDDAT Zoned(8:0) Value;
  End-pi;

  // Declare Standalone Variables
  Dcl-s SENDEMAILR Date(*ISO);

  // Logic
  // Converts ORDDAT from a legacy date to a native date(mm/dd/yyyy) and adds 30 days to that date
  SENDEMAILR = %Date(ORDDAT: *USA) + %Days(30);

  Return SENDEMAILR; // Return SENDEMAILR to the calling program/module

End-proc; // End procedure MODDATE