**Free
// This code is in fully free form, as denoted in line 1 above

// Program: PROJ10ERR.RPGLE
// Programmer: F20DOLESHA
// Date: 04/06/21 
// This program has some VERY BAD LOGIC in it.
// Let's catch it with Monitor
// This program uses only variables to test these techniques
// There is no disk file
// Declare Files---

Dcl-f PRJ10CPRTF Printer Usage(*Output) Oflind(EndOfPage);

// The standalone variables used to test our Monitor blocks
Dcl-s Number1 Zoned(2:0); // Note the size
Dcl-s Number2 Zoned(2:0);
Dcl-s AnArray Zoned(2:0) Dim(5); // a FIVE element array

// Code your named constants for the status codes here
// Declare Constants--
Dcl-c DividebyZero 00102;
Dcl-c ArrayObounds 00121;
Dcl-c Vtosmall     00103;

// Add in the necessary code to handle the errors.
// Let's practice catching a divide by zero error

Write HEADING; // Write the Heading line

Monitor;
  Number2 = 0; // Number2 will be our denominator
  Number1 = Number1 / Number2; // this is illegal!!
On-error Dividebyzero;
  Exsr DBONA;
Endmon;

// Let's practice catching an invalid array index

Monitor;
  For Number1 = 1 to 9; // can't go this far in this array!!
    AnArray(Number1) = 22;
  Endfor;
On-error ArrayObounds;
  Exsr ARRYBNDS;
Endmon;

// Let's practice catching a Variable to Small to Hold Result Error

Monitor;
  // Variable is too small to hold this!!
  Number1 = 9999999;
On-error Vtosmall;
  Exsr V2SMALL;
Endmon;

*INLR = *ON; // Terminate Program
RETURN;

//----Subroutines-

Begsr DBONA;
  Write DBZERO;
Endsr;

Begsr ARRYBNDS;
  Write ARRAYIDEX;
Endsr;

Begsr V2SMALL;
  Write VTOOSMALL;
Endsr;