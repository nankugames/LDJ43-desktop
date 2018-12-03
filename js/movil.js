console.log('loaded Mobile(movil.js)');

var buttons=[
    {
     data:{
        framerate: 30,
        "images": ["assets/audioButtonSheet.png"],
        "frames": {"regX": 0, "regY": 81, "width": 60, "height": 27, "count": 1}
    },
    sprite: {},
    xoffset: 0,
    yoffset: 0,
    }
];
var backgrounds=[
    {
        data:{
            framerate: 30,
            "images": ["assets/movil.png"],
            "frames": {"regX":0, "regY":0 , "width": 260, "height": 264, "count": 1}
        },
        sprite:{},
        xoffset: 0,
        yoffset: 0,
    }
];

var message_mobile;

function loadMobile(){
 
    
 if(stage){
    console.log("Opening Mobile");
   // if(typeof message_mobile!== 'undefined'){ 
    message_mobile = new createjs.Text("Agent 2: Info");
    message_mobile.font ="24px BrotherDeluxe";
    message_mobile.color = "#99402D";
	message_mobile.x = stage.canvas.width/6; 
    message_mobile.y = 200; 
    message_mobile.maxWidth=stage.canvas.width;
    stage.addChild(message_mobile);
  //  }

  //  if(typeof audioButton!== 'undefined'){ 
    var audioButton=buttons[0];
    audioButton.spriteSheet= new createjs.SpriteSheet(buttons[0].data);
    audioButton.sprite=new createjs.Sprite(buttons[0].spriteSheet);
    audioButton.movingTime = 0;
    audioButton.spriteSheet.on("complete", onLoadComplete);
    audioButton.spriteSheet.on("error", onLoadError);
    var xinit = stage.canvas.width/100;
    audioButton.sprite.x =  xinit ;
    var yinit=stage.canvas.height/100;
    audioButton.sprite.y = yinit;
    stage.addChild(audioButton.sprite);
    audioButton.sprite.addEventListener("click",function(){playSound("1");});
   // }
  //  if(typeof bgMobile!== 'undefined'){ 
    var bgMobile=backgrounds[0];
    bgMobile.spriteSheet= new createjs.SpriteSheet(backgrounds[0].data);
    bgMobile.sprite=new createjs.Sprite(backgrounds[0].spriteSheet);
    bgMobile.movingTime = 0;
    bgMobile.spriteSheet.on("complete", onLoadComplete);
    bgMobile.spriteSheet.on("error", onLoadError);
    var xinit = 0;//content.width/2;
    bgMobile.sprite.x =  xinit ;
    var yinit=200//content.height/2;
    bgMobile.sprite.y = yinit;
    stage.addChild(bgMobile.sprite);
   // }
   // stage.update();
 }
}