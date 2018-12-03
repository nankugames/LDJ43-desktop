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
    /*var imageaux=new Image(loader.getResult('bgNotebook'));
    closeButton2.x=imageaux.width;
    console.log(imageaux.width);*/
    closeButton2.x=1000;
    closeButton2.y=0;
    notebook.addChild(closeButton2);
    closeButton2.addEventListener("click",closeNotebook);
    

    message_notebook = new createjs.Text("Pistas: Info");
    message_notebook.font ="36px BrotherDeluxe";
    message_notebook.color = "#99402D";
	message_notebook.x = stage.canvas.width/100; 
    message_notebook.y = 200; 
    message_notebook.maxWidth=stage.canvas.width;
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