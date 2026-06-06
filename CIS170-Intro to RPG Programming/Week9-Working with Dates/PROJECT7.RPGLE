**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT7.RPGLE
// Programmer: Chris Grimm
// Date: 10/21/20
// Creates an Report using Input INSTRUCTLF(WUINSTP) & Output RETIREREP

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f INSTRUCTLF Disk Usage(Input) Keyed;
Dcl-f RETIREREP Printer Usage(*Output) Oflind(EndOfPage);

// Declare Standalone Variables-
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"
Dcl-s Currentdate Date Inz(*Sys);
Dcl-s GSALARY Zoned(11:2);

// Main Procedure-

READ INSTRUCTLF;             // Read the first record "priming" read
DOW NOT %EOF;                // Check for end of file; begin loop

  HIREDATE = %Date(HIRDAT);  //Ask Professor P about this
  RDATE = HIREDATE + %Years(30);
  RYEARS = %Diff(RDATE: Currentdate: *Years);
  COMBINED = %TRIM(IFNAME) + ' ' + %TRIM(ILNAME);
  COUNT += 1;
  GSALARY += SALARY;

  If EndOfPage;              // if indicator is "On" this logic will occur
    Write HEADINGS;
    EndOfPage = *Off;        // turn indicator "off"
  Endif;                     // terminate the if statement

  Write DETAIL;              // Write a detail record on the report
  READ INSTRUCTLF;           // get another record
ENDDO;                       // End of loop

Eval(h) AVGWAGE = GSALARY / COUNT; // Write the total line only once, after the loop finishes
Write FOOTER;

*INLR = *ON;                 // turn on the last record indicator
RETURN;                      // Return to OS or calling program