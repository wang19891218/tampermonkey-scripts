// ==UserScript==
// @name         Google Scholar sci-hub assistant
// @namespace    wang19891218
// @version      0.1
// @description  Save some time with sci-hub
// @author       coco
// @include      https://www.sciencedirect.com/*
// @grant        none
// ==/UserScript==

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
  newDiv.style.bottom = '2px'
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