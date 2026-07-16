// Sound code in p5.V.1

let sound;
let amp;
let canvas;


// this function only works in p5.1!!!
// For p5.2 you have to use async/await
function preload(){
  sound = loadSound('/Session_03/assets/this_dot.mp3');
  
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.mouseClicked(toggleSound);

  amp = new p5.Amplitude();

  frameRate(5)
  
}

function draw() {
  background(50);

  let level = amp.getLevel();
  let circleSize = map(level, 0, 1, 50, 300);

  fill('lightgreen');
  noStroke();
  circle(200,200, circleSize);
  
}

function toggleSound(){
  if(sound.isPlaying() === true){ //double '=' compares values, triple '=' compares other data types?
    sound.stop();
  } else {
    sound.play();
  }
}
