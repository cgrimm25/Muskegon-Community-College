**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #10 - Student Exam Results
      // Program:     PROJECT10.RPGLE
      // Programmer:  Chris Grimm
      // Date:        11/18/2020
      //
      // Description:
      //   Interactive inquiry program utilizing a display file (PRJ10DSPF)
      //   to present student exam results. Prompts the user for a Student
      //   Number (STUNO), validates it against the exam master file (WUEXAMP)
      //   using CHAIN, and displays the student's name and five exam scores.
      //   Handles invalid student number entries and screen exit/cancel
      //   requests via an indicator data structure.
      //
      // Input File:  WUEXAMP   (DDS Physical File - Exam Master)
      // DSPF File:   PRJ10DSPF (DDS Display File - User Interface)
      //========================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-f WUEXAMP Disk Usage(*Input) keyed;
        Dcl-f PRJ10DSPF Workstn Indds(Indicators);

      // ------Indicator Data Structure-------------------------------------
        Dcl-ds Indicators Len(99);
          Exit Ind Pos(3); // F3=Exit
          Cancel Ind Pos(12); // F12=Cancel
          INVSTUNO Ind Pos(90); // Invalid Student Number
        End-ds;

      // ------Main Procedure-----------------------------------------------
        DOW Not Exit; // Do until user hits Exit
          Exfmt SCRN1; // Execute Format SCRN1

          If Not Exit; // If user does not hit Exit
            Chain STUNO WUEXAMP; // Chain into WUEXAMP using key STUNO
            INVSTUNO = Not %Found(WUEXAMP); //If Student Number not found Displa

            If %Found(WUEXAMP); // If Student Number in WUEXAMP is found
              Exfmt SCRN2; // Execute Format SCRN2
            Endif; // Terminate the if statement

          Endif; // Terminate the if statement

        Enddo; // End of loop

        *INLR = *ON; // Turn on the last record indicator
        RETURN; // Return to OS or calling program
      // ----End of Main Procedure------------------------------------------


