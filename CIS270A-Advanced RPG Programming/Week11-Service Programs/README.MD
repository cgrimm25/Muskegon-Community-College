# CIS 270A Project 9: Service Program Implementation (ILE)

## Overview
Project 9 advances the ILE architecture by implementing **Bind-by-Reference**. Unlike Project 8, which statically bound modules together into a single executable, this project modularizes the `MODID` and `MODPASS` sub-procedures into a reusable Service Program (`USERSRVPGM`). This approach allows common logic to be maintained in one location and shared across multiple applications, significantly reducing redundancy and simplifying updates.

* **Service Program (`USERSRVPGM`)**: A library of reusable, exported sub-procedures.
* **Consumer (`USERAPP`)**: An interactive application that dynamically links to these sub-procedures at runtime.

---

## File Directory
* **`USERAPP.RPGLE`**: The main interactive application. It prompts for input via `USERSCREEN` and consumes the service program procedures.
* **`USERSCREEN.DSPF`**: The display file defining the interactive interface.
* **`MODID.RPGLE`**: Service module containing the `MODID` procedure (exported for service program use).
* **`MODPASS.RPGLE`**: Service module containing the `MODPASS` procedure (exported for service program use).
* **`PROJ9BND.BND`**: Binder language source defining the exported symbols.
* **`Project 9 Instructions.pdf`**: Official compilation and binding requirements.
* **`USERSRVPGM.pdf`**: The compilation output print stream confirming the successful execution of the `CRTSRVPGM` command, which generated the `USERSRVPGM` service program from the `MODID` and `MODPASS` modules.

---

## Binder Language (`PROJ9BND.BND`)
The Binder Language dictates the public interface of the service program. This member must have the type `BND` and be stored in your source file (e.g., `QSRVSRC`).

```text
/* Binding Directory: PROJ9BND.BND                         */
/* Programmer: Chris Grimm                                 */
/* Date: 04/01/21                                          */
/* EXTERNAL BINDING DIRECTORY FOR BUILDING SERVICE PROGRAM */

             STRPGMEXP PGMLVL(*CURRENT)
                EXPORT    SYMBOL(MODID)
                EXPORT    SYMBOL(MODPASS)
             ENDPGMEXP
```

---

## Compilation Pipeline (Bind-by-Reference)
To successfully link this application, the objects must be compiled and bound in a strict order:

1. **Compile the Display File:**
   `CRTDSPF FILE(YOURLIB/USERSCREEN) SRCFILE(YOURLIB/QDDSSRC) SRCMBR(USERSCREEN)`
2. **Compile the Subprocedures into Modules:**
   `CRTRPGMOD MODULE(YOURLIB/MODID) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(MODID)`
   `CRTRPGMOD MODULE(YOURLIB/MODPASS) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(MODPASS)`
3. **Generate the Service Program:**
   `CRTSRVPGM SRVPGM(YOURLIB/USERSRVPGM) MODULE(YOURLIB/MODID YOURLIB/MODPASS) EXPORT(*SRCFILE) SRCFILE(YOURLIB/QSRVSRC) SRCMBR(PROJ9BND)`
4. **Compile the Interactive Application into a Module:**
   `CRTRPGMOD MODULE(YOURLIB/USERAPP) SRCFILE(YOURLIB/QRPGLESRC) SRCMBR(USERAPP)`
5. **Bind the Application to the Service Program:**
   `CRTPGM PGM(YOURLIB/USERAPP) MODULE(YOURLIB/USERAPP) BNDSRVPGM(YOURLIB/USERSRVPGM)`