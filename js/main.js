console.log('loaded main.js');

var w = 1920;
var h = 1440;

var time = timeBackup = 90;
var loader;
var stage;
var content, hotspotsMC;
var bkg;
var lastPin = {};
var lastPath = {};
var previousLastPin = {};

var initCarPosition = 22;

var hotspotPaths = {
    20: {
        1: { x:520, y:644, distance: 6 }, 
        2: { x:530, y:680, distance: 6 }, 
        3: { x:525, y:665, distance: 8 }, 
        7: { x:530, y:765, distance: 5 }, 
        9: { x:526, y:914, distance: 2 }, 
        10: { x:528, y:870, distance: 3 }, 
        11: { x:530, y:765, distance: 7 }, 
        12: { x:525, y:765, distance: 8 }, 
        16: { x:560, y:1050, distance: 2 }, 
        17: { x:556, y:1052, distance: 7 }, 
        21: { x:550, y:1055, distance: 4 }, 
        22: { x:560, y:1050, distance: 5 }, 
        23: { x:565, y:1055, distance: 6 }
    },
    16: {
        20: { x:560, y:1050, distance: 2 },
        21: { x:700, y:1100, distance: 2 }
    },
    21: {
        16: { x:700, y:1100, distance: 2 },
        22: { x:800, y:1180, distance: 2 },
        23: { x:800, y:1140, distance: 4 },
        17: { x:800, y:1070, distance: 6 },
        24: { x:800, y:1175, distance: 6 },
        25: { x:800, y:1150, distance: 8 },
        18: { x:802, y:1085, distance: 9 },
        13: { x:800, y:1070, distance: 11 }
    },
    22: {
        18: { x:902, y:1085, distance: 9 },
        24: { x:904, y:1214, distance: 6 },
        25: { x:900, y:1150, distance: 8 },
        13: { x:915, y:975, distance: 8 },
        8: { x:914, y:830, distance: 8 },
        26: { x:900, y:1150, distance: 8 },
        23: { x:910, y:1130, distance: 8 },
        17: { x:915, y:1070, distance: 8 },
        11: { x:830, y:930, distance: 8 },
        12: { x:815, y:860, distance: 8 },
        19: { x:915, y:970, distance: 8 },
        27: { x:915, y:950, distance: 8 },
    }
};

var hotspots = [

    { x: 560, y:580 },
    { x: 810, y:600 },
    { x: 993, y:660 },
    { x: 1130, y:687 },
    { x: 1268, y:651 },
    { x: 1450, y:660 },
    { x: 762, y:710 },
    { x: 1130, y:780 },
    { x: 580, y:850 },
    { x: 642, y:815 }, //10

    { x: 810, y:885 },
    { x: 901, y:843 },
    { x: 1104, y:925 },
    { x: 1269, y:829 },
    { x: 1456, y:805 },
    { x: 695, y:1045 },
    { x: 940, y:1015 },
    { x: 1104, y:1038 },
    { x: 1280, y:965 },
    { x: 530, y:1016 }, //20

    { x: 784, y:1115 },
    { x: 900, y:1160 },
    { x: 924, y:1082 },
    { x: 1121, y:1168 },
    { x: 1130, y:1085 },
    { x: 1286, y:1215 },
    { x: 1346, y:1000 },
    { x: 1406, y:1149 },

];

var audiosLoaded=false;
var instanciaSonido;
var PlayerAtScreenView="Top"; //"Bottom"

window.addEventListener('resize', resize, false);

// PARA VERSION DESKTOP
window.addEventListener("mousemove", function(e) {
	if (e.screenY > 980) {
		content.y = -stage.canvas.height/2;
		PlayerAtScreenView="Bottom";
	}
	if (e.screenY < 200) {
		content.y = h/4;
		PlayerAtScreenView="Top";	
	}
});

