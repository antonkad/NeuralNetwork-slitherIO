let height = 480;
let width = 640;
let area;
let areaSize = width*20
let foods = [];


function setup() {
  createCanvas(width, height);

  slither = new slither(0, 0);
  for(let i = 0; i < 5000; i++){
    this.generateFood();
  }
  area = createVector(0,0);
}

function generateFood(){
  let x = random(-width*10, width*10);
  let y = random(-width*10, width*10);
  let pos = createVector(x, y);

  if(p5.Vector.dist(pos, createVector(0, 0)) >= (areaSize/2 - 20)) {
    this.generateFood()
  } else {
    foods.push(new food(x, y));
  }
}

function draw() {

  background(0);

  //translate(width / 2 - slither.position.x, height / 2 -slither.position.y)
  translate(width / 2, height / 2);
  //scale(10 / (slither.size));
  if(slither.body.length != 0){
    translate(-slither.body[0].position.x, -slither.body[0].position.y);
  }
  ellipse(area.x, area.y, areaSize, areaSize);
  slither.show();
  slither.update();

  for(let i = foods.length - 1 ; i >= 0 ; i-- ) {
    foodDist = p5.Vector.dist(slither.body[0].position, foods[i].position);
    if(foodDist < width){
      foods[i].show();
    }
    if(slither.eats(foods[i])){
      foods.splice(i, 1);
      this.generateFood();
    }

  }

}
