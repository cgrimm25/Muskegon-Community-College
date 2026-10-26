**Free
      // This code is in fully free form, as denoted in line 1 above
      //======================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #5 - Student Population Summary Report
      // Program:     PROJECT5.RPGLE
      // Programmer:  Chris Grimm
      // Date:        10/09/2020
      //
      // Description:
      //   Generates a matrix summary report of undergraduate student
      //   residency counts for Wibaux University. Reads student master
      //   file (WUSTDP), filters for undergraduate students ('U'),
      //   categorizes by class level via earned credits (CRDTOT) using
      //   dedicated subroutines, tallies residency district codes (DCODE),
      //   and prints cross-tabulated category and grand totals to PRJ5PRTF.
      //
      // Input File:  WUSTDP   (DDS Physical File - Student Master File)
      // Output File: PRJ5PRTF (DDS Printer File - Student Summary Report)
      //======================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-f WUSTDP Disk Usage(*Input);
        Dcl-f PRJ5PRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"

      // ------Main Procedure-----------------------------------------------
        READ WUSTDP; // Read the first record "priming" read

        DoW Not %EOF; // Check for end of file; begin loop

          If CLASS = 'U'; // Only process undergraduate students
            If CRDTOT < 30;
              Exsr Freshman; // Credits less than 30 then run sr Freshman
            Elseif CRDTOT <= 59;
              Exsr Sophomores; //
            Elseif CRDTOT <= 89;
              Exsr Juniors; // Credit
            Else;
              Exsr Seniors; // Otherwise run subroutine Seniors
            ENDIF;
          Endif;

          READ WUSTDP; // get another record

        ENDDO; // End of loop

        // Calculate all cross-tabulated row and column sums
        Exsr CALCS;

        // Print header and summary matrix after file is fully processed
        If EndOfPage;
          Write HEADING;
          EndOfPage = *Off;
        Endif;

        Write Total; // Write summary totals matrix

        *INLR = *ON; // turn on the last record indicator
        RETURN; // Return to OS or calling program

      // ------Subroutines--------------------------------------------------
        Begsr Freshman;
          Select;
            When DCODE = 'I'; // When In-District add 1
              IFRESHTOT += 1;
            When DCODE = 'O'; // When Out-Of-District add 1
              OFRESHTOT += 1;
            When DCODE = 'F'; // When International add 1
              INFRESHTOT += 1;
          ENDSL;
        ENDSR;

        Begsr Sophomores;
          Select;
            When DCODE = 'I'; // When In-District add 1
              ISOPHTOT += 1;
            When DCODE = 'O'; // When Out-Of-District add 1
              OSOPHTOT += 1;
            When DCODE = 'F'; // When International add 1
              INSOPHTOT += 1;
          ENDSL;
        ENDSR;

        Begsr Juniors;
          Select;
            When DCODE = 'I'; // When In-District add 1
              IJUNTOT += 1;
            When DCODE = 'O'; // When Out-Of-District add 1
              OJUNTOT += 1;
            When DCODE = 'F'; // When International add 1
              INJUNTOT += 1;
          ENDSL;
        ENDSR;

        Begsr Seniors;
          Select;
            When DCODE = 'I'; // When In-District add 1
              ISENTOT += 1;
           When DCODE = 'O'; // When Out-Of-District add 1
             OSENTOT += 1;
           When DCODE = 'F'; // When International add 1
             INSENTOT += 1;
          ENDSL;
        ENDSR;

        Begsr CALCS;
          TOTFRESH = IFRESHTOT + OFRESHTOT + INFRESHTOT;
          TOTSOPH  = ISOPHTOT  + OSOPHTOT  + INSOPHTOT;
          TOTJUN   = IJUNTOT   + OJUNTOT   + INJUNTOT;
          TOTSEN   = ISENTOT   + OSENTOT   + INSENTOT;

          IDISTOT  = IFRESHTOT  + ISOPHTOT  + IJUNTOT  + ISENTOT;
          ODISTOT  = OFRESHTOT  + OSOPHTOT  + OJUNTOT  + OSENTOT;
          INDISTOT = INFRESHTOT + INSOPHTOT + INJUNTOT + INSENTOT;
          TOTALTOT = IDISTOT    + ODISTOT   + INDISTOT;
        Endsr;

