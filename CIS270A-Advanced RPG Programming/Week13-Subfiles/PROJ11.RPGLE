**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ11.RPGLE
// Programmer: Chris Grimm
// Date: 04/15/21
// CompuSell Order Inquiry and Update

//Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f CSORDPRPLF Usage(*Update: *Input: *Output) Keyed;
Dcl-f PRJ11DSPF  Workstn Sfile(SFLSHBO:Rrn) Indds(Indicators);

// Standalone Variables--
Dcl-s Rrn Zoned(3:0);

// Indicator Data Structure--
Dcl-ds Indicators Len(99);
  Exit       Ind Pos(3);   // F3=Exit
  Cancel     Ind Pos(12);  // F12=Cancel
  Sflclr     Ind Pos(50);  // Indicator for subfile clear subroutine
  Sfldsp     Ind Pos(51);  // Indicator for subfile display/display control
  Sflend     Ind Pos(52);  // Indicator that allows to scroll for more records
  Nocorerec  Ind Pos(90);  // No corresponding record found
End-ds;

// Main Procedure--
Dow Not Exit;
  Exfmt SCRN1;
  If Not Exit; // If not exit
    Setll STSIN CSORDPRPLF; // set lower limit for field STSIN using logical file (CSORDPRPLF)
    If Not %Equal(CSORDPRPLF); // If input is not equal to SH or BO
      Nocorerec = *On; // turn indicator on and display message
    Else; // Otherwise
      Exsr Clearsfl; // execute subroutine Clearsfl
      Exsr Loadsfl;  // execute subroutine Loadsfl
      Write FOOTER;  // write Footer
      Sflend = *On;  // turn indicator on
      Exfmt CTLSHBO; // execute format CTLSHBO
      If Not Exit And Not Cancel; // If not Exit and Not cancel
        Exsr Updatesr; // Execute subroutine Updatesr
      Endif; // terminate the if statement
    Endif; // Terminate the if statement
  Endif; // Terminate the if statement
Enddo; // End of loop

*INLR = *On; // Turn on the last record indicator
Return;      // Return to OS or calling program

//Subroutines----

// Subroutine to clear the subfile and reset Rrn to 0
Begsr CLEARSFL;
  Sflclr = *On;
  Sfldsp = *Off;
  Write CTLSHBO;
  Sflclr = *Off;
  Rrn = 0;
Endsr;

// Subroutine to load the subfile until no more section records exist
Begsr LOADSFL;
  Reade STSIN CSORDPRPLF;
  Dow Not %Eof(CSORDPRPLF);
    Rrn = Rrn + 1;
    Exsr Movedb;
    Write SFLSHBO;
    Reade STSIN CSORDPRPLF;
  Enddo;
  Sfldsp = (Rrn > 0); // Sfldsp is "on" if records were loaded
Endsr;

// Subroutine to read changed records in the subfile and update the database records
Begsr Updatesr;
  Readc SFLSHBO;
  Dow Not %Eof;
    Chain (STSIN:ORD#:PRODNO) CSORDPRPLF;
    If %Found(CSORDPRPLF);
      Exsr Movesfl;
      UPDATE ORDERREC;
    Endif;
    Readc SFLSHBO;
  Enddo;
Endsr;

// Subroutine to transfer values from database fields to subfile fields
Begsr Movedb;
  XQTYORD = QTYORD;
  XQTYHOLD = QTYHOLD;
  XTRACK = TRACK;
  XSTS = STS;
Endsr;

// Subroutine to transfer values from subfile fields to database fields
Begsr Movesfl;
  QTYORD = XQTYORD;
  QTYHOLD = XQTYHOLD;
  TRACK = XTRACK;
  STS = XSTS;
Endsr;