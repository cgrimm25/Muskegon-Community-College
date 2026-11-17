      *=========================================================================
      * Institution: Muskegon Community College
      * Course:      CIS170 - Intro to RPG Programming
      * Instructor:  Char Parker
      * Project:     Project #11 - CloudServices24X7, Inc.
      *                            Inventory Master Report
      * Program:     PROJECT11.RPGLE
      * Programmer:  Chris Grimm
      * Date:        11/25/2020
      *
      * Description:
      *   Program-described batch reporting application utilizing strictly
      *   fixed-format I, C, and O specifications. Sequentially reads the
      *   CSINVP inventory file and generates a multi-column Inventory
      *   Master Report output to QPRINT, implementing exact print chart
      *   alignment and manual page overflow tracking via indicator *INOF.
      *
      * Input File:  CSINVP (Program-Described Physical File)
      * Output File: QPRINT (Program-Described Printer File)
      *=========================================================================

      * ------------------------------------------------------Control Options
     H Option(*Nodebugio)

      * --------------------------------------------------- File Declarations
     FCSINVP    IF   F   92        Disk
     FQPRINT    O    F  132        PRINTER  OFLIND(*INOF)

      * -------------------------------------------------Input Specifications
     ICSINVP    NS
     I                                  1    6 0PRODNO
     I                                  7    9  PRODTYPE
     I                                 10   10  PACT
     I                                 11   50  DESCRP
     I                                 51   56 2SELLPR
     I                                 57   61  SHIPWT
     I                             P   62   64 0QTYOH
     I                             P   65   67 0RORPNT
     I                             P   68   70 0RORQTY
     I                                 71   71  RORCOD
     I                                 72   74 0SUPCOD
     I                                 75   80 2SHPCST
     I                                 81   86 2CURCST
     I                                 87   92 2AVGCST

      * --------------------------------------------Calculation Specificatons
      /FREE
        EXCEPT HEADINGS;
        READ CSINVP;
        DOW NOT %EOF;
          IF *INOF;
            EXCEPT HEADINGS;
            *INOF = *OFF;
          ENDIF;
          EXCEPT DETAIL;
          READ CSINVP;
        ENDDO;
        EVAL *INLR = *ON;
        RETURN;
      /END-FREE
      * ------------------------------------------------Output Specifications
     OQPRINT    E            HEADINGS       1  1
     O                       *DATE         Y     10
     O                                           73 'CloudServices24X7, Inc.'
     O                                          123 'Page'
     O                       PAGE          Z    129

     O          E            HEADINGS       1
     O                                           73 'Inventory Master Report'
     O          E            HEADINGS       1
     O                                            6 'Prod.'
     O                                           58 'Weight'
     O                                           68 'Qty. On'
     O                                           77 'Reorder'
     O                                           86 'Reorder'
     O                                           98 'Shipping'
     O                                          108 'Average'
     O                                          118 'Current'
     O                                          129 'Selling'

     O          E            HEADINGS       1
     O                                            5 'Num.'
     O                                           21 'Description'
     O                                           58 'Lbs-Oz'
     O                                           65 'Hand'
     O                                           75 'Point'
     O                                           82 'Qty'
     O                                           95 'Cost'
     O                                          106 'Cost'
     O                                          117 'Cost'
     O                                          127 'Cost'

     O          E            DETAIL         1
     O                       PRODNO               7
     O                       DESCRP              50
     O                       SHIPWT              57
     O                       QTYOH         1     65
     O                       RORPNT        1     74
     O                       RORQTY        Z     82
     O                       SHPCST        1     99
     O                       AVGCST        1    109
     O                       CURCST        1    119
     O                       SELLPR        1    129

