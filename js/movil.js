console.log('loaded Mobile(movil.js)');

var message_mobile;
var audioButton;
var bgMobile;
function loadMobile(){
 
    
 if(stage){
    console.log("Opening Mobile");
   // if(typeof message_mobile!== 'undefined'){ 
    message_mobile = new createjs.Text("Agent 2: Info");
    message_mobile.font ="24px BrotherDeluxe";
    message_mobile.color = "#99402D";
	message_mobile.x = stage.canvas.width/100; 
    message_mobile.y = 200; 
    message_mobile.maxWidth=stage.canvas.width;
    stage.addChild(message_mobile);
  //  }
    bgMobile = new createjs.Bitmap(loader.getResult('bgMobile'));
    audioButton = new createjs.Bitmap(loader.getResult('audioBt'));
    
  //  if(typeof audioButton!== 'undefined'){ //TODO: BUTTONS CHANGE SPRITE ON/OFF
    /*audioButton.spriteSheet= new createjs.SpriteSheet(buttons[0].data);
    audioButton.sprite=new createjs.Sprite(buttons[0].spriteSheet);
    audioButton.movingTime = 0;
    audioButton.spriteSheet.on("complete", onLoadComplete);
    audioButton.spriteSheet.on("error", onLoadError);*/
    var xinit = 0;
    audioButton.x =  xinit ;
    var yinit=0;
    audioButton.y = yinit;
    audioButton.scaleX = 0.25;
    audioButton.scaleY=0.25;
    stage.addChild(audioButton);

    audioButton.addEventListener("click",function(){playSound("1");});
   // }
  //  if(typeof bgMobile!== 'undefined'){ 
  
    var xinit = stage.canvas.width/2;
    bgMobile.x =  xinit ;
    var yinit=stage.canvas.height/2;//content.height/2;
    bgMobile.y = yinit;
    stage.addChild(bgMobile);
   // }
  
 }
}