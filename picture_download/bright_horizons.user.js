// ==UserScript==
// @name         download bright horizon pictures
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  use on your own risk
// @author       wang19891218
// @updateURL    https://github.com/wang19891218/tampermonkey-scripts/raw/master/picture_download/bright_horizons.user.js
// @downloadURL    https://github.com/wang19891218/tampermonkey-scripts/raw/master/picture_download/bright_horizons.user.js
// @match        https://productionmbd.brighthorizons.com/m/snapshot/*
// @match        https://productionmbd.brighthorizons.com/m/p/*
// @match        https://productionmbd.brighthorizons.com/m/v/*
// @match        https://productionmbd.brighthorizons.com/m/observation/*
// @icon         https://www.google.com/s2/favicons?domain=brighthorizons.com
// @grant        none
// ==/UserScript==

// TODO
// * Add the date of uuid to file name

function get_time_int(uuid_str) {
    var uuid_arr = uuid_str.split( '-' ),
        time_str = [
            uuid_arr[ 2 ].substring( 1 ),
            uuid_arr[ 1 ],
            uuid_arr[ 0 ]
        ].join( '' );
    return parseInt( time_str, 16 );
};

function get_date_obj(uuid_str) {
    var int_time = get_time_int( uuid_str ) - 122192928000000000,
        int_millisec = Math.floor( int_time / 10000 );
    return new Date( int_millisec );
};


function saveFigure() {
    'use strict';
    if (document.title.includes("Link Expired") ) {
        var listA = [].slice.call(document.getElementsByTagName("a"))
        if (listA[0].textContent.includes("click here")) {
            listA[0].click()
        }
    } else {
        // Get URL
        console.log("Parsing", window.location.href)
        let endString = "?d=t&thumbnail=true"
        if (document.location.href.endsWith(endString)) {
            var url = window.location.href.substring(
                0, window.location.href.length - endString.length)
        }
        else{
            var url = window.location.href
        }
        let uuid = url.substring(url.lastIndexOf("/") + 1)
        console.log(uuid)
        let date = get_date_obj(uuid)
        console.log(date)
        console.log(date.getFullYear().toString())
        console.log(date.getMonth().toString())
        console.log(date.getDate().toString())


        url = url + "?d=t"
        // console.log(url)
        // Get current date var today = new Date();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var strToday = yyyy + mm + dd;

        // Download image
        var a = document.createElement('A')
        a.href = url
        console.log("Downloading", a)
        a.download = 'bright_horizons_' + strToday + '_' + url.substr(url.lastIndexOf('/') + 1)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.close();
    }
}

saveFigure()
