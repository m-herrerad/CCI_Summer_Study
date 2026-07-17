// ANNOYING DRAWING TOOL

// Variables

let drawLayer;
let bgColor;

let buttonCount = 5;
let canvasWidth = 800;
let spacing = canvasWidth/buttonCount;
let offset = spacing * 0.5;

let buttonColors = ['red', 'yellow', 'blue', 'white', 'black'];
let currentColor;

let slider;

let strokeOffsetX = 0; 
let strokeOffsetY = 0;

//Similar conditions to Lab_02

function setup() {
  createCanvas(1080, 920);

  slider = createSlider(0, 100);
  slider.position(850, 900);
  slider.size(200);

  drawLayer = createGraphics(1080, 920);
  drawLayer.clear();

  bgColor = color(random(255), random(255), random(255));
  currentColor = getRandomColor();

}

function draw() {
  background(bgColor);
  image(drawLayer, 0, 0);

  noStroke();
  fill(150);
  rect(0, 860, width, height - 860);

  for (let i = 0; i < buttonCount; i++) {
    drawButton(i * spacing + offset, i);
  }
}

function drawButton(x, i) {
  noStroke();
  fill(buttonColors[i]);
  noStroke();
  circle(x, height - 30, 50);
}

function mousePressed() {
  for (let i = 0; i < buttonCount; i++) {
    let bx = i * spacing + offset;
    let by = height - 30;
    if (dist(mouseX, mouseY, bx, by) < 15) {
      currentColor = getRandomColor(); // Random color, basically the buttons are for decoration
      return;
    }
  }

  // It sets an angle and direction randomly, it offsets the trace from the position of the mouse so you never know where the trace is going to really appear
  let angle = random(TWO_PI);
  let magnitude = random(100, 200);
  strokeOffsetX = cos(angle) * magnitude;
  strokeOffsetY = sin(angle) * magnitude;

}

function mouseDragged() {
  let angle = random(TWO_PI);
  let magnitude = random(10, 50);
  let offsetX = cos(angle) * magnitude;
  let offsetY = sin(angle) * magnitude;
  let s = slider.value();

  drawLayer.noStroke();
  drawLayer.fill(currentColor);
  drawLayer.circle(mouseX + strokeOffsetX, mouseY + strokeOffsetY, s);
}

function keyPressed() {
  if (keyCode === 32) {
    bgColor = getRandomColor();
  } else if (keyCode === 8) {
    drawLayer.clear();
  }
}

function getRandomColor() {
  return color(random(255), random(255), random(255));
}
