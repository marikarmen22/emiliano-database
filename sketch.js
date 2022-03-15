var Ball, database;
var position;


function setup(){
 
  //1.- se carga la base de datos
  database = firebase.database();
  console.log(database);
  createCanvas(300,300);

  Ball = createSprite(250,250,20,20);
  Ball.shapeColor = "red";

  //2.- Localizacion del Child
  var BallPosition = database.ref('ball/position');
  BallPosition.on("value", readPosition, showError);

  
}

function draw(){
  background(180);

  if(position!==undefined){
  
    if(keyDown(LEFT_ARROW)){
      //changePosition(-1,0);
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      //changePosition(1,0);
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      //changePosition(0,-1);
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      //changePosition(0,+1);
      writePosition(0,+1);
    }
    drawSprites();
  }
  }



function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  console.log(position.y);
  Ball.x = position.x;
  Ball.y = position.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}

function changePosition(x,y){

  Ball.x=Ball.x+x;
  Ball.y=Ball.y+y;
 
}