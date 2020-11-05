var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup

var survivalTime
var score

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  //ground.velocityX=-4;
   ground.x = ground.width /2;
  
  survivalTime=0;
  score=0;

   bananaGroup=createGroup();
   obstaclesGroup = createGroup();
  
}


function draw() {
  //createCanvas(600,600);
  background("white");
  stroke("white");
  textSize(20);
  fill("white");
 text("Score:"+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,100,50);
  
  
   if(ground.x<0){
    ground.x = ground.width/2;
      }
  if(gameState===PLAY){
     ground.velocityX=-(4+(score/100));
      
    score=score + Math.round(getFrameRate()/60);
     if(keyDown("space")&& monkey.y >=100) {
        monkey.velocityY = -12;
    }
 monkey.velocityY=monkey.velocityY+0.8;
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
     if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
    
    }
  if(gameState===END){
    ground.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
  }
  
  spawnBanana();
  spawnObstacle();
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function spawnBanana(){
  if(frameCount % 80 === 0){
     
     banana=createSprite(350,250,10,10) ; 
    banana.y= random(120,200);
    banana.velocityX=-(4+(score/100));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=100;
    bananaGroup.add(banana)
      
 }
}

function spawnObstacle(){
  if(frameCount % 110 === 0 ){
    obstacle=createSprite(350,330,20,20);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX=-(4+(score/100));
    obstacle.scale=0.1;
    obstacle.lifetime=200;
    obstaclesGroup.add(obstacle);
    
    
  }
}









