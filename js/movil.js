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
    infoArray:["Pista1:Puso la cesta encima de la mesa","Pista2:Estaba todo mojado","Pista3:Me asusta la gente vieja"],
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
    infoArray:["Pista1:Al final me salio rana","Pista2:Todos lo decian,no era de fiar","Se nos rompio el amor"],
    indexInfo:0,
    siteMaplocation:"casa5",
    suspect:true,
    guilty:false
},
{
    idImage:"contact6",
    infoArray:["Pista1:Axo que es","Pista2:A maquesta cara que tens","Pista3:Prou!"],
    indexInfo:0,
    siteMaplocation:"casa6",
    suspect:true,
    guilty:false
},
{
    idImage:"contact7",
    infoArray:["Pista1:Dejame no tengo tiempo","Pista2:No me importa la gente","Pista3:Solo me importas tu"],
    indexInfo:0,
    siteMaplocation:"casa7",
    suspect:true,
    guilty:false
},
{
    idImage:"contact8",
    infoArray:["Pista1:Whoper Junior sin queso","Pista2:Las patatas normales o deluxe?","Pista3:Caminante no hay camino"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact9",
    infoArray:["Pista1:Porque es azul como el mar, azul","Pista2:Vivimos todos en un estado policial","Pista3:Vivo en el mejor de los mundos"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact10",
    infoArray:["Pista1:Palabras mas, palabras menos","Pista2:Nada de lo que diga podra ser usado en mi contra","Pista3:Tengo derecho a permanecer en silencio"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact11",
    infoArray:["Pista1:Holi","Pista2:Me dan miedo las noches","Pista3:Me asustan las mañanas"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact12",
    infoArray:["Pista1:El final del verano","Pista2:El verano ya esta aqui","Pista3:Boooooomba"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact13",
    infoArray:["Pista1:Tra, tra","Pista2:¿Habeis escuchado a Rosalia, yo no","Pista3:En el pais de los tuertos..."],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact14",
    infoArray:["Pista1:Me estoy quedando sin yemas","Pista2:Y no de los dedos","Pista3:Soy transespecie"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact15",
    infoArray:["Pista1:Solo quiere ver arder el mundo","Pista2:Ahora vais a conocer el terror","Pista3:Tira para la batcueva"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact16",
    infoArray:["Pista1:Se que no estoy en mi jucio","Pista2:...que me falta inspiracion","Pista3:Cambio las cosas de sitio"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
},
{
    idImage:"contact17",
    infoArray:["Pista1:Pues hasta aqui hemos llegado","¿Pista2:A quien vas a llamar?","Pista3:Ghostbuster!"],
    indexInfo:0,
    siteMaplocation:"casa8",
    suspect:true,
    guilty:false
}];
var contactView;


function loadMobile(){
 
    
 //if(stage){
    console.log("Opening Mobile...");
 
  //  }
    mobileC=new createjs.Container();
   
    mobileC.x = 400;//stage.canvas.width/4;
    mobileC.y=1900;// window.innerHeight*2+window.innerHeight-50;
    
    content.addChild(mobileC);
    //content.addChild(mobile); //adopta al del main 

    closeButton=new createjs.Bitmap(loader.getResult('closeBt'));
    mobileC.addChild(closeButton);
    closeButton.x= 0;//window.innerWidth
    closeButton.y= 0;//window.innerHeight
    closeButton.addEventListener("click",closeMobile);
    
//  if(typeof audioButton!== 'undefined'){ //TODO: BUTTONS CHANGE SPRITE ON/OFF
   
    audioButton = new createjs.Bitmap(loader.getResult('callBt'));
    audioButton.x= 400;//window.innerWidthAjustado por escala 3 del fondo
    audioButton.y= 200;//window.innerHeight/3;
    audioButton.scaleX = 0.25;
    audioButton.scaleY=0.25;
    mobileC.addChild(audioButton);
    audioButton.addEventListener("click",saveClue);

    audioButton2 = new createjs.Bitmap(loader.getResult('deleteBt'));
    audioButton2.x = 400;// window.innerWidth;//  Ajustado por escala 3 del fondo
    audioButton2.y= 400;//window.innerHeight/2;
    audioButton2.scaleX = 0.25;
    audioButton2.scaleY=0.25;
    mobileC.addChild(audioButton2);
    audioButton2.addEventListener("click",discardClue);
  
  // }
  // if(typeof message_mobile!== 'undefined'){ 
    message_mobile = new createjs.Text("Agent 2: Info");
    message_mobile.font ="36px BrotherDeluxe";
    message_mobile.color = 'white';//ROJO "#99402D";
	message_mobile.x =50;//window.innerWidth/3; 
    message_mobile.y = window.innerHeight-40; //36px fuente 
    message_mobile.maxWidth=550;//window.innerWidth;
    mobileC.addChild(message_mobile);

    loadContact(iActualContact);

    prevButton = new createjs.Bitmap(loader.getResult('prev'));
    prevButton.x = 100;// window.innerWidth/3;//  Ajustado por escala 3 del fondo
    prevButton.y= 200;//window.innerHeight/2;
    prevButton.scaleX = 0.25;
    prevButton.scaleY=0.25;
    mobileC.addChild(prevButton);
    prevButton.addEventListener("click",prevContact);

    nextButton = new createjs.Bitmap(loader.getResult('prev'));
    nextButton.x = 100;// window.innerWidth/3;//  Ajustado por escala 3 del fondo
    nextButton.y= 400;//3*window.innerHeight/4;
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
    mobile.visible=false;
    bkgMobile.visible = true;
}

function loadContact(n){
    
    contactView = new createjs.Bitmap(loader.getResult(contacts[n].idImage));
    console.log("Cargando imagen de contacto: "+contacts[n].idImage);
    contactView.x = 200;// window.innerWidth/2nnerHeight/2;
    contactView.y = 200;
    contactView.scaleX = 3;
    contactView.scaleY=3;
    mobileC.addChild(contactView);
    contactView.addEventListener('click',cambiaFondo)
    message_mobile.text=contacts[n].infoArray[contacts[n].indexInfo];
    
}

function nextContact(){
    contacts[iActualContact].indexInfo=0;
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
    mobileC.removeChild(message_mobile);
    mobile.visible=false;
    mobileC.bmp=new createjs.Bitmap(loader.getResult('mobileDecide'));
    mobileC.bmp.x = -250;
    mobileC.bmp.y=-25;
    mobileC.bmp.scaleX=3;
    mobileC.bmp.scaleY=3;
    mobileC.addChild(mobileC.bmp);
    mobileC.addChild(contactView);
    contactView.x = 200;
    //prevButton=new createjs.Bitmap(loader.getResult('flechaizq')); AÑADIR BOTONES ACUSAR
}

function saveClue(){
    playSound("efecto1");
    addClue('Contacto '+(iActualContact+1)+' dice: '+contacts[iActualContact].infoArray[contacts[iActualContact].indexInfo],iActualContact);
    message_mobile.text=contacts[iActualContact].infoArray[clamp(++contacts[iActualContact].indexInfo,0,2)];
    updateTime(time-5);
}
function discardClue(){
    playSound("efecto2");
    message_mobile.text=contacts[iActualContact].infoArray[clamp(++contacts[iActualContact].indexInfo,0,2)];
}
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
  }