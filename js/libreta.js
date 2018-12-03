console.log('loaded Notebook(libreta.js)');
var notebook;
var message_notebook;
var closeButton2;
var notebookActive=false;

function loadNotebook(){
 console.log("Opening notebook..."); 
 if(stage){


    notebook=new createjs.Container();
    notebook.bmp=new createjs.Bitmap(loader.getResult('bgNotebook'));
    notebook.x = stage.canvas.width/2;
    notebook.y=stage.canvas.height*2+stage.canvas.height-50;
    content.addChild(notebook);
    notebook.addChild(notebook.bmp);
    closeButton2=new createjs.Bitmap(loader.getResult('closeBt'));
    closeButton2.x=0;//window.innerWidth;
    closeButton2.y=0;
    notebook.addChild(closeButton2);
    closeButton2.addEventListener("click",closeNotebook);
    

    message_notebook = new createjs.Text("Pistas: Info");
    message_notebook.font ="36px BrotherDeluxe";
    message_notebook.color = "#99402D";
	message_notebook.x = window.innerWidth/100; 
    message_notebook.y = window.innerHeight/8;//200
    message_notebook.maxWidth=window.innerWidth;
    notebook.addChild(message_notebook);

    notebookActive=true;
  
 }
}

function closeNotebook(){
    notebook.removeChild(closeButton2);
    notebook.removeChild(notebook.bmp)
    notebook.removeChild(message_notebook);
    content.removeChild(notebook);
    notebookActive=false;
}