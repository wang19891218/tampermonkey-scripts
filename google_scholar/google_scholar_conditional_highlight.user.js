// ==UserScript==
// @name         Google scholar conditional highlight
// @namespace    wang19891218
// @version      0.33
// @description  Save some time
// @author       coco
// @updateURL    https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/google_scholar_conditional_highlight.user.js
// @downloadURL  https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/google_scholar_conditional_highlight.user.js
// @match        https://scholar.google.com/scholar*
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     IMPORTED_CSS  https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css
// ==/UserScript==



function FunctionHighlightCitation(){
    // Highlight citation
    var List_Class = document.getElementsByClassName("gs_fl");
    var var_h_coord = window.innerWidth - 220
    // div_Control.style.left = var_h_coord+"px"
    var Int_Threshold_Value_Cite=div_Input_Cite.value
    for (var i_Class = 0; i_Class < List_Class.length; i_Class++){
        List_a_Tag = List_Class[i_Class].getElementsByTagName("a");
        for (var i_a_Tag = 0; i_a_Tag < List_a_Tag.length; i_a_Tag++){
            if (List_a_Tag[i_a_Tag].textContent.indexOf(Str_search_Text) == 0){
                Str_Citation_Number = List_a_Tag[i_a_Tag].textContent
                Value_Citation_Number = parseInt(Str_Citation_Number.substring(9, Str_Citation_Number.length))
                if (Value_Citation_Number >= Int_Threshold_Value_Cite){
                    List_a_Tag[2].style.backgroundColor = 'powderblue';
                    List_a_Tag[2].style.border = "2px dashed black";
                    // List_a_Tag[2].style.padding = "0.03em 0.05em";
                    console.log(List_a_Tag[2].style.border);
                } else {
                    List_a_Tag[2].style.backgroundColor = '';
                    List_a_Tag[2].style.border = "";
                }
            }
        }
    }
    document.cookie = "Input_Cite_Value=" + div_Input_Cite.value
    return true
}

function Function_Highlight_Year() {
    // Highe light year
    var Array_gs_a = document.getElementsByClassName('gs_a')
    var Int_Threshold_Year = div_Input_Year.value
    for (var i_gs=0; i_gs < Array_gs_a.length; i_gs++) {
        var Div_gs_a = Array_gs_a[i_gs]
        var Str_Year = Div_gs_a.textContent.match(/ [0-9][0-9][0-9][0-9] /g)[0]
        // var Int_Start = Div_gs_a.textContent.lastIndexOf(',')
        // var Int_Ended = Div_gs_a.textContent.lastIndexOf('-')
        // var Str_Year = Div_gs_a.textContent.substring(Int_Start + 1,Int_Ended)
        var Int_Year = parseInt(Str_Year)
        var strStyle = "background-color:powderblue;display: inline-block; border: 2px dashed black; padding: 0.03em 0.05em;"
        Div_gs_a.innerHTML = Div_gs_a.innerHTML.replace(strStyle,'');
        if (Int_Year >= Int_Threshold_Year) {
            // console.log(Div_gs_a.innerHTML);
            Div_gs_a.innerHTML = Div_gs_a.innerHTML.replace(Str_Year,'<b style=\"' + strStyle + '\">' + Str_Year + '</b>');
        } else {

        }
        // console.log(Str_Year)
    }
    document.cookie = "Input_Year_Threshold=" + div_Input_Year.value
    return true
}

function FunctionAddAverageCitation() {
    // Highe light year
    var ListGSRI = document.getElementsByClassName('gs_ri')
    for (var i_GSRI=0; i_GSRI < ListGSRI.length; i_GSRI++) {
        var d = new Date();
        var floatCurrentYear = parseFloat(d.getFullYear());
        var GSRI = ListGSRI[i_GSRI]
        var Div_gs_a = GSRI.getElementsByTagName("div")[0]
        var Str_Year = Div_gs_a.textContent.match(/ [0-9][0-9][0-9][0-9] /g)[0]
        var floatPublichYear = parseFloat(Str_Year)

        var arrayA = GSRI.getElementsByTagName("div")[2].getElementsByTagName("a")
        var aCitationNumer = arrayA[2];
        var floatCitationNumber= parseFloat(aCitationNumer.textContent.match(/[0-9]{1,}/)[0])
        var floatAverageCitation = floatCitationNumber / (floatCurrentYear + 1 - floatPublichYear)

        var textAvgCitation = aCitationNumer.cloneNode()
        textAvgCitation.textContent = ", " + floatAverageCitation.toFixed(2).toString() + ' per year'
        textAvgCitation.style = ''
        arrayA[2].parentNode.insertBefore(textAvgCitation, aCitationNumer.nextSibling);
        // arrayA.splice(3,0, divAvgCitation)
        // console.log(textAvgCitation)
        // console.log(arrayA[2].parentNode)
    }
    document.cookie = "Input_Year_Threshold=" + div_Input_Year.value
    return true
}

