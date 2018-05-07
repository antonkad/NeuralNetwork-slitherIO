class food {

  constructor(x, y) {
    let posibleSizes = [1,2,3,4]
    this.weight = random(posibleSizes)
    this.size = 10 + 2 * this.weight;
    this.position = createVector(x, y)
  }

  show(){
     fill(255);
     ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
