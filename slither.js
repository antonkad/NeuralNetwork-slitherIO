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
    let velocity = createVector(mouseX-width/2, mouseY-height/2);
    velocity.setMag(3);
    /*
    let a = p5.Vector.dist(this.body[0].position, this.body[49].position);
    let b = p5.Vector.dist(this.body[25].position, this.body[0].position);
    let c = p5.Vector.dist(this.body[25].position, this.body[49].position);
    let angle = (-sq(a) + sq(b) + sq(c))/(2*b*c);
    console.log(angle)
    */
    this.body[0].position.add(velocity);
    this.body.unshift(new disk(this.body[0].position.x, this.body[0].position.y));
    if(this.body.length > 5*this.length){
      this.body.pop();
    }
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
