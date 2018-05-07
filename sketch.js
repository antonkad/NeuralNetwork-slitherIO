let height = 480;
let width = 640;
let foods = [];

function setup() {
  createCanvas(width, height);
  slither = new slither(0, 0);
  for(let i = 0; i < 50; i++){
    let x = random(-width, width);
    let y = random(-height, height);
    foods[i] = new food(x, y);
  }
}

function draw() {
  background(0);

  //translate(width / 2 - slither.position.x, height / 2 -slither.position.y)
  translate(width / 2, height / 2);
  //scale(10 / (slither.size));
  translate(-slither.position.x, -slither.position.y);

  slither.show();
  slither.update();

  for(let i = foods.length - 1 ; i >= 0 ; i-- ) {
    foods[i].show();
    if(slither.eats(foods[i])){
      foods.splice(i, 1);
    }

  }
}
