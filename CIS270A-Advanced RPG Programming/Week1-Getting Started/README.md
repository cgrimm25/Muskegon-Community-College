# Project 1: Comprehensive Profit and Commission Report

## Overview
This project serves as the advanced implementation tier baseline, establishing modern mid-range development workflows using **IBM Rational Developer for i (RDi)** and **IBM Access Client Solutions (ACS)**. The application processes warehouse logistics data from the `CSINVP` Master Inventory physical file to analyze product financial performance. It dynamically evaluates net unit profit margins, invokes arithmetic rounding structures to determine corporate sales commissions, and tracks cumulative corporate profit balances across automated page-overflow spooled printing grids.

## File Directory
* **`PROJ1.RPGLE`**: The core application processing program written in fully free-form RPGLE. It drives the sequential database record cursor loop, routes calculations through specialized subroutines, handles indicator resets, and manages total accumulations.
* **`PROFITR.PRTF`**: The externally described printer file Data Description Specifications (DDS). It defines the strict horizontal alignment grids, system counters (`DATE` and `PAGNBR`), and customized monetary edit codes (`EDTCDE(1 $)`) for the reporting sheets.
* **`Project 1 Instructions.pdf`**: The official course specification outlining technical design bounds, target field mapping lengths, and visual printchart layout criteria.
* **`CSINVP.xlsx`**: An analytical database extraction spreadsheet generated via the IBM ACS Data Transfer utility to audit host record integrity offline.
* **`PROJ1-OUTPUT.pdf`**: A sample execution spool printout confirming perfect column registration, rounded commission numbers, and error-free summary blocks.