

var container = document.getElementById('container');

var letters = {

    KeyA: {},
    KeyB: {},
    KeyC: {},
    KeyD: {},
    KeyE: {},
    KeyF: {},
    KeyG: {},
    KeyH: {},
    KeyI: {},
    KeyJ: {},
    KeyK: {},
    KeyL: {},
    KeyM: {},
    KeyN: {},
    KeyO: {},
    KeyP: {},
    KeyQ: {},
    KeyR: {},
    KeyS: {},
    KeyT: {},
    KeyU: {},
    KeyV: {},
    KeyW: {},
    KeyX: {},
    KeyY: {},
    KeyZ: {}

};

var kylie = "img/ky.png";

var kylie = [];
kylie[0] = "assets/img/ky.png";
kylie[1] = "assets/img/kim.png";
kylie[2] = "assets/img/cry.png";

//letters.KeyA.color = ''

document.addEventListener('keydown', function(event){

if (event.keyCode >= 65 && event.keyCode <= 95){

   var img = document.createElement('img');
   img.src = kylie[Math.floor(Math.random() * 3)];
   container.appendChild(img);

   //add capital class
   if (event.shiftKey == true) { 
      img.classList.add('capital');

   };


 //container.innerHTML += event.key;

	//console.log("key: " + event.key);
	//console.log("code: " + event.code);
	//
	//console.log("keyCode: " + event.keyCode);
	//
	//


//change the background color
//document.documentElement.style.backgroundColor = 
//letters[event.code].bgColor
//container.innerHTML += event.key;


//document.documentElement.style.backgroundColor = letters[event.code];

//container.innerHTML += event.key;


} 

});








