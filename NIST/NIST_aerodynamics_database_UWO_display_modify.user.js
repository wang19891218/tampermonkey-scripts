// ==UserScript==
// @name         NIST UWO dataset display modifier
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  NIST UWO aerodynamics display enhancement 
// @author       wang19891218
// @updateURL    https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/NIST_aerodynamics_database_UWO_display_modify.user.js
// @downloadURL  https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/NIST_aerodynamics_database_UWO_display_modify.user.js
// @match        https://www.nist.gov/el/materials-and-structural-systems-division-73100/nist-aerodynamic-database/university-western-*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nist.gov
// @grant        none
// ==/UserScript==


function functionRunModifier() {
    'use strict';
    // Your code here...
    // console.log("Working");
    var elementTable = document.getElementsByClassName("table-wrapper")[0];
    elementTable.style.overflow = "visible";
    // console.log(elementTable.style.overflow)
    var elementTableOverflow = document.getElementsByClassName("table-overflow")[0];
    // console.log(elementTableOverflow);
    elementTableOverflow.parentElement.removeChild(elementTableOverflow);
}


window.addEventListener('load', function() {
    // your code here
    functionRunModifier()
}, false);