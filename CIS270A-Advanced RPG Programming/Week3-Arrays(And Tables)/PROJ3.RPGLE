**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ3.RPGLE
// Programmer: Chris Grimm
// Date: 01/27/21
// Purpose: Creates a student grade report using input GRADEBOOK

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f GRADEBOOK Disk Usage(Input);
Dcl-f PRJ03PRTF Printer Usage(*Output) Oflind(EndOfPage);

// Declare Standalone Variables
Dcl-s I          Packed(2:0);  // Index value that holds the number of elements in array
Dcl-s EndOfPage Ind    Inz(*On); // Overflow indicator, set to "on"

// Define Arrays (Alternating Compile-Time Arrays)
Dcl-s PERCENTS Zoned(5:2) Dim(12) Ctdata Ascend; // Holds the grades in percent form (lowest to highest)
Dcl-s GRADES   Char(2)    Dim(12) Alt(PERCENTS);  // Holds the grades in letter form

// Declare Data Structures for Array Overlay Mapping
Dcl-ds *N;
  SCORES      Char(75);
  SCORESARRAY Zoned(3:0) Dim(25) Pos(1); // Maps the 25 student scores from the 75-byte buffer
End-ds;

// ----------Main Procedure--------------------------------------------

READ GRADEBOOK;             // Read the first record "priming" read
DOW NOT %Eof(GRADEBOOK);     // Check for end of file; begin loop

  If EndOfPage;             // If indicator is "On" this logic will occur
    Write HEADING;          // Write the Heading line
    EndOfPage = *Off;       // Turn indicator "off"
  Endif;                    // Terminate If statement

  Exsr CALC;                // Execute subroutine CALC
  Write DETAIL;             // Writes DETAIL line
  
  Read GRADEBOOK;           // Read GRADEBOOK again
Enddo;                      // End of loop

*INLR = *ON;                // Turn on the last record indicator
RETURN;                     // Return to OS or calling program

// ----------Subroutines-----------------------------------------------

Begsr CALC;
  // Finds the mean of the student's scores across the 25 slots
  Eval(h) AVGSCORE = %Xfoot(SCORESARRAY) / 25; 
  
  // Trims and combines first and last names into a clean presentation field
  COMBNAME = %TRIM(SFNAME) + ' ' + %TRIM(SLNAME); 
  
  // Looks up the dynamic average score position inside the percentage threshold array
  I = %Lookupge(AVGSCORE: PERCENTS); 
  
  // Assigns the final letter grade based on the matched array index
  GRADE = GRADES(I); 
Endsr;

// ----------Compile Time Data-----------------------------------------
**Ctdata PERCENTS
05900E 
06200D-
06600D 
06900D+
07200C-
07600C 
07900C+
08200B-
08600B 
08900B+
09200A-
10000A