**Free
// Program: PROJ1.RPGLE
// Programmer: Chris Grimm
// Date: 01/17/21
// Purpose: Generate Profit and Commission Report

// REMINDER: Programs written in free form start with **Free in 
// Line 1, column 1

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f CSINVP Disk Usage(*Input);
Dcl-f PROFITR Printer Usage(*Output) Oflind(EndOfPage);

// Declare Standalone Variables
Dcl-s EndOfPage Ind Inz(*On);

// Constants
Dcl-c COMRATE 0.10;

// ----------Main Procedure--------------------------------------------

READ CSINVP;                 // Priming read
DOW NOT %EOF(CSINVP);                // Begin loop
  
  IF EndOfPage;              // Heading logic
    Write HEADING;
    EndOfPage = *OFF;        // Turn indicator "off"
  ENDIF;                     // Terminate the if statement
  
  Profit = Sellpr - curcst;  // Calculate the profit
  EXSR COMMR;                // Calculate the commission
  TotalProf += Profit;       // Accumulate profit into grand total profit
  
  Write DETAIL;              // Print the detail line
  READ CSINVP;               // Read next record
ENDDO;                       // End loop

Write TOTAL;                 // Print the total line
*INLR = *ON;                 // Set Last Record Indicator on
RETURN;                      // End program

// ----------Subroutines-----------------------------------------------

Begsr COMMR;
  Eval(h) COMMISSION = PROFIT * COMRATE;
Endsr;