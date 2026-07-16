// Coding demo: How to use arithmetic equations

let circleX = 200;
let spacing = 50;

function setup() {
    createCanvas(800, 600);
}

function draw() {
    background(0, 0, 220);

    spacing = spacing * 1.2;

    circleX = circleX + spacing;
    circle(circleX, 300, 50);

    spacing = spacing * 1.2;
    
    circleX = circleX + spacing;
    circle(circleX, 300, 50);

    spacing = spacing * 1.2;

    circleX = circleX + spacing;
    circle(circleX, 300, 50);
    noLoop(); //Prevents animation

}
