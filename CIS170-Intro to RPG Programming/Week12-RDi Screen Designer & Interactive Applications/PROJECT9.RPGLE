**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT9.RPGLE
// Programmer: Chris Grimm
// Date: 11/11/20
// Create an interactive program that uses inputs CSINVP & CSSUPP displaying results with INQSCREEN


// Control Options---
Ctl-opt Option(*Nodebugio);

//Declare Files
Dcl-f CSINVP Disk Usage(Input) Keyed;
Dcl-f CSSUPP Disk Usage(Input) Keyed;
Dcl-f INQSCREEN Workstn Indds(Indicators);

// Indicator Data Structure-
Dcl-ds Indicators Len(99);
  Exit       Ind Pos(3);    // F3 Exit
  INVPRODNO  Ind Pos(90);   // Invalid product number
  NOTFOUND   Ind Pos(95);   // Product Number valid, but Supplier Code not found
End-ds;

// Main Procedure--

DOW Not Exit;                // Check for end of file begin loop
  Exfmt SCRN1;               // Execute Format SCRN1
  If Not Exit;               // When user wants to continue
    Chain PRODIN CSINVP;     // Chain into CSINVP using key PRODIN
    INVPRODNO = Not %Found(CSINVP); // Display "Invalid product number" message

    If %Found(CSINVP);       // If PRODIN in CSINVP is found
      Chain SUPCOD CSSUPP;   // Chain into CSSUPP using key PRODIN
      NOTFOUND = Not %Found(CSSUPP); // Display "Product Number valid, but Supplier Code not found"

      If %Found(CSSUPP);     // If SUPCOD in CSSUPP is found
        Exfmt SCRN2;         // Execute Format SCRN2
      Endif;                 // Terminate the if statement
    Endif;                   // Terminate the if statement
  Endif;                     // Terminate the if statement
Enddo;                       // End of loop

*INLR = *ON;                 // Turn on the last record indicator
RETURN;                      // Return to OS or calling program

// End of Main Procedure