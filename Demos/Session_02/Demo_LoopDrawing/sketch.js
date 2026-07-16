let circlesCount = 20;
let canvasWidth = 400;
let canvasHeight = 400;

let spacing = canvasHeight/circlesCount;

let offset = spacing * 0.5


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    noLoop();

}

function draw() {
    background(220);

    for( let i=0; i<circlesCount; i++){
        circle(200, i*spacing + offset, 20)
    }

}

