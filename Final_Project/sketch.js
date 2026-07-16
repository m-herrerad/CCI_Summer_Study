// Global Variables

// What image are people seeing at that moment
let EstadoActual = 0;

// Variables that determinate the different images that the screen could be showing
let Intro = 0;
let Instructions = 1;
let Camera = 2;
let Time = 3;
let Recording = 4;
let Download = 5;

// Variables to know which instruccion people are on
let instructionActual = 0;

// Video
let video;
let bodyPose;
let poses = [];
//let connections;
let bodySegmentation;
let segmentation;
let options = { maskType: "background" };

// Canvas
const canvasX = 1670;
const canvasY = 920;
const middle = canvasX / 2;

//Recording
let yaDescargado = false;

// 'Game' creation

function preload() {
  bodyPose = ml5.bodyPose();
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", options);

  // Upload images for the diferent parts of the 'game'
  start = loadImage("/Final_Proyect/assets/start.png");
  startBackground = loadImage("/Final_Proyect/assets/startBackground.png");
  backgroundVideo = loadImage("/Final_Proyect/assets/backgroundVideo.png");
  mouse = loadImage("/Final_Proyect/assets/mouse.png");
  instructions1 = loadImage("/Final_Proyect/assets/Instructions1.png");
  instructions2 = loadImage("/Final_Proyect/assets/Instructions2.png");
  instructions3 = loadImage("/Final_Proyect/assets/Instructions3.png");
  frame = loadImage("/Final_Proyect/assets/Frame.png");
  time = loadImage("/Final_Proyect/assets/Time.png");
  record = loadImage("/Final_Proyect/assets/Record.png");
  download = loadImage("/Final_Proyect/assets/Download.png");

  //Uploading drum soundas
  drum_1 = loadSound("/Final_Proyect/assets/Drum1.mp3");
  drum_2 = loadSound("/Final_Proyect/assets/Drum2.mp3");
  drum_3 = loadSound("/Final_Proyect/assets/Drum3.mp3");
  drum_4 = loadSound("/Final_Proyect/assets/Drum4.mp3");
  beat = loadSound("/Final_Proyect/assets/Beat.mp3");
}

function setup() {
  createCanvas(canvasX, canvasY);

  angleMode(DEGREES);
  imageMode(CENTER);

  video = createCapture(VIDEO);
  video.size(canvasX, canvasY);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  bodySegmentation.detectStart(video, gotResults);
  //connections = bodyPose.getSkeleton();

  setupPiano();
  setupGuitar();
}

function draw() {
  // Intro
  if (EstadoActual === 0) {
    image(startBackground, canvasX / 2, canvasY / 2, canvasX, canvasY);
    image(start, canvasX / 2, canvasY / 2);
    image(mouse, mouseX, mouseY);
  }

  // Instructions
  if (EstadoActual === 1 && instructionActual === 0) {
    image(instructions1, canvasX / 2, canvasY / 2, canvasX, canvasY);
    image(mouse, mouseX, mouseY);
  }

  if (EstadoActual === 1 && instructionActual === 1) {
    image(instructions2, canvasX / 2, canvasY / 2, canvasX, canvasY);
    image(mouse, mouseX, mouseY);
  }

  if (EstadoActual === 1 && instructionActual === 2) {
    image(instructions3, canvasX / 2, canvasY / 2, canvasX, canvasY);
    image(mouse, mouseX, mouseY);
  }

  // Camera
  if (EstadoActual === 2) {
    image(backgroundVideo, canvasX / 2, canvasY / 2);

    push();
    translate(width, 0);
    scale(-1, 1); // espeja horizontalmente video + esqueleto juntos

    if (segmentation) {
      video.mask(segmentation.mask);
      image(video, canvasX / 2, canvasY / 2);
    }

    filter(POSTERIZE);

    pop();

    image(frame, canvasX / 2, canvasY / 2);
    image(record, canvasX / 2, canvasY / 2);

    if (poses.length > 0) {
      actualizarInstrumentos(poses[0]);
      actualizarDrums(poses[0]);
    }
  }

  // Time - the point where they select the amount of time the recording lasts and goes back to the video capture with the keys 1/2/3
  if (EstadoActual === 3) {
    image(time, canvasX / 2, canvasY / 2);
  }

  // Record
  if (EstadoActual === 4) {
    image(backgroundVideo, canvasX / 2, canvasY / 2);

    push();
    translate(width, 0);
    scale(-1, 1);
    if (segmentation) {
      video.mask(segmentation.mask);
      image(video, canvasX / 2, canvasY / 2);
    }
    filter(POSTERIZE);
    pop();

    image(frame, canvasX / 2, canvasY / 2);

    if (poses.length > 0) {
      actualizarInstrumentos(poses[0]);
      actualizarDrums(poses[0]);
    }

    // Cuenta regresiva
    let elapsed = (millis() - recordingStartTime) / 1000;
    let remaining = ceil(recordingDuration - elapsed);
    fill(204, 189, 110);
    textSize(48);
    textAlign(CENTER);
    text(remaining > 0 ? remaining : 0, canvasX / 2, 150);

    if (elapsed >= recordingDuration) {
      mediaRecorder.stop();
    }
  }

  // Download
  if (EstadoActual === 5) {
    image(download, canvasX / 2, canvasY / 2);
    image(mouse, mouseX, mouseY);
  }
}

