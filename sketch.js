let playerX = 400;
let playerY = 400;
let playerSize = 30;
let playerSpeed = 8;

let chaosBallX = 200;
let chaosBallY = 200;
let chaosBallSize = 60;
let chaosBallSpeedX = 5;
let chaosBallSpeedY = 5;

let score = 0
let gameTime = 0
let isGameOver = false;
let BG = 100
let bounce = 0
let randomX = -1
let randomY = 1

let scoreUIX = 30
let scoreUIY = 30
let instructionsX = 490
let instructionsY = 580

function setup() {
  createCanvas(600, 600);
  

}

function draw() {
  //Game Over
  if (isGameOver) {
    drawGameOver();
    return;
  }

  //Background
  background(BG);

  //Update Game Time
  gameTime++;

  // Player Movement
  if (keyIsDown(LEFT_ARROW) && playerX > playerSize) {
    playerX -= playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) && playerX < width - playerSize) {
    playerX += playerSpeed;
  }
  if (keyIsDown(UP_ARROW) && playerY > playerSize) {
    playerY -= playerSpeed;
  }
  if (keyIsDown(DOWN_ARROW) && playerY < height - playerSize) {
    playerY += playerSpeed;
  }

  // Draw Player
  fill(255)
  circle(playerX, playerY, playerSize);

  // Draw Chaos Ball
  fill(0)
  circle(chaosBallX, chaosBallY, chaosBallSize);

  //Collision Checker
  let distance = dist(playerX, playerY, chaosBallX, chaosBallY);
  if (distance < (playerSize + chaosBallSize/2)) {
    isGameOver = true
  }

  // Chaos Ball Movement
  chaosBallX += chaosBallSpeedX;
  chaosBallY += chaosBallSpeedY;

  // Chaos Ball Directional Randomness
    chaosBallSpeedX += random(randomX, randomY);
  
  //Score Increaser
  let scoreNow = (score + gameTime) / 10

  // Wall Bounce + Difficulty + Background
  if (chaosBallX <= chaosBallSize/2 || chaosBallX >= width - chaosBallSize/2) {
    chaosBallSpeedX *= -1;
    bounce +=1
    if (bounce % 5 === 0) {
      BG += -5
      randomX += -0.2
      randomY += 0.2
    }
  }
  if (chaosBallY <= chaosBallSize/2 || chaosBallY >= height - chaosBallSize/2) {
    chaosBallSpeedY *= -1;
    bounce += 1
    if (bounce % 5 === 0) {
      BG += -5
      randomX += -0.2
      randomY += 0.2
    }
  }

  // Draw UI
  fill(200);
  textAlign(LEFT)
  textSize(20);
  text("Score: " + scoreNow, scoreUIX, scoreUIY);

  // Draw Intructions
  fill(200);
  textAlign(CENTER)
  textSize(15);
  text("Avoid the Chaos Ball!", instructionsX, instructionsY);

}

function drawGameOver() {
  let scoreNow = (score + gameTime) / 10

  background(0);
  fill(200);
  textAlign(CENTER);
  textSize(36);
  text("GAME OVER", width/2, height/2 - 40);
  textSize(24);
  text("Score: " + scoreNow, width/2, height/2);
  textSize(18)
  text("Press SPACE to Restart", width/2, height/2 + 40);

}

function keyPressed() {
  if (isGameOver && key === ' ') {
    //Restart Game
    isGameOver = false;
    gameTime = 0
    playerX = 400;
    playerY = 400;
    chaosBallX = 200;
    chaosBallY = 200;
    chaosBallSpeedX = 5;
    chaosBallSpeedY = 5;
    randomX = -1
    randomY = 1
    BG = 100
  }

}

