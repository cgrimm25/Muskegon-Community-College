**Free
// This code is in fully free form, as denoted in line 1 above

//*************************************************************************************************
// MODID A Module that can be used by other programs
// Program: MODID.RPGLE
// Programmer: Chris Grimm
// Date: 03/21/21
//*************************************************************************************************

Ctl-opt Nomain;

// Prototype
Dcl-pr MODID Char(33);
  *N Char(10)   Value;
  *N Char(15)   Value;
  *N Zoned(6:0) Value;
End-pr;

// Procedure MODID
Dcl-proc MODID Export; // Begin procedure MODID

  // Procedure Interface
  Dcl-pi *N Char(33);
    CFNAME Char(10)   Value;
    CLNAME Char(15)   Value;
    CUSTNO Zoned(6:0) Value;
  End-pi;

  // Declare Standalone Variables
  Dcl-s USERID Char(33);

  // Declare Constants
  Dcl-c Uppercase 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  Dcl-c Lowercase 'abcdefghijklmnopqrstuvwxyz';

  // Logic
  // Translates CFNAME from Uppercase to Lowercase
  // Adds a "."
  // Translates CLNAME from Uppercase to Lowercase
  // Adds a "."
  // Converts CUSTNO to Char data.
  USERID = %TRIM(%XLATE(Uppercase: Lowercase: CFNAME)) + '.'
         + %TRIM(%XLATE(Uppercase: Lowercase: CLNAME)) + '.'
         + %Char(CUSTNO);

  Return USERID; // Return USERID to the calling program/module

End-proc; // End procedure MODID