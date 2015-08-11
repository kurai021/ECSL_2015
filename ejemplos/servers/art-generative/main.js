function setup() {

  createCanvas( windowWidth, windowHeight );

  var devices = {};

  var ws = new WebSocket('ws://' + location.hostname + ':8322');

  a = Synth({ maxVoices:4, waveform:'PWM', attack:ms(1), decay:ms(1000) })

  background(000);
  // hue, saturation, and brightness
  colorMode(HSB, 255);

  ws.onmessage = function(e){
    console.log("recibiendo señal...");
    var data = e.data;

    if (typeof data === 'string') data = JSON.parse(data);
    if (data && data.type === 'devicemotion'){
      if (!devices[data.deviceId]) {

        a.note.seq( Math.round(data.x), 1/2 )

        r = Reverb({ roomSize: Add( data.x * 0.1, Sine( .05, .245 )._ ) })

        stroke(data.x * 25, 255, 255);
        fill(data.x * 25, 255, 255, 127);
        ellipse(data.x * 100, data.y * 50, 50, 50);
      }
    }
  }
}
