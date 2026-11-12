**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #8 - Class Offerings at Wibaux University
      // Program:     PROJECT8.RPGLE
      // Programmer:  Chris Grimm
      // Date:        11/12/2026
      //
      // Description:
      //   Generates the Wibaux University Class Offerings report.
      //   Sequentially reads the Current Sections file (WUSCTP) and
      //   uses a composite key (DEPT + CRSNO) to CHAIN into the Course
      //   Master file (WUCRSP) to retrieve course titles and credits.
      //   Outputs a matched detail line or an error line if no match
      //   is found. Handles numeric to character key conversions.
      //
      // Input File:  WUSCTP   (DDS Physical File - Current Sections File)
      // Input File:  WUCRSP   (DDS Physical File - Course Master File)
      // Output File: PRJ8PRTF (DDS Printer File - Class Offerings Report)
      //========================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-f WUSCTP Disk Usage(*Input) Keyed;
        Dcl-f WUCRSP Disk Usage(*Input) Keyed;
        Dcl-f PRJ8PRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // ------Main Procedure-----------------------------------------------
        READ WUSCTP; // Read the first record "priming" read

        DOW NOT %Eof(WUSCTP); // Check for end of file; begin loop

          If EndOfPage; // If indicator is "On" this logic will occur
            Write HEADING; // Write the Heading line
            EndOfPage = *Off; // Turn indicator "off"
          Endif; // Terminate If statement

          // Chain into WUCRSP using listed key
          Chain (DEPT: CRSNO) WUCRSP;

          If %Found(WUCRSP); // If WUCRSP is found...
            Write DETAIL; // Writes Detail line if record is found
          Else; // Otherwise
            Write ERROR; // Writes Error line if record not found
          Endif; // Terminate the if statement

          Read WUSCTP; // Read WUSCTP again

        Enddo; // End of loop

        *INLR = *ON; // Turn on the last record indicator
        RETURN; // Return to OS or calling program

