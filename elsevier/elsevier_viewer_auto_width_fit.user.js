==UserScript==
// @name         elsvier pdf viewer auto width expand
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       wang19891218
// @match        https://reader.elsevier.com/reader/*
// @icon         https://www.google.com/s2/favicons?domain=elsevier.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('load', function_fit_to_width, false);
})();


function function_fit_to_width() {
    var button = document.getElementById("fit-to-width-button")
    button.click()
}
