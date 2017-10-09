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
      document.querySelector("button#hotaru").removeAttribute("disabled");
    });
  }
  LoadSample(audioctx, "./hotarunohikari.mp3");

document.querySelector("button#hotaru").addEventListener("click", (event) =>{
    var label;
    if(event.target.innerHTML=="Stop") {
      src.stop(0);
      label="Hotaru";
    } else {
      src = audioctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      src.connect(audioctx.destination);
      src.start(0);
      label="Stop";
    }
    event.target.innerHTML=label;
  });
})();
