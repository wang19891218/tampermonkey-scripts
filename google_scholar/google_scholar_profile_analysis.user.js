// ==UserScript==
// @name         Google scholar profile analysis
// @namespace    http://tampermonkey.net/
// @version      0.5.1
// @description  Google scholar profile analysis plugin
// @author       Haifeng Wang
// @include      /^https://scholar.google.com/citations.*user=.*/
// @grant        none
// ==/UserScript==


function get_unique_and_sort(array_for_counting) {
    // Get unique
    var counts = {};
    for (var i = 0; i < array_for_counting.length; i++) {
        // console.log(counts[array_for_counting[i]] || 0);
        counts[array_for_counting[i]] = 1 + (counts[array_for_counting[i]] || 0);
    }
    var array_authors = []
    var array_keys = Object.keys(counts)
    for (var i_author = 0; i_author < array_keys.length; i_author++) {
        array_authors.push({ 'name': array_keys[i_author], 'count': counts[array_keys[i_author]] })
    }

    // Sort
    array_authors.sort(function(a, b) { return -a.count + b.count });
    return array_authors
}

function get_coauthors_rate() {
    var list_divs = document.getElementsByClassName('gsc_a_tr');
    var i_paper;
    var array_authors = [];
    for (i_paper = 0; i_paper < list_divs.length; i_paper++) {
        var temp_array_author = list_divs[i_paper].children[0].getElementsByClassName('gs_gray')[0].textContent.split(", ");
        array_authors = array_authors.concat(temp_array_author);
    };
    array_authors = get_unique_and_sort(array_authors)
    var i_author;
    var temp_output = "";
    for (i_author = 0; i_author < array_authors.length; i_author++) {
        temp_output = temp_output.concat(array_authors[i_author].name);
        temp_output = temp_output.concat(": ");
        temp_output = temp_output.concat(array_authors[i_author].count.toString());
        temp_output = temp_output.concat("; ");
        // console.log(array_authors[i_author].name, array_authors[i_author].count);
    }
    console.log("Name count")
    console.log(temp_output);
    var paragraphNames = document.getElementById("paragraphNames");
    paragraphNames.innerText = temp_output;
}

function get_word_rate() {
    var list_divs = document.getElementsByClassName('gsc_a_tr');
    var array_words = [];
    var i_paper;
    for (i_paper = 0; i_paper < list_divs.length; i_paper++) {
        var string_title = list_divs[i_paper].children[0].children[0].textContent;
        string_title = string_title.toLowerCase();
        string_title = string_title.replace(':', ' ');
        string_title = string_title.replace('-', ' ');
        string_title = string_title.replace('a ', '');
        string_title = string_title.replace('and ', '');
        string_title = string_title.replace('based ', '');
        string_title = string_title.replace('for ', '');
        string_title = string_title.replace('in ', '');
        string_title = string_title.replace('of ', '');
        string_title = string_title.replace('on ', '');
        string_title = string_title.replace('using ', '');
        string_title = string_title.replace('the ', '');
        var temp_array_word = string_title.split(" ");
        array_words = array_words.concat(temp_array_word);
    };
    array_words = get_unique_and_sort(array_words)
    var i_word;
    var temp_output = "";
    for (i_word = 0; i_word < array_words.length; i_word++) {
        if (array_words[i_word].count > 1) {
            // process.stdout.write(array_words[i_word].name, array_words[i_word].count);
            temp_output = temp_output.concat(array_words[i_word].name);
            temp_output = temp_output.concat(": ");
            temp_output = temp_output.concat(array_words[i_word].count.toString());
            temp_output = temp_output.concat(";");
            //console.log(array_words[i_word].name, array_words[i_word].count);
        }
    }
    console.log("keyword count")
    console.log(temp_output);
    // temp_output.replace("; ", "; \br")
    var paragraphKeywords = document.getElementById("paragraphKeywords");
    paragraphKeywords.innerText = temp_output;
}


function addInfoContainer() {
    var containerSideBar = document.getElementsByClassName("gsc_rsb")[0];
    var containerInformation = document.createElement("div");
    containerInformation.id = "containerInformation";
    containerInformation.className = "gsc_rsb_s gsc_prf_pnl";
    containerSideBar.appendChild(containerInformation);

    var containerNames = document.createElement("div");
    containerNames.id = "containerNames";
    containerSideBar.appendChild(containerNames);

    var paragraphNames = document.createElement("p")
    paragraphNames.id = "paragraphNames"
<<<<<<< HEAD
    paragraphNames.className = "gsc_rsb_m_title"
=======
>>>>>>> 4ff8ed09bf65526a339fe93f4c7ae8d322b08e2e
    containerNames.appendChild(paragraphNames)

    var containerKeywaords = document.createElement("div");
    containerKeywaords.id = "containerKeywords";
    containerSideBar.appendChild(containerKeywaords);

    var paragraphKeywords = document.createElement("p");
    paragraphKeywords.id = "paragraphKeywords";
<<<<<<< HEAD
    paragraphKeywords.className = "gsc_rsb_m_title"
=======
>>>>>>> 4ff8ed09bf65526a339fe93f4c7ae8d322b08e2e
    containerKeywaords.appendChild(paragraphKeywords);

}

(function() {
    'use strict';
    // Print author name count
    addInfoContainer();

    get_coauthors_rate();
    // Pring word count

    get_word_rate();
    // document.onload = function() {
    var button_more_object = document.getElementById('gsc_bpf_more');

    button_more_object.addEventListener('click', function() {
        console.clear();
        setTimeout(() => { get_coauthors_rate(); }, 400);
        setTimeout(() => { get_word_rate(); }, 500);
    })

})();