function getUuid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
         var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
         return v.toString(16);
     });
   }
   var deviceId = getUuid();
   if ('requestWakeLock' in navigator) {
     var lock = navigator.requestWakeLock('screen');
     window.addEventListener('visibilitychange', function() {
       if (document.hidden) {
         lock.unlock();
       }
       else {
         lock = navigator.requestWakeLock('screen');
       }
     });
   }
   var counter = 0; // gets upped every time we activate the sensor
   var wsOpen = false;
   var ws;
   function connect() {
     ws = new WebSocket('ws://192.168.43.189:8322');
     ws.onopen = () => {
       wsOpen = true;
     };
     ws.onclose = () => {
       wsOpen = false;
       connect();
     };
   }
   connect();
   var odm = function(e) {
     // Keon logic here, for some reason stable Z is 18
     var z = Math.abs(e.accelerationIncludingGravity.z);
     if (z > 10 && z < 25) {
       // stable
       document.body.style.backgroundColor = 'gray';
     }
     else if (z < 10) {
       // free fall
       document.body.style.backgroundColor = 'red';
     }
     else {
       // goes up
       document.body.style.backgroundColor = 'green';
     }
     document.querySelector('h1').textContent = e.accelerationIncludingGravity.z | 0;
     console.log(e.accelerationIncludingGravity.z, +new Date());
     // return;
     if (wsOpen) {
       ws.send(JSON.stringify({
         type: 'devicemotion',
         deviceId: deviceId + counter,
         x: e.accelerationIncludingGravity.x,
         y: e.accelerationIncludingGravity.y,
         z: e.accelerationIncludingGravity.z
       }));
     }
   };

    var active = false;
    document.querySelector('button').oncontextmenu = function() {
      counter++;
      if (active) {
        window.removeEventListener('devicemotion', odm);
      }
      else {
        window.addEventListener('devicemotion', odm);
      }
      active = !active;
    };