function gotPoses(results) {
  poses = results;
}

function gotResults(result) {
  segmentation = result;
}

// Instrument creation

let escalas = {
  piano: [[261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25]],
  guitar: [[196.0, 220.0, 246.94, 261.63, 293.66, 329.63, 349.23, 392.0]],
};
let escalaActiva = { piano: 0, guitar: 0 };

const MIN_CONFIDENCE = 0.2;

// PIANO (Right Hand)
let pianoOsc = -1;
let pianoEnv = -1;
let pianoNotaActual = -1;

function setupPiano() {
  pianoOsc = new p5.Oscillator("triangle");
  pianoOsc.amp(0);
  pianoOsc.start();
  pianoEnv = new p5.Envelope();
  pianoEnv.setADSR(0.01, 0.3, 0.1, 0.4);
  pianoEnv.setRange(0.6, 0);
}

function actualizarPiano(rightWrist) {
  if (!rightWrist || rightWrist.confidence < MIN_CONFIDENCE) {
    pianoNotaActual = -1;
    return;
  }

  let mirroredX = canvasX - rightWrist.x;
  if (mirroredX < middle) {
    pianoNotaActual = -1;
    return;
  }

  let escala = escalas.piano[escalaActiva.piano];
  let idx = constrain(floor(map(rightWrist.y, canvasY, 0, 0, 8)), 0, 7);

  if (idx !== pianoNotaActual) {
    pianoOsc.freq(escala[idx]);
    pianoEnv.play(pianoOsc);
    pianoNotaActual = idx;
  }
}

// GUITAR (Left Hand)
let guitarDelay = -1;
let guitarNoise = -1;
let guitarEnv = -1;
let guitarNotaActual = -1;

function setupGuitar() {
  guitarNoise = new p5.Noise("white");
  guitarNoise.amp(0);
  guitarNoise.start();

  guitarEnv = new p5.Envelope();
  guitarEnv.setADSR(0.001, 0.05, 0, 0);
  guitarEnv.setRange(0.5, 0);

  guitarDelay = new p5.Delay();
  guitarNoise.disconnect();
  guitarNoise.connect(guitarDelay);
  guitarDelay.process(guitarNoise, 0.01, 0.6, 1000);
}

function actualizarGuitar(leftWrist) {
  if (!leftWrist || leftWrist.confidence < MIN_CONFIDENCE) {
    guitarNotaActual = -1;
    guitarDelay.amp(0, 0.1);
    return;
  }

  let mirroredX = canvasX - leftWrist.x; // clave: espejar antes de comparar con middle
  if (mirroredX > middle) {
    guitarNotaActual = -1;
    guitarDelay.amp(0, 0.1);
    return;
  }

  guitarDelay.amp(1, 0.05);

  let escala = escalas.guitar[escalaActiva.guitar];
  let idx = constrain(floor(map(leftWrist.y, canvasY, 0, 0, 8)), 0, 7);

  if (idx !== guitarNotaActual) {
    let delayTime = 1 / escala[idx];
    guitarDelay.delayTime(delayTime);
    guitarEnv.play(guitarNoise);
    guitarNotaActual = idx;
  }
}

