function setup() {
    createCanvas(400, 400);
    greeting();
}

function draw() {
    background(120);

    push();
    translate(200, 200);
    drawFlower(0, 0);

    translate(50, 50);
    drawFlower(0, 0);

    translate(-100, -100);
    drawFlower(0, 0);
    pop();
  
    drawFlower2(200, 200);
    drawFlower2(100, 300);
    drawFlower2(300, 100);

    owl(200, 250, 8, 1);

}

function greeting () {
    console.log ("Hello world!");

}

function drawFlower (centreX, centreY) {
    noStroke();
    fill('yellow');
    circle(centreX, centreY, 20);

    fill('red');
    circle(centreX + 30, centreY, 20);
    circle(centreX - 30, centreY, 20);
    circle(centreX, centreY + 30, 20);
    circle(centreX, centreY - 30, 20);

}

function drawFlower2 (centreX, centreY) {
    push();
    translate (centreX, centreY)
    noStroke();
    fill('yellow');
    circle(0, 0, 20);

    fill('lightblue');
    circle(30, 0, 20);
    circle(- 30, 0, 20);
    circle(0, 30, 20);
    circle(0, - 30, 20);

    pop();
}

// based on Lauren Lee McCarthy

// x location, y location, grey colour, scale
function owl (x, y, g, s) {
  push ();  
  translate (x,y);
  scale (s);
  stroke (g);
  strokeWeight (70);
  line (0,-35,0,-65); //body
  noStroke ();
  fill(255-g);
  ellipse (-17.5, -65, 35, 35); // left eye
  ellipse (17.5, -65, 35, 35); // Right eye
  arc (0, -65, 70, 70, 0, PI);
  fill (g);
  ellipse (-14, -65, 8, 8); // left pupil
  ellipse (14, -65, 8, 8);  // right pupil
  quad (0, -58, 4, -51, 0, -44, -4, -51); //beak
  pop ();
}

