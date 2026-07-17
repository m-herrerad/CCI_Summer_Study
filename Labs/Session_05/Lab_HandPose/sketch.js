let handPose;
let video;
let hands = [];

let circleColor; 
let isPinching = false; 
let pinchThreshold = 40; // distancia en píxeles entre pulgar e índice para considerar "pellizco"

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);

  circleColor = color(255, 255, 255); 
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let handedness = hand.handedness.toLowerCase();

    // Invertidos porque la camara no está tipo espejo
    if (handedness === "left") {
      handleRightHand(hand);
    } else if (handedness === "right") {
      handleLeftHand(hand);
    }
  }
}

function getPalmCenter(hand) {
  // promedio de muñeca + las 4 bases de los dedos = un punto estable en el centro de la palma
  let indices = [0, 5, 9, 13, 17];
  let sumX = 0, sumY = 0;
  for (let idx of indices) {
    sumX += hand.keypoints[idx].x;
    sumY += hand.keypoints[idx].y;
  }
  return { x: sumX / indices.length, y: sumY / indices.length };
}

function handleLeftHand(hand) {
  let thumbTip = hand.keypoints[4];
  let indexTip = hand.keypoints[8];
  let palmCenter = getPalmCenter(hand);

  let pinchDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);
  let currentlyPinching = pinchDist < pinchThreshold;

  // detecta el flanco de subida: el frame exacto en que pasa de "no pellizcando" a "pellizcando"
  if (currentlyPinching && !isPinching) {
    circleColor = color(random(255), random(255), random(255));
  }
  isPinching = currentlyPinching;

}

function handleRightHand(hand) {
  let wrist = hand.keypoints[0];
  let palmCenter = getPalmCenter(hand);

  // "qué tan abierta" = distancia promedio de la muñeca a cada punta de dedo
  let tips = [4, 8, 12, 16, 20];
  let totalDist = 0;
  for (let idx of tips) {
    totalDist += dist(wrist.x, wrist.y, hand.keypoints[idx].x, hand.keypoints[idx].y);
  }
  let avgDist = totalDist / tips.length;

  // normaliza contra el tamaño de la mano (muñeca a base del dedo medio),
  let handSize = dist(wrist.x, wrist.y, hand.keypoints[9].x, hand.keypoints[9].y);
  let opennessRatio = avgDist / handSize;

  // mano cerrada (puño) da un ratio bajo (~1.0-1.3), mano abierta da uno alto (~2.0-2.5)
  circleSize = map(opennessRatio, 1.0, 2.5, 0, 800, true); // true = constrain automático

  noStroke();
  fill(circleColor);
  circle(palmCenter.x, palmCenter.y, circleSize);
}

function gotHands(results) {
  hands = results;
}
