**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT10
// Programmer: Chris Grimm
// Date: 11/18/20
// Create an interactive program that uses input WUEXAMP displaying
// Student Exam Results with PRJ10DSPF


// Control Options---
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f WUEXAMP Disk Usage(Input) Keyed;
Dcl-f PRJ10DSPF Workstn Indds(Indicators);

// Indicator Data Structure--
Dcl-ds Indicators Len(99);
  Exit      Ind Pos(3);    // F3=Exit
  Cancel    Ind Pos(12);   // F12=Cancel
  INVSTUNO  Ind Pos(90);   // Invalid Student Number
End-ds;

// Main Procedure--

DOW Not Exit;                // Do until user hits Exit
  Exfmt SCRN1;               // Execute Format SCRN1
  If Not Exit;               // If user does not hit Exit
    Chain STUNO WUEXAMP;     // Chain into WUEXAMP using key STUNO
    INVSTUNO = Not %Found(WUEXAMP); // If Student Number not found Display: Invalid Student Number

    If %Found(WUEXAMP);      // If Student Number in WUEXAMP is found
      Exfmt SCRN2;           // Execute Format SCRN2
    Endif;                   // Terminate the if statement
  Endif;                     // Terminate the if statement
Enddo;                       // End of loop

*INLR = *ON;                 // Turn on the last record indicator
RETURN;                      // Return to OS or calling program

//End of Main Procedure---