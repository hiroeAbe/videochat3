(function () {
  'use strict';


  var src = null;
  var audioctx = new AudioContext();
  var buffer = null;

  const LoadSample = (ctx, url) => {
    fetch(url).then( response => {
      return response.arrayBuffer();
    }).then( arrayBuffer => {
      ctx.decodeAudioData(arrayBuffer, (b) => {buffer=b;}, () => {});
      document.querySelector("button#okan").removeAttribute("disabled");
    });
  }
  LoadSample(audioctx, "./okantest.mp3");

document.querySelector("button#okan").addEventListener("click", (event) =>{
    var label;
      src = audioctx.createBufferSource();
      src.buffer = buffer;
      src.loop = false;
      src.connect(audioctx.destination);
      src.start(0);
      label = "Okan";
    event.target.innerHTML=label;
  });
})();
