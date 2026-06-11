**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ10A.RPGLE
// Programmer: Chris Grimm
// Date: 04/05/21
// Creates an report using input GTCPAYP & MYCSTP
// Also updates MYCSTP using input GTCPAYP

// Control Options---
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f MYCSTP   Disk    Usage(*Update) Keyed;
Dcl-f GTCPAYP  Disk    Usage(*Input)  Keyed;
Dcl-f PRJ10AP1 Printer Usage(*Output) Oflind(EndOfPage);

// Declare Standalone Variables--
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

// Main Procedure-
READ GTCPAYP; // Read the first record "priming" read
DOW NOT %Eof(GTCPAYP); // Check for end of file; begin loop

  If EndOfPage; // If indicator is "On" this logic will occur
    Write HEADING; // Write the Heading line
    EndOfPage = *Off; // Turn indicator "off"
  Endif; // Terminate If statement

  Chain CPHONE MYCSTP; // Chain into MYCSTP using listed key
  If %Found(MYCSTP); // If MYCSTP is found.
    Exsr GOODCHAIN; // Execute subroutine GOODCHAIN
  Else; // Otherwise
    Exsr BADCHAIN; // Execute subroutine BADCHAIN
  Endif; // Terminate the if statement

  Read GTCPAYP; // Read GTCPAYP again
Enddo; // End of loop

Write ERROR; // Writes ERROR line
*INLR = *ON; // Turn on the last record indicator
RETURN; // Return to OS or calling program

// Subroutines--
Begsr GOODCHAIN;
  AMTOWE = AMTOWE - AMTPD;
  PAYDATL = DATRCVL;
  PAYDAT = DATRCV;
  Update CUSREC %Fields(AMTOWE: PAYDATL: PAYDAT); // Update following
  // fields in CUSREC
  Write DETAIL; // Writes DETAIL line if record is found
Endsr;

Begsr BADCHAIN;
  Write ERRORL; // Writes EERRORL line if record not found
  ERRORTOT += 1; // For each error line written add 1
Endsr;