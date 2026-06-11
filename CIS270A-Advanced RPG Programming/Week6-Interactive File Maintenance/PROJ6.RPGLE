**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ6.RPGLE
// Programmer: Chris Grimm
// Date: 03/10/21
// Purpose: Wibaux University Instructor File Maintenance program (Add, Change, Delete)

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f MYINSTP   Disk    Usage(*Update: *Output: *Delete) Keyed;
Dcl-f PRJ06DSPF Workstn Indds(Indicators);

// Indicator Data Structure
Dcl-ds Indicators Len(99);
  Exit       Ind Pos(3);    // F3=Exit
  Cancel     Ind Pos(12);   // F12=Cancel
  Fkey       Ind Pos(25);   // Vldcmdkey
  Adderror   Ind Pos(30);   // Instructor already exists (Add error flag)
  Chgerror   Ind Pos(31);   // Instructor not found (Change error flag)
  Dlterror   Ind Pos(32);   // Instructor not found (Delete error flag)
  Addmode    Ind Pos(40);   // Add Mode visual indicator
  Chgmode    Ind Pos(41);   // Change Mode visual indicator
  Dltmode    Ind Pos(42);   // Delete Mode visual indicator
  Add        Ind Pos(43);   // Add action verification mapping flag
  Chg        Ind Pos(44);   // Change action verification mapping flag
  Dlt        Ind Pos(45);   // Delete action verification mapping flag
  Sexerror   Ind Pos(46);   // Data validation: Only (M)ale or (F)emale allowed
  Martserror Ind Pos(47);   // Data validation: Only (M)arried or (S)ingle allowed
  Tenerror   Ind Pos(48);   // Data validation: Only (Y)es or (N)o allowed
  Invaction  Ind Pos(49);   // Data validation: Invalid action entered on SCRN1
End-ds;

// ----------Main Procedure--------------------------------------------

DOW Not Exit;                // Do until user hits F3 Exit
  Exfmt SCRN1;               // Execute Format SCRN1
  
  If Not Exit;               // When user wants to continue
    Select;                  // Begin processing action selection
      When ACTION = 'A';     // When user inputs 'A' to Add
        Exsr Addrecord;      // Execute subroutine Addrecord
      When ACTION = 'C';     // When user inputs 'C' to Change
        Exsr Chgrecord;      // Execute subroutine Chgrecord
      When ACTION = 'D';     // When user inputs 'D' to Delete
        Exsr Dltrecord;      // Execute subroutine Dltrecord
      Other;                 // Trap unrecognized or blank inputs
        Invaction = *On;     // Turn on invalid action error flag
    Endsl;                   // End selection block
  Endif;
Enddo;

*INLR = *ON;                 // Turn on the last record indicator
Return;                      // Return control to OS / calling environment

// ----------Subroutines-----------------------------------------------

// Addrecord: Subroutine to insert a new instructor record
Begsr Addrecord;
  Exsr Setmode;              // Configure layout state modes
  Chain(n) INSTNO MYINSTP;   // No-lock index lookup check
  Adderror = %Found(MYINSTP); // If record already exists, trip error flag
  
  If Not Adderror;           // Advance only if record is unique
    Exsr Resetdata;          // Clear data workspace fields
    DATEIN = *Loval;         // Initialize native date to 01/01/0001
    Add = *On;               // Activate add validation layout rules
    Exfmt SCRN2;             // Prompt for field inputs
    
    If Not Fkey;             // Process if a function validation key was not clicked
      // Validate Gender Data Boundary
      Dow (SEX <> 'M' and SEX <> 'F' and Not Exit and Not Cancel);
        Sexerror = *On;
        Exfmt SCRN2;
      Enddo;
      Sexerror = *Off;
      
      // Validate Marital Status Data Boundary
      Dow (MARSTS <> 'M' and MARSTS <> 'S' and Not Exit and Not Cancel);
        Martserror = *On;
        Exfmt SCRN2;
      Enddo;
      Martserror = *Off;
      
      // Validate Tenured Faculty Status Data Boundary
      Dow (TENURE <> 'Y' and TENURE <> 'N' and Not Exit and Not Cancel);
        Tenerror = *On;
        Exfmt SCRN2;
      Enddo;
      Tenerror = *Off;
      
      // Commit verification checking block
      If Not Fkey;
        HIRDAT = %DEC(DATEIN); // Convert native Date block back to legacy decimal storage
        Write INSTREC;         // Append record format row to database
        Reset ACTION;          // Sweep interaction control fields
        Reset INSTNO;
      Endif;
    Endif;
  Endif;
  Add = *Off;                // Deactivate add validation layout rules
Endsr;

// Chgrecord: Subroutine to update an existing instructor record
Begsr Chgrecord;
  Exsr Setmode;
  Chain INSTNO MYINSTP;      // Retrieve record for active update locking
  Chgerror = Not %Found(MYINSTP); // Trip exception warning if key cannot be mapped
  
  If Not Chgerror;
    DATEIN = %DATE(HIRDAT);  // Convert legacy numeric database data to native layout pointer
    Chg = *On;               // Activate modification layout rule masks