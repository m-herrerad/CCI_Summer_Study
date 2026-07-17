// ARRAYS, FUNCTIONS AND LOOPS

// Variables

let flowerCount = 20;
let canvasWidth = 400;
let canvasHeight = 400;
let dinoCount = 10;

let spacing = canvasHeight/flowerCount;
let spacing2 = canvasHeight/dinoCount;

let offset = spacing * 0.5
let offset2 = spacing2 * 0.5

let dinoX = canvasWidth / 2;
let dinoY = canvasHeight / 2;


function setup() {
    createCanvas(canvasWidth, canvasHeight);

    //noLoop();
    frameRate(2);

    angleMode(DEGREES);
}

function draw() {
    background(121, 153, 171);

    for( let i=0; i<flowerCount; i++){
        for ( let j=0; j<flowerCount; j++){

            flower(
                i*spacing + offset, 
                j*spacing + offset,
                0.2,
            );
        
        }
    }

    let c = random([0], [255]);

    for( let i=0; i<dinoCount; i++){
        for ( let j=0; j<dinoCount; j++){

            dino(
                i*spacing2 + offset + 10, 
                j*spacing2 + offset + 10 ,
                0.05,
                c,
            );
        
        }
    }


    dino (dinoX, dinoY, 0.3, 0);
}

// Flowers that change position, color and rotate in the back

function flower (centreX, centreY, s) {
    push();
    translate (centreX, centreY);
    scale(s);
    let rotation = random([0, 90, 180, 270]);
    rotate(rotation)

    noStroke();

    fill(117, 49, random([0], [150]));
    circle(centreX, centreY - 20, 20);
    circle(centreX + 7, centreY + 3, 20);
    circle(centreX - 10, centreY - 10, 20);
    circle(centreX - 7, centreY + 3, 20);
    circle(centreX + 10, centreY - 10, 20);

    fill('yellow');
    circle(centreX, centreY - 8, 10);

    pop();
}

// Dino for the grid/pattern and for the mouse (one giant dino)

function dino (x, y, s, g) {

    push();  
    translate (x,y);
    scale (s);

    push();
    translate(-470, -410);

    //Behind
    fill(g-20, 180, 150);
    noStroke();
    quad(336, 474, 360, 484, 362, 532, 315, 532);
    quad(521, 500, 545, 489, 565, 548, 518, 548);


    fill(g, 186, 130);
    noStroke();

    //neck
    quad(226, 215, 268, 157, 328, 350, 285, 423);

    //head
    ellipse (200, 170, 140, 100);

    //body
    ellipse (470, 410, 376, 186);

    //Front
    quad(386, 476, 420, 490, 421, 561, 356, 561);
    quad(562, 490, 596, 476, 626, 561, 558, 561);

    //Tail
    beginShape();
    bezierVertex(626, 379);

    bezierVertex(626, 379);
    bezierVertex(754, 355);
    bezierVertex(754, 258);

    bezierVertex(771, 392);
    bezierVertex(629, 437);
    bezierVertex(629, 437);

    endShape(CLOSE);

    //eyes
    fill(0);
    noStroke();
    circle(217, 160, 22);

    pop();
    pop();

}

function mouseMoved() {
    dinoX = mouseX;
    dinoY = mouseY;
}