// Conecting bodypose with the 2 instruments
function actualizarInstrumentos(pose) {
  if (!pose) return;
  let keypoints = pose.keypoints;

  let rightWrist = keypoints.find((k) => k.name === "right_wrist");
  let leftWrist = keypoints.find((k) => k.name === "left_wrist");

  actualizarPiano(rightWrist);
  actualizarGuitar(leftWrist);
}

// DRUMS
const hipThreshold = 150;
const footThreshold = 700;
const squatThreshold = 100;

let drum1Playing = false; // right hip (12)
let drum2Playing = false; // left hip (11)
let drum3Playing = false; // right ankle (16)
let drum4Playing = false; // left ankle (15)
let beatPlaying = false;

function actualizarDrums(pose) {
  if (!pose) return;
  let keypoints = pose.keypoints;

  let leftHip = keypoints.find((k) => k.name === "left_hip");
  let rightHip = keypoints.find((k) => k.name === "right_hip");
  let leftKnee = keypoints.find((k) => k.name === "left_knee");
  let rightKnee = keypoints.find((k) => k.name === "right_knee");
  let leftAnkle = keypoints.find((k) => k.name === "left_ankle");
  let rightAnkle = keypoints.find((k) => k.name === "right_ankle");

  // DRUM 1: right hip (point 12), in X (mirrored image)
  if (rightHip && rightHip.confidence > MIN_CONFIDENCE) {
    let mirroredX = canvasX - rightHip.x;
    if (mirroredX > middle + hipThreshold) {
      if (!drum1Playing) {
        drum_1.loop();
        drum1Playing = true;
      }
    } else {
      if (drum1Playing) {
        drum_1.stop();
        drum1Playing = false;
      }
    }
  } else {
    if (drum1Playing) {
      drum_1.stop();
      drum1Playing = false;
    }
  }

  // DRUM 2: left hip (point 11), in X (mirrored image)
  if (leftHip && leftHip.confidence > MIN_CONFIDENCE) {
    let mirroredX = canvasX - leftHip.x;
    if (mirroredX < middle - hipThreshold) {
      if (!drum2Playing) {
        drum_2.loop();
        drum2Playing = true;
      }
    } else {
      if (drum2Playing) {
        drum_2.stop();
        drum2Playing = false;
      }
    }
  } else {
    if (drum2Playing) {
      drum_2.stop();
      drum2Playing = false;
    }
  }

  // --- DRUM 3: right feet (point 16), in Y
  if (rightAnkle && rightAnkle.confidence > MIN_CONFIDENCE) {
    if (rightAnkle.y < footThreshold) {
      // pie levantado
      if (!drum3Playing) {
        drum_3.loop();
        drum3Playing = true;
      }
    } else {
      if (drum3Playing) {
        drum_3.stop();
        drum3Playing = false;
      }
    }
  } else {
    if (drum3Playing) {
      drum_3.stop();
      drum3Playing = false;
    }
  }

  // DRUM 4: left feet (point 15), in Y
  if (leftAnkle && leftAnkle.confidence > MIN_CONFIDENCE) {
    if (leftAnkle.y < footThreshold) {
      if (!drum4Playing) {
        drum_4.loop();
        drum4Playing = true;
      }
    } else {
      if (drum4Playing) {
        drum_4.stop();
        drum4Playing = false;
      }
    }
  } else {
    if (drum4Playing) {
      drum_4.stop();
      drum4Playing = false;
    }
  }

  // BEAT: squat (distance between hip an knee in the Y axis)
  if (
    leftHip &&
    rightHip &&
    leftKnee &&
    rightKnee &&
    leftHip.confidence > MIN_CONFIDENCE &&
    rightHip.confidence > MIN_CONFIDENCE &&
    leftKnee.confidence > MIN_CONFIDENCE &&
    rightKnee.confidence > MIN_CONFIDENCE
  ) {
    let hipY = (leftHip.y + rightHip.y) / 2;
    let kneeY = (leftKnee.y + rightKnee.y) / 2;
    let hipKneeDist = abs(kneeY - hipY);

    if (hipKneeDist < squatThreshold) {
      if (!beatPlaying) {
        beat.loop();
        beatPlaying = true;
      }
    } else {
      if (beatPlaying) {
        beat.stop();
        beatPlaying = false;
      }
    }
  } else {
    if (beatPlaying) {
      beat.stop();
      beatPlaying = false;
    }
  }
}

