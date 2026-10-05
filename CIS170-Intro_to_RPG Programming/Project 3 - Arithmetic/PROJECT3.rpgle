**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #3 - Wibaux University Payroll Register
      // Program:     PROJECT3.RPGLE
      // Programmer:  Chris Grimm
      // Date:        09/25/2020
      //
      // Description:
      //   A structured batch payroll application that reads hourly employee
      //   records sequentially from database file WUHRLYP. Extracts the first
      //   initial using a data structure overlay, calculates gross earnings
      //   including time-and-a-half overtime, computes tax withholdings
      //   (Federal, State, FICA) with half-adjust rounding (EVAL(H)),
      //   accumulates grand totals, and writes detail and summary lines to
      //   PRJ3PRTF.
      //
      // Input File:  WUHRLYP   (DDS Physical File - Hourly Employee Master)
      // Output File: PRJ3PRTF  (DDS Printer File - Spool Report)
      //========================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // -------Named Constants--------------------------------------------
        Dcl-c FedTaxRate .18;
        Dcl-c StateTaxRate .05;
        Dcl-c FICArate .0751;

      // ------Declare Files------------------------------------------------
        Dcl-f WUHRLYP  Disk    Usage(*Input);
        Dcl-f PRJ3PRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // ------Declare Data Structures-------------------------------------
        Dcl-ds *N;
          FNAME Char(10);
          INITIAL Char(1) Overlay(FNAME);
        End-ds;

      // ------Main Procedure-----------------------------------------------
        READ WUHRLYP; // Read the first record "priming" read

        DOW NOT %EOF; // Check for end of file; begin loop

          Eval(h) GROSSPAY = (RATE * REGHRS) + ((1.5 * RATE) * OTHRS);
          Eval(h) FEDTAX = Grosspay * FedTaxRate; // Calculates Fed Tax amount
          Eval(h) STATETAX = Grosspay * StateTaxRate; // Calculates state tax am
          Eval(h) FICA = Grosspay * FICArate; // Calculates FICA Tax Rate
          Netpay = GROSSPAY - (Fedtax + Statetax + FICA); // Calcutes net pay
          GROSSTOT += GROSSPAY; // Totals all Gross Pay
          FEDTOT += FEDTAX; // Totals all Federal Tax
          STATETOT += STATETAX; // Totals all State Tax
          FICATOT += FICA; // Totals all FICA Deductions
          NETPAYTOT += NETPAY; // Totals all Net Pay

          IF EndOfPage; // if indicator is "On" this logic will occur
           Write HEADING;
           EndOfPage = *Off; // turn indicator "off"
          Endif; // terminate the if statement

          Write DETAIL; // Write a detail record on the report
          READ WUHRLYP; // get another record

          ENDDO; // End of loop

          Write TOTAL; // Write the total line only once, after the loop finishe

          *INLR = *ON; // turn on the last record indicator
          RETURN; // Return to OS or calling program

