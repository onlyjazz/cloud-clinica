Sharing data between CRFs
==============================================

The idea
--------
The current versions of ClinCapture and OpenClinica do not provide convenient functionality for different CRF forms to share
data for calculations or display in a single login session and if you wanted to persist data after login for the user - forget it.

Since the code is not Ajax based and JSP refreshes every time, it is difficult to maintain state on the client side.

The persistentStorage.js library is a simple way of enabling a form to share data on the client side with other forms using key-value pairs.


How to install
--------------
persistentStorage.js is a JavaScript library that can be included in the webapps/<yourwebapp>/includes/global_functions_javascript.js directory
If you are using maskCRFByRole - you already have it.

Take a backup - include the library and you are ready to go.

How it works
------------
The code provides 2 Javascript functions that can be used inside CRF client side code:
    setStore(key, val);
    var val = getStore(key);
    
Limitations
------------
None

Prerequisites
-------------
IE 8 and above, Chrome, Mozilla (FireFox)  browsers