//Record Video

let mediaRecorder;
let recordedChunks = [];
let recordingDuration = 10;
let recordingStartTime = 0;
let recordedVideoURL = null;
let videoPlayerCreated = false;

// Function called when player presses the 'space' key
function startRecording() {
  recordedChunks = [];
  yaDescargado = false;
  videoPlayerCreated = false;

  // 1. Captures video
  let canvasElt = document.querySelector("canvas");
  let canvasStream = canvasElt.captureStream(30); // 30 fps

  // 2. Captures audio
  let audioDestination = getAudioContext().createMediaStreamDestination();
  p5.soundOut.output.connect(audioDestination);

  // 3. combines video + audio
  let combinedStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...audioDestination.stream.getAudioTracks(),
  ]);

  // 4. Recorder
  mediaRecorder = new MediaRecorder(combinedStream, { mimeType: "video/webm" });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    recordedVideoURL = URL.createObjectURL(recordedBlob);
    EstadoActual = 5;
  };

  mediaRecorder.start();
  recordingStartTime = millis();
  EstadoActual = 4;
}

function descargarVideo() {
  if (yaDescargado || !recordedVideoURL) return;
  yaDescargado = true;

  let a = document.createElement("a");
  a.href = recordedVideoURL;
  a.download = "mi-cancion.webm";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function mostrarResultado() {
  if (videoPlayerCreated) return;
  videoPlayerCreated = true;

  let videoPlayer = createVideo([recordedVideoURL]);
  videoPlayer.size(640, 400);
  videoPlayer.position(canvasX / 2 - 320, 250); // AJUSTA a tu layout real
  videoPlayer.controls(true);

  let downloadLink = createA(
    recordedVideoURL,
    "Descargar tu canción",
    "_blank"
  );
  downloadLink.attribute("download", "mi-cancion.webm");
  downloadLink.position(canvasX / 2 - 80, 670); // AJUSTA a tu layout real
}

// Elegir duración antes de grabar (mientras estás en la pantalla de cámara)
function keyPressed() {
  if (EstadoActual === 2) {
    if (keyCode === 32) {
      EstadoActual = 3;
    }
  }

  if (EstadoActual === 3) {
    if (key === "1") {
      recordingDuration = 10;
      startRecording();
    }
    if (key === "2") {
      recordingDuration = 20;
      startRecording();
    }
    if (key === "3") {
      recordingDuration = 30;
      startRecording();
    }
  }
}

// Navigation through the different parts of the 'game'
function mouseClicked() {
  if (EstadoActual === 0) {
    if (mouseX > 440 && mouseX < 1230 && mouseY > 350 && mouseY < 515) {
      EstadoActual = 1;
    }
  }

  if (EstadoActual === 1) {
    if (instructionActual < 3) {
      if (mouseX > 1340 && mouseX < 1670 && mouseY > 680 && mouseY < 920) {
        instructionActual = instructionActual + 1;
      }
    }

    if (instructionActual === 2) {
      if (mouseX > 490 && mouseX < 1140 && mouseY > 380 && mouseY < 580) {
        instructionActual = 0;
        EstadoActual = 2;
      }
    }
  }

  if (EstadoActual === 5) {
    if (mouseX > 440 && mouseX < 1330 && mouseY > 350 && mouseY < 515) {
      descargarVideo();
    }
    if (mouseX > 740 && mouseX < 1000 && mouseY > 745 && mouseY < 920) {
      EstadoActual = 2;
    }
  }
}