console.log('loaded main.js');

var w = 1920;
var h = 1440;

var stage;
var bg;
var content;
var bkgImg, bkgBmp;


window.addEventListener('resize', resize, false);

// PARA VERSION DESKTOP
window.addEventListener("mousemove", function(e) {
	if (e.screenY > 900) {
		content.y = -stage.canvas.height/2;
		this.console.log(stage.canvas.height + "," + h);
	}
	if (e.screenY < 200) {
		content.y = h/4;
		this.console.log(stage.canvas.height + "," + h);
	}
});


window.addEventListener('click', function(e) {
	if (e.clientY > screenTop/2+200) {
		content.y = -stage.canvas.height/2;
		if(e.clientX<200){
			cargaMovil();
		}
		else if(e.clientX>stage.canvas.width-200){
			this.console.log(e.clientX+" de "+stage.canvas.width);
			cargaLibreta();
		} 
	}
	if (e.clientY < stage.canvas.height/2+stage.canvas.height/4) {
		content.y = h/4;
		if(e.clientX>200&e.clientX<400){
			cargaMapa();
		}
	}
});

function init() {

	stage = new createjs.Stage("Canvas");
	canvas = document.getElementById("Canvas");
	canvas.addEventListener('click', fullscreen);	
	ctx = canvas.getContext("2d");
	ctx.translate(0.5,0.5);
	ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;
	createBackground();
	createContent();
	loadBkgImage();
	loadClickImage();
	
	//createjs.Ticker.addListener(this); //Al cambiar a createjs1.0 no va
	createjs.Ticker.addEventListener("tick", handleTick);
	
	//CARGA AUDIOS
	var assetsPath ="assets/audio/";
    sounds = [
     {src: 'El inspector (Tema de entrada).mp3', id: "1", loop:1},
     {src: 'Boiiing.mp3', id: "2", loop:-1}
    ];
    createjs.Sound.alternateExtensions = ["mp3"];	//mp3 //add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
	createjs.Sound.registerSounds(sounds,assetsPath);
	//finCARGAAUDIOS
}
function handleTick() {
	stage.update();
}

function fullscreen() {
	var el = document.documentElement,
		rfs = el.requestFullscreen
			|| el.webkitRequestFullScreen
			|| el.mozRequestFullScreen
			|| el.msRequestFullscreen;

	rfs.call(el);
	content.removeChild(clickBmp);
	canvas.removeEventListener('click', fullscreen);
}

function createBackground() {
	bg = new createjs.Shape();		
	stage.addChild(bg);
}

function createContent() {
	content = new createjs.Container();
	stage.addChild(content);
}

function loadClickImage() {
	clickImg = new Image();
	clickImg.src = "assets/click4x.png";
	clickImg.onload = function(e){
		clickBmp = new createjs.Bitmap(clickImg);
		content.addChild(clickBmp);
		resize();
	};
}

function loadBkgImage() {
	bkgImg = new Image();
	bkgImg.src = "assets/bkg4x.jpg";
	bkgImg.onload = function(e){
		bkgBmp = new createjs.Bitmap(bkgImg);
		content.addChild(bkgBmp);
	}
}

function tick() {
	stage.update();
	console.log("Tick actualizado")
}	

function resize() {
  	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;
	content.regX = w/2
	content.regY = h/2;
    content.scaleX = stage.canvas.width/w;
    content.scaleY = stage.canvas.height/h;
    content.x = stage.canvas.width/2;
    content.y = stage.canvas.height/2;
    console.log(stage.canvas.height + "," + h);
}
//----------------------------------
//FUNCIONES DE SONIDO
//----------------------------------
function soundLoaded(event) {
	console.log("Audios cargados");
	instanciaSonido = createjs.Sound.play(event.id);
}
function stop() {
	if(instanciaSonido){
		instanciaSonido.stop();
	}
}
function playSound(target) {	
// instanciaSonido=createjs.Sound.createInstance(target);
	//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
	if(instanciaSonido.playState==="playFinished"&instanciaSonido.playState!=="playSucceeded"){
		instanciaSonido=createjs.Sound.play(target);
	}
	else if(instanciaSonido.position<instanciaSonido.duration){
	instanciaSonido.stop();
	}			
}  
//----------------------------------
//Info de carga y errores
//----------------------------------
function onLoadError(event) {
    console.log("Error", event);
}

function onLoadComplete(event) {
    console.log("Complete", event);
}
//----------------------------------

