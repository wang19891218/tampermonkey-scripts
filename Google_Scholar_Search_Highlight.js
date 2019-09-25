// ==UserScript==
// @name         Google Scholar Highlight
// @namespace    wang19891218
// @version      0.1
// @description  Save some time
// @author       coco
// @match        https://scholar.google.com/scholar*
// @grant        none
// ==/UserScript==


function Function_High_Light(){
    var var_h_coord = window.innerWidth - 220
    div_Control.style.left = var_h_coord+"px"
    Int_Threshold_Value_Cite=div_Input_Cite.value
    for (var i_Class = 0; i_Class < List_Class.length; i_Class++){
        List_a_Tag = List_Class[i_Class].getElementsByTagName("a");
        for (var i_a_Tag = 0; i_a_Tag < List_a_Tag.length; i_a_Tag++){
            if (List_a_Tag[i_a_Tag].textContent.indexOf(Str_search_Text) == 0){
                Str_Citation_Number = List_a_Tag[i_a_Tag].textContent
                Value_Citation_Number = parseInt(Str_Citation_Number.substring(9, Str_Citation_Number.length))
                if (Value_Citation_Number >= Int_Threshold_Value_Cite){
                    console.log(i_Class, i_a_Tag)
                    List_a_Tag[2].style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                } else {
                    List_a_Tag[2].style.backgroundColor = '';
                }
            }
        }
    }
    document.cookie = "Input_Cit_Value=" + div_Input_Cite.value
    return true
}

var List_Class = document.getElementsByClassName("gs_fl");
var Str_search_Text = "Cited";
var List_Found = [];
var List_a_Tag = [];
var Str_Citation_Number;
var Value_Citation_Number;
var Int_Threshold_Value_Cite = 60


var div_Control = document.createElement("div");
var var_v_coord = 180
var var_h_coord = window.innerWidth - 220
div_Control.style.left = var_h_coord+"px"
div_Control.style.position = "absolute"
div_Control.style.top = var_v_coord+"px"
div_Control.style.width = "200px";
div_Control.style.height = "100px";
div_Control.style.background = "gray";
div_Control.style.color = "white";
div_Control.id = "id_coco_scholar_control"
// div_Control.innerHTML = "Control";


var div_Input_Cite_Title = document.createElement("div");
div_Input_Cite_Title.innerText="Citation threshold"
div_Input_Cite_Title.class="column"
div_Input_Cite_Title.style.width = "200px"
div_Input_Cite_Title.style.height = "20px"
div_Input_Cite_Title.style.float = "left"


var decodedCookie = decodeURIComponent(document.cookie);

function getCookie() {
  var name = "Input_Cit_Value=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "300";
}

var div_Input_Cite = document.createElement("INPUT");
div_Input_Cite.setAttribute("type", "text");
div_Input_Cite.name= "name"
div_Input_Cite.style.float = "left"
div_Input_Cite.class="column"
div_Input_Cite.id = "id_coco_scholar_control_input_cite_number"
div_Input_Cite.value=parseInt(getCookie());
document.cookie = "Input_Cit_Value =" + div_Input_Cite.value
div_Input_Cite.onchange = function(){Function_High_Light()}

var div_Input_Year_Title = document.createElement("div");
div_Input_Year_Title.innerText="Year threshold"
div_Input_Year_Title.class="column"
div_Input_Year_Title.style.width = "200px"
div_Input_Year_Title.style.height = "20px"
div_Input_Year_Title.style.float = "left"


var div_Input_Year = document.createElement("INPUT");
div_Input_Year.setAttribute("type", "text");
div_Input_Year.name= "name"
div_Input_Year.style.float = "left"
div_Input_Year.class="column"
div_Input_Year.id = "id_coco_scholar_control_input_year"
div_Input_Year.value=1900
div_Input_Year.onchange = function(){Function_High_Light()}

window.addEventListener("resize", Function_High_Light);

div_Control.appendChild(div_Input_Cite_Title)
div_Control.appendChild(div_Input_Cite)
// div_Control.appendChild(div_Input_Year_Title)
// div_Control.appendChild(div_Input_Year)

document.getElementById("gs_top").appendChild(div_Control)


Function_High_Light()



// // ==UserScript==
// // @name         Google Scholar Highlight
// // @namespace    http://waecoco.com
// // @version      0.1
// // @description  Save some time
// // @author       coco
// // @match        https://scholar.google.com/*
// // @grant        none
// // ==/UserScript==

// var List_Class = document.getElementsByClassName("gs_fl");
// var Str_search_Text = "Cited";
// var List_Found = [];
// var List_a_Tag = [];
// var Str_Citation_Number;
// var Value_Citation_Number;
// var Int_Threshold_Value_Cite = 60

// for (var i_Class = 0; i_Class < List_Class.length; i_Class++){
//     List_a_Tag = List_Class[i_Class].getElementsByTagName("a");
//     for (var i_a_Tag = 0; i_a_Tag < List_a_Tag.length; i_a_Tag++){
//         if (List_a_Tag[i_a_Tag].textContent.indexOf(Str_search_Text) == 0){
//             Str_Citation_Number = List_a_Tag[i_a_Tag].textContent
//             Value_Citation_Number = parseInt(Str_Citation_Number.substring(9, Str_Citation_Number.length))
//             if (Value_Citation_Number >= Int_Threshold_Value_Cite){
//                 console.log(i_Class, i_a_Tag)
//                 List_a_Tag[2].style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
//             }
//         }
//     }
// }
