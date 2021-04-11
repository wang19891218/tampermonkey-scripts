// ==UserScript==
// @name         Google scholar sci-hub popup 
// @namespace    wang19891218
// @version      0.42
// @description  Save some time with sci-hub
// @author       coco
// @include      https://ascelibrary.org/doi/pdf*
// @include      https://aip.scitation.org/doi/abs/*
// @include      https://journals.aps.org/pre/abstract/*
// @include      https://journals.sagepub.com/doi/abs/*
// @include      https://link.springer.com/article/*
// @include      https://link.springer.com/chapter/*
// @include      https://onlinelibrary.wiley.com/doi/epdf/*
// @include      https://www.sciencedirect.com/*
// @include      https://www.tandfonline.com/doi/abs/*


// @grant        none
// ==/UserScript==

// Immediately-invoked function expression
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;
        // Use $ here...
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

function addSciHubElement () {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newIframe = document.createElement('iframe');
  console.log(window.innerWidth)
  console.log(window.innerWidth / 2)
  newDiv.style.zIndex= 20;
  newDiv.style.width = "400px"
  newDiv.style.height = "600px"
  newDiv.style.position = "absolute";
  newDiv.style.bottom = ($(window).height() - 4).toString + 'px'
  newDiv.style.right = '2px'
  // newIframe.style
  newIframe.style.width= '100%'
  newIframe.style.height= '100%'
  newIframe.src = 'https://sci-hub.st/' + window.location.href
  // add the text node to the newly created div
  newDiv.appendChild(newIframe);
  document.body.appendChild(newDiv);
  console.log(newIframe.src)
  console.log(newIframe)
}

addSciHubElement()
