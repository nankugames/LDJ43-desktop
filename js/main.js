
var w = 1920;
var h = 1440;

var stage;
var bg;
var content
var bkgImg, bkgBmp;

window.addEventListener('resize', resize, false);
window.addEventListener("mousemove", function(e) {
	if (e.screenY > 900) {
		content.y = -640;
	}
	if (e.screenY < 100) {
		content.y = h/4;
	}
});

function init() {

	stage = new createjs.Stage("demoCanvas");
	canvas = document.getElementById("demoCanvas");
	canvas.addEventListener('click', fullscreen);	
	ctx = canvas.getContext("2d");
	ctx.translate(0.5,0.5);
	ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;
	createBackground();
	createContent();
	loadBkgImage();
	loadClickImage();
	
	createjs.Ticker.addListener(this);

	resize();
}

function fullscreen() {
	var el = document.documentElement,
		rfs = el.requestFullscreen
			|| el.webkitRequestFullScreen
			|| el.mozRequestFullScreen
			|| el.msRequestFullscreen;

	rfs.call(el);
	content.removeChild(clickBmp);
}

function createBackground() {
	bg = new createjs.Shape();		
	stage.addChild(bg);
}

function createContent() {
	content = new createjs.Container();
	content.regX = w/2
	content.regY = h/2;
    content.x = 1344/2;
    content.y = h/4;
    content.scaleX = content.scaleY = 1344/w;
	stage.addChild(content);
}

function loadClickImage() {
	clickImg = new Image();
	clickImg.src = "assets/click4x.png";
	clickImg.onload = function(e){
		clickBmp = new createjs.Bitmap(clickImg);
		content.addChild(clickBmp);
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
	console.log()
}	

function resize() {
  	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;
}

