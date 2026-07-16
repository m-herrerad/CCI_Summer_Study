let trianglesCount = 20;
let canvasWidth = 400;
let canvasHeight = 400;

let spacing = canvasHeight/trianglesCount;

let offset = spacing * 0.5


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    //noLoop();
    frameRate(2);

    fill("lightgreen");
    noStroke();

    angleMode(DEGREES);

}

function draw() {
    background('lightblue');

    for( let i=0; i<trianglesCount; i++){
        for ( let j=0; j<trianglesCount; j++){
        
            drawTriangle(
                i*spacing + offset, 
                j*spacing + offset,
            );
        
        }
    }

}

function drawTriangle(centreX, centreY) {
    push();
    translate (centreX, centreY)
    let rotation = random([0, 90, 180, 270]);
    rotate(rotation)
        
    triangle(
        10, //x1
        10, //y1

        - 10, //x2
        - 10, //y2

        - 10, //x3
        10, //y3
    );
    pop();
}