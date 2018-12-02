var w = 1920;
var h = 1440;

var stage;
var bg;
var content
var bkgImg, bkgBmp;

var contactos = [{
    data: {
        framerate: 30,
        "images": ["assets/audioButtonSheet.png"],
        "frames": {
            "regX": 0,
            "regY": 120,
            "width": 60,
            "height": 27,
            "count": 1
        }
    },
    sprite: {},
    xoffset: 0,
    yoffset: 0,
}];
var fondos = [{
    data: {
        framerate: 30,
        "images": ["assets/movil.png"],
        "frames": {
            "regX": 0,
            "regY": 0,
            "width": 60,
            "height": 27,
            "count": 1
        }
    },
    sprite: {},
}];

var mensaje3;

window.addEventListener('resize', resize, false);

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
/*
window.addEventListener('click', function(e) {
    if (e.clientY > screenTop / 2 + 200) {
        content.y = -stage.canvas.height / 2;
        this.console.log(e.clientX);
    }
    if (e.clientY < 100) {
        content.y = h / 4;
        if (e.clientX < 200) {
            cargaMovil();
        } else if (e.clientX > this.screen.width - 200) this.console.log(e.clientX + " de " + this.screen.width);
    }
});
*/

function init() {
    stage = new createjs.Stage("mainCanvas");
    canvas = document.getElementById("mainCanvas");
    canvas.addEventListener('click', fullscreen);
    ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;
    createBackground();
    createContent();
    loadBkgImage();
    loadClickImage();
    //loadAudio();

    createjs.Ticker.addEventListener("tick", handleTick);
}

function handleTick() {
    stage.update();
}

function fullscreen() {
    var el = document.documentElement,
        rfs = el.requestFullscreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen;

    rfs.call(el);
    content.removeChild(clickBmp);
    canvas.removeEventListener('click', fullscreen);
}

function loadAudio() {
	var assetsPath = "assets/audio/";
    sounds = [{
        src: 'El inspector (Tema de entrada).mp3',
        id: "1",
        loop: 1
    }, {
        src: 'Boiiing.mp3',
        id: "2",
        loop: -1
    }];
    createjs.Sound.alternateExtensions = ["mp3"]; //mp3 //add other extensions to try loading if the src file extension is not supported
    createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); // add an event listener for when load is completed
    createjs.Sound.registerSounds(sounds, assetsPath);
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
    clickImg.onload = function(e) {
        clickBmp = new createjs.Bitmap(clickImg);
        content.addChild(clickBmp);
        resize();
    };
}

function loadBkgImage() {
    bkgImg = new Image();
    bkgImg.src = "assets/bkg4x.jpg";
    bkgImg.onload = function(e) {
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
    content.regX = w / 2
    content.regY = h / 2;
    content.scaleX = stage.canvas.width / w;
    content.scaleY = stage.canvas.height / h;
    content.x = stage.canvas.width / 2;
    content.y = stage.canvas.height / 2;
    console.log(stage.canvas.height + "," + h);
}

//FUNCIONES DE SONIDO
function soundLoaded(event) {
    console.log("Audios cargados");
    instanciaSonido = createjs.Sound.play(event.id);
}

function stop() {
    if (instanciaSonido) {
        instanciaSonido.stop();
    }
}

function playSound(target) {
    // instanciaSonido=createjs.Sound.createInstance(target);
    //Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
    if (instanciaSonido.playState === "playFinished" & instanciaSonido.playState !== "playSucceeded") {
        instanciaSonido = createjs.Sound.play(target);
    } else if (instanciaSonido.position < instanciaSonido.duration) {
        instanciaSonido.stop();
    }
}
//fin FUNCIONES DE SONIDO


//codigo de movil.js


function cargaMovil() {
    console.log("He llegado");

    if (stage) {

        mensaje3 = new createjs.Text("Agent 2: Info");
        mensaje3.font = "24px BrotherDeluxe";
        mensaje3.color = "#99402D";
        mensaje3.x = stage.canvas.width / 6;
        mensaje3.y = 200;
        mensaje3.maxWidth = stage.canvas.width;
        stage.addChild(mensaje3);

        //cargar 2 botones audio y textos en html meterlos en canvas.
        var img = contactos[0];
        img.spriteSheet = new createjs.SpriteSheet(botonAudio.data);
        img.sprite = new createjs.Sprite(botonAudio.spriteSheet);
        img.movingTime = 0;
        img.spriteSheet.on("complete", onLoadComplete);
        img.spriteSheet.on("error", onLoadError);
        var xinit = stage.canvas.width / 100;
        img.sprite.x = xinit;
        var yinit = stage.canvas.height / 100;
        img.sprite.y = yinit;
        stage.addChild(img.sprite);
        img.sprite.addEventListener("click", function() {
            playSound("1");
        });

        var fondo = fondos[0];
        fondo.spriteSheet = new createjs.SpriteSheet(fondos[0].data);
        fondo.sprite = new createjs.Sprite(fondos[0].spriteSheet);
        fondo.movingTime = 0;
        fondo.spriteSheet.on("complete", onLoadComplete);
        fondo.spriteSheet.on("error", onLoadError);
        var xinit = stage.canvas.width / 2;
        fondo.sprite.x = xinit;
        var yinit = stage.canvas.height / 2;
        fondo.sprite.y = yinit;
        stage.addChild(fondo.sprite);

        stage.update();
    }
}