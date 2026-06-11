**Free
// This code is in fully free form, as denoted in line 1 above

// Program: MAKEFOUR.RPGLE
// Programmer: Chris Grimm
// Date: 03/17/21
// Purpose: Sub-program to extract the last 4 digits of a telephone number

// Control Options
Ctl-opt Option(*Nodebugio);

// Main Prototype
Dcl-pr MAKEFOUR Extpgm;
  *N Packed(10:0);
  *N Char(4);
End-pr;

// Procedure Interface
Dcl-pi MAKEFOUR;
  PACKCPHONE Packed(10:0);
  LAST4PHONE Char(4);
End-pi;

// Logic
// Converts PACKCPHONE to character data and returns a substring of the last 4 digits
LAST4PHONE = %Subst(%Char(PACKCPHONE): 7: 4);

*Inlr = *On;  // Turn on the last record indicator
Return;       // Return to OS or calling program