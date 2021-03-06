var w = 1920;
var h = 1440;

var time = timeBackup = 90;
var loader;
var stage;
var content, hotspotsMC;
var bkg;
var lastPath = {};
var lastPin = {};
var previousLastPin = {};

var initCarPosition = 20;

var hotspotPaths = {
    7: {},
    5: {},
    10: {},
    15: {},

    16: {
        20: { x:560, y:1050, distance: 2 },
        21: { x:700, y:1100, distance: 2 }
    },
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
    21: {
        16: { x:700, y:1100, distance: 2 },
        22: { x:800, y:1180, distance: 2 },
        23: { x:800, y:1140, distance: 4 },
        17: { x:800, y:1070, distance: 6 },
        24: { x:800, y:1175, distance: 6 },
        25: { x:800, y:1150, distance: 8 },
        18: { x:802, y:1085, distance: 9 },
        //13: { x:800, y:1070, distance: 11 }
    },
    22: {
        /*
        18: { x:902, y:1085, distance: 9 },
        24: { x:904, y:1214, distance: 6 },
        25: { x:900, y:1150, distance: 8 },
        13: { x:915, y:975, distance: 8 },
        8: { x:914, y:830, distance: 8 },
        //26: { x:900, y:1150, distance: 8 },
        23: { x:910, y:1130, distance: 8 },
        17: { x:915, y:1070, distance: 8 },
        11: { x:830, y:930, distance: 8 },
        12: { x:815, y:860, distance: 8 },
        19: { x:915, y:970, distance: 8 },
        27: { x:915, y:950, distance: 8 },
        */
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
        content.y = -stage.canvas.height;
		this.console.log(stage.canvas.height + ',' + h);
	}
	if (e.screenY < 200) {
        content.y = 0;
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
    canvas.addEventListener('click', fullscreen);
    ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.mozImageSmoothingEnabled = false;

    content = new createjs.Container();
    stage.addChild(content);
    
    bkg = new createjs.Bitmap(loader.getResult('bkg'));
    bkgMobile = new createjs.Bitmap(loader.getResult('bkgMobile'));
    bkgNotebook = new createjs.Bitmap(loader.getResult('bkgNotebook'));

    mobile = new createjs.Bitmap(loader.getResult('mobile'));
    notebook = new createjs.Bitmap(loader.getResult('notebook'));

    click = new createjs.Bitmap(loader.getResult('click'));

    miniCar = new createjs.Bitmap(loader.getResult('car'));
    miniCar.scaleX = miniCar.scaleY = .33;
    miniCar.regX = miniCar.image.width;

    timeBox = new createjs.Container();
    timeBox.txt = new createjs.Text(time + ' ' + _t.minutes);
    timeBox.txt.font = '48px Commodore64P';
    timeBox.txt.color = '#000';
    timeBox.txt.textAlign = 'right';
    timeBox.x = stage.canvas.width - 380;
    timeBox.y = 530;

    textBox = new createjs.Container();
    textBox.mouseEnabled = false;
    textBox.mouseChildren = false;
    textBox.bkg = new createjs.Bitmap(loader.getResult('textBox'));

    textBox.picture = new createjs.Bitmap(loader.getResult('sketch24'));
    textBox.picture.alpha = 0.5;
    textBox.picture.x = 60;
    textBox.picture.y = 390;
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
    dialog.regX = 1230 / 2;
    dialog.x = window.innerWidth / 2;

    dialog.y = stage.canvas.height - 740;
    dialog.bkg.alpha = 0.7
    dialog.txt = new createjs.Text('');
    dialog.txt.font = '20px Commodore64P';
    dialog.txt.color = '#FFF';
    dialog.txt.x = 40;
    dialog.txt.y = 40;
    dialog.txt.lineWidth = 1100;

    dialog.txtOK = new createjs.Text('');
    dialog.txtOK.font = '26px Commodore64P';
    dialog.txtOK.color = '#FFF';
    dialog.txtOK.x = 40;
    dialog.txtOK.y = 240;

    dialog.txtOK.addEventListener('mouseover', function(e) {
        e.currentTarget.color = '#FFFF00';
    });
    dialog.txtOK.addEventListener('mouseout', function(e) {
        e.currentTarget.color = '#FFF';
    });
    dialog.txtOK.addEventListener('click', function(e) {
        dialog.txtOK.text = "-" + quiz[quiz.i].answer[0].value + _t.minutes;

        dialog.txtOK.visible = false;
        setTimeout(function(){ dialog.txtOK.visible = true; }, 500)
        setTimeout(function(){ dialog.txtOK.visible = false; }, 1000)
        setTimeout(function(){ dialog.txtOK.visible = true; }, 1500)
        setTimeout(function(){ dialog.txtOK.visible = false; }, 2000)
        setTimeout(function(){ dialog.txtOK.visible = true; }, 2500)
        setTimeout(function() {
            quiz.i++; 
            if (quiz[quiz.i]) {
                nextQuiz(quiz);
            } else {
                dialog.visible = false; 
            }
        }, 3000)

        updateTime(time - quiz[quiz.i].answer[0].value);
    });

    dialog.txtKO = new createjs.Text('');
    dialog.txtKO.font = '26px Commodore64P';
    dialog.txtKO.color = '#FFF';
    dialog.txtKO.cursor = 'pointer';
    dialog.txtKO.x = 40;
    dialog.txtKO.y = 280;
    dialog.txtKO.addEventListener('mouseover', function(e) {
        e.currentTarget.color = '#FFFF00';
    });
    dialog.txtKO.addEventListener('mouseout', function(e) {
        e.currentTarget.color = '#FFF';
    });
    dialog.txtKO.addEventListener('click', function(e) {
        dialog.txtKO.text = "-" + quiz[quiz.i].answer[1].value + _t.minutes;

        dialog.txtKO.visible = false;
        setTimeout(function(){ dialog.txtKO.visible = true; }, 500)
        setTimeout(function(){ dialog.txtKO.visible = false; }, 1000)
        setTimeout(function(){ dialog.txtKO.visible = true; }, 1500)
        setTimeout(function(){ dialog.txtKO.visible = false; }, 2000)
        setTimeout(function(){ dialog.txtKO.visible = true; }, 2500)
        setTimeout(function(){ dialog.visible = false; }, 3000)

        updateTime(time - quiz[quiz.i].answer[1].value);
    });

    dialog.txtNext = new createjs.Text('Le llamaré al móvil...');
    dialog.txtNext.font = '26px Commodore64P';
    dialog.txtNext.color = '#FFF';
    dialog.txtNext.cursor = 'pointer';
    dialog.txtNext.x = 40;
    dialog.txtNext.y = 280;
    dialog.txtNext.addEventListener('mouseover', function(e) {
        e.currentTarget.color = '#FFFF00';
    });
    dialog.txtNext.addEventListener('mouseout', function(e) {
        e.currentTarget.color = '#FFF';
    });
    dialog.txtNext.addEventListener('click', function(e) {
        dialog.txtNext.visible = false;
        dialog.visible = false;
    });

    dialog.cursor = 'pointer';
    dialog.visible = false;

    mobile.y = 1900;
    mobile.x = 400;
    mobile.visible = false;
    mobile.addEventListener('click', function(e) {
        e.currentTarget.visible = false;
        bkgMobile.visible = true;
    });

    notebook.y = 1900;
    notebook.x = 80;
    notebook.visible = false;
    notebook.addEventListener('click', function(e) {
        e.currentTarget.visible = false;
        bkgNotebook.visible = true;
    });

    bkgMobile.y = 2161;
    bkgMobile.cursor = 'pointer';
    bkgMobile.addEventListener('mouseover', function(e) {
        e.currentTarget.image = loader.getResult('bkgMobileOn');

    });
    bkgMobile.addEventListener('mouseout', function(e) {
        e.currentTarget.image = loader.getResult('bkgMobile');
    });
    bkgMobile.addEventListener('click', function(e) {
        e.currentTarget.visible = false;
        mobile.visible = true;
    });

    bkgNotebook.x = 1080;
    bkgNotebook.y = 2036;
    bkgNotebook.cursor = 'pointer';
    bkgNotebook.addEventListener('mouseover', function(e) {
        e.currentTarget.image = loader.getResult('bkgNotebookOn');

    });
    bkgNotebook.addEventListener('mouseout', function(e) {
        e.currentTarget.image = loader.getResult('bkgNotebook');
    });
    bkgNotebook.addEventListener('click', function(e) {
        e.currentTarget.visible = false;
        notebook.visible = true;
    });

    content.addChild(bkg);
    content.addChild(bkgMobile);
    content.addChild(bkgNotebook);
    content.addChild(miniCar);

    loadHotspots();
    loadHotspotPaths();

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
    dialog.addChild(dialog.txtNext);

    content.addChild(notebook);
    content.addChild(mobile);

    content.addChild(click);
    resize();

    //loadAudio();

    createjs.Ticker.addEventListener('tick', handleTick);
}

function loadImages() {
    manifest = [
        {src: 'alert.png', id: 'alert'},
        {src: 'alert2.png', id: 'alert2'},
        {src: 'white-btn.png', id: 'alertBtn'},
        {src: 'car.png', id: 'car'},

        {src: 'bkg.png', id: 'bkg'},
        {src: 'bkg-mobile.png', id: 'bkgMobile'},
        {src: 'bkg-mobile-on.png', id: 'bkgMobileOn'},
        {src: 'bkg-notebook.png', id: 'bkgNotebook'},
        {src: 'bkg-notebook-on.png', id: 'bkgNotebookOn'},
        {src: 'mobile3x.png', id: 'mobile'},
        {src: 'notebook4x.png', id: 'notebook'},

        {src: 'click4x.png', id: 'click'},
        {src: 'dialog.png', id: 'dialog'},

        {src: 'text-box.png', id: 'textBox'},
        {src: 'red-pin.png', id: 'idlePin'},
        {src: 'blue-pin.png', id: 'overOKPin'},
        {src: 'black-pin.png', id: 'overKOPin'},
        {src: 'gold-pin.png', id: 'selectedPin'},
        {src: '1x1.png', id: 'sketch1'},
        {src: '1x1.png', id: 'sketch2'},
        {src: '1x1.png', id: 'sketch3'},
        {src: '1x1.png', id: 'sketch4'},
        {src: '1x1.png', id: 'sketch5'},
        {src: '1x1.png', id: 'sketch6'},
        {src: '1x1.png', id: 'sketch7'},
        {src: '1x1.png', id: 'sketch8'},
        {src: '1x1.png', id: 'sketch9'},
        {src: '1x1.png', id: 'sketch10'},
        {src: '1x1.png', id: 'sketch11'},
        {src: 'sketch-semaforo.png', id: 'sketch12'},
        {src: '1x1.png', id: 'sketch13'},
        {src: '1x1.png', id: 'sketch14'},
        {src: '1x1.png', id: 'sketch15'},
        {src: '1x1.png', id: 'sketch16'},
        {src: '1x1.png', id: 'sketch17'},
        {src: '1x1.png', id: 'sketch18'},
        {src: '1x1.png', id: 'sketch19'},
        {src: '1x1.png', id: 'sketch20'},
        {src: '1x1.png', id: 'sketch21'},
        {src: '1x1.png', id: 'sketch22'},
        {src: '1x1.png', id: 'sketch23'},
        {src: '1x1.png', id: 'sketch24'},
        {src: '1x1.png', id: 'sketch25'},
        {src: '1x1.png', id: 'sketch26'},
        {src: '1x1.png', id: 'sketch27'},
        {src: '1x1.png', id: 'sketch28'},

        {src: 'phone/partner.png', id: 'partner'},
        {src: 'text-box.png', id: 'textBox'},
        {src: 'text-box.png', id: 'textBox'},

    ];

    for (i in hotspotPaths) {
        for(j in hotspotPaths[i]) {
            manifest.push({ src: i + '-' + j + '.png', id: i + '-' + j });
        }
    }

    console.log(manifest);

    loader = new createjs.LoadQueue(false);
    loader.addEventListener('complete', init);
    loader.loadManifest(manifest, true, 'assets/');
}

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


        hpt = _t.hotspots[lastPin.id];

        dialog.txtNext.visible = false;
        nextQuiz(hpt.quiz);
    }


}

