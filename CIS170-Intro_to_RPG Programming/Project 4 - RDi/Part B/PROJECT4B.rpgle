**Free
      // This code is in fully free form, as denoted in line 1 above

      //======================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #4 Part B - CompuSell Profits Report
      // Program:     PROJECT4B.RPGLE
      // Programmer:  Chris Grimm
      // Date:        09/29/2020
      //
      // Description:
      //   Calculates profit margins for CompuSell inventory items by
      //   subtracting current unit cost (CURCST) from selling price (SELLPR)
      //   using half-adjust rounding (EVAL(H)). Tracks running accumulators
      //   for grand total profit and writes formatted page headings,
      //   product detail records, and summary total lines to PRJ4BPRTF.
      //
      // Input File:  CSINVP    (DDS Physical File - Inventory Master)
      // Output File: PRJ4BPRTF (DDS Printer File - CompuSell Profits Report)
      //======================================================================

      // ---------Control Options---------------------------------
        Ctl-opt Option(*Nodebugio);

      // ----File Declarations-----------------------------------
        Dcl-f CSINVP Disk Usage(*Input);
        Dcl-f PRJ4BPRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Stand alone variables- --------------------
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // Processing and Calculations
        Read CSINVP;

        DOW NOT %EOF;

          EVAL(h) Profit = SELLPR - CURCST;
          TOTALPROF += Profit;

          If EndOfPage;
            Write Heading;
            EndOfPage = *Off;
          Endif;

          Write Detail;
          Read CSINVP;

        ENDDO;

        Write Total;

        *INLR = *ON;
        RETURN;

