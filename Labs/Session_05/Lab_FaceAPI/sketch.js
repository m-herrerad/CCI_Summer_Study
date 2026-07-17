let faceapi;
let video;
let detections;
let maskUp;
let maskDown;

let acidParticles = [];

const detectionOptions = {
  withLandmarks: true,
  withDescriptors: false,
};

let mouthOpenThreshold = 0.4; // AJUSTA esto según lo que veas en consola
let maxJawShift = 40; // cuánto baja maskDown cuando la boca está completamente abierta

async function setup() {
  createCanvas(360, 270);
  imageMode(CENTER);

  maskUp = await loadImage("Labs/Session_05/Lab_1/assets/Face.png");
  maskDown = await loadImage("Labs/Session_05/Lab_1/assets/Mouth.png");

  video = createCapture(VIDEO);
  video.size(width, height);

  faceapi = ml5.faceApi(video, detectionOptions, modelReady);
  textAlign(RIGHT);
}

function modelReady() {
  console.log("ready!");
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  if (err) {
    console.log(err);
    return;
  }
  detections = result;

  background(0);
  //image(video, width/2, height/2, width, height);

  if (detections && detections.length > 0) {
    drawMonsterMask(detections[0]);
  }

  faceapi.detect(gotResults);
}

function getPartCenter(part) {
  let sumX = 0, sumY = 0;
  for (let p of part) {
    sumX += p._x;
    sumY += p._y;
  }
  return { x: sumX / part.length, y: sumY / part.length };
}

function getMouthOpenRatio(mouth) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let p of mouth) {
    minX = min(minX, p._x);
    maxX = max(maxX, p._x);
    minY = min(minY, p._y);
    maxY = max(maxY, p._y);
  }
  let mouthWidth = maxX - minX;
  let mouthHeight = maxY - minY;
  return mouthHeight / mouthWidth;
}

function drawMonsterMask(detection) {
  const parts = detection.parts;
  const box = detection.alignedRect._box;

  const leftEyeCenter = getPartCenter(parts.leftEye);
  const rightEyeCenter = getPartCenter(parts.rightEye);
  const noseCenter = getPartCenter(parts.nose);
  const mouthCenter = getPartCenter(parts.mouth);

  const eyesCenter = {
    x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
    y: (leftEyeCenter.y + rightEyeCenter.y) / 2
  };

  const mouthOpenRatio = getMouthOpenRatio(parts.mouth);
  const isMouthOpen = mouthOpenRatio > mouthOpenThreshold;

  console.log(mouthOpenRatio); // BÓRRALO una vez calibres tu umbral

  // qué tanto "cae" la mandíbula, en proporción a qué tan abierta está la boca
  let jawShift = map(constrain(mouthOpenRatio, 0.15, 0.7), 0.15, 0.7, 0, maxJawShift);

  // escala según el tamaño real de la cara detectada, para que la máscara
  // crezca/encoja si te acercas o alejas de la cámara
  let scale = box._width / 1000; // 140 = ancho de referencia; ajústalo probando

  // 1. maskDown se dibuja PRIMERO -> queda debajo de todo lo demás
  let maskDownW = maskDown.width * scale;
  let maskDownH = maskDown.height * scale;
  image(maskDown, mouthCenter.x, (mouthCenter.y - 30) + jawShift, maskDownW, maskDownH);

  // 2. gotas de ácido, solo si la boca está detectada como abierta
   if (isMouthOpen) {
    spawnAcidParticles(mouthCenter, jawShift);
  }
  updateAndDrawAcid();

  // 3. maskUp se dibuja AL FINAL -> tapa la parte de arriba, incluyendo
  //    la parte superior de maskDown cuando la boca está cerrada
  let maskUpW = maskUp.width * scale;
  let maskUpH = maskUp.height * scale;
  image(maskUp, eyesCenter.x, noseCenter.y, maskUpW, maskUpH);
}

function spawnAcidParticles(mouthCenter, jawShift) {
  // solo agrega 1-2 partículas nuevas por frame, no una lluvia entera de golpe
  if (random() < 0.6) {
    acidParticles.push({
      x: mouthCenter.x + random(-8, 8),
      y: mouthCenter.y + jawShift,
      vx: random(-10, 10),  // velocidad horizontal, hacia cualquier lado
      vy: random(-10, 10),       // velocidad vertical, hacia abajo (como escupiendo/goteando)
      size: random(10, 30),
      life: 255 // se usa como opacidad, va bajando hasta desaparecer
    });
  }
}

function updateAndDrawAcid() {
  noStroke();
  for (let i = acidParticles.length - 1; i >= 0; i--) {
    let p = acidParticles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15; // gravedad leve, para que acelere al caer
    p.life -= 6;

    fill(80, 200, 80, p.life);
    circle(p.x, p.y, p.size);

    if (p.life <= 0) {
      acidParticles.splice(i, 1); // elimina la partícula ya desvanecida
    }
  }
}