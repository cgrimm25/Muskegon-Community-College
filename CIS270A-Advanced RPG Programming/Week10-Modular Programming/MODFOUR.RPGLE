**Free
// This code is in fully free form, as denoted in line 1 above

//*************************************************************************************************
// MODFOUR A Module that can be used by other programs
// Program: MODFOUR.RPGLE
// Programmer: Chris Grimm
// Date: 03/21/21
//*************************************************************************************************

Ctl-opt Nomain;

// Prototype
Dcl-pr MODFOUR Char(4);
  *N Zoned(10:0) Value;
End-pr;

// Procedure MODFOUR
Dcl-proc MODFOUR Export; // Begin procedure MODFOUR

  // Procedure Interface
  Dcl-pi *N Char(4);
    CPHONE Zoned(10:0) Value;
  End-pi;

  // Declare Standalone Variables
  Dcl-s LAST4PHONE Char(4);

  // Logic
  // Converts CPHONE to Char data and returns a substring of the last 4 digits of the phone number
  LAST4PHONE = %Subst(%Char(CPHONE): 7: 4);

  Return LAST4PHONE; // Return LAST4PHONE to the calling program/module

End-proc; // End procedure MODFOUR