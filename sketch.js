  var towerImg,tower;
  var ghostRunner,ghostImage,ghostJumping;
  var doorImage,doorGroup,door;
  var climberImage,climbersGroup;
  var invisibleBlock,invisibleBlockGroup;
  var spookySound;
  var GameState='PLAY';


  function preload()
  {
  towerImg=loadImage("tower.png");
  ghostImage=loadImage("ghost-standing.png");
  climberImage=loadImage("climber.png");
  doorImage=loadImage("door.png");  
  spookySound=loadSound("spooky.wav"); 
  doorGroup=new Group();  
  climbersGroup=new Group();  
  invisibleBlockGroup=new Group();           
  
  }
  function setup()
  {
  createCanvas(600,600);  
  tower=createSprite(300,300,600,600); 
  tower.addImage("tower",towerImg)  ;
  tower.velocityY=3;  
  ghostRunner=createSprite(300,300,20,20);  
  ghostRunner.addImage("ghost",ghostImage) ;
  ghostRunner.scale=0.3;   
    
    
    
  }
 function draw()
  {
   background(0);  
ghostRunner.velocityY=ghostRunner.velocityY+0.5 ;  
  if(GameState==="PLAY")  
  {
    if(keyDown('left_Arrow'))  
  {
    ghostRunner.x=ghostRunner.x-3;     
  }   
    if(keyDown('Right_Arrow'))  
  {
    ghostRunner.x=ghostRunner.x+3;     
  }    
    if(keyDown('space'))  
  {
    ghostRunner.velocityY=-10;
  }  
       
  
   if(tower.y>600)
  {
     tower.y=300;     
  } 

   
   
   

    
   spawnDoors(); 
    
  if (climbersGroup.isTouching(ghostRunner))
  {
   ghostRunner.velocityY=0;      
    
  }    
   if(invisibleBlockGroup.isTouching(ghostRunner) || ghostRunner.y > 600){
      ghostRunner.destroy();
      GameState = "END"
    } 
  drawSprites();  
  } 
    
  if(GameState==='END'){
     
     stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
 
  }

  function spawnDoors()
  {
  if (frameCount%240===0)
  {
   door=createSprite(200,-50); 
   door.addImage("door",doorImage) ;
   var climber=createSprite(200,10);   
   climber.addImage("climber",climberImage) 
   climber.x=door.x;
   climber.velocityY=2; 
   climber.lifetime=800;
   climbersGroup.add(climber); 
   door.x=Math.round(random(120,400))
   door.velocityY=2; 
   door.lifetime=800;
   doorGroup.add(door);
   ghostRunner.depth=door.depth; 
   ghostRunner.depth+=1;
   invisibleBlock=createSprite(200,15);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   invisibleBlock.velocityY = 2; 
   invisibleBlock.x = door.x;
   invisibleBlock.lifetime = 800;
   invisibleBlockGroup.add(invisibleBlock); 
   invisibleBlock.debug=true; 
    
  } 
    
    
    
  }

    
    
  