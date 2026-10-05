**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #2 - GTC Customer Accounts Report
      // Program:     PROJECT2.RPGLE
      // Programmer:  Chris Grimm
      // Date:        09/10/2020
      //
      // Description:
      //   A structured read/write batch application that sequentially reads
      //   records from the customer master physical database file (GTCSTP)
      //   and generates a formatted spool report (PRJ2PRTF) with dynamic
      //   page headers, telephone edit words, and currency edit codes.
      //
      // Input File:  GTCSTP    (DDS Physical File - Customer Master)
      // Output File: PRJ2PRTF  (DDS Printer File - Spool Report)
      //========================================================================

      // ------Control Options----------------------------------------------
        Ctl-Opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-F GTCSTP Disk Usage(*Input);
        Dcl-F PRJ2PRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-S EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // ------Main Procedure-----------------------------------------------
        Read GTCSTP; // Read the first record "priming" read

        Dow Not %Eof; // Check for end of file; begin loop

          If EndOfPage; // if indicator is "On" this logic will occur
            Write Heading;
            EndOfPage = *Off; // turn indicator "off"
          EndIf; // terminate the if statement

          Write Detail; // Write a detail record on the report
          Read GTCSTP; // get another record

        EndDo; // End of loop

        *INLR = *On; // turn on the last record indicator
        Return; // Return to OS or calling program

