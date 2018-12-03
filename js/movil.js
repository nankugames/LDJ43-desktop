console.log('loaded Mobile(movil.js)');
var mobile;
var message_mobile;
var audioButton,audioButton2;
var closeButton;
var mobileActive=false;
var iActualContact=0;
var contacts=[{
        idImage:"contact1",
        infoArray:["Pista1:Me pareció ver un lindo gatito","pista2","pista3"],
        indexInfo:0,
        siteMaplocation:"Su casa",
        suspect:false,
        guilty:true
    },
    {
        idImage:"contact2",
        infoArray:["Pista1:Se huele la tostada","pista2","pista3"],
        indexInfo:0,
        siteMaplocation:"Mi casa",
        suspect:true,
        guilty:false
}];
var contactView;


function loadMobile(){
 
    mobileActive=true;
 if(stage){
    console.log("Opening Mobile...");
 
  //  }
    mobile=new createjs.Container();
    mobile.bmp=new createjs.Bitmap(loader.getResult('bgMobile'));
    mobile.x = stage.canvas.width/4;
    mobile.y=window.innerHeight*2+window.innerHeight;
    mobile.bmp.scaleX=3;
    mobile.bmp.scaleY=3;
    content.addChild(mobile);
    mobile.addChild(mobile.bmp);

    closeButton=new createjs.Bitmap(loader.getResult('closeBt'));
    closeButton.x=window.innerWidth/3;
    mobile.addChild(closeButton);
    closeButton.addEventListener("click",closeMobile);
    
//  if(typeof audioButton!== 'undefined'){ //TODO: BUTTONS CHANGE SPRITE ON/OFF
   
    audioButton = new createjs.Bitmap(loader.getResult('callBt'));
    audioButton.x =  window.innerWidth;//  Ajustado por escala 3 del fondo
    audioButton.y= window.innerHeight/3;
    audioButton.scaleX = 0.25;
    audioButton.scaleY=0.25;
    mobile.addChild(audioButton);
    audioButton.addEventListener("click",function(){playSound("efecto1");message_mobile.text=contacts[iActualContact].infoArray[++contacts[iActualContact].indexInfo];});

    audioButton2 = new createjs.Bitmap(loader.getResult('deleteBt'));
    audioButton2.x =  window.innerWidth;//  Ajustado por escala 3 del fondo
    audioButton2.y= window.innerHeight/2;
    audioButton2.scaleX = 0.25;
    audioButton2.scaleY=0.25;
    mobile.addChild(audioButton2);
    audioButton2.addEventListener("click",function(){playSound("efecto2");message_mobile.text=contacts[iActualContact].infoArray[--contacts[iActualContact].indexInfo];});
  
  // }
  // if(typeof message_mobile!== 'undefined'){ 
    message_mobile = new createjs.Text("Agent 2: Info");
    message_mobile.font ="36px BrotherDeluxe";
    message_mobile.color = "#99402D";
	message_mobile.x =window.innerWidth/2; //TODO ref 1/4 de imgfondo 500
    message_mobile.y = window.innerHeight/2; 
    message_mobile.maxWidth=window.innerWidth/2;
    mobile.addChild(message_mobile);

    loadContact(iActualContact);

    prevButton = new createjs.Bitmap(loader.getResult('prev'));
    prevButton.x =  window.innerWidth/2;//  Ajustado por escala 3 del fondo
    prevButton.y= window.innerHeight/3;
    prevButton.scaleX = 0.25;
    prevButton.scaleY=0.25;
    mobile.addChild(prevButton);
    prevButton.addEventListener("click",prevContact);

    nextButton = new createjs.Bitmap(loader.getResult('prev'));
    nextButton.x =  window.innerWidth/2;//  Ajustado por escala 3 del fondo
    nextButton.y= window.innerHeight/2;
    nextButton.scaleX = 0.25;
    nextButton.scaleY=-0.25;
    mobile.addChild(nextButton);
    nextButton.addEventListener("click",nextContact);
  
 }
}

function closeMobile(){
    mobile.removeChild(closeButton);
    mobile.removeChild(mobile.bmp)
    mobile.removeChild(audioButton);
    mobile.removeChild(audioButton2);
    mobile.removeChild(message_mobile);
    content.removeChild(mobile);
    mobileActive=false;
}

function loadContact(n){
    if(mobile){
    contactView = new createjs.Bitmap(loader.getResult(contacts[n].idImage));
    console.log("Cargando imagen de contacto: "+contacts[n].idImage);
    contactView.x =  window.innerWidth/2;
    contactView.y= window.innerHeight/2;
    contactView.scaleX = 3;
    contactView.scaleY=3;
    mobile.addChild(contactView);
    message_mobile.text=contacts[n].infoArray[contacts[n].indexInfo];
    }
}

function nextContact(){
    if(iActualContact<contacts.length-1) iActualContact++;
    else iActualContact=0;
    loadContact(iActualContact);
}
function prevContact(){
    if(iActualContact>0) iActualContact--;
    else iActualContact=contacts.length-1;
    loadContact(iActualContact);
}