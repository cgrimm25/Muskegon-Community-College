**Free
//********************************************************************************
// Program: USERAPP.RPGLE
// Programmer: Chris Grimm
// Date: 04/01/21
// Purpose: Main procedure that calls bound modules (MODID and MODPASS) to 
//          generate a User ID and Password based on user input from 
//          an interactive display file.
//********************************************************************************

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f USERSCREEN Workstn Indds(IndicatorDS);

// Define Indicator Data Structure
Dcl-ds IndicatorDS;
  Exit Ind Pos(3);
  Cancel Ind Pos(12);
End-ds;

// Prototypes for bound procedures
Dcl-pr MODID Char(33);
  *N Char(10)   Value;
  *N Char(15)   Value;
  *N Zoned(6:0) Value;
End-pr;

Dcl-pr MODPASS Char(9);
  *N Char(10)   Value;
  *N Char(15)   Value;
  *N Zoned(6:0) Value;
End-pr;

// ----------Main Procedure--------------------------------------------

DOW NOT Exit;
  EXFMT SCRN1; // Show input screen

  If Exit;
    Leave; // Exit program
  Endif;

  If Cancel;
    Iter; // Return to SCRN1 without processing
  Endif;

  // Call bound modules to generate User ID and Password
  USERID   = MODID(USERFIRST: USERLAST: USERNO);
  PASSWORD = MODPASS(USERFIRST: USERLAST: USERNO);

  EXFMT SCRN2; // Show output screen

Enddo;

*Inlr = *On;
Return;