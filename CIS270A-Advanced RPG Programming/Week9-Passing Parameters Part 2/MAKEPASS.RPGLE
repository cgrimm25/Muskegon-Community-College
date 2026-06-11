**Free
// This code is in fully free form, as denoted in line 1 above

// Program: MAKEPASS.RPGLE
// Programmer: Chris Grimm
// Date: 03/17/21
// Purpose: Sub-program to generate a formatted student password using initials, number, and punctuation

// Control Options
Ctl-opt Option(*Nodebugio);

// Main Prototype
Dcl-pr MAKEPASS Extpgm;
  *N Char(10)   Const;
  *N Char(15)   Const;
  *N Zoned(6:0) Const;
  *N Char(9);
End-pr;

// Procedure Interface
Dcl-pi MAKEPASS;
  CFNAME   Char(10)   Const;
  CLNAME   Char(15)   Const;
  CUSTNO   Zoned(6:0) Const;
  PASSWORD Char(9);
End-pi;

// Declare Constants
Dcl-c Uppercase 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
Dcl-c Lowercase 'abcdefghijklmnopqrstuvwxyz';

// Logic
// Translates names from Uppercase to Lowercase, extracts initials via substring,
// appends the character form of CUSTNO, and adds a terminal exclamation mark.
PASSWORD = %SUBST(%XLATE(Uppercase: Lowercase: CFNAME): 1: 1)
         + %SUBST(%XLATE(Uppercase: Lowercase: CLNAME): 1: 1)
         + %CHAR(CUSTNO) + '!';

*Inlr = *On;  // Turn on the last record indicator
Return;       // Return to OS or calling program