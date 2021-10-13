// ==UserScript==
// @name         Google scholar conditional highlight
// @namespace    wang19891218
// @version      0.41
// @description  Save some time
// @author       coco
// @updateURL    https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/google_scholar_conditional_highlight.user.js
// @downloadURL  https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/google_scholar_conditional_highlight.user.js
// @match        https://scholar.google.com/scholar*
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     IMPORTED_CSS  https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css
// ==/UserScript==


function FunctionModifyItems() {
    // Modify items following current condition selection
    var ListGSRI = document.getElementsByClassName('gs_ri')
    for (var i_GSRI=0; i_GSRI < ListGSRI.length; i_GSRI++) {
        // Get current year
        var d = new Date();
        var floatCurrentYear = parseFloat(d.getFullYear());
        // Get publication year of item
        var GSRI = ListGSRI[i_GSRI]
        var Div_gs_a = GSRI.getElementsByTagName("div")[0]
        var Str_Year = Div_gs_a.textContent.match(/ [0-9][0-9][0-9][0-9] /g)[0]
        var floatPublichYear = parseFloat(Str_Year)
        // Get citation number
        var arrayA = GSRI.getElementsByTagName("div")[2].getElementsByTagName("a")
        var aCitationNumer = arrayA[2];
        var floatCitationNumber= parseFloat(aCitationNumer.textContent.match(/[0-9]{1,}/)[0])
        // Get citation per year
        var floatAverageCitation = floatCitationNumber / (floatCurrentYear + 1 - floatPublichYear)

        // Add citation per year to the item
        var textAvgCitation = aCitationNumer.cloneNode()
        if (arrayA[3].textContent.indexOf("year") !== -1) {

        }else{
            textAvgCitation.textContent = ", " + floatAverageCitation.toFixed(2).toString() + ' per year'
            textAvgCitation.style = ''
            arrayA[2].parentNode.insertBefore(textAvgCitation, aCitationNumer.nextSibling);
        }
        // Highlight year
        var strStyle = "background-color:powderblue;display: inline-block; border: 2px dashed black; padding: 0.03em 0.05em;"
        Div_gs_a.innerHTML = Div_gs_a.innerHTML.replace(strStyle,'');
        if (floatPublichYear >= div_Input_Year.value) {
            Div_gs_a.innerHTML = Div_gs_a.innerHTML.replace(Str_Year,'<b style=\"' + strStyle + '\">' + Str_Year + '</b>');
        } else {
        }

        // Highlight citation
        if (floatCitationNumber >= div_Input_Cite.value){
            aCitationNumer.style.backgroundColor = 'powderblue';
            aCitationNumer.style.border = "2px dashed black";
            // console.log(aCitationNumer.style.border);
        } else {
            aCitationNumer.style.backgroundColor = '';
            aCitationNumer.style.border = "";
        }

        // Change alpha of unmatched item
        if (floatPublichYear < div_Input_Year.value || floatCitationNumber < div_Input_Cite.value) {
            GSRI.style.opacity = 0.5;
        }
        else {
            GSRI.style.opacity = 1;
        }

    }
    document.cookie = "Input_Year_Threshold=" + div_Input_Year.value
    document.cookie = "Input_Cite_Value=" + div_Input_Cite.value
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
div_Control.id = "id_coco_scholar_control"
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
div_Input_Year.style.width = "60px"

window.addEventListener("resize", FunctionModifyItems);

var ButtonHighLight = document.createElement("button");
ButtonHighLight.className = "btn"
ButtonHighLight.style.margin = "5px"
console.log(ButtonHighLight.style.padding)
ButtonHighLight.textContent = "highlight"
ButtonHighLight.onclick = function(){
    FunctionModifyItems()
}

div_Control.appendChild(div_Input_Cite_Title)
div_Control.appendChild(div_Input_Cite)
div_Control.appendChild(div_Input_Year_Title)
div_Control.appendChild(div_Input_Year)
div_Control.appendChild(ButtonHighLight)

FunctionModifyItems()
// FunctionHighlightCitation()
// Function_Highlight_Year()
// FunctionAddAverageCitation()
