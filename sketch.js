var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost= createSprite(200,200,50,50)
  ghost.addImage(ghostImg);
  ghost.scale=0.45
  doorsGroup=new Group ()
}

function draw() {
  background(200);
  
  
    
    if(gameState=="play"){
      if(tower.y > 400){
        tower.y = 300}
        if(keyDown("space")){
          ghost.velocityY=-10
        }
        if(keyDown("left_arrow")){
          ghost.x=ghost.x-4
        }
        if(keyDown("right_arrow")){
          ghost.x=ghost.x+4
        }
        ghost.velocityY = ghost.velocityY + 0.8

        spawn()
        if(ghost.y>600){
          gameState="end"
        }
    }
    if(gameState=="end"){
      tower.destroy()
      ghost.destroy()
      doorsGroup.destroyEach()
      textSize(50)
      fill("red")
      text("game over",300,300)
    }
    drawSprites();
}
function spawn(){
  if (frameCount % 60 === 0) {
    var door = createSprite(200,0,20,20);
    door.x = Math.round(random(80,400));
    door.addImage(doorImg);
    door.scale = 1;
    door.velocityY = 3;
    
     //assign lifetime to the variable
    door.lifetime = 200;
    
    //adjust the depth
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //add each cloud to the group
    doorsGroup.add(door);
  }
}