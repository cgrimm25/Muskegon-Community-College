**Free 
// Program: PROJECT4A.RPGLE
// Programmer: Chris Grimm
// Date: 09/28/20
// Project 4 Part A-RPG -RDI-Contains Errors
// ********************************************************* 
// This program calculates monthly payments for ComupSell  * 
// customers based on the purchase amount and down payment.* 
// All loans are for 12 months and at a fixed interest     * 
// rate of 14%.                                            * 
// Author: J. Yaeger Date Written: June 5, 1993            *  
// Converted to RPG IV Nov. 1995                           * 
// Converted to RPG IV V5 Nov. 2002                        *  
// Updater: C. Anderson Date Updated: July 22, 2007        *  
// Changed print and input file to externally              *  
// described and added print file.                         *  
// *********************************************************  
// Converted to free for 5th Edition                       *  
// Programmer: Michelle Lyons                              *  
// Date: June 12, 2015                                     *  
// Questions or Concerns please contact me by e-mail at:   *  
// mkincaid5@gmail.com                                     *  
// *********************************************************  

// ---------Control Options---------------------------------
Ctl-opt Option(*Nodebugio);

// Stand alone variables-
Dcl-s Amtowed Zoned(8:2);
Dcl-s Interest Zoned(7:2);
Dcl-s TotalDue Zoned(7:2);
Dcl-s MonthPay Zoned(6:2);
Dcl-s TotalDown Zoned(8:2);
Dcl-s Totalowed Zoned(8:2);
Dcl-s TotalPay Zoned(8:2);
Dcl-s CustCount Zoned(3:0);
Dcl-s DWNPAY Zoned(7:2);

// Data Structure to redfine the Purchase Date Field
Dcl-ds PurDate INZ;
  PDATE Zoned(8:0);
  PURYR Zoned(4:0) Pos(1);
  PURMON Zoned(2:0) Pos(5);
  PURDAY Zoned(2:0) Pos(7);
End-ds;

//----File Declarations
Dcl-f CSCFINP Disk Usage (*Input);
Dcl-f FINREPORT Printer Usage (*Output) Oflind (EndOfPage);

// Processing and Calculations
Write Heading;
Read CSCFINP;

// ----------Main Procedure--------------------------------------------
DOW NOT %EOF;
  AmtOwed = FinAmt - DWNPAY;
  EVAL(h) Interest = AmtOwed * 0.14;
  TotalDue = AmtOwed + Interest;
  EVAL(H) MonthPay = TotalDue / 12;
  TotalDown += DWNPAY;
  Totalowed += AmtOwed;
  TotalPay += MonthPay;
  CustCount += 1;
  PDATE = CDATE;             // populates data structure with input data
  If EndOfPage;
    Write Heading;
    EndOfPage = *off;
  Endif;
  Write Detail;
  Read CSCFINP;
ENDDO;

Write Total;
*INLR = *ON;
RETURN;