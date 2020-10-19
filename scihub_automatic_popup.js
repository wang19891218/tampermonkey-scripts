
function addElement () { 
  // create a new div element
  const newDiv = document.createElement("div"); 
  
  // and give it some content
  const newIframe = document.createElement('iframe'); 
  newIframe.src = 'sci-hub.st' + window.location.href
  // add the text node to the newly created div
  newDiv.appendChild(newIframe);  

  doc
