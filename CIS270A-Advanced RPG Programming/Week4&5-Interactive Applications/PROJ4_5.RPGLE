**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ4_5.RPGLE
// Programmer: Chris Grimm
// Date: 02/09/21
// Purpose: Interactive program that allows a user to enter a student number 
//          to validate and display student details, input assignment grades, 
//          perform rigorous validation checks, and log audit entries to MYPOINTSP.

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f WUSTDP     Disk    Usage(Input) Keyed;
Dcl-f MYPOINTSP  Disk    Usage(*Output);
Dcl-f PRJ045DSPF Workstn Indds(Indicators);

// Indicator Data Structure
Dcl-ds Indicators Len(99);
  Exit       Ind Pos(3);    // F3=Exit
  Cancel     Ind Pos(12);   // F12=Cancel
  INVSTUSSN  Ind Pos(90);   // Invalid Student Number
  INVAPNT    Ind Pos(91);   // The points received cannot exceed the points possible
  NEGZERO    Ind Pos(92);   // The points possible cannot be zero or negative
  FAILOPASS  Ind Pos(93);   // Student failed / Student passed screen conditioning flag
End-ds;

// ----------Main Procedure--------------------------------------------

DOW Not Exit;
  Exfmt SCRN1;               // Prompt for Student Number input
  
  If Not Exit;
    // Reset data validation flags for a fresh transaction query
    INVSTUSSN = *OFF;
    INVAPNT   = *OFF;
    NEGZERO   = *OFF;
    
    Chain STUNO WUSTDP;      // Random access search using keyed Student Number
    INVSTUSSN = Not %Found(WUSTDP);
    
    If %Found(WUSTDP);
      Exfmt SCRN2;           // Prompt for Assignment Description and Points
      
      // Core Grading Data Validation Infrastructure
      If Not Exit and Not Cancel;
        // Loop 1: Prevent points received from exceeding points possible
        DOW (PTSRECEIVE > PTSPOSSIBL and Not Exit and Not Cancel);
          INVAPNT = *ON;
          Exfmt SCRN2;
        Enddo;
        INVAPNT = *OFF;      // Clear error flag once condition resolves
        
        // Loop 2: Prevent points possible from being zero or negative numbers
        DOW (PTSPOSSIBL <= 0 and Not Exit and Not Cancel);
          NEGZERO = *ON;
          Exfmt SCRN2;
        Enddo;
        NEGZERO = *OFF;      // Clear error flag once condition resolves
      Endif;
      
      // Grade Evaluation and Audit Logging
      If Not Exit and Not Cancel;
        Exsr CALC;           // Process mathematical standing subroutine
        
        If GRADE < 60;
          FAILOPASS = *ON;
          MSGF = 'Student failed';
        Else;
          FAILOPASS = *OFF;
          MSGP = 'Student passed';
        Endif;
        
        Exfmt SCRN3;         // Display final evaluation screen results
        Write POINTSREC;     // Commit transactional grade entry to physical database
      Endif;
      
    Endif;
  Endif;
Enddo;

*INLR = *ON;                 // Raise Last Record flag
RETURN;                      // Clean application shutdown execution

// ----------Subroutines-----------------------------------------------

Begsr CALC;
  // Compute grade percentage with precise half-adjust rounding mechanics
  Eval(h) GRADE = 100 * (PTSRECEIVE / PTSPOSSIBL);
Endsr;