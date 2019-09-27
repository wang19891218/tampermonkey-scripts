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
    var List_Class = document.getElementsByClassName("gs_fl");
    var var_h_coord = window.innerWidth - 220
    div_Control.style.left = var_h_coord+"px"
    var Int_Threshold_Value_Cite=div_Input_Cite.value
    for (var i_Class = 0; i_Class < List_Class.length; i_Class++){
        List_a_Tag = List_Class[i_Class].getElementsByTagName("a");
        for (var i_a_Tag = 0; i_a_Tag < List_a_Tag.length; i_a_Tag++){
            if (List_a_Tag[i_a_Tag].textContent.indexOf(Str_search_Text) == 0){
                Str_Citation_Number = List_a_Tag[i_a_Tag].textContent
                Value_Citation_Number = parseInt(Str_Citation_Number.substring(9, Str_Citation_Number.length))
                if (Value_Citation_Number >= Int_Threshold_Value_Cite){
                    List_a_Tag[2].style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
                } else {
                    List_a_Tag[2].style.backgroundColor = '';
                }
            }
        }
    }
    document.cookie = "Input_Cite_Value=" + div_Input_Cite.value
    return true
}


function Function_Highlight_Year() {
    var Array_gs_a = document.getElementsByClassName('gs_a')
    var Int_Threshold_Year = div_Input_Year.value
    for (var i_gs=0; i_gs < Array_gs_a.length; i_gs++) {
        var Div_gs_a = Array_gs_a[i_gs]
        var Str_Year = Div_gs_a.textContent.match(/ [0-9][0-9][0-9][0-9] /g)[0]
        // var Int_Start = Div_gs_a.textContent.lastIndexOf(',')
        // var Int_Ended = Div_gs_a.textContent.lastIndexOf('-')
        // var Str_Year = Div_gs_a.textContent.substring(Int_Start + 1,Int_Ended)
        var Int_Year = parseInt(Str_Year)
        if (Int_Year >= Int_Threshold_Year) {
            Div_gs_a.innerHTML = Div_gs_a.innerHTML.replace(Str_Year,'<b style=\"background-color:powderblue;display: inline-block;\">' + Str_Year + '</b>');
        } else {
        }
        console.log(Str_Year)
    }
    document.cookie = "Input_Year_Threshold=" + div_Input_Year.value
    return true
}

var Str_search_Text = "Cited";
var List_Found = [];
var List_a_Tag = [];
var Str_Citation_Number;
var Value_Citation_Number;


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

var decodedCookie = decodeURIComponent(document.cookie);

function getCookie(name) {
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return "0";
}


var div_Input_Cite_Title = document.createElement("div");
div_Input_Cite_Title.innerText="Citation threshold"
div_Input_Cite_Title.class="column"
div_Input_Cite_Title.style.width = "200px"
div_Input_Cite_Title.style.height = "20px"
div_Input_Cite_Title.style.float = "left"

var div_Input_Cite = document.createElement("INPUT");
div_Input_Cite.setAttribute("type", "text");
div_Input_Cite.name= "name"
div_Input_Cite.style.float = "left"
div_Input_Cite.class="column"
div_Input_Cite.id = "id_coco_scholar_control_input_cite_number"
div_Input_Cite.value=parseInt(getCookie("Input_Cite_Value"));
if (isNaN(div_Input_Cite.value)) div_Input_Cite.value = 2000;
document.cookie = "Input_Cite_Value=" + div_Input_Cite.value
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
div_Input_Year.value=parseInt(getCookie("Input_Year_Threshold"));
if (isNaN(div_Input_Year.value)) div_Input_Year.value = 2000;
document.cookie = "Input_Year_Threshold=" + div_Input_Year.value
div_Input_Year.onchange = function(){Function_Highlight_Year()}

window.addEventListener("resize", Function_High_Light);

div_Control.appendChild(div_Input_Cite_Title)
div_Control.appendChild(div_Input_Cite)
div_Control.appendChild(div_Input_Year_Title)
div_Control.appendChild(div_Input_Year)

document.getElementById("gs_top").appendChild(div_Control)


Function_High_Light()
Function_Highlight_Year()
