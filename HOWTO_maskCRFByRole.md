Mask CRF By Role
================

Introduction
------------
In a clinical trial it may be necessary because of FDA guidance or the structure of the experiment to blind a particular
role to a particular set of 1 or more case report forms (CRF).

The current versions of Clin Capture and Open Clinica do not provide this level of granularity.   The objective of the maskCRFByRole.js
library is to provide exactly that capability without requiring any changes in the Java bean code or in JSP pages.

The idea
--------

How to install
--------------
maskCRFByRole.js is a JavaScript library that can be included in the webapps/<yourwebapp>/includes/global_functions_javascript.js directory

How it works
------------
The code identifies relevant content on the page and if the Role is XXX, it changes the CSS display attribute to none.

This version requires hard coding the rules in the maskCRFByRole function which requires a bit of JS knowldge.  In the future we think it 
should be data-driven and eventually replaced by core Java code.

In terms of coverage - the masking is performed on all the relevant ClinCapture  functions we could identify - the code has been verified by a live sponsor so 
we are fairly confident we covered all the interesting use cases:

Pages that are masked:
    'InitialDataEntry' 
    'AdministrativeEditing'
    'ViewSectionDataEntry'
    'PrintDataEntry'
    'ResolveDiscrepancy'
    'PrintCRF'
    'Extract Data' (removes the link from Tasks menu)
    'Subject\'s Case Book' (removes the button from the View Subject page)

If a user visits pages masked to his/her role - they will get an alert and be redirected back to the referer (the previous page). For example,
if an Investigator is masked to "Test results" - when they attempt to view "Test results" from the Subjects matrix - they will get a warning and be
redirected back to the Subjects matrix.
    
Limitations
------------
Currently tested in ClinCapture 1.0.3.5.x and versions > 1.0.8.x.   It probably won't work in older versions of ClinCapture like 1.0.3.1 or Open Clinica
but it is fairly trivial to adapt the code by identifying  the correct DOM elements using the Chrome or FF debugger and modifying the Jquery calls accordingly.


Prerequisites
-------------
Jquery - already packaged  in ClinCapture and Open Clinica