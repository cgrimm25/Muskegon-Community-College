*
     * Program: PROJECT11.RPGLE
     * Programmer: Chris Grimm
     * Date: 11/25/20
     * Fixed Format Program
     *
     H Option(*Nodebugio)
     *
     FCSINVP   IF   F   92        DISK
     FQPRINT   O    F  132        PRINTER     OFLIND(*INOF)
     *
     * Input Specifications
     ICSINVP   NS
     I                                        1   60PRODNO
     I                                        7   9 PRODTYPE
     I                                       10  10 PACT
     I                                       11  50 DESCRP
     I                                       51  562SELLPR
     I                                       57  61 SHIPWT
     I                             P         62  640QTYOH
     I                             P         65  670RORPNT
     I                             P         68  700RORQTY
     I                                       71  71 RORCOD
     I                             P         72  740SUPCOD
     I                             P         75  802SHPCST
     I                             P         81  862CURCST
     I                             P         87  922AVGCST
     *
     * Calculation Specifications
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
     *
     * Output Specifications
     OQPRINT   E  1 1      HEADINGS
     O     *DATE               10        Y
     O                         73         'CloudServices24X7, Inc.'
     O                        123         'Page'
     O     PAGE               129        Z
     O        E    1       HEADINGS
     O                         73         'Inventory Master Report'
     O        E    1       HEADINGS
     O                          6         'Prod.'
     O                         58         'Weight'
     O                         68         'Qty. On'
     O                         77         'Reorder'
     O                         86         'Reorder'
     O                         98         'Shipping'
     O                        108         'Average'
     O                        118         'Current'
     O                        129         'Selling'
     O        E    1       HEADINGS
     O                          5         'Num.'
     O                         21         'Description'
     O                         58         'Lbs-Oz'
     O                         65         'Hand'
     O                         75         'Point'
     O                         82         'Qty'
     O                         95         'Cost'
     O                        106         'Cost'
     O                        117         'Cost'
     O                        127         'Cost'
     O        E    1       DETAIL
     O     PRODNO               7
     O     DESCRP              50
     O     SHIPWT              57
     O     QTYOH               65        1
     O     RORPNT              74        1
     O     RORQTY              82        Z
     O     SHPCST              99        1
     O     AVGCST             109        1
     O     CURCST             119        1
     O     SELLPR             129        1