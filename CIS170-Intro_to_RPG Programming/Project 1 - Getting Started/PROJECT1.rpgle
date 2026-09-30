**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #1 - CloudServices 24/7 Inventory Report
      // Program:     PROJECT1.RPGLE
      // Programmer:  Chris Grimm
      // Date:        09/01/2020
      //
      // Description:
      //   A read/write reporting application that processes the inventory
      //   master disk file and generates a formatted spool report with
      //   headers and detail records.
      //
      // Input File:  CSINVP     (DDS Physical File - Inventory Master)
      // Output File: INVREPORT  (DDS Printer File - Spool Report)
      //=======================================================================

      // ------Control Options----------------------------------------------
        Ctl-Opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-F CSINVP    Disk Usage(*Input);
        Dcl-F INVREPORT Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-S EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // ------Main Procedure-----------------------------------------------
        Read CSINVP; // Read the first record "priming" read
        Dow Not %Eof; // Check for end of file; begin loop
          If EndOfPage; // if indicator is "On" this logic will occur
            Write Heads;
            EndOfPage = *Off; // turn indicator "off"
          EndIf; // terminate the if statement
          Write Detail; // Write a detail record on the report
          Read CSINVP; // get another record
        EndDo; // End of loop
        *INLR = *On; // turn on the last record indicator
        Return; // Return to OS or calling program
