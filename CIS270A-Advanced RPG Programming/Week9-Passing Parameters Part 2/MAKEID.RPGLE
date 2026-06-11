**Free
// This code is in fully free form, as denoted in line 1 above

// Program: MAKEID.RPGLE
// Programmer: Chris Grimm
// Date: 03/17/21
// Purpose: Sub-program to generate a lowercase user ID from student name and number

// Control Options
Ctl-opt Option(*Nodebugio);

// Main Prototype
Dcl-pr MAKEID Extpgm;
  *N Char(10)   Const;
  *N Char(15)   Const;
  *N Zoned(6:0) Const;
  *N Char(33);
End-pr;

// Procedure Interface
Dcl-pi MAKEID;
  CFNAME  Char(10)   Const;
  CLNAME  Char(15)   Const;
  CUSTNO  Zoned(6:0) Const;
  USERID  Char(33);
End-pi;

// Declare Constants
Dcl-c Uppercase 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
Dcl-c Lowercase 'abcdefghijklmnopqrstuvwxyz';

// Logic
// Translates CFNAME from Uppercase to Lowercase, adds a ".",
// translates CLNAME from Uppercase to Lowercase, adds a ".",
// and converts CUSTNO to character data.
USERID = %TRIM(%XLATE(Uppercase: Lowercase: CFNAME)) + '.' 
       + %TRIM(%XLATE(Uppercase: Lowercase: CLNAME)) + '.' 
       + %Char(CUSTNO);

*Inlr = *On;  // Turn on the last record indicator
Return;       // Return to OS or calling program