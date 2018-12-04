console.log('loaded Notebook(libreta.js)');
var notebookC;
var message_notebook;
var closeButton2;
var notebookActive=false;
var iClue=0;
var clues=[];
function loadNotebook(){
 console.log("Opening notebook..."); 
 //if(stage){

    //if(notebookC){
    notebookC=new createjs.Container();
    /*notebook.bmp=new createjs.Bitmap(loader.getResult('bgNotebook'));*/
    notebookC.x = 80;//stage.canvas.width/2;
    notebookC.y=1900;//stage.canvas.height*2+stage.canvas.height-50;
    content.addChild(notebookC);
    //notebookC.addChild(notebook);
    closeButton2=new createjs.Bitmap(loader.getResult('closeBt'));
    closeButton2.x=0;
    closeButton2.y=0;
    notebookC.addChild(closeButton2);
    closeButton2.addEventListener("click",closeNotebook);
    

    message_notebook = new createjs.Text("Pistas: Info");
    message_notebook.font ="36px BrotherDeluxe";
    message_notebook.color = "#99402D";
	message_notebook.x = window.innerWidth/100; 
    message_notebook.y = window.innerHeight/8;
    message_notebook.maxWidth=window.innerWidth;
    notebookC.addChild(message_notebook);
    for(var q in clues){
        notebookC.addChild(clues[q]);
    }
    notebookActive=true;
   // }
 //}
}

function closeNotebook(){
    notebookC.removeChild(closeButton2);
   // notebookC.removeChild(notebook)
    notebookC.removeChild(message_notebook);
    content.removeChild(notebookC);
    notebookActive=false;
}

function addClue(textClue,idWitness){
//n será el indice que guarda el numero de pistas ya apuntadas
//Se usa para posicionar calculando .y=n*40; por tamaño 36px
    clues[iClue] = new createjs.Text(textClue);
    clues[iClue].font ="36px BrotherDeluxe";
    clues[iClue].textAlign="left";
    if(idWitness==0)clues[iClue].color = "#99402D";
    else clues[iClue].color="black";
    clues[iClue].x = window.innerWidth/4; 
    clues[iClue].y = 2*window.innerHeight/8+iClue*window.innerHeight/8;
    clues[iClue].maxWidth=window.innerWidth;
    iClue++;
}