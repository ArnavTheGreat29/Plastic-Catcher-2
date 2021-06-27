var net, netImage, gameOver, gameOverSound;
var fish, fishImage, fishImage2 , fishImage3, fishImage4;
var plastic,plasticImage,plasticImage2,plasticImage3, plasticImage4, dot;
var soundTrack;

var backgroundImg
var plasticGroup, fishGroup;
var plasticCatchSound;

var gameState = "START";
var score = 0;

localStorage["HighestScore"] = 0;



var startButton,startButtonImg ;
var restartButton, restartButtonImg;
var menuButton, menuButtonImg;


function preload(){
  netImage = loadImage("Images/Player/net.png")
  gameOver= loadImage("Images/Background/Game over.png")


  fishImage = loadAnimation("Images/Fish/Fish1/tile000.png","Images/Fish/Fish1/tile001.png","Images/Fish/Fish1/tile002.png","Images/Fish/Fish1/tile003.png")
  fishImage2 = loadAnimation("Images/Fish/Fish2/tile000.png","Images/Fish/Fish2/tile001.png","Images/Fish/Fish2/tile002.png","Images/Fish/Fish2/tile003.png","Images/Fish/Fish2/tile004.png","Images/Fish/Fish2/tile005.png","Images/Fish/Fish2/tile006.png","Images/Fish/Fish2/tile007.png","Images/Fish/Fish2/tile008.png","Images/Fish/Fish2/tile009.png","Images/Fish/Fish2/tile010.png","Images/Fish/Fish2/tile011.png")
  fishImage3 = loadAnimation("Images/Fish/Fish3/tile000.png","Images/Fish/Fish3/tile001.png","Images/Fish/Fish3/tile002.png","Images/Fish/Fish3/tile003.png","Images/Fish/Fish3/tile005.png","Images/Fish/Fish3/tile006.png","Images/Fish/Fish3/tile007.png","Images/Fish/Fish3/tile008.png")
  
  plasticImage  = loadImage("Images/Plastic/bottle.png")
  plasticImage2 = loadImage("Images/Plastic/plastic bag.png")
  plasticImage3 = loadImage("Images/Plastic/milk carton.png")
  plasticImage4 = loadImage("Images/Plastic/coffee.png")
 
  startButtonImg = loadImage("Images/Background/Button.png")
  menuButtonImg = loadImage("Images/Background/restartButton.png")
  restartButtonImg = loadImage("Images/Background/menu.png")
  dot = loadImage("Images/Background/dot.png")

  
backgroundImg= loadImage("Images/Background/Background2.jpg")
gameOverSound = loadSound("Sounds/Game Over.mp3") 
plasticCatchSound = loadSound("Sounds/correct.mp3") 
soundTrack = loadSound("Sounds/Soundtrack.mp3")

}
function setup(){
  createCanvas(1200,600);
  
  
  

  background(255)
  soundTrack.play()

  net = createSprite(300,300,20,20)
  net.addImage(netImage)
  net.scale = 0.25
  

  fishGroup = new Group();
  plasticGroup = new Group();


  startButton = createSprite(width/2,400,50,50)
  startButton.visible = false;

  restartButton = createSprite(width/2,500,50,50)
  restartButton.visible = false;

  menuButton = createSprite(width/2,400,50,50)
  menuButton.visible = false;
   
}




function draw(){
  background(backgroundImg)
  
  

 textSize(20)
  fill (0)
 text("SCORE: " + score,width/2 - 50,50)

 
 if( gameState === "START"){
  
  
  startButton.visible = true;
  if(mousePressedOver(startButton)) {

    startButton.changeImage(dot)
    startButton.visible = false;
    
    gameState = "PLAY"
  
}
  
  startButton.addImage(startButtonImg)
  startButton.scale = 0.25

  
}


 

  if( gameState === "PLAY"){
    startButton.changeImage(dot)
    
    

  createFish();
  createPlastic();

  net.y = mouseY;
  net.x = mouseX;

 if(plasticGroup.isTouching(net)){

     
     plasticCatchSound.play();
     plasticGroup.destroyEach()
   
  
    score = score + 1
    
 }
    if(fishGroup.isTouching(net)){

      fishGroup.scale = 1

      gameOverSound.play();
      fishGroup.destroyEach()
      
    
      
    gameState = "END";
  }
}
  
  
 
  if(gameState === "END"){

    if(localStorage["HighestScore"]<score){
      localStorage["HighestScore"] = score;
    }
    
  text("HIGHEST SCORE: " + localStorage["HighestScore"] , width/2 - 50,350)
    restartButton.addImage(restartButtonImg)
    restartButton.scale = 0.5
  
    menuButton.addImage(menuButtonImg)
    menuButton.scale = 0.5
   

    plasticGroup.destroyEach();
    fishGroup.destroyEach();

    restartButton.visible = true;
    menuButton.visible = true;

    if(mousePressedOver(restartButton)) {
  
      restartButton.changeImage(dot)
      restartButton.visible = false;
      menuButton.visible = false;
      
      gameState = "START"
      score = 0;
    
  }
   if(mousePressedOver(menuButton)) {

    
    menuButton.changeImage(dot)
    menuButton.visible = false;
    restartButton.visible = false;
  
    
    gameState = "PLAY"
    score = 0;
  
   }

    image(gameOver,400,0,400,400)

    
  }
  
  
  drawSprites()
}
 
function createFish(){
  


  if(frameCount%70 === 0){

  fish = createSprite(1200,random(20,580),40,40);
  fish.velocityX = (-(7+score)*2)/2;

 fish.addAnimation("fish1",fishImage)
fish.addAnimation("fish2", fishImage2)
fish.addAnimation("fish3", fishImage3)


  var rand = Math.round(random(1,3)) ;
    if(rand == 1){
      fish.changeAnimation("fish1");
      
    }if(rand == 2){
      fish.changeAnimation("fish2")
    }
    if(rand == 3){
      fish.changeAnimation("fish3")
      fish.scale = 0.5
    }
 fishGroup.add(fish)
  }
    
}
function createPlastic(){

   if(frameCount%170 == 0){
    plastic = createSprite(1200,random(20,580),40,40);
    plastic.velocityX = -((7+score)*2)/2;


  var rand2 = Math.round(random(1,4)) ;

    if(rand2 == 1){
      plastic.addImage(plasticImage); 
      plastic.scale = 0.5
     
    }
     if(rand2 == 2){
      plastic.addImage(plasticImage2); 
      plastic.scale = 0.05
      
    }

     if(rand2 == 3){
      plastic.addImage(plasticImage3); 
      plastic.scale = 0.25
      
    }
     if(rand2 == 4){
      plastic.addImage(plasticImage4); 
      plastic.scale = 0.025
      
    }
    
    plasticGroup.add(plastic)
  }
   
}
