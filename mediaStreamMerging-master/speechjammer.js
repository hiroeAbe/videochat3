
$(function(){
  //audioCtx = new AudioContext();
  console.log("audioCtx init");

});

var SpeechJammer = {
  FREQ_MUL: 7000,
  QUAL_MUL: 30,
};


SpeechJammer.setupSJ = function(audioStream) {
  // WebAudio API 関係の初期化
  console.log("sj setup");
  var audioCtx = new AudioContext();;
  var input = audioCtx.createGain();
  var delay = audioCtx.createDelay();
  var wetgain = audioCtx.createGain();
  var drygain = audioCtx.createGain();
  var feedback = audioCtx.createGain();
  //this.output = audioCtx.destination();

  //var bypass = document.getElementById("bypass").checked;
  //delay.delayTime.value = parseFloat(document.getElementById("time").value);
  //feedback.gain.value = parseFloat(document.getElementById("feedback").value);
  //var mix = parseFloat(document.getElementById("mix").value);
  this.mic = audioCtx.createMediaStreamSource(audioStream);
  this.mic.connect(input);

  input.connect(delay);
  input.connect(drygain);
  delay.connect(wetgain);
  delay.connect(feedback);
  feedback.connect(delay);
  wetgain.connect(audioCtx.destination);
  drygain.connect(audioCtx.destination);

  //if(bypass) mix = 0;
  //  wetgain.gain.value = mix;
  //  drygain.gain.value = 1 - mix;

    const Setup = () => {
      var bypass = document.getElementById("speechjammer").checked;
      delay.delayTime.value = 0.28;
      feedback.gain.value = 0.3;
      var mix = parseFloat(document.getElementById("mix").value);
      if(bypass == false) mix = 0;
        wetgain.gain.value = mix;
        drygain.gain.value = 1 - mix;
    }
  document.querySelector("input#speechjammer").addEventListener("change", Setup);
  document.querySelector("input#time").addEventListener("change", Setup);
  document.querySelector("input#feedback").addEventListener("change", Setup);
  document.querySelector("input#mix").addEventListener("change", Setup);

  Setup();
}
