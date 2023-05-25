class Bullet {
    constructor() {
      this.p = createVector(mouseX, mouseY);
      this.v = createVector(0, -5); // 固定速度
      this.size = 5
      this.color = "#645DD7";
    }
  
    draw() {
        push()
            translate(this.p.x,this.p.y)
            fill(this.color);
            noStroke();
            //ellipse(this.p.x, this.p.y, this.r * 2);
            scale(1,-1)//把星星反過來 
            beginShape()//星星子彈
                vertex(0*this.size,3*this.size)
                vertex(1*this.size,1*this.size)
                vertex(3*this.size,1*this.size)
                vertex(1*this.size,0*this.size)
                vertex(2*this.size,-2*this.size)
                vertex(0*this.size,-1*this.size)
                vertex(-2*this.size,-2*this.size)
                vertex(-1*this.size,0*this.size)
                vertex(-3*this.size,1*this.size)
                vertex(-1*this.size,1*this.size)
                vertex(0*this.size,3*this.size)
            endShape()  
        pop()
    }
  
    update() {
      this.p.add(this.v);
    }
  }