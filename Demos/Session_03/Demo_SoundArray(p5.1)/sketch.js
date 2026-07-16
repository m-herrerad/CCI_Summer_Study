// Sound code in p5.V.1

const maxDataCount = 10;
const canvasWidth = 400;
const spacing = canvasWidth/maxDataCount;
const offset = spacing * 0.5;

let sound;
let amp;
let canvas;
let soundArray = [];


// this function only works in p5.1!!!
// For p5.2 you have to use async/await
function preload(){
  canvas = createCanvas(400, 400);
  sound = loadSound('/Session_03/assets/this_dot.mp3');
  
}

function setup() {
  createCanvas(400, 400);
  canvas.mouseClicked(toggleSound);

  amp = new p5.Amplitude();

  //frameRate(5)
  
}

function draw() {
  background(50);

  translate(0, height/2);

  let level = amp.getLevel();

  //add the amplitude reading at the end of the
  soundArray.push(level);
  if(soundArray.length > maxDataCount){
    //Shift is a js method that removes the first element from the array
    soundArray.shift();
  }

  fill('lightgreen');
  noStroke();
  
  for(let i=0; i < soundArray.length; i++){
    let circleX = i * spacing + offset;
    let circleY = map(soundArray[i], 0, 1, 100, -200);
    circle(circleX, circleY, 20);
  }
  
}

function toggleSound(){
  if(sound.isPlaying() === true){ //double '=' compares values, triple '=' compares other data types?
    sound.pause();
  } else {
    sound.play();
  }
}
