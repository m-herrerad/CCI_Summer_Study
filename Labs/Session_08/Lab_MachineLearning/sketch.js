// Classifier Variable
let classifier;
// Model URL
// You can put your own model here from 
let imageModelURL = "https://teachablemachine.withgoogle.com/models/mXLJwCpOP/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

//Sounds
let sound1;
let sound2;
let sound3;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');

  sound1 = loadSound('./assets/Sound_1.mp3');
  sound2 = loadSound('./assets/Sound_2.mp3');
  sound3 = loadSound('./assets/Sound_3.mp3');
  
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  console.log(results[0]);
  label = results[0].label;

  if (label == "Sound 1") {
    if (!sound1.isPlaying()) sound1.play();
    sound2.stop();
    sound3.stop();
  } else if (label == "Sound 2") {
    sound1.stop();
    if (!sound2.isPlaying()) sound2.play();
    sound3.stop();
  } else if (label == "Sound 3") {
    sound1.stop();
    sound2.stop();
    if (!sound3.isPlaying()) sound3.play();
  } else if (label == "No sound") {
    sound1.stop();
    sound2.stop();
    sound3.stop();
  }
  
  // Classifiy again!
  classifyVideo();

}

//function toggleSound(){
  
//}