// ==UserScript==
// @name         NSF award search enhancement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match      https://www.nsf.gov/awardsearch*
// @grant        none
// ==/UserScript==

function Set_Page_Width(){
   'use strict';
    var List_Table = document.getElementsByTagName("table")
    var DOM_Table = List_Table[0]
    DOM_Table.width = 900
    // DOM_Table.style.width = 9000
};


function Set_Text_Size(){
   'use strict';
    var DOM_Text = document.getElementsByClassName("text")[0]
    DOM_Text.style.fontSize = "100%";
    var List_TableText2 = document.getElementsByClassName("tabletext2")
    for (var Test in List_TableText2) {
        // console.log(Test);
        if (typeof(Test.style) == "object") {
            Test.style.fontsize = "90%";
            }
        }
};


Set_Page_Width();
Set_Text_Size();

