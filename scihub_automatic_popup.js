function addElement () { 
  // create a new div element
  const newDiv = document.createElement("div"); 
  
  // and give it some content
  const newIframe = document.createElement('iframe'); 
  newIframe.style.width = window.innnerWidth // 2;
  newIframe.style.height = window.innerHeight // 2;
  newIframe.style.position = "absolut";
  newIframe.style.top = "10px";
  newIframe.src = 'sci-hub.st/' + window.location.href
  // add the text node to the newly created div
  newDiv.appendChild(newIframe);
  document.body.appendChild(newDiv);
  console.log(newIframe.src)
  console.log(newIframe)
}
