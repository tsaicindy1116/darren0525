let points = [[-2, 8], [2,8], [3,7],[4,8],[5,8],[6,7],[6,6],[5,5],[5,2],[4,1],[7,1],
[8,0],[8,-1],[7,-2],[5,-2],[5,-6], [4,-7], [4, -8],[3,-9],[1,-9],[0,-8],[1,-7], [1, -6],[-1,-6],
[-1,-7],[-1,-9],[-3,-9],[-4,-8],[-4,-7],[-5,-6],[-5,-2],[-7,-2],[-8,-1],[-8,0],[-7,1],[-4,1],[-5,2],[-5,5],[-6,6],
[-6,7],[-5,8],[-4,8],[-3,7],[-2,8], [2,8], [3,7],[4,8]]; //list資料
var fill_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a => "#" + a);
var line_colors = "dad7cd-a3b18a-588157".split("-").map(a => "#" + a);

// class Ball {
//   constructor() {
//     this.p = createVector(random(width), random(height)); // 随机初始位置
//     this.v = p5.Vector.random2D().mult(3); // 随机初始速度
//     this.r = 30;
//     this.fillColor = random(fill_colors);
//     this.lineColor = random(line_colors);
//   }

//   draw() {
//     push();
//     translate(this.position.x, this.position.y);
//     fill(this.fillColor);
//     stroke(this.lineColor);
//     strokeWeight(2);
//     ellipse(0, 0, this.radius * 2);
//     pop();
//   }

//   update() {
//     this.position.add(this.velocity);

//     if (this.position.x - this.radius < 0 || this.position.x + this.radius > width) {
//       this.velocity.x *= -1; // 如果球碰到左边或右边边缘，反转水平速度
//     }

//     if (this.position.y - this.radius < 0 || this.position.y + this.radius > height) {
//       this.velocity.y *= -1; // 如果球碰到上边或下边边缘，反转垂直速度
//     }
//   }

//   isHit(x, y) {
//     let d = dist(x, y, this.position.x, this.position.y);
//     return d < this.radius;
//   }
// }



//畫points所有點的物件定義
var ball
var balls = [];

let bullets = [];
let score = 0;
let gameDuration = 30; // 游戏持续时间（秒）
let startTime; // 游戏开始时间

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i = 0 ; i < 50 ; i = i + 1){//設定迴圈，if i+1，i=0~9共繞回圈10次；if i+2，i=0,2,4,6,8
    ball = new obj({}) //產生一個obj class元件
    balls.push(ball)//把ball的物件放入（push）到balls陣列內
  }
  startTime = millis(); // 记录游戏开始时间
}

function draw() {
  background(220);

  // 游戏时间计算
  let currentTime = millis();
  let elapsedTime = (currentTime - startTime) / 1000; // 转换为秒
  let remainingTime = gameDuration - elapsedTime;
  
  if (remainingTime <= 0) {
    gameOver();
    return;
  }

  // 绘制和更新球
  for (let ball of balls) {
    ball.draw(); // 绘制球
    ball.update(); // 更新球的位置

    for (let bullet of bullets) {
      if (ball.isHit(bullet.p.x, bullet.p.y)) {
        balls.splice(balls.indexOf(ball), 1);
        bullets.splice(bullets.indexOf(bullet), 1);
        score = score + 2;
      }
    }
  }

  // 绘制和更新子弹
  for (let bullet of bullets) {
    bullet.draw(); // 绘制子弹
    bullet.update(); // 更新子弹的位置
  }

  // 绘制得分和剩余时间
  textSize(50);
  fill("#645DD7");
  text("Score: " + score, 50, 50);
  text("Time: " + ceil(remainingTime), 50, 100);
}

function mousePressed() {
  bullets.push(new Bullet());
}

function gameOver() {
  // 游戏结束逻辑
  noLoop(); // 停止绘制
  background(0); // 显示结束画面
  textSize(50);
  fill("#FFFFFF");
  textAlign(CENTER, CENTER);
  text("Game Over", width/2, height/2);
  text("Final Score: " + score, width/2, height/2 + 50);
}
