console.log('loaded Mobile(movil.js)');
var mobileC;
var message_mobile;
var audioButton,audioButton2;
var closeButton;
var mobileActive=false;
var iActualContact=0;
var contacts=[{
        idImage:"contact1",
        infoArray:["Pista1:Me parecio ver un lindo gatito","Pista2:Era una rata","Pista3:Me la comi igualmente"],
        indexInfo:0,
        siteMaplocation:"Su casa",
        suspect:false,
        guilty:true
    },
    {
        idImage:"contact2",
        infoArray:["Pista1:Se huele la tostada","Pista2:No habia luz","Pista3:Me dolia la almendra del ruido de la calle"],
        indexInfo:0,
        siteMaplocation:"Mi casa",
        suspect:true,
        guilty:false
},
{
    idImage:"contact3",
    infoArray:["Pista1:Se huele la tostada","Pista2:No habia luz","Pista3:Me dolia la almendra del ruido de la calle"],
    indexInfo:0,
    siteMaplocation:"casa3",
    suspect:true,
    guilty:false
},
{
    idImage:"contact4",
    infoArray:["Pista1:Sandias","Pista2:Pezespada","Pista3:Obtuso"],
    indexInfo:0,
    siteMaplocation:"casa4",
    suspect:true,
    guilty:false
},
{
    idImage:"contact5",
    infoArray:["Pista1:fdafbb","Pista2:tejhgdfds","cvgghhh"],
    indexInfo:0,
    siteMaplocation:"casa5",
    suspect:true,
    guilty:false
},
{
    idImage:"contact6",
    infoArray:["Pista1:advv","Pista2:ntgdvjka55","Pista3:456"],
    indexInfo:0,
    siteMaplocation:"casa6",
    suspect:true,
    guilty:false
},
{
    idImage:"contact7",
    infoArray:["Pista1:Sebbbrr","Pista2:xcfgds","Pista3:dbbnhgdddsa"],
    indexInfo:0,
    siteMaplocation:"casa7",
    suspect:true,
    guilty:false
},
{
    idImage:"contact8",
    infoArray:["Pista1:padfjapd","Pista2:dfads","Pista3:dfadsfa"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
}];
var contactView;


function loadMobile(){
 
    mobileActive=true;
 //if(stage){
    console.log("Opening Mobile...");
 
  //  }
    mobileC=new createjs.Container();
   
    mobileC.x = 400;//stage.canvas.width/4;
    mobileC.y=1900;//window.innerHeight*2+window.innerHeight-50;
    /*  mobileC.bmp=new createjs.Bitmap(loader.getResult('bgMobile'));
    mobile.bmp.scaleX=3;
    mobile.bmp.scaleY=3;
    mobile.addChild(mobile.bmp);*/
    content.addChild(mobileC);
    //content.addChild(mobile); //adopta al del main 

    closeButton=new createjs.Bitmap(loader.getResult('closeBt'));
    mobileC.addChild(closeButton);
    closeButton.x=window.innerWidth;
    closeButton.y= window.innerHeight;
    closeButton.addEventListener("click",closeMobile);
    
//  if(typeof audioButton!== 'undefined'){ //TODO: BUTTONS CHANGE SPRITE ON/OFF
   
    audioButton = new createjs.Bitmap(loader.getResult('callBt'));
    audioButton.x =  window.innerWidth;//  Ajustado por escala 3 del fondo
    audioButton.y= window.innerHeight/3;
    audioButton.scaleX = 0.25;
    audioButton.scaleY=0.25;
    mobileC.addChild(audioButton);
    audioButton.addEventListener("click",saveClue);

    audioButton2 = new createjs.Bitmap(loader.getResult('deleteBt'));
    audioButton2.x =  window.innerWidth;//  Ajustado por escala 3 del fondo
    audioButton2.y= window.innerHeight/2;
    audioButton2.scaleX = 0.25;
    audioButton2.scaleY=0.25;
    mobileC.addChild(audioButton2);
    audioButton2.addEventListener("click",discardClue);
  
  // }
  // if(typeof message_mobile!== 'undefined'){ 
    message_mobile = new createjs.Text("Agent 2: Info");
    message_mobile.font ="36px BrotherDeluxe";
    message_mobile.color = "#99402D";
	message_mobile.x =window.innerWidth/3; 
    message_mobile.y = window.innerHeight-40; //36px fuente 
    message_mobile.maxWidth=window.innerWidth/2;
    mobileC.addChild(message_mobile);

    loadContact(iActualContact);

    prevButton = new createjs.Bitmap(loader.getResult('prev'));
    prevButton.x =  window.innerWidth/3;//  Ajustado por escala 3 del fondo
    prevButton.y= window.innerHeight/2;
    prevButton.scaleX = 0.25;
    prevButton.scaleY=0.25;
    mobileC.addChild(prevButton);
    prevButton.addEventListener("click",prevContact);

    nextButton = new createjs.Bitmap(loader.getResult('prev'));
    nextButton.x =  window.innerWidth/3;//  Ajustado por escala 3 del fondo
    nextButton.y= 3*window.innerHeight/4;
    nextButton.scaleX = 0.25;
    nextButton.scaleY=-0.25;
    mobileC.addChild(nextButton);
    nextButton.addEventListener("click",nextContact);
  
// }
}

function closeMobile(){
    mobileC.removeChild(closeButton);
   // mobileC.removeChild(mobile.bmp)
    mobileC.removeChild(audioButton);
    mobileC.removeChild(audioButton2);
    mobileC.removeChild(message_mobile);
    content.removeChild(mobileC);
    mobileActive=false;
}

function loadContact(n){
    
    contactView = new createjs.Bitmap(loader.getResult(contacts[n].idImage));
    console.log("Cargando imagen de contacto: "+contacts[n].idImage);
    contactView.x =  window.innerWidth/2;
    contactView.y= window.innerHeight/2;
    contactView.scaleX = 3;
    contactView.scaleY=3;
    mobileC.addChild(contactView);
   // contactView.addEventListener('click',cambiaFondo)
    message_mobile.text=contacts[n].infoArray[contacts[n].indexInfo];
    
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

function cambiaFondo(){
   // mobile.removeChild(mobile.bmp); Cambiar por no visible
    mobileC.removeChild(contactView);
    mobileC.removeChild(prevButton);
    mobileC.removeChild(nextButton);
    mobileC.removeChild(audioButton);
    mobileC.removeChild(audioButton2);
    mobileC.bmp=new createjs.Bitmap(loader.getResult('mobileDecide'));
    mobileC.bmp.scaleX=3;
    mobileC.bmp.scaleY=3;
    mobileC.addChild(mobileC.bmp);
    mobileC.addChild(contactView);
    //prevButton=new createjs.Bitmap(loader.getResult('flechaizq'));
}

function saveClue(){
    playSound("efecto1");
    addClue(contacts[iActualContact].infoArray[contacts[iActualContact].indexInfo],iActualContact);
    message_mobile.text=contacts[iActualContact].infoArray[clamp(++contacts[iActualContact].indexInfo,0,2)];
    updateTime(time-5);
}
function discardClue(){
    playSound("efecto2");
    message_mobile.text=contacts[iActualContact].infoArray[clamp(--contacts[iActualContact].indexInfo,0,2)];
}
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }