// SELF PORTRAIT

// Variables

let pupilX = 540;
let pupilY = 438;

let leftEyeX = 456;
let leftEyeY = 393;
let rightEyeX = 665;
let rightEyeY = 393;

let maxX = (168/2) - (74/2);
let maxY = (194/2) - (84/2);

function setup() {
    createCanvas(1080, 920);
}

function draw() {
    background(107, 108, 150);

    //Hair (back)
    fill(96, 57, 19);
    stroke(0);

    beginShape();

    bezierVertex(238, 920);

    bezierVertex(214, 688);
    bezierVertex(256, 641);
    bezierVertex(256, 641);

    bezierVertex(256, 641);
    bezierVertex(205, 706);
    bezierVertex(205, 706);

    bezierVertex(205, 706);
    bezierVertex(273, 566);
    bezierVertex(275, 470);
    
    bezierVertex(278, 370);
    bezierVertex(229, 116);
    bezierVertex(549, 116);
    
    bezierVertex(869, 116);
    bezierVertex(819, 404);
    bezierVertex(819, 524);

    bezierVertex(818, 644);
    bezierVertex(868, 752);
    bezierVertex(868, 752);

    bezierVertex(868, 752);
    bezierVertex(830, 704);
    bezierVertex(830, 704);

    bezierVertex(851, 757);
    bezierVertex(860, 920);
    bezierVertex(860, 920);

    endShape(CLOSE);


    //arms
    fill(235, 196, 152);
    stroke(0);

    beginShape();

    bezierVertex(309, 920);

    bezierVertex(309, 920);
    bezierVertex(425, 707);
    bezierVertex(475, 670);

    bezierVertex(485, 664);
    bezierVertex(528, 650);
    bezierVertex(528, 650);

    bezierVertex(528, 650);
    bezierVertex(528, 620);
    bezierVertex(528, 620);

    bezierVertex(528, 620);
    bezierVertex(603, 620);
    bezierVertex(603, 620);

    bezierVertex(603, 620);
    bezierVertex(603, 650);
    bezierVertex(603, 650);

    bezierVertex(603, 650);
    bezierVertex(647, 658);
    bezierVertex(654, 660);
    
    bezierVertex(715, 679);
    bezierVertex(831, 920);
    bezierVertex(831, 920);

    bezierVertex(831, 920);
    bezierVertex(744, 920);
    bezierVertex(744, 920);

    bezierVertex(744, 920);
    bezierVertex(646, 760);
    bezierVertex(646, 760);

    bezierVertex(646, 760);
    bezierVertex(493, 761);
    bezierVertex(493, 761);

    bezierVertex(493, 761);
    bezierVertex(394, 920);
    bezierVertex(394, 920);

    endShape(CLOSE);
   

    // Vest
    fill(53, 66, 46);
    stroke(0);

    beginShape();

    vertex(465, 920);
    vertex(465, 807);
    vertex(494, 662);
    vertex(523, 652);
    vertex(570, 760);
    vertex(619, 653);
    vertex(647, 657);
    vertex(675, 807);
    vertex(675, 920);

    endShape(CLOSE);

    // Ears
    fill(235, 196, 152);
    stroke(0);
    ellipse(755, 445, 58, 69);
    ellipse(357, 445, 58, 69);

    // Face
    fill(235, 196, 152);
    stroke(0);
    ellipse(559, 493, 420, 266);
    noStroke();
    ellipse(559, 342, 346, 282);

    // Eyes (whites)
    fill(255);
    stroke(0);
    ellipse(665, 393, 168, 194);
    ellipse(456, 393, 168, 194);

    // I use Claude to help me figure out the equation to stop the eyeball from leaving the perimetre of the whites at an angle

    // Left pupil position 
    let leftAngle = atan2(pupilY - leftEyeY, pupilX - leftEyeX);
    let leftDist = dist(pupilX, pupilY, leftEyeX, leftEyeY);
    let lx = leftEyeX + cos(leftAngle) * min(leftDist, maxX);
    let ly = leftEyeY + sin(leftAngle) * min(leftDist, maxY);

    // Right pupil position
    let rightAngle = atan2(pupilY - rightEyeY, pupilX - rightEyeX);
    let rightDist = dist(pupilX, pupilY, rightEyeX, rightEyeY);
    let rx = rightEyeX + cos(rightAngle) * min(rightDist, maxX);
    let ry = rightEyeY + sin(rightAngle) * min(rightDist, maxY);

    // Pupila izquierda
    fill(96, 57, 19);
    stroke(0);
    ellipse(lx, ly, 74, 84);
    fill(0);
    ellipse(lx, ly, 38, 42);
    fill(255);
    noStroke();
    ellipse(lx + 6, ly - 12, 18, 24);
    ellipse(lx, ly + 2, 12, 14);

    // Pupila derecha
    fill(96, 57, 19);
    stroke(0);
    ellipse(rx, ry, 74, 84);
    fill(0);
    ellipse(rx, ry, 38, 42);
    fill(255);
    noStroke();
    ellipse(rx + 7, ry - 12, 18, 24);
    ellipse(rx, ry + 2, 12, 14);


    // Hair (front)
    fill(109, 69, 41);
    stroke(0);

    beginShape();

    bezierVertex(558, 256);

    bezierVertex(424, 406);
    bezierVertex(221, 370);
    bezierVertex(280, 236);

    bezierVertex(286, 273);
    bezierVertex(318, 290);
    bezierVertex(350, 278);
    
    bezierVertex(320, 274);
    bezierVertex(303, 224);
    bezierVertex(303, 224);

    bezierVertex(381, 234);
    bezierVertex(372, 194);
    bezierVertex(438, 156);

    bezierVertex(505, 118);
    bezierVertex(594, 124);
    bezierVertex(656, 153);

    bezierVertex(718, 179);
    bezierVertex(726, 262);
    bezierVertex(825, 234);

    bezierVertex(790, 350);
    bezierVertex(675, 393);
    bezierVertex(558, 256);

    endShape();

    //Nose
    noFill();
    stroke(0);

    beginShape();

    bezierVertex(543, 475);

    bezierVertex(543, 475);
    bezierVertex(555, 453);
    bezierVertex(562, 453);

    bezierVertex(570, 453);
    bezierVertex(583, 475);
    bezierVertex(583, 475);
    
    endShape();

    //Mouth
    noFill();
    stroke(0);

    beginShape();

    bezierVertex(485, 533);

    bezierVertex(488, 548);
    bezierVertex(520, 575);
    bezierVertex(554, 558);
    
    endShape();

}

function mouseMoved() {
    pupilX = mouseX;
    pupilY = mouseY;
}
