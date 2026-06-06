**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJECT5
// Programmer: Chris Grimm
// Date: 10/08/20
// Creates a Student Population Summary Report of Undergraduate students

// Control Options
Ctl-opt Option(*Nodebugio);

// Declare Files
Dcl-f WUSTDP Disk Usage (Input); // Inputs Wibaux University's Student Master File
Dcl-f PRJ5PRTF Printer Usage (*Output) Oflind (EndOfPage); // Outputs Student Population Summary Report

// Declare Standalone Variables--
Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

// ----------Main Procedure--------------------------------------------

// Read the first record "priming" read
READ WUSTDP;

// Check for end of file begin loop
DOW NOT %EOF;

  If CLASS = 'U'; // If undergraduate
    If CRDTOT < 30;
      Exsr Freshman; // Credits less than 30 then run subroutine Freshman
    Elseif CRDTOT <= 59;
      Exsr Sophomores; // Credits less than or equal to 59 then run subroutine Sophomores
    Elseif CRDTOT <= 89;
      Exsr Juniors; // Credits less than or equal to 89 then student is a Junior
    Else;
      Exsr Seniors; // Otherwise run subroutine Seniors
    Endif;
    
    EndOfPage = *off; // turn indicator "off"
  Endif; // terminate undergraduate condition check

  // get another record
  READ WUSTDP;

ENDDO; // End of loop

// Write Heading Line(s)
Write Heading;

Exsr CALCS;

// Write Total line(s)
Write Total;

// turn on the last record indicator
*INLR = *ON;

// Return to OS or calling program
RETURN;


// Subroutines---------------------------------------------------------

Begsr CALCS;
  // Calculates total number of Freshman
  FRESHTOT = IFRESHTOT + OFRESHTOT + FFRESHTOT; 
  
  // Calculates total number of Sophomores
  SOPHTOT = ISOPHTOT + OSOPHTOT + FSOPHTOT;
  
  // Calculates total number of Juniors
  JUNTOT = IJUNTOT + OJUNTOT + FJUNTOT;
  
  // Calculates total number of Seniors
  SENTOT = ISENTOT + OSENTOT + FSENTOT;
  
  // Calculates total number of In-District Undergraduates
  IDISTOT = IFRESHTOT + ISOPHTOT + IJUNTOT + ISENTOT; 
  
  // Calculates total number of Out-Of-District Undergraduates
  ODISTOT = OFRESHTOT + OSOPHTOT + OJUNTOT + OSENTOT; 
  
  // Calculates total number of International Undergraduates
  FDISTOT = FFRESHTOT + FSOPHTOT + FJUNTOT + FSENTOT; 
  
  // Calculates total number of students regardless of graduation status
  TOTALTOT = IDISTOT + ODISTOT + FDISTOT; 
Endsr;


Begsr Freshman;
  Select;
    When DCODE = 'I'; // When In-District add 1
      IFRESHTOT += 1;
    When DCODE = 'O'; // When Out-Of-District add 1
      OFRESHTOT += 1;
    When DCODE = 'F'; // When International add 1
      FFRESHTOT += 1;
  Endsl;
Endsr;


Begsr Sophomores;
  Select;
    When DCODE = 'I'; // When In-District add 1
      ISOPHTOT += 1;
    When DCODE = 'O'; // When Out-Of-District add 1
      OSOPHTOT += 1;
    When DCODE = 'F'; // When International add 1
      FSOPHTOT += 1;
  Endsl;
Endsr;


Begsr Juniors;
  Select;
    When DCODE = 'I'; // When In-District add 1
      IJUNTOT += 1;
    When DCODE = 'O'; // When Out-Of-District add 1
      OJUNTOT += 1;
    When DCODE = 'F'; // When International add 1
      FJUNTOT += 1;
  Endsl;
Endsr;


Begsr Seniors;
  Select;
    When DCODE = 'I'; // When In-District add 1
      ISENTOT += 1;
    When DCODE = 'O'; // When Out-Of-District add 1
      OSENTOT += 1;
    When DCODE = 'F'; // When International add 1
      FSENTOT += 1;
  Endsl;
Endsr;