function setup (){
    createCanvas(400, 400);

    background(220);
}

function draw(){
    //circle(mouseX, mouseY, 20);
}

//function mouseClicked(){
    //background(220);
    //circle(mouseX, mouseY, 20);
//}

function mouseDragged(){
    //background(220);
    circle(mouseX, mouseY, 20);
}

function keyPressed(){
    if (key === 'a'){
        fill(random(255), random(255), random(255));
    } else if (key === 's'){
        background(220);
    }

}