window.addEventListener('click', function(e) {
	if ((e.clientY > stage.canvas.height-100) &PlayerAtScreenView=="Top") {
		content.y = -stage.canvas.height/2;
		PlayerAtScreenView="Bottom";
	}
	if (e.clientY < 100&PlayerAtScreenView=="Bottom") {
		content.y = h/4;
		PlayerAtScreenView="Top";
	}
	if(PlayerAtScreenView=="Bottom"){
		if(e.clientX<200&!mobileActive&!notebookActive){
		loadMobile();
		}
		else if(e.clientX>stage.canvas.width-200&!notebookActive&!mobileActive){
		loadNotebook();
		} 
	}
	if(PlayerAtScreenView=="Top"){
		if(e.clientX>200 & e.clientX<400){
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
	
	//MAPS
	miniCar = new createjs.Bitmap(loader.getResult('car'));
    miniCar.scaleX = miniCar.scaleY = .33;
    miniCar.regX = miniCar.image.width;

    timeBox = new createjs.Container();
    timeBox.txt = new createjs.Text(time + ' ' + _t.minutes);
    timeBox.txt.font = '48px Commodore64P';
    timeBox.txt.color = '#FFF';
    timeBox.txt.textAlign = 'right';
    timeBox.x = stage.canvas.width - 40;
    timeBox.y = 40;

    textBox = new createjs.Container();
    textBox.mouseEnabled = false;
    textBox.mouseChildren = false;
    textBox.bkg = new createjs.Bitmap(loader.getResult('textBox'));

    textBox.picture = new createjs.Bitmap(loader.getResult('sketch24'));
    textBox.picture.x = 60;
    textBox.picture.y = 430;
    textBox.bkg.alpha = 0.6;
    textBox.x = 316;
    textBox.y = 523;
    textBox.visible = false;
    textBox.titleTxt = new createjs.Text('');
    textBox.titleTxt.font = '24px Verdana';
    textBox.titleTxt.color = '#FFF';
    textBox.titleTxt.x = 35;
    textBox.titleTxt.y = 25;
    //textBox.titleTxt.maxWidth = stage.canvas.width;
    textBox.titleTxt.lineWidth = 600;

    alert = new createjs.Container();
    alert.bkg = new createjs.Bitmap(loader.getResult('alert'));
    alert.x = 319;
    alert.y = 523;
    alert.visible = false;
    alert.txt = new createjs.Text('');
    alert.txt.font = '24px Commodore64P';
    alert.txt.color = '#000';
    alert.txt.x = 360;
    alert.txt.y = 280;
    alert.txt.lineWidth = 500;


    alert.btnOK = new createjs.Container();
    alert.btnOK.bkg = new createjs.Bitmap(loader.getResult('alertBtn'));
    alert.btnOK.x = 430;
    alert.btnOK.y = 440;
    alert.btnOK.txt = new createjs.Text('OK');
    alert.btnOK.txt.font = '24px Commodore64P';
    alert.btnOK.txt.color = '#000';
    alert.btnOK.txt.textAlign = 'center';
    alert.btnOK.txt.x = 86;
    alert.btnOK.txt.y = 25;
    alert.btnOK.cursor = 'pointer';

    alert.btnKO = new createjs.Container();
    alert.btnKO.bkg = new createjs.Bitmap(loader.getResult('alertBtn'));
    alert.btnKO.x = 670;
    alert.btnKO.y = 440;
    alert.btnKO.txt = new createjs.Text('Cancel');
    alert.btnKO.txt.font = '24px Commodore64P';
    alert.btnKO.txt.color = '#000';
    alert.btnKO.txt.textAlign = 'center';
    alert.btnKO.txt.x = 86;
    alert.btnKO.txt.y = 25;
    alert.btnKO.cursor = 'pointer';

    alert.btnOK.addEventListener('click', function(e) {
        alert.visible = false;
        textBox.visible = false;
        moveCar(timeToGo);
    });
    alert.btnKO.addEventListener('click', function(e) {
        alert.visible = false;
        textBox.visible = false;
    });

    alert2 = new createjs.Container();
    alert2.bkg = new createjs.Bitmap(loader.getResult('alert2'));
    alert2.car = new createjs.Bitmap(loader.getResult('car'));
    alert2.car.x = alert2.car.oldX = 270;
    alert2.car.y = 610;
    alert2.car.regX = alert2.car.image.width/2 - 30;
    alert2.x = 319;
    alert2.y = 523;
    alert2.visible = false;

    dialog = new createjs.Container();
    dialog.bkg = new createjs.Bitmap(loader.getResult('dialog'));
    dialog.x = 30;
    dialog.y = stage.canvas.height - 740;
    dialog.bkg.alpha = 0.7
    dialog.txt = new createjs.Text('');
    dialog.txt.font = '20px Commodore64P';
    dialog.txt.color = '#FFF';
    dialog.txt.x = 30;
    dialog.txt.y = 25;
    dialog.txt.lineWidth = 1100;

    dialog.txtOK = new createjs.Text('');
    dialog.txtOK.font = '26px Commodore64P';
    dialog.txtOK.color = '#FFF';
    dialog.txtOK.textAlign = 'center';
    dialog.txtOK.x = 250;
    dialog.txtOK.y = 280;
    dialog.txtOK.addEventListener('mouseover', function(e) {
        e.currentTarget.color = '#FFFF00';
    });
    dialog.txtOK.addEventListener('mouseout', function(e) {
        e.currentTarget.color = '#FFF';
    });
    dialog.txtOK.addEventListener('click', function(e) {
        dialog.visible = false;
    });

    dialog.txtKO = new createjs.Text('');
    dialog.txtKO.font = '26px Commodore64P';
    dialog.txtKO.color = '#FFF';
    dialog.txtKO.textAlign = 'center';
    dialog.txtKO.cursor = 'pointer';
    dialog.txtKO.x = 850;
    dialog.txtKO.y = 280;
    dialog.txtKO.addEventListener('mouseover', function(e) {
        e.currentTarget.color = '#FFFF00';
    });
    dialog.txtKO.addEventListener('mouseout', function(e) {
        e.currentTarget.color = '#FFF';
    });
    dialog.txtKO.addEventListener('click', function(e) {
        dialog.visible = false;
    });

    dialog.cursor = 'pointer';
	dialog.visible = false;
	//FIN MAPS

	content.addChild(bkg);

	loadHotspots();
	loadHotspotPaths();

	content.addChild(miniCar);
	content.addChild(textBox);
    content.addChild(alert);
    content.addChild(alert2);
    alert.addChild(alert.bkg);
    alert.addChild(alert.txt);
    alert.addChild(alert.btnOK);
    alert.btnOK.addChild(alert.btnOK.bkg);
    alert.btnOK.addChild(alert.btnOK.txt);
    alert.addChild(alert.btnKO);
    alert.btnKO.addChild(alert.btnKO.bkg);
    alert.btnKO.addChild(alert.btnKO.txt);
    alert2.addChild(alert2.bkg);
    alert2.addChild(alert2.car);
    textBox.addChild(textBox.bkg);
    textBox.addChild(textBox.picture);
    textBox.addChild(textBox.titleTxt);

    content.addChild(timeBox);
    timeBox.addChild(timeBox.txt);
    stage.addChild(dialog);
    dialog.addChild(dialog.bkg);
    dialog.addChild(dialog.txt);
    dialog.addChild(dialog.txtOK);
    dialog.addChild(dialog.txtKO);

	//loadClickImage();
	content.addChild(click);
	
	resize();
	loadAudio();

	
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", handleTick);
	
}
function updateTime(t) {
    time = t;
    timeBox.txt.text = time + ' ' + _t.minutes;
}
//----------------------------------
// TICKER FUNCTIONS
//----------------------------------
function handleTick() {
	stage.update();
	//console.log("TICK HANDLED");
}
function tick() {
    stage.update();
    console.log('Tick actualizado')
}

//----------------------------------
// BEGIN FUNCTIONS
//----------------------------------
function loadImages() {
    manifest = [
		{src: 'alert.png', id: 'alert'},
        {src: 'alert2.png', id: 'alert2'},
        {src: 'white-btn.png', id: 'alertBtn'},
		{src: 'car.png', id: 'car'},
		
        {src: 'bkg4x.jpg', id: 'bkg'},
        {src: 'click4x.png', id: 'click'},
		{src: 'dialog.png', id: 'dialog'},

		{src: 'text-box.png', id: 'textBox'},
        {src: 'red-pin.png', id: 'idlePin'},
        {src: 'blue-pin.png', id: 'overOKPin'},
        {src: 'black-pin.png', id: 'overKOPin'},
        {src: 'gold-pin.png', id: 'selectedPin'},
        {src: 'gray-ball.png', id: 'greyBall'},
        {src: 'black-ball.png', id: 'blackBall'},
		{src: 'green-ball.png', id: 'greenBall'},
		
		{src: 'sketch-24.png', id: 'sketch24'},
        {src: 'sketch-16.png', id: 'sketch16'},

		{src: 'audioButton.png', id: 'audioBt'},
		{src: 'Movil_contactos.png', id: 'bgMobile'},
		{src: 'cerrar.jpg', id: 'closeBt'},
		{src: 'movil_investigar.png', id: 'mobileDecide'},
		{src: 'bgNotebook.jpg', id: 'bgNotebook'},

		{src: 'contacto1.png', id: 'contact1'},
		{src: 'contacto2.png', id: 'contact2'},
		{src: 'contacto3.png', id: 'contact3'},
		{src: 'contacto4.png', id: 'contact4'},
		{src: 'contacto5.png', id: 'contact5'},
		{src: 'contacto6.png', id: 'contact6'},
		{src: 'contacto7.png', id: 'contact7'},
		{src: 'contacto8.png', id: 'contact8'},
		{src:'green-up-arrow.png',id:'prev'},
		{src: 'llamada.jpg', id: 'callBt'},
		{src:'borraContact.jpg',id:'deleteBt'}

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
	if(stage){
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
}
//----------------------------------
// MAP FUNCTIONS
//----------------------------------
function moveCar(timeLeft) {
    if (alert2.visible == false) {
        alert2.visible = true;
        moveCarRun = setInterval(function(){ alert2.car.x+= (5 * alert2.car.direction)}, 200);
        moveCarReset = setInterval(function(){ alert2.car.x = alert2.car.oldX }, 1000);

        if (lastPin.x > previousLastPin.x) {
            alert2.car.scaleX = Math.abs(alert2.car.scaleX);
            miniCar.scaleX = Math.abs(miniCar.scaleX);
            alert2.car.direction = 1;
        } else {
            alert2.car.scaleX = -Math.abs(alert2.car.scaleX);
            miniCar.scaleX = -Math.abs(miniCar.scaleX);
            alert2.car.direction = -1;
        }
    }

    if (timeLeft > 0) {
        timeLeft --;
        setTimeout(function() { 
            updateTime(--time);
            moveCar(timeLeft);
        }, 2000);
    } else {
        alert2.visible = false;

        miniCar.x = lastPin.x+10;
        miniCar.y = lastPin.y+54;

        if (lastPath.img) {
            lastPath.img.visible = false;
        }
        lastPin.image = loader.getResult('selectedPin');
        lastPin.blocked = true;
        lastPin.mouseEnabled = false;
        previousLastPin.image = loader.getResult('idlePin');
        previousLastPin.blocked = false;
        previousLastPin.mouseEnabled = true;
        previousLastPin = lastPin;
        clearInterval(moveCarRun);
        clearInterval(moveCarReset);

        dialog.txt.text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        dialog.txtOK.text = "Ok. Allé voy";
        dialog.txtKO.text = "What????";
        dialog.visible = true;
    }


}
function loadHotspotPaths() {
    for (i in hotspotPaths) {
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
			hp.bmp = new createjs.Bitmap(loader.getResult('idlePin'));
			if (i == initCarPosition-1) {
				lastPin = previousLastPin = hp.bmp;
				hp.bmp.image = loader.getResult('selectedPin');
				hp.bmp.blocked = true;
				hp.bmp.mouseEnabled = false;  
				miniCar.x = hp.x+10;
				miniCar.y = hp.y+54;
				//moveCar(0);
			}
			hp.bmp.id = i+1;
			hp.bmp.mouseChildren = false;
			hp.bmp.cursor = 'pointer';
			hp.bmp.x = hp.x;
			hp.bmp.y = hp.y;
			hp.bmp.title = '#'+ hp.bmp.id + 
				' - ' + _t.hotspots[hp.bmp.id].title
				+ '\n\n' + _t.hotspots[hp.bmp.id].text; 
	
			hp.bmp.addEventListener('mouseover', function(e) {
				if (hotspotPaths[lastPin.id])
					var hpTarget = hotspotPaths[lastPin.id][e.currentTarget.id];
	
				if (hpTarget && hpTarget.distance) {
					textBox.titleTxt.text = e.currentTarget.title + 
						'\n\n\n' + _t.distance +': ' + 
						hpTarget.distance +
						' ' + _t.minutes;
				} else {
					 textBox.titleTxt.text = e.currentTarget.title + 
						'\n\n\n' + _t.distance +':  ' + _t.toofar;               
				}
	
				var image = loader.getResult('sketch'+e.currentTarget.id);
				if(image) textBox.picture.image = image;
	
				textBox.visible = true;
				if (!hpTarget || !hpTarget.distance || hpTarget.distance > 8) {
					e.currentTarget.image = loader.getResult('overKOPin');
				} else {
					e.currentTarget.image = loader.getResult('overOKPin');
				}
				e.currentTarget.image.cursor = 'pointer';
				stage.cursor = 'pointer';
				if (hpTarget) hpTarget.img.visible = true;
			});
	
			hp.bmp.addEventListener('mouseout', function(e) {
				console.log(lastPin, e.currentTarget);
				if (lastPin.id != e.currentTarget.id) {
					if (hotspotPaths[lastPin.id])
						var hpTarget = hotspotPaths[lastPin.id][e.currentTarget.id];
					textBox.visible = false;
					stage.cursor = 'default';
					if (!e.currentTarget.pulsado) e.currentTarget.image = loader.getResult('idlePin');
					if (hpTarget) hpTarget.img.visible = false;
				}
	
			});
	
			hp.bmp.addEventListener('click', function(e) {
				lastPath = hotspotPaths[lastPin.id][e.currentTarget.id];
				if (!e.currentTarget.blocked) {
					if (!lastPath || !lastPath.distance || lastPath.distance > 8) {
						alert('Está demasiado lejos');
					} else {
						timeToGo = lastPath.distance;
						alert.txt.text = "Llegar a...\n\n\"" + 
							_t.hotspots[e.currentTarget.id].title + 
							"\"\n\n...nos llevará " + 
							lastPath.distance + 
							' ' + _t.minutes;
	
						alert.visible = true;
					}
				}
	
				if (!lastPin.blocked) {
					lastPin.pulsado = false;
					lastPin.image = loader.getResult('idlePin');
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
        id: 'tema1',
        loop: -1
    }, {
        src: 'Boiiing.mp3',
        id: 'efecto1',
        loop: -1
	},
	{
        src: 'borraDisparo.mp3',
        id: 'efecto2',
        loop: -1
    }];
    createjs.Sound.alternateExtensions = ['mp3']; //mp3 //add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener('fileload', createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
    createjs.Sound.registerSounds(sounds, assetsPath);
}
function soundLoaded(event) {
	console.log("LOADED AUDIO FILES");
	audiosLoaded=true;
	instanciaSonido = createjs.Sound.createInstance(event.id);
}
function stop() {
	if(instanciaSonido){
		instanciaSonido.stop();
	}
}
function playSound(target) {	
	if(!instanciaSonido){
		 instanciaSonido=createjs.Sound.createInstance(target);
	}
	//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
	if(audiosLoaded){
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