var gs_bdy_sb_in = document.getElementById("gs_bdy_sb_in")

var Str_search_Text = "Cited";
var List_Found = [];
var List_a_Tag = [];
var Str_Citation_Number;
var Value_Citation_Number;


var div_Control = document.createElement("div");

gs_bdy_sb_in.appendChild(div_Control)

var var_v_coord = 120
var var_h_coord = window.innerWidth - 220
// div_Control.style.position = "fixed";
// div_Control.style.left = var_h_coord+"px"
// div_Control.style.position = "absolute"
// div_Control.style.top = "0"

// div_Control.style.top = var_v_coord+"px"
// div_Control.style.right = "20px"
// div_Control.style.width = "200px";
// div_Control.style.height = "120px";
// div_Control.style.background = "rgba(255, 0, 0, 0.3)";
// div_Control.style.color = "white";
// div_Control.style.border = "solid"
// div_Control.style.padding = "12px";
div_Control.id = "id_coco_scholar_control"
// div_Control.className = "input-group"
// div_Control.innerHTML = "Control";
div_Control.className = "gs_bdy_sb_sec"


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
div_Input_Cite_Title.innerText = "Citation threshold"
div_Input_Cite_Title.className = "column"
div_Input_Cite_Title.style.width = "200px"
div_Input_Cite_Title.style.height = "20px"
div_Input_Cite_Title.style.float = "left"


var div_Input_Cite = document.createElement("INPUT");
div_Input_Cite.setAttribute("type", "text");
div_Input_Cite.name= "name"
div_Input_Cite.style.float = "left"
div_Input_Cite.className ="column"
div_Input_Cite.style.width = "60px"

div_Input_Cite.id = "id_coco_scholar_control_input_cite_number"
div_Input_Cite.value=parseInt(getCookie("Input_Cite_Value"));
if (isNaN(div_Input_Cite.value)) div_Input_Cite.value = 2000;
document.cookie = "Input_Cite_Value=" + div_Input_Cite.value
// div_Input_Cite.onchange = function(){FunctionHighlightCitation()}

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
div_Input_Year.className ="form-control"
div_Input_Year.id = "id_coco_scholar_control_input_year"
div_Input_Year.value=parseInt(getCookie("Input_Year_Threshold"));
if (isNaN(div_Input_Year.value)) div_Input_Year.value = 2000;
document.cookie = "Input_Year_Threshold=" + div_Input_Year.value
// div_Input_Year.onchange = function(){Function_Highlight_Year()}
div_Input_Year.style.width = "60px"

window.addEventListener("resize", FunctionHighlightCitation);

var ButtonHighLight = document.createElement("button");
ButtonHighLight.className = "btn"
ButtonHighLight.style.margin = "5px"
console.log(ButtonHighLight.style.padding)
ButtonHighLight.textContent = "highlight"
ButtonHighLight.onclick = function(){
FunctionHighlightCitation(); 
Function_Highlight_Year();
FunctionAddAverageCitation();
}

div_Control.appendChild(div_Input_Cite_Title)
div_Control.appendChild(div_Input_Cite)
div_Control.appendChild(div_Input_Year_Title)
div_Control.appendChild(div_Input_Year)
div_Control.appendChild(ButtonHighLight)

// document.getElementsByTagName("body")[0].appendChild(div_Control)


FunctionHighlightCitation()
Function_Highlight_Year()
FunctionAddAverageCitation()
