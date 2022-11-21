// ==UserScript==
// @name         Data Depot Search Enhancement
// @namespace    wang19891218
// @version      0.2
// @description  Make it look better
// @author       coco
// @updateURL    https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/data_deport_search.user.js
// @downloadURL  https://github.com/wang19891218/tampermonkey-scripts/raw/master/google_scholar/data_deport_search.user.js
// @match        https://www.designsafe-ci.org/data/browser/public/?query_string*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=designsafe-ci.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.getElementsByClassName("ds-table-display-wrapper ng-isolate-scope")[0].style["height"] = "auto"
    document.getElementsByClassName("ds-table-display-wrapper ng-isolate-scope")[0].style["overflow"] = "hidden"
})();
