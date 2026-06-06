**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT6.RPGLE
// Programmer: Chris Grimm
// Date: 10/16/20
// Creates an Report using Input CSCSTP & Output PRJ6PRTF

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Constant-
Dcl-c Lowercase 'abcdefghijklmnopqrstuvwxyz';
Dcl-c Uppercase 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Declare Files--
Dcl-f CSCSTP Disk Usage (Input);
Dcl-f PRJ6PRTF Printer Usage (*Output) Oflind (EndOfPage);

// Declare Standalone Variables--
Dcl-s EndOfPage Ind Inz (*On);
Dcl-s MyDate Varchar(8);
Dcl-s CUSTZIP Packed(9);

// Main Procedure-

READ CSCSTP;                 // Read the first record "priming" read
 DOW NOT %EOF;               // Check for end of file; begin loop

   USERID = %TRIM(%XLATE(Uppercase: Lowercase: CFNAME)) 
          + %TRIM(%XLATE(Uppercase: Lowercase: CLNAME)) 
          + '.' 
          + %CHAR(CUSTNO);

   PASSWORD = %SUBST(%XLATE(Uppercase: Lowercase: CFNAME):1:1)
            + %SUBST(%XLATE(Uppercase: Lowercase: CLNAME):1:1)
            + %CHAR(CUSTNO) 
            + '!';

   NAME = %TRIM(%XLATE(Uppercase: Lowercase: CFNAME)) 
        + ' ' 
        + %TRIM(%XLATE(Uppercase: Lowercase: CLNAME));

   CUSTZIP = %DEC(CZIP:10:0);
   ZIP = %EDITW(CUSTZIP:'0         ');
   PHONE = %EDITW(CPHONE:'(   )   -    ');

   MyDate = %CHAR(ORDDAT);

   If %LEN(MyDate) = 7;
     YEAROUT = %SUBST(MYDATE: 4:4);
   Else;
     YEAROUT = %SUBST(MYDATE: 5:4);
   Endif;

   BALANCE = %EDITC(BALDUE: '1');

   IF EndOfPage;             // If indicator is "On" this logic will occur
     Write HEADING;
     EndOfPage = *off;       // turn indicator "off"
   EndIf;

   Write DETAIL;             // Write a detail record on the report
   READ CSCSTP;              // get another record
 ENDDO;                      // End of loop

*INLR = *ON;                 // turn on the last record indicator
RETURN;                      // Return to OS or calling program