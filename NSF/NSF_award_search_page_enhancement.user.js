// ==UserScript==
// @name         NSF award display enhancement
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  NSF award display enhancement: larger font
// @author       wang19891218 
// @match        https://www.nsf.gov/awardsearch/showAward*
// @match        https://nsf.gov/awardsearch/showAward*
// @grant        none
// ==/UserScript==

function Set_Page_Width() {
    'use strict';
    var List_Table = document.getElementsByTagName("table")
    var DOM_Table = List_Table[0]
    DOM_Table.width = 900
        // DOM_Table.style.width = 9000
};


function Set_Text_Size() {
    'use strict';
    var DOM_Text = document.getElementsByClassName("text")[0]
    DOM_Text.style.fontSize = "100%";
    var List_TableText2 = document.getElementsByClassName("tabletext2")
    for (var Test in List_TableText2) {
        console.log(Test);
        console.log(typeof(Test.style) == "object")
        if (typeof(List_TableText2[Test].style) == "object") {
            console.log("changing");
            List_TableText2[Test].style.fontSize = "90%";
        }
    }
};


Set_Page_Width();
Set_Text_Size();
