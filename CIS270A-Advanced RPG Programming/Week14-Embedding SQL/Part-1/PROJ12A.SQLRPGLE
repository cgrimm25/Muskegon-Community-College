**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ12A.SQLRPGLE
// Programmer: Chris Grimm
// Date: 04/17/21
// Creates an report using input WUSTDP

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files--
Dcl-f PRJ12APRTF Printer Usage(*Output) Oflind(EndOfPage);

// Data Structures--
Dcl-ds WUSTData Extname('WUSTDP') End-ds;

// Declare Standalone Variables
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

// Declare Constants-
Dcl-c Success '00000';
Dcl-c EndOfFile '02000';

// Main Procedure-

// Declare Cursor
Exec SQL Declare WUSTCursor Cursor For
  Select * from WUSTDP
  Where CRDTOT <= 30
  And DCODE = 'I'
  order by SLNAME
  for read only;

// Open cursor and return result set
Exec SQL Open WUSTCursor;

// Loop throught result set
Dou Sqlstate = EndOfFile;

  // Fetch a Row
  Exec SQL Fetch WUSTCursor into :WUSTDATA;

  Select;
    When Sqlstate = Success;
      Exsr Printdata;
    When Sqlstate = EndOfFile;
      Leave;
  Endsl;
Enddo;

// Close Cursor, End Program
Exec SQL Close WUSTCursor;

*Inlr = *On;
Return;

// Subroutins--

// PrintData Subroutine
Begsr PrintData;
  Exsr Overflow;
  Write DETAIL;
Endsr;

// Overflow Subroutine
Begsr Overflow;
  If EndOfPage;
    Write HEADING;
    EndOfPage = *Off;
  Endif;
Endsr;