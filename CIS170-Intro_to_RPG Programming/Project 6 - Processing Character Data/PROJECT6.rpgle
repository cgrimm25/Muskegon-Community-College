**Free
      // This code is in fully free form, as denoted in line 1 above
      //
      //========================================================================
      // Program:     PROJECT6
      // Project:     Project 6 - Fun With Characters
      // Author:      Chris Grimm
      // Date:        10/16/2026
      // Description: Customer master report program manipulating CSCSTP records
      //   using built-in character functions (%XLATE, %SUBST, %TRIM,
      //   %EDITW, %EDITC) to format customer accounts and output to PRJ6PRTF.
      //
      // Input File:  CSCSTP   - Customer Master Physical File
      // Output File: PRJ6PRTF - Character Manipulation Summary Printer File
      //=======================================================================

      // ------Control Options----------------------------------------------
        Ctl-opt Option(*Nodebugio);

      // ------Declare Constant---------------------------------------------
        Dcl-c Lowercase 'abcdefghijklmnopqrstuvwxyz';
        Dcl-c Uppercase 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      // ------Declare Files------------------------------------------------
        Dcl-f CSCSTP Disk Usage(*Input);
        Dcl-f PRJ6PRTF Printer Usage(*Output) Oflind(EndOfPage);

      // ------Declare Standalone Variables---------------------------------
        Dcl-s EndOfPage Ind Inz(*On); // Overflow indicator, set to "on"
        Dcl-s MyDate Varchar(8);
        Dcl-s CUSTZIP Packed(9);

      // ------Main Procedure-----------------------------------------------
        READ CSCSTP; // Read the first record "priming" read

        DOW NOT %EOF; // Check for end of file; begin loop


          USERID = %TRIM(%XLATE(Uppercase:Lowercase:CFNAME)) + '.'
                 + %TRIM(%XLATE(Uppercase:Lowercase:CLNAME)) + '.'
                 + %Char(CUSTNO);
          PASSWORD = %SUBST(%XLATE(Uppercase:Lowercase:CFNAME):1:1)
                   + %SUBST(%XLATE(Uppercase:Lowercase:CLNAME):1:1)
                   + %CHAR(CUSTNO)+ '!';
          NAME = %TRIM(%XLATE(Uppercase:Lowercase:CFNAME:2)) + ' '
               + %TRIM(%XLATE(Uppercase:Lowercase:CLNAME:2));
          CUSTZIP = %DEC(CZIP:9:0);
          ZIP = %EDITW(CUSTZIP:'0    -    ');
          PHONE = %EDITW(CPHONE:'0(   )   -    ');

          MyDate = %CHAR(ORDDAT);
          If %LEN(MyDate) = 7;
            YEAROUT = %SUBST(MYDATE:4:4);
          ELSE;
            YEAROUT = %SUBST(MYDATE:5:4);
          ENDIF;

          BALANCE = %EDITC(BALDUE:'1');

          If EndofPage; // If indicator is "On' this logic will occur
           Write HEADING;
           EndOfPage = *off; // turn indicator "off"
          EndIf;

          Write DETAIL; // Write a detail record on the report
          READ CSCSTP; // get another record

        ENDDO; // End of loop

        *INLR = *ON; // turn on the last record indicator
        RETURN; // Return to OS or calling program

