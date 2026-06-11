**Free
// This code is in fully free form, as denoted in line 1 above

//*************************************************************************************************
// MODPASS A Module that can be used by other programs
// Program: MODPASS.RPGLE
// Programmer: Chris Grimm
// Date: 03/21/21
//*************************************************************************************************

Ctl-opt Nomain;

// Prototype
Dcl-pr MODPASS Char(9);
  *N Char(10)   Value;
  *N Char(15)   Value;
  *N Zoned(6:0) Value;
End-pr;

// Procedure MODPASS
Dcl-proc MODPASS Export; // Begin procedure MODPASS

  // Procedure Interface
  Dcl-pi *N Char(9);
    CFNAME Char(10)   Value;
    CLNAME Char(15)   Value;
    CUSTNO Zoned(6:0) Value;
  End-pi;

  // Declare Standalone Variables
  Dcl-s PASSWORD Char(9);

  // Declare Constants
  Dcl-c Uppercase 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  Dcl-c Lowercase 'abcdefghijklmnopqrstuvwxyz';

  // Logic
  // Translates CFNAME from Uppercase to Lowercase and returns a substring of the first digit
  // Translates CLNAME from Uppercase to Lowercase and returns a substring of the first digit
  // Converts CUSTNO to Char data.
  // Adds an exclamation mark at the end of concatenated statement
  PASSWORD = %SUBST(%XLATE(Uppercase: Lowercase: CFNAME):1:1)
           + %SUBST(%XLATE(Uppercase: Lowercase: CLNAME):1:1)
           + %CHAR(CUSTNO) + '!';

  Return PASSWORD; // Return PASSWORD to the calling program/module

End-proc; // End procedure MODPASS