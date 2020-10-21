var banimg, obsimg, bg, bgimg1, monkey, monimg1, invsground;
var bananagroup, obsgroup, banana,obs, obsimg, banimg;
var score = 0;
var lives = 3;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload(){
bgimg1 = loadImage("jungle.jpg");
monimg1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
obsimg = loadImage("stone.png");
banimg = loadImage("banana.png");
}

function setup() {
  createCanvas(800, 300);

  bg = createSprite(400, 150, 800, 300);
  bg.addImage("bgimg1", bgimg1);
  
  monkey = createSprite(100, 260, 20, 20);
  monkey.addAnimation("monimg1", monimg1);
  monkey.scale = 0.1;
  
  invsground = createSprite(400, 300, 800, 20);
  invsground.visible = false;

  bananagroup = new Group();
  obsgroup = new Group();
}

function draw() {
  background("black");
  if (camera.x%100===0) {
    bg.x = camera.x;
  }
  camera.x = camera.x+1;
  monkey.x = camera.x-300;

  if(gamestate===PLAY){
    if(keyDown("space") && monkey.y >= 229){
    monkey.velocityY = -16;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    for(var i=0;i<bananagroup.length;i++){
    if(monkey.isTouching(bananagroup.get(i))){
      bananagroup.get(i).destroy();
      score = score+2;
    }                                
  }

   for(var j=0;j<obsgroup.length;j++){
    if(monkey.isTouching(obsgroup.get(j))){
      obsgroup.get(j).destroy();
      monkey.scale = 0.1;
      score = 0;
      lives = lives-1;
    }                                
  }

    switch(score){
      case 10: monkey.scale = 0.12;
      break;
      case 20: monkey.scale = 0.14;
      break;
      case 30: monkey.scale = 0.16;
      break;
      case 40: monkey.scale = 0.18;
      break;
      default: break;
    }
     }
  
  if(lives===0||lives<0&&gamestate===PLAY){
    gamestate=END;
  }
  
  if(gamestate === END){
    bananagroup.destroyEach();
    obsgroup.destroyEach();
    invsground.visible = false;
    monkey.visible = false;
    bg.visible = false;
    fill("white");
    text("Press r to restart", camera.x+100, 250);
    }

  if(keyDown("r")&&gamestate===END){
    gamestate = PLAY;
    monkey.visible = true;
    lives = 3;
    score = 0;
    bg.visible = true;
  }
  
  monkey.collide(invsground);

  spawnobs();
  spawnban();
  drawSprites();

  if(gamestate===PLAY){
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: "+score, camera.x+100, 50);
  text("Lives: "+lives, camera.x+100, 80);
}
}

function spawnobs() {
  if (frameCount % 100 === 0&&gamestate===PLAY) {
    obs = createSprite(camera.x+400,280,40,10);
    obs.scale = 0.15;
    obs.velocityX = -4;
    obs.addImage("obsimage",obsimg);
    obs.lifetime = 200;
    obsgroup.add(obs);
  }
}

function spawnban() {
  if (frameCount % 80 === 0&&gamestate===PLAY) {
    banana = createSprite(camera.x+400,280,40,10);
    var rand = random(120, 200);
    banana.y = rand;
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.addImage("banimage",banimg);
    banana.lifetime = 200;
    bananagroup.add(banana);
  }
}