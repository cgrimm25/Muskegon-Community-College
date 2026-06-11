**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ10B.RPGLE
// Programmer: Chris Grimm
// Date: 04/05/21
// Creates an report using input GTCPAYP & MYCSTP
// Also updates MYCSTP using input GTCPAYP

// Control Options---
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f MYCSTP     Disk    Usage(*Update) Keyed;
Dcl-f GTCPAYP    Disk    Usage(*Input)  Keyed;
Dcl-f PRJ10BPRTF Printer Usage(*Output) Oflind(EndOfPage);

//Declare Standalone Variables--
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

//Main Procedure--
Monitor;
  READ GTCPAYP; // Read the first record "priming" read

  DOW NOT %Eof(GTCPAYP); // Check for end of file begin loop

    If EndOfPage; // If indicator is "On" this logic will occur
      Write HEADING; // Write the Heading line
      EndOfPage = *Off; // Turn indicator "off"
    Endif; // Terminate If statement

    Close MYCSTP; // Close file MYCSTP
    Chain CPHONE MYCSTP; // Chain into MYCSTP using listed key

    Read GTCPAYP; // Read GTCPAYP again
  Enddo; // End of loop

On-error *File;
  Exsr INOUTERROR; // Execute subroutine INOUTERROR

On-error *All;
  Exsr ALL;
  Write ERROR; // Writes ERROR line
Endmon;

*INLR = *ON; // Turn on the last record indicator
RETURN; // Return to OS or calling program

//Subroutines-
Begsr INOUTERROR;
  Write INOUTPUT;
  *INLR = *On;
  Return;
Endsr;

Begsr ALL;
  Write ERRORALL;
  *INLR = *ON;
  Return;
Endsr;