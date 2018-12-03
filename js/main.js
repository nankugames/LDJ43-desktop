console.log('loaded main.js');

var w = 1920;
var h = 1440;

var loader;
var stage;
var bg;
var content, hotspotsMC;
var bkg;
var lastPin = {};

var hotspotPaths = {
    20: {
        1: { x:520, y:644 }, 
        2: { x:530, y:680 }, 
        3: { x:525, y:665 }, 
        7: { x:530, y:765 }, 
        9: { x:526, y:914 }, 
        10: { x:528, y:870 }, 
        11: { x:530, y:765 }, 
        12: { x:525, y:765 }, 
        16: { x:560, y:1050 }, 
        17: { x:556, y:1052 }, 
        21: { x:550, y:1055 }, 
        22: { x:560, y:1050 }, 
        23: { x:565, y:1055 }
    }
};
var hotspots = [

    { x: 560, y:580, title: '#1\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 810, y:600, title: '#2\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 993, y:660, title: '#3\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1130, y:687, title: '#4\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1268, y:651, title: '#5\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1450, y:660, title: '#6\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

    { x: 762, y:710, title: '#7\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1130, y:780, title: '#8\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 580, y:850, title: '#9\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 642, y:815, title: '#10\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

    { x: 810, y:885, title: '#11\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 901, y:843, title: '#12\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1104, y:925, title: '#13\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1269, y:829, title: '#14\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

    { x: 1456, y:805, title: '#15\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 695, y:1045, title: '#16\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

    { x: 940, y:1015, title: '#17\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1104, y:1038, title: '#18\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1280, y:965, title: '#19\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 530, y:1016, title: '#20\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

    { x: 784, y:1115, title: '#21\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

    { x: 900, y:1160, title: '#22\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 924, y:1082, title: '#23\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1121, y:1168, title: '#24\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1130, y:1085, title: '#25\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1286, y:1215, title: '#26\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1346, y:1000, title: '#27\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},
    { x: 1406, y:1149, title: '#28\n\nMadison 5 Square Garden\n\n\nDistance: 4 minutes'},

];



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
			loadMobile();
		}
		else if(e.clientX>stage.canvas.width-200){
			loadNotebook();
		} 
	}
	if (e.clientY < stage.canvas.height/2+stage.canvas.height/4) {
		content.y = h/4;
		if(e.clientX>200&e.clientX<400){
			loadMap();
		}
	}
});

function init() {

	stage = new createjs.Stage("mainCanvas");
	stage.enableMouseOver(60);

	canvas = document.getElementById("mainCanvas");
	canvas.addEventListener('click', fullscreen);

	ctx = canvas.getContext("2d");
	ctx.translate(0.5,0.5);
	ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;

	content = new createjs.Container();
	stage.addChild(content);

	bkg = new createjs.Bitmap(loader.getResult('bkg'));
	click = new createjs.Bitmap(loader.getResult('click'));
	
	//Caja Mapa
	cajaTop = new createjs.Container();
    cajaTop.mouseEnabled = false;
    cajaTop.bmp = new createjs.Bitmap(loader.getResult('cajaTop'));
    cajaTop.x = 340;
    cajaTop.y = 540;
    cajaTop.visible = false;
    cajaTop.titleTxt = new createjs.Text('It\'s my title');
    cajaTop.titleTxt.font = '32px Commodore';
    cajaTop.titleTxt.color = '#FFF';
    cajaTop.titleTxt.x = 35;
    cajaTop.titleTxt.y = 15;
    cajaTop.titleTxt.maxWidth = stage.canvas.width;
	
	//createBackground();
	//createContent();
	//loadBkgImage();
	content.addChild(bkg);

	loadHotspots();
	loadHotspotPaths();
	
	content.addChild(cajaTop);
    cajaTop.addChild(cajaTop.bmp);
	cajaTop.addChild(cajaTop.titleTxt);

	//loadClickImage();
	content.addChild(click);
	
	resize();
	loadAudio();

	//createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    //createjs.Ticker.framerate = 30; 
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", handleTick);
	
}
//----------------------------------
// TICKER FUNCTIONS
//----------------------------------
function handleTick() {
	stage.update();
	console.log("TICK HANDLED");
}
/*function tick() {
	stage.update();
	console.log("TICK UPDATE");
}	*/
//----------------------------------
// BEGIN FUNCTIONS
//----------------------------------
function loadImages() {
    manifest = [
        {src: 'bkg4x.jpg', id: 'bkg'},
        {src: 'click4x.png', id: 'click'},
        {src: 'caja-top.png', id: 'cajaTop'},
        {src: 'red-pin.png', id: 'redPin'},
        {src: 'gold-pin.png', id: 'goldPin'},
        {src: 'blue-pin.png', id: 'bluePin'},
        {src: 'gray-ball.png', id: 'greyBall'},
        {src: 'black-ball.png', id: 'blackBall'},
		{src: 'green-ball.png', id: 'greenBall'},
		{src: 'audioButton.png', id: 'audioBt'},
		{src: 'movil.png', id: 'bgMobile'}
    ];

    for (i=20;i<=20;i++) {
        for(j in hotspotPaths[i]) {
            manifest.push({ src: i + '-' + j + '.png', id: i + '-' + j });
        }
    }

    console.log(manifest);

    loader = new createjs.LoadQueue(false);
    loader.addEventListener('complete', init);
    loader.loadManifest(manifest, true, 'assets/');
}

function fullscreen() {
	var el = document.documentElement,
		rfs = el.requestFullscreen
			|| el.webkitRequestFullScreen
			|| el.mozRequestFullScreen
			|| el.msRequestFullscreen;

	rfs.call(el);
	content.removeChild(click);
	canvas.removeEventListener('click', fullscreen);
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
// MAP FUNCTIONS
//----------------------------------
function loadHotspotPaths() {
    for (i=20;i<=20;i++) {
        for(j in hotspotPaths[i]) {
            hotspotPaths[i][j].img = new createjs.Bitmap(loader.getResult(i + '-' + j));
            hotspotPaths[i][j].img.x = hotspotPaths[i][j].x;
            hotspotPaths[i][j].img.y = hotspotPaths[i][j].y;
            hotspotPaths[i][j].img.visible = false;
            content.addChild(hotspotPaths[i][j].img);

        }
    }
    
}

function loadHotspots() {
    hotspotsMC = new createjs.Container();
    stage.addChild(hotspotsMC);

    for (i=0; i<hotspots.length;i++) {
        var hp = hotspots[i];
        //hp.bmp = new createjs.Bitmap(loader.getResult('greyBall'));
        hp.bmp = new createjs.Bitmap(loader.getResult('redPin'));
        if (i==19) {
            lastPin = hp.bmp;
            hp.bmp.image = loader.getResult('goldPin');
            hp.bmp.blocked = true;
            hp.bmp.mouseEnabled = false;
        }
        hp.bmp.id = i+1;
        hp.bmp.mouseChildren = false;
        hp.bmp.cursor = 'pointer';
        hp.bmp.x = hp.x;
        hp.bmp.y = hp.y;
        hp.bmp.title = hp.title;

        hp.bmp.addEventListener('mouseover', function(e) {
            console.log('title: '+e.currentTarget.title + ' ' + lastPin.id + '-' + e.currentTarget.id);
            cajaTop.titleTxt.text = e.currentTarget.title;
            cajaTop.visible = true;
            e.currentTarget.image = loader.getResult('bluePin');
            stage.cursor = 'pointer';
            hotspotPaths[lastPin.id][e.currentTarget.id].img.visible = true;
        });
        hp.bmp.addEventListener('mouseout', function(e) {
            cajaTop.visible = false;
            stage.cursor = 'default';
            if (!e.currentTarget.pulsado) e.currentTarget.image = loader.getResult('redPin');
            hotspotPaths[lastPin.id][e.currentTarget.id].img.visible = false;
        });

        hp.bmp.addEventListener('click', function(e) {
            if (!lastPin.blocked) {
                lastPin.pulsado = false;
                lastPin.image = loader.getResult('redPin');
            }
            lastPin = e.currentTarget;
            lastPin.pulsado = true; 
        });

        content.addChild(hp.bmp);
    }
}

//----------------------------------
// SOUND FUNCTIONS
//----------------------------------
function loadAudio() {
	var assetsPath = 'assets/audio/';
    sounds = [{
        src: 'El inspector (Tema de entrada).mp3',
        id: '1',
        loop: 1
    }, {
        src: 'Boiiing.mp3',
        id: '2',
        loop: -1
    }];
    createjs.Sound.alternateExtensions = ['mp3']; //mp3 //add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener('fileload', createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
    createjs.Sound.registerSounds(sounds, assetsPath);
}
function soundLoaded(event) {
	console.log("LOADED AUDIO FILES");
	instanciaSonido = createjs.Sound.play(event.id);
}
function stop() {
	if(instanciaSonido){
		instanciaSonido.stop();
	}
}
function playSound(target) {	
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


//----------------------------------
// FUNCTIONS UNUSED
//----------------------------------
/*function createBackground() {
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
}*/