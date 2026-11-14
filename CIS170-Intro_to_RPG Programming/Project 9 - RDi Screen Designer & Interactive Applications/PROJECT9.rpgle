**Free
      // This code is in fully free form, as denoted in line 1 above

      //========================================================================
      // Institution: Muskegon Community College
      // Course:      CIS170 - Intro to RPG Programming
      // Instructor:  Char Parker
      // Project:     Project #9 - CloudServices24x7, Inc. Supplier Information
      // Program:     PROJECT9.RPGLE
      // Programmer:  Chris Grimm
      // Date:        11/11/2020
      //
      // Description:
      //   Interactive supplier inquiry program utilizing a display file
      //   (INQSCREEN). Prompts user for a product number (PRODIN), chains
      //   into the Inventory master file (CSINVP) to locate the product,
      //   then chains the associated supplier code (SUPCOD) into the
      //   Supplier master file (CSSUPP) to retrieve supplier details.
      //   Validates input and conditionally sets display error indicators.
      //
      // Input File:  CSINVP    (DDS Physical File - Inventory Master)
      // Input File:  CSSUPP    (DDS Physical File - Supplier Master)
      // DSPF File:   INQSCREEN (DDS Display File - User Interface)
      //========================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // ------Declare Files------------------------------------------------
        Dcl-f CSINVP Disk Usage(*Input) keyed;
        Dcl-f CSSUPP Disk Usage(*Input) Keyed;
        Dcl-f INQSCREEN Workstn Indds(Indicators);

      // ------Indicator Data Structure-------------------------------------
        Dcl-ds Indicators Len(99);
          Exit      Ind Pos(3); // F3=Exit
          INVPRODNO Ind Pos(90); // Invalid product number
          NOTFOUND  Ind Pos(95); // Product Number valid,
        End-ds;                  // but Supplier Code not found

      // ------Main Procedure-----------------------------------------------
        DOW Not Exit; // Check for end of file; begin loop
          Exfmt SCRN1; // Execute Format SCRN1

          If Not Exit; // When user wants to continue
            Chain PRODIN CSINVP; // Chain into CSINVP using key PRODIN
            INVPRODNO = Not %Found(CSINVP); //Display "Invalid product number" m

            If %Found(CSINVP); // If PRODIN in CSINVP is found
              Chain SUPCOD CSSUPP; // Chain into CSSUPP using key PRODIN
              NOTFOUND = Not %Found(CSSUPP); //Display "Product Number valid,

              If %Found(CSSUPP); // If SUPCOD in CSSUPP is found
                Exfmt SCRN2; // Execute Format SCRN2
              Endif; // Terminate the if statement

            Endif; // Terminate the if statement

          Endif; // Terminate the if statement

        Enddo; // End of loop

        *INLR = *ON; // Turn on the last record indicator
        RETURN; // Return to OS or calling program
      // ----End of Main Procedure------------------------------------------

