// ==UserScript==
// @name         download bright horizon pictures
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  use on your own risk
// @author       wang19891218
// @match        https://mybrightday.brighthorizons.com/m/p/*
// @match        https://mybrightday.brighthorizons.com/m/v/*
// @icon         https://www.google.com/s2/favicons?domain=brighthorizons.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (document.title.includes("Link Expired") ) {
        var listA = [].slice.call(document.getElementsByTagName("a"))
        if (listA[0].textContent.includes("click here")) {
            listA[0].click()
        }
    } else {
        // Get URL
        console.log(window.location.href)
        var url = window.location.href + "?d=t"
        console.log(url)
        // Get current date var today = new Date();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var strToday = yyyy + mm + dd;

        // Download image
        var a = document.createElement('A')
        a.href = url
        a.download = 'bright_horizons_' + strToday + '_' + url.substr(url.lastIndexOf('/') + 1)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.close();
    }
})();
