var w = 1920;
var h = 1440;

var loader;
var stage;
var content, hotspotsMC;
var bkg;
var lastPin = {};

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
    }
}

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
    { x: 642, y:815 },

    { x: 810, y:885 },
    { x: 901, y:843 },
    { x: 1104, y:925 },
    { x: 1269, y:829 },

    { x: 1456, y:805 },
    { x: 695, y:1045 },

    { x: 940, y:1015 },
    { x: 1104, y:1038 },
    { x: 1280, y:965 },
    { x: 530, y:1016 },

    { x: 784, y:1115 },

    { x: 900, y:1160 },
    { x: 924, y:1082 },
    { x: 1121, y:1168 },
    { x: 1130, y:1085 },
    { x: 1286, y:1215 },
    { x: 1346, y:1000 },
    { x: 1406, y:1149 },

]

var contactos = [{
    data: {
        framerate: 30,
        'images': ['assets/audioButtonSheet.png'],
        'frames': {
            'regX': 0,
            'regY': 120,
            'width': 60,
            'height': 27,
            'count': 1
        }
    },
    sprite: {},
    xoffset: 0,
    yoffset: 0,
}];
var fondos = [{
    data: {
        framerate: 30,
        'images': ['assets/movil.png'],
        'frames': {
            'regX': 0,
            'regY': 0,
            'width': 60,
            'height': 27,
            'count': 1
        }
    },
    sprite: {},
}];

var mensaje3;

window.addEventListener('resize', resize, false);

window.addEventListener('mousemove', function(e) {
	if (e.screenY > 980) {
		content.y = -stage.canvas.height/2;
		this.console.log(stage.canvas.height + ',' + h);
	}
	if (e.screenY < 200) {
		content.y = h/4;
		this.console.log(stage.canvas.height + ',' + h);
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
        } else if (e.clientX > this.screen.width - 200) this.console.log(e.clientX + ' de ' + this.screen.width);
    }
});
*/

function init() {
    stage = new createjs.Stage('mainCanvas');
    stage.enableMouseOver(60);

    canvas = document.getElementById('mainCanvas');
    //canvas.addEventListener('click', fullscreen);
    ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;

    content = new createjs.Container();
    stage.addChild(content);
    
    bkg = new createjs.Bitmap(loader.getResult('bkg'));
    click = new createjs.Bitmap(loader.getResult('click'));

    textBox = new createjs.Container();
    textBox.mouseEnabled = false;
    textBox.bkg = new createjs.Bitmap(loader.getResult('textBox'));
    textBox.picture = new createjs.Bitmap(loader.getResult('sketch24'));
    textBox.picture.x = 60;
    textBox.picture.y = 430;
    textBox.bkg.alpha = 0.6;
    textBox.x = 316;
    textBox.y = 523;
    textBox.visible = false;
    textBox.titleTxt = new createjs.Text('It\'s my title');
    textBox.titleTxt.font = '24px Minecraftia-Regular';
    textBox.titleTxt.color = '#FFF';
    textBox.titleTxt.x = 35;
    textBox.titleTxt.y = 25;
    textBox.titleTxt.maxWidth = stage.canvas.width;

    content.addChild(bkg);

    loadHotspots();
    loadHotspotPaths();

    content.addChild(textBox);
    textBox.addChild(textBox.bkg);
    textBox.addChild(textBox.picture);
    textBox.addChild(textBox.titleTxt);

    //content.addChild(click);
    resize();

    //loadAudio();

    createjs.Ticker.addEventListener('tick', handleTick);
}

function loadImages() {
    manifest = [
        {src: 'bkg4x.jpg', id: 'bkg'},
        {src: 'click4x.png', id: 'click'},
        {src: 'text-box.png', id: 'textBox'},
        {src: 'red-pin.png', id: 'redPin'},
        {src: 'gold-pin.png', id: 'goldPin'},
        {src: 'blue-pin.png', id: 'bluePin'},
        {src: 'gray-ball.png', id: 'greyBall'},
        {src: 'black-ball.png', id: 'blackBall'},
        {src: 'green-ball.png', id: 'greenBall'},
        {src: 'sketch-24.png', id: 'sketch24'},
        {src: 'sketch-16.png', id: 'sketch16'},
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
        hp.bmp.title = '#'+ hp.bmp.id + ' - ' + _t.hotspots[hp.bmp.id].title;

        hp.bmp.addEventListener('mouseover', function(e) {
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
            e.currentTarget.image = loader.getResult('bluePin');
            stage.cursor = 'pointer';
            hpTarget.img.visible = true;
        });
        hp.bmp.addEventListener('mouseout', function(e) {
            textBox.visible = false;
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
    content.removeChild(click);
    canvas.removeEventListener('click', fullscreen);
}

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

function tick() {
    stage.update();
    console.log('Tick actualizado')
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
    console.log(stage.canvas.height + ',' + h);
}

//FUNCIONES DE SONIDO
function soundLoaded(event) {
    console.log('Audios cargados');
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
    if (instanciaSonido.playState === 'playFinished' & instanciaSonido.playState !== 'playSucceeded') {
        instanciaSonido = createjs.Sound.play(target);
    } else if (instanciaSonido.position < instanciaSonido.duration) {
        instanciaSonido.stop();
    }
}
//fin FUNCIONES DE SONIDO


//codigo de movil.js


function cargaMovil() {
    console.log('He llegado');

    if (stage) {

        mensaje3 = new createjs.Text('Agent 2: Info');
        mensaje3.font = '24px BrotherDeluxe';
        mensaje3.color = '#99402D';
        mensaje3.x = stage.canvas.width / 6;
        mensaje3.y = 200;
        mensaje3.maxWidth = stage.canvas.width;
        stage.addChild(mensaje3);

        //cargar 2 botones audio y textos en html meterlos en canvas.
        var img = contactos[0];
        img.spriteSheet = new createjs.SpriteSheet(botonAudio.data);
        img.sprite = new createjs.Sprite(botonAudio.spriteSheet);
        img.movingTime = 0;
        img.spriteSheet.on('complete', onLoadComplete);
        img.spriteSheet.on('error', onLoadError);
        var xinit = stage.canvas.width / 100;
        img.sprite.x = xinit;
        var yinit = stage.canvas.height / 100;
        img.sprite.y = yinit;
        stage.addChild(img.sprite);
        img.sprite.addEventListener('click', function() {
            playSound('1');
        });

        var fondo = fondos[0];
        fondo.spriteSheet = new createjs.SpriteSheet(fondos[0].data);
        fondo.sprite = new createjs.Sprite(fondos[0].spriteSheet);
        fondo.movingTime = 0;
        fondo.spriteSheet.on('complete', onLoadComplete);
        fondo.spriteSheet.on('error', onLoadError);
        var xinit = stage.canvas.width / 2;
        fondo.sprite.x = xinit;
        var yinit = stage.canvas.height / 2;
        fondo.sprite.y = yinit;
        stage.addChild(fondo.sprite);

        stage.update();
    }
}