**Free
      //======================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #4 Part C - ACME Employee Productivity Report
      // Program:     PROJECT4C.RPGLE
      // Programmer:  Chris Grimm
      // Date:        09/30/2020
      //
      // Description:
      //   Calculates employee productivity for ACME Company by reading
      //   work records from keyed file ACP001. Uses nested loop control-
      //   break logic on Social Security Number (SOCSEC), accumulates hours
      //   and quantity, computes rate (QTY / WKHOURS), and prints detail rows.
      //
      // Input File:  ACP001    (DDS Physical File - ACME Work File, Keyed)
      // Output File: PRJ4CPRTF (DDS Printer File - Employee Productivity Rpt)
      //======================================================================

      // ---------Control Options---------------------------------
        Ctl-opt Option(*Nodebugio);

      // ----File Declarations-----------------------------------
        Dcl-f ACP001    Disk    Usage(*Input);
        Dcl-f PRJ4CPRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Stand-alone variables------------------------------
        Dcl-s CurrentSSN Like(SOCSEC);
        Dcl-s EndOfPage  Ind Inz(*On);

      // Processing and Calculations
        Read ACP001;

        DoW Not %EOF(ACP001);

          CurrentSSN = SOCSEC;
          D_SOCSEC   = SOCSEC;
          D_NAME     = NAME;
          D_WKHOURS  = 0;
          D_QTY      = 0;

          // Inner loop: accumulate all consecutive records for this employee
          DoW Not %EOF(ACP001) and SOCSEC = CurrentSSN;
            D_WKHOURS += WKHOURS;
            D_QTY     += QTY;
            Read ACP001;
          EndDo;

          // Compute productivity rate with half-adjust rounding
          If D_WKHOURS > 0;
            Eval(h) D_QTYPHR = D_QTY / D_WKHOURS;
          Else;
            D_QTYPHR = 0;
          Endif;

          If EndOfPage;
            Write HEADING;
            EndOfPage = *Off;
          Endif;

          Write DETAIL;

        EndDo;

        *INLR = *ON;
        RETURN;
