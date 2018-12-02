console.log('loaded movil.js');

var botones=[
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
var fondos=[
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

var mensaje3;

function cargaMovil(){
 
    
 if(stage){
    console.log("Funcion de carga de Gestion de movil");
   // if(typeof mensaje3!== 'undefined'){ 
    mensaje3 = new createjs.Text("Agent 2: Info");
    mensaje3.font ="24px BrotherDeluxe";
    mensaje3.color = "#99402D";
	mensaje3.x = stage.canvas.width/6; 
    mensaje3.y = 200; 
    mensaje3.maxWidth=stage.canvas.width;
    stage.addChild(mensaje3);
  //  }
    //cargar 2 botones audio y textos en html meterlos en canvas.
  //  if(typeof img!== 'undefined'){ 
    var img=botones[0];
    img.spriteSheet= new createjs.SpriteSheet(botones[0].data);
    img.sprite=new createjs.Sprite(botones[0].spriteSheet);
    img.movingTime = 0;
    img.spriteSheet.on("complete", onLoadComplete);
    img.spriteSheet.on("error", onLoadError);
    var xinit = stage.canvas.width/100;
    img.sprite.x =  xinit ;
    var yinit=stage.canvas.height/100;
    img.sprite.y = yinit;
    stage.addChild(img.sprite);
    img.sprite.addEventListener("click",function(){playSound("1");});
   // }
  //  if(typeof fondo!== 'undefined'){ 
    var fondo=fondos[0];
    fondo.spriteSheet= new createjs.SpriteSheet(fondos[0].data);
    fondo.sprite=new createjs.Sprite(fondos[0].spriteSheet);
    fondo.movingTime = 0;
    fondo.spriteSheet.on("complete", onLoadComplete);
    fondo.spriteSheet.on("error", onLoadError);
    var xinit = 0;//stage.canvas.width/2;
    fondo.sprite.x =  xinit ;
    var yinit=200//stage.canvas.height/2;
    fondo.sprite.y = yinit;
    stage.addChild(fondo.sprite);
   // }

    stage.update();
    stage.updateContext(ctx);
 }
}