function nextQuiz(q) {
    if (!q.i) q.i = 0;

    dialog.txtOK.text = dialog.txtKO.text = '';

    quiz = q;
    dialog.txt.text = q[q.i].text;
    if (q[q.i].answer && q[q.i].answer[0].text) {
        dialog.txtOK.text = q[q.i].answer[0].text;
    }
    if (q[q.i].answer && q[q.i].answer[1].text) {
        dialog.txtKO.text = q[q.i].answer[1].text;
    }

    dialog.txtOK.hit = new createjs.Shape();
    dialog.txtOK.hit.graphics.beginFill("#000").drawRect(0, 0, dialog.txtOK.getMeasuredWidth(), dialog.txtOK.getMeasuredHeight());
    dialog.txtOK.hitArea = dialog.txtOK.hit;
    dialog.txtOK.hit.cursor = 'pointer';

    dialog.txtKO.hit = new createjs.Shape();
    dialog.txtKO.hit.graphics.beginFill("#000").drawRect(0, 0, dialog.txtKO.getMeasuredWidth(), dialog.txtKO.getMeasuredHeight());
    dialog.txtKO.hitArea = dialog.txtKO.hit;
    dialog.txtKO.hit.cursor = 'pointer';

    if (dialog.txtOK.text == '') {
        setTimeout(function(){ dialog.txtNext.visible = true; }, 2500)
        setTimeout(function(){ dialog.txtNext.visible = false; }, 3000)
        setTimeout(function(){ dialog.txtNext.visible = true; }, 3500)
        setTimeout(function(){ dialog.txtNext.visible = false; }, 4000)
        setTimeout(function(){ dialog.txtNext.visible = true; }, 4500)
    }

    dialog.visible = true;
}

function updateTime(t) {
    time = t;
    timeBox.txt.text = time + ' ' + _t.minutes;
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
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    fullscreenActivated = true;
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
    content.scaleX = content.scaleY = stage.canvas.height / h;
    content.x = stage.canvas.width / 2;
    content.y = 0;
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