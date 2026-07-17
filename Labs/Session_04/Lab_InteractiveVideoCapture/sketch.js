// VIDEO EDITOR

// Variables

let capture;
let filterName;

let buttonCount = 10;
let canvasWidth = 800;
let spacing = canvasWidth/buttonCount;
let offset = spacing * 0.5;

let buttonColors = ['brown', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'black'];
let currentColor;

let currentfilterIndex = 0;
let filterIndex;
let filterLength;

let slider;

let drawLayer;

function setup() {
  createCanvas(1080, 920);
  background(150);

  capture = createCapture(VIDEO);
  capture.size(1080, 880);
  capture.hide();

  slider = createSlider(0, 50);
  slider.position(900, 910);
  slider.size(150);

  // new layer to be able to see the trace, suggested by Claude when the code runned fine but you couldn't see the trace of your drawing
  drawLayer = createGraphics(1080, 880); 
  drawLayer.clear();

  filterName = [OPAQUE, INVERT, GRAY, THRESHOLD, POSTERIZE, BLUR];
  filterLength = filterName.length - 1;

}


function draw() {

  image(capture, 0, 0, 1080, 880);
  filter(filterName[currentfilterIndex]);

  image(drawLayer, 0, 0);

  noStroke();
  fill(150);
  rect(0, 880, width, height - 880);

  for (let i = 0; i < buttonCount; i++) {
    drawButton(i * spacing + offset, i);
  }
  
}

function drawButton (a, i) { 
    noStroke(); 
    fill(buttonColors[i]); 
    circle(a, 900, 20);
    
}

function mousePressed() {
  for (let i = 0; i < buttonCount; i++) {
    let bx = i * spacing + offset;
    let by = 900;
    if (dist(mouseX, mouseY, bx, by) < 10) {
      currentColor = buttonColors[i];
      return; // if you press the button for that color you don't draw that same trace
    }
  }
}

function mouseDragged(){
  if (mouseY < 880) {
    let s = slider.value();

    drawLayer.noStroke();
    drawLayer.fill(currentColor); 
    drawLayer.circle(mouseX, mouseY, s); // It draws in that 'top' layer so you can see it
    
  }
}


function keyPressed() {
  // The filter changes and it passes through all the filters, once it arrives to the last one it "reiniciates"
  if (key === 'f' &&  currentfilterIndex < filterLength) {
    filterIndex = currentfilterIndex + 1;
    currentfilterIndex = filterIndex;
  } else {
    currentfilterIndex = 0;
  }

  // It deletes all the work with the "delete" key
  if (keyCode === 8) {
    drawLayer.clear(); 
  }

}
