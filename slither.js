class slither {

  constructor(x, y) {
    this.size = 50;
    this.length = 10;
    this.body = [];
    this.initSnake(x, y);
  }

  initSnake(x, y) {
    console.log("2")
    let offset = 0;
    for(let i = 0; i < 5*this.length; i++){
      this.body[i] = new disk(x, y+offset);
      offset += 2;
    }
  }

  update() {
    //x1 = x0cos(θ) – y0sin(θ)
    //y1 = x0sin(θ) + y0cos(θ)
    ellipse(mouseX-width/2, mouseY-height/2, 20, 20);

    //https://math.stackexchange.com/questions/270194/how-to-find-the-vertices-angle-after-rotation
    let angleCap = 35;
    let xa = (this.body[25].position.x - this.body[0].position.x) * cos(angleCap) - (this.body[25].position.y - this.body[0].position.y) * sin(angleCap) + this.body[0].position.x;
    let ya = (this.body[25].position.x - this.body[0].position.x) * sin(angleCap) + (this.body[25].position.y - this.body[0].position.y) * cos(angleCap) + this.body[0].position.y;

    let xb = (this.body[25].position.x - this.body[0].position.x) * cos(-angleCap) - (this.body[25].position.y - this.body[0].position.y) * sin(-angleCap) + this.body[0].position.x;
    let yb = (this.body[25].position.x - this.body[0].position.x) * sin(-angleCap) + (this.body[25].position.y - this.body[0].position.y) * cos(-angleCap) + this.body[0].position.y;

    let vecta = createVector(xa, ya);
    let vectb = createVector(xb, yb);
    let mouseVect = createVector((mouseX+this.body[0].position.x) - width/2, (mouseY+this.body[0].position.y)- height/2);

    ellipse(xa, ya, 10, 10);
    ellipse(xb, yb, 10, 10);

    let mousePos = createVector((mouseX+this.body[0].position.x) - width/2, (mouseY+this.body[0].position.y)- height/2);
    let angleBetween = this.find_angle(this.body[25].position, this.body[0].position, mousePos);
    //ellipse(xa-this.body[0].position.x, ya-this.body[0].position.y, 20, 20);
    let velocity;
    if(degrees(angleBetween).toFixed(2) < 135){

      if(p5.Vector.dist(vecta, mouseVect) > p5.Vector.dist(vectb, mouseVect)){
        velocity = createVector(xb - this.body[0].position.x, yb - this.body[0].position.y);
      } else {
        velocity = createVector(xa - this.body[0].position.x, ya - this.body[0].position.y);
      }
    } else{
      velocity = createVector(mouseX-width/2, mouseY-height/2);
    }
    velocity.setMag(3);
    this.body[0].position.add(velocity);

    line((mouseX+this.body[0].position.x) - width/2, (mouseY+this.body[0].position.y)- height/2, this.body[0].position.x, this.body[0].position.y);
    line(this.body[25].position.x, this.body[25].position.y, this.body[0].position.x, this.body[0].position.y);

    ellipse(this.body[25].position.x, this.body[25].position.y, 10, 10);

    this.body.unshift(new disk(this.body[0].position.x, this.body[0].position.y));
    if(this.body.length > 5*this.length){
      this.body.pop();
    }
  }

  find_angle(A,B,C) {
      var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
      var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
      var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
      return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
  }

  show(){
     fill(255);
     this.drawCircles();
  }

  eats(food) {
    let dist = p5.Vector.dist(this.body[0].position, food.position);
    if (dist < (this.size + food.size)/2) {
      return true;
    } else {
      return false;
    }
  }

  drawCircles(){
    if(this.body.length != 0){
      for(let i = this.body.length - 1; i >= 0; i-=5){
        ellipse(this.body[i].position.x, this.body[i].position.y, this.size, this.size);
      }
    }
  }
}

class disk{
  constructor(x, y) {
    this.position = createVector(x,y);
  }
}
