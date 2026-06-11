**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ12B.SQLRPGLE
// Programmer: Chris Grimm
// Date: 04/18/21
// Creates an report using input WUSCTP

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files--
Dcl-f PRJ12BPRTF Printer Oflind(EndOfPage);

// Data Structures-
Dcl-ds MyData Extname('MYSECTIONS') End-ds;

// Declare Standalone Variables
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

//Declare Constants--
Dcl-c Success '00000';
Dcl-c EndOfFile '02000';

// Main Procedure-

// Update using set at a time processing
Exec SQL Update MYSECTIONS
  Set Cap = Cap * 1.15
  Where DEPT = 'MTH';

// Generate report of all records after the update

// Declare Cursor
Exec SQL Declare MyCursor Cursor For
  Select * from MYSECTIONS
  Where DEPT = 'MTH'
  order by CAP Desc
  for read only;

// Open cursor and return result set
Exec SQL Open MyCursor;

// Loop throught result set
Dou Sqlstate = EndOfFile;

  // Fetch a Row
  Exec SQL Fetch MyCursor into :MYDATA;

  Select;
    When Sqlstate = Success;
      Exsr Printdata;
    When Sqlstate = EndOfFile;
      Leave;
  Endsl;
Enddo;

// Close Cursor, End Program
Exec SQL Close MyCursor;

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