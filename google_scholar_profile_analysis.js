// ==UserScript==
// @name         Google scholar profile analysis
// @namespace    http://tampermonkey.net/
// @version      0.1
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
        array_authors.push({'name':array_keys[i_author], 'count': counts[array_keys[i_author]]})
    }

    // Sort
    array_authors.sort(function(a, b) {return - a.count + b.count});
    return array_authors
}


(function() {
    'use strict';

    var list_divs = document.getElementsByClassName('gsc_a_tr');
    var i_paper;
    var array_authors = [];
    for (i_paper = 0; i_paper < list_divs.length; i_paper++) {
        var temp_array_author = list_divs[i_paper].children[0].getElementsByClassName('gs_gray')[0].textContent.split(", ");
        array_authors = array_authors.concat(temp_array_author);
    };
    // console.log(array_authors);
    array_authors = get_unique_and_sort(array_authors)
    var i_author;
    for (i_author = 0; i_author < array_authors.length; i_author++){
        console.log(array_authors[i_author]);
    }
    // sort_count(get_unique(array_authors))
})();
