**Free
      // This code is in fully free form, as denoted in line 1 above
      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #7 - Instructor Retirement Report
      // Program:     PROJECT7.RPGLE
      // Programmer:  Chris Grimm
      // Date:        10/21/2020
      //
      // Description:
      //   Generates Wibaux University Instructor Retirement Report.
      //   Processes instructor records from INSTRUCTLF
      //   (keyed by last/first name), calculates retirement eligibility dates
      //   (hire date + 30 years), computes years remaining until retirement
      //   against system date, formats names, accumulates salary totals,
      //   and prints to RETIREREP.
      //
      // Input File:  INSTRUCTLF (DDS Logical File - Instructor Master File)
      // Output File: RETIREREP  (DDS Printer File - Instructor Retirement
      //   Report)
      //========================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-f INSTRUCTLF Disk Usage(*Input) Keyed;
        Dcl-f RETIREREP Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"
        Dcl-s Currentdate Date Inz(*Sys);
        Dcl-s GSALARY Zoned(11:2);

      // ------Main Procedure-----------------------------------------------
        READ INSTRUCTLF; // Read the first record "priming" read

        DOW NOT %Eof; // Check for end of file; begin loop

          HIREDATE = %Date(HIRDAT);
          RDATE = HireDate + %Years(30);
          RYEARS = %Diff(RDATE:Currentdate:*Years);

          COMBINED = %TRIM(IFNAME) + ' '
                   + %TRIM(ILNAME);
          COUNT += 1;
          GSALARY += SALARY;         
          IF EndOfPage; // if indicator is "On" this logic will occur
            Write HEADINGS;
            EndOfPage = *Off; // turn indicator "off"
          Endif; // terminate the if statement

          Write DETAIL; // Write a detail record on the report
          READ INSTRUCTLF; // get another record

        Enddo; // End of loop

        Eval(h) AVGWAGE = GSALARY / COUNT;
        Write FOOTER; // Write the total line only once, after the loop finishes

        *INLR = *ON; // turn on the last record indicator
        RETURN; // Return to OS or calling program



