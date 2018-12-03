console.log('loaded Mobile(movil.js)');
var mobile;
var message_mobile;
var audioButton;
var closeButton;
var mobileActive=false;

function loadMobile(){
 
    mobileActive=true;
 if(stage){
    console.log("Opening Mobile");
 
  //  }
    mobile=new createjs.Container();
    mobile.bmp=new createjs.Bitmap(loader.getResult('bgMobile'));
    mobile.x = stage.canvas.width/4;
    mobile.y=stage.canvas.height*2+stage.canvas.height-50;
    mobile.bmp.scaleX=3;
    mobile.bmp.scaleY=3;
    content.addChild(mobile);
    mobile.addChild(mobile.bmp);
    closeButton=new createjs.Bitmap(loader.getResult('closeBt'));
    /*var imageaux=new Image(loader.getResult('bgMobile'));
    closeButton.x=imageaux.width;
    console.log(imageaux.width);*/
    closeButton.x=1000;//                             todo:buscar ref width img                  
    closeButton.y=0;
    mobile.addChild(closeButton);
    closeButton.addEventListener("click",closeMobile);
    

    audioButton = new createjs.Bitmap(loader.getResult('audioBt'));
    //  if(typeof audioButton!== 'undefined'){ //TODO: BUTTONS CHANGE SPRITE ON/OFF
    /*audioButton.spriteSheet= new createjs.SpriteSheet(buttons[0].data);
    audioButton.sprite=new createjs.Sprite(buttons[0].spriteSheet);
    audioButton.movingTime = 0;
    audioButton.spriteSheet.on("complete", onLoadComplete);
    audioButton.spriteSheet.on("error", onLoadError);*/
    audioButton.x =  1000;//                             todo:buscar ref width img               
    audioButton.y = 300;
    audioButton.scaleX = 0.25;
    audioButton.scaleY=0.25;
    mobile.addChild(audioButton);
    if(audiosLoaded){
    audioButton.addEventListener("click",function(){playSound("1");});
    }
// }
  // if(typeof message_mobile!== 'undefined'){ 
    message_mobile = new createjs.Text("Agent 2: Info");
    message_mobile.font ="36px BrotherDeluxe";
    message_mobile.color = "#99402D";
	message_mobile.x =500; //TODO ref 1/4 de imgfondo
    message_mobile.y = 300; 
    message_mobile.maxWidth=stage.canvas.width;
    mobile.addChild(message_mobile);
  
 }
}

function closeMobile(){
    mobile.removeChild(closeButton);
    mobile.removeChild(mobile.bmp)
    mobile.removeChild(audioButton);
    mobile.removeChild(message_mobile);
    content.removeChild(mobile);
    mobileActive=false;
}