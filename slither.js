class slither {

  constructor(x, y) {
    this.size = 50;
    this.length = 10;
    this.body = []
    let head = new disk(x, y);
    this.body[0] = head;
  }

  update() {
    let velocity = createVector(mouseX-width/2, mouseY-height/2);
    velocity.setMag(3);
    this.position.add(velocity);
  }

  show(){
     fill(255);
     this.drawCircles(this.position.x, this.position.y)
  }

  eats(food) {
    let dist = p5.Vector.dist(this.position, food.position);
    if (dist < (this.size + food.size)/2) {
      return true;
    } else {
      return false;
    }
  }
  disk(x, y){
    this.position = createVector(x, y)
  }
  drawCircles(x, y){
    let offset = 0;
    for(let i = 0; i < this.length; i++){
      ellipse(x, y + offset, this.size, this.size);
      offset += 15;
    }

  }
}
