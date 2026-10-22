**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #4 Part A - Customer Balance and Payment Report
      // Program:     PROJECT4A.RPGLE
      // Programmer:  Chris Grimm
      // Date:        09/28/2020
      //
      // Description:
      //   Calculates monthly finance payments for CloudServices24x7, Inc.
      //   preferred customers based on purchase amounts and down payments.
      //   Applies a fixed 14% annual interest rate over a 12-month term,
      //   extracts purchase dates (DD-MM), accumulates grand totals for
      //   down payments, balances owed, and monthly payments, and tallies
      //   the total customer count.
      //
      // Input File:  CSCFINP   (DDS Physical File - Customer Financing Master)
      // Output File: FINREPORT (DDS Printer File - Customer Balance & Pay
      //   Report)
      //========================================================================

      // ---------Control Options---------------------------------
        Ctl-opt Option(*Nodebugio);

      // ----File Declarations-----------------------------------
        Dcl-f CSCFINP Disk Usage(*Input);
        Dcl-f FINREPORT Printer Usage(*Output) Oflind(EndOfPage);

      // ------Stand alone variables- --------------------
        Dcl-s AmtOwed  Zoned(8:2);
        Dcl-s Interest Zoned(7:2);
        Dcl-s TotalDue Zoned(7:2);
        Dcl-s MonthPay Zoned(6:2);
        Dcl-s TotalDown Zoned(8:2);
        Dcl-s TotalOwed Zoned(8:2);
        Dcl-s TotalPay  Zoned(8:2);
        Dcl-s CustCount Zoned(3:0);
        Dcl-S DWNPAY    Zoned(7:2);
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // Data Structure to redfine the Purchase Date Field
        Dcl-ds PurDate INZ;
          PDATE  Zoned(8:0);
          PURYR  Zoned(4:0) Pos(1);
          PURMON Zoned(2:0) Pos(5);
          PURDAY Zoned(2:0) Pos(7);
        End-ds;

      // Processing and Calculations
        Read CSCFINP;

        DOW NOT %EOF;

          AmtOwed = FinAmt - DWNPAY;
          EVAL(h) Interest = AmtOwed * .14;
          TotalDue = AmtOwed + Interest;
          EVAL(H) MonthPay = TotalDue / 12;
          TotalDown += DwnPay;
          TotalOwed += AmtOwed;
          TotalPay += MonthPay;
          CustCount += 1;
          PDATE = CDATE; // populates data structure with input data

          If EndOfPage;
            Write Heading;
            EndOfPage = *Off;
          Endif;

          Write Detail;
          Read CSCFINP;

        ENDDO;

        Write Total;

        *INLR = *ON;
        RETURN;

