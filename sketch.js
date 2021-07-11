var banana;//player
var monkey;//obstale
var platformGroup, monkeyGroup;
var bananaAnimation, monkeyAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
var score = 0;
function preload()
{
  bananaAnimation=loadAnimation("Banana.png");
  monkeyAnimation=loadAnimation("Monkey.png");
  wallAnimation=loadAnimation("wall.png");
  groundAnimation=loadAnimation("ground.png");  
  flagAnimation=loadAnimation("Flag.png");
}

function setup() 
{
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var xPosition = 0;
  var platform;
  var gap;
  
  //creating a player 
  banana = new Banana();
  
  //creating a group
  platformGroup= createGroup();
  monkeyGroup=createGroup();
  //adding platforms to stand for
  for (var i=0;i<20;i++)
	 {
     frameRate(30);
      platform = new Platform(xPosition);
      platformGroup.add(platform.spt);
      gap=random([0,0,0,0,200]);
      xPosition = xPosition + platform.spt.width + gap; 
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(xPosition);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      monkey=new Monkey(xPosition);
      monkeyGroup.add(monkey.spt);
      }
  }
  flag=createSprite(xPosition-150,height-320);
  flag.addAnimation("flag",flagAnimation);
  flag.scale=0.09;
  flag.setCollider("rectangle",0,0,1100,6520);
 
}

function draw()
 {
  background('skyblue');
  translate(-banana.spt.x + width/2 , 0);

  text("Score: " + score, banana.spt.x + 450, 100);
  fill("yellow");

  if(gameState==PLAY)//Play state
  {  
        banana.applyGravity();
        banana.spt.collide(platformGroup);
        if (keyDown("left"))  
        { 
          banana.moveLeft();
        }
        if (keyDown("right")) 
        { 
          banana.moveRight();
        }
        if (keyDown("up") && banana.spt.velocityY===0) 
        {
          banana.jump();
        }
        if(monkeyGroup.isTouching(banana.spt)||banana.spt.y > height)
        {
          gameState = LOSE;
        }
        
        if(flag.isTouching(banana.spt))
        {
            gameState = WIN;
        }
        
   }


if(gameState === LOSE)
{
  textSize(30);
  text("GAME OVER",banana.spt.x,350);
  monkeyGroup.destroyEach();
  banana.spt.setVelocity(0,0);
  banana.spt.pause();
}

if(gameState === PLAY)
{
  textSize(30);
  score = score + 10;

}

if(gameState === WIN)
{
  textSize(30);
  text("CONGRATS! YOU SAVED THE BANANA!!!",banana.spt.x,390);
  monkeyGroup.destroyEach();
  banana.spt.setVelocity(0,0);
  banana.spt.pause();
}
 
   drawSprites();
}
